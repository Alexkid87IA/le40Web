import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import BottomBar from '../components/Shared/BottomBar';
import HeroSection from '../components/Events/HeroSection';
import CategoriesSection from '../components/Events/CategoriesSection';
import FeaturedEventsSection from '../components/Events/FeaturedEventsSection';
import PastEventsSection from '../components/Events/PastEventsSection';
import SpeakersSection from '../components/Events/SpeakersSection';
import FAQSection from '../components/Events/FAQSection';
import OrganizeCTASection from '../components/Events/OrganizeCTASection';
import { Calendar } from 'lucide-react';

export default function Events() {

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <BottomBar
        variant="events"
        title="Événements Le 40"
        subtitle="Networking & Workshops"
        features={[
          { text: 'Événements mensuels', pulse: true },
          { text: 'Networking actif', pulse: false },
          { text: 'Accès libre', highlight: true },
        ]}
        ctaText="Voir les événements"
        ctaHref="#upcoming-events"
        phoneNumber="04 13 25 26 40"
        icon={<Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />}
      />

      <main className="pt-24">
        <HeroSection />
        <CategoriesSection />
        <FeaturedEventsSection />
        <div id="past-events">
          <PastEventsSection />
        </div>
        <SpeakersSection />
        <FAQSection />
        <div id="organize">
          <OrganizeCTASection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
