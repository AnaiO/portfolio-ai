<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AnthropicService
{
    private const API_URL = 'https://api.anthropic.com/v1/messages';

    private const API_VERSION = '2023-06-01';

    private const MODEL = 'claude-sonnet-4-5';

    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = (string) config('services.anthropic.key', '');
    }

    /**
     * Vérifie que l'URL cible ne permet pas une attaque SSRF.
     * Valide le schéma, l'hôte autorisé et l'IP résolue (DNS rebinding).
     *
     * @throws \RuntimeException
     */
    private function assertNoSsrf(string $url): void
    {
        $scheme = parse_url($url, PHP_URL_SCHEME);
        $host = parse_url($url, PHP_URL_HOST);

        if ($scheme !== 'https' || $host !== 'api.anthropic.com') {
            throw new \RuntimeException('Blocked request to unexpected API endpoint.');
        }

        $ip = gethostbyname($host);

        if ($ip === $host) {
            throw new \RuntimeException('Could not resolve API host.');
        }

        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
            throw new \RuntimeException('API host resolves to a disallowed IP address.');
        }
    }

    /**
     * Envoie un message à Claude et retourne le texte brut.
     *
     * @param  array<array{role: string, content: string}>  $messages
     *
     * @throws \RuntimeException
     */
    public function chat(string $systemPrompt, array $messages, int $maxTokens = 1400): string
    {
        $this->assertNoSsrf(self::API_URL);

        $response = Http::withHeaders([
            'x-api-key' => $this->apiKey,
            'anthropic-version' => self::API_VERSION,
            'content-type' => 'application/json',
        ])
            ->timeout(60)
            ->withOptions(['allow_redirects' => false])
            ->post(self::API_URL, [
                'model' => self::MODEL,
                'max_tokens' => $maxTokens,
                'system' => $systemPrompt,
                'messages' => $messages,
            ]);

        // dd($response->body());
        if (! $response->successful()) {
            $error = $response->json('error.message', 'Unknown API error');
            Log::error('Anthropic API error', [
                'status' => $response->status(),
                'error' => $error,
            ]);
            throw new \RuntimeException("Claude API error ({$response->status()}): {$error}");
        }

        $text = $response->json('content.0.text', '');

        if (empty($text)) {
            throw new \RuntimeException('Claude returned an empty response.');
        }

        return $text;
    }

    /**
     * Appelle Claude et parse automatiquement la réponse en tableau PHP.
     *
     * @param  array<array{role: string, content: string}>  $messages
     * @return array<string, mixed>
     *
     * @throws \RuntimeException
     */
    public function chatJson(string $systemPrompt, array $messages, int $maxTokens = 1400): array
    {
        $raw = $this->chat($systemPrompt, $messages, $maxTokens);
        $cleaned = preg_replace('/^```(?:json)?\s*/i', '', trim($raw)) ?? $raw;
        $cleaned = preg_replace('/\s*```$/', '', $cleaned) ?? $cleaned;

        $decoded = json_decode(trim($cleaned), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Claude JSON parse failed', ['raw' => $raw]);
            throw new \RuntimeException('Claude returned invalid JSON: '.json_last_error_msg());
        }

        return $decoded;
    }
}
