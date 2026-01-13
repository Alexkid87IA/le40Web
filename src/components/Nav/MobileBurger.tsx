import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, Sparkles, ShoppingCart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Bureaux', href: '/bureaux', icon: Building2 },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin },
  { name: 'Salles', href: '/salles', icon: Presentation },
  { name: 'Studios', href: '/studios', icon: Video },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Le Club', href: '/experts', icon: Sparkles },
  { name: 'Contact', href: '/contact', icon: Phone },
];

// Fonction pour obtenir le gradient de fond selon la page
const getActiveBgGradient = (pathname: string): string => {
  const gradientMap: Record<string, string> = {
    '/': 'from-orange-500/20 to-orange-500/20 border-orange-500/30',
    '/bureaux': 'from-blue-500/20 to-blue-500/20 border-blue-500/30',
    '/domiciliation': 'from-orange-500/20 to-orange-500/20 border-orange-500/30',
    '/salles': 'from-emerald-500/20 to-emerald-500/20 border-emerald-500/30',
    '/studios': 'from-teal-500/20 to-teal-500/20 border-teal-500/30',
    '/packs': 'from-amber-500/20 to-amber-500/20 border-amber-500/30',
    '/events': 'from-cyan-500/20 to-cyan-500/20 border-cyan-500/30',
    '/experts': 'from-red-500/20 to-red-500/20 border-red-500/30',
    '/contact': 'from-blue-500/20 to-blue-500/20 border-blue-500/30',
  };

  return gradientMap[pathname] || 'from-orange-500/20 to-orange-500/20 border-orange-500/30';
};

// Fonction pour obtenir la couleur de l'icône selon la page
const getActiveIconColor = (pathname: string): string => {
  const colorMap: Record<string, string> = {
    '/': 'text-orange-400',
    '/bureaux': 'text-blue-400',
    '/domiciliation': 'text-orange-400',
    '/salles': 'text-emerald-400',
    '/studios': 'text-teal-400',
    '/packs': 'text-amber-400',
    '/events': 'text-cyan-400',
    '/experts': 'text-red-400',
    '/contact': 'text-blue-400',
  };

  return colorMap[pathname] || 'text-orange-400';
};

// Fonction pour obtenir le gradient du bouton CTA selon la page
const getCTAGradient = (pathname: string): string => {
  const gradientMap: Record<string, string> = {
    '/': 'from-orange-600 via-orange-600 to-orange-600 shadow-orange-500/30 hover:shadow-orange-500/40',
    '/bureaux': 'from-blue-600 via-blue-600 to-blue-600 shadow-blue-500/30 hover:shadow-blue-500/40',
    '/domiciliation': 'from-orange-600 via-orange-600 to-orange-600 shadow-orange-500/30 hover:shadow-orange-500/40',
    '/salles': 'from-emerald-600 via-emerald-600 to-emerald-600 shadow-emerald-500/30 hover:shadow-emerald-500/40',
    '/studios': 'from-teal-600 via-teal-600 to-teal-600 shadow-teal-500/30 hover:shadow-teal-500/40',
    '/packs': 'from-amber-600 via-amber-600 to-amber-600 shadow-amber-500/30 hover:shadow-amber-500/40',
    '/events': 'from-cyan-600 via-cyan-600 to-cyan-600 shadow-cyan-500/30 hover:shadow-cyan-500/40',
    '/experts': 'from-red-600 via-red-600 to-red-600 shadow-red-500/30 hover:shadow-red-500/40',
    '/contact': 'from-blue-600 via-blue-600 to-blue-600 shadow-blue-500/30 hover:shadow-blue-500/40',
  };

  return gradientMap[pathname] || 'from-orange-600 via-orange-600 to-orange-600 shadow-orange-500/30 hover:shadow-orange-500/40';
};

export default function MobileBurger() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, setDrawerOpen: setCartOpen } = useUnifiedCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(href);
      window.scrollTo(0, 0);
    }, 300);
  };

  const handleCartClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCartOpen(true);
    }, 300);
  };

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
              alt="Le 40"
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCartClick}
              className="relative w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20
                       flex items-center justify-center transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-fuchsia-500
                               rounded-full text-white text-xs font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20
                       flex flex-col items-center justify-center gap-1.5 transition-colors relative"
              aria-label="Menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white rounded-full origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black/98 backdrop-blur-xl
                       border-l border-white/10 z-[70] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <h2 className="text-xl font-montserrat font-bold text-white">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20
                             flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <motion.button
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavigation(item.href)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all
                                  ${isActive
                                    ? `bg-gradient-to-r ${getActiveBgGradient(item.href)} border`
                                    : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? getActiveIconColor(item.href) : 'text-white/60'}`} />
                        <span className={`font-inter font-medium ${isActive ? 'text-white' : 'text-white/80'}`}>
                          {item.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-8 border-t border-white/10"
                >
                  <Link
                    to="/reserver-visite"
                    onClick={() => setIsOpen(false)}
                    className={`w-full block py-4 px-6 bg-gradient-to-r ${getCTAGradient(location.pathname)}
                             rounded-xl text-white font-bold text-center shadow-lg
                             hover:shadow-xl transition-all`}
                  >
                    Réserver une visite
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-8 border-t border-white/10 text-center"
                >
                  <p className="text-white/40 text-sm mb-4">Nous contacter</p>
                  <a href="tel:+33413252640" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
                    04 13 25 26 40
                  </a>
                  <p className="text-white/60 text-sm mt-3">
                    40 Avenue de Saint Antoine
                    <br />
                    Marseille 13015
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
