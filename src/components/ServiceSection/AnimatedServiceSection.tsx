import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useScrollParallax } from '../../hooks/useScrollParallax';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { elegantFadeIn, staggerContainer, staggerItem } from '../../utils/animationVariants';

interface Feature {
  icon: LucideIcon;
  text: string;
}

interface AnimatedServiceSectionProps {
  id: string;
  videoSrc: string;
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
  noiseFilterId: string;
  noiseSeed: string;
  order?: 'left' | 'right';
}

export default function AnimatedServiceSection({
  id,
  videoSrc,
  gradientClasses,
  badge,
  title,
  description,
  features,
  price,
  cta,
  images,
  noiseFilterId,
  noiseSeed,
  order = 'left'
}: AnimatedServiceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const { y: videoY } = useScrollParallax(videoRef, { speed: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.6]);

  const btnMagnetic = useMagneticHover({ strength: 0.15 });

  const BadgeIcon = badge.icon;

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ opacity, scale }}
      className="relative min-h-screen lg:h-full flex items-center bg-black overflow-hidden py-16 lg:py-0"
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
          <source src={videoSrc} type="video/mp4" />
        </video>
        <motion.div
          style={{ opacity: gradientOpacity }}
          className={`absolute inset-0 ${gradientClasses}`}
        />
      </motion.div>

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            variants={elegantFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={order === 'left' ? 'lg:order-1' : 'lg:order-2'}
          >
            <motion.div
              className={`inline-flex items-center gap-2 ${badge.colorClasses} rounded-full px-5 py-3 mb-8`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
            >
              <BadgeIcon className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{badge.text}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              {title}
            </motion.div>

            <p className="text-sm md:text-lg lg:text-xl text-white/70 mb-6 md:mb-10 leading-relaxed font-inter">
              {description}
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(255, 255, 255, 0.05)'
                    }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className={`p-2 ${badge.colorClasses.replace('border', 'bg')} rounded-xl shrink-0`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                      <FeatureIcon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-white/80 text-sm leading-tight pt-2 font-medium">{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-10"
            >
              <div className="text-white/50 text-xs md:text-sm font-inter">À partir de</div>
              <div className={`text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-transparent bg-clip-text ${price.gradientClasses}`}>{price.amount}</div>
              <div className="text-white/50 text-xs md:text-sm font-inter">{price.period}</div>
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
                href={cta.primary.href}
                style={{ x: btnMagnetic.x, y: btnMagnetic.y }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <motion.div
                  className={`absolute -inset-1 ${cta.primary.gradientClasses} rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300`}
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className={`relative flex items-center justify-center gap-2 md:gap-3 px-5 md:px-6 py-3 md:py-4 ${cta.primary.gradientClasses} text-white rounded-xl font-montserrat font-bold shadow-2xl text-xs md:text-sm`}>
                  <span>{cta.primary.text}</span>
                </div>
              </motion.a>

              <motion.a
                href={cta.secondary.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 md:px-6 py-3 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border ${cta.secondary.borderColorClasses} text-white rounded-xl font-montserrat font-bold transition-all duration-300 text-center text-xs md:text-sm`}
              >
                {cta.secondary.text}
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: order === 'left' ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className={order === 'left' ? 'lg:order-2' : 'lg:order-1'}
          >
            <motion.div
              className="relative h-[350px] lg:h-[600px] rounded-2xl lg:rounded-3xl overflow-hidden"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className={`absolute -inset-4 ${price.gradientClasses.replace('bg-gradient-to-r', 'bg-gradient-to-r')} rounded-3xl blur-3xl opacity-20`}
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
                {images.map((src, index) => (
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
                      alt={`${id} ${index + 1}`}
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
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id={noiseFilterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={noiseSeed} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${noiseFilterId})`} />
        </svg>
      </div>
    </motion.section>
  );
}
