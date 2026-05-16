import AnalyzerTool from '@/components/analyzer/AnalyzerTool';

const HERO_STATS = [
  { value: '+380%', label: 'ROI moyen constaté' },
  { value: '15h/sem', label: 'Économisées en moyenne' },
  { value: '< 48h', label: 'Délai de déploiement' },
  { value: '100%', label: 'Gratuit & sans compte' },
];

const STEPS = [
  {
    emoji: '🌐',
    title: 'Entrez votre URL',
    desc: 'Notre scraper analyse le contenu public de votre site pour comprendre votre activité, vos services et votre marché.',
  },
  {
    emoji: '🧠',
    title: 'Claude analyse votre business',
    desc: "L'IA identifie vos processus manuels les plus chronophages et calcule leur potentiel d'automatisation.",
  },
  {
    emoji: '🚀',
    title: "Recevez votre plan d'action",
    desc: 'Trois automatisations priorisées par ROI, avec outils recommandés, temps économisé et niveau de complexité.',
  },
];

const AUTOMATION_EXAMPLES = [
  {
    emoji: '💬',
    title: 'Support client IA',
    desc: 'Répondez automatiquement à 80% des questions fréquentes H24 sans intervention humaine.',
    saving: '12h / semaine',
  },
  {
    emoji: '📊',
    title: 'Reporting automatisé',
    desc: 'KPIs agrégés depuis toutes vos sources et envoyés chaque lundi matin, zéro effort.',
    saving: '5h / semaine',
  },
  {
    emoji: '🎯',
    title: 'Qualification de leads',
    desc: 'Triez, scorez et assignez automatiquement vos prospects selon vos critères métier.',
    saving: '8h / semaine',
  },
  {
    emoji: '🔄',
    title: 'Sync CRM ↔ Facturation',
    desc: 'Toutes vos données synchronisées en temps réel entre CRM, ERP et outils comptables.',
    saving: '4h / semaine',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── NAVBAR ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              greencodin<span className="text-violet-600">IA</span>
            </span>
          </a>

          <a
            href="#analyser"
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-violet-700"
          >
            Analyser mon site
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
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600">
        {/* Grille de fond */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.3) 59px, rgba(255,255,255,0.3) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.3) 59px, rgba(255,255,255,0.3) 60px)',
          }}
        />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-400/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-28">
          {/* Badge */}
          <div className="mb-6 flex justify-center sm:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-white/90">
                Analyse IA en temps réel · Gratuit
              </span>
            </div>
          </div>

          {/* Titre */}
          <h1 className="mb-5 text-center text-3xl leading-tight font-extrabold text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
            Arrêtez de perdre
            <br />
            <span className="text-amber-400">20h par semaine</span>
            <br />
            sur des tâches répétitives
          </h1>

          {/* Sous-titre */}
          <p className="mx-auto mb-8 max-w-2xl text-center text-base leading-relaxed text-white/75 sm:mb-12 sm:text-xl">
            Entrez l'URL de votre site. Notre IA analyse votre activité et
            identifie les{' '}
            <strong className="text-white">3 automatisations</strong> qui
            transformeront votre ROI — en 30 secondes.
          </p>

          {/* Stats */}
          <div className="mb-10 grid grid-cols-2 gap-x-10 gap-y-5 sm:mb-14 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
            {HERO_STATS.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ── Outil interactif ── */}
          <div
            id="analyser"
            className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.25)] sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Analysez votre site maintenant
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  Résultats en ~30 secondes
                </p>
              </div>
              {/* Pastilles macOS */}
              <div className="hidden items-center gap-1.5 sm:flex">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
            </div>

            <AnalyzerTool />
          </div>

          {/* Flèche */}
          <div className="mt-12 flex justify-center">
            <a
              href="#comment-ca-marche"
              className="animate-bounce text-white/50 transition-colors hover:text-white/80"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ────────────────────────────────── */}
      <section id="comment-ca-marche" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-16">
            <span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-2 text-xs font-bold tracking-widest text-violet-700 uppercase">
              Comment ça marche
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              De l'URL au plan d'action
              <br />
              en 3 étapes
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <span className="text-3xl">{step.emoji}</span>
                </div>
                <div className="-mt-3 mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white ring-4 ring-white">
                  {i + 1}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXEMPLES ─────────────────────────────────────────── */}
      <section className="bg-violet-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-16">
            <span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-2 text-xs font-bold tracking-widest text-violet-700 uppercase">
              Exemples concrets
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Ce que l'IA automatise
              <br />
              dans votre business
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUTOMATION_EXAMPLES.map((ex) => (
              <div
                key={ex.title}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 text-3xl">{ex.emoji}</div>
                <h3 className="mb-2 leading-snug font-bold text-gray-900">
                  {ex.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">
                  {ex.desc}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-violet-600">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {ex.saving}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 to-indigo-600 py-14 sm:py-20">
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-5 text-3xl leading-tight font-extrabold text-white sm:mb-6 sm:text-4xl md:text-5xl">
            Votre plan d'automatisation
            <br />
            vous attend
          </h2>
          <p className="mb-10 text-lg text-white/75">
            Analyse gratuite · Résultats en 30s · Aucun compte requis
          </p>
          <a
            href="#analyser"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-violet-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-violet-50"
          >
            Analyser mon site maintenant
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Logo + nom */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <svg
                  className="h-3.5 w-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                  />
                </svg>
              </div>
              <span className="font-bold text-gray-900">
                greencodin<span className="text-violet-600">IA</span>
              </span>
            </div>

            {/* Copyright + crédit */}
            <div className="text-center text-sm text-gray-400">
              <p>
                © {new Date().getFullYear()} greencodinIA — Automatisation
                intelligente pour entreprises
              </p>
              <p className="mt-1">
                Site conçu et développé avec soin par{' '}
                <a
                  href="https://greencodin.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-violet-600 transition-colors hover:text-violet-700"
                >
                  greencodin
                </a>
              </p>
            </div>

            {/* Liens */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a
                href="/mentions-legales"
                className="transition-colors hover:text-violet-600"
              >
                Mentions légales
              </a>
              <a href="#" className="transition-colors hover:text-violet-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
