import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { Users, Monitor, Video, ArrowRight, Calendar, Play, Pause, Volume2, VolumeX, Eye, Maximize2, CheckCircle, Star, TrendingUp, Zap, Award } from 'lucide-react';

const spaceCategories = [
  {
    id: 'coworking',
    title: 'Espaces Coworking',
    subtitle: 'Bureaux flexibles et privés',
    tagline: 'Votre écosystème créatif',
    icon: Users,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    accentColor: '#06b6d4',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920',
    secondaryImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920',
    spaces: [
      {
        name: 'Open Space',
        capacity: '50 postes',
        price: 250,
        priceLabel: '€/mois',
        features: ['Bureaux flexibles', 'Écrans 4K', 'Casiers sécurisés', 'Wifi 1Gb/s'],
        highlight: 'L\'énergie collective',
        icon: Users,
        popular: true
      },
      {
        name: 'Bureaux Privés',
        capacity: '2-10 personnes',
        price: 800,
        priceLabel: '€/mois',
        features: ['Mobilier premium', 'Ligne téléphonique', 'Stockage privé', 'Personnalisable'],
        highlight: 'Votre espace dédié',
        icon: Award,
        featured: true
      },
      {
        name: 'Phone Box',
        capacity: '1 personne',
        price: 0,
        priceLabel: 'Inclus',
        features: ['Insonorisation totale', 'Éclairage optimal', 'Ventilation', 'Réservation app'],
        highlight: 'Confidentialité garantie',
        icon: Zap
      }
    ],
    stats: {
      satisfaction: '98%',
      members: '150+',
      availability: '24/7'
    },
    cta: 'Découvrir nos espaces',
    link: '/coworking'
  },
  {
    id: 'meeting',
    title: 'Salles de Réunion',
    subtitle: 'Espaces équipés tout compris',
    tagline: 'Où les idées prennent forme',
    icon: Monitor,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    accentColor: '#f59e0b',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920',
    secondaryImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920',
    spaces: [
      {
        name: 'Salle Conférence',
        capacity: '2-50 personnes',
        price: 150,
        priceLabel: '€/heure',
        features: ['Écran géant 85"', 'Système audio pro', 'Streaming HD', 'Visioconférence'],
        highlight: 'Grandes présentations',
        icon: Monitor,
        featured: true
      },
      {
        name: 'Salle Créative',
        capacity: '4-20 personnes',
        price: 80,
        priceLabel: '€/heure',
        features: ['Murs inscriptibles', 'Écrans tactiles', 'Kit créatif', 'Mobilier modulable'],
        highlight: 'Brainstorming dynamique',
        icon: Star,
        popular: true
      },
      {
        name: 'Salle Executive',
        capacity: '6-12 personnes',
        price: 120,
        priceLabel: '€/heure',
        features: ['Table ovale premium', 'Visio 4K', 'Bar privé', 'Service conciergerie'],
        highlight: 'Réunions stratégiques',
        icon: Award
      }
    ],
    stats: {
      bookings: '500+/mois',
      equipment: 'Pro-grade',
      response: '< 2h'
    },
    cta: 'Réserver une salle',
    link: '/salles'
  },
  {
    id: 'studio',
    title: 'Studios Production',
    subtitle: 'Création audiovisuelle 4K/8K',
    tagline: 'Hollywood à Marseille',
    icon: Video,
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    accentColor: '#ec4899',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920',
    secondaryImage: 'https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg?auto=compress&cs=tinysrgb&w=1920',
    spaces: [
      {
        name: 'Studio Vidéo',
        capacity: '200m² modulables',
        price: 119,
        priceLabel: '€/heure',
        features: ['Fond vert 6x4m', 'Éclairage LED pro', 'Caméras 4K', 'Régie complète'],
        highlight: 'Production pro',
        icon: Video,
        featured: true
      },
      {
        name: 'Studio Podcast',
        capacity: '4 invités',
        price: 79,
        priceLabel: '€/heure',
        features: ['Isolation acoustique', 'Micros Shure SM7B', 'Table ronde', 'Mix en direct'],
        highlight: 'Audio cristallin',
        icon: Star,
        popular: true
      },
      {
        name: 'Studio Live',
        capacity: 'Streaming HD',
        price: 199,
        priceLabel: '€/heure',
        features: ['Régie multicam', 'Streaming 4K', 'Écran LED géant', 'Direction technique'],
        highlight: 'Événements en direct',
        icon: TrendingUp
      }
    ],
    stats: {
      quality: '4K/8K',
      productions: '200+',
      tech: 'Dernière gen'
    },
    cta: 'Explorer les studios',
    link: '/studios'
  }
];

