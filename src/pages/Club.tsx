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
import TestimonialsSection from '../components/Club/TestimonialsSection';
import MembershipProcessSection from '../components/Club/MembershipProcessSection';
import FAQSection from '../components/Club/FAQSection';
import FinalCTASection from '../components/Club/FinalCTASection';
import { Star } from 'lucide-react';

export default function Club() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SEOHead
        title="Club Le 40 | Réseau d'Entrepreneurs & Événements Business Marseille"
        description="Rejoignez le Club Le 40, la communauté d'entrepreneurs à Marseille. Workshops exclusifs, networking, mentorat, événements business. Développez votre réseau professionnel."
        keywords="club entrepreneurs Marseille, réseau entrepreneurs Marseille, networking Marseille, communauté business Marseille, événements networking Marseille, workshops entrepreneurs"
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
        phoneNumber="04 13 00 10 00"
        icon={<Star className="w-5 h-5 md:w-6 md:h-6 text-white" />}
      />

      <main className="pt-0">
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
        {/* <TestimonialsSection /> */}
        <MembershipProcessSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />

      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-[100]">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
}
