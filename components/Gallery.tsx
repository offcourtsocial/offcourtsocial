'use client';

import Image, { StaticImageData } from 'next/image';
import Reveal from './Reveal';
import g1  from '@/public/images/gallery/gallery-1.jpg';
import g2  from '@/public/images/gallery/gallery-2.jpg';
import g3  from '@/public/images/gallery/gallery-3.jpg';
import g4  from '@/public/images/gallery/gallery-4.jpg';
import g9  from '@/public/images/gallery/gallery-9.jpg';
import g10 from '@/public/images/gallery/gallery-10.jpg';

const IMAGES: { src: StaticImageData; alt: string }[] = [
  { src: g1,  alt: 'Entrance and branding' },
  { src: g2,  alt: 'Social interaction'    },
  { src: g3,  alt: 'Detail — the ball'     },
  { src: g4,  alt: 'Gameplay'              },
  { src: g9,  alt: 'Dynamic match'         },
  { src: g10, alt: 'Celebration moment'    },
];

export default function Gallery() {
  return (
    <section className="relative bg-ink text-cream border-t border-cream/5">
      {/* Section header */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pt-20 md:pt-24 pb-14 md:pb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="eyebrow text-cream/45">Follow our journey</span>
            <a
              href="https://instagram.com/offcourt.social"
              target="_blank"
              rel="noreferrer"
              className="display-condensed text-cream text-3xl md:text-4xl tracking-[0.03em] hover:text-moss transition-colors duration-500"
            >
              @offcourt.social
            </a>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <a
            href="https://instagram.com/offcourt.social"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 eyebrow text-cream/50 hover:text-cream transition-colors duration-500"
          >
            <span>View on Instagram</span>
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </Reveal>
      </div>

      {/* Image grid */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pb-20 md:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {IMAGES.map(({ src, alt }, i) => (
            <Reveal
              key={alt}
              delay={Math.min((i % 3) + 1, 4) as 1 | 2 | 3 | 4}
            >
              <div className="relative aspect-square overflow-hidden group cursor-pointer">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  placeholder="blur"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                {/* Dark hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-500" />
                {/* "View" label */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="eyebrow text-cream text-[9px] tracking-[0.4em] border border-cream/40 px-4 py-2">
                    View
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
