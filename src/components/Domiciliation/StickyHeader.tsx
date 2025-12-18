import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, X } from 'lucide-react';

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
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <span className="text-white font-montserrat font-black text-lg">40</span>
                </div>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hidden md:block"
                  >
                    <div className="text-white font-montserrat font-bold text-sm">
                      Domiciliation Marseille
                    </div>
                    <div className="text-orange-400 font-inter text-xs">
                      Dès 29€/mois • 19 places restantes
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="hidden lg:flex items-center gap-6"
                  >
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span>Activation 24h</span>
                      </div>
                      <div className="w-px h-4 bg-white/20"></div>
                      <span>Sans engagement</span>
                      <div className="w-px h-4 bg-white/20"></div>
                      <span className="text-green-400 font-semibold">127 clients actifs</span>
                    </div>
                  </motion.div>
                )}

                <a
                  href="tel:+33413001000"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-inter font-medium text-sm">04 13 00 10 00</span>
                </a>

                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-montserrat font-bold text-sm rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300"
                >
                  <span>Choisir ma formule</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300"
                >
                  {isExpanded ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"
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
