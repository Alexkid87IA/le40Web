import React, { useRef, ReactNode, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { LucideIcon, ArrowRight, Clock } from 'lucide-react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

interface Feature {
  icon: LucideIcon;
  text: string;
  description?: string;
}

interface AnimatedServiceSectionProps {
  id: string;
  videoSrc?: string;
  gradientClasses: string;
  badge: {
    icon: LucideIcon;
    text: string;
    colorClasses: string;
  };
  title: ReactNode;
  description: string;
  features: Feature[];
  price: {
    amount: string;
    period: string;
    gradientClasses: string;
  };
  cta: {
    primary: {
      text: string;
      href: string;
      gradientClasses: string;
    };
    secondary: {
      text: string;
      href: string;
      borderColorClasses: string;
    };
  };
  images: string[];
  noiseFilterId?: string;
  noiseSeed?: string;
  order?: 'left' | 'right';
  comingSoon?: boolean;
}

export default function AnimatedServiceSection({
  id,
  gradientClasses,
  badge,
  title,
  description,
  features,
  price,
  cta,
  images,
  order = 'left',
  comingSoon = false
}: AnimatedServiceSectionProps) {
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

  const BadgeIcon = badge.icon;

  // Determine glow color based on badge
  const getGlowColor = () => {
    if (badge.colorClasses.includes('emerald')) return 'from-emerald-500/15 via-teal-500/10';
    if (badge.colorClasses.includes('cyan')) return 'from-cyan-500/15 via-blue-500/10';
    if (badge.colorClasses.includes('blue')) return 'from-blue-500/15 via-indigo-500/10';
    if (badge.colorClasses.includes('red')) return 'from-red-500/15 via-rose-500/10';
    if (badge.colorClasses.includes('purple')) return 'from-purple-500/15 via-violet-500/10';
    return 'from-amber-500/15 via-orange-500/10';
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ opacity, willChange: 'opacity' }}
      className="relative h-screen bg-black overflow-hidden transform-gpu"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${gradientClasses} opacity-80`} />
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
          <img src={images[0]} alt={id} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="relative h-full flex flex-col justify-end px-5 pb-8 pt-20">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fade} className={`inline-flex items-center gap-2 ${badge.colorClasses} rounded-full px-3 py-1.5 mb-3`}>
              <BadgeIcon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{badge.text}</span>
            </motion.div>

            <motion.div variants={fade} className="mb-2">
              {React.cloneElement(title as React.ReactElement, {
                className: 'text-2xl sm:text-3xl font-montserrat font-black text-white leading-tight'
              })}
              {comingSoon && (
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300 text-[10px] font-bold uppercase tracking-wider">Bientôt disponible</span>
                </div>
              )}
            </motion.div>

            <motion.p variants={fade} className="text-sm text-white/70 mb-3 leading-relaxed font-inter line-clamp-2">
              {description}
            </motion.p>

            <motion.div variants={fade} className="flex items-center gap-2 mb-4">
              <span className="text-white/50 text-xs font-inter">À partir de</span>
              <span className={`text-xl font-montserrat font-black text-transparent bg-clip-text ${price.gradientClasses}`}>{price.amount}</span>
              <span className="text-white/50 text-xs font-inter">{price.period}</span>
            </motion.div>

            <motion.div variants={fade} className="flex flex-col gap-2.5">
              <a href={cta.primary.href} className={`flex items-center justify-center gap-2 px-5 py-3 ${cta.primary.gradientClasses} text-white rounded-xl font-montserrat font-bold text-sm`}>
                {cta.primary.text} <ArrowRight className="w-4 h-4" />
              </a>
              <a href={cta.secondary.href} className={`px-5 py-3 bg-white/10 backdrop-blur border ${cta.secondary.borderColorClasses} text-white rounded-xl font-montserrat font-bold text-sm text-center`}>
                {cta.secondary.text}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — Layout avec contraintes absolues
          ══════════════════════════════════════════ */}
      <div className="h-full hidden md:flex items-center justify-center relative z-10">
        <div className={`w-full max-w-[1200px] mx-auto px-8 flex items-center justify-center gap-16 ${order === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>

        {/* ── TEXTE ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex-1 max-w-md"
        >
          <div>
            {/* Badge */}
            <motion.div variants={fade} className={`inline-flex items-center gap-1.5 ${badge.colorClasses} rounded-full px-3 py-1.5 mb-4`}>
              <BadgeIcon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{badge.text}</span>
            </motion.div>

            {/* Title */}
            <motion.div variants={fade} className="mb-3">
              {React.cloneElement(title as React.ReactElement, {
                className: 'text-4xl font-montserrat font-black text-white leading-[1.1]'
              })}
              {comingSoon && (
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300 text-[10px] font-bold uppercase tracking-wider">Bientôt disponible</span>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.p variants={fade} className="text-sm text-white/70 mb-4 leading-relaxed font-inter">
              {description}
            </motion.p>

            {/* Features grid */}
            <motion.div variants={fade} className="grid grid-cols-2 gap-2 mb-4">
              {features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2.5 hover:border-white/20 transition-colors duration-300"
                  >
                    <div className={`p-1.5 ${badge.colorClasses.replace('border', 'bg').replace('text-', 'text-')} rounded-md shrink-0`}>
                      <FeatureIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-xs leading-tight font-semibold block">{feature.text}</span>
                      {feature.description && (
                        <span className="text-white/50 text-[10px] leading-snug block mt-0.5">{feature.description}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Price */}
            <motion.div variants={fade} className="flex items-center gap-2 mb-4">
              <span className="text-white/50 text-xs font-inter">À partir de</span>
              <span className={`text-3xl font-montserrat font-black text-transparent bg-clip-text ${price.gradientClasses}`}>{price.amount}</span>
              <span className="text-white/50 text-xs font-inter">{price.period}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fade} className="flex items-center gap-3">
              <motion.a
                href={cta.primary.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-2 px-5 py-2.5 ${cta.primary.gradientClasses} text-white rounded-xl font-montserrat font-bold text-sm shadow-lg`}
              >
                {cta.primary.text}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.a>
              <motion.a
                href={cta.secondary.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur border ${cta.secondary.borderColorClasses} text-white rounded-xl font-montserrat font-bold text-sm transition-colors duration-200`}
              >
                {cta.secondary.text}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* ── IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, x: order === 'right' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <div className="relative">
            {/* Glow ambiant */}
            <div className={`absolute -inset-6 bg-gradient-to-br ${getGlowColor()} to-transparent rounded-[2rem] blur-3xl pointer-events-none`} />

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
                  src={images[0]}
                  alt={id}
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
