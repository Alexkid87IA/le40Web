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
          ? 'bg-black/95 backdrop-blur-2xl border-b border-white/[0.08] py-3'
          : 'bg-black/80 backdrop-blur-xl py-4'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.01] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none" />

      <div className="relative max-w-[1800px] mx-auto px-6 flex items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle, ${designTokens.colors.palette.primary.glow} 0%, transparent 70%)`
              }}
            />
            <img
              src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
              alt="Le 40"
              className="relative h-auto w-32 brightness-0 invert drop-shadow-2xl"
            />
          </motion.div>
        </Link>

        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link to={item.href}>
                    <motion.div
                      className={`relative px-4 py-2.5 rounded-xl flex items-center gap-2.5 ${designTokens.animations.transition.fast} ${
                        isActive
                          ? 'bg-white/[0.08] text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="headerActiveBackground"
                          className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-xl"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <Icon className={`relative w-4 h-4 ${designTokens.animations.transition.fast}`} />
                      <span className={`relative font-inter font-semibold text-sm whitespace-nowrap ${designTokens.animations.transition.fast}`}>
                        {item.name}
                      </span>

                      {isActive && (
                        <motion.div
                          layoutId="headerActiveIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full"
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

        <div className="flex items-center gap-2">
          {secondaryItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.name} to={item.href}>
                <motion.div
                  className={`p-2.5 rounded-xl ${designTokens.animations.transition.fast} ${
                    isActive
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={item.name}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              </Link>
            );
          })}

          <motion.button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title="Panier"
          >
            <ShoppingCart className="w-5 h-5" />

            <AnimatePresence>
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-[10px] font-bold">{itemCount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="ml-2 pl-2 border-l border-white/[0.08]">
            <Link to="/reservation">
              <motion.div
                className="relative overflow-hidden rounded-xl px-5 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
                  <span className="font-inter font-bold text-sm text-white whitespace-nowrap">
                    Réserver
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
