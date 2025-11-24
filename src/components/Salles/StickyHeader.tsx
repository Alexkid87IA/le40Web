import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, X, Calendar } from 'lucide-react';

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/95 border-b border-white/10 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between gap-2 md:gap-4">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-montserrat font-black text-base md:text-lg">40</span>
                </div>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hidden sm:block"
                  >
                    <div className="text-white font-montserrat font-bold text-xs md:text-sm">
                      Salles de Réunion Marseille
                    </div>
                    <div className="text-cyan-400 font-inter text-xs">
                      Dès 50€/heure • Disponible 24/7
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="hidden lg:flex items-center gap-4 xl:gap-6"
                  >
                    <div className="flex items-center gap-3 xl:gap-4 text-xs xl:text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>Réservation facile</span>
                      </div>
                      <div className="w-px h-4 bg-white/20"></div>
                      <span>Équipement pro</span>
                      <div className="w-px h-4 bg-white/20"></div>
                      <span className="text-cyan-400 font-semibold">4 à 50 personnes</span>
                    </div>
                  </motion.div>
                )}

                <a
                  href="tel:+33413001000"
                  className="hidden md:flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="font-inter font-medium text-xs md:text-sm">04 13 00 10 00</span>
                </a>

                <motion.a
                  href="#spaces"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-montserrat font-bold text-xs md:text-sm rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300"
                >
                  <span>Réserver</span>
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300"
                >
                  {isExpanded ? (
                    <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  ) : (
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
