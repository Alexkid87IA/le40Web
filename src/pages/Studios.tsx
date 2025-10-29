import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Studios/HeroSection';
import SocialProofSection from '../components/Studios/SocialProofSection';
import SetupsCatalogSection from '../components/Studios/SetupsCatalogSection';
import StudioComparator from '../components/Studios/StudioComparator';
import EnhancedGallerySection from '../components/Studios/EnhancedGallerySection';
import PriceCalculator from '../components/Studios/PriceCalculator';
import ProcessSection from '../components/Studios/ProcessSection';
import PricingSection from '../components/Studios/PricingSection';
import OptionsUpsellSection from '../components/Studios/OptionsUpsellSection';
import TestimonialsSection from '../components/Studios/TestimonialsSection';
import FAQSection from '../components/Studios/FAQSection';
import FinalCTASection from '../components/Studios/FinalCTASection';
import QuickBookingWidget from '../components/Studios/QuickBookingWidget';

export default function Studios() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />
        <SocialProofSection />
        <SetupsCatalogSection />
        <EnhancedGallerySection />
        <StudioComparator />
        <PriceCalculator />
        <ProcessSection />
        <PricingSection />
        <OptionsUpsellSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <QuickBookingWidget />
      <Footer />
    </div>
  );
}
