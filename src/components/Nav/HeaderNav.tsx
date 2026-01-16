import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, ChevronDown, ArrowRight, Search, Mail, X,
  Building2, Users, GitCompare,
  Star, Briefcase, CreditCard, HelpCircle,
  LayoutGrid, Monitor, Calculator,
  Play, Calendar, MessageSquare,
  CalendarDays, History, Megaphone,
  Gift, Lightbulb, Wallet
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedCartButton from '../Cart/UnifiedCartButton';
import { Z_INDEX } from '../../utils/zIndex';

// Items de navigation avec sous-catégories enrichies
const navItems = [
  {
    name: 'Bureaux',
    href: '/bureaux',
    hasDropdown: true,
    subcategories: [
      { name: 'Nos espaces', desc: 'Coworking & Bureaux privés', href: '/bureaux#options', icon: Building2 },
      { name: 'Équipements', desc: 'Tout inclus dans nos formules', href: '/bureaux#features', icon: Monitor },
      { name: 'Comparer', desc: 'Trouvez votre solution idéale', href: '/bureaux#comparison', icon: GitCompare },
    ]
  },
  {
    name: 'Domiciliation',
    href: '/domiciliation',
    hasDropdown: true,
    subcategories: [
      { name: 'Avantages', desc: 'Pourquoi nous choisir', href: '/domiciliation#benefits', icon: Star },
      { name: 'Services', desc: 'Courrier, téléphone & plus', href: '/domiciliation#services', icon: Briefcase },
      { name: 'Tarifs', desc: 'À partir de 39€/mois', href: '/domiciliation#pricing', icon: CreditCard },
      { name: 'FAQ', desc: 'Questions fréquentes', href: '/domiciliation#faq', icon: HelpCircle },
    ]
  },
  {
    name: 'Salles',
    href: '/salles',
    hasDropdown: true,
    subcategories: [
      { name: 'Nos salles', desc: 'De 4 à 50 personnes', href: '/salles#spaces', icon: LayoutGrid },
      { name: 'Équipements', desc: 'Écran 4K, visio & plus', href: '/salles#equipment', icon: Monitor },
      { name: 'Simulateur', desc: 'Calculez votre tarif', href: '/salles#pricing', icon: Calculator },
    ]
  },
  {
    name: 'Studios',
    href: '/studios',
    hasDropdown: true,
    subcategories: [
      { name: 'Découvrir', desc: 'Visite virtuelle', href: '/studios#showcase', icon: Play },
      { name: 'Réserver', desc: 'En 4 étapes simples', href: '/studios#booking-flow', icon: Calendar },
      { name: 'FAQ', desc: 'Tout savoir', href: '/studios#faq', icon: MessageSquare },
    ]
  },
  {
    name: 'Events',
    href: '/events',
    hasDropdown: true,
    subcategories: [
      { name: 'À venir', desc: 'Prochains événements', href: '/events#upcoming-events', icon: CalendarDays },
      { name: 'Passés', desc: 'Retour en images', href: '/events#past-events', icon: History },
      { name: 'Organiser', desc: 'Votre événement chez nous', href: '/events#organize', icon: Megaphone },
    ]
  },
  {
    name: 'Le Club',
    href: '/club',
    hasDropdown: true,
    subcategories: [
      { name: 'Avantages', desc: 'Bénéfices exclusifs', href: '/club#benefits', icon: Gift },
      { name: 'Ateliers', desc: 'Workshops mensuels', href: '/club#workshops', icon: Lightbulb },
      { name: 'Tarifs', desc: 'À partir de 50€/mois', href: '/club#pricing', icon: Wallet },
    ]
  },
];

