import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MapPin, Mail, Building2, Shield, ArrowRight, Clock } from 'lucide-react';
import { useMagneticHover } from '../../hooks/useMagneticHover';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function DomiciliationSection() {
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

  const features = [
    { icon: Building2, text: 'Adresse professionnelle centre Marseille' },
    { icon: Mail, text: 'Scan courrier 2h + Réexpédition' },
    { icon: Shield, text: 'Configuration 24h + Agrément préfecture' },
    { icon: Clock, text: 'Accès coworking & networking inclus' }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="domiciliation"
      style={{ opacity, willChange: 'opacity' }}
      className="relative h-screen bg-black overflow-hidden transform-gpu"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-black/80 to-orange-950/60 opacity-80" />
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
          <img src="https://le40-cdn.b-cdn.net/homepage/home-domiciliation.png" alt="Domiciliation Le 40" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="relative h-full flex flex-col justify-end px-5 pb-8 pt-20">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fade} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5 mb-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">Domiciliation</span>
            </motion.div>

            <motion.h2 variants={fade} className="text-2xl sm:text-3xl font-montserrat font-black text-white leading-tight mb-2">
              Domiciliation<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">En 24h</span>
            </motion.h2>

            <motion.p variants={fade} className="text-sm text-white/70 mb-3 leading-relaxed font-inter line-clamp-2">
              Domiciliez votre entreprise au coeur de Marseille. Configuration rapide et services pro inclus.
            </motion.p>

            <motion.div variants={fade} className="flex items-center gap-2 mb-4">
              <span className="text-white/50 text-xs font-inter">À partir de</span>
              <span className="text-xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400">39€</span>
              <span className="text-white/50 text-xs font-inter">/mois</span>
            </motion.div>

            <motion.div variants={fade} className="flex flex-col gap-2.5">
              <a href="/domiciliation" className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-montserrat font-bold text-sm">
                OBTENIR UNE ADRESSE <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="px-5 py-3 bg-white/10 backdrop-blur border border-amber-500/30 text-white rounded-xl font-montserrat font-bold text-sm text-center">
                Nous contacter
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
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex-1 max-w-md"
        >
          <div>
            {/* Badge */}
            <motion.div variants={fade} className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5 mb-4">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">Domiciliation</span>
            </motion.div>

            {/* Title */}
            <motion.h2 variants={fade} className="text-4xl font-montserrat font-black text-white leading-[0.95] mb-3">
              Domiciliation<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">En 24h</span>
            </motion.h2>

            {/* Description */}
            <motion.p variants={fade} className="text-sm text-white/70 mb-4 leading-relaxed font-inter">
              Domiciliez votre entreprise au coeur de Marseille. Configuration rapide en 24h, gestion courrier automatisée et services professionnels inclus.
            </motion.p>

            {/* Features grid */}
            <motion.div variants={fade} className="grid grid-cols-2 gap-2 mb-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2.5 hover:border-amber-500/30 transition-colors duration-300"
                >
                  <div className="p-1.5 bg-amber-500/10 rounded-md shrink-0">
                    <feature.icon className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-white text-xs leading-tight font-semibold">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Price */}
            <motion.div variants={fade} className="flex items-center gap-2 mb-4">
              <span className="text-white/50 text-xs font-inter">À partir de</span>
              <span className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400">39€</span>
              <span className="text-white/50 text-xs font-inter">/mois</span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fade} className="flex items-center gap-3">
              <motion.a
                ref={btnMagnetic.ref as any}
                href="/domiciliation"
                style={{ x: btnMagnetic.x, y: btnMagnetic.y }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group"
              >
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-montserrat font-bold text-sm shadow-lg shadow-amber-500/20">
                  OBTENIR UNE ADRESSE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur border border-amber-500/30 hover:border-amber-500/50 text-white rounded-xl font-montserrat font-bold text-sm transition-colors duration-300"
              >
                Nous contacter
              </motion.a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fade} className="mt-4 text-xs text-amber-400/60 font-inter">
              120+ entreprises nous font confiance
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
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />

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
                  src="https://le40-cdn.b-cdn.net/homepage/home-domiciliation.png"
                  alt="Domiciliation Le 40"
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
