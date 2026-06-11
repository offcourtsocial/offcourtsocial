'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import onCourtImg  from '@/public/images/extra-16.jpg';
import offCourtImg from '@/public/images/community.jpg';

export default function Hero() {
  const [split, setSplit]     = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calc = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setSplit(Math.min(Math.max(((clientX - left) / width) * 100, 25), 75));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove      = (e: MouseEvent)  => calc(e.clientX);
    const onTouchMove = (e: TouchEvent)  => { e.preventDefault(); calc(e.touches[0].clientX); };
    const onUp        = ()               => setDragging(false);
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('touchmove',  onTouchMove, { passive: false });
    window.addEventListener('touchend',   onUp);
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onUp);
    };
  }, [dragging, calc]);

  const startDrag = (clientX: number) => { setDragging(true); calc(clientX); };

  return (
    <section
      ref={containerRef}
      id="home"
      className={`relative min-h-[100svh] overflow-hidden bg-ink select-none ${dragging ? 'cursor-ew-resize' : ''}`}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
    >
      {/* ── LEFT: On Court ─────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        <Image
          src={onCourtImg}
          alt="On court"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(100%) brightness(0.85)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/80" />
        <div className="absolute bottom-14 md:bottom-18 left-6 md:left-10 lg:left-14">
          <span className="eyebrow text-cream/50 text-[9px] tracking-[0.35em] block mb-3">
            On court
          </span>
          <p className="display-h text-cream leading-[0.82]">
            <span className="block text-[12vw] md:text-[9vw] lg:text-[7.1vw]">WE</span>
            <span className="block text-[12vw] md:text-[9vw] lg:text-[7.1vw]">PLAY</span>
          </p>
        </div>
      </div>

      {/* ── RIGHT: Off Court ───────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${split}%)` }}
      >
        <Image
          src={offCourtImg}
          alt="Off court"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70" />
        <div className="absolute bottom-14 md:bottom-18 right-6 md:right-10 lg:right-14 text-right">
          <span className="eyebrow text-cream/50 text-[9px] tracking-[0.35em] block mb-3">
            Off court
          </span>
          <p className="display-h text-cream leading-[0.82]">
            <span className="block text-[12vw] md:text-[9vw] lg:text-[7.1vw]">WE</span>
            <span className="block text-[12vw] md:text-[9vw] lg:text-[7.1vw]">LIVE</span>
          </p>
        </div>
      </div>

      {/* ── DIVIDER ────────────────────────────────────────── */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${split}%`, transform: 'translateX(-50%)' }}
      >
        <div className="relative h-full flex flex-col items-center">
          <div className="w-px flex-1 bg-cream/20" />

          {/* Handle */}
          <div
            className={`pointer-events-auto shrink-0 w-10 h-10 border bg-ink/25 backdrop-blur-sm flex items-center justify-center cursor-ew-resize transition-all duration-200 ${
              dragging
                ? 'scale-110 border-cream/60 bg-ink/50'
                : 'border-cream/30 hover:scale-110 hover:border-cream/55'
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

      {/* ── CENTER CTA ─────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-14 md:bottom-18 z-10 flex justify-center pointer-events-none">
        <a
          href="#gathering"
          className="btn-line btn-moss pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Reserve your spot</span>
        </a>
      </div>

      {/* ── SCROLL HINT ────────────────────────────────────── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="eyebrow text-cream/35 text-[9px]">Scroll</span>
        <div className="scroll-line" aria-hidden="true" />
      </div>
    </section>
  );
}
