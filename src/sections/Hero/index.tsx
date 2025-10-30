import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Wifi } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[75vh] w-full overflow-hidden bg-black">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://cdn.midjourney.com/3b057cf6-d2a9-4db4-af88-da9df9729338/0_2.png)',
          }}
        />
        {/* Overlay renforcé UNIQUEMENT à droite */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        {/* Overlay supplémentaire côté droit pour lisibilité */}
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-l from-black/75 via-black/40 to-transparent" />
      </div>

      {/* Contenu - TRÈS HAUT */}
      <div className="relative h-full flex items-start justify-center xl:justify-end pt-12 sm:pt-14 md:pt-16 px-6 sm:px-8 md:px-10 lg:px-12 xl:pr-24 2xl:pr-32 z-10">
        <motion.div
          className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl space-y-2 md:space-y-2.5 text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Badge - Mini */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-1.5 px-4 md:px-5 py-1 md:py-1.5 bg-black/60 backdrop-blur-2xl border border-white/40 rounded-full shadow-2xl"
          >
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50" />
            <span 
              className="text-white text-[10px] md:text-xs font-bold tracking-wider"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,1), 0 1px 5px rgba(0,0,0,0.8)' }}
            >
              Espace Premium à Marseille
            </span>
          </motion.div>

          {/* Titre - Compact */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="font-black leading-[1.05] tracking-tight"
          >
            <span 
              className="block text-[clamp(1.4rem,3.8vw,3.2rem)] md:text-[clamp(1.6rem,4.2vw,3.6rem)] lg:text-[clamp(1.8rem,4.6vw,4rem)] text-white mb-0"
              style={{ 
                textShadow: '0 8px 40px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)' 
              }}
            >
              Développez Votre Activité
            </span>
            <span 
              className="block text-[clamp(1.4rem,3.8vw,3.2rem)] md:text-[clamp(1.6rem,4.2vw,3.6rem)] lg:text-[clamp(1.8rem,4.6vw,4rem)] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent"
            >
              Dans un Espace de 4000m²
            </span>
          </motion.h1>

          {/* Description - Mini */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-[11px] md:text-xs lg:text-sm leading-[1.3] font-medium"
            style={{ 
              textShadow: '0 5px 25px rgba(0,0,0,1), 0 3px 15px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9), 0 1px 5px rgba(0,0,0,0.7)' 
            }}
          >
            Rejoignez 120+ entrepreneurs ambitieux dans un écosystème complet avec coworking premium, bureaux privés et studios professionnels à Marseille.
          </motion.p>

          {/* Boutons - Mini */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-2 pt-0"
          >
            <motion.a
              href="/reservation"
              className="group relative rounded-xl px-5 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-white font-bold text-xs md:text-sm tracking-wide">
                  Réserver une visite
                </span>
                <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="/bureaux"
              className="px-5 md:px-6 py-2 md:py-2.5 rounded-xl bg-white/15 backdrop-blur-2xl border-2 border-white/40 text-white font-bold text-xs md:text-sm hover:bg-white/25 hover:border-white/60 transition-all duration-300 shadow-xl text-center"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              Découvrir nos espaces
            </motion.a>
          </motion.div>

          {/* Stats - Ultra compactes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-3 gap-3 md:gap-4 pt-3 md:pt-4 border-t border-white/30 mt-3 md:mt-4"
          >
            <div>
              <MapPin 
                className="w-3 md:w-3.5 h-3 md:h-3.5 text-amber-400 mb-1" 
                style={{ filter: 'drop-shadow(0 3px 12px rgba(251, 191, 36, 0.9))' }} 
              />
              <div 
                className="text-base md:text-lg lg:text-xl font-black text-white mb-0"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,1), 0 1px 8px rgba(0,0,0,0.9)' }}
              >
                4000<span className="text-amber-400">m²</span>
              </div>
              <div 
                className="text-[9px] md:text-[10px] text-white font-semibold"
                style={{ textShadow: '0 3px 15px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)' }}
              >
                Surface Premium
              </div>
            </div>

            <div>
              <Users 
                className="w-3 md:w-3.5 h-3 md:h-3.5 text-amber-400 mb-1" 
                style={{ filter: 'drop-shadow(0 3px 12px rgba(251, 191, 36, 0.9))' }} 
              />
              <div 
                className="text-base md:text-lg lg:text-xl font-black text-white mb-0"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,1), 0 1px 8px rgba(0,0,0,0.9)' }}
              >
                120<span className="text-amber-400">+</span>
              </div>
              <div 
                className="text-[9px] md:text-[10px] text-white font-semibold"
                style={{ textShadow: '0 3px 15px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)' }}
              >
                Entrepreneurs
              </div>
            </div>

            <div>
              <Wifi 
                className="w-3 md:w-3.5 h-3 md:h-3.5 text-amber-400 mb-1" 
                style={{ filter: 'drop-shadow(0 3px 12px rgba(251, 191, 36, 0.9))' }} 
              />
              <div 
                className="text-base md:text-lg lg:text-xl font-black text-white mb-0"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,1), 0 1px 8px rgba(0,0,0,0.9)' }}
              >
                1<span className="text-amber-400">Gb/s</span>
              </div>
              <div 
                className="text-[9px] md:text-[10px] text-white font-semibold"
                style={{ textShadow: '0 3px 15px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)' }}
              >
                Fibre Optique
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Transition douce vers la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/60 pointer-events-none z-20" />
    </section>
  );
}