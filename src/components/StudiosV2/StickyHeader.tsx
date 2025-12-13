import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToConfigurator = () => {
    const configurator = document.getElementById('configurator');
    if (configurator) {
      configurator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-slate-800 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold">40</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Le 40 Studio</p>
                  <p className="text-slate-400 text-xs">Studios Pro Marseille</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="tel:04XXXXXXXX"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">04 XX XX XX XX</span>
                </a>

                <button
                  onClick={scrollToConfigurator}
                  className="px-6 py-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all text-sm"
                >
                  Configurer
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
