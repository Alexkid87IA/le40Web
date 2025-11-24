import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
        >
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm truncate">
                  Réservez votre visite
                </div>
                <div className="text-amber-400 text-xs font-medium">
                  Gratuit · Sans engagement
                </div>
              </div>

              <Link
                to="/contact"
                className="shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600
                         rounded-xl text-white font-bold text-sm shadow-lg shadow-amber-500/30
                         active:scale-95 transition-transform"
              >
                <span>Visiter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

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
  );
}
