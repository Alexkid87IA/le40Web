import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Building2, MapPin, Video, Zap, Globe, TrendingUp } from 'lucide-react';
import { designTokens } from '../../styles/designTokens';

const services = [
  {
    id: 'coworking',
    icon: Users,
    label: 'Coworking',
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    color: '#06B6D4',
  },
  {
    id: 'bureaux',
    icon: Building2,
    label: 'Bureaux',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    color: '#10B981',
  },
  {
    id: 'domiciliation',
    icon: MapPin,
    label: 'Domiciliation',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    color: '#F59E0B',
  },
  {
    id: 'studios-pro',
    icon: Video,
    label: 'Studios',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    color: '#A855F7',
  },
];

const stats = [
  { value: '4000', unit: 'm²', label: 'Surface Premium' },
  { value: '120', unit: '+', label: 'Entrepreneurs' },
  { value: '24', unit: '/7', label: 'Accès Flexible' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState(0);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />

      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className={`relative z-10 w-full max-w-[1600px] mx-auto ${designTokens.spacing.container}`}>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5 text-orange-400" />
                </motion.div>
                <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
                  Marseille · Centre République
                </span>
                <motion.div
                  className="w-2 h-2 rounded-full bg-orange-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <h1 className="relative">
                <motion.div
                  className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] mb-6"
                  style={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                  }}
                  transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                >
                  <motion.span
                    className="block text-white relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Votre
                  </motion.span>
                  <motion.span
                    className="block relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                      Espace Pro
                    </span>
                  </motion.span>
                  <motion.span
                    className="block text-white relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Réinventé
                  </motion.span>
                </motion.div>

                <motion.div
                  className="absolute -right-8 top-1/2 -translate-y-1/2 w-32 h-32 blur-3xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </h1>

              <motion.p
                className="text-xl text-white/70 leading-relaxed max-w-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                4000m² d'espaces premium au cœur de Marseille. Coworking, bureaux privés, domiciliation et studios créatifs pour propulser votre activité.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href="#coworking"
                  className="group relative px-8 py-4 rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="relative flex items-center gap-3 text-white font-bold">
                    <span>Découvrir nos espaces</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>

                <motion.a
                  href="/contact"
                  className="px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Planifier une visite
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
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
                >
                  <div className="text-5xl font-black text-white mb-2">
                    {stat.value}
                    <span className="text-orange-400">{stat.unit}</span>
                  </div>
                  <div className="text-sm text-white/60 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isActive = activeService === index;

                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => handleServiceClick(service.id)}
                      className={`relative group overflow-hidden rounded-3xl p-8 ${
                        index % 2 === 1 ? 'mt-12' : ''
                      }`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </AnimatePresence>

                      <div className={`absolute inset-0 bg-white/5 backdrop-blur-xl border ${
                        isActive ? 'border-white/30' : 'border-white/10'
                      } transition-colors duration-500`} />

                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${service.color}20 0%, transparent 70%)`,
                        }}
                      />

                      <div className="relative">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-xl`}
                          animate={isActive ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                          {service.label}
                        </h3>

                        <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${service.gradient} transform origin-left transition-all duration-500 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`} />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-orange-400"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-cyan-400"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      />
    </motion.section>
  );
}
