import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ShoppingCart, ArrowRight } from 'lucide-react';
import {
  Buildings, MapTrifold, PresentationChart, FilmSlate, CalendarBlank, Crown, Eye,
  Desktop, GitDiff, Briefcase, CreditCard, Question,
  SquaresFour, Calculator, PlayCircle, ChatCircle,
  CalendarCheck, ClockCounterClockwise, Megaphone, Gift, Lightbulb, Wallet,
  type IconProps
} from '@phosphor-icons/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

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

export default function MobileBurger() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, setDrawerOpen: setCartOpen } = useUnifiedCart();

  // Ambient glow color based on expanded or active item
  const ambientGlow = useMemo(() => {
    if (expandedItem) {
      const item = navItems.find(i => i.name === expandedItem);
      if (item) return item.glowRgb;
    }
    const active = navItems.find(i => i.href === location.pathname);
    return active?.glowRgb || '255, 255, 255';
  }, [expandedItem, location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setExpandedItem(null);
  }, [location.pathname]);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
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
          }, 300);
        }
      } else {
        navigate(href);
        window.scrollTo(0, 0);
      }
    }, 250);
  };

  const handleCartClick = () => {
    setIsOpen(false);
    setTimeout(() => setCartOpen(true), 250);
  };

  const toggleExpand = (name: string) => {
    setExpandedItem(prev => prev === name ? null : name);
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className={`absolute inset-0 transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-xl' : 'bg-black/80 backdrop-blur-lg'
        }`} />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="relative flex items-center justify-between px-4 py-3">
          <Link to="/" aria-label="Accueil - Le 40">
            <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Le 40" className="w-9 h-9 object-contain brightness-0 invert" />
            </div>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCartClick}
              className="relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              aria-label={`Panier${itemCount > 0 ? ` (${itemCount})` : ''}`}
            >
              <ShoppingCart className="w-[18px] h-[18px] text-white/70" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full text-black text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-[5px] w-[18px]">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-[2px] bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block h-[2px] bg-white rounded-full"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-[2px] bg-white rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== FULL-SCREEN MENU ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] md:hidden flex flex-col bg-black"
          >
            {/* Ambient gradient glow — shifts color based on focused item */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: `radial-gradient(ellipse 80% 50% at 70% 20%, rgba(${ambientGlow}, 0.12) 0%, transparent 70%)`,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            {/* Secondary glow bottom */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: `radial-gradient(ellipse 60% 40% at 30% 90%, rgba(${ambientGlow}, 0.06) 0%, transparent 60%)`,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative flex items-center justify-between px-6 pt-4 pb-4"
            >
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="Le 40" className="w-8 h-8 object-contain brightness-0 invert" />
                </div>
                <div>
                  <div className="text-white font-montserrat font-black text-sm tracking-wider">LE 40</div>
                  <div className="text-white/30 text-[10px] font-medium tracking-widest uppercase">Coworking · Marseille</div>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:bg-white/10 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-white/60" strokeWidth={2} />
              </button>
            </motion.div>

            {/* Thin separator */}
            <div className="mx-6 h-px bg-white/[0.06]" />

            {/* Nav items */}
            <div className="relative flex-1 overflow-y-auto">
              <div className="px-2 py-4">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.href;
                  const isExpanded = expandedItem === item.name;
                  const Icon = item.icon;
                  const num = String(idx + 1).padStart(2, '0');

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + idx * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {/* Main row */}
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className="w-full group relative"
                      >
                        <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                          isExpanded ? 'bg-white/[0.04]' : 'active:bg-white/[0.03]'
                        }`}>
                          {/* Number */}
                          <span className={`text-[11px] font-mono font-medium tabular-nums transition-colors duration-300 ${
                            isActive || isExpanded ? item.color : 'text-white/20'
                          }`}>
                            {num}
                          </span>

                          {/* Icon pill */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isActive || isExpanded
                              ? 'bg-white/10'
                              : 'bg-white/[0.03]'
                          }`}>
                            <Icon size={18} weight="duotone" className={`transition-colors duration-300 ${
                              isActive || isExpanded ? item.color : 'text-white/30'
                            }`} />
                          </div>

                          {/* Name + label */}
                          <div className="flex-1 text-left">
                            <div className={`text-[17px] font-montserrat font-black uppercase tracking-wide transition-colors duration-300 ${
                              isActive ? 'text-white' : isExpanded ? 'text-white/90' : 'text-white/60'
                            }`}>
                              {item.name}
                            </div>
                            <div className={`text-[10px] tracking-wider uppercase transition-colors duration-300 ${
                              isActive || isExpanded ? 'text-white/35' : 'text-white/15'
                            }`}>
                              {item.label}
                            </div>
                          </div>

                          {/* Active dot */}
                          {isActive && (
                            <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: `rgba(${item.glowRgb}, 0.8)` }} />
                          )}

                          {/* Chevron */}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${
                              isExpanded ? item.color : 'text-white/15'
                            } ${isExpanded ? 'rotate-90' : ''}`} />
                          </motion.div>
                        </div>
                      </button>

                      {/* Subcategories panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-[72px] pr-4 pb-3 space-y-0.5">
                              {/* Page link */}
                              <button
                                onClick={() => handleNavigation(item.href)}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors active:bg-white/[0.06]"
                              >
                                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: `rgba(${item.glowRgb}, 0.6)` }} />
                                <span className={`text-[13px] font-bold ${item.color}`}>Voir la page</span>
                                <ArrowRight className={`w-3.5 h-3.5 ${item.color} ml-auto`} />
                              </button>

                              {item.subcategories.map((sub, subIdx) => {
                                const SubIcon = sub.icon;
                                return (
                                  <motion.button
                                    key={sub.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: subIdx * 0.04 }}
                                    onClick={() => handleNavigation(sub.href)}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors active:bg-white/[0.06]"
                                  >
                                    <SubIcon size={16} weight="light" className="text-white/25 shrink-0" />
                                    <div className="flex-1 text-left">
                                      <div className="text-[13px] font-semibold text-white/75">{sub.name}</div>
                                      <div className="text-[10px] text-white/25 mt-0.5">{sub.desc}</div>
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative px-6 pb-8 pt-2 space-y-3"
            >
              <div className="h-px bg-white/[0.06] mb-4" />

              {/* CTA Visite */}
              <button
                onClick={() => handleNavigation('/reserver-visite')}
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-white rounded-2xl text-black active:scale-[0.98] transition-transform"
              >
                <Eye size={18} weight="bold" />
                <span className="font-montserrat font-black text-sm uppercase tracking-wider">Planifier une visite</span>
              </button>

              {/* Phone + Contact */}
              <div className="flex items-center gap-3">
                <a
                  href="tel:+33491962151"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/[0.05] border border-white/10 rounded-xl active:bg-white/[0.08] transition-colors"
                >
                  <Phone className="w-4 h-4 text-white/50" />
                  <span className="text-white/70 text-sm font-medium">04 91 96 21 51</span>
                </a>
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="py-3 px-5 bg-white/[0.05] border border-white/10 rounded-xl text-white/70 text-sm font-medium active:bg-white/[0.08] transition-colors"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
