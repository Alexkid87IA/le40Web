import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Events/HeroSection';
import CategoriesSection from '../components/Events/CategoriesSection';
import FeaturedEventsSection from '../components/Events/FeaturedEventsSection';
import PastEventsSection from '../components/Events/PastEventsSection';
import SpeakersSection from '../components/Events/SpeakersSection';
import FAQSection from '../components/Events/FAQSection';
import OrganizeCTASection from '../components/Events/OrganizeCTASection';

export default function Events() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />
        <CategoriesSection />
        <FeaturedEventsSection />
        <PastEventsSection />
        <SpeakersSection />
        <FAQSection />
        <OrganizeCTASection />
      </main>

      <Footer />
    </div>
  );
}
