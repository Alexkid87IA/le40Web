import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedCartButton from '../Cart/UnifiedCartButton';
import { Z_INDEX } from '../../utils/zIndex';

interface DropdownItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    name: 'Espaces',
    dropdown: [
      { name: 'Bureaux Privés', href: '/bureaux' },
      { name: 'Coworking', href: '/coworking' },
      { name: 'Salles', href: '/salles' },
      { name: 'Studios', href: '/studios' },
    ]
  },
  {
    name: 'Services',
    dropdown: [
      { name: 'Domiciliation', href: '/domiciliation' },
      { name: 'Bundles', href: '/bundles' },
    ]
  },
  { name: 'Le Club', href: '/experts' },
  { name: 'Événements', href: '/events' },
  { name: 'Contact', href: '/contact' },
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
      className="hidden md:block fixed top-0 left-0 right-0"
      style={{
        background: isAtTop ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: Z_INDEX.headerNav,
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div onClick={() => handleNavigation('/')} className="cursor-pointer">
            <img
              src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
              alt="Le 40"
              className="brightness-0 invert w-20 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center gap-1">
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
                    <button
                      onClick={() => !hasDropdown && item.href && handleNavigation(item.href)}
                      className={`px-3 py-2 text-sm flex items-center gap-1 transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {hasDropdown && (
                        <ChevronDown className={`w-3 h-3 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>

                    {/* DROPDOWN */}
                    <AnimatePresence>
                      {hasDropdown && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-48 py-1 rounded-lg"
                          style={{
                            background: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.08)'
                          }}
                        >
                          {item.dropdown?.map((dropItem) => {
                            const isDropItemActive = location.pathname === dropItem.href;

                            return (
                              <button
                                key={dropItem.href}
                                onClick={() => handleNavigation(dropItem.href)}
                                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                  isDropItemActive
                                    ? 'text-white bg-white/5'
                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {dropItem.name}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <UnifiedCartButton />

            <button
              onClick={() => navigate('/reserver-visite')}
              className="px-4 py-2 text-sm text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors border border-white/10"
            >
              Réserver une visite
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
