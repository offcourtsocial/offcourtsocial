'use client';

import { useState } from 'react';
import Image from 'next/image';
import gatheringImg from '@/public/images/gathering.jpg';
import Reveal from './Reveal';
import RegisterModal from './RegisterModal';

const EXPECTATIONS = [
  'Movement',
  'Social spaces',
  'Music',
  'Food & drinks',
  'On & off-court experiences',
];

export default function NextGathering() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="gathering"
        className="relative bg-ink text-cream border-t border-cream/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Event details */}
          <div className="px-6 md:px-10 lg:pl-14 lg:pr-12 py-20 md:py-24 lg:py-28 lg:border-r border-cream/5">
            <Reveal>
              <span className="eyebrow text-cream/55">Next gathering</span>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="display-condensed text-cream text-4xl md:text-5xl lg:text-[3.5rem] tracking-[0.02em] mt-6 leading-[0.98]">
                Offcourt Social
                <br />
                <span className="text-cream/95">— Launch</span>
              </h2>
            </Reveal>

            <Reveal delay={2} className="mt-10">
              <ul className="space-y-5 text-cream/85 text-[14px]">
                <li className="flex items-center gap-4">
                  <IconCalendar />
                  <span className="tracking-[0.12em] uppercase">
                    Sunday, 5 July 2026
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <IconClock />
                  <span className="tracking-[0.12em] uppercase">14:00 — 20:00</span>
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

            <Reveal delay={3} className="mt-12">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-line btn-moss inline-flex"
              >
                <span>Reserve your spot</span>
              </button>
              <p className="mt-5 eyebrow text-cream/45 text-[10px]">
                Limited spots available
              </p>
            </Reveal>
          </div>

          {/* Right: Image background with what-to-expect overlay */}
          <div className="relative min-h-[420px] lg:min-h-[640px] overflow-hidden">
            <Image
              src={gatheringImg}
              alt=""
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/30"
              aria-hidden="true"
            />

            <div className="relative z-10 h-full px-6 md:px-10 lg:px-14 py-16 md:py-20 lg:py-24 flex flex-col justify-center">
              <Reveal delay={1}>
                <span className="eyebrow text-cream/55">What to expect</span>
              </Reveal>

              <ul className="mt-8 max-w-sm divide-y divide-cream/10 border-t border-cream/10">
                {EXPECTATIONS.map((item, i) => (
                  <Reveal
                    key={item}
                    delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}
                    as="li"
                  >
                    <div className="flex items-center justify-between py-4 group">
                      <span className="text-cream tracking-[0.18em] uppercase text-[12px]">
                        {item}
                      </span>
                      <span className="text-cream/30 group-hover:text-moss group-hover:translate-x-1 transition-all duration-500">
                        →
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && <RegisterModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-cream/60 shrink-0">
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-cream/60 shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-cream/60 shrink-0">
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
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
