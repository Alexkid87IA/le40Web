import SEOHead from '../components/SEO/SEOHead';
import { serviceSchemas } from '../utils/seoSchemas';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Domiciliation/HeroSection';
import TrustBannerSection from '../components/Domiciliation/TrustBannerSection';
import ProblemSection from '../components/Domiciliation/ProblemSection';
import BenefitsVisualSection from '../components/Domiciliation/BenefitsVisualSection';
import ServicesDetailSection from '../components/Domiciliation/ServicesDetailSection';
import GalleryVisualSection from '../components/Domiciliation/GalleryVisualSection';
import PricingSection from '../components/Domiciliation/PricingSection';
import ProcessSection from '../components/Domiciliation/ProcessSection';
import TestimonialsSection from '../components/Domiciliation/TestimonialsSection';
import ComparisonTableSection from '../components/Domiciliation/ComparisonTableSection';
import UrgencySection from '../components/Domiciliation/UrgencySection';
import FAQSection from '../components/Domiciliation/FAQSection';
import GuaranteesSection from '../components/Domiciliation/GuaranteesSection';
import FinalCTASection from '../components/Domiciliation/FinalCTASection';
import BottomBar from '../components/Shared/BottomBar';
import ClubUpsellSection from '../components/Domiciliation/ClubUpsellSection';
import { MapPin } from 'lucide-react';

export default function Domiciliation() {
  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Domiciliation Entreprise Marseille | Adresse Prestigieuse dès 49€/mois"
        description="Domiciliez votre entreprise à Marseille avec Le 40. Adresse prestigieuse, gestion du courrier, permanence téléphonique. Service premium dès 49€/mois. Accompagnement juridique inclus."
        keywords="domiciliation entreprise Marseille, domiciliation société Marseille, adresse commerciale Marseille, siège social Marseille, domiciliation pas cher Marseille, domiciliation auto-entrepreneur"
        schema={serviceSchemas.domiciliation}
      />
      <HeaderNav />
      <MobileBurger />

      <BottomBar
        variant="domiciliation"
        title="Domiciliation Marseille"
        subtitle="Dès 29€/mois"
        features={[
          { text: 'Activation 24h', pulse: true },
          { text: 'Sans engagement', pulse: false },
          { text: '127 clients actifs', highlight: true },
        ]}
        ctaText="Choisir ma formule"
        ctaHref="#pricing"
        phoneNumber="04 91 96 21 51"
        icon={<MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />}
      />

      <main className="pt-24">
        <HeroSection />
        <TrustBannerSection />
        <ProblemSection />
        <BenefitsVisualSection />
        <ServicesDetailSection />
        <GalleryVisualSection />
        <PricingSection />
        <ClubUpsellSection />
        <ProcessSection />
        <TestimonialsSection />
        <ComparisonTableSection />
        <UrgencySection />
        <FAQSection />
        <GuaranteesSection />
        <FinalCTASection />

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-white font-bold">Domiciliation Marseille</div>
              <div className="text-orange-400 text-sm">Dès 49€/mois</div>
            </div>
            <a
              href="#pricing"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg whitespace-nowrap"
            >
              Choisir
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
