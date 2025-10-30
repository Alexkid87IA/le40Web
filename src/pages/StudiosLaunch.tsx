import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import LaunchHeroSection from '../components/Studios/LaunchHeroSection';
import LaunchOfferBanner from '../components/Studios/LaunchOfferBanner';
import LaunchConfigurator from '../components/Studios/LaunchConfigurator';
import SocialProofLaunch from '../components/Studios/SocialProofLaunch';
import EquipmentShowcase from '../components/Studios/EquipmentShowcase';
import ProcessTimeline from '../components/Studios/ProcessTimeline';
import TransparentPricing from '../components/Studios/TransparentPricing';
import FAQSection from '../components/Studios/FAQSection';
import GuaranteesSection from '../components/Studios/GuaranteesSection';
import FinalCTALaunch from '../components/Studios/FinalCTALaunch';
import { useEffect } from 'react';

export default function StudiosLaunch() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main>
        <LaunchHeroSection />
        <LaunchOfferBanner />
        <LaunchConfigurator />
        <SocialProofLaunch />
        <EquipmentShowcase />
        <ProcessTimeline />
        <TransparentPricing />
        <FAQSection />
        <GuaranteesSection />
        <FinalCTALaunch />
      </main>

      <Footer />
    </div>
  );
}
