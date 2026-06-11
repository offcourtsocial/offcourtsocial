'use client';

import { useState, useEffect } from 'react';

interface Props {
  onClose: () => void;
}

interface FormState {
  naam: string;
  email: string;
  leeftijd: string;
  telefoon: string;
}

export default function RegisterModal({ onClose }: Props) {
  const [form, setForm] = useState<FormState>({ naam: '', email: '', leeftijd: '', telefoon: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-ink border border-cream/10 p-8 md:p-10 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          aria-label="Sluiten"
          className="absolute top-5 right-5 text-cream/35 hover:text-cream transition-colors duration-300 text-xl leading-none"
        >
          ✕
        </button>

        {status === 'success' ? (
          <SuccessView naam={form.naam} onClose={onClose} />
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <span className="eyebrow text-moss text-[10px]">Offcourt Social — Launch</span>
              <h2 className="display-condensed text-cream text-[2rem] tracking-[0.02em] mt-3 leading-[1.0]">
                Reserveer
                <br />
                je plek
              </h2>
              <p className="mt-4 text-cream/50 text-[13px] leading-relaxed">
                Sunday, 5 July 2026 · 14:00–20:00
                <br />
                Rive Club Padel, Capelle a/d IJssel ·{' '}
                <span className="text-cream/80">Gratis</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field
                label="Naam"
                type="text"
                value={form.naam}
                onChange={set('naam')}
                placeholder="Voor- en achternaam"
                required
              />
              <Field
                label="E-mailadres"
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="jouw@email.nl"
                required
              />
              <Field
                label="Leeftijd"
                type="number"
                value={form.leeftijd}
                onChange={set('leeftijd')}
                placeholder="bijv. 26"
                required
                min="16"
                max="99"
              />
              <Field
                label="Telefoonnummer"
                type="tel"
                value={form.telefoon}
                onChange={set('telefoon')}
                placeholder="+31 6 00 00 00 00"
                required
              />

              {status === 'error' && (
                <p className="eyebrow text-[10px] text-wine/80">
                  Er ging iets mis. Probeer het opnieuw.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-line btn-moss w-full mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{status === 'loading' ? 'Aanmelden…' : 'Aanmelden'}</span>
              </button>

              <p className="text-cream/30 text-[11px] text-center leading-relaxed">
                Na aanmelding ontvang je een bevestiging per e-mail.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  min,
  max,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="eyebrow text-cream/45 text-[10px]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="bg-transparent border border-cream/12 text-cream text-[14px] px-4 py-3 outline-none focus:border-cream/35 transition-colors duration-300 placeholder:text-cream/18 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

function SuccessView({ naam, onClose }: { naam: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-11 h-11 border border-moss/60 flex items-center justify-center mb-7">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6F7D5C" strokeWidth="1.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="eyebrow text-moss text-[10px]">Aanmelding ontvangen</span>
      <h2 className="display-condensed text-cream text-[2.2rem] mt-4 leading-[1.0]">
        Tot dan,
        <br />
        {naam}.
      </h2>
      <p className="mt-5 text-cream/55 text-[13px] leading-relaxed max-w-[260px]">
        Check je inbox — we hebben een bevestiging gestuurd met alle details van de avond.
      </p>
      <button onClick={onClose} className="btn-line btn-outline mt-8">
        <span>Sluiten</span>
      </button>
    </div>
  );
}
