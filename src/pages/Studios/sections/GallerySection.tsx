import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Camera, Users, Maximize2, Grid3X3, X, Info, Sparkles } from 'lucide-react';
import { studioSetups } from '../data/studioSetups';

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [selectedStudioDetail, setSelectedStudioDetail] = useState(null);
  const [currentDetailImage, setCurrentDetailImage] = useState(0);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      mouseX.set(x * 15);
      mouseY.set(y * 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % studioSetups.length);
      }, 5000);
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
      {/* Advanced Background Effects Layer */}
      <div className="absolute inset-0">
        {/* Animated nebula clouds */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 3, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[180px] animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[700px] h-[700px] bg-pink-600/15 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[220px]"></div>
          </motion.div>
        </div>

        {/* Floating particles with glow */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#3b82f6',
                boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 0.8, 0],
                scale: [0, Math.random() * 1.5 + 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Floating orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${['#a855f7', '#ec4899', '#3b82f6', '#10b981'][i]}30 0%, transparent 70%)`,
              left: `${15 + i * 20}%`,
              top: `${25 + i * 12}%`,
              filter: 'blur(35px)',
            }}
            animate={{
              x: [0, 80, -80, 0],
              y: [0, -80, 80, 0],
              scale: [1, 1.3, 1, 1.3, 1],
            }}
            transition={{
              duration: 18 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#gradient-gallery)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.4,
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient-gallery" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background Image avec enhanced Ken Burns effect */}
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
            animate={{
              scale: [1, 1.08],
              rotate: [0, 1, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90"></div>

          {/* Animated color overlay matching studio theme */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className={`absolute inset-0 bg-gradient-to-br ${currentStudio.gradient}`}
          />

          {/* Vignette effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
        </motion.div>
      </AnimatePresence>

      {/* Contenu principal centré with parallax */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ x: springX, y: springY }}
      >
        <div className="text-center max-w-5xl mx-auto px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Premium badge with glass morphism */}
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [1, 0.85, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-black/60 border border-white/20 rounded-full px-6 py-3 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/90 font-medium text-sm uppercase tracking-wider">
                        Studio {String(currentIndex + 1).padStart(2, '0')} / {studioSetups.length}
                      </span>
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Massive studio name with 3D effect */}
              <motion.div className="mb-6">
                <motion.h2
                  className="text-7xl md:text-8xl lg:text-9xl font-montserrat font-black leading-[0.9] tracking-tighter"
                  initial={{ opacity: 0, z: -100 }}
                  animate={{ opacity: 1, z: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative inline-block"
                  >
                    <span className="text-white relative z-10">{currentStudio.name}</span>
                    <motion.div
                      className={`absolute -inset-4 bg-gradient-to-r ${currentStudio.gradient} opacity-30 blur-3xl`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </motion.h2>
              </motion.div>

              {/* Animated subtitle with gradient */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-8"
              >
                <p className={`text-3xl md:text-4xl font-montserrat font-medium ${
                  currentStudio.color === 'purple' ? 'text-purple-400' :
                  currentStudio.color === 'emerald' ? 'text-emerald-400' :
                  currentStudio.color === 'blue' ? 'text-blue-400' :
                  currentStudio.color === 'pink' ? 'text-pink-400' :
                  currentStudio.color === 'violet' ? 'text-violet-400' :
                  currentStudio.color === 'red' ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {currentStudio.subtitle}
                </p>
              </motion.div>

              {/* Description with fade-in */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
              >
                {currentStudio.description}
              </motion.p>

              {/* Premium info badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center gap-8 mb-12 flex-wrap"
              >
                <div className="flex items-center gap-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-white/90 font-medium">{currentStudio.capacity}</span>
                </div>
                <div className="flex items-center gap-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
                  <Camera className="w-5 h-5 text-pink-400" />
                  <span className="text-white/90 font-medium">{currentStudio.equipment.cameras.split(' ')[0]} caméras</span>
                </div>
                <div className="relative">
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-40"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl px-8 py-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {currentStudio.basePrice}€
                      </span>
                      <span className="text-white/50 text-lg">/heure</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Premium CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                {/* Secondary button */}
                <motion.button
                  onClick={() => setSelectedStudioDetail(currentStudio)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl px-8 py-5 border border-white/10 hover:border-white/30 transition-all">
                    <div className="flex items-center gap-3 text-white">
                      <Camera className="w-5 h-5" />
                      <span className="font-montserrat font-semibold">Voir la galerie</span>
                    </div>
                  </div>
                </motion.button>

                {/* Primary button */}
                <motion.button
                  onClick={() => document.getElementById('setups')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-70 blur-xl group-hover:opacity-100 transition-opacity"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative bg-black border border-purple-500/50 backdrop-blur-xl rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
                    <div className="relative px-10 py-5 flex items-center gap-4">
                      <span className="text-white font-montserrat font-bold text-lg tracking-wide">
                        Réserver maintenant
                      </span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Premium Navigation Controls */}
      <motion.button
        onClick={goToPrev}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="group absolute left-8 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative w-16 h-16 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:border-purple-500/50 transition-all">
          <ChevronLeft className="w-8 h-8" />
        </div>
      </motion.button>
      <motion.button
        onClick={goToNext}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        className="group absolute right-8 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="absolute inset-0 bg-pink-600 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative w-16 h-16 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:border-pink-500/50 transition-all">
          <ChevronRight className="w-8 h-8" />
        </div>
      </motion.button>

      {/* Premium Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Premium Progress Bar */}
            <div className="flex gap-3">
              {studioSetups.map((studio, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  {/* Progress bar with gradient */}
                  <div className="relative h-1 rounded-full overflow-hidden bg-white/10">
                    <motion.div
                      className={`h-full rounded-full ${
                        currentIndex === index
                          ? `bg-gradient-to-r ${studio.gradient}`
                          : 'bg-white/30 group-hover:bg-white/50'
                      }`}
                      initial={{ width: currentIndex === index ? '48px' : '24px' }}
                      animate={{ width: currentIndex === index ? '48px' : '24px' }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Glow effect */}
                    {currentIndex === index && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${studio.gradient} blur-md`}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </div>

                  {/* Enhanced Tooltip */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <motion.div
                      initial={{ y: 10, scale: 0.9 }}
                      whileHover={{ y: 0, scale: 1 }}
                      className="bg-black/90 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2">
                        <studio.icon className={`w-4 h-4 ${
                          studio.color === 'purple' ? 'text-purple-400' :
                          studio.color === 'emerald' ? 'text-emerald-400' :
                          studio.color === 'blue' ? 'text-blue-400' :
                          studio.color === 'pink' ? 'text-pink-400' :
                          studio.color === 'violet' ? 'text-violet-400' :
                          studio.color === 'red' ? 'text-red-400' :
                          'text-yellow-400'
                        }`} />
                        <span className="text-sm text-white font-medium">{studio.name}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Premium Control Buttons */}
            <div className="flex items-center gap-4">
              {/* Play/Pause with glow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="group relative"
              >
                <div className={`absolute inset-0 ${isAutoPlaying ? 'bg-green-600' : 'bg-purple-600'} rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}></div>
                <div className="relative w-12 h-12 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:border-purple-500/50 transition-all">
                  {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </div>
              </motion.button>

              {/* Thumbnails toggle with glow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:border-blue-500/50 transition-all">
                  <Grid3X3 className="w-5 h-5" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Thumbnails Overlay */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-white/10 p-8 z-30"
          >
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-montserrat font-bold text-white">Tous nos studios</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowThumbnails(false)}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Grid with enhanced cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {studioSetups.map((studio, index) => (
                  <motion.button
                    key={studio.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentIndex(index);
                      setShowThumbnails(false);
                      setIsAutoPlaying(false);
                    }}
                    className="group relative"
                  >
                    {/* Card with gradient border */}
                    <div className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      currentIndex === index
                        ? `border-transparent bg-gradient-to-r ${studio.gradient} p-[2px]`
                        : 'border-white/10 hover:border-white/30'
                    }`}>
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <img
                          src={studio.image}
                          alt={studio.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                        {/* Studio info */}
                        <div className="absolute inset-0 flex flex-col justify-end p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <studio.icon className={`w-3 h-3 ${
                              studio.color === 'purple' ? 'text-purple-400' :
                              studio.color === 'emerald' ? 'text-emerald-400' :
                              studio.color === 'blue' ? 'text-blue-400' :
                              studio.color === 'pink' ? 'text-pink-400' :
                              studio.color === 'violet' ? 'text-violet-400' :
                              studio.color === 'red' ? 'text-red-400' :
                              'text-yellow-400'
                            }`} />
                            <p className="text-xs text-white font-bold truncate">{studio.name}</p>
                          </div>
                          <p className="text-[10px] text-white/60 truncate">{studio.subtitle}</p>
                        </div>
                        {/* Active indicator */}
                        {currentIndex === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                          />
                        )}
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${studio.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity -z-10`}></div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Header Section Title */}
      <div className="absolute top-8 left-8 z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <motion.div
            animate={{
              scaleX: [0, 1],
            }}
            transition={{ duration: 1, delay: 0.7 }}
            className="h-px w-16 bg-gradient-to-r from-purple-500 to-transparent"
          ></motion.div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-white/70 text-sm uppercase tracking-[0.2em] font-medium">Découvrez nos espaces</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 right-8 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs uppercase tracking-wider writing-mode-vertical-rl rotate-180">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </motion.div>

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