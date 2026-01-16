import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Users, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            ref={(video) => {
              if (video) {
                video.playbackRate = 0.7;
              }
            }}
          >
            <source
              src="https://le40-cdn.b-cdn.net/videos/club/club-background.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/80" />

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
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 pt-32 sm:pt-36 md:pt-40 lg:pt-32 pb-24 sm:pb-28 md:pb-32 lg:pb-20 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-400/30 rounded-full px-6 py-3 mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-amber-400"
            />
            <span className="text-sm font-bold uppercase tracking-wider text-amber-300">Bientôt Disponible</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-black text-white mb-4 md:mb-6 leading-tight px-4"
          >
            REJOIGNEZ{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-red-400">
                LE CLUB
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-red-500/20 blur-3xl -z-10"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-inter max-w-4xl mx-auto mb-8 md:mb-10 lg:mb-12 leading-relaxed px-4"
          >
            La communauté d'entrepreneurs qui s'entraident et progressent ensemble.
            <span className="text-white font-semibold"> 15+ événements par mois.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 md:mb-10 lg:mb-12 px-4"
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500/10 border border-red-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                ))}
              </div>
              <span className="text-white/90 font-inter text-sm font-semibold">4.9/5</span>
              <span className="text-white/50 text-xs">(85+ avis)</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-red-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/70 font-inter text-sm">
                <span className="text-red-400 font-semibold">120+ membres actifs</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto mb-10 md:mb-12 lg:mb-16 px-5 sm:px-4"
          >
            {[
              { value: '50€', suffix: '/m', label: 'À partir de', color: 'from-red-500 via-rose-600 to-red-500' },
              { value: '15+', suffix: '', label: 'Événements/mois', color: 'from-rose-500 via-red-600 to-rose-500' },
              { value: '120+', suffix: '', label: 'Entrepreneurs', color: 'from-red-600 via-rose-500 to-red-600' },
              { value: '100%', suffix: '', label: 'Inclus', color: 'from-rose-600 via-red-500 to-rose-600' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.color} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />

                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 group-hover:border-white/20 transition-all duration-500">
                  <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1.5 sm:mb-2`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-white/60 uppercase tracking-wider font-inter leading-tight">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-10 lg:mb-12 px-5 sm:px-4"
          >
            <motion.a
              href="#notify"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-2 md:gap-3 px-5 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white rounded-xl font-montserrat font-bold text-sm sm:text-base md:text-lg shadow-2xl w-full sm:w-auto justify-center">
                <span>Être notifié du lancement</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold text-sm sm:text-base md:text-lg transition-all duration-300 w-full sm:w-auto text-center"
            >
              Découvrir les événements
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto px-4"
          >
            {[
              { icon: Calendar, text: 'Accès illimité events', color: 'text-red-400' },
              { icon: Users, text: 'Réseau entrepreneurs', color: 'text-rose-400' },
              { icon: TrendingUp, text: 'Ateliers croissance', color: 'text-red-400' },
              { icon: Sparkles, text: 'Sans engagement', color: 'text-rose-400' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 text-center group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <benefit.icon className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${benefit.color} mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <p className="text-white font-inter text-xs md:text-sm font-semibold">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
