import Reveal from './Reveal';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero.jpg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/75 to-ink/95"
        aria-hidden="true"
      />
      <div className="vignette" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <h2 className="display-h text-cream text-[14vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[8rem] leading-[0.9] tracking-tightest">
              Offcourt Social
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="serif-italic text-cream/85 text-xl md:text-2xl mt-6">
              More than a moment
            </p>
          </Reveal>

          <Reveal delay={2}>
            <a href="#gathering" className="btn-line btn-moss mt-12">
              <span>Join the next gathering</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
