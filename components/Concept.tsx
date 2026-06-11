'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import conceptImg from '@/public/images/concept.jpg';
import Reveal from './Reveal';

export default function Concept() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={sectionRef} id="about" className="relative bg-ink text-cream">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:min-h-[760px]">
        {/* Left: Text */}
        <div className="lg:col-span-5 px-6 md:px-10 lg:pl-14 lg:pr-12 py-20 md:py-28 lg:py-32 flex flex-col justify-center">
          <Reveal>
            <span className="eyebrow text-moss">What is Offcourt Social</span>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-7 serif-italic text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.18] text-cream">
              Offcourt Social is a series of social gatherings designed to bring
              people together in the right setting.
            </h2>
          </Reveal>

          <Reveal delay={2} className="mt-10">
            <div className="space-y-6 text-cream/75 text-[15px] leading-[1.7] max-w-md">
              <p>
                No fixed format.
                <br />
                No expectations.
              </p>
              <p>Just the right mix of movement, music, food and people.</p>
              <p>
                Each edition is different.
                <br />
                The feeling never is.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right: Image with parallax */}
        <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-full overflow-hidden">
          <motion.div className="absolute inset-[-8%]" style={{ y }}>
            <Image
              src={conceptImg}
              alt="Offcourt Social atmosphere"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 60vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
          <div className="absolute inset-y-0 left-0 w-px bg-cream/10 hidden lg:block" />
        </div>
      </div>

      <div className="hairline" />
    </section>
  );
}
