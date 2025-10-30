import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Bureaux', href: '/bureaux' },
  { name: 'Domiciliation', href: '/domiciliation' },
  { name: 'Salles', href: '/salles' },
  { name: 'Studios', href: '/studios' },
  { name: 'Club', href: '/club' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
];

export default function HeaderNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, setIsOpen } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => navigate(href), 300);
  };

  return (
    <>
      <motion.header
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isAtTop
            ? 'bg-black/20'
            : 'bg-gradient-to-b from-zinc-900/95 via-zinc-900/90 to-zinc-900/80'
        }`}
        style={{
          backdropFilter: isAtTop ? 'blur(8px)' : 'blur(24px)',
        }}
      >
        <div className="absolute inset-0 border-b border-white/[0.06]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/[0.02] to-transparent" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative">
          <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className={`flex items-center justify-between transition-all duration-700 ${
              isAtTop ? 'py-7' : 'py-5'
            }`}>

              <div
                onClick={() => handleNavigation('/')}
                className="cursor-pointer group relative z-50"
              >
                <motion.div
                  className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
                  }}
                />

                <motion.img
                  src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                  alt="Le 40"
                  className={`relative brightness-0 invert transition-all duration-700 ${
                    isAtTop ? 'h-14' : 'h-12'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>

              <nav className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;

                  return (
                    <motion.div
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className="relative px-5 py-3 cursor-pointer group"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isActive && (
                        <>
                          <motion.div
                            layoutId="activeBackground"
                            className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.04] rounded-xl border border-white/[0.08]"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30
                            }}
                          />

                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-orange-500/10 rounded-xl blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7 }}
                          />
                        </>
                      )}

                      <div
                        className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                          isActive
                            ? 'opacity-0'
                            : 'opacity-0 group-hover:opacity-100 bg-white/[0.04] border border-white/[0.04]'
                        }`}
                      />

                      <span
                        className={`relative text-[13px] font-semibold tracking-wide transition-all duration-500 ${
                          isActive
                            ? 'text-white'
                            : 'text-white/50 group-hover:text-white/90'
                        }`}
                      >
                        {item.name}
                      </span>

                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30
                          }}
                          style={{
                            boxShadow: '0 0 12px rgba(249, 115, 22, 0.6)',
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              <div className="flex items-center gap-4 z-50">
                <motion.button
                  onClick={() => setIsOpen(true)}
                  className="relative group p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/5 transition-all duration-500" />

                  <ShoppingCart className="relative w-5 h-5" />

                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1.5 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-full flex items-center justify-center border-2 border-zinc-900"
                        style={{
                          boxShadow: '0 0 16px rgba(249, 115, 22, 0.6)',
                        }}
                      >
                        <span className="text-white text-[10px] font-black">
                          {itemCount}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/reservation')}
                  className="hidden sm:flex relative group items-center gap-2 px-7 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[13px] font-bold rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    boxShadow: '0 8px 32px rgba(249, 115, 22, 0.25)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%', skewX: -15 }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 blur-xl bg-orange-500/40" />
                  </div>

                  <span className="relative tracking-wide">Réserver</span>
                </motion.button>

                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden relative p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-700 ${
          isAtTop ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-b from-zinc-900/98 via-zinc-900/95 to-zinc-950/98 backdrop-blur-3xl border-l border-white/[0.08] z-50 lg:hidden overflow-y-auto"
              style={{
                boxShadow: '-20px 0 80px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] via-transparent to-amber-500/[0.02]" />

              <div className="relative p-8 space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <img
                    src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                    alt="Le 40"
                    className="h-11 brightness-0 invert"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.href;

                    return (
                      <motion.div
                        key={item.name}
                        onClick={() => handleNavigation(item.href)}
                        className={`relative group flex items-center justify-between px-5 py-4 rounded-xl cursor-pointer overflow-hidden transition-all duration-500 ${
                          isActive
                            ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.04] border border-white/[0.08]'
                            : 'border border-transparent hover:border-white/[0.04] hover:bg-white/[0.04]'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent rounded-xl" />
                        )}

                        <span
                          className={`relative text-base font-semibold transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`}
                        >
                          {item.name}
                        </span>

                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full"
                            style={{
                              boxShadow: '0 0 8px rgba(249, 115, 22, 0.8)',
                            }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.button
                  onClick={() => handleNavigation('/reservation')}
                  className="w-full relative group px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base font-bold rounded-xl overflow-hidden"
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow: '0 12px 40px rgba(249, 115, 22, 0.3)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-active:opacity-100 transition-opacity duration-300" />

                  <span className="relative">Réserver une visite</span>
                </motion.button>

                <div className="pt-6 border-t border-white/[0.08]">
                  <p className="text-xs text-white/40 text-center">
                    Le 40 Coworking © 2025
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
