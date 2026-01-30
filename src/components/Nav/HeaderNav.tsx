import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  Buildings, MapTrifold, PresentationChart, FilmSlate, CalendarBlank, Crown, Eye,
  Desktop, GitDiff, Briefcase, CreditCard, Question,
  SquaresFour, Calculator, PlayCircle, ChatCircle,
  CalendarCheck, ClockCounterClockwise, Megaphone, Gift, Lightbulb, Wallet,
  type IconProps
} from '@phosphor-icons/react';
import { useLocation, useNavigate } from 'react-router-dom';
import UnifiedCartButton from '../Cart/UnifiedCartButton';
import { Z_INDEX } from '../../utils/zIndex';

type PhosphorIcon = React.FC<IconProps>;

interface SubCategory {
  name: string;
  desc: string;
  href: string;
  icon: PhosphorIcon;
}

interface NavItem {
  name: string;
  href: string;
  icon: PhosphorIcon;
  label: string;
  color: string;
  glowRgb: string;
  subcategories: SubCategory[];
}

const navItems: NavItem[] = [
  {
    name: 'Bureaux',
    href: '/bureaux',
    icon: Buildings,
    label: 'Coworking & Bureaux privés',
    color: 'text-blue-400',
    glowRgb: '59, 130, 246',
    subcategories: [
      { name: 'Nos espaces', desc: 'Coworking & Bureaux privés', href: '/bureaux#options', icon: Buildings },
      { name: 'Équipements', desc: 'Tout inclus dans nos formules', href: '/bureaux#features', icon: Desktop },
      { name: 'Comparer', desc: 'Trouvez votre solution idéale', href: '/bureaux#comparison', icon: GitDiff },
    ]
  },
  {
    name: 'Domiciliation',
    href: '/domiciliation',
    icon: MapTrifold,
    label: 'Adresse professionnelle',
    color: 'text-orange-400',
    glowRgb: '251, 146, 60',
    subcategories: [
      { name: 'Avantages', desc: 'Pourquoi nous choisir', href: '/domiciliation#benefits', icon: Crown },
      { name: 'Services', desc: 'Courrier, téléphone & plus', href: '/domiciliation#services', icon: Briefcase },
      { name: 'Tarifs', desc: 'À partir de 39€/mois', href: '/domiciliation#pricing', icon: CreditCard },
      { name: 'FAQ', desc: 'Questions fréquentes', href: '/domiciliation#faq', icon: Question },
    ]
  },
  {
    name: 'Salles',
    href: '/salles',
    icon: PresentationChart,
    label: 'Réunion & Événements',
    color: 'text-emerald-400',
    glowRgb: '52, 211, 153',
    subcategories: [
      { name: 'Nos salles', desc: 'De 4 à 50 personnes', href: '/salles#spaces', icon: SquaresFour },
      { name: 'Équipements', desc: 'Écran 4K, visio & plus', href: '/salles#equipment', icon: Desktop },
      { name: 'Simulateur', desc: 'Calculez votre tarif', href: '/salles#pricing', icon: Calculator },
    ]
  },
  {
    name: 'Studios',
    href: '/studios',
    icon: FilmSlate,
    label: 'Production photo & vidéo',
    color: 'text-teal-400',
    glowRgb: '45, 212, 191',
    subcategories: [
      { name: 'Découvrir', desc: 'Visite virtuelle', href: '/studios#showcase', icon: PlayCircle },
      { name: 'Réserver', desc: 'En 4 étapes simples', href: '/studios#booking-flow', icon: CalendarBlank },
      { name: 'FAQ', desc: 'Tout savoir', href: '/studios#faq', icon: ChatCircle },
    ]
  },
  {
    name: 'Events',
    href: '/events',
    icon: CalendarBlank,
    label: 'Conférences & Meetups',
    color: 'text-cyan-400',
    glowRgb: '34, 211, 238',
    subcategories: [
      { name: 'À venir', desc: 'Prochains événements', href: '/events#upcoming-events', icon: CalendarCheck },
      { name: 'Passés', desc: 'Retour en images', href: '/events#past-events', icon: ClockCounterClockwise },
      { name: 'Organiser', desc: 'Votre événement chez nous', href: '/events#organize', icon: Megaphone },
    ]
  },
  {
    name: 'Le Club',
    href: '/club',
    icon: Crown,
    label: 'Communauté exclusive',
    color: 'text-rose-400',
    glowRgb: '251, 113, 133',
    subcategories: [
      { name: 'Avantages', desc: 'Bénéfices exclusifs', href: '/club#benefits', icon: Gift },
      { name: 'Ateliers', desc: 'Workshops mensuels', href: '/club#workshops', icon: Lightbulb },
      { name: 'Tarifs', desc: 'À partir de 50€/mois', href: '/club#pricing', icon: Wallet },
    ]
  },
];

