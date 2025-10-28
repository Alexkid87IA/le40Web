import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import BureauHeroSection from '../components/Bureaux/HeroSection';
import ProblemSolutionSection from '../components/Bureaux/ProblemSolutionSection';
import GallerySection from '../components/Bureaux/GallerySection';
import TestimonialsSection from '../components/Bureaux/TestimonialsSection';
import ProcessSection from '../components/Bureaux/ProcessSection';
import FAQSection from '../components/Bureaux/FAQSection';
import ComparisonSection from '../components/Bureaux/ComparisonSection';
import GuaranteesSection from '../components/Bureaux/GuaranteesSection';
import FinalCTASection from '../components/Bureaux/FinalCTASection';

export default function BureauxPrives() {
  return (
    <div className="min-h-screen bg-black">
      <SidebarNav />
      <MobileBurger />

      <main className="lg:ml-60">
        <BureauHeroSection />
        <ProblemSolutionSection />
        <GallerySection />
        <ProcessSection />
        <TestimonialsSection />
        <ComparisonSection />
        <FAQSection />
        <GuaranteesSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
