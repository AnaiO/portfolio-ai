import { useEffect, useRef, useState } from 'react';

const STEPS = [
  'Connexion au site...',
  'Extraction du contenu...',
  'Analyse par Claude AI...',
  'Génération des recommandations...',
];

interface Props {
  url: string;
}

export default function NeuralLoader({ url }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 2500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      {/* Rings animés */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-violet-600" />
        <div className="absolute inset-3 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-2 border-transparent border-r-violet-400" />
        <div className="absolute inset-6 animate-[spin_1s_linear_infinite] rounded-full border-2 border-transparent border-b-violet-300" />
        <svg
          className="h-5 w-5 animate-pulse text-violet-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
          />
        </svg>
      </div>

      {/* Étape courante */}
      <p
        key={stepIndex}
        className="animate-[fadeUp_0.3s_ease] text-center text-base font-semibold text-violet-600"
      >
        {STEPS[stepIndex]}
      </p>

      {/* URL analysée */}
      <p className="max-w-xs truncate text-center font-mono text-sm text-gray-400">
        {url}
      </p>

      {/* Barre de progression */}
      <div className="h-1.5 w-64 overflow-hidden rounded-full bg-violet-100">
        <div className="h-full animate-[indeterminate_2s_ease-in-out_infinite] rounded-full bg-violet-600" />
      </div>

      <style>{`
                @keyframes indeterminate {
                    0%   { transform: translateX(-100%); width: 60%; }
                    50%  { transform: translateX(80%);   width: 60%; }
                    100% { transform: translateX(250%);  width: 60%; }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
    </div>
  );
}
