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
import BottomBar from '../components/Shared/BottomBar';
import { useRoomBooking, Room } from '../hooks/useRoomBooking';
import { Calendar } from 'lucide-react';

export default function Salles() {
  const { rooms, loading } = useRoomBooking();
  const [selectedSpace, setSelectedSpace] = useState<Room | null>(null);

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

      <BottomBar
        variant="salles"
        title="Salles de Réunion Marseille"
        subtitle="Dès 50€/heure"
        features={[
          { text: 'Réservation facile', pulse: false },
          { text: 'Équipement pro', pulse: false },
          { text: '4 à 50 personnes', highlight: true },
        ]}
        ctaText="Réserver"
        ctaHref="#spaces"
        phoneNumber="04 91 96 21 51"
        icon={<Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />}
      />

      <main className="pt-24">
        {/* ============================================
            VIDÉO DE FOND FIXE
            Visible sur toute la page
        ============================================ */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://le40-cdn.b-cdn.net/videos/salles/salles-background.mp4#t=0.1"
              type="video/mp4"
            />
          </video>
          {/* Overlay sombre pour lisibilité du contenu */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        {/* ============================================
            CONTENU DE LA PAGE (par-dessus la vidéo)
        ============================================ */}
        <div className="relative z-10">
          <HeroSection />
          <ProcessSection />
          {loading ? (
            <div className="py-24 text-center text-white">Chargement des salles...</div>
          ) : (
            <SpacesGridSection
              spaces={rooms}
              onSpaceClick={setSelectedSpace}
            />
          )}
          <EventTypesSection />
          <SpaceComparatorSection />
          <div id="equipment">
            <EquipmentSection />
          </div>
          <div id="pricing">
            <PricingSimulatorSection />
          </div>
          <AdditionalServicesSection />
          <TestimonialsSection />
          <PartnersSection />
          <LocationSection />
          <FAQSection />
          <FinalCTASection />
        </div>
      </main>

      <Footer />

      <SpaceDetailModal
        space={selectedSpace}
        onClose={() => setSelectedSpace(null)}
      />
    </div>
  );
}
