import axios from 'axios';
import { useState } from 'react';

interface Props {
  leadId: number;
  show: boolean;
}

export default function LeadCapture({ leadId, show }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!show) {
    return null;
  }

  function validate(): boolean {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Prénom requis';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email invalide';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await axios.post(`/api/analyse/${leadId}/capture`, { name, email });
      setSuccess(true);
    } catch (e: any) {
      const data = e.response?.data?.errors ?? {};
      setErrors({
        name: data.name?.[0],
        email: data.email?.[0],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-violet-200 shadow-lg">
      {/* Header violet */}
      <div className="flex items-start gap-3 bg-gradient-to-r from-violet-700 to-indigo-600 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg leading-tight font-bold text-white">
            Recevez votre plan détaillé gratuit
          </h3>
          <p className="mt-1 text-sm text-white/75">
            Feuille de route complète + estimations de coût + priorisation
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white px-4 py-4 sm:px-6 sm:py-5">
        {success ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-6 w-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900">Plan envoyé !</p>
              <p className="mt-1 text-sm text-gray-500">
                Vérifiez votre boîte mail. Je vous recontacte sous 24h.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-sm placeholder-gray-400 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-violet-500 ${
                    errors.name
                      ? 'border-red-300 ring-1 ring-red-300'
                      : 'border-gray-200'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-sm placeholder-gray-400 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-violet-500 ${
                    errors.email
                      ? 'border-red-300 ring-1 ring-red-300'
                      : 'border-gray-200'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <>
                  Envoyer mon plan gratuit
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
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              Aucun spam · Réponse sous 24h · Gratuit
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
