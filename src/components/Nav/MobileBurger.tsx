import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Grid3X3, Building2, MapPin, Video, BookOpen, Phone, Calendar, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { designTokens } from '../../styles/designTokens';
import Button from '../UI/Button';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home, gradient: 'from-white/10 to-white/5' },
  { name: 'Offres', href: '/offres', icon: Grid3X3, gradient: 'from-white/10 to-white/5' },
  { name: 'Espaces', href: '/coworking', icon: Building2, gradient: designTokens.colors.services.coworking.gradient },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin, gradient: designTokens.colors.services.domiciliation.gradient },
  { name: 'Salles', href: '/salles', icon: Phone, gradient: designTokens.colors.services.salles.gradient },
  { name: 'Studio', href: '/studios', icon: Video, gradient: designTokens.colors.services.studios.gradient },
  { name: 'Communauté', href: '/community', icon: Users, gradient: designTokens.colors.services.community.gradient },
  { name: 'Blog', href: '/blog', icon: BookOpen, gradient: 'from-white/10 to-white/5' },
  { name: 'Contact', href: '/contact', icon: Phone, gradient: 'from-white/10 to-white/5' },
];

export default function MobileBurger() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden">
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 ${designTokens.colors.background.primary}/98 backdrop-blur-xl border-b border-white/[0.08] z-50 px-6 py-4 flex items-center justify-between`}
      >
        <Link to="/" className="flex items-center space-x-3">
          <motion.div
            className={`w-11 h-11 bg-gradient-to-br ${designTokens.colors.services.coworking.gradient} ${designTokens.buttons.radius.base} flex items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Building2 className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-montserrat font-black text-white tracking-tight">Le 40</h1>
            <p className="text-[10px] font-inter font-medium text-white/50 tracking-wider uppercase">Premium</p>
          </div>
        </Link>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 ${designTokens.buttons.radius.base} backdrop-blur-xl bg-white/[0.04] text-white hover:bg-white/[0.08] ${designTokens.animations.transition.fast} border border-white/[0.08]`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 ${designTokens.colors.background.primary}/90 backdrop-blur-md z-40 md:hidden`}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className={`fixed right-0 top-0 h-full w-[320px] ${designTokens.colors.background.primary} backdrop-blur-xl border-l border-white/[0.08] z-50 flex flex-col`}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

            <div className="relative p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${designTokens.colors.services.coworking.gradient} ${designTokens.buttons.radius.large} flex items-center justify-center shadow-xl`}>
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-montserrat font-black text-white tracking-tight">Le 40</h1>
                  <p className="text-[10px] font-inter font-medium text-white/50 tracking-wider uppercase">Coworking Premium</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="relative flex-1 px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <ul className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`group relative flex items-center space-x-4 px-4 py-4 ${designTokens.buttons.radius.large} ${designTokens.animations.transition.fast} overflow-hidden ${
                          isActive ? `${designTokens.cards.background} ${designTokens.cards.border}` : 'hover:bg-white/[0.04]'
                        }`}
                      >
                        <motion.div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${designTokens.animations.transition.fast} ${
                            isActive ? `bg-gradient-to-br ${item.gradient}` : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
                          }`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
                        </motion.div>
                        <span className={`font-montserrat font-semibold text-sm tracking-wide ${
                          isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                        }`}>
                          {item.name}
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="activeMobileIndicator"
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${item.gradient} rounded-r-full`}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <div className="relative p-5 border-t border-white/[0.08]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Button
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  size="lg"
                  icon={Calendar}
                  fullWidth
                  className="shadow-xl"
                >
                  Réserver maintenant
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
