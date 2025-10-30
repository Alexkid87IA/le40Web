import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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

export default function HeaderNav() {
  const location = useLocation();
  const { itemCount, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [20, 30]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      style={{ 
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/98 border-b border-white/5 shadow-2xl shadow-black/50'
          : 'bg-black/90 border-b border-white/[0.02]'
      }`}
    >
      {/* Effet de lumière subtil en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Grille subtile en background */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className={`relative max-w-[1600px] mx-auto px-8 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-4'
      }`}>
        <div className="flex items-center justify-between gap-8">
          
          {/* LOGO - Design premium */}
          <Link to="/" className="flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              {/* Glow effect au hover */}
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
                  isScrolled ? 'w-20' : 'w-24'
                }`}
              />
            </motion.div>
          </Link>

          {/* NAVIGATION PRINCIPALE - Design épuré */}
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
                        {/* Background actif avec animation fluide */}
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

                        {/* Background hover */}
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

                        {/* Indicateur actif - ligne dorée */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                            style={{ width: '60%' }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 35 
                            }}
                          />
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

            {/* Séparateur élégant */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* BOUTON RÉSERVER - Design premium avec gradient */}
            <Link to="/reservation">
              <motion.div
                className="relative group overflow-hidden rounded-lg"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Background avec gradient animé */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shine effect au hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%', skewX: -20 }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 blur-xl bg-amber-500/40" />
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

      {/* Ombre portée en bas du header */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transition-opacity duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`} />
    </motion.header>
  );
}