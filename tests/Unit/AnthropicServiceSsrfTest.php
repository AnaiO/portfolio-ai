<?php

use App\Services\AnthropicService;
use Illuminate\Support\Facades\Http;

function callAssertNoSsrf(string $url): void
{
    $method = new ReflectionMethod(AnthropicService::class, 'assertNoSsrf');
    $method->invoke(new AnthropicService(), $url);
}

// --- Scheme validation ---

test('assertNoSsrf rejects http scheme', function () {
    expect(fn () => callAssertNoSsrf('http://api.anthropic.com/v1/messages'))
        ->toThrow(RuntimeException::class, 'Blocked request to unexpected API endpoint.');
});

// --- Host whitelist ---

test('assertNoSsrf rejects disallowed hosts', function (string $url) {
    expect(fn () => callAssertNoSsrf($url))
        ->toThrow(RuntimeException::class, 'Blocked request to unexpected API endpoint.');
})->with([
    'ftp scheme'          => 'ftp://api.anthropic.com/v1/messages',
    'other domain'        => 'https://evil.com/v1/messages',
    'subdomain'           => 'https://sub.api.anthropic.com/v1/messages',
    'anthropic lookalike' => 'https://api.anthropic.com.evil.com/v1/messages',
    'internal ip'         => 'https://192.168.1.1/v1/messages',
    'localhost'           => 'https://127.0.0.1/v1/messages',
]);

// --- chat() via Http::fake() ---

test('chat returns text from API response', function () {
    config(['services.anthropic.key' => 'sk-test']);

    Http::fake([
        'api.anthropic.com/*' => Http::response([
            'content' => [['type' => 'text', 'text' => 'Bonjour!']],
        ]),
    ]);

    $result = (new AnthropicService())->chat('Tu es utile.', [
        ['role' => 'user', 'content' => 'Salut'],
    ]);

    expect($result)->toBe('Bonjour!');
});

test('chat throws on API error response', function () {
    config(['services.anthropic.key' => 'sk-test']);

    Http::fake([
        'api.anthropic.com/*' => Http::response(
            ['error' => ['message' => 'Invalid API Key']],
            401
        ),
    ]);

    expect(fn () => (new AnthropicService())->chat('sys', [['role' => 'user', 'content' => 'hi']]))
        ->toThrow(RuntimeException::class, 'Claude API error (401): Invalid API Key');
});

test('chat throws when response text is empty', function () {
    config(['services.anthropic.key' => 'sk-test']);

    Http::fake([
        'api.anthropic.com/*' => Http::response([
            'content' => [['type' => 'text', 'text' => '']],
        ]),
    ]);

    expect(fn () => (new AnthropicService())->chat('sys', [['role' => 'user', 'content' => 'hi']]))
        ->toThrow(RuntimeException::class, 'Claude returned an empty response.');
});

// --- chatJson() ---

test('chatJson parses valid json response', function () {
    config(['services.anthropic.key' => 'sk-test']);

    Http::fake([
        'api.anthropic.com/*' => Http::response([
            'content' => [['type' => 'text', 'text' => '{"score": 9}']],
        ]),
    ]);

    $result = (new AnthropicService())->chatJson('sys', [['role' => 'user', 'content' => 'hi']]);

    expect($result)->toBe(['score' => 9]);
});

test('chatJson strips markdown code fences before parsing', function () {
    config(['services.anthropic.key' => 'sk-test']);

    Http::fake([
        'api.anthropic.com/*' => Http::response([
            'content' => [['type' => 'text', 'text' => "```json\n{\"score\": 9}\n```"]],
        ]),
    ]);

    $result = (new AnthropicService())->chatJson('sys', [['role' => 'user', 'content' => 'hi']]);

    expect($result)->toBe(['score' => 9]);
});

test('chatJson throws on invalid json', function () {
    config(['services.anthropic.key' => 'sk-test']);

    Http::fake([
        'api.anthropic.com/*' => Http::response([
            'content' => [['type' => 'text', 'text' => 'pas du json']],
        ]),
    ]);

    expect(fn () => (new AnthropicService())->chatJson('sys', [['role' => 'user', 'content' => 'hi']]))
        ->toThrow(RuntimeException::class, 'Claude returned invalid JSON');
});
