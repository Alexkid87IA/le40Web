import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Studios/HeroSection';
import SocialProofSection from '../components/Studios/SocialProofSection';
import SetupsCatalogSection from '../components/Studios/SetupsCatalogSection';
import StudioComparator from '../components/Studios/StudioComparator';
import EnhancedGallerySection from '../components/Studios/EnhancedGallerySection';
import ProcessSection from '../components/Studios/ProcessSection';
import PricingSection from '../components/Studios/PricingSection';
import PriceCalculator from '../components/Studios/PriceCalculator';
import EnhancedOptionsUpsell from '../components/Studios/EnhancedOptionsUpsell';
import FAQSection from '../components/Studios/FAQSection';
import FinalCTASection from '../components/Studios/FinalCTASection';
import QuickBookingWidget from '../components/Studios/QuickBookingWidget';
import StudioSelectionQuiz from '../components/Studios/StudioSelectionQuiz';
import SaveConfigurationModal from '../components/Studios/SaveConfigurationModal';
import { useStudioConfiguration, generateSessionId } from '../hooks/useStudioConfiguration';
import type { RecommendationContext } from '../utils/studioRecommendations';

export default function Studios() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState<string | null>(null);
  const [currentContext, setCurrentContext] = useState<RecommendationContext>({
    studioId: 'face-cam',
    formulaId: 'postprod',
    durationHours: 1
  });
  const { loadSharedConfiguration, trackInteraction } = useStudioConfiguration();
  const [sessionId] = useState(() => generateSessionId());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const configToken = params.get('config');

    if (configToken) {
      loadSharedConfiguration(configToken).then(config => {
        if (config) {
          setCurrentContext({
            studioId: config.studioId,
            formulaId: config.formulaId,
            durationHours: config.durationHours
          });
        }
      });
    }

    trackInteraction({
      sessionId,
      actionType: 'page_view',
      timeSpentSeconds: 0
    });
  }, []);

  const handleStudioSelected = (studioId: string) => {
    setSelectedStudio(studioId);
    setCurrentContext(prev => ({ ...prev, studioId }));

    trackInteraction({
      sessionId,
      actionType: 'studio_selected',
      studioId
    });

    const element = document.getElementById('setups');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 bg-gradient-to-r from-slate-900 to-black"
        >
          <div className="max-w-7xl mx-auto px-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQuiz(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl font-montserrat font-bold shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              Pas sûr ? Faites le quiz pour trouver votre studio idéal
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        <SocialProofSection />
        <SetupsCatalogSection />
        <EnhancedGallerySection />
        <StudioComparator />
        <ProcessSection />
        <PricingSection />
        <PriceCalculator />
        <EnhancedOptionsUpsell context={currentContext} />
        <FAQSection />
        <FinalCTASection />
      </main>

      <QuickBookingWidget />
      <Footer />

      {showQuiz && (
        <StudioSelectionQuiz
          onStudioSelected={handleStudioSelected}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {showSaveModal && (
        <SaveConfigurationModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          configuration={{
            studioId: currentContext.studioId,
            formulaId: currentContext.formulaId,
            durationHours: currentContext.durationHours,
            selectedOptions: {},
            totalPrice: 0
          }}
        />
      )}
    </div>
  );
}
