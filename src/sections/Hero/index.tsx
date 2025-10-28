import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';
import { designTokens } from '../../styles/designTokens';
import Button from '../../components/UI/Button';

const animatedWords = ["BUREAU", "STUDIO", "DOMICILIATION"];

const serviceDetails = {
  "BUREAU": {
    tagline: "Espaces professionnels équipés",
    metric: "4000m²",
    gradient: "from-cyan-500 via-blue-500 to-teal-500",
    shadowColor: "rgba(6, 182, 212, 0.3)",
    accentColor: "#06B6D4"
  },
  "STUDIO": {
    tagline: "Production audiovisuelle 4K/8K",
    metric: "3 studios",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    shadowColor: "rgba(16, 185, 129, 0.3)",
    accentColor: "#10B981"
  },
  "DOMICILIATION": {
    tagline: "Adresse professionnelle République",
    metric: "120+ entreprises",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadowColor: "rgba(245, 158, 11, 0.3)",
    accentColor: "#F59E0B"
  }
};

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

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
      mouseX.set(x * 15);
      mouseY.set(y * 15);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentWord = animatedWords[currentWordIndex];
  const currentService = serviceDetails[currentWord];

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

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
              style={{ backgroundColor: currentService.accentColor, opacity: 0.10 }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px]"
              style={{ backgroundColor: currentService.accentColor, opacity: 0.08 }}
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

            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent"></div>

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

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full"
      >
        <div className="max-w-6xl">
          <div className="mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <h1 className={`${designTokens.typography.h1.size} font-montserrat ${designTokens.typography.h1.weight} text-white ${designTokens.typography.h1.leading} ${designTokens.typography.h1.tracking} mb-2 sm:mb-3`}
                  style={{
                    textShadow: '0 4px 60px rgba(0,0,0,0.5)',
                  }}>
                VOTRE
              </h1>
            </motion.div>

            <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 mb-3 sm:mb-4">
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
                  <h2 className={`${designTokens.typography.h1.size} font-montserrat ${designTokens.typography.h1.weight} ${designTokens.typography.h1.leading} ${designTokens.typography.h1.tracking} bg-gradient-to-br ${currentService.gradient} bg-clip-text text-transparent`}
                      style={{
                        filter: `drop-shadow(0 2px 30px ${currentService.shadowColor})`,
                      }}>
                    {currentWord}
                  </h2>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 mt-2 sm:mt-3"
                  >
                    <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-white/20 to-transparent"></div>
                    <p className="text-xs sm:text-sm md:text-base font-inter text-white/40 tracking-wide">
                      {currentService.tagline}
                    </p>
                    <div className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-[10px] sm:text-xs font-montserrat font-semibold text-white/60">
                        {currentService.metric}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
              className="mb-6 sm:mb-8"
            >
              <h3 className={`${designTokens.typography.h2.size} font-playfair italic font-light text-white/70 ${designTokens.typography.h2.leading}`}
                  style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                à Marseille
              </h3>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-3 sm:mt-4 origin-left"
              >
                <div className="h-[1px] w-20 sm:w-24 bg-gradient-to-r from-white/30 via-white/10 to-transparent"></div>
                <motion.div
                  className="absolute top-0 left-0 h-[1px] w-6 bg-white/60"
                  animate={{ x: [0, 80, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-10 max-w-3xl"
          >
            <p className={`${designTokens.typography.body.size} font-inter font-light text-white/60 ${designTokens.typography.body.leading} tracking-wide`}>
              Un écosystème professionnel où innovation, créativité et ambition entrepreneuriale se rencontrent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col sm:flex-row items-start ${designTokens.spacing.gap.sm} mb-8 sm:mb-10`}
          >
            <div className="relative w-full sm:w-auto group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
                  style={{ backgroundColor: currentService.accentColor }}
                />
              </AnimatePresence>
              <Button
                href="/contact"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="relative bg-white text-black hover:bg-white/95 hover:shadow-none w-full sm:w-auto"
              >
                Réserver une visite
              </Button>
            </div>

            <div className="relative w-full sm:w-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
                animate={{ x: [-300, 300] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <Button
                variant="secondary"
                size="md"
                icon={PlayCircle}
                iconPosition="right"
                className="w-full sm:w-auto relative"
              >
                Voir la vidéo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
              <span className="text-white/80 font-semibold">120+</span> entreprises
            </div>

            <div className="h-px w-8 sm:w-6 bg-white/10 hidden sm:block"></div>

            <div className="font-inter text-[10px] sm:text-xs text-white/50 tracking-wide">
              <span className="text-white/80 font-semibold">4000m²</span> d'espaces
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-[5] pointer-events-none"></div>

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
