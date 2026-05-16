<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
        } catch (\Exception $e) {
            Log::warning('WebScraper: fallback to domain hint', [
                'url'   => $url,
                'error' => $e->getMessage(),
            ]);
            return $this->buildFallbackContent($url);
        }
    }

    private function scrapeWithHttp(string $url): string
    {
        $response = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0 (compatible; AutomateAI-Analyzer/1.0)', // User-Agent générique pour éviter les blocages basiques
            'Accept'     => 'text/html,application/xhtml+xml;q=0.9',
        ])->timeout(15)->get($url);

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
            $url = 'https://' . $url;
        }
        if (! filter_var($url, FILTER_VALIDATE_URL)) {
            throw new \InvalidArgumentException("Invalid URL: {$url}");
        }
        return $url;
    }
}