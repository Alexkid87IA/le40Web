import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, Monitor, Video, Camera, Network, RotateCcw } from 'lucide-react';
import { usePreroll } from '../../contexts/PrerollContext';

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const sections: Section[] = [
  { id: 'coworking', label: 'Coworking', icon: Users, color: '#8b5cf6' },
  { id: 'domiciliation', label: 'Domiciliation', icon: MapPin, color: '#f59e0b' },
  { id: 'bureaux', label: 'Bureaux', icon: Monitor, color: '#10b981' },
  { id: 'studios-pro', label: 'Studios Pro', icon: Video, color: '#3b82f6' },
  { id: 'studios-content', label: 'Créateurs', icon: Camera, color: '#ec4899' },
  { id: 'community', label: 'Communauté', icon: Network, color: '#06b6d4' }
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('coworking');
  const [isVisible, setIsVisible] = useState(false);
  const { resetPreroll } = usePreroll();

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

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-3 space-y-2">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                    title={section.label}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-white/10 border-2'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                      style={{
                        borderColor: isActive ? section.color : undefined
                      }}
                    >
                      <section.icon
                        className="w-5 h-5 transition-colors"
                        style={{
                          color: isActive ? section.color : 'rgba(255,255,255,0.6)'
                        }}
                      />
                    </div>

                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-black/90 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-lg whitespace-nowrap">
                        <span className="text-sm text-white font-medium">{section.label}</span>
                      </div>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full"
                        style={{ backgroundColor: section.color }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              <div className="h-px bg-white/10 my-2"></div>

              <motion.button
                onClick={resetPreroll}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all group"
                title="Modifier mes préférences"
              >
                <RotateCcw className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3">
              <div className="flex items-center gap-3">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      whileTap={{ scale: 0.9 }}
                      className="relative"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isActive ? 'bg-white/20' : 'bg-white/5'
                        }`}
                      >
                        <section.icon
                          className="w-4 h-4 transition-colors"
                          style={{
                            color: isActive ? section.color : 'rgba(255,255,255,0.6)'
                          }}
                        />
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeDotMobile"
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ backgroundColor: section.color }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}

                <div className="w-px h-6 bg-white/10"></div>

                <motion.button
                  onClick={resetPreroll}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4 text-white/60" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
