import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Zap } from 'lucide-react';
import BookingModal from './BookingModal';

export default function QuickBookingWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState(8);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAvailableSlots(prev => Math.max(3, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-8 bottom-8 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Calendar className="w-6 h-6" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-montserrat font-black text-lg">
                      Réserver
                    </div>
                    <div className="text-xs text-white/80">
                      {availableSlots} créneaux dispo
                    </div>
                  </div>
                  <Zap className="w-5 h-5" />
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
