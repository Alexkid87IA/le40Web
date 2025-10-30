import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Wifi, Sparkles, Building2, Zap } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Image de fond avec overlay sophistiqué */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://cdn.midjourney.com/3b057cf6-d2a9-4db4-af88-da9df9729338/0_2.png)',
          }}
        />
        {/* Overlays gradients multiples pour effet premium */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-l from-black/90 via-black/60 to-transparent" />
        
        {/* Effet de vignette subtil */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />
      </div>

      {/* Orbes lumineux animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/2 w-[350px] h-[350px] bg-yellow-500/10 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, 30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Bruit/grain pour texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseHero">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseHero)" />
        </svg>
      </div>

      {/* Contenu - Aligné à droite et remonté haut */}
      <div className="relative h-full flex items-start justify-center xl:justify-end pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-6 sm:px-8 md:px-10 lg:px-12 xl:pr-24 2xl:pr-32 z-10">
        <motion.div
          className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl space-y-2 md:space-y-2.5 text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Badge Premium avec effet glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2.5 relative"
          >
            {/* Effet de glow autour du badge */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full opacity-50 blur-md"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative flex items-center gap-2 px-5 md:px-6 py-2 md:py-2.5 bg-black/80 backdrop-blur-2xl border border-amber-500/40 rounded-full shadow-2xl">
              <motion.div
                className="w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/80"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Sparkles className="w-3.5 md:w-4 h-3.5 md:h-4 text-amber-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wider">
                Espace Premium à Marseille
              </span>
            </div>
          </motion.div>

          {/* Titre principal avec effet de glow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="relative"
          >
            <h1 className="font-black leading-[1.08] tracking-tight">
              <span className="block text-[clamp(1.6rem,4.2vw,3.4rem)] md:text-[clamp(1.8rem,4.6vw,3.8rem)] lg:text-[clamp(2rem,5vw,4.2rem)] text-white mb-1">
                Développez Votre Activité
              </span>
              
              <span className="relative inline-block">
                <span className="block text-[clamp(1.6rem,4.2vw,3.4rem)] md:text-[clamp(1.8rem,4.6vw,3.8rem)] lg:text-[clamp(2rem,5vw,4.2rem)] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
                  Dans un Espace de 4000m²
                </span>
                
                {/* Effet glow sous le texte gradient */}
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-amber-500/30 blur-3xl -z-10"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Description avec backdrop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-orange-500/5 rounded-2xl blur-xl" />
            <p className="relative text-white text-xs md:text-sm lg:text-base leading-[1.5] font-medium backdrop-blur-sm bg-black/20 p-3.5 md:p-4 rounded-xl border border-white/10">
              Rejoignez <span className="text-amber-400 font-bold">120+ entrepreneurs ambitieux</span> dans un écosystème complet avec coworking premium, bureaux privés et studios professionnels à Marseille.
            </p>
          </motion.div>

          {/* Boutons avec effets premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-2.5 pt-1"
          >
            {/* Bouton principal avec glow animé */}
            <motion.a
              href="/reservation"
              className="group relative"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Effet de glow qui pulse */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative flex items-center justify-center gap-2.5 px-6 md:px-7 py-3 md:py-3.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-xl shadow-2xl">
                <Zap className="w-4 md:w-4.5 h-4 md:h-4.5 text-white" />
                <span className="text-white font-bold text-sm md:text-base tracking-wide">
                  Réserver une visite
                </span>
                <ArrowRight className="w-4 md:w-4.5 h-4 md:h-4.5 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            {/* Bouton secondaire avec backdrop blur */}
            <motion.a
              href="/bureaux"
              className="group relative"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative px-6 md:px-7 py-3 md:py-3.5 rounded-xl bg-white/10 backdrop-blur-2xl border-2 border-white/30 hover:border-amber-500/50 text-white font-bold text-sm md:text-base transition-all duration-300 shadow-xl text-center group-hover:bg-white/15">
                <span className="flex items-center justify-center gap-2">
                  <Building2 className="w-4 md:w-4.5 h-4 md:h-4.5" />
                  Découvrir nos espaces
                </span>
              </div>
            </motion.a>
          </motion.div>

          {/* Stats Premium avec cartes individuelles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-3 gap-2.5 md:gap-3 pt-2 md:pt-2.5"
          >
            {/* Stat 1 - Surface */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              {/* Effet glow au hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
              
              <div className="relative bg-black/60 backdrop-blur-2xl border border-white/20 group-hover:border-amber-500/40 rounded-2xl p-3 md:p-4 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1.5 bg-amber-500/20 rounded-lg">
                    <MapPin className="w-3.5 md:w-4 h-3.5 md:h-4 text-amber-400" />
                  </div>
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-0.5">
                  4000<span className="text-amber-400">m²</span>
                </div>
                <div className="text-[10px] md:text-xs text-white/70 font-semibold">
                  Surface Premium
                </div>
              </div>
            </motion.div>

            {/* Stat 2 - Entrepreneurs */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
              
              <div className="relative bg-black/60 backdrop-blur-2xl border border-white/20 group-hover:border-orange-500/40 rounded-2xl p-3 md:p-4 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1.5 bg-orange-500/20 rounded-lg">
                    <Users className="w-3.5 md:w-4 h-3.5 md:h-4 text-orange-400" />
                  </div>
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-0.5">
                  120<span className="text-orange-400">+</span>
                </div>
                <div className="text-[10px] md:text-xs text-white/70 font-semibold">
                  Entrepreneurs
                </div>
              </div>
            </motion.div>

            {/* Stat 3 - Fibre */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
              
              <div className="relative bg-black/60 backdrop-blur-2xl border border-white/20 group-hover:border-amber-500/40 rounded-2xl p-3 md:p-4 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1.5 bg-yellow-500/20 rounded-lg">
                    <Wifi className="w-3.5 md:w-4 h-3.5 md:h-4 text-yellow-400" />
                  </div>
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-0.5">
                  1<span className="text-yellow-400">Gb/s</span>
                </div>
                <div className="text-[10px] md:text-xs text-white/70 font-semibold">
                  Fibre Optique
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Badge de confiance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-3 pt-1"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-black flex items-center justify-center text-white text-xs font-bold"
                >
                  {i === 4 ? '+' : ''}
                </div>
              ))}
            </div>
            <div className="text-white/60 text-xs font-medium">
              <span className="text-amber-400 font-bold">120+</span> professionnels nous font confiance
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
}