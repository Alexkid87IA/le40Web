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
        <DomiciliationSection />
        <BureauxSection />
        <CoworkingSection />
        <StudiosSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
}
