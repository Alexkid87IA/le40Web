import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import BureauHeroSection from '../components/Bureaux/HeroSection';
import BottomBar from '../components/Shared/BottomBar';
import { Building2 } from 'lucide-react';
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

      <BottomBar
        variant="bureaux"
        title="Bureaux Privés Le 40"
        subtitle="De 499€/mois"
        features={[
          { text: 'Installation 48h', pulse: true },
          { text: 'Tout inclus', pulse: false },
          { text: '127 entreprises', highlight: true },
        ]}
        ctaText="Choisir mon bureau"
        ctaHref="#pricing"
        phoneNumber="06 14 31 52 14"
        icon={<Building2 className="w-5 h-5 md:w-6 md:h-6 text-white" />}
      />

      <main className="pt-16 md:pt-24">
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
