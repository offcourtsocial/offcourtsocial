import Image from 'next/image';
import visualBreakImg from '@/public/images/visual-break.jpg';
import Reveal from './Reveal';

export default function VisualBreak() {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <div className="relative h-[44vh] min-h-[320px] md:h-[52vh] md:min-h-[420px] lg:h-[58vh] lg:min-h-[480px] img-hover">
        <Image
          src={visualBreakImg}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="img-wrap"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink/65"
          aria-hidden="true"
        />
        <div className="vignette" aria-hidden="true" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <Reveal>
            <h2 className="serif-italic text-cream text-3xl md:text-5xl lg:text-6xl text-center px-6 leading-tight">
              You had to be there.
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
