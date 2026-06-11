'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { threshold, rootMargin: '0px 0px -10% 0px' }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }
    // Fallback
    setVisible(true);
  }, [threshold]);

  const delayClass = delay ? `reveal-delay-${delay}` : '';
  const TagAny = Tag as any;

  return (
    <TagAny
      ref={ref as any}
      className={`reveal ${visible ? 'is-visible' : ''} ${delayClass} ${className}`}
    >
      {children}
    </TagAny>
  );
}
