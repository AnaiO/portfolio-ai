import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import AutomationCard from './AutomationCard';
import LeadCapture from './LeadCapture';
import NeuralLoader from './NeuralLoader';

type State = 'idle' | 'loading' | 'completed' | 'error';

interface Automation {
  process_name: string;
  description: string;
  time_saved: string;
  complexity: 'Low' | 'Medium' | 'High';
  roi_impact: string;
  tools_suggested: string[];
}

interface AnalysisData {
  company_summary: string;
  automations: Automation[];
}

const EXAMPLES = ['airbnb.com', 'notion.so', 'shopify.com'];

export default function AnalyzerTool() {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [state, setState] = useState<State>('idle');
  const [leadId, setLeadId] = useState<number | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCapture, setShowCapture] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
    };
  }, []);

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  function startPolling(id: number) {
    pollRef.current = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/analyse/${id}/status`);

        if (data.status === 'completed') {
          stopPolling();
          setAnalysisData(data.analysis_result);
          setState('completed');
          setTimeout(() => setShowCapture(true), 1000);
        }

        if (data.status === 'failed') {
          stopPolling();
          setState('error');
          setErrorMessage(
            data.error_message ?? "L'analyse a échoué. Vérifiez l'URL.",
          );
        }
      } catch {
        stopPolling();
        setState('error');
        setErrorMessage('Erreur de connexion au serveur.');
      }
    }, 2000);
  }

  async function handleAnalyse() {
    setUrlError(null);

    const raw = url.trim();

    if (!raw) {
      setUrlError('Entrez une URL valide');
      return;
    }

    const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

    try {
      new URL(normalized);
    } catch {
      setUrlError('URL invalide — exemple : https://monsite.com');
      return;
    }

    setUrl(normalized);
    setState('loading');

    try {
      const { data } = await axios.post('/api/analyse', { url: normalized });
      setLeadId(data.lead_id);
      startPolling(data.lead_id);
    } catch (e: any) {
      const msg =
        e.response?.data?.message ??
        e.response?.data?.errors?.url?.[0] ??
        'Erreur réseau';
      setState('error');
      setErrorMessage(msg);
    }
  }

  function handleReset() {
    stopPolling();
    setUrl('');
    setUrlError(null);
    setState('idle');
    setLeadId(null);
    setAnalysisData(null);
    setErrorMessage('');
    setShowCapture(false);
  }

  return (
    <div className="w-full">
      {/* ── IDLE ─────────────────────────────────────────────── */}
      {state === 'idle' && (
        <div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253"
                  />
                </svg>
              </span>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAnalyse();
                  }
                }}
                placeholder="https://votre-entreprise.com"
                className={`w-full rounded-xl border py-3.5 pr-4 pl-10 font-mono text-sm placeholder-gray-400 shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-violet-500 ${
                  urlError
                    ? 'border-red-300 ring-1 ring-red-300'
                    : 'border-gray-200'
                }`}
              />
            </div>
            <button
              onClick={handleAnalyse}
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-violet-700"
            >
              Analyser avec Claude
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                />
              </svg>
            </button>
          </div>

          {urlError && (
            <p className="mt-2 ml-1 text-xs text-red-500">{urlError}</p>
          )}

          {/* Exemples */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400">Essayez :</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setUrl(ex)}
                className="cursor-pointer rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs text-gray-600 transition-colors hover:bg-violet-100 hover:text-violet-700"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── LOADING ──────────────────────────────────────────── */}
      {state === 'loading' && <NeuralLoader url={url} />}

      {/* ── ERROR ────────────────────────────────────────────── */}
      {state === 'error' && (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
            <svg
              className="h-7 w-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">Analyse impossible</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
              {errorMessage}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="cursor-pointer rounded-xl border-2 border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:border-violet-600 hover:text-violet-600"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* ── COMPLETED ────────────────────────────────────────── */}
      {state === 'completed' && analysisData && (
        <div className="space-y-5">
          {/* Résumé entreprise */}
          <div className="flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50 p-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold tracking-wider text-violet-600 uppercase">
                Analyse complète
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {analysisData.company_summary}
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4">
            {analysisData.automations.map((automation, i) => (
              <AutomationCard key={i} automation={automation} index={i} />
            ))}
          </div>

          {/* Lead capture */}
          <LeadCapture leadId={leadId!} show={showCapture} />

          {/* Reset */}
          <div className="pt-2 text-center">
            <button
              onClick={handleReset}
              className="cursor-pointer text-sm text-gray-400 underline-offset-2 transition-colors hover:text-violet-600 hover:underline"
            >
              Analyser un autre site →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
