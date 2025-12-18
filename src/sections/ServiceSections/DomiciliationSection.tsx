import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Mail, Building2, Shield, ArrowRight, Clock } from 'lucide-react';
import { useScrollParallax } from '../../hooks/useScrollParallax';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { elegantFadeIn, staggerContainer, staggerItem } from '../../utils/animationVariants';

export default function DomiciliationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { y: videoY } = useScrollParallax(videoRef, { speed: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.6]);

  const btnMagnetic = useMagneticHover({ strength: 0.15 });

  const features = [
    { icon: Building2, text: 'Adresse professionnelle au centre de Marseille' },
    { icon: Mail, text: 'Scan courrier en 2h + Réexpédition express' },
    { icon: Shield, text: 'Configuration en 24h + Agrément préfecture' },
    { icon: Clock, text: 'Accès coworking & networking inclus' }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="domiciliation"
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center bg-black overflow-hidden py-12 lg:py-16 laptop:py-10 xl:py-20"
    >
      <motion.div
        ref={videoRef}
        style={{ y: videoY }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761805289/e3c2235d-6478-42d0-85b3-6266f2227367_iazq5a.mp4" type="video/mp4" />
        </video>
        <motion.div
          style={{ opacity: gradientOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-black/80 to-orange-950/60"
        />
      </motion.div>

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 laptop:px-8 xl:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 laptop:gap-8 xl:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:order-2"
          >
            <motion.div
              className="relative h-[350px] lg:h-[450px] laptop:h-[350px] xl:h-[550px] rounded-2xl lg:rounded-3xl overflow-hidden"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur-3xl opacity-20"
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
                {[
                  'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
                  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
                  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
                  'https://images.pexels.com/photos/2451567/pexels-photo-2451567.jpeg'
                ].map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                      opacity: 1,
                      scale: 1.05
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 4,
                      repeat: Infinity,
                      repeatDelay: 12
                    }}
                    className="absolute inset-0"
                    style={{
                      opacity: 0,
                      animation: `fadeInOut 16s infinite ${index * 4}s`
                    }}
                  >
                    <motion.img
                      src={src}
                      alt={`Domiciliation ${index + 1}`}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: [1, 1.08, 1],
                        x: [0, -10, 0],
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            ref={contentRef}
            variants={elegantFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:order-1"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-5 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
            >
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 text-sm font-bold uppercase tracking-wider">Domiciliation</span>
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl laptop:text-4xl font-montserrat font-black text-white mb-6 laptop:mb-4 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Domiciliation
              </motion.span>
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                  En 24h
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 blur-3xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </motion.h2>

            <p className="text-base md:text-lg lg:text-lg laptop:text-base xl:text-xl text-white/70 mb-8 laptop:mb-5 leading-relaxed font-inter">
              Domiciliez votre entreprise au cœur de Marseille. Configuration rapide en 24h, gestion courrier automatisée et services professionnels inclus. Une solution complète et flexible pour démarrer sereinement.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 laptop:gap-3 mb-8 laptop:mb-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: 'rgba(251, 146, 60, 0.3)',
                    boxShadow: '0 20px 40px rgba(251, 146, 60, 0.1)'
                  }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="p-2 bg-amber-500/10 rounded-xl shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <feature.icon className="w-5 h-5 text-amber-400" />
                  </motion.div>
                  <span className="text-white/80 text-sm leading-tight pt-2 font-medium">{feature.text}</span>
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
              <div className="text-white/50 text-sm font-inter">À partir de</div>
              <div className="text-4xl lg:text-4xl laptop:text-3xl xl:text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400">39€</div>
              <div className="text-white/50 text-sm font-inter">/mois</div>
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
                href="/domiciliation"
                style={{ x: btnMagnetic.x, y: btnMagnetic.y }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white rounded-xl font-montserrat font-bold shadow-2xl">
                  <span>OBTENIR UNE ADRESSE</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-amber-500/30 hover:border-amber-500/50 text-white rounded-xl font-montserrat font-bold transition-all duration-300 text-center"
              >
                Nous contacter
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 text-sm text-amber-400/60 font-inter"
            >
              ⭐ 120+ entreprises nous font déjà confiance
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseDomiciliation">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseDomiciliation)" />
        </svg>
      </div>
    </motion.section>
  );
}