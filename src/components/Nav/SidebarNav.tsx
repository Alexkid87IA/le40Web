import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { designTokens } from '../../styles/designTokens';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home, gradient: 'from-white/10 to-white/5' },
  { name: 'Bureaux', href: '/coworking', icon: Building2, gradient: designTokens.colors.services.coworking.gradient },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin, gradient: designTokens.colors.services.domiciliation.gradient },
  { name: 'Nos espaces', href: '/salles', icon: Presentation, gradient: designTokens.colors.services.salles.gradient },
  { name: 'Studio', href: '/studios', icon: Video, gradient: designTokens.colors.services.studios.gradient },
];

const NavIcon = ({ item, index, activePath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activePath === item.href;
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={item.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center gap-4 px-4 py-3.5 rounded-xl group transition-all duration-300"
      >
        {isActive && (
          <motion.div
            layoutId="activeBackground"
            className={`absolute inset-0 bg-gradient-to-br ${designTokens.cards.background} ${designTokens.cards.border} rounded-xl`}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        <motion.div
          className={`relative w-11 h-11 rounded-xl flex items-center justify-center ${designTokens.animations.transition.fast} ${
            isActive ? `bg-gradient-to-br ${item.gradient}` : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
          }`}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className={`w-5 h-5 ${designTokens.animations.transition.fast} ${
            isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'
          }`} />
        </motion.div>

        <span className={`font-montserrat font-semibold text-sm ${designTokens.animations.transition.fast} relative ${
          isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'
        }`}>
          {item.name}
        </span>

        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${item.gradient} rounded-r-full shadow-lg`}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

const CartNavItem = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { itemCount, setIsOpen } = useCart();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="border-t border-white/[0.06] mt-3 pt-3"
    >
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center gap-4 px-4 py-3.5 rounded-xl w-full text-left group transition-all duration-300 hover:bg-white/[0.04]"
      >
        <motion.div
          className="relative w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.04] group-hover:bg-white/[0.08] transition-all duration-300"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors duration-300" />

          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={`absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r ${designTokens.colors.services.coworking.gradient} rounded-full flex items-center justify-center shadow-lg`}
              >
                <span className="text-white text-[10px] font-bold">{itemCount}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <span className="font-montserrat font-semibold text-sm text-white/50 group-hover:text-white/80 transition-colors duration-300">
          Panier
        </span>

        {itemCount > 0 && (
          <span className="ml-auto text-white/40 text-xs font-medium">
            {itemCount}
          </span>
        )}
      </button>
    </motion.div>
  );
};

export default function SidebarNav() {
  const location = useLocation();

  return (
    <>
      <motion.nav
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden lg:flex fixed left-0 top-0 h-screen w-[280px] ${designTokens.colors.background.primary} backdrop-blur-xl border-r border-white/[0.08] flex-col z-50`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

        <div className="relative px-6 py-8 border-b border-white/[0.08]">
          <Link to="/" className="block">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                alt="Le 40"
                className="w-full max-w-[180px] h-auto mx-auto drop-shadow-2xl brightness-0 invert"
              />
            </motion.div>
          </Link>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <NavIcon
                key={item.name}
                item={item}
                index={index}
                activePath={location.pathname}
              />
            ))}

            <CartNavItem />

            <NavIcon
              item={{ name: 'Contact', href: '/contact', icon: Phone, gradient: 'from-white/10 to-white/5' }}
              index={navItems.length + 1}
              activePath={location.pathname}
            />

            <NavIcon
              item={{ name: 'Communauté', href: '/community', icon: Users, gradient: designTokens.colors.services.community.gradient }}
              index={navItems.length + 2}
              activePath={location.pathname}
            />
          </nav>
        </div>

        <div className="relative p-5 border-t border-white/[0.08]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/reservation"
              className="group relative block overflow-hidden rounded-xl"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${designTokens.colors.services.coworking.gradient} opacity-80 group-hover:opacity-100`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="relative px-4 py-4 flex items-center justify-center gap-3"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="w-5 h-5 text-white" />
                <span className="text-white font-montserrat font-bold text-base tracking-wide">Réserver maintenant</span>
              </motion.div>
            </Link>
          </motion.div>

          <div className="mt-4 text-center">
            <p className="text-white/30 text-xs font-inter font-medium">
              © 2024 Le 40 • Marseille
            </p>
          </div>
        </div>
      </motion.nav>

      <div className="hidden lg:block w-[280px]" />
    </>
  );
}
