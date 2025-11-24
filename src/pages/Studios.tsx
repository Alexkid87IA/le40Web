import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
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
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowStickyCTA(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToConfigurator = () => {
    const element = document.getElementById('configurator');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

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

      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm truncate">
                    Réservez votre studio
                  </div>
                  <div className="text-emerald-400 text-xs font-medium">
                    Offre de lancement · -30% · 50 places
                  </div>
                </div>

                <button
                  onClick={scrollToConfigurator}
                  className="shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600
                           rounded-xl text-white font-bold text-sm shadow-lg shadow-emerald-500/30
                           active:scale-95 transition-transform"
                >
                  <span>Configurer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:+33413252640"
                  className="shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl
                           active:scale-95 transition-transform"
                  aria-label="Appeler"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
