import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import BureauHeroSection from '../components/Bureaux/HeroSection';
import ProblemSolutionSection from '../components/Bureaux/ProblemSolutionSection';
import StatsSection from '../components/Bureaux/StatsSection';
import GallerySection from '../components/Bureaux/GallerySection';
import PricingSection from '../components/Bureaux/PricingSection';
import TestimonialsSection from '../components/Bureaux/TestimonialsSection';
import ProcessSection from '../components/Bureaux/ProcessSection';
import ComparisonSection from '../components/Bureaux/ComparisonSection';
import UrgencySection from '../components/Bureaux/UrgencySection';
import FAQSection from '../components/Bureaux/FAQSection';
import GuaranteesSection from '../components/Bureaux/GuaranteesSection';
import FinalCTASection from '../components/Bureaux/FinalCTASection';

export default function BureauxPrives() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <BureauHeroSection />
        <ProblemSolutionSection />
        <StatsSection />
        <GallerySection />
        <PricingSection />
        <TestimonialsSection />
        <ProcessSection />
        <ComparisonSection />
        <UrgencySection />
        <FAQSection />
        <GuaranteesSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
