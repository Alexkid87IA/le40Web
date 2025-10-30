import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import { organizationSchema } from '../utils/seoSchemas';
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
      <SEOHead
        title="Coworking Premium Marseille | Domiciliation & Salles de Réunion"
        description="Espace de coworking premium au cœur de Marseille. Domiciliation d'entreprise, bureaux privés, salles de réunion équipées, studios créatifs et communauté d'entrepreneurs. Réservez votre visite gratuite."
        keywords="coworking Marseille, espace de travail Marseille, domiciliation entreprise Marseille, salle de réunion Marseille, bureau privé Marseille, coworking premium, studio créatif Marseille, communauté entrepreneurs"
        schema={organizationSchema}
      />
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
