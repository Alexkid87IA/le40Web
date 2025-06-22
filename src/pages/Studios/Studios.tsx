import React, { useState } from 'react';
import SidebarNav from '../../components/Nav/SidebarNav';
import MobileBurger from '../../components/Nav/MobileBurger';
import Footer from '../../components/Footer';

// Import des sections
import HeroSection from './sections/HeroSection';
import GallerySection from './sections/GallerySection';
import SetupsSection from './sections/SetupsSection';
import FeaturesSection from './sections/FeaturesSection';
import PricingSection from './sections/PricingSection';

// Import du configurateur
import Configurator from './components/Configurator/Configurator';

export default function Studios() {
  const [selectedSetup, setSelectedSetup] = useState(null);
  const [showConfigurator, setShowConfigurator] = useState(false);
  
  const openConfigurator = (setup) => {
    setSelectedSetup(setup);
    setShowConfigurator(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <SidebarNav />
      <MobileBurger />
      
      {/* Main content avec margin pour la sidebar */}
      <main className="lg:ml-60">
        {/* Sections principales */}
        <HeroSection />
        <GallerySection />
        <SetupsSection onSetupSelect={openConfigurator} />
        <FeaturesSection />
        <PricingSection />
      </main>
      
      {/* Footer wrapper pour compenser la sidebar */}
      <div className="lg:ml-60">
        <Footer />
      </div>
      
      {/* Configurateur en overlay */}
      <Configurator 
        isOpen={showConfigurator}
        selectedSetup={selectedSetup}
        onClose={() => setShowConfigurator(false)}
      />
    </div>
  );
}