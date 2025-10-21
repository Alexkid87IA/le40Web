import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, MapPin, Presentation, Video, Phone, Users, Calendar, ShoppingCart, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Bureaux', href: '/coworking', icon: Building2 },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin },
  { name: 'Nos espaces', href: '/salles', icon: Presentation },
  { name: 'Studio', href: '/studios', icon: Video },
];

const NavItem = ({ item, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="relative">
          <Icon className="w-5 h-5" />
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </div>

        <span className="font-medium">{item.name}</span>

        <AnimatePresence>
          {(isActive || isHovered) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-auto"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

const CartButton = () => {
  const { itemCount, setIsOpen } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-4 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 w-full"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5" />
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center"
            >
              <span className="text-black text-[10px] font-bold">{itemCount}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="font-medium">Panier</span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="ml-auto"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default function SidebarNav() {
  const location = useLocation();

  return (
    <>
      <motion.nav
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-r border-white/10 flex-col z-50"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

        <div className="relative flex flex-col h-full">
          <div className="px-8 py-8">
            <Link to="/">
              <motion.img
                src="https://res.cloudinary.com/diqco2njt/image/upload/v1750536822/0afc7668-eadb-4d3e-a56c-b66bc5e92653_xh1ie5.png"
                alt="Le 40"
                className="w-40 h-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </div>

          <div className="flex-1 px-4 overflow-y-auto">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={location.pathname === item.href}
                />
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-1">
              <CartButton />

              <NavItem
                item={{ name: 'Contact', href: '/contact', icon: Phone }}
                isActive={location.pathname === '/contact'}
              />

              <NavItem
                item={{ name: 'Communauté', href: '/community', icon: Users }}
                isActive={location.pathname === '/community'}
              />
            </div>
          </div>

          <div className="p-6">
            <Link to="/reservation">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group overflow-hidden rounded-xl bg-white text-black px-6 py-4 flex items-center justify-center gap-2 font-semibold"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <Calendar className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Réserver</span>
              </motion.div>
            </Link>
          </div>

          <div className="px-6 pb-4">
            <p className="text-white/30 text-xs text-center">
              © 2024 Le 40 Coworking
            </p>
          </div>
        </div>
      </motion.nav>

      <div className="hidden lg:block w-[280px]" />
    </>
  );
}
