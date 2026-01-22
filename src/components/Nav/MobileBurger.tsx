import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Building2, MapPin, Presentation, Video, Users, Phone, Calendar, Star, ShoppingCart, Search, ArrowRight, Eye } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Bureaux', href: '/bureaux', icon: Building2 },
  { name: 'Domiciliation', href: '/domiciliation', icon: MapPin },
  { name: 'Salles', href: '/salles', icon: Presentation },
  { name: 'Studios', href: '/studios', icon: Video },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Le Club', href: '/club', icon: Star },
  { name: 'Contact', href: '/contact', icon: Phone },
];

// Featured CTAs pour le drawer
const featuredCTAs = [
  {
    name: 'Bureaux',
    href: '/bureaux',
    icon: Building2,
    description: 'Espaces de travail',
    gradient: 'from-blue-500/30 via-indigo-500/20 to-blue-500/30',
    iconColor: 'text-blue-300',
  },
  {
    name: 'Studios',
    href: '/studios',
    icon: Video,
    description: 'Production vidéo',
    gradient: 'from-teal-500/30 via-cyan-500/20 to-teal-500/30',
    iconColor: 'text-teal-300',
  },
];

// Couleurs par page
const getPageAccentColor = (pathname: string) => {
  const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
    '/': { bg: 'from-amber-500/20 to-amber-500/20', border: 'border-amber-500/30', icon: 'text-amber-400' },
    '/bureaux': { bg: 'from-blue-500/20 to-blue-500/20', border: 'border-blue-500/30', icon: 'text-blue-400' },
    '/domiciliation': { bg: 'from-amber-500/20 to-amber-500/20', border: 'border-amber-500/30', icon: 'text-amber-400' },
    '/salles': { bg: 'from-emerald-500/20 to-emerald-500/20', border: 'border-emerald-500/30', icon: 'text-emerald-400' },
    '/studios': { bg: 'from-teal-500/20 to-teal-500/20', border: 'border-teal-500/30', icon: 'text-teal-400' },
    '/events': { bg: 'from-cyan-500/20 to-cyan-500/20', border: 'border-cyan-500/30', icon: 'text-cyan-400' },
    '/club': { bg: 'from-rose-500/20 to-rose-500/20', border: 'border-rose-500/30', icon: 'text-rose-400' },
    '/contact': { bg: 'from-blue-500/20 to-blue-500/20', border: 'border-blue-500/30', icon: 'text-blue-400' },
  };
  return colorMap[pathname] || colorMap['/'];
};

