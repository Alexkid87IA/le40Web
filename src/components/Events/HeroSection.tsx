import { motion } from 'framer-motion';
import { Calendar, Star, ArrowRight, MapPin } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { value: '150', suffix: '+', label: 'Événements organisés', color: 'from-cyan-500 to-blue-500' },
  { value: '2500', suffix: '+', label: 'Participants satisfaits', color: 'from-amber-500 to-orange-500' },
  { value: '4.8', suffix: '/5', label: 'Note moyenne', color: 'from-emerald-500 to-teal-500' },
];

const AnimatedCounter = ({ value, suffix = '', delay = 0 }: { value: string; suffix: string; delay: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const timer = setTimeout(() => {
      setHasAnimated(true);
      const end = parseFloat(value);
      const duration = 2000;
      const increment = end / (duration / 16);

      let current = 0;
      const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(current);
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, hasAnimated]);

  const displayValue = value.includes('.') ? count.toFixed(1) : Math.floor(count);

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden py-16 lg:py-8">
      {/* Effets lumineux animés (la vidéo est maintenant au niveau de la page) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 lg:mb-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-inter font-medium text-white/80 tracking-wide uppercase">Événements Le 40</span>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-montserrat font-black text-white mb-3 lg:mb-2 leading-[1.1]"
          >
            NOS{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
                ÉVÉNEMENTS
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-amber-500/20 blur-2xl -z-10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base lg:text-sm xl:text-base text-white/70 font-inter max-w-2xl mx-auto mb-4 lg:mb-3 leading-relaxed"
          >
            Ateliers, conférences et événements networking pour développer votre réseau et vos compétences
          </motion.p>

          {/* Rating + Membres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 lg:mb-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/90 font-inter text-xs font-semibold">4.8/5</span>
              <span className="text-white/70 text-xs">(120+ avis)</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/70 font-inter text-xs">
                <span className="text-cyan-400 font-semibold">2500+ participants</span> satisfaits
              </span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-2 lg:gap-3 max-w-2xl mx-auto mb-5 lg:mb-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="relative group"
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.color} rounded-xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300`} />

                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-2 lg:p-3 group-hover:border-white/20 transition-all duration-300">
                  <div className={`text-xl sm:text-2xl lg:text-xl xl:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-0.5`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={1000 + index * 200} />
                  </div>
                  <p className="text-[10px] lg:text-xs text-white/60 uppercase tracking-wide font-inter">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 lg:mb-4"
          >
            <motion.a
              href="#upcoming-events"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-montserrat font-bold text-sm shadow-2xl">
                <Calendar className="w-4 h-4" />
                <span>Voir les événements</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="#organize-event"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold text-sm transition-all duration-300"
            >
              Organiser un événement
            </motion.a>
          </motion.div>

          {/* Info bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:gap-6"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-white/60 text-xs font-inter">40 Av. Saint Antoine, Marseille</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-2 border-black flex items-center justify-center text-white font-bold text-[10px]">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-white/60 text-xs font-inter">+120 membres actifs</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
