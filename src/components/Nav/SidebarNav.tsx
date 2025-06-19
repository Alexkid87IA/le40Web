import React from 'react';
import { motion } from 'framer-motion';
import { Home, Grid3X3, Building2, MapPin, Video, BookOpen, Phone, Calendar, Users } from 'lucide-react';

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

export default function SidebarNav() {
  return (
    <motion.nav 
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden lg:flex fixed left-0 top-0 h-screen w-60 bg-black-deep/95 backdrop-blur-glass border-r border-white/10 flex-col z-50 film-grain"
    >
      {/* Logo */}
      <div className="p-8 border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center space-x-3"
        >
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center glow-effect">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-montserrat font-black text-white">Le 40</h1>
            <p className="text-xs font-inter text-white/60 tracking-wide">COWORKING PREMIUM</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-6 py-8">
        <ul className="space-y-3">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.4, duration: 0.6 }}
            >
              <a
                href={item.href}
                className="group flex items-center space-x-4 px-4 py-4 rounded-2xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-500 relative overflow-hidden"
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
                
                <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-all duration-300`} />
                <span className="font-inter font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                  {item.name}
                </span>
                
                {/* Active indicator */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="p-6 border-t border-white/10">
        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group w-full bg-gradient-primary text-white px-6 py-4 rounded-2xl font-montserrat font-semibold text-center block hover:bg-gradient-primary-hover transition-all duration-500 relative overflow-hidden glow-effect"
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
          <div className="relative flex items-center justify-center">
            <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-wide">Réserver</span>
          </div>
        </motion.a>
      </div>
    </motion.nav>
  );
}