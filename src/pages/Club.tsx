import React from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Club/HeroSection';
import WorkshopsSection from '../components/Club/WorkshopsSection';
import BenefitsSection from '../components/Club/BenefitsSection';
import PricingSection from '../components/Club/PricingSection';
import EventsCalendarSection from '../components/Club/EventsCalendarSection';
import TestimonialsSection from '../components/Club/TestimonialsSection';
import MembershipProcessSection from '../components/Club/MembershipProcessSection';
import FAQSection from '../components/Club/FAQSection';
import FinalCTASection from '../components/Club/FinalCTASection';

export default function Club() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-0">
        <HeroSection />
        <WorkshopsSection />
        <BenefitsSection />
        <PricingSection />
        <EventsCalendarSection />
        <TestimonialsSection />
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
