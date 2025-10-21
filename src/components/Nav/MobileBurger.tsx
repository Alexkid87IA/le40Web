import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Building2, MapPin, Presentation, Video, Phone, Calendar, Users, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Bureaux', href: '/coworking', icon: Building2 },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin },
  { name: 'Nos espaces', href: '/salles', icon: Presentation },
  { name: 'Studio', href: '/studios', icon: Video },
  { name: 'Contact', href: '/contact', icon: Phone },
  { name: 'Communauté', href: '/community', icon: Users },
];

export default function MobileBurger() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount, setIsOpen: setCartOpen } = useCart();

  return (
    <div className="lg:hidden">
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 z-50 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/diqco2njt/image/upload/v1750536822/0afc7668-eadb-4d3e-a56c-b66bc5e92653_xh1ie5.png"
              alt="Le 40"
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-l border-white/10 z-50 flex flex-col"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

              <div className="relative flex flex-col h-full">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <img
                      src="https://res.cloudinary.com/diqco2njt/image/upload/v1750536822/0afc7668-eadb-4d3e-a56c-b66bc5e92653_xh1ie5.png"
                      alt="Le 40"
                      className="h-10 w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <nav className="space-y-2">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;

                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive
                                ? 'bg-white/10 text-white'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-6 border-t border-white/10">
                  <Link to="/reservation" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-6 py-4 rounded-xl flex items-center justify-center gap-2 font-semibold"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Réserver</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
