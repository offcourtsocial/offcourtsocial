import type { Metadata } from 'next';
import { Anton, Bebas_Neue, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import GrainOverlay from '@/components/GrainOverlay';
import { Analytics } from '@vercel/analytics/next';

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-display',
});

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-condensed',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Offcourt Social — More than a moment',
  description:
    'Offcourt Social is a series of social gatherings designed to bring people together in the right setting. Movement, music, food and people. Rotterdam.',
  openGraph: {
    title: 'Offcourt Social — More than a moment',
    description:
      'Where people come together, beyond the moment. A community-first social gathering concept.',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  themeColor: '#0B0B0B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebas.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="bg-ink text-cream antialiased">
        <GrainOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
