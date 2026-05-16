import { useEffect, useState } from 'react';

interface Automation {
  process_name: string;
  description: string;
  time_saved: string;
  complexity: 'Low' | 'Medium' | 'High';
  roi_impact: string;
  tools_suggested: string[];
}

interface Props {
  automation: Automation;
  index: number;
}

const COMPLEXITY_CONFIG = {
  Low: {
    label: 'Facile à déployer',
    className: 'bg-emerald-100 text-emerald-700',
  },
  Medium: {
    label: 'Complexité moyenne',
    className: 'bg-amber-100 text-amber-700',
  },
  High: {
    label: 'Projet avancé',
    className: 'bg-red-100 text-red-700',
  },
};

export default function AutomationCard({ automation, index }: Props) {
  const [visible, setVisible] = useState(false);
  const complexity =
    COMPLEXITY_CONFIG[automation.complexity] ?? COMPLEXITY_CONFIG.Medium;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md sm:p-6 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 font-bold text-violet-600">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wider uppercase ${complexity.className}`}
          >
            {complexity.label}
          </span>
          {/* Temps économisé */}
          <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-1.5 text-violet-600">
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="font-mono text-xs font-semibold whitespace-nowrap">
              {automation.time_saved}
            </span>
          </div>
        </div>
      </div>

      {/* Titre */}
      <h3 className="mb-2 text-lg leading-snug font-bold text-gray-900">
        {automation.process_name}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-gray-500">
        {automation.description}
      </p>

      {/* ROI */}
      <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3">
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
        <p className="text-xs leading-relaxed font-medium text-emerald-700">
          {automation.roi_impact}
        </p>
      </div>

      {/* Outils */}
      {automation.tools_suggested.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {automation.tools_suggested.map((tool) => (
            <span
              key={tool}
              className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-xs font-medium text-gray-600 transition-colors hover:bg-violet-100 hover:text-violet-700"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
