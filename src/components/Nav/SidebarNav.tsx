import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home, color: 'from-blue-500 to-cyan-400' },
  { name: 'Bureaux', href: '/coworking', icon: Building2, color: 'from-blue-500 to-cyan-400' },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin, color: 'from-amber-500 to-orange-400' },
  { name: 'Nos espaces', href: '/salles', icon: Presentation, color: 'from-slate-500 to-zinc-400' },
  { name: 'Studio', href: '/studios', icon: Video, color: 'from-emerald-500 to-teal-400' },
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
        className="relative flex items-center gap-3 px-4 py-3 rounded-xl group transition-all duration-200"
      >
        {isActive && (
          <motion.div
            layoutId="activeBackground"
            className="absolute inset-0 bg-white/[0.08] rounded-xl"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        <motion.div
          className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isActive ? 'bg-white/[0.12]' : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className={`w-5 h-5 transition-colors duration-200 ${
            isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
          }`} />
        </motion.div>

        <span className={`font-medium text-sm transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
        }`}>
          {item.name}
        </span>

        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${item.color} rounded-r-full`}
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
        className="relative flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left group transition-all duration-200 hover:bg-white/[0.04]"
      >
        <div className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.04] group-hover:bg-white/[0.08] transition-all duration-200">
          <ShoppingCart className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-200" />

          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-[10px] font-bold">{itemCount}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="font-medium text-sm text-white/60 group-hover:text-white/90 transition-colors duration-200">
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
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-r border-white/10 flex-col z-50 shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

        <div className="relative px-6 py-8 border-b border-white/10">
          <Link to="/" className="block">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="https://i.imgur.com/OgDg0yM.png"
                alt="Le 40"
                className="w-full max-w-[180px] h-auto mx-auto drop-shadow-2xl"
              />
            </motion.div>
          </Link>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto">
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
              item={{ name: 'Contact', href: '/contact', icon: Phone, color: 'from-slate-500 to-zinc-400' }}
              index={navItems.length + 1}
              activePath={location.pathname}
            />

            <NavIcon
              item={{ name: 'Communauté', href: '/community', icon: Users, color: 'from-amber-500 to-orange-400' }}
              index={navItems.length + 2}
              activePath={location.pathname}
            />
          </nav>
        </div>

        <div className="relative p-5 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/reservation"
              className="group relative block overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 text-white" />
                <span className="text-white font-semibold text-base">Réserver maintenant</span>
              </div>
            </Link>
          </motion.div>

          <div className="mt-4 text-center">
            <p className="text-white/30 text-xs font-medium">
              © 2024 Le 40 • Paris
            </p>
          </div>
        </div>
      </motion.nav>

      <div className="hidden lg:block w-[280px]" />
    </>
  );
}
