import React from 'react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Spaces from '../sections/Spaces'; // Nouvelle section fusionnée
import Community from '../sections/Community';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        <Hero />
        <Services />
        <Spaces /> {/* Fusion de Coworking + Meeting + Studio */}
        <Community />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}