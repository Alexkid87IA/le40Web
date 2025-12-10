import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Clock, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Hero() {
  const videoUrl = "https://www.dropbox.com/scl/fi/os52ctwifhugugggq5la0/Bureau-pub-Direct.mp4?rlkey=fardhad45oxi1b18hdat7xxe6&st=zyh1l01i&dl=1";

  const [isMuted, setIsMuted] = useState(true);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (mobileVideoRef.current) {
      mobileVideoRef.current.muted = newMutedState;
    }
    if (desktopVideoRef.current) {
      desktopVideoRef.current.muted = newMutedState;
    }
  };

  return (
    <section className="relative min-h-screen lg:h-screen flex items-center overflow-hidden bg-black">
      {/* Desktop Background */}
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-br from-black via-zinc-950 to-black" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 w-full">
        {/* Mobile Layout: Vertical stack */}
        <div className="lg:hidden flex flex-col min-h-screen">
          {/* Video Section - Top (40% height) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[45vh] min-h-[320px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <video
                ref={mobileVideoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

              {/* Sound Control Button - Mobile */}
              <motion.button
                onClick={toggleMute}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-4 right-4 z-20 group"
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg opacity-60"
                  animate={isMuted ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center justify-center w-12 h-12 bg-black/60 backdrop-blur-xl border-2 border-amber-400/50 rounded-full group-hover:border-amber-400 transition-all duration-300">
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-amber-400" />
                  )}
                </div>
              </motion.button>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-orange-500/10 to-transparent pointer-events-none"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Content Section - Bottom (55% height) */}
          <div className="flex-1 px-4 py-8 flex flex-col justify-center bg-gradient-to-b from-black via-black to-zinc-950">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-xs font-inter font-medium text-white tracking-wide uppercase">4000m² Premium à Marseille</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl font-montserrat font-black text-white mb-3 leading-[1.1]"
            >
              DÉVELOPPEZ VOTRE{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
                  ACTIVITÉ
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 blur-2xl -z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base text-white/70 font-inter mb-6 leading-relaxed"
            >
              Coworking, bureaux privés, studios et salles de réunion.
              <span className="text-white font-semibold"> Rejoignez 120+ entrepreneurs.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-3 mb-6"
            >
              {[
                { value: '4000', suffix: 'm²', color: 'from-amber-500 to-orange-500' },
                { value: '120', suffix: '+', color: 'from-orange-500 to-amber-500' },
                { value: '50', suffix: '+', color: 'from-amber-600 to-orange-600' },
                { value: '24/7', suffix: '', color: 'from-orange-600 to-amber-600' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.color} rounded-xl opacity-0 group-active:opacity-50 blur-lg transition-opacity duration-300`} />
                  <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-3 group-active:border-white/30 transition-all duration-300 text-center">
                    <div className={`text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} whitespace-nowrap`}>
                      {stat.value}{stat.suffix}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-white font-inter text-xs font-semibold">4.9/5</span>
              </div>

              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-amber-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/80 font-inter text-xs sm:text-sm">
                  <span className="text-amber-400 font-semibold">127+ entreprises</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.a
                href="/contact"
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-xl opacity-75 blur-lg group-active:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white rounded-xl font-montserrat font-bold text-sm shadow-2xl">
                  <span>Réserver une visite</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>

              <motion.a
                href="/bureaux"
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-montserrat font-bold text-sm transition-all duration-300 text-center"
              >
                Découvrir nos espaces
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap items-center gap-3 mt-6 text-xs"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white/60 font-inter">Marseille Centre</span>
              </div>

              <div className="w-px h-4 bg-white/10" />

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white/60 font-inter">Accès 24/7</span>
              </div>

              <div className="w-px h-4 bg-white/10" />

              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 border-2 border-black flex items-center justify-center text-white font-bold text-[10px]">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-white/60 font-inter">+120</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout: Side by side */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr,420px] gap-8 items-center">

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-xs font-inter font-medium text-white tracking-wide uppercase">4000m² Premium à Marseille</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-montserrat font-black text-white mb-3 leading-[1.1]"
              >
                DÉVELOPPEZ VOTRE{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
                    ACTIVITÉ
                  </span>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 blur-2xl -z-10"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base lg:text-lg text-white/70 font-inter mb-6 leading-relaxed max-w-xl"
              >
                Coworking, bureaux privés, studios et salles de réunion.
                <span className="text-white font-semibold"> Rejoignez 120+ entrepreneurs.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-4 gap-3 mb-6"
              >
                {[
                  { value: '4000', suffix: 'm²', color: 'from-amber-500 to-orange-500' },
                  { value: '120', suffix: '+', color: 'from-orange-500 to-amber-500' },
                  { value: '50', suffix: '+', color: 'from-amber-600 to-orange-600' },
                  { value: '24/7', suffix: '', color: 'from-orange-600 to-amber-600' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -3 }}
                    className="relative group"
                  >
                    <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.color} rounded-xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300`} />
                    <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-3 group-hover:border-white/30 transition-all duration-300 text-center">
                      <div className={`text-xl lg:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} whitespace-nowrap`}>
                        {stat.value}{stat.suffix}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-white font-inter text-xs font-semibold">4.9/5</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/80 font-inter text-sm">
                    <span className="text-amber-400 font-semibold">127+ entreprises</span>
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ opacity: [0.5, 0.75, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white rounded-xl font-montserrat font-bold text-sm shadow-2xl">
                    <span>Réserver une visite</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.a>

                <motion.a
                  href="/bureaux"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold text-sm transition-all duration-300"
                >
                  Découvrir nos espaces
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap items-center gap-4 mt-6"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-white/60 text-xs font-inter">Marseille Centre</span>
                </div>

                <div className="w-px h-4 bg-white/10" />

                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-white/60 text-xs font-inter">Accès 24/7</span>
                </div>

                <div className="w-px h-4 bg-white/10" />

                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 border-2 border-black flex items-center justify-center text-white font-bold text-[10px]">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-white/60 text-xs font-inter">+120</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl">
                <video
                  ref={desktopVideoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                {/* Sound Control Button - Desktop */}
                <motion.button
                  onClick={toggleMute}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-6 right-6 z-20 group"
                >
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg opacity-60"
                    animate={isMuted ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.7, 0.4]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative flex items-center justify-center w-14 h-14 bg-black/60 backdrop-blur-xl border-2 border-amber-400/50 rounded-full group-hover:border-amber-400 group-hover:bg-black/80 transition-all duration-300">
                    {isMuted ? (
                      <VolumeX className="w-6 h-6 text-amber-400" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-amber-400" />
                    )}
                  </div>
                </motion.button>

                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-2xl blur-3xl -z-10"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

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
