import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Force scroll to top de manière agressive
const forceScrollTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      forceScrollTop();

      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);

        // Multiple scrolls pour contrer tout comportement async (après la nav avec hash)
        if (!location.hash) {
          forceScrollTop();
          requestAnimationFrame(forceScrollTop);
          setTimeout(forceScrollTop, 50);
          setTimeout(forceScrollTop, 150);
          setTimeout(forceScrollTop, 300);
          setTimeout(forceScrollTop, 500);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  // Scroll synchrone avant le paint
  useLayoutEffect(() => {
    if (!location.hash && !isFirstRender.current) {
      forceScrollTop();
    }
  }, [displayLocation, location.hash]);

  return (
    <>
      {/* Overlay de transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              {/* Logo */}
              <motion.img
                src="/logo.png"
                alt="Le 40"
                className="w-12 h-auto brightness-0 invert mx-auto mb-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Barre de progression */}
              <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu de la page avec animation */}
      <motion.div
        key={displayLocation.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
