import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Domiciliation/HeroSection';
import TrustLogosSection from '../components/Domiciliation/TrustLogosSection';
import ProblemSection from '../components/Domiciliation/ProblemSection';
import ServicesDetailSection from '../components/Domiciliation/ServicesDetailSection';
import LeadMagnetSection from '../components/Domiciliation/LeadMagnetSection';
import PricingSection from '../components/Domiciliation/PricingSection';
import ProcessSection from '../components/Domiciliation/ProcessSection';
import TestimonialsSection from '../components/Domiciliation/TestimonialsSection';
import GoogleReviewsSection from '../components/Domiciliation/GoogleReviewsSection';
import FAQSection from '../components/Domiciliation/FAQSection';
import ComparisonTableSection from '../components/Domiciliation/ComparisonTableSection';
import OfficialOrganizationsSection from '../components/Domiciliation/OfficialOrganizationsSection';
import ImprovedUrgencySection from '../components/Domiciliation/ImprovedUrgencySection';
import GuaranteesSection from '../components/Domiciliation/GuaranteesSection';
import FinalCTASection from '../components/Domiciliation/FinalCTASection';

export default function Domiciliation() {
  return (
    <div className="min-h-screen bg-black">
      <SidebarNav />
      <MobileBurger />

      <main className="md:ml-60 pb-28 md:pb-0">
        <HeroSection />
        <TrustLogosSection />
        <ProblemSection />
        <ServicesDetailSection />
        <LeadMagnetSection />
        <PricingSection />
        <ProcessSection />
        <TestimonialsSection />
        <GoogleReviewsSection />
        <FAQSection />
        <ComparisonTableSection />
        <OfficialOrganizationsSection />
        <ImprovedUrgencySection />
        <GuaranteesSection />
        <FinalCTASection />

        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-black/95 backdrop-blur-xl border-t border-white/10">
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
