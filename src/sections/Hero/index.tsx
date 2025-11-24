import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Wifi } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-black">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://cdn.midjourney.com/3b057cf6-d2a9-4db4-af88-da9df9729338/0_2.png)',
          }}
        />
        {/* Overlay renforcé - plus fort sur mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/70 md:from-transparent md:via-black/20 md:to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 md:from-black/40 md:to-black/50" />
        {/* Overlay supplémentaire côté droit pour lisibilité */}
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-l from-black/75 via-black/40 to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative min-h-[100dvh] flex items-center md:items-start justify-center xl:justify-end pt-24 md:pt-14 lg:pt-16 pb-8 px-4 sm:px-6 md:px-10 lg:px-12 xl:pr-24 2xl:pr-32 z-10">
        <motion.div
          className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl space-y-3 md:space-y-2.5 text-center md:text-left w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Badge - Mini */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-1.5 px-4 md:px-5 py-1.5 md:py-2 bg-black/60 backdrop-blur-2xl border border-white/40 rounded-full shadow-2xl mx-auto md:mx-0"
          >
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50" />
            <span
              className="text-white text-[11px] md:text-xs font-bold tracking-wider"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,1), 0 1px 5px rgba(0,0,0,0.8)' }}
            >
              Espace Premium à Marseille
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="font-black leading-[1.1] tracking-tight"
          >
            <span
              className="block text-[clamp(1.75rem,7vw,2.5rem)] md:text-[clamp(2rem,4.5vw,3.6rem)] lg:text-[clamp(2.5rem,4.8vw,4rem)] text-white mb-1"
              style={{
                textShadow: '0 8px 40px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)'
              }}
            >
              Développez Votre Activité
            </span>
            <span
              className="block text-[clamp(1.75rem,7vw,2.5rem)] md:text-[clamp(2rem,4.5vw,3.6rem)] lg:text-[clamp(2.5rem,4.8vw,4rem)] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent"
            >
              Dans un Espace de 4000m²
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-sm md:text-xs lg:text-sm leading-[1.5] md:leading-[1.4] font-medium px-2 md:px-0"
            style={{
              textShadow: '0 5px 25px rgba(0,0,0,1), 0 3px 15px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9), 0 1px 5px rgba(0,0,0,0.7)'
            }}
          >
            Rejoignez 120+ entrepreneurs ambitieux dans un écosystème complet avec coworking premium, bureaux privés et studios professionnels à Marseille.
          </motion.p>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <motion.a
              href="/contact"
              className="group relative rounded-xl px-6 py-3.5 md:py-3 bg-gradient-to-r from-orange-500 to-orange-600 shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-white font-bold text-sm md:text-sm tracking-wide">
                  Réserver une visite
                </span>
                <ArrowRight className="w-4 md:w-4 h-4 md:h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="/bureaux"
              className="px-6 py-3.5 md:py-3 rounded-xl bg-white/15 backdrop-blur-2xl border-2 border-white/40 text-white font-bold text-sm md:text-sm hover:bg-white/25 hover:border-white/60 transition-all duration-300 shadow-xl text-center"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              Découvrir nos espaces
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-3 gap-4 md:gap-5 pt-4 md:pt-4 border-t border-white/30 mt-4 md:mt-4"
          >
            <div className="text-center md:text-left">
              <MapPin
                className="w-4 md:w-4 h-4 md:h-4 text-amber-400 mb-1.5 mx-auto md:mx-0"
                style={{ filter: 'drop-shadow(0 3px 12px rgba(251, 191, 36, 0.9))' }}
              />
              <div
                className="text-lg md:text-xl lg:text-2xl font-black text-white mb-0.5"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,1), 0 1px 8px rgba(0,0,0,0.9)' }}
              >
                50<span className="text-amber-400">+</span>
              </div>
              <div
                className="text-[10px] md:text-[11px] text-white font-semibold leading-tight"
                style={{ textShadow: '0 3px 15px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)' }}
              >
                Espaces<br className="md:hidden" /> Différents
              </div>
            </div>

            <div className="text-center md:text-left">
              <Users
                className="w-4 md:w-4 h-4 md:h-4 text-amber-400 mb-1.5 mx-auto md:mx-0"
                style={{ filter: 'drop-shadow(0 3px 12px rgba(251, 191, 36, 0.9))' }}
              />
              <div
                className="text-lg md:text-xl lg:text-2xl font-black text-white mb-0.5"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,1), 0 1px 8px rgba(0,0,0,0.9)' }}
              >
                120<span className="text-amber-400">+</span>
              </div>
              <div
                className="text-[10px] md:text-[11px] text-white font-semibold leading-tight"
                style={{ textShadow: '0 3px 15px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)' }}
              >
                Entrepreneurs
              </div>
            </div>

            <div className="text-center md:text-left">
              <Wifi
                className="w-4 md:w-4 h-4 md:h-4 text-amber-400 mb-1.5 mx-auto md:mx-0"
                style={{ filter: 'drop-shadow(0 3px 12px rgba(251, 191, 36, 0.9))' }}
              />
              <div
                className="text-lg md:text-xl lg:text-2xl font-black text-white mb-0.5"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,1), 0 1px 8px rgba(0,0,0,0.9)' }}
              >
                1<span className="text-amber-400">Gb/s</span>
              </div>
              <div
                className="text-[10px] md:text-[11px] text-white font-semibold leading-tight"
                style={{ textShadow: '0 3px 15px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)' }}
              >
                Fibre<br className="md:hidden" /> Optique
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}