const items = [
  'Rotterdam',
  'NL',
  'More than a moment',
  'Offcourt Social',
  'Est. 2025',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden bg-ink border-y border-cream/10 py-6 md:py-7"
    >
      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="display-condensed text-cream text-xl md:text-2xl lg:text-[1.75rem] tracking-[0.08em] px-8 md:px-12">
              {item}
            </span>
            <span className="text-cream/30 shrink-0 text-xs">●</span>
          </div>
        ))}
      </div>
    </section>
  );
}
