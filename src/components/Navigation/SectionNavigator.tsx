import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, Monitor, Video, Camera, Network, RotateCcw } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const sections: Section[] = [
  { id: 'domiciliation', label: 'Domiciliation', icon: MapPin, color: '#f59e0b' },
  { id: 'bureaux', label: 'Bureaux', icon: Monitor, color: '#10b981' },
  { id: 'coworking', label: 'Coworking', icon: Users, color: '#8b5cf6' },
  { id: 'studios-pro', label: 'Studios Pro', icon: Video, color: '#3b82f6' },
  { id: 'studios-content', label: 'Créateurs', icon: Camera, color: '#ec4899' },
  { id: 'community', label: 'Communauté', icon: Network, color: '#06b6d4' }
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('domiciliation');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      setIsVisible(window.scrollY > 300);

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getProgressPercentage = () => {
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    return ((activeIndex + 1) / sections.length) * 100;
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
          >
            <div className="relative flex flex-col items-center gap-2">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/5 via-white/10 to-white/5 rounded-full" />

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full bg-gradient-to-b from-transparent via-white/40 to-transparent"
                style={{ height: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />

              {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="relative group z-10"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="relative flex items-center justify-center"
                      animate={{
                        scale: isActive ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full blur-md"
                        style={{
                          backgroundColor: section.color,
                        }}
                        animate={{
                          opacity: isActive ? 0.3 : 0,
                          scale: isActive ? 1.5 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <div
                        className="w-3 h-3 rounded-full border-2 transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? section.color : 'transparent',
                          borderColor: isActive ? section.color : 'rgba(255,255,255,0.2)',
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl" />
                        <div className="relative bg-black/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-white/90 font-medium tracking-wide">{section.label}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 pt-2 border-t border-white/5"
            >
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.1, rotate: -90 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors group relative"
                title="Retour en haut"
              >
                <RotateCcw className="w-3.5 h-3.5 text-white/50 group-hover:text-white/90 transition-colors" />

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
                >
                  <div className="relative">
                    <div className="relative bg-black/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                      <span className="text-xs text-white/90 font-medium tracking-wide">Retour en haut</span>
                    </div>
                  </div>
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden"
          >
            <div className="relative bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full blur-xl opacity-50" />

              <div className="relative flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        whileTap={{ scale: 0.85 }}
                        className="relative"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full blur-md"
                          style={{ backgroundColor: section.color }}
                          animate={{
                            opacity: isActive ? 0.4 : 0,
                            scale: isActive ? 1.8 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        <div
                          className="relative w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
                          style={{
                            backgroundColor: isActive ? section.color : 'transparent',
                            borderColor: isActive ? section.color : 'rgba(255,255,255,0.3)',
                            transform: isActive ? 'scale(1.2)' : 'scale(1)',
                          }}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                <div className="w-px h-4 bg-white/10" />

                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  whileTap={{ scale: 0.85, rotate: -90 }}
                  className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center"
                >
                  <RotateCcw className="w-3 h-3 text-white/60" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
