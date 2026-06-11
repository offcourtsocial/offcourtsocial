import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import Marquee from '@/components/Marquee';
import Concept from '@/components/Concept';
import Values from '@/components/Values';
import VisualBreak from '@/components/VisualBreak';
import NextGathering from '@/components/NextGathering';
import EditorialCard from '@/components/EditorialCard';
import Community from '@/components/Community';
import Gallery from '@/components/Gallery';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Statement />
      <Marquee />
      <Concept />
      <Values />
      <VisualBreak />
      <NextGathering />
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-ink relative">
        <EditorialCard />
        <Community />
      </section>
      <Gallery />
      <FinalCTA />
      <Footer />
    </main>
  );
}
