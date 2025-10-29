import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Users, Calendar, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const stats = [
  { value: "120", suffix: "+", label: "Entrepreneurs", gradient: "from-orange-500 to-amber-600" },
  { value: "15", suffix: "+", label: "Events/mois", gradient: "from-cyan-500 to-blue-600" },
  { value: "50", suffix: "€", label: "Par mois", gradient: "from-emerald-500 to-teal-600" },
];

const quickBenefits = [
  "Accès illimité aux événements",
  "Réseau actif d'entrepreneurs",
  "Sans engagement"
];

const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const end = parseInt(value);
    const duration = 2000;
    const increment = end / (duration / 16);

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-amber-900/20" />

        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[128px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-[128px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-xl border border-orange-500/20 text-sm font-semibold text-orange-400">
            <Sparkles className="w-4 h-4" />
            Communauté Premium d'Entrepreneurs
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-black mb-6"
        >
          <span className="text-white">REJOIGNEZ</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
            LE CLUB
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8"
        >
          La communauté d'entrepreneurs qui s'entraident et progressent ensemble
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12"
        >
          {quickBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-white/80">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">{benefit}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 text-lg font-bold text-white"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl">
              <Calendar className="w-5 h-5" />
              <span>Rejoindre Maintenant</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 text-lg font-bold text-white bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Découvrir les Événements
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center group-hover:border-white/20 transition-all">
                <div className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-sm text-white/40"
        >
          Sans engagement • Résiliation à tout moment • Visite découverte gratuite
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white/40 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
