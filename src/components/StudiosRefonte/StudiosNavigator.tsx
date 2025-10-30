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
      initial={{ x: 100, opacity: 0 }}
      animate={{
        x: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-32 right-8 z-50 hidden lg:block"
    >
      <div className="bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl py-4 px-3 max-w-[200px]">
        <div className="flex flex-col gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
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
                <Icon className={`w-5 h-5 relative z-10 flex-shrink-0 ${isActive ? 'text-fuchsia-400' : ''}`} />
                <span className="relative z-10 font-inter font-medium text-sm text-left">
                  {section.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
