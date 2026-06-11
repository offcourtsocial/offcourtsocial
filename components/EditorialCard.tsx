import Reveal from './Reveal';

const ITEMS = [
  'Move or take it easy',
  'Stay for a drink or stay all day',
  'Meet people or come with friends',
];

export default function EditorialCard() {
  return (
    <div className="relative bg-ink px-6 md:px-10 lg:pl-14 lg:pr-12 py-20 md:py-24 lg:py-28 flex items-center justify-center min-h-[520px]">
      <Reveal>
        <div className="relative paper rounded-[3px] w-full max-w-[440px] px-9 py-12 md:px-11 md:py-14 transform rotate-[-1.5deg] hover:rotate-0 transition-transform duration-700 ease-editorial">
          <div className="grain-overlay-dark" aria-hidden="true" />

          {/* Tape pieces */}
          <span className="tape tape-tl" aria-hidden="true" />
          <span className="tape tape-tr" aria-hidden="true" />
          <span className="tape tape-bl" aria-hidden="true" />

          <div className="relative">
            <h3 className="serif-italic text-ink text-2xl md:text-[1.7rem] leading-tight">
              Your day, your way
            </h3>

            <ul className="mt-8 divide-y divide-ink/15 border-t border-ink/15">
              {ITEMS.map((item) => (
                <li
                  key={item}
                  className="py-4 text-ink/85 text-[12.5px] tracking-[0.18em] uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 serif-italic text-ink/70 text-lg">
              It's up to you.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