// Page colors for the navbar pills (simplified)
const getPageBorderColor = (pathname: string): string => {
  const map: Record<string, string> = {
    '/': 'border-white/20',
    '/bureaux': 'border-blue-500/30',
    '/domiciliation': 'border-orange-500/30',
    '/salles': 'border-emerald-500/30',
    '/studios': 'border-teal-500/30',
    '/events': 'border-cyan-500/30',
    '/club': 'border-rose-500/30',
    '/contact': 'border-blue-500/30',
  };
  return map[pathname] || map['/'];
};

const getPageGradient = (pathname: string): string => {
  const map: Record<string, string> = {
    '/': 'via-white/20',
    '/bureaux': 'via-blue-500/40',
    '/domiciliation': 'via-orange-500/40',
    '/salles': 'via-emerald-500/40',
    '/studios': 'via-teal-500/40',
    '/events': 'via-cyan-500/40',
    '/club': 'via-rose-500/40',
    '/contact': 'via-blue-500/40',
  };
  return map[pathname] || map['/'];
};

export default function HeaderNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // The focused item in the mega-menu (hovered nav item in the left column)
  const [focusedItem, setFocusedItem] = useState<string | null>(null);

  const activeNavItem = useMemo(() => {
    return navItems.find(i => i.href === location.pathname) || null;
  }, [location.pathname]);

  // Ambient glow based on focused/hovered item
  const ambientGlow = useMemo(() => {
    if (focusedItem) {
      const item = navItems.find(i => i.name === focusedItem);
      if (item) return item.glowRgb;
    }
    if (hoveredItem) {
      const item = navItems.find(i => i.name === hoveredItem);
      if (item) return item.glowRgb;
    }
    return activeNavItem?.glowRgb || '255, 255, 255';
  }, [focusedItem, hoveredItem, activeNavItem]);

  const handleNavigation = (href: string) => {
    setMegaMenuOpen(false);
    setHoveredItem(null);
    setFocusedItem(null);
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (path === location.pathname || path === '') {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(path);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const openMegaMenu = (itemName: string) => {
    setHoveredItem(itemName);
    setFocusedItem(itemName);
    setMegaMenuOpen(true);
  };

  const closeMegaMenu = () => {
    setMegaMenuOpen(false);
    setHoveredItem(null);
    setFocusedItem(null);
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
        closeMegaMenu();
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => setIsVisible(true), 2000);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(inactivityTimeout);
    };
  }, [lastScrollY]);

  useEffect(() => {
    closeMegaMenu();
  }, [location.pathname]);

  const focusedNavItem = useMemo(() => {
    return navItems.find(i => i.name === focusedItem) || null;
  }, [focusedItem]);

  return (
    <>
      <motion.header
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="hidden md:block fixed top-0 left-0 right-0"
        style={{ zIndex: Z_INDEX.headerNav }}
        onMouseLeave={closeMegaMenu}
      >
        {/* Background */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-2xl' : 'bg-black/70 backdrop-blur-xl'
        }`} />

        {/* Bottom gradient line */}
        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent ${getPageGradient(location.pathname)} to-transparent transition-colors duration-500`} />

        {/* Navbar */}
        <div className="relative h-[72px] max-w-[1400px] mx-auto px-6">
          <nav className="h-full flex items-center justify-center" aria-label="Navigation principale">
            <div className="flex items-center gap-2">

              {/* Logo */}
              <div
                onClick={() => handleNavigation('/')}
                className="group cursor-pointer mr-1"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/')}
                aria-label="Accueil - Le 40"
              >
                <div className={`relative w-12 h-12 rounded-xl bg-white/[0.05] border transition-all duration-300 flex items-center justify-center overflow-hidden ${
                  location.pathname === '/'
                    ? 'border-white/30 bg-white/10'
                    : 'border-white/10 group-hover:border-white/20'
                }`}>
                  <img src="/logo.png" alt="Le 40" className="w-10 h-10 object-contain brightness-0 invert" />
                </div>
              </div>

              {/* Nav items as pills */}
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const isHovered = hoveredItem === item.name;

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => openMegaMenu(item.name)}
                  >
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`group relative h-9 laptop:h-10 px-3 laptop:px-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        isActive
                          ? `bg-white/10 border-white/20`
                          : isHovered
                            ? 'bg-white/[0.06] border-white/15'
                            : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {/* Active dot */}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgba(${item.glowRgb}, 0.9)` }} />
                      )}
                      <span className={`text-[10px] laptop:text-[11px] font-bold tracking-wider uppercase leading-none whitespace-nowrap transition-colors duration-300 ${
                        isActive ? item.color : isHovered ? 'text-white' : 'text-white/70'
                      }`}>
                        {item.name}
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* Separator */}
              <div className="w-px h-8 bg-white/10 mx-2" />

              {/* Cart */}
              <UnifiedCartButton pathname={location.pathname} />

              {/* CTA */}
              <button
                onClick={() => handleNavigation('/reserver-visite')}
                className={`group relative px-3 laptop:px-4 xl:px-5 py-2 laptop:py-2.5 rounded-xl bg-white/[0.05] border ${getPageBorderColor(location.pathname)} hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-300`}
                aria-label="Planifier une visite"
              >
                <div className="flex items-center gap-1.5 laptop:gap-2 whitespace-nowrap">
                  <Eye size={16} weight="duotone" className="text-white/60 transition-colors duration-300" />
                  <span className="text-[10px] laptop:text-[11px] xl:text-[12px] font-semibold text-white/80">
                    Planifier une visite
                  </span>
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* ===== MEGA MENU PANEL ===== */}
        <AnimatePresence>
          {megaMenuOpen && focusedNavItem && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-full inset-x-0"
              onMouseLeave={closeMegaMenu}
            >
              {/* Panel background */}
              <div className="relative bg-black border-b border-white/[0.06]">
                {/* Ambient glow — same intensity as mobile (0.12 / 0.06) */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: `radial-gradient(ellipse 80% 50% at 20% 30%, rgba(${ambientGlow}, 0.12) 0%, transparent 70%)`,
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: `radial-gradient(ellipse 60% 40% at 80% 80%, rgba(${ambientGlow}, 0.06) 0%, transparent 60%)`,
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />

                <div className="relative max-w-[1200px] mx-auto px-8 py-8">
                  <div className="flex gap-12">

                    {/* Left column: all services — same sizing as mobile */}
                    <div className="w-[360px] shrink-0 space-y-0.5">
                      {navItems.map((item, idx) => {
                        const isFocused = focusedItem === item.name;
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;
                        const num = String(idx + 1).padStart(2, '0');

                        return (
                          <motion.button
                            key={item.href}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 + idx * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
                            onMouseEnter={() => setFocusedItem(item.name)}
                            onClick={() => handleNavigation(item.href)}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                              isFocused ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]'
                            }`}
                          >
                            {/* Number — same as mobile */}
                            <span className={`text-[11px] font-mono font-medium tabular-nums transition-colors duration-300 ${
                              isFocused || isActive ? item.color : 'text-white/20'
                            }`}>
                              {num}
                            </span>

                            {/* Icon pill — same w-9 h-9 rounded-xl as mobile */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isFocused || isActive ? 'bg-white/10' : 'bg-white/[0.03]'
                            }`}>
                              <Icon size={18} weight="duotone" className={`transition-colors duration-300 ${
                                isFocused || isActive ? item.color : 'text-white/30'
                              }`} />
                            </div>

                            {/* Name + label — same text-[17px] as mobile */}
                            <div className="flex-1 text-left">
                              <div className={`text-[17px] font-montserrat font-black uppercase tracking-wide transition-colors duration-300 ${
                                isFocused ? 'text-white' : isActive ? 'text-white/90' : 'text-white/60'
                              }`}>
                                {item.name}
                              </div>
                              <div className={`text-[10px] tracking-wider uppercase transition-colors duration-300 ${
                                isFocused || isActive ? 'text-white/35' : 'text-white/15'
                              }`}>
                                {item.label}
                              </div>
                            </div>

                            {/* Active dot — same w-2 h-2 as mobile */}
                            {isActive && (
                              <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: `rgba(${item.glowRgb}, 0.8)` }} />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Vertical separator */}
                    <div className="w-px bg-white/[0.06] self-stretch" />

                    {/* Right column: subcategories of focused item */}
                    <div className="flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={focusedNavItem.name}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Section header — same as mobile colored bar */}
                          <div className="flex items-center gap-3 mb-6 px-1">
                            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: `rgba(${focusedNavItem.glowRgb}, 0.6)` }} />
                            <span className={`text-[13px] font-montserrat font-black uppercase tracking-[0.15em] ${focusedNavItem.color}`}>
                              {focusedNavItem.name}
                            </span>
                            <span className="text-[11px] text-white/25 tracking-wider uppercase">{focusedNavItem.label}</span>
                          </div>

                          {/* Subcategory items — same sizing as mobile */}
                          <div className="grid grid-cols-2 gap-2">
                            {focusedNavItem.subcategories.map((sub, idx) => {
                              const SubIcon = sub.icon;
                              return (
                                <motion.button
                                  key={sub.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.04 }}
                                  onClick={() => handleNavigation(sub.href)}
                                  className="group/sub flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover/sub:border-white/[0.12] transition-all duration-200 shrink-0">
                                    <SubIcon size={16} weight="light" className="text-white/35 group-hover/sub:text-white/70 transition-colors duration-200" />
                                  </div>
                                  <div className="flex-1 text-left min-w-0">
                                    <div className="text-[13px] font-semibold text-white/75 group-hover/sub:text-white transition-colors duration-200">{sub.name}</div>
                                    <div className="text-[10px] text-white/25 group-hover/sub:text-white/40 transition-colors duration-200 mt-0.5 truncate">{sub.desc}</div>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-white/0 group-hover/sub:text-white/40 group-hover/sub:translate-x-0.5 transition-all duration-200 shrink-0" />
                                </motion.button>
                              );
                            })}
                          </div>

                          {/* Page CTA — same bold style as mobile */}
                          <div className="mt-6 pt-4 border-t border-white/[0.05]">
                            <button
                              onClick={() => handleNavigation(focusedNavItem.href)}
                              className="group/cta flex items-center gap-2 px-1 hover:gap-3 transition-all duration-300"
                            >
                              <div className="w-1 h-4 rounded-full" style={{ backgroundColor: `rgba(${focusedNavItem.glowRgb}, 0.6)` }} />
                              <span className={`text-[13px] font-bold ${focusedNavItem.color}`}>
                                Voir la page
                              </span>
                              <ArrowRight className={`w-4 h-4 ${focusedNavItem.color} group-hover/cta:translate-x-1 transition-transform duration-300`} />
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Overlay to close mega menu */}
      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 hidden md:block"
            style={{ zIndex: Z_INDEX.headerNav - 1 }}
            onClick={closeMegaMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}
