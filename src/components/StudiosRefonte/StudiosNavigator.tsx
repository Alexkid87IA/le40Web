import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Camera, Zap, Calculator, Plus, MessageSquare, HelpCircle, Sparkles } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
}

const sections: Section[] = [
  { id: 'studios', label: 'Studios', icon: Camera },
  { id: 'formulas', label: 'Formules', icon: Zap },
  { id: 'equipment', label: 'Équipement', icon: Sparkles },
  { id: 'configurator', label: 'Configurateur', icon: Calculator },
  { id: 'additional-services', label: 'Options', icon: Plus },
  { id: 'testimonials', label: 'Avis', icon: MessageSquare },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function StudiosNavigator() {
  const [activeSection, setActiveSection] = useState('studios');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);

      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-24 left-0 right-0 z-50 px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-3 px-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeStudioSection"
                      className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-fuchsia-500/20 to-violet-500/20 rounded-xl border border-fuchsia-500/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-fuchsia-400' : ''}`} />
                  <span className="relative z-10 font-inter font-medium text-sm">
                    {section.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
