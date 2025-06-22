import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { Users, MapPin, Monitor, Video, Network, ArrowRight, ArrowLeft, Sparkles, Star, Zap, Circle, Hexagon, TrendingUp, Globe, Award, Wifi, Shield, ChevronRight, ChevronLeft } from 'lucide-react';

const servicesData = [
  { 
    id: 1, 
    title: "Coworking", 
    subtitle: "Espaces Collaboratifs",
    icon: Users, 
    description: "Rejoignez l'élite entrepreneuriale dans nos espaces pensés pour l'excellence", 
    features: ["Fibre 10 Gbps", "Conciergerie 7j/7", "Réseau Premium"], 
    link: "/coworking",
    metric: "2500",
    metricLabel: "m² d'innovation",
    metricPrefix: "",
    tagline: "Où les idées prennent vie",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    shadowColor: "rgba(139, 92, 246, 0.5)",
    accentIcon: Wifi,
    isNew: true
  },
  { 
    id: 2, 
    title: "Domiciliation", 
    subtitle: "Adresse Prestigieuse",
    icon: MapPin, 
    description: "Une adresse République qui positionne votre entreprise au sommet", 
    features: ["Réception Courrier", "Standard Dédié", "Salles Prioritaires"], 
    link: "/domiciliation",
    metric: "150",
    metricLabel: "entreprises",
    metricPrefix: "+",
    tagline: "Votre prestige commence ici",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    shadowColor: "rgba(245, 158, 11, 0.5)",
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
    shadowColor: "rgba(16, 185, 129, 0.5)",
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
    shadowColor: "rgba(59, 130, 246, 0.5)",
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
    metric: "1",
    metricLabel: "% Top entrepreneurs",
    metricPrefix: "",
    tagline: "L'excellence attire l'excellence",
    gradient: "from-pink-600 via-rose-600 to-red-600",
    shadowColor: "rgba(236, 72, 153, 0.5)",
    accentIcon: Globe,
    isExclusive: true
  },
];

// Composant pour l'animation du compteur
const AnimatedMetric = ({ value, prefix = "", delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value) || 0;
  
  useEffect(() => {
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
  }, [numericValue, delay]);
  
  return (
    <span className="tabular-nums">
      {prefix}{isNaN(displayValue) ? value : displayValue}
    </span>
  );
};

