import { useState } from 'react';
import SEOHead from '../components/SEO/SEOHead';
import { serviceSchemas } from '../utils/seoSchemas';
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
      <SEOHead
        title="Studios Créatifs & Production Audio-Visuelle Marseille"
        description="Louez nos studios créatifs équipés à Marseille. Fond vert, éclairage professionnel, matériel audio/vidéo. Parfait pour créateurs de contenu, podcasters et vidéastes. Réservation en ligne."
        keywords="studio créatif Marseille, studio podcast Marseille, fond vert Marseille, location studio vidéo Marseille, production audiovisuelle Marseille, studio tournage Marseille"
        schema={serviceSchemas.studios}
      />
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />

        <div className="relative">
          <div className="fixed inset-0 z-0 pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761803653/d928c6b7-f494-4466-81f2-040f32b9eadc_nqynim.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          </div>

          <div className="relative z-10">
            <ProcessSection />
            <StudiosGridSection
              studios={studios}
              onStudioSelect={setDetailModalStudio}
              selectedStudioId={selectedStudioId}
            />
            <section id="formulas">
              <FormulasComparisonSection />
            </section>
            <StudioComparatorSection />
            <section id="equipment">
              <StudioEquipmentSection />
            </section>
            <StudioPricingSimulatorSection
              selectedStudioId={selectedStudioId}
              onStudioSelect={setSelectedStudioId}
            />
            <section id="additional-services">
              <StudioAdditionalServicesSection />
            </section>
            <section id="testimonials">
              <TestimonialsSection />
            </section>
            <section id="faq">
              <FAQSection />
            </section>
            <FinalCTASection />
          </div>
        </div>
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
