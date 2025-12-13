import { useState, useEffect } from 'react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSectionV2 from '../components/StudiosV2/HeroSectionV2';
import ProfileSelection from '../components/StudiosV2/ProfileSelection';
import ConfiguratorV2 from '../components/StudiosV2/ConfiguratorV2';
import SocialProofSection from '../components/StudiosV2/SocialProofSection';
import StudioGallery from '../components/StudiosV2/StudioGallery';
import FAQAccordion from '../components/StudiosV2/FAQAccordion';
import FinalCTASection from '../components/StudiosV2/FinalCTASection';
import StickyHeader from '../components/StudiosV2/StickyHeader';
import FloatingChat from '../components/StudiosV2/FloatingChat';

export default function StudiosLaunchV2() {
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
  };

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />
      <StickyHeader />

      <main>
        <HeroSectionV2 />
        <ProfileSelection onSelectProfile={handleProfileSelect} />
        <ConfiguratorV2 selectedProfile={selectedProfile} />
        <SocialProofSection />
        <StudioGallery />
        <FAQAccordion />
        <FinalCTASection />
      </main>

      <FloatingChat />
      <Footer />
    </div>
  );
}
