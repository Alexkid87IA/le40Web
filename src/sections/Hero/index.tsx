import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, MousePointer2 } from 'lucide-react';

const animatedWords = ["BUREAU", "STUDIO", "DOMICILIATION"];

const serviceDetails = {
  "BUREAU": {
    tagline: "Espaces premium équipés",
    metric: "2500m²",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    shadowColor: "rgba(139, 92, 246, 0.5)"
  },
  "STUDIO": {
    tagline: "Production audiovisuelle 4K/8K",
    metric: "3 studios",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    shadowColor: "rgba(16, 185, 129, 0.5)"
  },
  "DOMICILIATION": {
    tagline: "Adresse prestigieuse République",
    metric: "150+ entreprises",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    shadowColor: "rgba(245, 158, 11, 0.5)"
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
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-transparent to-emerald-900/20"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Hero Image Container - Fixed to prevent overflow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="relative w-full h-full"
          style={{ 
            x: smoothMouseX,
            y: smoothMouseY,
            scale: 1.1 // Slightly larger to accommodate movement without showing edges
          }}
        >
          <img 
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Le 40 - Espace de travail premium"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Fixed gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black"></div>
        
        {/* Dynamic color wash based on current service */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord}
            className={`absolute inset-0 bg-gradient-to-br ${currentService.gradient} mix-blend-overlay`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
      </div>

      {/* Floating light beams */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
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

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full"
      >
        <div className="max-w-6xl">
          {/* Minimal animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="mb-20"
          >
            <div className="inline-flex items-center">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
              <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
                Le 40 République Marseille
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
            </div>
          </motion.div>

          {/* Title Section - Refined */}
          <div className="mb-20">
            {/* VOTRE */}
            <motion.div
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-montserrat font-black text-white leading-[0.8] tracking-[-0.02em] mb-4"
                  style={{ 
                    textShadow: `0 0 80px ${currentService.shadowColor}, 0 0 40px rgba(0,0,0,0.8)`,
                  }}>
                VOTRE
              </h1>
            </motion.div>

            {/* Rotating Word - Ultra smooth */}
            <div className="relative h-28 md:h-36 lg:h-44 xl:h-56 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  className="absolute inset-0"
                  initial={{ 
                    opacity: 0, 
                    y: 40,
                    scale: 0.9,
                    filter: "blur(20px)"
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)"
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -40,
                    scale: 1.1,
                    filter: "blur(20px)"
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <h2 className={`${
                    currentWord === 'DOMICILIATION' 
                      ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl' 
                      : 'text-7xl md:text-8xl lg:text-9xl xl:text-[11rem]'
                    } font-montserrat font-black leading-[0.8] tracking-[-0.02em] bg-gradient-to-r ${currentService.gradient} bg-clip-text text-transparent`}
                      style={{ 
                        filter: `drop-shadow(0 0 40px ${currentService.shadowColor})`,
                      }}>
                    {currentWord}
                  </h2>
                  
                  {/* Subtle tagline */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-white/40 font-inter text-lg mt-4 tracking-wide"
                  >
                    {currentService.tagline}
                    <span className="text-white/60 font-semibold ml-4">{currentService.metric}</span>
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* à Marseille */}
            <motion.div
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-16"
            >
              <h3 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair italic font-light text-white/80 leading-[0.9]"
                  style={{ textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
                à Marseille
              </h3>
              
              {/* Animated accent line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
                className="h-[2px] w-32 bg-gradient-to-r from-white/60 to-transparent rounded-full mt-8 origin-left"
              />
            </motion.div>
          </div>

          {/* Refined description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mb-20 max-w-3xl"
          >
            <p className="text-xl md:text-2xl lg:text-2xl font-inter font-light text-white/70 leading-relaxed">
              Un écosystème d'excellence où convergent innovation, créativité et ambition entrepreneuriale.
            </p>
          </motion.div>

          {/* Premium CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col lg:flex-row items-start gap-6 mb-20"
          >
            {/* Primary CTA - Premium Design */}
            <motion.a
              href="/contact"
              className="group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                {/* Dynamic gradient background */}
                <motion.div
                  className={`absolute -inset-[2px] bg-gradient-to-r ${currentService.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700`}
                />
                
                {/* Button container */}
                <div className="relative bg-white text-black rounded-2xl overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${currentService.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  <div className="relative px-10 py-5 flex items-center gap-4">
                    <span className="font-montserrat font-bold text-base tracking-wide">
                      RÉSERVER UNE VISITE
                    </span>
                    <motion.div
                      className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.a>
            
            {/* Secondary CTA - Glass Design */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-500">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative px-10 py-5 flex items-center gap-4">
                  <span className="font-montserrat font-semibold text-base text-white tracking-wide">
                    DÉCOUVRIR EN VIDÉO
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5" />
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Bottom Section - Stats or Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="flex flex-wrap items-center gap-8 lg:gap-16"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-white/60 font-inter text-sm">Disponible immédiatement</span>
            </div>
            <div className="text-white/60 font-inter text-sm">
              <span className="text-white/80 font-semibold">150+</span> entreprises nous font confiance
            </div>
            <div className="text-white/60 font-inter text-sm">
              <span className="text-white/80 font-semibold">2500m²</span> d'espaces premium
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Clean bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-[5] pointer-events-none"></div>

      {/* Subtle corner gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-violet-600/5 to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-emerald-600/5 to-transparent blur-3xl pointer-events-none"></div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </section>
  );
}