import Reveal from './Reveal';

const VALUES = [
  {
    no: '01',
    title: 'Connect',
    body: 'Meet new people\nnaturally.',
  },
  {
    no: '02',
    title: 'Move',
    body: 'Stay active,\nyour way.',
  },
  {
    no: '03',
    title: 'Vibe',
    body: 'Music, atmosphere,\nenergy.',
  },
  {
    no: '04',
    title: 'Food',
    body: 'Good food,\nbetter stories.',
  },
  {
    no: '05',
    title: 'Community',
    body: 'Come once.\nStay connected.',
  },
];

export default function Values() {
  return (
    <section className="relative bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 lg:gap-y-0 py-16 md:py-20 lg:py-24 lg:divide-x lg:divide-cream/10">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.no}
              delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}
              className={`px-0 lg:px-10 ${i === 0 ? 'lg:pl-0' : ''}`}
            >
              <div className="flex flex-col">
                <span className="eyebrow text-cream/40 text-[10px]">{v.no}</span>
                <h3 className="display-condensed text-moss text-3xl md:text-4xl lg:text-[2.5rem] mt-4 tracking-[0.04em]">
                  {v.title}
                </h3>
                <p className="mt-4 text-cream/65 text-[13px] leading-[1.65] whitespace-pre-line">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
