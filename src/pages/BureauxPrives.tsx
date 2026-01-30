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
    <div className="min-h-screen bg-black overflow-hidden">
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

      {/* Hero plein écran - pas de padding */}
      <BureauHeroSection />

      <main>
        {/* ============================================
            VIDÉO DE FOND FIXE
            Visible sur toute la page
        ============================================ */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://le40-cdn.b-cdn.net/videos/bureaux/bureaux-background.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        {/* ============================================
            CONTENU DE LA PAGE (par-dessus la vidéo)
        ============================================ */}
        <div className="relative z-10">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
