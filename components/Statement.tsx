import Reveal from './Reveal';

export default function Statement() {
  return (
    <section className="relative bg-cream text-ink">
      <div className="grain-overlay-dark" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40">
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="serif-italic text-3xl md:text-5xl lg:text-[3.4rem] leading-[1.15] text-ink">
              Not every gathering looks the same.
              <br />
              But they all feel the same.
            </h2>
            <div className="mt-10 md:mt-14 flex items-center gap-4">
              <span className="block w-8 h-px bg-ink/30" />
              <p className="eyebrow text-ink/70">
                Built around people, not just the moment
              </p>
              <span className="block w-8 h-px bg-ink/30" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
