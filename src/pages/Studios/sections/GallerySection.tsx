import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Camera, Users, Maximize2, Grid3X3, X, Info } from 'lucide-react';
import { studioSetups } from '../data/studioSetups';

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [selectedStudioDetail, setSelectedStudioDetail] = useState(null);
  const [currentDetailImage, setCurrentDetailImage] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % studioSetups.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, currentIndex]);

  const currentStudio = studioSetups[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % studioSetups.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + studioSetups.length) % studioSetups.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Background Image avec Ken Burns effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            src={currentStudio.image}
            alt={currentStudio.name}
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.1] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
          {/* Gradient overlays pour la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
        </motion.div>
      </AnimatePresence>

      {/* Contenu principal centré */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Numéro du studio */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-6"
              >
                <span className="text-8xl font-montserrat font-thin text-white/20">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
              </motion.div>

              {/* Nom du studio */}
              <h2 className="text-6xl md:text-8xl font-montserrat font-thin text-white mb-4 tracking-wide">
                {currentStudio.name}
              </h2>

              {/* Sous-titre avec style */}
              <p className="text-2xl md:text-3xl text-white/80 font-light mb-8">
                {currentStudio.subtitle}
              </p>

              {/* Description courte */}
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                {currentStudio.description}
              </p>

              {/* Tags visuels */}
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="w-5 h-5" />
                  <span>{currentStudio.capacity}</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-2 text-white/80">
                  <Camera className="w-5 h-5" />
                  <span>{currentStudio.equipment.cameras.split(' ')[0]} caméras</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="text-white/80">
                  <span className="text-2xl font-light">{currentStudio.basePrice}€</span>
                  <span className="text-sm">/heure</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStudioDetail(currentStudio)}
                  className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all inline-flex items-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Voir plus de photos
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('setups')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-white/90 transition-all inline-flex items-center gap-3"
                >
                  Réserver ce studio
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation latérale gauche et droite */}
      <button
        onClick={goToPrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Progress dots */}
            <div className="flex gap-2">
              {studioSetups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className="group relative"
                >
                  <div className={`h-1 transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-12 bg-white' 
                      : 'w-6 bg-white/30 group-hover:bg-white/50'
                  }`} />
                  {/* Tooltip au hover */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg whitespace-nowrap">
                      <span className="text-xs text-white">{studioSetups[index].name}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </motion.button>

              {/* Thumbnails toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <Grid3X3 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails overlay */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl p-8 z-30"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-7 gap-4">
                {studioSetups.map((studio, index) => (
                  <motion.button
                    key={studio.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentIndex(index);
                      setShowThumbnails(false);
                      setIsAutoPlaying(false);
                    }}
                    className={`relative aspect-video rounded-lg overflow-hidden ${
                      currentIndex === index ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={studio.image}
                      alt={studio.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs text-white font-medium truncate">{studio.name}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section title */}
      <div className="absolute top-8 left-8 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-px bg-white/50"></div>
          <span className="text-white/50 text-sm uppercase tracking-wider">Découvrez nos espaces</span>
        </motion.div>
      </div>

      {/* Popup détail avec galerie photos */}
      <AnimatePresence>
        {selectedStudioDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col lg:flex-row">
              {/* Zone galerie photo - côté gauche */}
              <div className="flex-1 relative bg-black">
                {/* Image principale */}
                <div className="h-full flex items-center justify-center p-4">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentDetailImage}
                      // Pour la démo, on utilise la même image. Remplacez par un tableau d'images réelles
                      src={selectedStudioDetail.image}
                      alt={`${selectedStudioDetail.name} - Photo ${currentDetailImage + 1}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </AnimatePresence>
                </div>

                {/* Navigation photos */}
                <button
                  onClick={() => setCurrentDetailImage(prev => prev === 0 ? 4 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentDetailImage(prev => prev === 4 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Compteur photos */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm">{currentDetailImage + 1} / 5</span>
                </div>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDetailImage(index)}
                      className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        currentDetailImage === index ? 'border-white' : 'border-white/30 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={selectedStudioDetail.image}
                        alt={`Thumb ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Zone informations - côté droit */}
              <div className="w-full lg:w-[480px] bg-zinc-900 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-montserrat font-light text-white mb-2">
                      {selectedStudioDetail.name}
                    </h2>
                    <p className="text-lg text-purple-400">{selectedStudioDetail.subtitle}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedStudioDetail(null);
                      setCurrentDetailImage(0);
                    }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Description détaillée */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-purple-400" />
                    Description
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {selectedStudioDetail.description}
                  </p>
                  <p className="text-white/70 leading-relaxed mt-4">
                    Parfait pour : {selectedStudioDetail.usage}
                  </p>
                </div>

                {/* Specs techniques */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Équipement professionnel</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/50 mb-1">Caméras</p>
                      <p className="text-white">{selectedStudioDetail.equipment.cameras}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/50 mb-1">Audio</p>
                      <p className="text-white">{selectedStudioDetail.equipment.audio}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/50 mb-1">Éclairage</p>
                      <p className="text-white">{selectedStudioDetail.equipment.light}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/50 mb-1">Extras</p>
                      <p className="text-white">{selectedStudioDetail.equipment.extras}</p>
                    </div>
                  </div>
                </div>

                {/* Infos pratiques */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Informations pratiques</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-xl p-4">
                      <p className="text-sm text-purple-400 mb-1">Capacité</p>
                      <p className="text-white font-medium">{selectedStudioDetail.capacity}</p>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-xl p-4">
                      <p className="text-sm text-purple-400 mb-1">Durée conseillée</p>
                      <p className="text-white font-medium">{selectedStudioDetail.recommendedDuration}</p>
                    </div>
                  </div>
                </div>

                {/* Prix et CTA */}
                <div className="sticky bottom-0 bg-zinc-900 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-white/50">À partir de</p>
                      <p className="text-3xl font-light text-white">{selectedStudioDetail.basePrice}€<span className="text-lg text-white/50">/heure</span></p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedStudioDetail(null);
                      document.getElementById('setups')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-medium"
                  >
                    Réserver ce studio
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}