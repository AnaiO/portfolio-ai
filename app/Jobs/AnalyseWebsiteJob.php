<?php

namespace App\Jobs;

use App\Models\Lead;
use App\Services\AnthropicService;
use App\Services\WebScraperService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class AnalyseWebsiteJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 2;
    public int $timeout = 120;

    public function __construct(
        private readonly int $leadId
    ) {}

    public function handle(WebScraperService $scraper, AnthropicService $claude): void
    {
        $lead = Lead::findOrFail($this->leadId);

        try {
            $lead->update(['status' => 'processing']);

            $content   = $scraper->extractContent($lead->url);
            $data      = $claude->chatJson(
                systemPrompt: $this->buildSystemPrompt(),
                messages: [
                    [
                        'role'    => 'user',
                        'content' => $this->buildUserPrompt($lead->url, $content),
                    ],
                ],
            );
            $validated = $this->validateResponse($data);

            $lead->update([
                'status'          => 'completed',
                'analysis_result' => $validated,
            ]);

        } catch (\Exception $e) {
            Log::error('AnalyseWebsiteJob failed', [
                'lead_id' => $this->leadId,
                'error'   => $e->getMessage(),
            ]);
            $lead->update([
                'status'        => 'failed',
                'error_message' => $e->getMessage(),
            ]);
        }
    }

    private function buildSystemPrompt(): string
    {
        return <<<'PROMPT'
    Tu es un consultant expert en automatisation IA, spécialisé dans l'optimisation des processus métier et l'analyse ROI pour les entreprises françaises et francophones.

    Tu réponds TOUJOURS en français, sans exception.

    Analyse le site web d'une entreprise et identifie ses 3 opportunités d'automatisation les plus impactantes.

    Réponds UNIQUEMENT avec un objet JSON valide — pas de préambule, pas de balises markdown, aucun texte en dehors du JSON.

    Structure requise :
    {
    "company_summary": "Une phrase : ce que fait cette entreprise et son marché principal.",
    "automations": [
        {
        "process_name": "Nom court et orienté action (ex: 'Qualification automatique des leads par IA')",
        "description": "2-3 phrases : ce qui est automatisé, comment ça fonctionne concrètement, et l'impact business.",
        "time_saved": "Estimation du temps économisé par semaine (ex: '8–12 heures/semaine')",
        "complexity": "Low",
        "roi_impact": "Impact concret et chiffré si possible (ex: 'Réduit le temps de réponse de 80%, augmente la conversion de +25%')",
        "tools_suggested": ["Outil A", "Outil B"]
        },
        { ... },
        { ... }
    ]
    }

    Règles strictes :
    - Réponds toujours en français, y compris company_summary, description, roi_impact
    - complexity doit être exactement l'un de : Low, Medium, High (en anglais, utilisé par le code)
    - time_saved doit être en français (ex: "8–12 heures/semaine")
    - Trie les automatisations par impact ROI décroissant (la plus impactante en premier)
    - Sois spécifique à l'industrie, aux produits et aux workflows réels de CETTE entreprise
    - tools_suggested doit contenir de vrais outils existants (API Claude, n8n, Make, Zapier, HubSpot, Notion, etc.)
    - Ne propose jamais d'automatisations génériques — chaque suggestion doit être liée au contexte précis de l'entreprise
    PROMPT;
    }

    private function buildUserPrompt(string $url, string $content): string
    {
        return <<<PROMPT
    Analyse cette entreprise et retourne le plan d'automatisation en JSON.

    URL : {$url}

    Contenu extrait du site :
    ---
    {$content}
    ---

    Réponds en français. Retourne UNIQUEMENT l'objet JSON. Rien avant ni après.
    PROMPT;
    }

    /**
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    private function validateResponse(array $data): array
    {
        if (empty($data['automations']) || ! is_array($data['automations'])) {
            throw new \RuntimeException('Missing "automations" array in Claude response.');
        }

        $valid = ['Low', 'Medium', 'High'];

        return [
            'company_summary' => (string) ($data['company_summary'] ?? 'Company analysis'),
            'automations'     => array_map(fn (array $a) => [
                'process_name'    => (string) ($a['process_name'] ?? 'Automation'),
                'description'     => (string) ($a['description'] ?? ''),
                'time_saved'      => (string) ($a['time_saved'] ?? 'N/A'),
                'complexity'      => in_array($a['complexity'] ?? '', $valid, true)
                                        ? $a['complexity']
                                        : 'Medium',
                'roi_impact'      => (string) ($a['roi_impact'] ?? ''),
                'tools_suggested' => array_values(array_filter(
                    (array) ($a['tools_suggested'] ?? []),
                    'is_string'
                )),
            ], array_slice($data['automations'], 0, 3)),
        ];
    }

    public function failed(\Throwable $e): void
    {
        Log::error('AnalyseWebsiteJob permanently failed', [
            'lead_id' => $this->leadId,
            'error'   => $e->getMessage(),
        ]);
        Lead::where('id', $this->leadId)->update([
            'status'        => 'failed',
            'error_message' => 'Service temporarily unavailable. Please try again.',
        ]);
    }
}