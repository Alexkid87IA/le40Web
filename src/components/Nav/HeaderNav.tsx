import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, Eye, Building2, Briefcase, Sparkles, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';
import UnifiedCartButton from '../Cart/UnifiedCartButton';
import { Z_INDEX } from '../../utils/zIndex';

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ElementType;
}

interface NavItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { name: 'Accueil', href: '/' },
  {
    name: 'Espaces',
    dropdown: [
      { name: 'Bureaux Privés', href: '/bureaux', description: 'Bureaux dédiés pour votre équipe', icon: Building2 },
      { name: 'Coworking', href: '/coworking', description: 'Espaces de travail flexibles', icon: Briefcase },
      { name: 'Salles de réunion', href: '/salles', description: 'Salles équipées pour vos événements', icon: Sparkles },
      { name: 'Studios', href: '/studios', description: 'Espaces créatifs professionnels', icon: Sparkles },
    ]
  },
  {
    name: 'Services',
    dropdown: [
      { name: 'Domiciliation', href: '/domiciliation', description: 'Adresse professionnelle prestigieuse' },
      { name: 'Bundles', href: '/bundles', description: 'Offres groupées avantageuses' },
      { name: 'Services +', href: '/services-plus', description: 'Services additionnels' },
    ]
  },
  { name: 'Événements', href: '/events' },
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavigation = (href: string) => {
    setActiveDropdown(null);
    navigate(href);
  };

  const isItemActive = (item: NavItem) => {
    if (item.href) return location.pathname === item.href;
    if (item.dropdown) {
      return item.dropdown.some(subItem => location.pathname === subItem.href);
    }
    return false;
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
        setActiveDropdown(null);
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
      className={`hidden md:block fixed top-0 left-0 right-0 transition-all duration-500 ${
        isAtTop
          ? 'bg-gradient-to-b from-black/95 via-black/90 to-black/85'
          : 'bg-black/98 shadow-xl shadow-black/20'
      }`}
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        zIndex: Z_INDEX.headerNav,
        borderBottom: isAtTop ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.12)'
      }}
    >
      <div className={`relative max-w-[1700px] mx-auto px-10 transition-all duration-500 ${
        isAtTop ? 'py-4' : 'py-3'
      }`}>
        <div className="flex items-center justify-between gap-12">

          {/* LOGO */}
          <div onClick={() => handleNavigation('/')} className="flex-shrink-0 cursor-pointer group">
            <motion.img
              src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
              alt="Le 40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`brightness-0 invert transition-all duration-500 ${
                isAtTop ? 'w-28' : 'w-24'
              }`}
            />
          </div>

          {/* NAVIGATION PRINCIPALE */}
          <nav className="flex-1">
            <ul className="flex items-center justify-center gap-2">
              {navItems.map((item) => {
                const isActive = isItemActive(item);
                const hasDropdown = !!item.dropdown;

                return (
                  <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => hasDropdown && setActiveDropdown(item.name)}
                    onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                  >
                    <motion.div
                      onClick={() => !hasDropdown && item.href && handleNavigation(item.href)}
                      className={`relative group px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 ${
                        hasDropdown ? '' : ''
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10 rounded-xl border border-orange-500/20"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                          }}
                        />
                      )}

                      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'opacity-0'
                          : 'opacity-0 group-hover:opacity-100 bg-white/[0.05] border border-white/[0.08]'
                      }`} />

                      <span
                        className={`relative font-semibold text-[15px] tracking-wide transition-all duration-300 ${
                          isActive
                            ? 'text-white'
                            : 'text-white/60 group-hover:text-white'
                        }`}
                      >
                        {item.name}
                      </span>

                      {hasDropdown && (
                        <ChevronDown
                          className={`relative w-4 h-4 transition-all duration-300 ${
                            isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                          } ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                        />
                      )}

                      {isActive && !hasDropdown && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40
                          }}
                        >
                          <div className="w-10 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50" />
                        </motion.div>
                      )}
                    </motion.div>

                    {/* DROPDOWN MENU */}
                    <AnimatePresence>
                      {hasDropdown && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-gradient-to-br from-black/98 via-black/95 to-black/98 border border-white/10 shadow-2xl shadow-black/40 overflow-hidden"
                          style={{ backdropFilter: 'blur(24px) saturate(180%)' }}
                        >
                          <div className="p-2">
                            {item.dropdown?.map((dropItem, idx) => {
                              const ItemIcon = dropItem.icon;
                              const isDropItemActive = location.pathname === dropItem.href;

                              return (
                                <motion.div
                                  key={dropItem.href}
                                  onClick={() => handleNavigation(dropItem.href)}
                                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                    isDropItemActive
                                      ? 'bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10'
                                      : 'hover:bg-white/[0.05]'
                                  }`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  whileHover={{ x: 4 }}
                                >
                                  <div className="flex items-start gap-3">
                                    {ItemIcon && (
                                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                                        isDropItemActive
                                          ? 'bg-orange-500/20 text-orange-400'
                                          : 'bg-white/[0.05] text-white/40 group-hover:bg-white/[0.08] group-hover:text-white/70'
                                      }`}>
                                        <ItemIcon className="w-5 h-5" />
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      <div className={`font-semibold text-sm mb-0.5 transition-colors duration-300 ${
                                        isDropItemActive
                                          ? 'text-white'
                                          : 'text-white/80 group-hover:text-white'
                                      }`}>
                                        {dropItem.name}
                                      </div>
                                      {dropItem.description && (
                                        <div className={`text-xs transition-colors duration-300 ${
                                          isDropItemActive
                                            ? 'text-white/60'
                                            : 'text-white/40 group-hover:text-white/60'
                                        }`}>
                                          {dropItem.description}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ACTIONS SECONDAIRES */}
          <div className="flex items-center gap-4 flex-shrink-0">

            {/* Icônes secondaires */}
            <div className="flex items-center gap-2">
              {secondaryItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`relative p-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 text-white border border-orange-500/20'
                        : 'text-white/50 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08]'
                    }`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={item.name}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </motion.div>
                );
              })}

              {/* Panier Unifié */}
              <UnifiedCartButton />
            </div>

            {/* Séparateur */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            {/* CTA BUTTON PREMIUM */}
            <motion.button
              onClick={() => navigate('/reserver-visite')}
              className="relative px-6 py-3 rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-[length:200%_100%] animate-gradient" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-white/20 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 shadow-lg shadow-orange-500/20 group-hover:shadow-xl group-hover:shadow-orange-500/40 transition-all duration-300" />

              <div className="relative flex items-center gap-2.5">
                <Eye className="w-[16px] h-[16px] text-white" />
                <span className="font-bold text-[14px] text-white tracking-wide">
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