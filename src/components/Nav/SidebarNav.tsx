import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, ShoppingCart, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home, color: 'from-blue-500 to-cyan-400', rgb: '59, 130, 246' },
  { name: 'Bureaux', href: '/coworking', icon: Building2, color: 'from-blue-500 to-cyan-400', rgb: '59, 130, 246' },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin, color: 'from-amber-500 to-orange-400', rgb: '245, 158, 11' },
  { name: 'Nos espaces', href: '/salles', icon: Presentation, color: 'from-slate-500 to-zinc-400', rgb: '148, 163, 184' },
  { name: 'Studio', href: '/studios', icon: Video, color: 'from-emerald-500 to-teal-400', rgb: '16, 185, 129' },
];

const NavIcon = ({ item, index, mouseY, activePath, onHover }) => {
  const ref = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? val - (bounds.y + bounds.height / 2) : Infinity;
  });

  const scale = useTransform(distance, [-120, 0, 120], [1, 1.3, 1]);
  const scaleSpring = useSpring(scale, { mass: 0.1, stiffness: 200, damping: 15 });

  const isActive = activePath === item.href;
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 + 0.2, type: "spring", stiffness: 100 }}
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
        className="relative block group"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-white/[0.08] to-white/[0.04] rounded-xl blur-sm"
        />

        <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300">

          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b ${item.color} rounded-r-full`}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          )}

          <motion.div
            style={{ scale: scaleSpring }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
              className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-white/[0.12] to-white/[0.08] shadow-lg'
                  : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
              }`}
              style={{
                boxShadow: isActive ? `0 4px 24px rgba(${item.rgb}, 0.2)` : 'none'
              }}
            >
              <Icon className={`w-5 h-5 transition-all duration-300 ${
                isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
              }`} />
            </motion.div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-lg blur-xl opacity-30`}
                />
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            animate={{
              x: isActive || isHovered ? 2 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <span className={`font-semibold text-sm tracking-wide transition-all duration-300 ${
              isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
            }`}>
              {item.name}
            </span>
          </motion.div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4 text-white/40" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
};

const CartNavItem = ({ mouseY, activePath, onHover }) => {
  const ref = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { itemCount, setIsOpen } = useCart();

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? val - (bounds.y + bounds.height / 2) : Infinity;
  });

  const scale = useTransform(distance, [-120, 0, 120], [1, 1.3, 1]);
  const scaleSpring = useSpring(scale, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
    >
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover({ name: 'Panier', rgb: '148, 163, 184' });
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover(null);
        }}
        className="relative w-full group"
      >
        <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300">

          <motion.div
            style={{ scale: scaleSpring }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
              className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-white/[0.04] group-hover:bg-white/[0.08]"
            >
              <ShoppingCart className="w-5 h-5 transition-all duration-300 text-white/60 group-hover:text-white/90" />

              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-[10px] font-bold">{itemCount}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-slate-500 to-zinc-400 rounded-lg blur-xl opacity-30"
                />
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            animate={{
              x: isHovered ? 2 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex-1 text-left"
          >
            <span className="font-semibold text-sm tracking-wide transition-all duration-300 text-white/60 group-hover:text-white/90">
              Panier
            </span>
          </motion.div>

          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="px-2 py-0.5 rounded-md bg-white/5">
                  <span className="text-white/50 text-xs font-bold">
                    {itemCount}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
      <motion.nav
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => {
          mouseY.set(Infinity);
          setHoveredItem(null);
        }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] bg-gradient-to-b from-slate-950 via-slate-950/98 to-slate-950 backdrop-blur-3xl border-r border-white/[0.06] flex-col z-50 overflow-hidden"
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.03),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.02),transparent)]" />

        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '32px 32px'
             }}>
        </div>

        <motion.div
          animate={{
            opacity: hoveredItem ? 0.08 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hoveredItem
              ? `radial-gradient(circle at 50% 30%, rgba(${hoveredItem.rgb}, 0.15), transparent 70%)`
              : 'transparent'
          }}
        />

        <div className="relative px-6 py-8">
          <Link to="/" className="block">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-white/5 via-white/0 to-white/0 blur-2xl rounded-full"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.img
                src="https://i.imgur.com/OgDg0yM.png"
                alt="Le 40"
                className="relative w-full max-w-[180px] h-auto mx-auto"
                style={{
                  filter: 'drop-shadow(0 4px 20px rgba(255, 255, 255, 0.1))'
                }}
              />
            </motion.div>
          </Link>
        </div>

        <div className="flex-1 px-3 overflow-y-auto scrollbar-hide">
          <nav className="space-y-1">
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

            <div className="h-px bg-white/[0.06] my-3 mx-4" />

            <CartNavItem
              mouseY={mouseY}
              activePath={location.pathname}
              onHover={setHoveredItem}
            />

            <NavIcon
              item={{ name: 'Contact', href: '/contact', icon: Phone, color: 'from-slate-500 to-zinc-400', rgb: '148, 163, 184' }}
              index={navItems.length + 1}
              mouseY={mouseY}
              activePath={location.pathname}
              onHover={setHoveredItem}
            />

            <NavIcon
              item={{ name: 'Communauté', href: '/community', icon: Users, color: 'from-amber-500 to-orange-400', rgb: '245, 158, 11' }}
              index={navItems.length + 2}
              mouseY={mouseY}
              activePath={location.pathname}
              onHover={setHoveredItem}
            />
          </nav>
        </div>

        <div className="p-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
          >
            <Link to="/reservation" className="group relative block">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-px"
              >
                <div className="relative bg-gradient-to-r from-amber-600/90 to-orange-600/90 rounded-xl overflow-hidden backdrop-blur-sm">
                  <motion.div
                    animate={{
                      x: [-300, 300],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />

                  <div className="relative flex items-center justify-center gap-2.5 px-6 py-4">
                    <Calendar className="w-5 h-5 text-white" />
                    <span className="text-white font-bold text-sm tracking-wide">Réserver maintenant</span>
                    <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        <div className="px-6 pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-2 py-3 rounded-lg bg-white/[0.02]"
          >
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-green-400"
              />
              <span className="text-white/40 text-xs font-medium tracking-wider">
                Ouvert maintenant
              </span>
            </div>
          </motion.div>
          <p className="text-white/20 text-[10px] text-center tracking-wider mt-3">
            © 2024 Le 40 • Marseille
          </p>
        </div>
      </motion.nav>

      <div className="hidden lg:block w-[260px]" />
    </>
  );
}
