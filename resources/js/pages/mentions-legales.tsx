export default function MentionsLegales() {
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
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-violet-600"
          >
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Retour à l'accueil
          </a>
        </nav>
      </header>

      {/* ── CONTENU ──────────────────────────────────────────── */}
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {/* En-tête */}
        <div className="mb-12">
          <span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-2 text-xs font-bold tracking-widest text-violet-700 uppercase">
            Informations légales
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-gray-900">
            Mentions légales
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-10 text-gray-700">
          {/* 1. Éditeur */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              1. Éditeur du site
            </h2>
            <p className="mb-2">
              Le présent site <strong>greencodinIA</strong> est édité par :
            </p>
            <div className="rounded-xl bg-gray-50 p-5 text-sm leading-relaxed space-y-1">
              <p><span className="font-semibold">Raison sociale :</span> greencodin</p>
              <p><span className="font-semibold">Forme juridique :</span> Micro-entreprise (auto-entrepreneur)</p>
              <p><span className="font-semibold">Directeur de la publication :</span> Anaïs Berton</p>
              <p>
                <span className="font-semibold">Contact :</span>{' '}
                <a
                  href="mailto:contact@greencodin.fr"
                  className="text-violet-600 hover:underline"
                >
                  contact@greencodin.fr
                </a>
              </p>
              <p><span className="font-semibold">Site web :</span>{' '}
                <a
                  href="https://greencodin.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline"
                >
                  greencodin.fr
                </a>
              </p>
            </div>
          </section>

          {/* 2. Hébergement */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              2. Hébergement
            </h2>
            <p className="mb-2">
              Ce site est hébergé par :
            </p>
            <div className="rounded-xl bg-gray-50 p-5 text-sm leading-relaxed space-y-1">
              <p><span className="font-semibold">Hébergeur :</span> OVHcloud</p>
              <p><span className="font-semibold">Adresse :</span> 2 rue Kellermann, 59100 Roubaix, France</p>
              <p><span className="font-semibold">Site web :</span>{' '}
                <a
                  href="https://www.ovhcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline"
                >
                  ovhcloud.com
                </a>
              </p>
            </div>
          </section>

          {/* 3. Propriété intellectuelle */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              3. Propriété intellectuelle
            </h2>
            <p className="leading-relaxed">
              L'ensemble du contenu de ce site — textes, graphismes, logotypes, icônes, images, ainsi que leur mise en forme — est la propriété exclusive de <strong>greencodin</strong> ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mt-3 leading-relaxed">
              Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de greencodin.
            </p>
          </section>

          {/* 4. Données personnelles */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              4. Données personnelles et RGPD
            </h2>
            <p className="leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-1.5 text-sm leading-relaxed">
              <li><strong>Droit d'accès</strong> : obtenir la confirmation que vos données sont traitées et en obtenir une copie</li>
              <li><strong>Droit de rectification</strong> : demander la correction de données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données dans les conditions prévues par la réglementation</li>
              <li><strong>Droit à la limitation du traitement</strong> : demander la restriction du traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et lisible par machine</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données à des fins de prospection</li>
            </ul>
            <div className="mt-4 rounded-xl bg-violet-50 border border-violet-100 p-4 text-sm">
              <p>
                Pour exercer ces droits ou pour toute question relative au traitement de vos données, contactez-nous à :{' '}
                <a
                  href="mailto:contact@greencodin.fr"
                  className="font-semibold text-violet-600 hover:underline"
                >
                  contact@greencodin.fr
                </a>
              </p>
              <p className="mt-2">
                Vous disposez également du droit d'introduire une réclamation auprès de la{' '}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-violet-600 hover:underline"
                >
                  CNIL
                </a>{' '}
                (Commission Nationale de l'Informatique et des Libertés).
              </p>
            </div>

            <h3 className="mt-6 mb-3 text-base font-bold text-gray-900">
              Données collectées lors de l'utilisation de l'outil d'analyse
            </h3>
            <p className="text-sm leading-relaxed">
              Lors de l'utilisation de l'outil d'analyse IA, les données suivantes peuvent être collectées :
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm leading-relaxed">
              <li>L'URL du site web soumis à analyse</li>
              <li>L'adresse e-mail et le nom (si renseignés volontairement dans le formulaire de contact)</li>
              <li>Un identifiant de session anonyme pour assurer la continuité du service</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              Ces données sont traitées dans le seul but de fournir le service d'analyse et ne sont ni revendues ni transmises à des tiers, à l'exception de l'API Claude d'Anthropic utilisée pour générer l'analyse (voir leurs{' '}
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 hover:underline"
              >
                conditions d'utilisation
              </a>
              ).
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              La durée de conservation des données est limitée au strict nécessaire pour le bon fonctionnement du service.
            </p>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              5. Cookies
            </h2>
            <p className="leading-relaxed text-sm">
              Ce site utilise uniquement des cookies techniques strictement nécessaires au bon fonctionnement du service (session utilisateur). Aucun cookie publicitaire ou de traçage tiers n'est déposé sur votre terminal.
            </p>
            <p className="mt-3 leading-relaxed text-sm">
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient être altérées.
            </p>
          </section>

          {/* 6. Responsabilité */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              6. Limitation de responsabilité
            </h2>
            <p className="leading-relaxed text-sm">
              Les analyses générées par greencodinIA sont produites par intelligence artificielle à titre indicatif uniquement. Elles ne constituent pas un conseil professionnel, juridique, financier ou opérationnel. greencodin ne saurait être tenu responsable des décisions prises sur la base de ces analyses.
            </p>
            <p className="mt-3 leading-relaxed text-sm">
              greencodin s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, mais ne peut garantir l'exhaustivité, la précision ou l'actualité de ces informations. greencodin décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
            </p>
          </section>

          {/* 7. Droit applicable */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              7. Droit applicable et juridiction
            </h2>
            <p className="leading-relaxed text-sm">
              Les présentes mentions légales sont soumises au droit français. En cas de litige et après tentative de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

          {/* 8. Crédit */}
          <section className="rounded-xl border border-violet-100 bg-violet-50 p-6">
            <h2 className="mb-3 text-base font-bold text-violet-900">
              Conception & développement
            </h2>
            <p className="text-sm leading-relaxed text-violet-800">
              Ce site a été conçu et développé par{' '}
              <a
                href="https://greencodin.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-violet-600 hover:underline"
              >
                greencodin
              </a>
              , studio spécialisé dans le développement web sur-mesure et l'intégration de solutions IA pour les entreprises.
            </p>
          </section>
        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="mt-16 border-t border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-400 sm:px-6">
          <p>
            © {new Date().getFullYear()} greencodinIA — Conçu par{' '}
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
      </footer>
    </div>
  );
}
