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
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        >
          <div className="bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-3 flex items-center gap-3">
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white rounded-xl text-black font-bold text-sm active:scale-95 transition-transform"
              >
                <span>Nous contacter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:+33491962151"
                className="shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/10 rounded-xl active:scale-95 transition-transform"
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
