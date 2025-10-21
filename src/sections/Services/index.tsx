import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { Users, MapPin, Monitor, Video, Network, ArrowRight, Sparkles, Wifi, Shield, Award, TrendingUp, Globe, ChevronRight } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: "Coworking",
    subtitle: "Espaces Collaboratifs",
    icon: Users,
    description: "Rejoignez l'élite entrepreneuriale dans nos espaces pensés pour l'excellence",
    features: ["Internet Très Haut Débit", "Réseaux Entrepreneurs Premium", "Services Sur Mesure"],
    link: "/coworking",
    metric: "4000",
    metricLabel: "m² d'innovation",
    metricPrefix: "",
    tagline: "Où les idées prennent vie",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    shadowColor: "#8b5cf6",
    accentIcon: Wifi,
    isNew: true
  },
  {
    id: 2,
    title: "Domiciliation",
    subtitle: "Adresse de Caractère",
    icon: MapPin,
    description: "Positionnez votre entreprise au sommet",
    features: ["Réception / Expédition Courrier", "Accès Coworking / Networking", "Events"],
    link: "/domiciliation",
    metric: "120",
    metricLabel: "entreprises",
    metricPrefix: "+",
    tagline: "Votre prestige commence ici",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    shadowColor: "#f59e0b",
    accentIcon: Shield,
    isHot: true
  },
  {
    id: 3,
    title: "Salles Premium",
    subtitle: "Réunions d'Exception",
    icon: Monitor,
    description: "Impressionnez dans nos écrins technologiques dernière génération",
    features: ["Écrans OLED 8K", "IA Transcription", "Barista Privé"],
    link: "/salles",
    metric: "5",
    metricLabel: "salles signature",
    metricPrefix: "",
    tagline: "Où les deals se concrétisent",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    shadowColor: "#10b981",
    accentIcon: Award
  },
  {
    id: 4,
    title: "Studios Créatifs",
    subtitle: "Production Pro",
    icon: Video,
    description: "Hollywood à Marseille - Créez du contenu qui captive le monde",
    features: ["Dolby Atmos", "Motion Capture", "Post-prod IA"],
    link: "/studios",
    metric: "8K",
    metricLabel: "Ultra HD",
    metricPrefix: "",
    tagline: "Votre vision, notre expertise",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    shadowColor: "#3b82f6",
    accentIcon: TrendingUp
  },
  {
    id: 5,
    title: "Cercle Privé",
    subtitle: "Réseau Exclusif",
    icon: Network,
    description: "Accédez à un réseau fermé de décideurs et visionnaires",
    features: ["Mentors Fortune 500", "Events VIP", "Deals Exclusifs"],
    link: "/experts",
    metric: "Top 1%",
    metricLabel: "entrepreneurs",
    metricPrefix: "",
    tagline: "L'excellence attire l'excellence",
    gradient: "from-pink-600 via-rose-600 to-red-600",
    shadowColor: "#ec4899",
    accentIcon: Globe,
    isExclusive: true
  },
];

