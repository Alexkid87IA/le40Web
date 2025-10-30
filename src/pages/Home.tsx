import React from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import SectionNavigator from '../components/Navigation/SectionNavigator';
import Hero from '../sections/Hero';
import Gallery from '../sections/Gallery';
import CoworkingSection from '../sections/ServiceSections/CoworkingSection';
import DomiciliationSection from '../sections/ServiceSections/DomiciliationSection';
import BureauxSection from '../sections/ServiceSections/BureauxSection';
import StudiosSection from '../sections/ServiceSections/StudiosSection';
import CommunitySection from '../sections/ServiceSections/CommunitySection';
import StickySection from '../components/ServiceSection/StickySection';
import Footer from '../components/Footer';

export default function HomeNew() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeaderNav />
      <MobileBurger />
      <SectionNavigator />

      <main className="pt-24">
        <Hero />
        <Gallery />

        <div className="relative bg-black" style={{ perspective: '1000px' }}>
          <StickySection index={0} totalSections={4}>
            <DomiciliationSection />
          </StickySection>
          <StickySection index={1} totalSections={4}>
            <BureauxSection />
          </StickySection>
          <StickySection index={2} totalSections={4}>
            <CoworkingSection />
          </StickySection>
          <StickySection index={3} totalSections={4}>
            <StudiosSection />
          </StickySection>
          <div className="relative z-[5] min-h-screen">
            <CommunitySection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
