import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Building2, MapPin, Video, Wifi, Coffee } from 'lucide-react';
import { designTokens } from '../../styles/designTokens';

const services = [
  {
    id: 'coworking',
    icon: Users,
    label: 'Coworking',
    gradient: 'from-amber-500 via-orange-500 to-red-600',
  },
  {
    id: 'bureaux',
    icon: Building2,
    label: 'Bureaux',
    gradient: 'from-slate-500 via-gray-600 to-zinc-700',
  },
  {
    id: 'domiciliation',
    icon: MapPin,
    label: 'Domiciliation',
    gradient: 'from-amber-600 via-yellow-600 to-orange-600',
  },
  {
    id: 'studios-pro',
    icon: Video,
    label: 'Studios',
    gradient: 'from-slate-600 via-zinc-600 to-stone-700',
  },
];

const stats = [
  { value: '4000', unit: 'm²', label: 'Surface Premium' },
  { value: '120', unit: '+', label: 'Entrepreneurs' },
  { value: '1', unit: 'Gb/s', label: 'Fibre Optique' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const imageY = useTransform(scrollY, [0, 400], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleServiceClick = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero-background.png)',
            filter: 'brightness(0.4) contrast(1.1)',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />

      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-orange-700/15 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className={`relative z-10 w-full max-w-[1600px] mx-auto ${designTokens.spacing.container}`}>
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            className="max-w-5xl space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-amber-500/20 mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
              </motion.div>
              <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
                Au cœur de Marseille
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-amber-400"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <h1 className="relative">
              <motion.div
                className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] mb-8"
                style={{
                  x: mousePosition.x * 0.3,
                  y: mousePosition.y * 0.3,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              >
                <motion.span
                  className="block text-white relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  L'Excellence
                </motion.span>
                <motion.span
                  className="block relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                    Industrielle
                  </span>
                </motion.span>
                <motion.span
                  className="block text-white relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Moderne
                </motion.span>
              </motion.div>

              <motion.div
                className="absolute -right-8 top-1/2 -translate-y-1/2 w-48 h-48 blur-3xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-20"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.35, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </h1>

            <motion.p
              className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Rejoignez 120+ entrepreneurs dynamiques dans 4000m² d'excellence. Un écosystème complet avec espaces de coworking, bureaux privés, salles de réunion équipées et événements professionnels réguliers pour accélérer votre croissance.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="#coworking"
                className="group relative px-10 py-5 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <div className="relative flex items-center gap-3 text-white font-bold text-lg">
                  <span>Découvrir nos espaces</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>

              <motion.a
                href="/contact"
                className="px-10 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 hover:border-amber-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Planifier une visite
              </motion.a>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-12 pt-12 border-t border-white/10 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-6xl font-black text-white mb-3">
                    {stat.value}
                    <span className="text-amber-400">{stat.unit}</span>
                  </div>
                  <div className="text-base text-white/70 font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-20 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="group relative overflow-hidden rounded-2xl px-6 py-4"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-amber-500/30 transition-colors" />

                  <div className="relative flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${service.gradient}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {service.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-amber-300"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-orange-400"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-amber-500"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 3 }}
      />
    </motion.section>
  );
}
