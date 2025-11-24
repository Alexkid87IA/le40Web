import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import HeroSection from '../components/Events/HeroSection';
import CategoriesSection from '../components/Events/CategoriesSection';
import FeaturedEventsSection from '../components/Events/FeaturedEventsSection';
import PastEventsSection from '../components/Events/PastEventsSection';
import SpeakersSection from '../components/Events/SpeakersSection';
import FAQSection from '../components/Events/FAQSection';
import OrganizeCTASection from '../components/Events/OrganizeCTASection';

export default function Events() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowStickyCTA(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEvents = () => {
    const element = document.getElementById('upcoming-events');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
        <HeroSection />
        <CategoriesSection />
        <FeaturedEventsSection />
        <PastEventsSection />
        <SpeakersSection />
        <FAQSection />
        <OrganizeCTASection />
      </main>

      <Footer />

      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm truncate">
                    Découvrez nos événements
                  </div>
                  <div className="text-cyan-400 text-xs font-medium">
                    Networking · Ateliers · Conférences
                  </div>
                </div>

                <button
                  onClick={scrollToEvents}
                  className="shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600
                           rounded-xl text-white font-bold text-sm shadow-lg shadow-cyan-500/30
                           active:scale-95 transition-transform"
                >
                  <span>Voir tout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:+33413252640"
                  className="shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl
                           active:scale-95 transition-transform"
                  aria-label="Appeler"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
