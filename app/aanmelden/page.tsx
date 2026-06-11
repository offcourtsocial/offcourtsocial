'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import onCourtImg from '@/public/images/extra-16.jpg';
import offCourtImg from '@/public/images/community.jpg';
import gatheringImg from '@/public/images/gathering.jpg';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  naam: string;
  email: string;
  leeftijd: string;
  telefoon: string;
}

// ─── Reveal helper ────────────────────────────────────────────────────────────

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  label, type, value, onChange, placeholder, required, min, max,
}: {
  label: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean; min?: string; max?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="eyebrow text-cream/45 text-[10px]">{label}</label>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        required={required} min={min} max={max}
        className="bg-transparent border border-cream/12 text-cream text-[14px] px-4 py-3 outline-none focus:border-cream/35 transition-colors duration-300 placeholder:text-cream/18 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AanmeldenPage() {
  // Split hero
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcSplit = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setSplit(Math.min(Math.max(((clientX - left) / width) * 100, 25), 75));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => calcSplit(e.clientX);
    const onTouch = (e: TouchEvent) => { e.preventDefault(); calcSplit(e.touches[0].clientX); };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouch, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, calcSplit]);

  const startDrag = (clientX: number) => { setDragging(true); calcSplit(clientX); };

  // Form
  const [form, setForm] = useState<FormState>({ naam: '', email: '', leeftijd: '', telefoon: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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
    <main className="relative bg-ink text-cream min-h-screen overflow-x-hidden">

      {/* ── HEADER (minimal) ──────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-normal">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
          <div className="flex h-20 items-center justify-between">
            <a href="/aanmelden" className="flex flex-col leading-none">
              <span className="display-condensed text-cream text-[22px] tracking-[0.05em]">OFFCOURT</span>
              <span className="eyebrow text-cream/60 text-[9px] mt-1">Social</span>
            </a>
            <a
              href="#aanmelden"
              className="btn-line btn-moss hidden sm:inline-flex"
            >
              <span>Aanmelden</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO (split) ──────────────────────────────────────────────────── */}
      <section
        ref={containerRef}
        id="hero"
        className={`relative min-h-[100svh] overflow-hidden bg-ink select-none ${dragging ? 'cursor-ew-resize' : ''}`}
        onMouseDown={(e) => startDrag(e.clientX)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      >
        {/* Left */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
          <Image
            src={onCourtImg} alt="On court" fill priority placeholder="blur" sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(100%) brightness(0.85)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/80" />
          <div className="absolute bottom-14 md:bottom-18 left-6 md:left-10 lg:left-14">
            <span className="eyebrow text-cream/50 text-[9px] tracking-[0.35em] block mb-3">On court</span>
            <p className="display-h text-cream leading-[0.82]">
              <span className="block text-[7vw] md:text-[5vw] lg:text-[4vw]">WE</span>
              <span className="block text-[7vw] md:text-[5vw] lg:text-[4vw]">PLAY</span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          <Image
            src={offCourtImg} alt="Off court" fill priority placeholder="blur" sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70" />
          <div className="absolute bottom-14 md:bottom-18 right-6 md:right-10 lg:right-14 text-right">
            <span className="eyebrow text-cream/50 text-[9px] tracking-[0.35em] block mb-3">Off court</span>
            <p className="display-h text-cream leading-[0.82]">
              <span className="block text-[7vw] md:text-[5vw] lg:text-[4vw]">WE</span>
              <span className="block text-[7vw] md:text-[5vw] lg:text-[4vw]">LIVE</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${split}%`, transform: 'translateX(-50%)' }}
        >
          <div className="relative h-full flex flex-col items-center">
            <div className="w-px flex-1 bg-cream/20" />
            <div
              className={`pointer-events-auto shrink-0 w-10 h-10 border bg-ink/25 backdrop-blur-sm flex items-center justify-center cursor-ew-resize transition-all duration-200 ${
                dragging ? 'scale-110 border-cream/60 bg-ink/50' : 'border-cream/30 hover:scale-110 hover:border-cream/55'
              }`}
              onMouseDown={(e) => { e.stopPropagation(); startDrag(e.clientX); }}
              onTouchStart={(e) => { e.stopPropagation(); startDrag(e.touches[0].clientX); }}
            >
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="text-cream/65">
                <path d="M7 1L3 5l4 4M11 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="w-px flex-1 bg-cream/20" />
          </div>
        </div>

        {/* Center CTA */}
        <div className="absolute inset-x-0 bottom-14 md:bottom-18 z-10 flex justify-center pointer-events-none">
          <a
            href="#aanmelden"
            className="btn-line btn-moss pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Meld je aan</span>
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
          <span className="eyebrow text-cream/35 text-[9px]">Scroll</span>
          <div className="scroll-line" aria-hidden="true" />
        </div>
      </section>

      {/* ── INTRO STATEMENT ───────────────────────────────────────────────── */}
      <section className="bg-ink border-t border-cream/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow text-moss text-[10px]">Offcourt Social — Padel & Vibes</span>
            <h2 className="display-h text-cream text-[10vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[4.5rem] leading-[0.92] mt-5">
              More than<br />a moment
            </h2>
          </Reveal>
          <Reveal delay={1} className="mt-8 max-w-xl">
            <p className="text-cream/60 text-[15px] md:text-[16px] leading-[1.75]">
              Offcourt Social is een event dat mensen samenbrengt in de juiste sfeer.
              Padel, muziek, eten en een community die verder gaat dan het veld.
              Op <strong className="text-cream/90 font-medium">5 juli 2026</strong> in Rotterdam. Gratis toegang.{' '}
              <a href="#aanmelden" className="text-cream underline underline-offset-4 decoration-cream/30 hover:decoration-cream transition-all duration-300">
                Meld je aan en reserveer je plek.
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── EVENT + FORM ──────────────────────────────────────────────────── */}
      <section id="aanmelden" className="bg-ink border-t border-cream/5">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left: event details with image */}
          <div className="relative overflow-hidden min-h-[480px] lg:min-h-[760px]">
            <Image
              src={gatheringImg} alt="" fill placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink/95 via-ink/80 to-ink/40" aria-hidden="true" />

            <div className="relative z-10 h-full px-6 md:px-10 lg:px-14 py-20 md:py-24 lg:py-28 flex flex-col justify-between">
              <div>
                <Reveal>
                  <span className="eyebrow text-cream/55">Het event</span>
                </Reveal>

                <Reveal delay={1}>
                  <h2 className="display-condensed text-cream text-4xl md:text-5xl lg:text-[3.2rem] tracking-[0.02em] mt-6 leading-[0.98]">
                    Offcourt Social<br />
                    <span className="text-moss">— Padel & Vibes</span>
                  </h2>
                </Reveal>

                <Reveal delay={2} className="mt-10">
                  <ul className="space-y-5 text-cream/85 text-[14px]">
                    <li className="flex items-center gap-4">
                      <IconCalendar />
                      <span className="tracking-[0.12em] uppercase">Sunday, 5 July 2026</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <IconClock />
                      <span className="tracking-[0.12em] uppercase">17:00 — 21:00</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <IconPin />
                      <span className="tracking-[0.12em] uppercase">Rive Club Padel — Capelle a/d IJssel</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <IconTicket />
                      <span className="tracking-[0.12em] uppercase">Gratis</span>
                    </li>
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={3} className="mt-12">
                <div className="border-t border-cream/10 pt-10">
                  <p className="eyebrow text-cream/40 text-[10px] mb-6">Wat je kunt verwachten</p>
                  <ul className="space-y-3">
                    {['Rackets & rallies', 'Gaming', 'BBQ by Mandja Grill', 'Drinks', 'Music', 'Good vibes'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-cream/70 text-[13px] tracking-wide">
                        <span className="w-1 h-1 rounded-full bg-moss shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: sign-up form */}
          <div className="px-6 md:px-10 lg:px-14 py-20 md:py-24 lg:py-28 lg:border-l border-cream/5">
            {status === 'success' ? (
              <SuccessView naam={form.naam} />
            ) : (
              <>
                <Reveal>
                  <span className="eyebrow text-moss text-[10px]">Aanmelden</span>
                  <h3 className="display-condensed text-cream text-[2.4rem] md:text-[2.8rem] tracking-[0.02em] mt-4 leading-[1.0]">
                    Reserveer<br />je plek
                  </h3>
                  <p className="mt-4 text-cream/50 text-[13px] leading-relaxed">
                    Vul je gegevens in — na aanmelding ontvang je een bevestiging per e-mail.
                  </p>
                </Reveal>

                <Reveal delay={1} className="mt-10">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
                    <Field label="Naam" type="text" value={form.naam} onChange={set('naam')} placeholder="Voor- en achternaam" required />
                    <Field label="E-mailadres" type="email" value={form.email} onChange={set('email')} placeholder="jouw@email.nl" required />
                    <Field label="Leeftijd" type="number" value={form.leeftijd} onChange={set('leeftijd')} placeholder="bijv. 26" required min="16" max="99" />
                    <Field label="Telefoonnummer" type="tel" value={form.telefoon} onChange={set('telefoon')} placeholder="+31 6 00 00 00 00" required />

                    {status === 'error' && (
                      <p className="eyebrow text-[10px] text-wine/80">Er ging iets mis — probeer het opnieuw.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-line btn-moss w-full mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{status === 'loading' ? 'Aanmelden…' : 'Aanmelden'}</span>
                    </button>

                    <p className="text-cream/30 text-[11px] text-center leading-relaxed">
                      Limited spots available. Gratis toegang.
                    </p>
                  </form>
                </Reveal>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER (minimal) ──────────────────────────────────────────────── */}
      <footer className="border-t border-cream/5 bg-ink">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/aanmelden" className="flex flex-col leading-none">
            <span className="display-condensed text-cream text-[18px] tracking-[0.05em]">OFFCOURT</span>
            <span className="eyebrow text-cream/40 text-[9px] mt-0.5">Social</span>
          </a>
          <p className="eyebrow text-cream/30 text-[9px] text-center sm:text-right">
            © 2026 Offcourt Social — Rotterdam
          </p>
        </div>
      </footer>

    </main>
  );
}

// ─── Success view ─────────────────────────────────────────────────────────────

function SuccessView({ naam }: { naam: string }) {
  return (
    <div className="flex flex-col py-6 max-w-md">
      <div className="w-11 h-11 border border-moss/60 flex items-center justify-center mb-7">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6F7D5C" strokeWidth="1.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="eyebrow text-moss text-[10px]">Aanmelding ontvangen</span>
      <h2 className="display-condensed text-cream text-[2.8rem] mt-4 leading-[1.0]">
        Tot dan,<br />{naam}.
      </h2>
      <p className="mt-6 text-cream/55 text-[14px] leading-relaxed max-w-sm">
        Check je inbox — we sturen je een bevestiging met alle details.
      </p>
      <div className="mt-10 border-t border-cream/8 pt-8">
        <p className="eyebrow text-cream/35 text-[10px] mb-4">5 Juli 2026 · Rive Club Padel · Capelle a/d IJssel</p>
        <p className="text-cream/50 text-[13px]">We kijken ernaar uit je te ontmoeten.</p>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-cream/60 shrink-0">
      <rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-cream/60 shrink-0">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-cream/60 shrink-0">
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function IconTicket() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-cream/60 shrink-0">
      <path d="M2 9a1 1 0 0 1 0-2V5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1 0 2v2a1 1 0 0 1 0 2v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 0-2V9z" />
    </svg>
  );
}
