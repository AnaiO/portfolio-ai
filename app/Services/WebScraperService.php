<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\UriInterface;

class WebScraperService
{
    private const MAX_CONTENT_LENGTH = 4000;

    /**
     * Extrait le contenu textuel d'une URL.
     */
    public function extractContent(string $url): string
    {
        $url = $this->normalizeUrl($url);

        try {
            return $this->scrapeWithHttp($url);
        } catch (\InvalidArgumentException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::warning('WebScraper: fallback to domain hint', [
                'url' => $url,
                'error' => $e->getMessage(),
            ]);

            return $this->buildFallbackContent($url);
        }
    }

    /**
     * Vérifie que l'URL ne pointe pas vers une ressource interne (SSRF).
     * Valide le schéma et l'IP résolue après résolution DNS.
     *
     * @throws \InvalidArgumentException
     */
    private function assertNoSsrf(string $url): void
    {
        $scheme = parse_url($url, PHP_URL_SCHEME);

        if (! in_array($scheme, ['http', 'https'], true)) {
            throw new \InvalidArgumentException("Blocked request: disallowed scheme '{$scheme}'.");
        }

        $host = parse_url($url, PHP_URL_HOST);

        if (empty($host)) {
            throw new \InvalidArgumentException('Blocked request: missing host.');
        }

        $ip = gethostbyname($host);

        if ($ip === $host) {
            throw new \InvalidArgumentException("Blocked request: could not resolve host '{$host}'.");
        }

        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
            throw new \InvalidArgumentException("Blocked request: '{$host}' resolves to a disallowed IP address.");
        }
    }

    private function scrapeWithHttp(string $url): string
    {
        $this->assertNoSsrf($url);

        $response = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0 (compatible; AutomateAI-Analyzer/1.0)',
            'Accept' => 'text/html,application/xhtml+xml;q=0.9',
        ])
            ->timeout(15)
            ->withOptions([
                'allow_redirects' => [
                    'max' => 5,
                    'on_redirect' => function (RequestInterface $request, ResponseInterface $response, UriInterface $uri): void {
                        $this->assertNoSsrf((string) $uri);
                    },
                ],
            ])
            ->get($url);

        if (! $response->successful()) {
            throw new \RuntimeException("HTTP {$response->status()} for: {$url}");
        }

        return $this->cleanHtml($response->body());
    }

    private function cleanHtml(string $html): string
    {
        foreach ([
            '/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/is',
            '/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/is',
            '/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/is',
            '/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/is',
            '/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/is',
        ] as $pattern) {
            $html = preg_replace($pattern, '', $html) ?? $html; // Supprime les scripts, styles, nav, header, footer pour ne garder que le contenu principal
        }

        $text = strip_tags($html);
        $text = preg_replace('/\s+/', ' ', $text) ?? $text;

        return mb_substr(trim($text), 0, self::MAX_CONTENT_LENGTH) ?: 'No content extracted';
    }

    private function buildFallbackContent(string $url): string
    {
        $domain = parse_url($url, PHP_URL_HOST) ?? $url;

        return "Website: {$url}. Domain: {$domain}. Infer the industry and suggest realistic automations.";
    }

    private function normalizeUrl(string $url): string
    {
        $url = trim($url);
        if (! preg_match('/^https?:\/\//i', $url)) {
            $url = 'https://'.$url;
        }
        if (! filter_var($url, FILTER_VALIDATE_URL)) {
            throw new \InvalidArgumentException("Invalid URL: {$url}");
        }

        return $url;
    }
}