export default function Spaces() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSpace, setHoveredSpace] = useState<number | null>(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const currentCategory = spaceCategories[activeCategory];

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % spaceCategories.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      id="espaces"
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Advanced Background System */}
      <div className="absolute inset-0">
        {/* Base gradient with animated colors */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Animated gradient orbs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  backgroundColor: currentCategory.accentColor,
                  opacity: 0.1,
                  width: `${400 + i * 200}px`,
                  height: `${400 + i * 200}px`,
                }}
                animate={{
                  x: [
                    `${Math.sin(i * 2) * 20}%`,
                    `${Math.sin(i * 2 + Math.PI) * 20}%`,
                    `${Math.sin(i * 2) * 20}%`
                  ],
                  y: [
                    `${Math.cos(i * 2) * 20}%`,
                    `${Math.cos(i * 2 + Math.PI) * 20}%`,
                    `${Math.cos(i * 2) * 20}%`
                  ],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                initial={{
                  left: `${i * 30}%`,
                  top: `${i * 25}%`,
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <motion.div style={{ scale }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="text-xs font-bold text-white/40 tracking-[0.3em] uppercase">
              Acte 3 • Nos Espaces
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-white/30 to-transparent" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
          >
            <span className="text-white block">DES ESPACES QUI</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeCategory}
                initial={{ opacity: 0, y: 50, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: -90 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`block text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient}`}
                style={{ transformPerspective: 1000 }}
              >
                INSPIRENT
              </motion.span>
            </AnimatePresence>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light"
          >
            2500m² d'innovation • Design d'exception • Technologie de pointe
          </motion.p>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Immersive Visual Showcase */}
          <motion.div
            style={{ x: mouseX, y: mouseY }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Main Image Container */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  {/* Image Slideshow */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeCategory}-${imageIndex}`}
                      src={imageIndex === 0 ? currentCategory.image : currentCategory.secondaryImage}
                      alt={currentCategory.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1 }}
                    />
                  </AnimatePresence>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.gradient} mix-blend-overlay opacity-30`} />

                  {/* Floating Stats Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-6 right-6 space-y-3"
                  >
                    {Object.entries(currentCategory.stats).map(([key, value], i) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="bg-black/60 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/10"
                      >
                        <div className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient}`}>
                          {value}
                        </div>
                        <div className="text-xs text-white/60 uppercase tracking-wide">{key}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-1">
                          {currentCategory.title}
                        </h3>
                        <p className="text-white/60 text-sm italic">
                          {currentCategory.tagline}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-4 rounded-full bg-gradient-to-r ${currentCategory.gradient}`}
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Floating Glow Effect */}
                <motion.div
                  className={`absolute -inset-4 bg-gradient-to-r ${currentCategory.gradient} rounded-3xl blur-2xl -z-10`}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Space Cards with 3D Flip */}
          <div className="space-y-6">
            {currentCategory.spaces.map((space, index) => {
              const isFlipped = flippedCard === index;
              const SpaceIcon = space.icon;

              return (
                <motion.div
                  key={space.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  onMouseEnter={() => setHoveredSpace(index)}
                  onMouseLeave={() => setHoveredSpace(null)}
                  onClick={() => setFlippedCard(isFlipped ? null : index)}
                  className="relative cursor-pointer"
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative"
                  >
                    {/* Front of Card */}
                    <div
                      className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Badges */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {space.popular && (
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            POPULAIRE
                          </span>
                        )}
                        {space.featured && (
                          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            PREMIUM
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`p-4 rounded-2xl bg-gradient-to-br ${currentCategory.gradient} flex-shrink-0`}
                        >
                          <SpaceIcon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-white mb-2">
                            {space.name}
                          </h3>
                          <p className="text-white/50 italic text-sm mb-4">
                            "{space.highlight}"
                          </p>

                          {/* Capacity & Price */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                              <Users className="w-4 h-4" />
                              {space.capacity}
                            </div>
                            <div className="w-px h-4 bg-white/20" />
                            <div className={`font-black text-xl text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient}`}>
                              {space.price > 0 ? `${space.price}` : 'Inclus'}{space.price > 0 && <span className="text-sm text-white/40 ml-1">{space.priceLabel}</span>}
                            </div>
                          </div>

                          {/* Click to flip indicator */}
                          <motion.div
                            animate={{ x: hoveredSpace === index ? 5 : 0 }}
                            className="flex items-center gap-2 text-white/40 text-xs"
                          >
                            <span>Cliquer pour voir les détails</span>
                            <ArrowRight className="w-3 h-3" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover Glow */}
                      {hoveredSpace === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`absolute inset-0 bg-gradient-to-r ${currentCategory.gradient} opacity-5 rounded-3xl pointer-events-none`}
                        />
                      )}
                    </div>

                    {/* Back of Card */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-black/95 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-2xl font-black text-white">
                            Caractéristiques
                          </h3>
                          <motion.button
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFlippedCard(null);
                            }}
                            className="text-white/60 hover:text-white"
                          >
                            ✕
                          </motion.button>
                        </div>

                        <div className="space-y-3 flex-1">
                          {space.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * i }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5`} style={{ color: currentCategory.accentColor }} />
                              <span className="text-white/80">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full mt-6 py-4 rounded-2xl bg-gradient-to-r ${currentCategory.gradient} text-white font-bold flex items-center justify-center gap-2`}
                        >
                          <span>Réserver maintenant</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation System */}
        <div className="flex items-center justify-center gap-8 mb-16">
          {spaceCategories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeCategory === index;

            return (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(index);
                  setIsAutoplay(false);
                }}
                onHoverStart={() => setIsAutoplay(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="relative">
                  {/* Icon Container */}
                  <motion.div
                    className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? `bg-gradient-to-br ${category.gradient}`
                        : 'bg-white/5 border border-white/10'
                    }`}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                  >
                    <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'} transition-colors`} />
                  </motion.div>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute -inset-2 bg-gradient-to-r ${category.gradient} rounded-2xl blur-xl opacity-50 -z-10`}
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}

                  {/* Progress Ring */}
                  {isActive && isAutoplay && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="38"
                        stroke={category.accentColor}
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
                      />
                    </svg>
                  )}
                </div>

                {/* Label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-xs font-bold transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-white/30 group-hover:text-white/50'
                  }`}>
                    {category.title.split(' ')[0]}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.a
            href={currentCategory.link}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-block relative"
          >
            <motion.div
              className={`absolute -inset-2 bg-gradient-to-r ${currentCategory.gradient} rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
            />
            <div className="relative bg-white text-black rounded-2xl px-12 py-6 font-black text-lg flex items-center gap-4">
              <Calendar className="w-6 h-6" />
              <span>{currentCategory.cta}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseSpaces">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseSpaces)" />
        </svg>
      </div>
    </motion.section>
  );
}
