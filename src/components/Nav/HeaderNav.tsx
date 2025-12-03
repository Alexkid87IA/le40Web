import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, Eye } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';
import UnifiedCartButton from '../Cart/UnifiedCartButton';
import VisitModal from '../Booking/VisitModal';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Bureaux', href: '/bureaux' },
  { name: 'Domiciliation', href: '/domiciliation' },
  { name: 'Salles', href: '/salles' },
  { name: 'Studio', href: '/studios' },
  { name: 'Bundles', href: '/bundles' },
  { name: 'Nos Events', href: '/events' },
  { name: 'Le Club', href: '/experts' },
];

const secondaryItems = [
  { name: 'Contact', href: '/contact', icon: Phone },
];

export default function HeaderNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  const handleNavigation = (href: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(href);
    }, 300);
  };

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // On est en haut de la page
      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      setIsAtTop(false);

      // Scroll vers le bas = cacher
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // Scroll vers le haut = montrer immédiatement
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // IMPORTANT : Toujours relancer le timer après chaque scroll
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    };

    const handleMouseMove = () => {
      // Relancer le timer au mouvement de souris
      if (window.scrollY > 50) {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
          setIsVisible(true);
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(inactivityTimeout);
    };
  }, [lastScrollY]);

  return (
    <motion.header
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        duration: 0.3,
        ease: [0.19, 1, 0.22, 1]
      }}
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isAtTop
          ? 'bg-black/90 border-b border-white/5'
          : 'bg-black/95 border-b border-white/10'
      }`}
      style={{ backdropFilter: 'blur(20px)' }}
    >
      <div className={`relative max-w-[1600px] mx-auto px-8 transition-all duration-300 ${
        isAtTop ? 'py-3' : 'py-2.5'
      }`}>
        <div className="flex items-center justify-between gap-8">
          
          {/* LOGO */}
          <div onClick={() => handleNavigation('/')} className="flex-shrink-0 cursor-pointer">
            <motion.img
              src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
              alt="Le 40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="brightness-0 invert w-20 transition-all duration-300"
            />
          </div>

          {/* NAVIGATION PRINCIPALE */}
          <nav className="flex-1">
            <ul className="flex items-center justify-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <li key={item.name}>
                    <motion.div
                      onClick={() => handleNavigation(item.href)}
                      className="relative group px-4 py-2 rounded-lg cursor-pointer"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-white/[0.06] rounded-lg"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 35,
                              mass: 0.8,
                            }}
                          />
                        )}

                        <div className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
                          isActive
                            ? 'opacity-0'
                            : 'opacity-0 group-hover:opacity-100 bg-white/[0.03]'
                        }`} />

                        <span
                          className={`relative font-medium text-[13px] tracking-wide transition-all duration-200 ${
                            isActive
                              ? 'text-white'
                              : 'text-white/50 group-hover:text-white/90'
                          }`}
                        >
                          {item.name}
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-0.5 left-0 right-0 flex justify-center"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 35
                            }}
                          >
                            <div className="w-8 h-0.5 bg-emerald-400 rounded-full" />
                          </motion.div>
                        )}
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ACTIONS SECONDAIRES */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Icônes secondaires */}
            <div className="flex items-center gap-2">
              {secondaryItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`relative p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.06] text-white'
                        : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={item.name}
                  >
                    <Icon className="w-[17px] h-[17px]" />
                  </motion.div>
                );
              })}

              {/* Panier Unifié */}
              <UnifiedCartButton />
            </div>

            {/* Séparateur */}
            <div className="w-px h-5 bg-white/10" />

            {/* DOUBLE CTA BUTTONS */}
            <div className="flex items-center gap-2">
              {/* Bouton Explorer (Outline) */}
              <motion.button
                onClick={() => handleNavigation('/reservation')}
                className="px-4 py-2 rounded-lg border border-white/20 hover:border-emerald-400/50 hover:bg-white/[0.03] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium text-[13px] text-white/70 hover:text-white transition-colors">
                  Explorer
                </span>
              </motion.button>

              {/* Bouton Planifier une visite (Solid) */}
              <motion.button
                onClick={() => setIsVisitModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-[14px] h-[14px] text-white" />
                <span className="font-medium text-[13px] text-white">
                  Planifier une visite
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de visite */}
      <VisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </motion.header>
  );
}