// Couleurs par page
const pageColors: Record<string, {
  accent: string;
  accentLight: string;
  border: string;
  borderHover: string;
  glow: string;
  gradient: string;
  activeBg: string;
  activeBorder: string;
  glowColor: string;
  dropdownAccent: string;
  hex: string;
}> = {
  '/': {
    accent: 'text-amber-400',
    accentLight: 'text-amber-300',
    border: 'border-amber-500/40',
    borderHover: 'hover:border-amber-400/60',
    glow: 'shadow-amber-500/25',
    gradient: 'via-amber-500/50',
    activeBg: 'bg-amber-500/20',
    activeBorder: 'border-amber-400/70',
    glowColor: 'bg-amber-500/30',
    dropdownAccent: 'text-amber-400',
    hex: '#f59e0b',
  },
  '/bureaux': {
    accent: 'text-blue-400',
    accentLight: 'text-blue-300',
    border: 'border-blue-500/40',
    borderHover: 'hover:border-blue-400/60',
    glow: 'shadow-blue-500/25',
    gradient: 'via-blue-500/50',
    activeBg: 'bg-blue-500/20',
    activeBorder: 'border-blue-400/70',
    glowColor: 'bg-blue-500/30',
    dropdownAccent: 'text-blue-400',
    hex: '#3b82f6',
  },
  '/domiciliation': {
    accent: 'text-orange-400',
    accentLight: 'text-orange-300',
    border: 'border-orange-500/40',
    borderHover: 'hover:border-orange-400/60',
    glow: 'shadow-orange-500/25',
    gradient: 'via-orange-500/50',
    activeBg: 'bg-orange-500/20',
    activeBorder: 'border-orange-400/70',
    glowColor: 'bg-orange-500/30',
    dropdownAccent: 'text-orange-400',
    hex: '#f97316',
  },
  '/salles': {
    accent: 'text-emerald-400',
    accentLight: 'text-emerald-300',
    border: 'border-emerald-500/40',
    borderHover: 'hover:border-emerald-400/60',
    glow: 'shadow-emerald-500/25',
    gradient: 'via-emerald-500/50',
    activeBg: 'bg-emerald-500/20',
    activeBorder: 'border-emerald-400/70',
    glowColor: 'bg-emerald-500/30',
    dropdownAccent: 'text-emerald-400',
    hex: '#10b981',
  },
  '/studios': {
    accent: 'text-teal-400',
    accentLight: 'text-teal-300',
    border: 'border-teal-500/40',
    borderHover: 'hover:border-teal-400/60',
    glow: 'shadow-teal-500/25',
    gradient: 'via-teal-500/50',
    activeBg: 'bg-teal-500/20',
    activeBorder: 'border-teal-400/70',
    glowColor: 'bg-teal-500/30',
    dropdownAccent: 'text-teal-400',
    hex: '#14b8a6',
  },
  '/events': {
    accent: 'text-cyan-400',
    accentLight: 'text-cyan-300',
    border: 'border-cyan-500/40',
    borderHover: 'hover:border-cyan-400/60',
    glow: 'shadow-cyan-500/25',
    gradient: 'via-cyan-500/50',
    activeBg: 'bg-cyan-500/20',
    activeBorder: 'border-cyan-400/70',
    glowColor: 'bg-cyan-500/30',
    dropdownAccent: 'text-cyan-400',
    hex: '#06b6d4',
  },
  '/club': {
    accent: 'text-rose-400',
    accentLight: 'text-rose-300',
    border: 'border-rose-500/40',
    borderHover: 'hover:border-rose-400/60',
    glow: 'shadow-rose-500/25',
    gradient: 'via-rose-500/50',
    activeBg: 'bg-rose-500/20',
    activeBorder: 'border-rose-400/70',
    glowColor: 'bg-rose-500/30',
    dropdownAccent: 'text-rose-400',
    hex: '#f43f5e',
  },
  '/contact': {
    accent: 'text-violet-400',
    accentLight: 'text-violet-300',
    border: 'border-violet-500/40',
    borderHover: 'hover:border-violet-400/60',
    glow: 'shadow-violet-500/25',
    gradient: 'via-violet-500/50',
    activeBg: 'bg-violet-500/20',
    activeBorder: 'border-violet-400/70',
    glowColor: 'bg-violet-500/30',
    dropdownAccent: 'text-violet-400',
    hex: '#8b5cf6',
  },
};

