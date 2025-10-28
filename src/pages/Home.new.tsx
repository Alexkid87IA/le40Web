import React, { useEffect, useRef } from 'react';
import { usePreroll } from '../contexts/PrerollContext';
import Preroll from '../components/Preroll/Preroll';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import SectionNavigator from '../components/Navigation/SectionNavigator';
import Hero from '../sections/Hero';
import CoworkingSection from '../sections/ServiceSections/CoworkingSection';
import DomiciliationSection from '../sections/ServiceSections/DomiciliationSection';
import BureauxSection from '../sections/ServiceSections/BureauxSection';
import StudiosSection from '../sections/ServiceSections/StudiosSection';
import CommunitySection from '../sections/ServiceSections/CommunitySection';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

export default function HomeNew() {
  const { showPreroll, selectedService, handleServiceSelect, handleSkipPreroll } = usePreroll();
  const hasScrolledToSection = useRef(false);

  useEffect(() => {
    if (selectedService && !hasScrolledToSection.current) {
      hasScrolledToSection.current = true;
      setTimeout(() => {
        const element = document.getElementById(selectedService);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [selectedService]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {showPreroll && (
        <Preroll
          onSelect={handleServiceSelect}
          onSkip={handleSkipPreroll}
        />
      )}

      <HeaderNav />
      <MobileBurger />
      <SectionNavigator />

      <main className="pt-24">
        <Hero />
        <CoworkingSection />
        <DomiciliationSection />
        <BureauxSection />
        <StudiosSection />
        <CommunitySection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
