const FOOTER_NAV = [
  { label: 'About', href: '#about' },
  { label: 'Gatherings', href: '#gathering' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-ink text-cream border-t border-cream/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <a href="#home" className="flex flex-col leading-none">
            <span className="display-condensed text-cream text-[20px] tracking-[0.05em]">
              OFFCOURT
            </span>
            <span className="eyebrow text-cream/55 text-[8px] mt-1">Social</span>
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap items-center gap-7 md:gap-10">
            {FOOTER_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="eyebrow text-cream/65 hover:text-cream transition-colors duration-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col md:items-end gap-1">
            <a
              href="mailto:hello@offcourtsocial.com"
              className="flex items-center gap-2 text-cream/85 hover:text-cream transition-colors text-[12px] tracking-[0.16em] uppercase"
            >
              <IconInsta />
              hello@offcourtsocial.com
            </a>
            <span className="eyebrow text-cream/45 text-[10px]">
              Rotterdam, NL
            </span>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="eyebrow text-cream/35 text-[10px]">
            © {new Date().getFullYear()} Offcourt Social
          </p>
          <p className="eyebrow text-cream/35 text-[10px]">
            More than a moment
          </p>
        </div>
      </div>
    </footer>
  );
}

function IconInsta() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="text-cream/55"
    >
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
