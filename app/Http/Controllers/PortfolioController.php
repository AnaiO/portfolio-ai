<?php

namespace App\Http\Controllers;

use App\Jobs\AnalyseWebsiteJob;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PortfolioController extends Controller
{
    /**
     * Page d'accueil — charge Home.tsx via Inertia.
     */
    public function home(): InertiaResponse
    {
        return Inertia::render('home');
    }

    /**
     * Page mentions légales.
     */
    public function mentionsLegales(): InertiaResponse
    {
        return Inertia::render('mentions-legales');
    }

    /**
     * Lance une analyse async.
     * Retourne le lead_id immédiatement pour le polling React.
     */
    public function analyse(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'url' => ['required', 'url', 'max:255'],
        ]);

        // dd(session()->getId());
        $lead = Lead::create([
            'url'        => $validated['url'],
            'status'     => 'pending',
            'session_id' => session()->getId(),
        ]);

        AnalyseWebsiteJob::dispatch($lead->id)
            ->onQueue('analysis');

        return response()->json([
            'lead_id' => $lead->id,
            'status'  => 'pending',
        ], 201);
    }

    /**
     * Polling : retourne le statut courant du lead.
     */
    public function status(int $leadId): JsonResponse
    {
        $lead = Lead::findOrFail($leadId);
        // dd($lead->session_id, session()->getId());
        abort_if($lead->session_id !== session()->getId(), 403);

        return response()->json([
            'status'          => $lead->status,
            'analysis_result' => $lead->isCompleted() ? $lead->analysis_result : null,
            'error_message'   => $lead->hasFailed() ? $lead->error_message : null,
        ]);
    }

    /**
     * Capture lead : sauvegarde email + nom.
     */
    public function captureLead(Request $request, int $leadId): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'name'  => ['required', 'string', 'max:100'],
        ]);

        $lead = Lead::findOrFail($leadId);
        abort_if($lead->session_id !== session()->getId(), 403);

        $lead->update([
            'email' => $validated['email'],
            'name'  => $validated['name'],
        ]);

        return response()->json(['success' => true]);
    }
}
