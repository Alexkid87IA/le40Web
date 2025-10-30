import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, ShoppingCart, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Bureaux', href: '/bureaux', icon: Building2 },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin },
  { name: 'Salles', href: '/salles', icon: Presentation },
  { name: 'Studio', href: '/studios', icon: Video },
  { name: 'Nos Events', href: '/events', icon: Calendar },
  { name: 'Le Club', href: '/experts', icon: Sparkles },
];

const secondaryItems = [
  { name: 'Communauté', href: '/community', icon: Users },
  { name: 'Contact', href: '/contact', icon: Phone },
];

// Couleurs des traits indicateurs
const indicatorColors = {
  '/': 'bg-amber-400',
  '/bureaux': 'bg-blue-400',
  '/domiciliation': 'bg-orange-400',
  '/salles': 'bg-purple-400',
  '/studios': 'bg-emerald-400',
  '/events': 'bg-cyan-400',
  '/experts': 'bg-yellow-400',
};

// Couleurs du bouton Réserver
const reserveButtonColors = {
  '/': 'from-amber-600 via-orange-600 to-amber-600',
  '/bureaux': 'from-blue-600 via-indigo-600 to-blue-600',
  '/domiciliation': 'from-orange-600 via-amber-600 to-orange-600',
  '/salles': 'from-purple-600 via-violet-600 to-purple-600',
  '/studios': 'from-emerald-600 via-teal-600 to-emerald-600',
  '/events': 'from-cyan-600 via-sky-600 to-cyan-600',
  '/experts': 'from-amber-600 via-yellow-600 to-amber-600',
  '/community': 'from-teal-600 via-cyan-600 to-teal-600',
  '/contact': 'from-slate-600 via-gray-600 to-slate-600',
  'default': 'from-amber-600 via-orange-600 to-amber-600',
};

const reserveButtonGlow = {
  '/': 'bg-amber-500/40',
  '/bureaux': 'bg-blue-500/40',
  '/domiciliation': 'bg-orange-500/40',
  '/salles': 'bg-purple-500/40',
  '/studios': 'bg-emerald-500/40',
  '/events': 'bg-cyan-500/40',
  '/experts': 'bg-amber-500/40',
  '/community': 'bg-teal-500/40',
  '/contact': 'bg-slate-500/40',
  'default': 'bg-amber-500/40',
};

export default function HeaderNav() {
  const location = useLocation();
  const { itemCount, setIsOpen } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const currentButtonColor = reserveButtonColors[location.pathname] || reserveButtonColors.default;
  const currentButtonGlow = reserveButtonGlow[location.pathname] || reserveButtonGlow.default;

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
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isAtTop
          ? 'bg-black/90 border-b border-white/[0.02]'
          : 'bg-black/98 border-b border-white/5 shadow-2xl shadow-black/50'
      }`}
      style={{ backdropFilter: 'blur(30px)' }}
    >
      {/* Effet de lumière en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Grille subtile */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className={`relative max-w-[1600px] mx-auto px-8 transition-all duration-500 ${
        isAtTop ? 'py-4' : 'py-3'
      }`}>
        <div className="flex items-center justify-between gap-8">
          
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              
              <img
                src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                alt="Le 40"
                className={`relative brightness-0 invert transition-all duration-500 ${
                  isAtTop ? 'w-24' : 'w-20'
                }`}
              />
            </motion.div>
          </Link>

          {/* NAVIGATION PRINCIPALE */}
          <nav className="flex-1">
            <ul className="flex items-center justify-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <Link to={item.href}>
                      <motion.div
                        className="relative group px-4 py-2.5 rounded-lg"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-white/[0.08] rounded-lg"
                            transition={{ 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 35,
                              mass: 0.8,
                            }}
                          />
                        )}

                        <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                          isActive 
                            ? 'opacity-0' 
                            : 'opacity-0 group-hover:opacity-100 bg-white/[0.04]'
                        }`} />

                        <div className="relative flex items-center gap-2.5">
                          <Icon 
                            className={`w-[15px] h-[15px] transition-all duration-300 ${
                              isActive 
                                ? 'text-white' 
                                : 'text-white/50 group-hover:text-white/90'
                            }`} 
                          />
                          <span 
                            className={`font-medium text-[13px] tracking-wide transition-all duration-300 ${
                              isActive 
                                ? 'text-white font-semibold' 
                                : 'text-white/60 group-hover:text-white/95'
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>

                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-1 left-0 right-0 flex justify-center"
                            transition={{ 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 35 
                            }}
                          >
                            <div 
                              className={`w-[45px] h-[3px] ${indicatorColors[item.href] || 'bg-amber-400'} rounded-full`}
                              style={{
                                boxShadow: '0 0 10px currentColor',
                              }}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    </Link>
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
                  <Link key={item.name} to={item.href}>
                    <motion.div
                      className={`relative p-2.5 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-white/[0.08] text-white'
                          : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                      }`}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      title={item.name}
                    >
                      <Icon className="w-[17px] h-[17px]" />
                    </motion.div>
                  </Link>
                );
              })}

              {/* Panier */}
              <motion.button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                title="Panier"
              >
                <ShoppingCart className="w-[17px] h-[17px]" />
                
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30"
                    >
                      <span className="text-black text-[10px] font-black">
                        {itemCount}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Séparateur */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* BOUTON RÉSERVER */}
            <Link to="/reservation">
              <motion.div
                className="relative group overflow-hidden rounded-lg"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${currentButtonColor} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%', skewX: -20 }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 blur-xl ${currentButtonGlow}`} />
                </div>

                <div className="relative px-6 py-2.5 flex items-center gap-2.5">
                  <Calendar className="w-[15px] h-[15px] text-white" />
                  <span className="font-bold text-[13px] text-white tracking-wide">
                    Réserver
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* Ombre en bas */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transition-opacity duration-500 ${
        isAtTop ? 'opacity-0' : 'opacity-100'
      }`} />
    </motion.header>
  );
}