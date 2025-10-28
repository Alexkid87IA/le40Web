import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, Monitor, Video, Camera, Network, X, Sparkles, ArrowRight, TrendingUp, Star } from 'lucide-react';

interface PrerollOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
  targetSection: string;
  badge?: string;
  popular?: boolean;
}

const prerollOptions: PrerollOption[] = [
  {
    id: 'domiciliation',
    title: 'Domiciliation',
    subtitle: 'Adresse professionnelle prestigieuse',
    icon: MapPin,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    targetSection: 'domiciliation',
    badge: 'Dès 59€/mois',
    popular: true
  },
  {
    id: 'bureau',
    title: 'Bureau Privé',
    subtitle: 'Espace dédié pour votre équipe',
    icon: Monitor,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    targetSection: 'bureaux',
    badge: 'Flexible'
  },
  {
    id: 'coworking',
    title: 'Coworking',
    subtitle: 'Travaillez dans un espace inspirant',
    icon: Users,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    targetSection: 'coworking',
    badge: 'Communauté'
  },
  {
    id: 'studio-pro',
    title: 'Studio Professionnel',
    subtitle: 'Photo & vidéo haut de gamme',
    icon: Video,
    gradient: 'from-slate-600 via-gray-600 to-zinc-600',
    glowColor: 'rgba(100, 116, 139, 0.5)',
    targetSection: 'studios-pro',
    badge: 'Premium'
  },
  {
    id: 'studio-content',
    title: 'Studio Création',
    subtitle: 'Parfait pour vos contenus web',
    icon: Camera,
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    targetSection: 'studios-content',
    badge: 'Équipé'
  },
  {
    id: 'community',
    title: 'Communauté',
    subtitle: 'Réseau d\'entrepreneurs actifs',
    icon: Network,
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    glowColor: 'rgba(72, 187, 120, 0.5)',
    targetSection: 'community',
    badge: 'Events'
  }
];

interface PrerollProps {
  onSelect: (sectionId: string) => void;
  onSkip: () => void;
}

export default function Preroll({ onSelect, onSkip }: PrerollProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (sectionId: string) => {
    setIsVisible(false);
    setTimeout(() => onSelect(sectionId), 500);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => onSkip(), 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              x: mousePosition.x,
              y: mousePosition.y
            }}
            transition={{ type: "spring", stiffness: 40, damping: 25 }}
          >
            <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full blur-[130px]"></div>
            <div className="absolute bottom-[15%] right-[20%] w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-[150px]"></div>
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-[180px]"></div>
          </motion.div>

          <div className="absolute inset-0">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-y-auto scrollbar-hide">
            <motion.button
              onClick={handleSkip}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 z-50 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-10 sm:mb-14 max-w-4xl"
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                className="inline-flex items-center gap-2 mb-6 sm:mb-8"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative bg-slate-900/80 border border-white/20 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 backdrop-blur-xl">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-white/90 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                        Bienvenue au 40
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-black text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                De quoi avez-vous besoin?
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Sélectionnez le service qui correspond à vos ambitions
              </motion.p>
            </motion.div>

            <div className="w-full max-w-7xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {prerollOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ scale: 1.03, y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(option.targetSection)}
                    onHoverStart={() => setHoveredCard(option.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="group relative"
                  >
                    <motion.div
                      className="absolute -inset-[2px] rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${option.glowColor}, transparent)`,
                        filter: 'blur(20px)'
                      }}
                    />

                    <div className="relative h-full min-h-[220px] sm:min-h-[240px] bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-[18px] p-6 sm:p-7 overflow-hidden group-hover:border-white/30 transition-all duration-500">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
                      ></div>

                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
                        }}
                      />

                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {option.popular && (
                        <motion.div
                          initial={{ scale: 0, rotate: -12 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.6 + index * 0.08, type: "spring" }}
                          className="absolute top-4 right-4 flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm rounded-full px-3 py-1"
                        >
                          <TrendingUp className="w-3 h-3 text-amber-400" />
                          <span className="text-xs font-semibold text-amber-300">Populaire</span>
                        </motion.div>
                      )}

                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <motion.div
                            animate={{
                              rotate: hoveredCard === option.id ? [0, -5, 5, 0] : 0,
                              scale: hoveredCard === option.id ? 1.05 : 1
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative"
                          >
                            <div
                              className="absolute -inset-3 rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 blur-xl"
                              style={{ background: `linear-gradient(135deg, ${option.glowColor}, transparent)` }}
                            />
                            <div
                              className={`relative p-4 bg-gradient-to-br ${option.gradient} rounded-2xl shadow-2xl`}
                              style={{
                                boxShadow: hoveredCard === option.id ? `0 10px 40px ${option.glowColor}` : 'none'
                              }}
                            >
                              <option.icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={2} />
                            </div>
                          </motion.div>

                          <div className="space-y-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
                              {option.title}
                            </h3>
                            <p className="text-sm text-white/50 font-light leading-relaxed">
                              {option.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
                          {option.badge && (
                            <span className="text-xs font-semibold text-white/40 group-hover:text-white/60 transition-colors">
                              {option.badge}
                            </span>
                          )}
                          <motion.div
                            initial={{ x: -5, opacity: 0 }}
                            animate={{ x: hoveredCard === option.id ? 0 : -5, opacity: hoveredCard === option.id ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-auto"
                          >
                            <ArrowRight className="w-5 h-5 text-white/60" strokeWidth={2} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-10 sm:mt-14 flex flex-col items-center gap-4"
            >
              <motion.button
                onClick={handleSkip}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-3 overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300"></div>
                <div className="relative flex items-center gap-2.5">
                  <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">
                    Découvrir tous nos services
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.button>

              <p className="text-xs text-white/30 font-light">
                ou appuyez sur ESC
              </p>
            </motion.div>
          </div>

          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none">
            <svg width="100%" height="100%">
              <filter id="noiseFilterPreroll">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="15" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilterPreroll)" />
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
