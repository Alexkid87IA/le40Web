import { useState, useEffect } from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Studios/HeroSection';
import StudioJourney from '../components/Studios/Journey/StudioJourney';
import SocialProofSection from '../components/Studios/SocialProofSection';
import EnhancedGallerySection from '../components/Studios/EnhancedGallerySection';
import TestimonialsSection from '../components/Studios/TestimonialsSection';
import FAQSection from '../components/Studios/FAQSection';
import FinalCTASection from '../components/Studios/FinalCTASection';
import { useStudioConfiguration, generateSessionId } from '../hooks/useStudioConfiguration';

export default function Studios() {
  const { loadSharedConfiguration, trackInteraction } = useStudioConfiguration();
  const [sessionId] = useState(() => generateSessionId());
  const [initialStudioId, setInitialStudioId] = useState<string | undefined>(undefined);
  const [initialFormulaId, setInitialFormulaId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const configToken = params.get('config');

    if (configToken) {
      loadSharedConfiguration(configToken).then(config => {
        if (config) {
          setInitialStudioId(config.studioId);
          setInitialFormulaId(config.formulaId);
        }
      });
    }

    trackInteraction({
      sessionId,
      actionType: 'page_view',
      timeSpentSeconds: 0
    });
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />

        <StudioJourney
          initialStudioId={initialStudioId}
          initialFormulaId={initialFormulaId}
        />

        <SocialProofSection />
        <EnhancedGallerySection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
