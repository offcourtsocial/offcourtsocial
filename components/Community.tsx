import Image from 'next/image';
import communityImg from '@/public/images/community.jpg';
import Reveal from './Reveal';

export default function Community() {
  return (
    <div
      id="community"
      className="relative min-h-[520px] lg:min-h-[640px] overflow-hidden border-l border-cream/5"
    >
      <Image
        src={communityImg}
        alt=""
        fill
        placeholder="blur"
        sizes="(max-width: 1024px) 100vw, 50vw"
        style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.65 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/65 to-ink/20"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full px-6 md:px-10 lg:px-14 py-20 md:py-24 lg:py-28 flex flex-col justify-center">
        <Reveal>
          <span className="eyebrow text-moss">Community</span>
        </Reveal>

        <Reveal delay={1}>
          <h2 className="display-condensed text-cream text-4xl md:text-5xl lg:text-[3.5rem] tracking-[0.02em] mt-6 leading-[0.98]">
            More than
            <br />a moment
          </h2>
        </Reveal>

        <Reveal delay={2} className="mt-10 max-w-md">
          <div className="space-y-6 text-cream/80 text-[14px] leading-[1.7]">
            <p>
              Offcourt Social isn&apos;t just about the day itself.
              <br />
              It&apos;s about what happens after.
            </p>
            <p className="text-cream/95">
              Familiar faces.
              <br />
              New connections.
              <br />A reason to come back.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
