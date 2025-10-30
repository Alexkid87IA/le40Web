import { useState } from 'react';
import SEOHead from '../components/SEO/SEOHead';
import { serviceSchemas } from '../utils/seoSchemas';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Salles/HeroSection';
import ProcessSection from '../components/Salles/ProcessSection';
import SpacesGridSection from '../components/Salles/SpacesGridSection';
import SpaceDetailModal from '../components/Salles/SpaceDetailModal';
import EventTypesSection from '../components/Salles/EventTypesSection';
import SpaceComparatorSection from '../components/Salles/SpaceComparatorSection';
import EquipmentSection from '../components/Salles/EquipmentSection';
import PricingSimulatorSection from '../components/Salles/PricingSimulatorSection';
import AdditionalServicesSection from '../components/Salles/AdditionalServicesSection';
import TestimonialsSection from '../components/Salles/TestimonialsSection';
import PartnersSection from '../components/Salles/PartnersSection';
import LocationSection from '../components/Salles/LocationSection';
import FAQSection from '../components/Salles/FAQSection';
import FinalCTASection from '../components/Salles/FinalCTASection';
import { spaces } from '../data/salles/spaces';
import { Space } from '../data/salles/spaces';

export default function Salles() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <SEOHead
        title="Salles de Réunion Marseille | Location Espace Événementiel Professionnel"
        description="Louez une salle de réunion équipée à Marseille. Écran 4K, visioconférence, tableau blanc. De 4 à 50 personnes. Réservation en ligne facile. Dès 50€/heure."
        keywords="salle de réunion Marseille, location salle Marseille, espace événementiel Marseille, salle de conférence Marseille, salle séminaire Marseille, salle formation Marseille"
        schema={serviceSchemas.salles}
      />
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />
        <ProcessSection />
        <SpacesGridSection
          spaces={spaces}
          onSpaceClick={setSelectedSpace}
        />
        <EventTypesSection />
        <SpaceComparatorSection />
        <EquipmentSection />
        <PricingSimulatorSection />
        <AdditionalServicesSection />
        <TestimonialsSection />
        <PartnersSection />
        <LocationSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />

      <SpaceDetailModal
        space={selectedSpace}
        onClose={() => setSelectedSpace(null)}
      />
    </div>
  );
}
