import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, X, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface BottomBarProps {
  variant: 'salles' | 'bureaux' | 'domiciliation';
  title: string;
  subtitle: string;
  features: Array<{ text: string; highlight?: boolean; pulse?: boolean }>;
  ctaText: string;
  ctaHref: string;
  phoneNumber?: string;
  icon: React.ReactNode;
  scrollThreshold?: number;
}

const variantStyles = {
  salles: {
    gradient: 'from-cyan-500 to-blue-500',
    gradientHover: 'from-cyan-600 to-blue-600',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    glowColor: 'shadow-cyan-500/30',
    pulseColor: 'bg-cyan-400',
    barGradient: 'from-cyan-500 via-blue-500 to-cyan-500',
  },
  bureaux: {
    gradient: 'from-emerald-600 to-teal-600',
    gradientHover: 'from-emerald-700 to-teal-700',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    glowColor: 'shadow-emerald-500/30',
    pulseColor: 'bg-emerald-400',
    barGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
  },
  domiciliation: {
    gradient: 'from-orange-500 to-amber-500',
    gradientHover: 'from-orange-600 to-amber-600',
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    glowColor: 'shadow-orange-500/30',
    pulseColor: 'bg-orange-400',
    barGradient: 'from-orange-500 via-amber-500 to-orange-500',
  },
};

export default function BottomBar({
  variant,
  title,
  subtitle,
  features,
  ctaText,
  ctaHref,
  phoneNumber,
  icon,
  scrollThreshold = 0.8,
}: BottomBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  const styles = variantStyles[variant];
  const storageKey = `bottomBar_${variant}_dismissed`;

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    const savedExpanded = localStorage.getItem(`bottomBar_${variant}_expanded`);
    if (savedExpanded !== null) {
      setIsExpanded(savedExpanded === 'true');
    }

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const heroHeight = window.innerHeight * scrollThreshold;
        setIsVisible(window.scrollY > heroHeight);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [scrollThreshold, storageKey, variant]);

  const handleToggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    localStorage.setItem(`bottomBar_${variant}_expanded`, String(newExpanded));
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(storageKey, 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{ willChange: 'transform' }}
        >
          <div className="relative backdrop-blur-xl bg-black/95 border-t border-white/10 shadow-2xl shadow-black/50">
            <motion.div
              className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${styles.barGradient}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ transformOrigin: "left" }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className={`flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 ${
                isExpanded ? 'py-3 sm:py-4' : 'py-2 sm:py-3'
              }`}>

                {/* Section Gauche - Identité */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${styles.gradient} flex items-center justify-center flex-shrink-0 shadow-lg ${styles.glowColor}`}>
                    {icon}
                  </div>

                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hidden sm:block min-w-0"
                      >
                        <div className="text-white font-montserrat font-bold text-xs sm:text-sm truncate">
                          {title}
                        </div>
                        <div className={`${styles.accentColor} font-inter text-xs font-medium`}>
                          {subtitle}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Section Centre - Features (Desktop uniquement) */}
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="hidden lg:flex items-center gap-4 xl:gap-6"
                    >
                      <div className="flex items-center gap-3 xl:gap-4 text-xs xl:text-sm text-white/70">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {index > 0 && <div className="w-px h-4 bg-white/20"></div>}
                            {feature.pulse && (
                              <div className={`w-2 h-2 rounded-full ${styles.pulseColor} animate-pulse`}></div>
                            )}
                            {!feature.pulse && (
                              <Check className={`w-3 h-3 ${styles.accentColor}`} />
                            )}
                            <span className={feature.highlight ? `${styles.accentColor} font-semibold` : ''}>
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Section Droite - Actions */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  {/* Téléphone (optionnel, desktop uniquement) */}
                  {phoneNumber && isExpanded && (
                    <motion.a
                      href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hidden md:flex items-center gap-2 px-3 lg:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-300"
                    >
                      <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      <span className="font-inter font-medium text-xs lg:text-sm">{phoneNumber}</span>
                    </motion.a>
                  )}

                  {/* CTA Principal */}
                  <motion.a
                    href={ctaHref}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r ${styles.gradient} hover:${styles.gradientHover} text-white font-montserrat font-bold text-xs sm:text-sm rounded-xl shadow-lg ${styles.glowColor} transition-all duration-300`}
                  >
                    <span className="whitespace-nowrap">{ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </motion.a>

                  {/* Toggle Expand/Collapse */}
                  <motion.button
                    onClick={handleToggleExpanded}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:flex w-9 h-9 lg:w-10 lg:h-10 items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300"
                    aria-label={isExpanded ? "Réduire" : "Agrandir"}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 0 : 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                      ) : (
                        <ChevronUp className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                      )}
                    </motion.div>
                  </motion.button>

                  {/* Bouton Fermer */}
                  <motion.button
                    onClick={handleDismiss}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/20 rounded-xl border border-white/20 hover:border-red-500/30 transition-all duration-300 group"
                    aria-label="Fermer"
                  >
                    <X className="w-4 h-4 lg:w-5 lg:h-5 text-white/70 group-hover:text-red-400 transition-colors" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