const AnimatedCounter = ({ value, prefix = "", delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value) || 0;
  const hasText = isNaN(parseInt(value));

  useEffect(() => {
    if (hasText) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [numericValue, delay, hasText]);

  if (hasText) {
    return <span className="tabular-nums">{value}</span>;
  }

  return (
    <span className="tabular-nums">
      {prefix}{displayValue}
    </span>
  );
};

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const currentService = servicesData[currentIndex];

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % servicesData.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length);
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen bg-[#0A0A0A] py-32 overflow-hidden"
    >
      {/* Advanced Background Layer */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]" />

        {/* Animated nebula clouds */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <div
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
                style={{ backgroundColor: currentService.shadowColor, opacity: 0.15 }}
              />
              <div
                className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px]"
                style={{ backgroundColor: currentService.shadowColor, opacity: 0.12, animationDelay: '2s' }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/8 rounded-full blur-[200px]" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? currentService.shadowColor : i % 3 === 1 ? '#ec4899' : '#3b82f6',
                boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 0.7, 0],
                scale: [0, Math.random() * 1.5 + 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#gradient-services)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.4,
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient-services" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentService.shadowColor} />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle mesh pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative z-10 max-w-7xl mx-auto px-8"
      >
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [1, 0.85, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50" />
              <div className="relative bg-black/60 border border-white/20 rounded-full px-6 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-white/90 font-medium text-sm uppercase tracking-wider">
                    Écosystème Premium
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-montserrat font-black leading-[0.85] tracking-[-0.04em] mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-white">Nos Services</span>
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              d'Excellence
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-white/60 max-w-3xl mx-auto font-light"
          >
            Un écosystème complet pensé pour propulser votre réussite vers des sommets inédits
          </motion.p>
        </motion.div>

        {/* Main Service Display with Enhanced Card */}
        <div className="relative flex items-center justify-center min-h-[600px] mb-16">
          {/* Navigation Buttons */}
          <motion.button
            onClick={goToPrev}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="group absolute left-0 top-1/2 -translate-y-1/2 z-20"
          >
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
              style={{ backgroundColor: currentService.shadowColor }}
            />
            <div className="relative w-16 h-16 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:border-white/30 transition-all">
              <ChevronRight className="w-8 h-8 rotate-180" />
            </div>
          </motion.button>

          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="group absolute right-0 top-1/2 -translate-y-1/2 z-20"
          >
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
              style={{ backgroundColor: currentService.shadowColor }}
            />
            <div className="relative w-16 h-16 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:border-white/30 transition-all">
              <ChevronRight className="w-8 h-8" />
            </div>
          </motion.button>

          {/* Service Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300, scale: 0.8 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-2xl"
            >
              {/* Card Glow Effect */}
              <motion.div
                className={`absolute -inset-4 bg-gradient-to-r ${currentService.gradient} rounded-3xl blur-3xl`}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Badge */}
              {(currentService.isNew || currentService.isHot || currentService.isExclusive) && (
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: -12 }}
                  className="absolute -top-4 -right-4 z-20"
                >
                  <div className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                    currentService.isNew ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    currentService.isHot ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                    'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {currentService.isNew ? 'NEW' : currentService.isHot ? 'HOT' : 'VIP'}
                  </div>
                </motion.div>
              )}

              {/* Main Card */}
              <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden p-10">
                {/* Animated Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentService.gradient} opacity-5`} />

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
                  }}
                  initial={{ x: '-100%', y: '-100%' }}
                  whileHover={{ x: '100%', y: '100%' }}
                  transition={{ duration: 0.8 }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <div
                        className={`p-5 rounded-2xl bg-gradient-to-br ${currentService.gradient}`}
                        style={{
                          boxShadow: `0 10px 40px ${currentService.shadowColor}40`,
                        }}
                      >
                        <currentService.icon className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <currentService.accentIcon className="w-8 h-8 text-white/20" />
                    </motion.div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-6">
                    <h3 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-2">
                      {currentService.title}
                    </h3>
                    <p className="text-lg text-white/50 font-light">
                      {currentService.subtitle}
                    </p>
                  </div>

                  {/* Metric */}
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                        <AnimatedCounter
                          value={currentService.metric}
                          prefix={currentService.metricPrefix}
                        />
                      </span>
                      <span className="text-lg text-white/40 font-light">
                        {currentService.metricLabel}
                      </span>
                    </div>
                  </motion.div>

                  {/* Tagline */}
                  <p className="text-sm text-white/60 italic mb-6">
                    {currentService.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-base text-white/70 leading-relaxed mb-8">
                    {currentService.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {currentService.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: currentService.shadowColor }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                        <span className="text-white/60 font-light">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href={currentService.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-between w-full"
                  >
                    <div className="relative w-full">
                      <div
                        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: currentService.shadowColor }}
                      />
                      <div className={`relative bg-gradient-to-r ${currentService.gradient} rounded-2xl px-8 py-5 flex items-center justify-between`}>
                        <span className="font-montserrat font-bold text-white text-lg tracking-wide">
                          Découvrir le service
                        </span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center justify-center gap-3">
          {servicesData.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              <div className="relative h-1 rounded-full overflow-hidden bg-white/10">
                <motion.div
                  className={`h-full rounded-full ${
                    index === currentIndex
                      ? `bg-gradient-to-r ${service.gradient}`
                      : 'bg-white/30 group-hover:bg-white/50'
                  }`}
                  initial={{ width: index === currentIndex ? '48px' : '24px' }}
                  animate={{ width: index === currentIndex ? '48px' : '24px' }}
                  transition={{ duration: 0.3 }}
                />
                {index === currentIndex && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${service.gradient} blur-md`}
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black/90 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <service.icon className="w-4 h-4" style={{ color: service.shadowColor }} />
                    <span className="text-sm text-white font-medium">{service.title}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Premium film grain texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseFilterServices">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterServices)" />
        </svg>
      </div>
    </motion.section>
  );
}
