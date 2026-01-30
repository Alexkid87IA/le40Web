import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import { organizationSchema, siteNavigationSchema } from '../lib/seo-schemas';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import MobileStickyCTA from '../components/MobileStickyCTA';
import Hero from '../sections/Hero';
import CoworkingSection from '../sections/ServiceSections/CoworkingSection';
import DomiciliationSection from '../sections/ServiceSections/DomiciliationSection';
import BureauxSection from '../sections/ServiceSections/BureauxSection';
import StudiosSection from '../sections/ServiceSections/StudiosSection';
import CommunitySection from '../sections/ServiceSections/CommunitySection';
import PacksHighlightSection from '../sections/PacksHighlight';
import Footer from '../components/Footer';

export default function HomeNew() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Coworking Premium Marseille | Domiciliation & Salles de Réunion"
        description="Espace de coworking premium au cœur de Marseille. Domiciliation d'entreprise, bureaux privés, salles de réunion équipées, studios créatifs et communauté d'entrepreneurs. Réservez votre visite gratuite."
        keywords="coworking Marseille, espace de travail Marseille, domiciliation entreprise Marseille, salle de réunion Marseille, bureau privé Marseille, coworking premium, studio créatif Marseille, communauté entrepreneurs"
        schema={[organizationSchema, siteNavigationSchema]}
      />

      <HeaderNav />
      <MobileBurger />
      <MobileStickyCTA />

      <main>
        <Hero />

        <div className="relative">
          <div className="lg:sticky lg:top-0 lg:min-h-screen" style={{ zIndex: 1 }}>
            <DomiciliationSection />
          </div>
          <div className="lg:sticky lg:top-0 lg:min-h-screen" style={{ zIndex: 2 }}>
            <BureauxSection />
          </div>
          <div className="lg:sticky lg:top-0 lg:min-h-screen" style={{ zIndex: 3 }}>
            <CoworkingSection />
          </div>
          <div className="relative" style={{ zIndex: 4 }}>
            <StudiosSection />
          </div>
          <div className="relative" style={{ zIndex: 5 }}>
            <CommunitySection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