const getPageColors = (pathname: string) => {
  return pageColors[pathname] || pageColors['/'];
};

export default function HeaderNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const colors = getPageColors(location.pathname);

  const handleNavigation = (href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (path === location.pathname || path === '') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(path);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
    setActiveDropdown(null);
  };

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY < 50) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setActiveDropdown(null);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(inactivityTimeout);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        animate={{
          y: isVisible ? 0 : -140,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="hidden md:block fixed top-0 left-0 right-0"
        style={{ zIndex: Z_INDEX.headerNav }}
      >
        {/* Background */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0a0f]/98 backdrop-blur-2xl' : 'bg-[#0a0a0f]/95 backdrop-blur-xl'
        }`} />

        {/* ========================================
            ÉTAGE 1 : Logo + Recherche + CTAs
        ======================================== */}
        <div className="relative border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 h-[56px] flex items-center justify-between">

            {/* Logo */}
            <div
              onClick={() => handleNavigation('/')}
              className="group cursor-pointer flex items-center gap-3"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/')}
              aria-label="Accueil - Le 40"
            >
              <div className={`relative w-10 h-10 rounded-xl bg-white/[0.06] border transition-all duration-500 flex items-center justify-center overflow-hidden ${
                location.pathname === '/'
                  ? 'border-amber-400/50 bg-amber-500/10'
                  : 'border-white/[0.1] group-hover:border-white/20'
              }`}>
                <img
                  src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                  alt="Le 40"
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>
              <span className="text-white font-bold text-lg tracking-tight hidden lg:block">
                Le 40
              </span>
            </div>

            {/* Barre de recherche */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Rechercher un espace, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  className="w-full h-10 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-3 h-3 text-white/40" />
                  </button>
                )}
              </div>
            </div>

            {/* CTAs droite */}
            <div className="flex items-center gap-3">
              {/* Newsletter CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl font-semibold text-sm text-black transition-all shadow-lg shadow-amber-500/25"
              >
                <Mail className="w-4 h-4" />
                <span>Newsletter</span>
              </motion.button>

              {/* Réserver une visite CTA */}
              <motion.button
                onClick={() => navigate('/reserver-visite')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${colors.hex}, ${colors.hex}dd)`,
                  boxShadow: `0 4px 20px ${colors.hex}40`
                }}
              >
                <Eye className="w-4 h-4" />
                <span>Réserver une visite</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ========================================
            ÉTAGE 2 : Navigation principale
        ======================================== */}
        <div className="relative">
          {/* Trait gradient bas */}
          <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent ${colors.gradient} to-transparent`} />

          <div className="max-w-[1400px] mx-auto px-6 h-[52px]">
            <nav className="h-full flex items-center justify-center gap-1" aria-label="Navigation principale">

              {/* Items de navigation */}
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const itemColors = getPageColors(item.href);
                const isDropdownOpen = activeDropdown === item.name;

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`group relative h-9 px-4 rounded-lg border transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        isActive
                          ? `${itemColors.activeBg} ${itemColors.activeBorder}`
                          : `bg-transparent border-transparent hover:bg-white/[0.04] hover:border-white/[0.08]`
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup={item.hasDropdown ? 'true' : undefined}
                    >
                      <span className={`text-[12px] font-semibold tracking-wide transition-colors duration-300 ${
                        isActive ? itemColors.accent : 'text-white/80 group-hover:text-white'
                      }`}>
                        {item.name}
                      </span>
                      {item.hasDropdown && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        } ${isActive ? itemColors.accent : 'text-white/50 group-hover:text-white/70'}`} />
                      )}
                    </button>

                    {/* Dropdown Premium */}
                    <AnimatePresence>
                      {item.hasDropdown && isDropdownOpen && item.subcategories && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
                        >
                          <div className="relative">
                            {/* Outer glow */}
                            <motion.div
                              className="absolute -inset-3 rounded-3xl blur-2xl opacity-60"
                              style={{
                                background: `linear-gradient(135deg, ${
                                  item.href === '/bureaux' ? 'rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.3)' :
                                  item.href === '/domiciliation' ? 'rgba(249, 115, 22, 0.4), rgba(234, 88, 12, 0.3)' :
                                  item.href === '/salles' ? 'rgba(16, 185, 129, 0.4), rgba(20, 184, 166, 0.3)' :
                                  item.href === '/studios' ? 'rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.3)' :
                                  item.href === '/events' ? 'rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.3)' :
                                  'rgba(244, 63, 94, 0.4), rgba(236, 72, 153, 0.3)'
                                })`
                              }}
                              animate={{ opacity: [0.4, 0.6, 0.4] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Main container */}
                            <div className="relative bg-[#0c0c12] rounded-2xl border border-white/[0.12] shadow-2xl shadow-black/80 overflow-hidden min-w-[280px]">
                              {/* Top gradient bar */}
                              <div
                                className="absolute top-0 inset-x-0 h-[2px]"
                                style={{
                                  background: `linear-gradient(90deg, transparent, ${
                                    item.href === '/bureaux' ? '#3b82f6' :
                                    item.href === '/domiciliation' ? '#f97316' :
                                    item.href === '/salles' ? '#10b981' :
                                    item.href === '/studios' ? '#14b8a6' :
                                    item.href === '/events' ? '#06b6d4' :
                                    '#f43f5e'
                                  }, transparent)`
                                }}
                              />

                              {/* Inner gradient overlay */}
                              <div
                                className="absolute inset-0 opacity-[0.07]"
                                style={{
                                  background: `radial-gradient(ellipse at top, ${
                                    item.href === '/bureaux' ? '#3b82f6' :
                                    item.href === '/domiciliation' ? '#f97316' :
                                    item.href === '/salles' ? '#10b981' :
                                    item.href === '/studios' ? '#14b8a6' :
                                    item.href === '/events' ? '#06b6d4' :
                                    '#f43f5e'
                                  } 0%, transparent 70%)`
                                }}
                              />

                              {/* Content */}
                              <div className="relative p-3">
                                {/* Section title */}
                                <div className="px-3 pb-2 mb-2 border-b border-white/[0.06]">
                                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${itemColors.accent}`}>
                                    {item.name}
                                  </span>
                                </div>

                                {/* Links */}
                                <div className="space-y-1">
                                  {item.subcategories.map((sub, idx) => {
                                    const IconComponent = sub.icon;
                                    return (
                                      <motion.button
                                        key={sub.href}
                                        onClick={() => handleNavigation(sub.href)}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group/item w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 hover:bg-white/[0.06] relative overflow-hidden"
                                      >
                                        {/* Hover glow */}
                                        <div
                                          className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"
                                          style={{
                                            background: `linear-gradient(135deg, ${
                                              item.href === '/bureaux' ? 'rgba(59, 130, 246, 0.1)' :
                                              item.href === '/domiciliation' ? 'rgba(249, 115, 22, 0.1)' :
                                              item.href === '/salles' ? 'rgba(16, 185, 129, 0.1)' :
                                              item.href === '/studios' ? 'rgba(20, 184, 166, 0.1)' :
                                              item.href === '/events' ? 'rgba(6, 182, 212, 0.1)' :
                                              'rgba(244, 63, 94, 0.1)'
                                            }, transparent)`
                                          }}
                                        />

                                        {/* Icon container */}
                                        <div className="relative flex-shrink-0">
                                          <div
                                            className="absolute -inset-1 rounded-xl blur-lg opacity-0 group-hover/item:opacity-70 transition-all duration-500"
                                            style={{
                                              background: `linear-gradient(135deg, ${
                                                item.href === '/bureaux' ? '#3b82f6, #6366f1' :
                                                item.href === '/domiciliation' ? '#f97316, #ea580c' :
                                                item.href === '/salles' ? '#10b981, #14b8a6' :
                                                item.href === '/studios' ? '#14b8a6, #06b6d4' :
                                                item.href === '/events' ? '#06b6d4, #3b82f6' :
                                                '#f43f5e, #ec4899'
                                              })`
                                            }}
                                          />
                                          <div
                                            className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.08] group-hover/item:border-white/[0.15] transition-all duration-300"
                                            style={{
                                              background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`
                                            }}
                                          >
                                            <IconComponent className="w-5 h-5 text-white/60 group-hover/item:text-white transition-all duration-300 group-hover/item:scale-110" strokeWidth={1.5} />
                                          </div>
                                        </div>

                                        {/* Text content */}
                                        <div className="flex-1 text-left">
                                          <div className="text-[13px] font-semibold text-white/90 group-hover/item:text-white transition-colors">
                                            {sub.name}
                                          </div>
                                          <div className="text-[11px] text-white/40 group-hover/item:text-white/60 transition-colors mt-0.5">
                                            {sub.desc}
                                          </div>
                                        </div>

                                        {/* Arrow */}
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover/item:text-white/60 group-hover/item:translate-x-1 transition-all duration-300" />
                                      </motion.button>
                                    );
                                  })}
                                </div>

                                {/* Footer CTA */}
                                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                                  <button
                                    onClick={() => handleNavigation(item.href)}
                                    className="group/cta w-full relative overflow-hidden rounded-xl transition-all duration-300"
                                  >
                                    <div
                                      className="absolute inset-0 opacity-80 group-hover/cta:opacity-100 transition-opacity"
                                      style={{
                                        background: `linear-gradient(135deg, ${
                                          item.href === '/bureaux' ? 'rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.15)' :
                                          item.href === '/domiciliation' ? 'rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.15)' :
                                          item.href === '/salles' ? 'rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.15)' :
                                          item.href === '/studios' ? 'rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.15)' :
                                          item.href === '/events' ? 'rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.15)' :
                                          'rgba(244, 63, 94, 0.2), rgba(236, 72, 153, 0.15)'
                                        })`
                                      }}
                                    />
                                    <div
                                      className="absolute inset-0 border rounded-xl"
                                      style={{
                                        borderColor: item.href === '/bureaux' ? 'rgba(59, 130, 246, 0.3)' :
                                          item.href === '/domiciliation' ? 'rgba(249, 115, 22, 0.3)' :
                                          item.href === '/salles' ? 'rgba(16, 185, 129, 0.3)' :
                                          item.href === '/studios' ? 'rgba(20, 184, 166, 0.3)' :
                                          item.href === '/events' ? 'rgba(6, 182, 212, 0.3)' :
                                          'rgba(244, 63, 94, 0.3)'
                                      }}
                                    />
                                    <div className="relative flex items-center justify-center gap-2 px-4 py-2.5">
                                      <span className={`text-[12px] font-bold ${itemColors.accent}`}>
                                        Découvrir {item.name}
                                      </span>
                                      <ArrowRight className={`w-4 h-4 ${itemColors.accent} group-hover/cta:translate-x-1 transition-transform`} />
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Séparateur */}
              <div className="w-px h-6 bg-white/10 mx-3" />

              {/* Contact */}
              <button
                onClick={() => handleNavigation('/contact')}
                className={`h-9 px-4 rounded-lg transition-all duration-300 flex items-center ${
                  location.pathname === '/contact'
                    ? 'bg-violet-500/20 border border-violet-400/50 text-violet-400'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-[12px] font-semibold tracking-wide">Contact</span>
              </button>

              {/* Panier */}
              <UnifiedCartButton pathname={location.pathname} />
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Overlay pour fermer les dropdowns */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 hidden md:block"
            style={{ zIndex: Z_INDEX.headerNav - 1 }}
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
