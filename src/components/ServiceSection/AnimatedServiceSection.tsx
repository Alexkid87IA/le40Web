import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useScrollParallax } from '../../hooks/useScrollParallax';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { elegantFadeIn, staggerContainer, staggerItem } from '../../utils/animationVariants';

interface Feature {
  icon: LucideIcon;
  text: string;
  description?: string;
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

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 1]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 0.8, 0.75]);

  const btnMagnetic = useMagneticHover({ strength: 0.15 });

  const BadgeIcon = badge.icon;

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ opacity, scale, willChange: 'opacity' }}
      className="relative min-h-screen flex items-center bg-black overflow-hidden py-12 lg:py-16 laptop:py-10 xl:py-20 transform-gpu"
    >
      <motion.div
        ref={videoRef}
        style={{ y: videoY, willChange: 'transform' }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ willChange: 'opacity' }}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 laptop:px-8 xl:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 laptop:gap-8 xl:gap-16 items-center">
          <motion.div
            variants={elegantFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px', amount: 0.2 }}
            className={order === 'left' ? 'lg:order-1' : 'lg:order-2'}
          >
            <motion.div
              className={`inline-flex items-center gap-2 ${badge.colorClasses} rounded-full px-5 py-3 mb-8`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <BadgeIcon className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{badge.text}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {title}
            </motion.div>

            <p className="text-sm md:text-base lg:text-lg laptop:text-base xl:text-xl text-white/70 mb-6 md:mb-8 laptop:mb-5 leading-relaxed font-inter">
              {description}
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 laptop:gap-3 mb-6 md:mb-8 laptop:mb-5"
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
                    className="flex items-start gap-3 bg-white/8 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-4 cursor-pointer hover:bg-white/12 transition-colors"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className={`p-2 ${badge.colorClasses.replace('border', 'bg')} rounded-xl shrink-0`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                      <FeatureIcon className="w-5 h-5" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-white text-sm md:text-base leading-tight font-semibold mb-1">{feature.text}</div>
                      {feature.description && (
                        <div className="text-white/50 text-xs leading-snug">{feature.description}</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-wrap items-center gap-2 md:gap-4 laptop:gap-2 mb-6 md:mb-8 laptop:mb-5"
            >
              <div className="text-white/50 text-xs md:text-sm font-inter">À partir de</div>
              <div className={`text-3xl md:text-4xl lg:text-4xl laptop:text-3xl xl:text-5xl font-montserrat font-black text-transparent bg-clip-text ${price.gradientClasses}`}>{price.amount}</div>
              <div className="text-white/50 text-xs md:text-sm font-inter">{price.period}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
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
            initial={{ opacity: 0, x: order === 'left' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className={order === 'left' ? 'lg:order-2' : 'lg:order-1'}
          >
            <motion.div
              className="relative h-[350px] lg:h-[450px] laptop:h-[350px] xl:h-[550px] rounded-2xl lg:rounded-3xl overflow-hidden"
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
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 4,
                      repeat: Infinity,
                      repeatDelay: 12
                    }}
                    className="absolute inset-0"
                    style={{
                      opacity: 0,
                      animation: `fadeInOut 16s infinite ${index * 4}s`,
                      willChange: 'opacity'
                    }}
                  >
                    <motion.img
                      src={src}
                      alt={`${id} ${index + 1}`}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: [1, 1.05, 1],
                        x: [0, -5, 0],
                        y: [0, -3, 0]
                      }}
                      transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      style={{ willChange: 'transform' }}
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
