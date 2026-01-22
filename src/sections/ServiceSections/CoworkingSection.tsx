import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Wifi, Coffee, Clock, ArrowRight } from 'lucide-react';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { elegantFadeIn, staggerContainer, staggerItem } from '../../utils/animationVariants';

export default function CoworkingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 1]);

  const btnMagnetic = useMagneticHover({ strength: 0.15 });

  const benefits = [
    { icon: Users, text: 'Communauté de 120+ entrepreneurs actifs' },
    { icon: Wifi, text: 'Fibre optique dédiée 1 Gb/s' },
    { icon: Coffee, text: 'Espace café et détente' },
    { icon: Clock, text: 'Accès Lun-Ven 9h-20h' }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="coworking"
      style={{ opacity, scale, willChange: 'opacity' }}
      className="relative min-h-screen flex items-center bg-black overflow-hidden py-12 lg:py-16 laptop:py-10 xl:py-20 transform-gpu"
    >
      <div className="absolute inset-0">
        <motion.div
          style={{ opacity: 0.8 }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-950/60 via-black/80 to-blue-950/60"
        />
      </div>

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 laptop:px-8 xl:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 laptop:gap-8 xl:gap-16 items-center">
          <motion.div
            variants={elegantFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="order-2 lg:order-1"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-5 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
            >
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-bold uppercase tracking-wider">Coworking</span>
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl laptop:text-4xl font-montserrat font-black text-white mb-6 laptop:mb-4 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              Travaillez<br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">
                  Entouré d'Entrepreneurs
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 blur-3xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </motion.h2>

            <p className="text-base md:text-lg lg:text-lg laptop:text-base xl:text-xl text-white/70 mb-8 laptop:mb-5 leading-relaxed font-inter">
              Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme. Flexibilité totale, équipements premium et networking au quotidien.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 laptop:gap-3 mb-8 laptop:mb-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: 'rgba(34, 211, 238, 0.3)',
                    boxShadow: '0 20px 40px rgba(34, 211, 238, 0.1)'
                  }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="p-2 bg-cyan-500/10 rounded-xl shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <benefit.icon className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <span className="text-white/80 text-sm leading-tight pt-2 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 laptop:gap-2 mb-8 laptop:mb-5"
            >
              <div className="text-white/70 text-sm font-inter">À partir de</div>
              <div className="text-4xl lg:text-4xl laptop:text-3xl xl:text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">199€</div>
              <div className="text-white/70 text-sm font-inter">/mois</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                ref={btnMagnetic.ref as any}
                href="/coworking"
                style={{ x: btnMagnetic.x, y: btnMagnetic.y }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 text-white rounded-xl font-montserrat font-bold shadow-2xl text-sm">
                  <span>RÉSERVER MAINTENANT</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 text-white rounded-xl font-montserrat font-bold transition-all duration-300 text-center text-sm"
              >
                Demander une visite
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <motion.div
              className="relative h-[350px] lg:h-[450px] laptop:h-[350px] xl:h-[550px] rounded-2xl lg:rounded-3xl overflow-hidden"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-3xl opacity-20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <div className="relative h-full">
                <div className="absolute inset-0">
                  <img
                    src="https://le40-cdn.b-cdn.net/homepage/home-coworking.png"
                    alt="Coworking Le 40"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseCoworking">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseCoworking)" />
        </svg>
      </div>
    </motion.section>
  );
}
