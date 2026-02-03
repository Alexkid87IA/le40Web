import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Users, Wifi, Coffee, Clock, ArrowRight } from 'lucide-react';
import { useMagneticHover } from '../../hooks/useMagneticHover';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function CoworkingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.9]);

  const btnMagnetic = useMagneticHover({ strength: 0.15 });

  const benefits = [
    { icon: Users, text: 'Communauté 120+ entrepreneurs' },
    { icon: Wifi, text: 'Fibre optique dédiée 1 Gb/s' },
    { icon: Coffee, text: 'Espace café et détente' },
    { icon: Clock, text: 'Accès Lun-Ven 9h-20h' }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="coworking"
      style={{ opacity, willChange: 'opacity' }}
      className="relative h-screen bg-black overflow-hidden transform-gpu"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/60 via-black/80 to-blue-950/60 opacity-80" />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* ══════════════════════════════════════════
          MOBILE — Image plein écran + texte overlay
          ══════════════════════════════════════════ */}
      <div className="md:hidden relative h-full">
        <div className="absolute inset-0">
          <img src="https://le40-cdn.b-cdn.net/homepage/home-coworking.png" alt="Coworking Le 40" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="relative h-full flex flex-col justify-end px-5 pb-8 pt-20">
          <motion.div
            ref={isMobile ? contentRef : undefined}
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fade} className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1.5 mb-3">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-wider">Coworking</span>
            </motion.div>

            <motion.h2 variants={fade} className="text-2xl sm:text-3xl font-montserrat font-black text-white leading-tight mb-2">
              Travaillez<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">Entouré d'Entrepreneurs</span>
            </motion.h2>

            <motion.p variants={fade} className="text-sm text-white/70 mb-3 leading-relaxed font-inter line-clamp-2">
              Rejoignez une communauté dynamique dans nos espaces de travail haut de gamme.
            </motion.p>

            <motion.div variants={fade} className="flex items-center gap-2 mb-4">
              <span className="text-white/50 text-xs font-inter">À partir de</span>
              <span className="text-xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">199€</span>
              <span className="text-white/50 text-xs font-inter">/mois</span>
            </motion.div>

            <motion.div variants={fade} className="flex flex-col gap-2.5">
              <a href="/bureaux-prives" className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-montserrat font-bold text-sm">
                RÉSERVER MAINTENANT <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="px-5 py-3 bg-white/10 backdrop-blur border border-cyan-500/30 text-white rounded-xl font-montserrat font-bold text-sm text-center">
                Demander une visite
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — Layout avec contraintes absolues
          ══════════════════════════════════════════ */}
      <div className="h-full hidden md:flex items-center justify-center relative z-10">
        <div className="w-full max-w-[1200px] mx-auto px-8 flex items-center justify-center gap-16 flex-row-reverse">

        {/* ── TEXTE ── */}
        <motion.div
          ref={!isMobile ? contentRef : undefined}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex-1 max-w-md"
        >
          <div>
            {/* Badge */}
            <motion.div variants={fade} className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1.5 mb-4">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-wider">Coworking</span>
            </motion.div>

            {/* Title */}
            <motion.h2 variants={fade} className="text-4xl font-montserrat font-black text-white leading-[0.95] mb-3">
              Travaillez<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">Entouré d'Entrepreneurs</span>
            </motion.h2>

            {/* Description */}
            <motion.p variants={fade} className="text-sm text-white/70 mb-4 leading-relaxed font-inter">
              Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme.
            </motion.p>

            {/* Features grid */}
            <motion.div variants={fade} className="grid grid-cols-2 gap-2 mb-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2.5 hover:border-cyan-500/30 transition-colors duration-300"
                >
                  <div className="p-1.5 bg-cyan-500/10 rounded-md shrink-0">
                    <benefit.icon className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-white text-xs leading-tight font-semibold">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Price */}
            <motion.div variants={fade} className="flex items-center gap-2 mb-4">
              <span className="text-white/50 text-xs font-inter">À partir de</span>
              <span className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">199€</span>
              <span className="text-white/50 text-xs font-inter">/mois</span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fade} className="flex items-center gap-3">
              <motion.a
                ref={btnMagnetic.ref as any}
                href="/bureaux-prives"
                style={{ x: btnMagnetic.x, y: btnMagnetic.y }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group"
              >
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-montserrat font-bold text-sm shadow-lg shadow-cyan-500/20">
                  RÉSERVER MAINTENANT
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur border border-cyan-500/30 hover:border-cyan-500/50 text-white rounded-xl font-montserrat font-bold text-sm transition-colors duration-300"
              >
                Demander une visite
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* ── IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <div className="relative">
            {/* Glow ambiant */}
            <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />

            {/* Glass card */}
            <div
              className="relative p-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <div className="relative w-[400px] h-[300px] rounded-xl overflow-hidden group">
                <img
                  src="https://le40-cdn.b-cdn.net/homepage/home-coworking.png"
                  alt="Coworking Le 40"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
