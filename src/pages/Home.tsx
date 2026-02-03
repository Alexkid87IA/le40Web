import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import { organizationSchema, siteNavigationSchema, websiteSchema, homepageFAQSchema } from '../lib/seo-schemas';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import MobileStickyCTA from '../components/MobileStickyCTA';
import Hero from '../sections/Hero';
import DomiciliationSection from '../sections/ServiceSections/DomiciliationSection';
import BureauxSection from '../sections/ServiceSections/BureauxSection';
import CoworkingSection from '../sections/ServiceSections/CoworkingSection';
import StudioProSection from '../sections/ServiceSections/StudioProSection';
import StudioCreateursSection from '../sections/ServiceSections/StudioCreateursSection';
import CommunitySection from '../sections/ServiceSections/CommunitySection';
import Footer from '../components/Footer';

export default function HomeNew() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Coworking, Bureaux & Studios à Marseille"
        description="4000m² d'espaces premium à Marseille : coworking dès 199€, bureaux privés dès 499€, studios photo/podcast dès 35€/h, salles de réunion dès 25€/h. 127+ entreprises. Visite gratuite."
        keywords="coworking Marseille, bureau privé Marseille, studio photo Marseille, salle réunion Marseille, domiciliation Marseille, Le 40, espace travail Marseille"
        schema={[organizationSchema, websiteSchema, siteNavigationSchema, homepageFAQSchema]}
      />

      <HeaderNav />
      <MobileBurger />
      <MobileStickyCTA />

      <main>
        {/* Hero — z-index 10 */}
        <div className="lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: 10 }}>
          <Hero />
        </div>

        {/* Domiciliation — z-index 20 (image gauche) */}
        <div className="lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: 20 }}>
          <DomiciliationSection />
        </div>

        {/* Bureaux — z-index 30 (image droite) */}
        <div className="lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: 30 }}>
          <BureauxSection />
        </div>

        {/* Coworking — z-index 40 (image gauche) */}
        <div className="lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: 40 }}>
          <CoworkingSection />
        </div>

        {/* Studio Pro — z-index 50 (image gauche) */}
        <div className="lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: 50 }}>
          <StudioProSection />
        </div>

        {/* Studio Créateurs — z-index 60 (image droite) */}
        <div className="lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: 60 }}>
          <StudioCreateursSection />
        </div>

        {/* Community — z-index 70 (image gauche) */}
        <div className="lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: 70 }}>
          <CommunitySection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
