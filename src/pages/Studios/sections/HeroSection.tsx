import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

        {/* Subtle mesh pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      {/* Dynamic ambient light orbs - Emerald theme */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[120px]"
          style={{ backgroundColor: '#10B981', opacity: 0.08 }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px]"
          style={{ backgroundColor: '#14B8A6', opacity: 0.06 }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Hero Image with ultra-smooth parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-[-5%] overflow-hidden"
          style={{
            x: smoothMouseX,
            y: smoothMouseY
          }}
        >
          <div className="relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Studios de production premium"
              className="w-full h-full object-cover"
            />

            {/* Multi-layer sophisticated overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent"></div>

            {/* Subtle emerald accent overlay */}
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{ backgroundColor: '#10B981', opacity: 0.04 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Elegant light rays */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[0.5px] w-full"
            style={{
              top: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)`
            }}
            animate={{
              x: [-1200, 1200],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              delay: i * 2.5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full"
      >
        <div className="max-w-6xl">
          {/* Badge premium */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 mb-8 sm:mb-10"
          >
            <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-white/20"></div>
            <span className="text-xs sm:text-sm font-inter text-white/40 tracking-wide flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              Studios Premium • Marseille
            </span>
            <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-white/20"></div>
          </motion.div>

          {/* Title Section - Ultra Premium */}
          <div className="mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-black text-white leading-[0.85] tracking-[-0.04em] mb-2 sm:mb-3"
                  style={{
                    textShadow: '0 4px 60px rgba(0,0,0,0.5)',
                  }}>
                STUDIOS DE
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-black leading-[0.85] tracking-[-0.04em] bg-gradient-to-br from-slate-200 via-emerald-50 to-slate-100 bg-clip-text text-transparent mb-3 sm:mb-4"
                  style={{
                    filter: 'drop-shadow(0 2px 30px rgba(16, 185, 129, 0.3))',
                  }}>
                PRODUCTION
              </h2>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mt-2 sm:mt-3"
              >
                <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-white/20 to-transparent"></div>
                <p className="text-xs sm:text-sm md:text-base font-inter text-white/40 tracking-wide">
                  Production audiovisuelle 4K/8K
                </p>
                <div className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                  <span className="text-[10px] sm:text-xs font-montserrat font-semibold text-white/60">
                    3 studios
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Refined description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-10 max-w-3xl"
          >
            <p className="text-base sm:text-lg md:text-xl font-inter font-light text-white/60 leading-relaxed tracking-wide">
              Excellence audiovisuelle et équipements professionnels au service de vos projets créatifs.
            </p>
          </motion.div>

          {/* Ultra-Premium CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={() => document.getElementById('setups')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-full sm:w-auto"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div
                className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
                style={{ backgroundColor: '#10B981' }}
              />

              <div className="relative bg-white text-black rounded-xl overflow-hidden group-hover:bg-white/95 transition-colors duration-500">
                <div className="relative px-6 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4">
                  <span className="font-montserrat font-bold text-xs sm:text-sm tracking-wide">
                    DÉCOUVRIR NOS STUDIOS
                  </span>
                  <motion.div
                    className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors"
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
              </div>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative w-full sm:w-auto"
            >
              <div className="relative backdrop-blur-xl bg-white/[0.04] rounded-xl border border-white/[0.12] overflow-hidden hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-500">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                  animate={{ x: [-300, 300] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative px-6 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4">
                  <span className="font-montserrat font-semibold text-xs sm:text-sm text-white tracking-wide">
                    VISITE VIRTUELLE 360°
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.12] transition-colors">
                    <PlayCircle className="w-3.5 h-3.5 text-white/80" />
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Refined Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 lg:gap-8"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1 h-1 rounded-full bg-emerald-400"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-white/50 font-inter text-[10px] sm:text-xs tracking-wide">
                Disponible immédiatement
              </span>
            </div>

            <div className="h-px w-8 sm:w-6 bg-white/10 hidden sm:block"></div>

            <div className="font-inter text-[10px] sm:text-xs text-white/50 tracking-wide">
              <span className="text-white/80 font-semibold">500+</span> productions
            </div>

            <div className="h-px w-8 sm:w-6 bg-white/10 hidden sm:block"></div>

            <div className="font-inter text-[10px] sm:text-xs text-white/50 tracking-wide">
              À partir de <span className="text-white/80 font-semibold">119€/h</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Premium bottom fade with subtle vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-[5] pointer-events-none"></div>

      {/* Refined film grain texture */}
      <div className="absolute inset-0 z-[3] opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="sophisticatedNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sophisticatedNoise)" />
        </svg>
      </div>
    </section>
  );
}