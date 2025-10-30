import { useState } from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/StudiosRefonte/HeroSection';
import StudiosGridSection from '../components/StudiosRefonte/StudiosGridSection';
import StudioPricingSimulatorSection from '../components/StudiosRefonte/StudioPricingSimulatorSection';
import StudioComparatorSection from '../components/StudiosRefonte/StudioComparatorSection';
import FormulasComparisonSection from '../components/StudiosRefonte/FormulasComparisonSection';
import StudioEquipmentSection from '../components/StudiosRefonte/StudioEquipmentSection';
import StudioAdditionalServicesSection from '../components/StudiosRefonte/StudioAdditionalServicesSection';
import ProcessSection from '../components/StudiosRefonte/ProcessSection';
import TestimonialsSection from '../components/StudiosRefonte/TestimonialsSection';
import FAQSection from '../components/StudiosRefonte/FAQSection';
import FinalCTASection from '../components/StudiosRefonte/FinalCTASection';
import { studios } from '../data/studios/studiosData';

export default function Studios() {
  const [selectedStudioId, setSelectedStudioId] = useState<string | null>(studios[0].id);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />

        <StudiosGridSection
          studios={studios}
          onStudioSelect={setSelectedStudioId}
          selectedStudioId={selectedStudioId}
        />

        <StudioPricingSimulatorSection
          selectedStudioId={selectedStudioId}
          onStudioSelect={setSelectedStudioId}
        />

        <StudioComparatorSection />

        <FormulasComparisonSection />

        <StudioEquipmentSection />

        <StudioAdditionalServicesSection />

        <ProcessSection />

        <TestimonialsSection />

        <FAQSection />

        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
