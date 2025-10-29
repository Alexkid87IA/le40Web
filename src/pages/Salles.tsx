import { useState } from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Salles/HeroSection';
import SpacesGridSection from '../components/Salles/SpacesGridSection';
import SpaceDetailModal from '../components/Salles/SpaceDetailModal';
import TestimonialsSection from '../components/Salles/TestimonialsSection';
import FAQSection from '../components/Salles/FAQSection';
import FinalCTASection from '../components/Salles/FinalCTASection';
import { spaces } from '../data/salles/spaces';
import { Space } from '../data/salles/spaces';

export default function Salles() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />
        <SpacesGridSection
          spaces={spaces}
          onSpaceClick={setSelectedSpace}
        />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />

      <SpaceDetailModal
        space={selectedSpace}
        onClose={() => setSelectedSpace(null)}
      />
    </div>
  );
}
