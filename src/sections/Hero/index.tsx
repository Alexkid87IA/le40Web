import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, MapPin, Building2 } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
            className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                ref={(el) => {
                  if (el) el.playbackRate = 1;
                }}
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-3xl blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 md:mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6 md:mb-8">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-xs md:text-sm font-inter font-medium text-white/90 tracking-wide uppercase">Espace Premium à Marseille</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-black text-white mb-4 md:mb-6 leading-tight"
            >
              DÉVELOPPEZ VOTRE{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
                  ACTIVITÉ
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 blur-3xl -z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-inter mb-8 md:mb-10 lg:mb-12 leading-relaxed"
            >
              4000m² d'espaces premium à Marseille. Coworking, bureaux privés, studios et salles de réunion.
              <span className="text-white font-semibold"> Rejoignez 120+ entrepreneurs.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 md:mb-10 lg:mb-12"
            >
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/20 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-white/90 font-inter text-sm font-semibold">4.9/5</span>
                <span className="text-white/50 text-xs">(120+ avis)</span>
              </div>

              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-amber-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/70 font-inter text-sm">
                  <span className="text-amber-400 font-semibold">127+ entreprises actives</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-10 lg:mb-12"
            >
              {[
                { value: '4000', suffix: 'm²', label: 'Surface totale', color: 'from-amber-500 via-orange-600 to-amber-500' },
                { value: '120', suffix: '+', label: 'Entrepreneurs', color: 'from-orange-500 via-amber-600 to-orange-500' },
                { value: '50', suffix: '+', label: 'Espaces', color: 'from-amber-600 via-orange-500 to-amber-600' },
                { value: '1', suffix: 'Gb/s', label: 'Fibre dédiée', color: 'from-orange-600 via-amber-500 to-orange-600' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />

                  <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-6 group-hover:border-white/20 transition-all duration-500 flex flex-col items-center justify-center min-h-[100px]">
                    <div className={`text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1 whitespace-nowrap`}>
                      {stat.value}{stat.suffix}
                    </div>
                    <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider font-inter text-center whitespace-nowrap">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 md:mb-10 lg:mb-12"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 lg:px-10 py-4 md:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white rounded-xl font-montserrat font-bold text-base md:text-lg shadow-2xl">
                  <span>Réserver une visite</span>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.a>

              <motion.a
                href="/bureaux"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 lg:px-10 py-4 md:py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold text-base md:text-lg transition-all duration-300 text-center"
              >
                Découvrir nos espaces
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 border-2 border-black flex items-center justify-center text-white font-bold text-xs">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-white/60 text-xs md:text-sm font-inter">127+ entreprises actives</span>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/10" />

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-white/60 text-xs md:text-sm font-inter">Au cœur de Marseille</span>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/10" />

              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-white/60 text-xs md:text-sm font-inter">Accès 24/7</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseHomeHero">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseHomeHero)" />
        </svg>
      </div>
    </section>
  );
}
