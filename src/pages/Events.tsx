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

      <main className="pt-32">
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
              src="https://le40-cdn.b-cdn.net/videos/events/events-background.mp4"
              type="video/mp4"
            />
          </video>
          {/* Overlay sombre pour lisibilité du contenu */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        {/* ============================================
            CONTENU DE LA PAGE (par-dessus la vidéo)
        ============================================ */}
        <div className="relative z-10">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
