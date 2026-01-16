import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedCartButton from '../Cart/UnifiedCartButton';
import { Z_INDEX } from '../../utils/zIndex';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Bureaux', href: '/bureaux' },
  { name: 'Domiciliation', href: '/domiciliation' },
  { name: 'Salles', href: '/salles' },
  { name: 'Studio', href: '/studios' },
  { name: 'Packs', href: '/packs' },
  { name: 'Nos Events', href: '/events' },
  { name: 'Le Club', href: '/club' },
];

// Fonction pour obtenir la couleur du trait selon la page
const getActiveIndicatorColor = (pathname: string): string => {
  const colorMap: Record<string, string> = {
    '/': 'from-amber-400 via-orange-500 to-amber-400',
    '/bureaux': 'from-blue-400 via-indigo-500 to-blue-400',
    '/domiciliation': 'from-amber-400 via-orange-500 to-amber-400',
    '/salles': 'from-emerald-400 via-emerald-500 to-emerald-400',
    '/studios': 'from-teal-400 via-cyan-500 to-teal-400',
    '/packs': 'from-amber-400 via-orange-500 to-amber-400',
    '/events': 'from-cyan-400 via-cyan-500 to-cyan-400',
    '/club': 'from-rose-400 via-red-500 to-rose-400',
    '/contact': 'from-blue-400 via-blue-500 to-blue-400',
  };
  return colorMap[pathname] || 'from-amber-400 via-orange-500 to-amber-400';
};

// Fonction pour obtenir la couleur du bouton CTA selon la page
const getCTAColors = (pathname: string): { bg: string; glow: string } => {
  const colorMap: Record<string, { bg: string; glow: string }> = {
    '/': { bg: 'from-amber-500 via-orange-500 to-amber-500', glow: 'bg-orange-500/30' },
    '/bureaux': { bg: 'from-blue-500 via-indigo-500 to-blue-500', glow: 'bg-blue-500/30' },
    '/domiciliation': { bg: 'from-amber-500 via-orange-500 to-amber-500', glow: 'bg-orange-500/30' },
    '/salles': { bg: 'from-emerald-500 via-emerald-600 to-emerald-500', glow: 'bg-emerald-500/30' },
    '/studios': { bg: 'from-teal-500 via-cyan-500 to-teal-500', glow: 'bg-teal-500/30' },
    '/packs': { bg: 'from-amber-500 via-orange-500 to-amber-500', glow: 'bg-amber-500/30' },
    '/events': { bg: 'from-cyan-500 via-cyan-600 to-cyan-500', glow: 'bg-cyan-500/30' },
    '/experts': { bg: 'from-rose-500 via-red-500 to-rose-500', glow: 'bg-rose-500/30' },
    '/contact': { bg: 'from-blue-500 via-blue-600 to-blue-500', glow: 'bg-blue-500/30' },
  };
  return colorMap[pathname] || { bg: 'from-amber-500 via-orange-500 to-amber-500', glow: 'bg-orange-500/30' };
};

export default function HeaderNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const handleNavigation = (href: string) => {
    navigate(href);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      setIsAtTop(false);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    };

    const handleMouseMove = () => {
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

  const ctaColors = getCTAColors(location.pathname);

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
      className={`hidden md:block fixed top-0 left-0 right-0 transition-all duration-300 ${
        isAtTop
          ? 'bg-black/80'
          : 'bg-black/90 border-b border-white/[0.06]'
      }`}
      style={{ backdropFilter: 'blur(20px)', zIndex: Z_INDEX.headerNav }}
      role="banner"
    >
      {/* Container aligné avec le contenu (max-w-7xl) */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isAtTop ? 'py-4' : 'py-3'
      }`}>
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div
            onClick={() => handleNavigation('/')}
            className="flex-shrink-0 cursor-pointer"
            role="button"
            aria-label="Retour à l'accueil - Le 40 Coworking"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/')}
          >
            <motion.img
              src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
              alt="Le 40 Coworking - Logo"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="brightness-0 invert w-14 lg:w-16 transition-all duration-300"
            />
          </div>

          {/* NAVIGATION PRINCIPALE - Centrée */}
          <nav className="flex-1 flex justify-center" aria-label="Navigation principale">
            <ul className="flex items-center gap-0.5" role="menubar">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <li key={item.name} role="none">
                    <motion.button
                      onClick={() => handleNavigation(item.href)}
                      className="relative group cursor-pointer"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`Aller à ${item.name}`}
                    >
                      <div className={`px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                      }`}>
                        <span
                          className={`relative font-medium text-[13px] tracking-wide transition-all duration-200 ${
                            isActive
                              ? 'text-white'
                              : 'text-white/50 group-hover:text-white/80'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Indicateur actif */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35
                          }}
                        >
                          <div className={`w-6 h-[2px] bg-gradient-to-r ${getActiveIndicatorColor(location.pathname)} rounded-full`} />
                        </motion.div>
                      )}
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ACTIONS - À droite */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Panier */}
            <UnifiedCartButton pathname={location.pathname} />

            {/* CTA BUTTON */}
            <motion.button
              onClick={() => navigate('/reserver-visite')}
              className="group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Planifier une visite de nos espaces"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 ${ctaColors.glow} rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`} aria-hidden="true" />

              <div className={`relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${ctaColors.bg} rounded-lg shadow-lg`}>
                <Eye className="w-4 h-4 text-white" aria-hidden="true" />
                <span className="font-semibold text-[13px] text-white">
                  Planifier une visite
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
