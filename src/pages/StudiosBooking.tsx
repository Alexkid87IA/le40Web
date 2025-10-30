import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSectionV2 from '../components/StudiosV2/HeroSectionV2';
import ProfileSelection from '../components/StudiosV2/ProfileSelection';
import QuickPackSelector from '../components/StudiosV2/QuickPackSelector';
import UnifiedConfigurator from '../components/StudiosV2/UnifiedConfigurator';
import StickyHeader from '../components/StudiosV2/StickyHeader';
import FloatingChat from '../components/StudiosV2/FloatingChat';
import { studios, durations, formulas, options } from '../data/studiosLaunch/config';
import { packages, Package } from '../data/studiosLaunch/packages';
import { motion } from 'framer-motion';
import { Zap, Settings } from 'lucide-react';

export default function StudiosBooking() {
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>(undefined);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [bookingMode, setBookingMode] = useState<'express' | 'custom'>('custom');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setBookingMode('express');

    setTimeout(() => {
      const element = document.getElementById('configurator');
      if (element) {
        const headerHeight = 96;
        const offset = 20;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const recommendedPackages = selectedProfile
    ? packages.filter(pkg => pkg.recommendedFor?.includes(selectedProfile)).slice(0, 3)
    : packages.slice(0, 3);

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />
      <StickyHeader />

      <main>
        <HeroSectionV2 />

        <ProfileSelection onSelectProfile={handleProfileSelect} />

        <section className="py-12 bg-gradient-to-b from-black to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 mb-12">
              <motion.button
                onClick={() => setBookingMode('express')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all ${
                  bookingMode === 'express'
                    ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-2xl'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <Zap className="w-5 h-5" />
                Réservation Express
              </motion.button>

              <motion.button
                onClick={() => setBookingMode('custom')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all ${
                  bookingMode === 'custom'
                    ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-2xl'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <Settings className="w-5 h-5" />
                Configuration Personnalisée
              </motion.button>
            </div>

            {bookingMode === 'express' && (
              <QuickPackSelector
                packages={recommendedPackages}
                selectedPackage={selectedPackage}
                onSelectPackage={handlePackageSelect}
              />
            )}
          </div>
        </section>

        <div id="configurator">
          <UnifiedConfigurator
            studios={studios}
            durations={durations}
            formulas={formulas}
            options={options}
            selectedProfile={selectedProfile}
            selectedPackage={selectedPackage}
          />
        </div>
      </main>

      <FloatingChat />
      <Footer />
    </div>
  );
}
