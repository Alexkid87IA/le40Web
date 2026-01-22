import React, { useState } from 'react';
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
    gradient: designTokens.colors.palette.primary.gradient,
    color: designTokens.colors.palette.primary.main,
    description: 'Découvrez Le 40'
  },
  {
    name: 'Bureaux',
    href: '/bureaux',
    icon: Building2,
    gradient: designTokens.colors.palette.secondary.gradient,
    color: designTokens.colors.palette.secondary.main,
    description: 'Espaces de travail'
  },
  {
    name: 'Domiciliation',
    href: '/domiciliation',
    icon: MapPin,
    gradient: designTokens.colors.palette.primary.gradient,
    color: designTokens.colors.palette.primary.main,
    description: 'Adresse professionnelle'
  },
  {
    name: 'Salles',
    href: '/salles',
    icon: Presentation,
    gradient: designTokens.colors.palette.primary.gradient,
    color: designTokens.colors.palette.primary.main,
    description: 'Réunions & événements'
  },
  {
    name: 'Studio',
    href: '/studios',
    icon: Video,
    gradient: designTokens.colors.palette.accent.gradient,
    color: designTokens.colors.palette.accent.main,
    description: 'Production audiovisuelle'
  },
];

const secondaryItems = [
  {
    name: 'Communauté',
    href: '/community',
    icon: Users,
    gradient: designTokens.colors.palette.secondary.gradient,
    color: designTokens.colors.palette.secondary.main
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: Phone,
    gradient: designTokens.colors.palette.primary.gradient,
    color: designTokens.colors.palette.primary.main
  },
];

const NavItem = ({ item, index, activePath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activePath === item.href;
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={item.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative block mb-2"
      >
        <motion.div
          className={`relative overflow-hidden ${designTokens.buttons.radius.large} ${designTokens.animations.transition.normal}`}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {isActive && (
            <motion.div
              layoutId="sidebarActiveBackground"
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10`}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}

          <div className={`relative px-4 py-4 backdrop-blur-xl border ${
            isActive
              ? 'bg-white/[0.08] border-white/[0.16]'
              : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.10]'
          } ${designTokens.animations.transition.normal}`}>

            {isActive && (
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            )}

            <div className="relative flex items-center gap-4">
              <motion.div
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${designTokens.animations.transition.normal} ${
                  isActive
                    ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                    : 'bg-white/[0.06] group-hover:bg-white/[0.10]'
                }`}
                animate={isActive ? {
                  boxShadow: [
                    `0 0 20px ${item.color}66`,
                    `0 0 30px ${item.color}99`,
                    `0 0 20px ${item.color}66`,
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'} ${designTokens.animations.transition.normal}`} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className={`font-montserrat font-bold text-sm ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white/95'} ${designTokens.animations.transition.normal}`}>
                  {item.name}
                </div>
                {item.description && (
                  <div className={`font-inter text-[11px] mt-0.5 ${isActive ? 'text-white/60' : 'text-white/40 group-hover:text-white/60'} ${designTokens.animations.transition.normal}`}>
                    {item.description}
                  </div>
                )}
              </div>

              <motion.div
                animate={{ x: isHovered ? 2 : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className={`w-4 h-4 ${isActive ? 'text-white/80' : 'text-white/40'}`} />
              </motion.div>
            </div>

            {isActive && (
              <motion.div
                layoutId="sidebarActiveIndicator"
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b ${item.gradient} rounded-r-full`}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const SecondaryNavItem = ({ item, index, activePath }) => {
  const isActive = activePath === item.href;
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      className="group relative block"
    >
      <motion.div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${designTokens.animations.transition.fast} ${
          isActive
            ? 'bg-white/[0.06] border border-white/[0.10]'
            : 'hover:bg-white/[0.03]'
        }`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
          isActive ? `bg-gradient-to-br ${item.gradient}` : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
        } ${designTokens.animations.transition.fast}`}>
          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
        </div>
        <span className={`font-inter font-medium text-sm ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'} ${designTokens.animations.transition.fast}`}>
          {item.name}
        </span>
      </motion.div>
    </Link>
  );
};

const CartItem = () => {
  const { itemCount, setIsOpen } = useCart();

  return (
    <motion.button
      onClick={() => setIsOpen(true)}
      className="group relative block w-full"
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${designTokens.animations.transition.fast} hover:bg-white/[0.03]`}>
        <div className="relative w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.04] group-hover:bg-white/[0.08] transition-all duration-300">
          <ShoppingCart className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors duration-300" />

          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className={`absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r ${designTokens.colors.palette.primary.gradient} rounded-full flex items-center justify-center shadow-lg`}
              >
                <span className="text-white text-[10px] font-bold">{itemCount}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="font-inter font-medium text-sm text-white/60 group-hover:text-white/90 transition-colors duration-300">
          Panier
        </span>
        {itemCount > 0 && (
          <span className="ml-auto text-white/40 text-xs font-medium">
            {itemCount}
          </span>
        )}
      </div>
    </motion.button>
  );
};

export default function SidebarNav() {
  const location = useLocation();

  return (
    <>
      <motion.nav
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-[320px] bg-black/95 backdrop-blur-2xl border-r border-white/[0.06] flex-col z-50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none" />

        <div className="relative px-6 py-8 border-b border-white/[0.06]">
          <Link to="/" className="block">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div
                className="absolute inset-0 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${designTokens.colors.palette.primary.glow} 0%, transparent 70%)`
                }}
              />
              <img
                src="/logo.png"
                alt="Le 40"
                className="relative w-full max-w-[200px] h-auto mx-auto drop-shadow-2xl brightness-0 invert"
              />
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-white/[0.08]">
              <Sparkles className="w-3 h-3 text-orange-400" />
              <span className="text-[11px] font-inter font-semibold text-white/70 tracking-wider uppercase">Premium Space</span>
            </div>
          </motion.div>
        </div>

        <div className="relative flex-1 px-5 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <NavItem
                key={item.name}
                item={item}
                index={index}
                activePath={location.pathname}
              />
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-2">
            <CartItem />
            {secondaryItems.map((item, index) => (
              <SecondaryNavItem
                key={item.name}
                item={item}
                index={index}
                activePath={location.pathname}
              />
            ))}
          </div>
        </div>

        <div className="relative p-6 border-t border-white/[0.06] space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/reservation"
              className="group relative block overflow-hidden rounded-2xl"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${designTokens.colors.palette.primary.gradient}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />

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

              <div className="relative px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-white" />
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 text-white/80" />
                  </motion.div>
                </div>
                <div className="text-white font-montserrat font-bold text-base mb-1">
                  Réserver maintenant
                </div>
                <div className="text-white/70 font-inter text-xs">
                  Disponible 24/7
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="text-center pt-2">
            <p className="text-white/25 text-[10px] font-inter font-medium tracking-wider uppercase">
              © 2024 Le 40 • Marseille
            </p>
          </div>
        </div>
      </motion.nav>

      <div className="hidden md:block w-[320px]" />
    </>
  );
}
