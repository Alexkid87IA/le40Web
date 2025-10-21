import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Users, MapPin, Monitor, Video, Network, ArrowRight, Sparkles, Wifi, Shield, Award, TrendingUp, Globe, ChevronRight } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: "Espaces Coworking",
    subtitle: "Bureaux flexibles et privés",
    icon: Users,
    description: "Rejoignez l'élite entrepreneuriale dans nos espaces pensés pour l'excellence",
    link: "/coworking",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    shadowColor: "#8b5cf6"
  },
  {
    id: 2,
    title: "Salles de Réunion",
    subtitle: "Espaces équipés tout compris",
    icon: Monitor,
    description: "Impressionnez dans nos écrins technologiques dernière génération",
    link: "/salles",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    shadowColor: "#10b981"
  },
  {
    id: 3,
    title: "Studios Production",
    subtitle: "Création audiovisuelle 4K/8K",
    icon: Video,
    description: "Hollywood à Marseille - Créez du contenu qui captive le monde",
    link: "/studios",
    gradient: "from-pink-600 via-rose-600 to-red-600",
    shadowColor: "#ec4899"
  }
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const currentService = servicesData[activeService];

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#0A0A0A] py-32 overflow-hidden">
      {/* Sophisticated gradient base - Matching Hero exactly */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

        {/* Subtle mesh pattern - Matching Hero exactly */}
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      {/* Dynamic ambient light orbs - Matching Hero system */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[120px]"
              style={{ backgroundColor: currentService.shadowColor, opacity: 0.08 }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px]"
              style={{ backgroundColor: currentService.shadowColor, opacity: 0.06 }}
              animate={{
                scale: [1, 1.15, 1],
                x: [0, -50, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating particles - Matching Hero */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
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

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header - Matching Hero exactly */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center mb-12"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Acte 2 - Nos Services
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
          >
            NOS SERVICES
            <motion.span
              className={`block text-transparent bg-clip-text bg-gradient-to-r ${currentService.gradient}`}
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              D'EXCELLENCE
            </motion.span>
          </motion.h2>

          {/* Refined accent line - Matching Hero */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-24 origin-center mb-8"
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <motion.div
              className="absolute top-0 left-0 h-[1px] w-6 bg-white/60"
              animate={{ x: [0, 72, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            Un écosystème complet pensé pour propulser votre réussite
          </motion.p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === index;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                onMouseEnter={() => setActiveService(index)}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card glow effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl transition-opacity duration-500 ${
                    isActive ? 'opacity-50' : 'opacity-0 group-hover:opacity-30'
                  }`}
                />

                {/* Main card */}
                <div className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 ${
                  isActive
                    ? 'border-white/30 bg-white/10'
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  {/* Active gradient overlay */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-5 rounded-3xl`}
                    />
                  )}

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="mb-6"
                    >
                      <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${service.gradient} ${
                        isActive ? 'scale-110' : 'scale-100'
                      } transition-transform duration-300`}
                        style={{
                          boxShadow: isActive ? `0 10px 40px ${service.shadowColor}60` : 'none',
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Title & Subtitle */}
                    <h3 className={`text-2xl font-montserrat font-bold mb-2 transition-all duration-300 ${
                      isActive
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60'
                        : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60'
                    }`}>
                      {service.title}
                    </h3>

                    <p className="text-white/60 text-sm font-inter mb-6">
                      {service.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-white/50 text-sm font-inter leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* CTA Link */}
                    <motion.a
                      href={service.link}
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-sm font-montserrat font-semibold text-white/80 hover:text-white transition-colors group/link"
                    >
                      <span>Découvrir</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <motion.a
            href="/offres"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-emerald-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-white text-black rounded-2xl px-10 py-5">
              <div className="flex items-center gap-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-montserrat font-bold tracking-wide">
                  DÉCOUVRIR TOUTES NOS OFFRES
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.a>
        </motion.div>
      </div>

      {/* Premium film grain texture - Matching Hero */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none z-20">
        <svg width="100%" height="100%">
          <filter id="sophisticatedNoiseServices">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sophisticatedNoiseServices)" />
        </svg>
      </div>
    </section>
  );
}
