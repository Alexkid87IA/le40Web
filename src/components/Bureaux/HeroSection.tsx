import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Building2, Shield, MapPin, Users } from 'lucide-react';
import { useRef, useState } from 'react';
import VisitBookingModal from './VisitBookingModal';

export default function BureauHeroSection() {
  const containerRef = useRef(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center overflow-hidden bg-black">
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
              src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761803178/f6ec245d-506e-49b7-a107-01e3b561a567_1_mrh0xu.mp4#t=0.1"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[150px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 md:py-20 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6 md:mb-8">
              <Building2 className="w-4 md:w-5 h-4 md:h-5 text-blue-400" />
              <span className="text-xs md:text-sm font-inter font-medium text-white/80 tracking-wide uppercase">Tout Inclus · Prêt à Travailler</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-black text-white mb-4 md:mb-6 leading-tight"
          >
            BUREAUX{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400">
                PRIVATIFS
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20 blur-3xl -z-10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed font-inter px-4"
          >
            De 15m² à 100m². Équipement complet inclus : fibre, mobilier premium, salles de réunion, ménage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-20"
          >
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white rounded-xl font-montserrat font-bold shadow-2xl text-sm md:text-base">
                <Building2 className="w-4 md:w-5 h-4 md:h-5" />
                <span>Découvrir les bureaux</span>
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.button
              onClick={() => setIsBookingModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold transition-all duration-300 text-sm md:text-base"
            >
              Réserver une visite
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-10 md:mb-16"
          >
            {[
              { value: '100', suffix: 'm²', label: 'Surface max', color: 'from-blue-500 via-indigo-600 to-blue-500' },
              { value: '127', suffix: '+', label: 'Entreprises hébergées', color: 'from-indigo-500 via-blue-600 to-indigo-500' },
              { value: '24/7', suffix: '', label: 'Accès sécurisé', color: 'from-blue-600 via-indigo-500 to-blue-600' },
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

                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 group-hover:border-white/20 transition-all duration-500">
                  <div className={`text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-inter">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 border-2 border-black flex items-center justify-center text-white font-bold text-xs">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-white/60 text-xs md:text-sm font-inter">127+ entreprises actives</span>
            </div>

            <div className="hidden md:block w-px h-8 bg-white/10" />

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 md:w-4 h-3.5 md:h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/60 text-xs md:text-sm font-inter">4.9/5 moyenne</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseBureauxHero">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="1" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseBureauxHero)" />
        </svg>
      </div>

      <VisitBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
