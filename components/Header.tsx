'use client';

import { useEffect, useState } from 'react';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gatherings', href: '#gatherings' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-editorial ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-cream/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex flex-col leading-none">
            <span className="display-condensed text-cream text-[22px] tracking-[0.05em]">
              OFFCOURT
            </span>
            <span className="eyebrow text-cream/60 text-[9px] mt-1">
              Social
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative eyebrow text-cream/80 hover:text-cream transition-colors duration-500"
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-cream transition-all duration-500 ease-editorial ${
                    i === 0 ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <a href="#gathering" className="btn-line btn-outline">
              <span>Join the community</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
          >
            <span
              className={`block w-6 h-px bg-cream transition-transform duration-500 ${
                open ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-cream transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-px bg-cream transition-transform duration-500 ${
                open ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-700 ease-editorial bg-ink/95 backdrop-blur-lg ${
          open ? 'max-h-[600px] border-t border-cream/10' : 'max-h-0'
        }`}
      >
        <nav className="px-6 py-8 flex flex-col gap-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display-condensed text-cream text-3xl tracking-tight"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#gathering"
            onClick={() => setOpen(false)}
            className="btn-line btn-outline mt-4 self-start"
          >
            <span>Join the community</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
