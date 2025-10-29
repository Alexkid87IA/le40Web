import React from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Community from '../sections/Community';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <HeaderNav />
      <MobileBurger />
      
      <main className="pt-24">
        <Hero />
        <Services />
        <Community />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}