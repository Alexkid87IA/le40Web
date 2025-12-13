import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import NewHeroSection from '../components/Studios/NewHeroSection';
import StudioDiscoverySection from '../components/Studios/StudioDiscoverySection';
import SimplifiedConfigurator from '../components/Studios/SimplifiedConfigurator';
import TestimonialsSection from '../components/Studios/TestimonialsSection';
import FAQSection from '../components/Studios/FAQSection';
import FinalCTASection from '../components/Studios/FinalCTASection';
import SocialProofNotifications from '../components/Studios/SocialProofNotifications';
import { useStudioTracking, ProfileType } from '../hooks/useStudioTracking';

export default function StudiosNew() {
  const [searchParams] = useSearchParams();
  const { initSession } = useStudioTracking();
  const [initialStudioId, setInitialStudioId] = useState<string | undefined>();
  const [profileType, setProfileType] = useState<ProfileType>('unknown');

  useEffect(() => {
    const studio = searchParams.get('studio');
    const profile = searchParams.get('profile') as ProfileType;

    if (studio) setInitialStudioId(studio);
    if (profile) setProfileType(profile);

    initSession(profile || 'unknown');
  }, [searchParams, initSession]);

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderNav />
      <MobileBurger />
      <SocialProofNotifications />

      <main className="pt-24">
        <NewHeroSection />
        <StudioDiscoverySection />
        <SimplifiedConfigurator
          initialStudioId={initialStudioId}
          initialProfile={profileType}
        />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
