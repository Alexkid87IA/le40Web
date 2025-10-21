import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';

const animatedWords = ["BUREAU", "STUDIO", "DOMICILIATION"];

const serviceDetails = {
  "BUREAU": {
    tagline: "Espaces premium équipés",
    metric: "2500m²",
    gradient: "from-slate-200 via-blue-50 to-slate-100",
    shadowColor: "rgba(59, 130, 246, 0.3)",
    accentColor: "#3B82F6"
  },
  "STUDIO": {
    tagline: "Production audiovisuelle 4K/8K",
    metric: "3 studios",
    gradient: "from-slate-200 via-emerald-50 to-slate-100",
    shadowColor: "rgba(16, 185, 129, 0.3)",
    accentColor: "#10B981"
  },
  "DOMICILIATION": {
    tagline: "Adresse prestigieuse République",
    metric: "150+ entreprises",
    gradient: "from-slate-200 via-amber-50 to-slate-100",
    shadowColor: "rgba(245, 158, 11, 0.3)",
    accentColor: "#F59E0B"
  }
};

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Mouse tracking for subtle image movement only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // Reduced movement range to prevent overflow
      mouseX.set(x * 20);
      mouseY.set(y * 20);
      setMousePosition({ x: x * 50, y: y * 50 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentWord = animatedWords[currentWordIndex];
  const currentService = serviceDetails[currentWord];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
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

      {/* Dynamic ambient light orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[120px]"
              style={{ backgroundColor: currentService.accentColor, opacity: 0.08 }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px]"
              style={{ backgroundColor: currentService.accentColor, opacity: 0.06 }}
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
              alt="Le 40 - Espace de travail premium"
              className="w-full h-full object-cover"
            />

            {/* Multi-layer sophisticated overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent"></div>

            {/* Subtle color accent overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord}
                className="absolute inset-0 mix-blend-soft-light"
                style={{ backgroundColor: currentService.accentColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.04 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              />
            </AnimatePresence>
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
          {/* Ultra-refined badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-md bg-white/[0.02] border border-white/[0.08]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white/40" />
              </motion.div>
              <span className="text-[10px] sm:text-xs font-montserrat font-medium text-white/50 tracking-[0.25em] uppercase">
                Le 40 République Marseille
              </span>
            </div>
          </motion.div>

          {/* Title Section - Ultra Premium */}
          <div className="mb-16 sm:mb-20">
            {/* VOTRE */}
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-montserrat font-black text-white leading-[0.85] tracking-[-0.04em] mb-3 sm:mb-4"
                  style={{
                    textShadow: '0 4px 60px rgba(0,0,0,0.5)',
                  }}>
                VOTRE
              </h1>
            </motion.div>

            {/* Rotating Word - Sophisticated animation */}
            <div className="relative h-24 sm:h-28 md:h-36 lg:h-44 xl:h-56 mb-6 sm:mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  className="absolute inset-0"
                  initial={{
                    opacity: 0,
                    y: 60,
                    scale: 0.95,
                    rotateX: 20,
                    filter: "blur(10px)"
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    filter: "blur(0px)"
                  }}
                  exit={{
                    opacity: 0,
                    y: -60,
                    scale: 1.05,
                    rotateX: -20,
                    filter: "blur(10px)"
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ transformPerspective: 1000 }}
                >
                  <h2 className={`${
                    currentWord === 'DOMICILIATION'
                      ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                      : 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]'
                    } font-montserrat font-black leading-[0.85] tracking-[-0.04em] bg-gradient-to-br ${currentService.gradient} bg-clip-text text-transparent`}
                      style={{
                        filter: `drop-shadow(0 2px 30px ${currentService.shadowColor})`,
                      }}>
                    {currentWord}
                  </h2>

                  {/* Premium tagline with icon */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 mt-4 sm:mt-6"
                  >
                    <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-white/20 to-transparent"></div>
                    <p className="text-sm sm:text-base md:text-lg font-inter text-white/40 tracking-wide">
                      {currentService.tagline}
                    </p>
                    <div className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-xs sm:text-sm font-montserrat font-semibold text-white/60">
                        {currentService.metric}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* à Marseille - Elegant serif */}
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
              className="mb-12 sm:mb-16"
            >
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair italic font-light text-white/70 leading-[0.9]"
                  style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                à Marseille
              </h3>

              {/* Refined accent line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-6 sm:mt-8 origin-left"
              >
                <div className="h-[1px] w-24 sm:w-32 bg-gradient-to-r from-white/30 via-white/10 to-transparent"></div>
                <motion.div
                  className="absolute top-0 left-0 h-[1px] w-8 bg-white/60"
                  animate={{ x: [0, 100, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Refined description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 sm:mb-20 max-w-3xl"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-inter font-light text-white/60 leading-relaxed sm:leading-relaxed tracking-wide">
              Un écosystème d'excellence où convergent innovation, créativité et ambition entrepreneuriale.
            </p>
          </motion.div>

          {/* Ultra-Premium CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-16 sm:mb-20"
          >
            {/* Primary CTA - Minimalist Luxury */}
            <motion.a
              href="/contact"
              className="group relative w-full sm:w-auto"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
                  style={{ backgroundColor: currentService.accentColor }}
                />
              </AnimatePresence>

              <div className="relative bg-white text-black rounded-2xl overflow-hidden group-hover:bg-white/95 transition-colors duration-500">
                <div className="relative px-8 sm:px-10 py-4 sm:py-5 flex items-center justify-between gap-6">
                  <span className="font-montserrat font-bold text-sm sm:text-base tracking-wide">
                    RÉSERVER UNE VISITE
                  </span>
                  <motion.div
                    className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors"
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.a>

            {/* Secondary CTA - Ultra Glass */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative w-full sm:w-auto"
            >
              <div className="relative backdrop-blur-xl bg-white/[0.04] rounded-2xl border border-white/[0.12] overflow-hidden hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-500">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                  animate={{ x: [-300, 300] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative px-8 sm:px-10 py-4 sm:py-5 flex items-center justify-between gap-6">
                  <span className="font-montserrat font-semibold text-sm sm:text-base text-white tracking-wide">
                    DÉCOUVRIR EN VIDÉO
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.12] transition-colors">
                    <PlayCircle className="w-4 h-4 text-white/80" />
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Refined Stats - Minimal & Elegant */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-6 sm:gap-8 lg:gap-12"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-white/50 font-inter text-xs sm:text-sm tracking-wide">
                Disponible immédiatement
              </span>
            </div>

            <div className="h-px w-12 sm:w-8 bg-white/10 hidden sm:block"></div>

            <div className="font-inter text-xs sm:text-sm text-white/50 tracking-wide">
              <span className="text-white/80 font-semibold">150+</span> entreprises
            </div>

            <div className="h-px w-12 sm:w-8 bg-white/10 hidden sm:block"></div>

            <div className="font-inter text-xs sm:text-sm text-white/50 tracking-wide">
              <span className="text-white/80 font-semibold">2500m²</span> d'espaces
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Premium bottom fade with subtle vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-[5] pointer-events-none"></div>

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