import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import BookingHeroChoice from '../components/Booking/BookingHeroChoice';
import ServicesGrid from '../components/Booking/ServicesGrid';
import ClubApplicationModal from '../components/Booking/ClubApplicationModal';
import DomiciliationModal from '../components/Booking/DomiciliationModal';
import ContactBar from '../components/Booking/ContactBar';
import ReassuranceSection from '../components/Booking/ReassuranceSection';

type ViewMode = 'choice' | 'services';

export default function BookingPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('choice');
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [isDomiciliationModalOpen, setIsDomiciliationModalOpen] = useState(false);

  const handleSelectVisit = () => {
    navigate('/reserver-visite');
  };

  const handleSelectService = () => {
    setViewMode('services');
    setTimeout(() => {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }, 100);
  };

  const handleServiceSelection = (serviceId: string) => {
    switch (serviceId) {
      case 'workspaces':
        navigate('/bureaux');
        break;
      case 'meeting-rooms':
        navigate('/salles');
        break;
      case 'studios':
        navigate('/studios');
        break;
      case 'domiciliation':
        setIsDomiciliationModalOpen(true);
        break;
      case 'club':
        setIsClubModalOpen(true);
        break;
      case 'services-plus':
        navigate('/services-plus');
        break;
      default:
        break;
    }
  };

  const handleBackToChoice = () => {
    setViewMode('choice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-20 sm:pt-24">
        <AnimatePresence mode="wait">
          {viewMode === 'choice' ? (
            <motion.div
              key="choice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BookingHeroChoice
                onSelectVisit={handleSelectVisit}
                onSelectService={handleSelectService}
              />
            </motion.div>
          ) : (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative min-h-[40vh] flex items-center overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black">
                <div className="relative z-10 w-full">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 md:py-16">
                    <motion.button
                      onClick={handleBackToChoice}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 md:mb-8 font-inter"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Retour</span>
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-montserrat font-bold text-white mb-3 md:mb-4">
                        Nos Services
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl text-white/60 font-inter max-w-3xl">
                        Sélectionnez le service qui correspond à vos besoins
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              <ServicesGrid onSelectService={handleServiceSelection} />
            </motion.div>
          )}
        </AnimatePresence>

        <ReassuranceSection />
      </main>

      <Footer />

      <ContactBar />

      <ClubApplicationModal
        isOpen={isClubModalOpen}
        onClose={() => setIsClubModalOpen(false)}
      />

      <DomiciliationModal
        isOpen={isDomiciliationModalOpen}
        onClose={() => setIsDomiciliationModalOpen(false)}
      />
    </div>
  );
}