export default function MobileBurger() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, setDrawerOpen: setCartOpen } = useUnifiedCart();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(href);
      window.scrollTo(0, 0);
    }, 300);
  };

  const handleCartClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCartOpen(true);
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsOpen(false);
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const accentColors = getPageAccentColor(location.pathname);

  return (
    <>
      {/* ========== MOBILE NAVBAR ========== */}
      <nav className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-700`}>
        {/* Background avec gradient premium */}
        <div className="absolute inset-0">
          {/* Base noire */}
          <div className="absolute inset-0 bg-black" />
          {/* Gradient subtil */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            scrolled
              ? 'bg-gradient-to-r from-transparent from-35% via-amber-950/30 via-65% to-orange-950/40'
              : 'bg-gradient-to-r from-transparent from-30% via-amber-950/20 via-60% to-orange-900/30'
          }`} />
          {/* Overlay lumineux à droite */}
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-amber-500/10 to-transparent" />
        </div>

        {/* Bottom border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-orange-500/40" />

        {/* Content */}
        <div className="relative flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link to="/" className="group relative flex items-center" aria-label="Retour à l'accueil - Le 40 Coworking">
            {/* Logo container */}
            <div className="relative flex items-center justify-center w-12 h-12 bg-black/40 border border-white/30 rounded-xl overflow-hidden">
              <img
                src="/logo.png"
                alt="Le 40 Coworking"
                className="w-10 h-10 object-contain brightness-0 invert"
              />
            </div>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={handleCartClick}
              className="relative w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors hover:bg-white/20"
              aria-label={`Panier${itemCount > 0 ? ` (${itemCount} article${itemCount > 1 ? 's' : ''})` : ''}`}
            >
              <ShoppingCart className="w-5 h-5 text-white" aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative group p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex flex-col gap-[5px] w-5 h-5 justify-center items-center">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-[2.5px] bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block w-5 h-[2.5px] bg-white rounded-full"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-[2.5px] bg-white rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ========== FULL-SCREEN DRAWER ========== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
            </motion.div>

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-[70] md:hidden flex flex-col"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-black" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative flex items-center justify-between px-5 py-4 border-b border-white/10"
              >
                {/* Logo */}
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-xl blur-lg" />
                    <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/[0.1] to-white/[0.02] border border-white/20 rounded-xl shadow-xl overflow-hidden">
                      <img
                        src="/logo.png"
                        alt="Le 40"
                        className="w-10 h-10 object-contain brightness-0 invert"
                      />
                    </div>
                  </div>
                </Link>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="relative group flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:border-amber-500/30 transition-all"
                  aria-label="Fermer le menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <X className="relative w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </button>
              </motion.div>

              {/* Scrollable content */}
              <div className="relative flex-1 overflow-y-auto pb-32">
                <div className="px-5 py-6">

                  {/* Search bar */}
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    onSubmit={handleSearch}
                    className="relative mb-8"
                  >
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-amber-500/30 rounded-2xl blur-lg opacity-50" />
                      <div className="relative flex items-center bg-white/[0.05] border border-white/10 rounded-xl overflow-hidden focus-within:border-amber-500/40 transition-all">
                        <Search className="w-5 h-5 text-neutral-500 ml-4" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Rechercher..."
                          className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder-neutral-500 text-sm focus:outline-none"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="p-2 mr-2 text-neutral-500 hover:text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.form>

                  {/* Featured CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-3 mb-8"
                  >
                    {featuredCTAs.map((cta) => (
                      <Link
                        key={cta.href}
                        to={cta.href}
                        onClick={() => setIsOpen(false)}
                        className="group relative overflow-hidden rounded-2xl"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${cta.gradient}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative p-4 pt-12">
                          <cta.icon className={`w-6 h-6 ${cta.iconColor} mb-2`} strokeWidth={2} />
                          <span className="block text-base font-bold text-white">{cta.name}</span>
                          <span className="text-xs text-neutral-300">{cta.description}</span>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </Link>
                    ))}

                    {/* CTA Visite - Full width */}
                    <Link
                      to="/reserver-visite"
                      onClick={() => setIsOpen(false)}
                      className="group relative overflow-hidden rounded-2xl col-span-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-amber-500/30" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="relative p-4 flex items-center gap-4">
                        <Eye className="w-6 h-6 text-amber-300" strokeWidth={2} />
                        <div>
                          <span className="block text-base font-bold text-white">Planifier une visite</span>
                          <span className="text-xs text-neutral-300">Découvrez nos espaces</span>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>
                  </motion.div>

                  {/* Navigation */}
                  <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-2"
                  >
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4 px-1">Navigation</p>

                    {navItems.map((item, idx) => {
                      const isActive = location.pathname === item.href;
                      const Icon = item.icon;
                      const itemAccent = getPageAccentColor(item.href);

                      return (
                        <motion.button
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          onClick={() => handleNavigation(item.href)}
                          className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all ${
                            isActive
                              ? `bg-gradient-to-r ${itemAccent.bg} border ${itemAccent.border}`
                              : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-amber-500/20'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                            isActive
                              ? `bg-gradient-to-br ${itemAccent.bg} border ${itemAccent.border}`
                              : 'bg-white/[0.05] border border-white/10'
                          }`}>
                            <Icon className={`w-5 h-5 ${isActive ? itemAccent.icon : 'text-white/60'}`} />
                          </div>
                          <span className={`text-base font-semibold transition-colors ${
                            isActive ? 'text-white' : 'text-neutral-300'
                          }`}>
                            {item.name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.nav>
                </div>
              </div>

              {/* Fixed bottom contact bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-neutral-950/95 to-transparent pt-8 pb-safe"
              >
                <div className="px-5 pb-6">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 text-center">Nous contacter</p>
                  <div className="flex flex-col items-center gap-2">
                    <a href="tel:+33413252640" className="text-amber-400 font-bold text-lg hover:text-amber-300 transition-colors">
                      04 13 25 26 40
                    </a>
                    <p className="text-neutral-500 text-xs text-center">
                      40 Avenue de Saint Antoine, Marseille 13015
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
