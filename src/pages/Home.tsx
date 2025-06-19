import React from 'react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import CoworkingSpaces from '../sections/CoworkingSpaces';
import MeetingRooms from '../sections/MeetingRooms';
import Studio from '../sections/Studio';
import Community from '../sections/Community';
import Pricing from '../sections/Pricing';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        <Hero />
        <Services />
        <CoworkingSpaces />
        <MeetingRooms />
        <Studio />
        <Community />
        <Pricing />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}