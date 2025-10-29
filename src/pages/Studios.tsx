import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Studios/HeroSection';
import SetupsCatalogSection from '../components/Studios/SetupsCatalogSection';
import ProcessSection from '../components/Studios/ProcessSection';
import GallerySection from '../components/Studios/GallerySection';
import PricingSection from '../components/Studios/PricingSection';
import TestimonialsSection from '../components/Studios/TestimonialsSection';
import FAQSection from '../components/Studios/FAQSection';
import FinalCTASection from '../components/Studios/FinalCTASection';

export default function Studios() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />
        <SetupsCatalogSection />
        <ProcessSection />
        <GallerySection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
