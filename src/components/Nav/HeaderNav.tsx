import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { designTokens } from '../../styles/designTokens';

const navItems = [
  {
    name: 'Accueil',
    href: '/',
    icon: Home,
  },
  {
    name: 'Bureaux',
    href: '/bureaux',
    icon: Building2,
  },
  {
    name: 'Domiciliation',
    href: '/domiciliation',
    icon: MapPin,
  },
  {
    name: 'Salles',
    href: '/salles',
    icon: Presentation,
  },
  {
    name: 'Studio',
    href: '/studios',
    icon: Video,
  },
  {
    name: 'Nos Events',
    href: '/events',
    icon: Calendar,
  },
  {
    name: 'Le Club',
    href: '/experts',
    icon: Sparkles,
  },
];

const secondaryItems = [
  {
    name: 'Communauté',
    href: '/community',
    icon: Users,
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: Phone,
  },
];

export default function HeaderNav() {
  const location = useLocation();
  const { itemCount, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 ${designTokens.animations.transition.normal} ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-3xl border-b border-gray-200/80 py-3 shadow-lg shadow-gray-900/5'
          : 'bg-white/90 backdrop-blur-2xl py-4 border-b border-gray-200/50'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 via-transparent to-gray-50/30 pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center justify-start flex-shrink-0 w-28">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)`
                  }}
                />
                <img
                  src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                  alt="Le 40"
                  className={`relative h-auto drop-shadow-xl transition-all duration-500 ${
                    isScrolled ? 'w-20' : 'w-24'
                  }`}
                />
              </motion.div>
            </Link>
          </div>

          <nav className="flex items-center justify-center flex-1">
            <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link to={item.href}>
                    <motion.div
                      className={`relative px-3 py-2.5 rounded-xl flex items-center gap-2 ${designTokens.animations.transition.fast} ${
                        isActive
                          ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="headerActiveBackground"
                          className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <Icon className={`relative w-4 h-4 ${designTokens.animations.transition.fast}`} />
                      <span className={`relative font-inter font-semibold text-[13px] whitespace-nowrap ${designTokens.animations.transition.fast}`}>
                        {item.name}
                      </span>

                      {isActive && (
                        <motion.div
                          layoutId="headerActiveIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 rounded-full shadow-sm"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2 flex-shrink-0 w-52">
          {secondaryItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.name} to={item.href}>
                <motion.div
                  className={`p-2.5 rounded-xl ${designTokens.animations.transition.fast} ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={item.name}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </motion.div>
              </Link>
            );
          })}

          <motion.button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title="Panier"
          >
            <ShoppingCart className="w-[18px] h-[18px]" />

            <AnimatePresence>
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-[10px] font-bold">{itemCount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="ml-2 pl-2 border-l border-gray-200">
            <Link to="/reservation">
              <motion.div
                className="relative overflow-hidden rounded-xl px-5 py-2.5 bg-gray-900 group shadow-md"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.15)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    x: [-200, 200],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="relative flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white" />
                  <span className="font-inter font-bold text-[13px] text-white whitespace-nowrap">
                    Réserver
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </motion.header>
  );
}
