import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, MapPin } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden py-16 lg:py-8">
      {/* Effets lumineux animés (la vidéo est au niveau de la page) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1]
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
              <Users className="w-4 h-4 text-red-400" />
              <span className="text-xs font-inter font-medium text-white/80 tracking-wide uppercase">Communauté Entrepreneurs</span>
            </div>
          </motion.div>

          {/* Badge Bientôt disponible */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-3"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-amber-400"
            />
            <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">Bientôt Disponible</span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-montserrat font-black text-white mb-3 lg:mb-4 leading-[1.1]"
          >
            REJOIGNEZ{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-red-400">
                LE CLUB
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-red-500/20 blur-2xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-white/70 font-inter max-w-2xl mx-auto mb-4 lg:mb-5 leading-relaxed"
          >
            La communauté d'entrepreneurs qui s'entraident et progressent ensemble.
            <span className="text-white font-semibold"> 15+ événements par mois.</span>
          </motion.p>

          {/* Rating + Membres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 lg:mb-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/90 font-inter text-xs font-semibold">4.9/5</span>
              <span className="text-white/70 text-xs">(85+ avis)</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-red-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/70 font-inter text-xs">
                <span className="text-red-400 font-semibold">120+ membres</span> actifs
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
            {[
              { value: '50€', suffix: '/m', label: 'À partir de', color: 'from-red-500 to-rose-500' },
              { value: '15+', suffix: '', label: 'Events/mois', color: 'from-rose-500 to-red-500' },
              { value: '120+', suffix: '', label: 'Entrepreneurs', color: 'from-red-500 to-rose-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="relative group"
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.color} rounded-xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300`} />

                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-2 lg:p-3 group-hover:border-white/20 transition-all duration-300">
                  <div className={`text-xl sm:text-2xl lg:text-xl xl:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-0.5`}>
                    {stat.value}{stat.suffix}
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
              href="#notify"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-montserrat font-bold text-sm shadow-2xl">
                <Users className="w-4 h-4" />
                <span>Être notifié du lancement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="/events"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold text-sm transition-all duration-300"
            >
              Découvrir les événements
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
              <MapPin className="w-4 h-4 text-red-400" />
              <span className="text-white/60 text-xs font-inter">40 Av. Saint Antoine, Marseille</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-rose-500 border-2 border-black flex items-center justify-center text-white font-bold text-[10px]">
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
