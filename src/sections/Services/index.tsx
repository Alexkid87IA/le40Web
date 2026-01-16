import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Users, MapPin, Monitor, Video, Network, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { designTokens } from '../../styles/designTokens';

const servicesData = [
  {
    id: 1,
    title: "Coworking",
    subtitle: "Espaces Collaboratifs",
    icon: Users,
    description: "Rejoignez une communauté de 120+ entrepreneurs dans un espace professionnel de 300m²",
    features: ["Fibre 1Gb/s incluse", "Networking régulier", "Conciergerie disponible"],
    link: "/coworking",
    metric: "4000",
    metricLabel: "m² d'innovation",
    tagline: "Travaillez entouré d'entrepreneurs comme vous",
    gradient: designTokens.colors.services.coworking.gradient,
    shadowColor: designTokens.colors.services.coworking.primary,
  },
  {
    id: 2,
    title: "Domiciliation",
    subtitle: "Adresse professionnelle",
    icon: MapPin,
    description: "Domiciliez votre société dans un quartier d'affaires stratégique de Marseille",
    features: ["Réception / Expédition Courrier", "Accès Coworking / Networking", "Events"],
    link: "/domiciliation",
    metric: "120",
    metricLabel: "entreprises",
    tagline: "Une adresse professionnelle pour votre développement",
    gradient: designTokens.colors.services.domiciliation.gradient,
    shadowColor: designTokens.colors.services.domiciliation.primary,
  },
  {
    id: 3,
    title: "Salles de Réunion",
    subtitle: "Équipement professionnel",
    icon: Monitor,
    description: "Présentez vos projets dans des salles équipées pour vos réunions importantes",
    features: ["Écrans 4K → Visibilité parfaite", "Transcription automatique", "Café premium inclus"],
    link: "/salles",
    metric: "5",
    metricLabel: "salles signature",
    tagline: "Où vos projets avancent",
    gradient: designTokens.colors.services.salles.gradient,
    shadowColor: designTokens.colors.services.salles.primary,
  },
  {
    id: 4,
    title: "Studios Créatifs",
    subtitle: "Production Pro",
    icon: Video,
    description: "Créez du contenu qui captive le monde",
    features: ["Dolby Atmos", "Motion Capture", "Post-prod IA"],
    link: "/studios",
    metric: "8K",
    metricLabel: "Ultra HD",
    tagline: "Votre vision, notre expertise",
    gradient: designTokens.colors.services.studios.gradient,
    shadowColor: designTokens.colors.services.studios.primary,
  },
  {
    id: 5,
    title: "Communauté",
    subtitle: "Réseau d'entrepreneurs",
    icon: Network,
    description: "Développez votre réseau avec des entrepreneurs ambitieux et des experts du secteur",
    features: ["Mentors expérimentés", "Événements réguliers", "Opportunités de collaboration"],
    link: "/experts",
    metric: "120+",
    metricLabel: "entrepreneurs actifs",
    tagline: "Grandissez entouré des meilleurs",
    gradient: designTokens.colors.services.community.gradient,
    shadowColor: designTokens.colors.services.community.primary,
  },
];

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

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
      id="services"
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen bg-[#0A0A0A] py-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]" />

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
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
              style={{ backgroundColor: currentService.shadowColor, opacity: 0.10 }}
            />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px]"
              style={{ backgroundColor: currentService.shadowColor, opacity: 0.08 }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 to-amber-600/50 rounded-full blur-xl opacity-50" />
              <div className="relative bg-black/60 border border-white/20 rounded-full px-6 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-white/90 font-medium text-sm uppercase tracking-wider">
                    Notre Écosystème
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-montserrat font-black leading-[0.85] tracking-[-0.04em] mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-white">Nos Services</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
              Complets
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-white/60 max-w-3xl mx-auto font-light"
          >
            Un écosystème complet pour développer votre activité et votre réseau professionnel
          </motion.p>
        </motion.div>

        <div className="relative flex items-center justify-center min-h-[600px] mb-16">
          <motion.button
            onClick={goToPrev}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="group absolute left-0 top-1/2 -translate-y-1/2 z-20"
          >
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
            <div className="relative w-16 h-16 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:border-white/30 transition-all">
              <ChevronRight className="w-8 h-8" />
            </div>
          </motion.button>

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

              <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden p-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${currentService.gradient} opacity-5`} />

                <div className="relative z-10">
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
                  </div>

                  <div className="mb-6">
                    <h3 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-2">
                      {currentService.title}
                    </h3>
                    <p className="text-lg text-white/70 font-light">
                      {currentService.subtitle}
                    </p>
                  </div>

                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                        {currentService.metric}
                      </span>
                      <span className="text-lg text-white/70 font-light">
                        {currentService.metricLabel}
                      </span>
                    </div>
                  </motion.div>

                  <p className="text-sm text-white/60 italic mb-6">
                    {currentService.tagline}
                  </p>

                  <p className="text-base text-white/70 leading-relaxed mb-8">
                    {currentService.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {currentService.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentService.shadowColor }} />
                        <span className="text-white/60 font-light">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href={currentService.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-between w-full"
                  >
                    <div className="relative w-full">
                      <div className={`relative bg-gradient-to-r ${currentService.gradient} rounded-2xl px-8 py-5 flex items-center justify-between`}>
                        <span className="font-montserrat font-bold text-white text-lg tracking-wide">
                          En savoir plus
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
              </div>

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
    </motion.section>
  );
}
