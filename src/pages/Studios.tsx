import { useState } from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/StudiosRefonte/HeroSection';
import ProcessSection from '../components/StudiosRefonte/ProcessSection';
import StudiosGridSection from '../components/StudiosRefonte/StudiosGridSection';
import StudioDetailModal from '../components/StudiosRefonte/StudioDetailModal';
import FormulasComparisonSection from '../components/StudiosRefonte/FormulasComparisonSection';
import StudioComparatorSection from '../components/StudiosRefonte/StudioComparatorSection';
import StudioEquipmentSection from '../components/StudiosRefonte/StudioEquipmentSection';
import StudioPricingSimulatorSection from '../components/StudiosRefonte/StudioPricingSimulatorSection';
import StudioAdditionalServicesSection from '../components/StudiosRefonte/StudioAdditionalServicesSection';
import TestimonialsSection from '../components/StudiosRefonte/TestimonialsSection';
import FAQSection from '../components/StudiosRefonte/FAQSection';
import FinalCTASection from '../components/StudiosRefonte/FinalCTASection';
import { studios } from '../data/studios/studiosData';
import { Studio } from '../data/studios/studiosData';

export default function Studios() {
  const [selectedStudioId, setSelectedStudioId] = useState<string | null>(studios[0].id);
  const [detailModalStudio, setDetailModalStudio] = useState<Studio | null>(null);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />
        <ProcessSection />
        <StudiosGridSection
          studios={studios}
          onStudioSelect={setDetailModalStudio}
          selectedStudioId={selectedStudioId}
        />
        <FormulasComparisonSection />
        <StudioComparatorSection />
        <StudioEquipmentSection />
        <StudioPricingSimulatorSection
          selectedStudioId={selectedStudioId}
          onStudioSelect={setSelectedStudioId}
        />
        <StudioAdditionalServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />

      <StudioDetailModal
        studio={detailModalStudio}
        onClose={() => setDetailModalStudio(null)}
        onSelect={(studioId) => {
          setSelectedStudioId(studioId);
          setDetailModalStudio(null);
        }}
      />
    </div>
  );
}