// Carte de service pour le carousel
const ServiceCard = ({ service, index, isActive, isVisible }) => {
  const [localHover, setLocalHover] = useState(false);
  
  // Effets de parallaxe
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [3, -3]);
  const rotateY = useTransform(mouseX, [-100, 100], [-3, 3]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setLocalHover(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3,
        scale: isVisible ? 1 : 0.95,
        filter: isVisible ? 'blur(0px)' : 'blur(4px)'
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setLocalHover(true)}
      className={`relative group ${isVisible ? 'cursor-pointer' : 'pointer-events-none'}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: isVisible ? 1.02 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 300 } }}
        className="relative h-full"
      >
        {/* Badge */}
        {(service.isNew || service.isHot || service.isExclusive) && (
          <motion.div
            className="absolute -top-3 -right-3 z-20"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`px-3 py-1 rounded-full text-xs font-bold text-white
              ${service.isNew ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                service.isHot ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
              {service.isNew ? 'NEW' : service.isHot ? 'HOT' : 'VIP'}
            </div>
          </motion.div>
        )}

        {/* Effet de lueur */}
        <motion.div
          className={`absolute -inset-[1px] bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
          style={{ filter: 'blur(20px)' }}
        />
        
        {/* Carte principale */}
        <motion.div
          className={`relative h-[450px] w-[350px] bg-black/40 backdrop-blur-xl rounded-3xl border overflow-hidden
                      ${isActive ? 'border-white/30' : 'border-white/10 group-hover:border-white/20'}`}
          style={{
            background: localHover 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
            boxShadow: `
              0 10px 40px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.1)
            `,
          }}
        >
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Effet de brillance */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
            }}
            initial={{ x: '-100%', y: '-100%' }}
            whileHover={{ x: '100%', y: '100%' }}
            transition={{ duration: 0.6 }}
          />

          <div className="relative p-8 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-10`}
                     style={{ 
                       boxShadow: localHover ? `0 8px 24px ${service.shadowColor}` : 'none',
                       transition: 'box-shadow 0.3s'
                     }}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: localHover ? 360 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <service.accentIcon className="w-6 h-6 text-white/30" />
              </motion.div>
            </div>

            {/* Titre et sous-titre */}
            <div className="mb-4">
              <h3 className="text-2xl font-montserrat font-bold text-white mb-1">
                {service.title}
              </h3>
              <p className="text-sm font-inter text-white/60">
                {service.subtitle}
              </p>
            </div>

            {/* Métrique */}
            <motion.div
              className="mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  <AnimatedMetric 
                    value={service.metric} 
                    prefix={service.metricPrefix}
                    delay={localHover ? 0 : 300}
                  />
                </span>
                <span className="text-sm font-inter text-white/50">
                  {service.metricLabel}
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <p className="text-sm font-inter text-white/70 leading-relaxed mb-6 flex-grow">
              {service.description}
            </p>

            {/* Features */}
            <div className="space-y-2 mb-6">
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={localHover ? { opacity: 1, x: 0 } : { opacity: 0.8, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: service.shadowColor }}
                    animate={localHover ? {
                      scale: [1, 1.5, 1],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                  <span className="text-sm font-inter text-white/60">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href={service.link}
              className="group/cta inline-flex items-center justify-between w-full"
              whileHover={{ x: 5 }}
            >
              <span className="font-montserrat font-semibold text-white">
                Explorer
              </span>
              <motion.div
                className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronRight className="w-5 h-5 text-white relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Bouton de navigation du carousel
const CarouselButton = ({ direction, onClick, disabled }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 ${direction === 'prev' ? '-left-20' : '-right-20'} 
                  w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                  flex items-center justify-center group transition-all duration-300
                  ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 cursor-pointer'}`}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="w-6 h-6 text-white" />
      ) : (
        <ChevronRight className="w-6 h-6 text-white" />
      )}
      
      {/* Effet de pulse */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 rounded-full border border-white/40"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

// Indicateurs de pagination
const PaginationDots = ({ total, current, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {[...Array(total)].map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onChange(i)}
          className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
            i === current ? 'w-8 bg-white' : 'bg-white/30 hover:bg-white/50'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          {i === current && (
            <motion.div
              className="absolute inset-0 rounded-full bg-white"
              layoutId="active-dot"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

// Composant principal
export default function ServicesSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Configuration du carousel
  const cardsPerPage = 3;
  const totalPages = Math.ceil(servicesData.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const visibleCards = servicesData.slice(startIndex, startIndex + cardsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ top: `${30 + i * 20}%` }}
            animate={{
              x: [-1000, 1000],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4" />
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Écosystème Premium
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4" />
          </div>
          
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white leading-[0.9] tracking-[-0.02em]">
            Nos Services
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 mt-2">
              d'Excellence
            </span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <CarouselButton 
            direction="prev" 
            onClick={handlePrevious} 
            disabled={currentPage === 0} 
          />
          <CarouselButton 
            direction="next" 
            onClick={handleNext} 
            disabled={currentPage === totalPages - 1} 
          />

          {/* Cards Container */}
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex gap-8 justify-center items-center min-h-[500px]"
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AnimatePresence mode="popLayout">
                {servicesData.map((service, index) => {
                  const relativeIndex = index - startIndex;
                  const isVisible = relativeIndex >= 0 && relativeIndex < cardsPerPage;
                  
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: isVisible ? 0 : relativeIndex < 0 ? -100 : 100
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{
                        display: isVisible ? 'block' : 'none'
                      }}
                    >
                      <ServiceCard
                        service={service}
                        index={index}
                        isActive={hoveredId === service.id}
                        isVisible={isVisible}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Pagination */}
          <PaginationDots 
            total={totalPages} 
            current={currentPage} 
            onChange={setCurrentPage} 
          />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.a
            href="/contact"
            className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-montserrat font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Découvrir notre écosystème complet</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </motion.section>
  );
}