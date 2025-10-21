import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, ShoppingCart } from 'lucide-react';
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

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.6, 1]);
  const scaleSpring = useSpring(scale, { mass: 0.1, stiffness: 150, damping: 12 });

  const isActive = activePath === item.href;
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.06 + 0.2 }}
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
        className="relative flex items-center gap-3 px-3 py-2 group"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 0.08 : isHovered ? 0.04 : 0,
            scale: isActive || isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl`}
        />

        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-gradient-to-b ${item.color} rounded-r-full`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        <motion.div
          style={{ scale: scaleSpring }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{
              rotateZ: isHovered ? [0, -3, 3, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
            className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isActive
                ? 'bg-white/[0.08]'
                : 'bg-white/[0.03] hover:bg-white/[0.06]'
            }`}
            style={{
              boxShadow: isActive ? `0 4px 20px rgba(${item.rgb}, 0.15)` : 'none'
            }}
          >
            <Icon className={`w-5 h-5 transition-all duration-300 ${
              isActive ? 'text-white/90' : 'text-white/50 group-hover:text-white/70'
            }`} />
          </motion.div>

          <AnimatePresence>
            {(isHovered || isActive) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.3 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl blur-lg opacity-20`}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.span
          animate={{
            color: isActive ? 'rgba(255, 255, 255, 0.9)' : isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
            x: isActive || isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="font-medium text-sm tracking-wide whitespace-nowrap"
        >
          {item.name}
        </motion.span>
      </Link>
    </motion.div>
  );
};

const CartNavItem = ({ mouseY, activePath, onHover }) => {
  const ref = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const location = useLocation();

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? val - (bounds.y + bounds.height / 2) : Infinity;
  });

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.6, 1]);
  const scaleSpring = useSpring(scale, { mass: 0.1, stiffness: 150, damping: 12 });

  const isActive = location.pathname === '/cart';

  return (
    <motion.div
      ref={ref}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="border-t border-white/[0.06] mt-4 pt-4"
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
        className="relative flex items-center gap-3 px-3 py-2 w-full text-left cursor-pointer group"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 0.04 : 0,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-slate-500 to-zinc-400 rounded-xl"
        />

        <motion.div
          style={{ scale: scaleSpring }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{
              rotateZ: isHovered ? [0, -3, 3, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
            className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.06]"
          >
            <ShoppingCart className="w-5 h-5 transition-all duration-300 text-white/50 group-hover:text-white/70" />

            <AnimatePresence>
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-[9px] font-semibold">{itemCount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.3 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-slate-500 to-zinc-400 rounded-xl blur-lg opacity-20"
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.span
          animate={{
            color: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
            x: isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="font-medium text-sm tracking-wide whitespace-nowrap"
        >
          Panier
        </motion.span>

        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-auto"
            >
              <span className="text-white/40 text-xs font-medium">
                {itemCount}
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
      <motion.nav
        initial={{ x: -240, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => {
          mouseY.set(Infinity);
          setHoveredItem(null);
        }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[240px] bg-gradient-to-b from-black via-black/98 to-black backdrop-blur-2xl border-r border-white/[0.03] flex-col z-50 overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{
              opacity: hoveredItem ? 0.06 : 0.03,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
            style={{
              background: hoveredItem
                ? `radial-gradient(circle at 50% 50%, rgba(${hoveredItem.rgb}, 0.12), transparent)`
                : 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02), transparent)'
            }}
          />

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white/10 rounded-full"
              style={{
                left: `${30 + i * 20}%`,
                top: `${15 + i * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2.5 + i,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        <div className="relative px-5 py-6">
          <Link to="/" className="block">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.01 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 blur-xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.img
                src="https://res.cloudinary.com/diqco2njt/image/upload/v1750536822/0afc7668-eadb-4d3e-a56c-b66bc5e92653_xh1ie5.png"
                alt="Le 40"
                className="relative w-full max-w-[160px] h-auto mx-auto"
                style={{
                  filter: 'drop-shadow(0 2px 12px rgba(255, 255, 255, 0.08))'
                }}
                whileHover={{
                  filter: 'drop-shadow(0 4px 20px rgba(255, 255, 255, 0.15))'
                }}
              />
            </motion.div>
          </Link>
        </div>

        <div className="flex-1 px-2 overflow-y-auto scrollbar-hide">
          <nav className="space-y-1.5">
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
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Link
              to="/reservation"
              className="relative block overflow-hidden rounded-xl bg-gradient-to-r from-white/[0.08] to-white/[0.04] p-px group"
            >
              <div className="relative bg-black/60 rounded-xl overflow-hidden backdrop-blur-sm">
                <motion.div
                  animate={{
                    x: [-200, 200],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />

                <div className="relative flex items-center justify-center gap-2 px-4 py-3">
                  <Calendar className="w-4 h-4 text-white/70" />
                  <span className="text-white/80 font-medium text-sm">Réserver</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="px-5 pb-4">
          <p className="text-white/15 text-[10px] text-center tracking-wider">
            © 2024 Le 40
          </p>
        </div>
      </motion.nav>

      <div className="hidden lg:block w-[240px]" />
    </>
  );
}
