import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, ArrowRight, Sparkles, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

// Données des rubriques avec icônes distinctes
const navItems = [
  { name: 'Accueil', href: '/', icon: Home, color: 'from-blue-500 to-cyan-500', rgb: '59, 130, 246' },
  { name: 'Bureaux', href: '/coworking', icon: Building2, color: 'from-emerald-500 to-teal-500', rgb: '16, 185, 129' },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin, color: 'from-orange-500 to-red-500', rgb: '249, 115, 22' },
  { name: 'Nos espaces', href: '/salles', icon: Presentation, color: 'from-indigo-500 to-purple-500', rgb: '99, 102, 241' },
  { name: 'Studio', href: '/studios', icon: Video, color: 'from-pink-500 to-rose-500', rgb: '236, 72, 153' },
];

// Composant NavIcon avec effet dock magnétique
const NavIcon = ({ item, index, mouseY, activePath, onHover }) => {
  const ref = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? val - (bounds.y + bounds.height / 2) : Infinity;
  });

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.8, 1]);
  const scaleSpring = useSpring(scale, { mass: 0.1, stiffness: 150, damping: 12 });
  
  const isActive = activePath === item.href;
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.08 + 0.3 }}
    >
      <Link
        to={item.href}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover(item);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover(null);
        }}
        className="relative flex items-center gap-4 px-4 py-2"
      >
        {/* Background animé pour active/hover */}
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 0.15 : isHovered ? 0.08 : 0,
            scale: isActive || isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl`}
        />

        {/* Indicateur actif à gauche */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-purple-600 to-pink-600 rounded-r-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {/* Conteneur de l'icône avec effet dock */}
        <motion.div
          style={{ scale: scaleSpring }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{
              rotateZ: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isActive 
                ? `bg-gradient-to-br ${item.color} shadow-lg` 
                : 'bg-white/10 hover:bg-white/15'
            }`}
            style={{
              boxShadow: isActive ? `0 8px 32px rgba(${item.rgb}, 0.3)` : 'none'
            }}
          >
            <Icon className={`w-7 h-7 transition-all duration-300 ${
              isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
            }`} />
            
            {/* Sparkle effect pour l'item actif */}
            {isActive && (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute top-0 right-0"
              >
                <Sparkles className="w-3 h-3 text-white/60" />
              </motion.div>
            )}
          </motion.div>

          {/* Glow effect */}
          <AnimatePresence>
            {(isHovered || isActive) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-xl opacity-30`}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Label avec animation */}
        <motion.span
          animate={{
            color: isActive ? '#ffffff' : isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
            x: isActive || isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-base whitespace-nowrap"
          style={{
            textShadow: (isActive || isHovered) ? `0 0 20px rgba(${item.rgb}, 0.5)` : 'none'
          }}
        >
          {item.name}
        </motion.span>

        {/* Arrow indicator pour active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-auto"
            >
              <ArrowRight className="w-4 h-4 text-white/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
};

// Composant CartNavItem intégré comme un navItem
const CartNavItem = ({ mouseY, activePath, onHover }) => {
  const ref = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const location = useLocation();
  
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? val - (bounds.y + bounds.height / 2) : Infinity;
  });

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.8, 1]);
  const scaleSpring = useSpring(scale, { mass: 0.1, stiffness: 150, damping: 12 });
  
  const isActive = location.pathname === '/cart';

  return (
    <motion.div
      ref={ref}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.85 }}
      className="border-t border-white/10 mt-6 pt-6"
    >
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover({ name: 'Panier', rgb: '168, 85, 247' });
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover(null);
        }}
        className="relative flex items-center gap-4 px-4 py-2 w-full text-left cursor-pointer"
      >
        {/* Background animé pour hover */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 0.08 : 0,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl"
        />

        {/* Conteneur de l'icône avec effet dock */}
        <motion.div
          style={{ scale: scaleSpring }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{
              rotateZ: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white/10 hover:bg-white/15"
          >
            <ShoppingCart className="w-7 h-7 transition-all duration-300 text-white/70 group-hover:text-white" />
            
            {/* Badge avec nombre d'articles */}
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs font-bold">{itemCount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Glow effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Label avec animation */}
        <motion.span
          animate={{
            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
            x: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-base whitespace-nowrap"
          style={{
            textShadow: isHovered ? '0 0 20px rgba(168, 85, 247, 0.5)' : 'none'
          }}
        >
          Panier
        </motion.span>

        {/* Montant total si des articles */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-auto"
            >
              <span className="text-purple-400 text-sm font-medium">
                {itemCount} {itemCount > 1 ? 'articles' : 'article'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default function SidebarNav() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const mouseY = useMotionValue(Infinity);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav 
        initial={{ x: -260, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => {
          mouseY.set(Infinity);
          setHoveredItem(null);
        }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] bg-black/95 backdrop-blur-3xl border-r border-white/5 flex-col z-50 overflow-hidden"
      >
        {/* Background dynamique */}
        <div className="absolute inset-0">
          {/* Gradient animé basé sur l'hover */}
          <motion.div
            animate={{
              opacity: hoveredItem ? 0.1 : 0.05,
              y: hoveredItem ? 0 : 100,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{
              background: hoveredItem 
                ? `radial-gradient(circle at 50% 50%, rgba(${hoveredItem.rgb}, 0.2), transparent)` 
                : 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1), transparent)'
            }}
          />
          
          {/* Particules flottantes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Logo Section */}
        <div className="relative px-6 py-8">
          <Link to="/" className="block">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {/* Glow effect derrière le logo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-2xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Logo Le 40 */}
              <motion.img
                src="https://res.cloudinary.com/diqco2njt/image/upload/v1750536822/0afc7668-eadb-4d3e-a56c-b66bc5e92653_xh1ie5.png"
                alt="Le 40"
                className="relative w-full max-w-[180px] h-auto mx-auto"
                style={{
                  filter: 'drop-shadow(0 4px 20px rgba(147, 51, 234, 0.3))'
                }}
                whileHover={{
                  filter: 'drop-shadow(0 8px 30px rgba(147, 51, 234, 0.5))'
                }}
              />
            </motion.div>
          </Link>
        </div>

        {/* Navigation Items avec effet dock */}
        <div className="flex-1 px-2 overflow-y-auto">
          <nav className="space-y-3">
            {navItems.map((item, index) => (
              <NavIcon 
                key={item.name} 
                item={item} 
                index={index}
                mouseY={mouseY} 
                activePath={location.pathname}
                onHover={setHoveredItem}
              />
            ))}
            
            {/* Panier juste après Studio */}
            <CartNavItem 
              mouseY={mouseY}
              activePath={location.pathname}
              onHover={setHoveredItem}
            />
            
            {/* Contact après le panier */}
            <NavIcon 
              item={{ name: 'Contact', href: '/contact', icon: Phone, color: 'from-slate-500 to-zinc-500', rgb: '148, 163, 184' }}
              index={navItems.length + 1}
              mouseY={mouseY}
              activePath={location.pathname}
              onHover={setHoveredItem}
            />
            
            {/* Communauté */}
            <NavIcon 
              item={{ name: 'Communauté', href: '/community', icon: Users, color: 'from-amber-500 to-yellow-500', rgb: '245, 158, 11' }}
              index={navItems.length + 2}
              mouseY={mouseY}
              activePath={location.pathname}
              onHover={setHoveredItem}
            />
          </nav>
        </div>

        {/* CTA Button Réserver */}
        <div className="p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/reservation"
              className="relative block overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-[2px] group"
            >
              <div className="relative bg-black/90 rounded-2xl overflow-hidden">
                <motion.div
                  animate={{
                    x: [-300, 300],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                
                <div className="relative flex items-center justify-center gap-2 px-6 py-4">
                  <Calendar className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Réserver un espace</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Footer minimaliste */}
        <div className="px-6 pb-6">
          <p className="text-white/20 text-xs text-center">
            © 2024 Le 40 Coworking
          </p>
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="hidden lg:block w-[260px]" />
    </>
  );
}