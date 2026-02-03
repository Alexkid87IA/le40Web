import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import BottomBar from '../components/Shared/BottomBar';
import HeroSection from '../components/Club/HeroSection';
import WorkshopsSection from '../components/Club/WorkshopsSection';
import BenefitsSection from '../components/Club/BenefitsSection';
import PricingSection from '../components/Club/PricingSection';
import EventsCalendarSection from '../components/Club/EventsCalendarSection';
import MembershipProcessSection from '../components/Club/MembershipProcessSection';
import FAQSection from '../components/Club/FAQSection';
import FinalCTASection from '../components/Club/FinalCTASection';
import { Star } from 'lucide-react';
import { pageSchemas } from '../lib/seo-schemas';

export default function Club() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SEOHead
        title="Le Club — Communauté Entrepreneurs Marseille"
        description="Rejoignez Le Club Le 40 : communauté 120+ entrepreneurs à Marseille. Workshops, networking, mentorat, événements exclusifs. Accès dès 0€/mois."
        keywords="club entrepreneurs Marseille, réseau entrepreneurs Marseille, networking Marseille, communauté business Marseille, mentorat entrepreneurs"
        schema={[pageSchemas.club.service, pageSchemas.club.breadcrumb]}
      />
      <HeaderNav />
      <MobileBurger />

      <BottomBar
        variant="club"
        title="Club Le 40 - Entrepreneurs"
        subtitle="À partir de 50€/mois"
        features={[
          { text: 'Accès exclusif', pulse: false },
          { text: 'Réseau premium', pulse: false },
          { text: '150+ membres', highlight: true },
        ]}
        ctaText="Être notifié"
        ctaHref="#notify"
        phoneNumber="04 91 96 21 51"
        icon={<Star className="w-5 h-5 md:w-6 md:h-6 text-white" />}
      />

      <main>
        {/* Vidéo de fond fixe */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            ref={(video) => {
              if (video) {
                video.playbackRate = 0.7;
              }
            }}
          >
            <source
              src="https://le40-cdn.b-cdn.net/videos/club/club-background.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>

        {/* Contenu de la page */}
        <div className="relative z-10">
          <HeroSection />
          <div id="workshops">
            <WorkshopsSection />
          </div>
          <div id="benefits">
            <BenefitsSection />
          </div>
          <div id="pricing">
            <PricingSection />
          </div>
          <EventsCalendarSection />
          <MembershipProcessSection />
          <FAQSection />
          <FinalCTASection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
