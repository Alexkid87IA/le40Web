import React from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Hero from '../sections/Hero';
import Gallery from '../sections/Gallery';
import CoworkingSection from '../sections/ServiceSections/CoworkingSection';
import DomiciliationSection from '../sections/ServiceSections/DomiciliationSection';
import BureauxSection from '../sections/ServiceSections/BureauxSection';
import StudiosSection from '../sections/ServiceSections/StudiosSection';
import CommunitySection from '../sections/ServiceSections/CommunitySection';
import Footer from '../components/Footer';

export default function HomeNew() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <Hero />
        <Gallery />

        <div className="relative">
          <div className="sticky top-0 h-screen">
            <DomiciliationSection />
          </div>
          <div className="sticky top-0 h-screen">
            <BureauxSection />
          </div>
          <div className="sticky top-0 h-screen">
            <CoworkingSection />
          </div>
          <div className="sticky top-0 h-screen">
            <StudiosSection />
          </div>
          <div className="relative z-10">
            <CommunitySection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
