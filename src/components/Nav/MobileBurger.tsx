import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Grid3X3, Building2, MapPin, Video, BookOpen, Phone, Calendar, Users } from 'lucide-react';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home, color: 'text-white' },
  { name: 'Offres', href: '/offres', icon: Grid3X3, color: 'text-white' },
  { name: 'Espaces', href: '/coworking', icon: Building2, color: 'text-coworking' },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin, color: 'text-domiciliation' },
  { name: 'Salles', href: '/salles', icon: Phone, color: 'text-salles' },
  { name: 'Studio', href: '/studios', icon: Video, color: 'text-studios' },
  { name: 'Communauté', href: '/community', icon: Users, color: 'text-community' },
  { name: 'Blog', href: '/blog', icon: BookOpen, color: 'text-blog' },
  { name: 'Contact', href: '/contact', icon: Phone, color: 'text-white' },
];

export default function MobileBurger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <motion.header 
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 bg-black-deep/95 backdrop-blur-glass border-b border-white/10 z-50 px-6 py-4 flex items-center justify-between film-grain"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center glow-effect">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-montserrat font-black text-white">Le 40</h1>
            <p className="text-xs font-inter text-white/60 tracking-wide">PREMIUM</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black-deep/80 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Slide */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 h-full w-80 bg-black-deep/98 backdrop-blur-glass border-l border-white/10 z-50 flex flex-col film-grain"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center glow-effect">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-montserrat font-black text-white">Le 40</h1>
                  <p className="text-xs font-inter text-white/60 tracking-wide">COWORKING PREMIUM</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-white/60 hover:text-white transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-6 py-6">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center space-x-4 px-4 py-4 rounded-2xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-all duration-300`} />
                      <span className="font-inter font-medium tracking-wide">{item.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="p-6 border-t border-white/10">
              <motion.a
                href="/contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full bg-gradient-primary text-white px-6 py-4 rounded-2xl font-montserrat font-semibold text-center block hover:bg-gradient-primary-hover transition-all duration-500 relative overflow-hidden glow-effect"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="tracking-wide">Réserver</span>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}