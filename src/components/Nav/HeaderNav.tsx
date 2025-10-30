import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isAtTop
            ? 'bg-black/40 backdrop-blur-md'
            : 'bg-black/80 backdrop-blur-xl shadow-2xl'
        }`}
      >
        <div className="absolute inset-0 border-b border-white/5" />

        <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isAtTop ? 'py-6' : 'py-4'
          }`}>

            <div
              onClick={() => handleNavigation('/')}
              className="cursor-pointer z-50"
            >
              <motion.img
                src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                alt="Le 40"
                className={`brightness-0 invert transition-all duration-500 ${
                  isAtTop ? 'h-12' : 'h-10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <motion.div
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="relative px-4 py-2 cursor-pointer group"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                      />
                    )}

                    <span
                      className={`relative text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-white/60 group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 z-50">
              <motion.button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />

                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-[10px] font-bold">
                        {itemCount}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('/reservation')}
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Réserver
              </motion.button>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
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
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black/95 backdrop-blur-2xl border-l border-white/10 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <img
                    src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                    alt="Le 40"
                    className="h-10 brightness-0 invert"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white/60 hover:text-white transition-colors"
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
                        className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-base font-medium">
                          {item.name}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full" />
                        )}
                      </motion.div>
                    );
                  })}
                </nav>

                <button
                  onClick={() => handleNavigation('/reservation')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base font-semibold rounded-lg shadow-lg"
                >
                  Réserver une visite
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
