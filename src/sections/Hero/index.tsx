import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, MapPin, Users, Star, Sparkles, Building2, Calendar, Phone, ChevronLeft, ChevronRight, Pause } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920",
    category: "ESPACE PREMIUM",
    title: "L'EXCELLENCE AU CŒUR DE MARSEILLE",
    subtitle: "Votre réussite commence ici",
    description: "Rejoignez une communauté d'entrepreneurs visionnaires dans un environnement premium conçu pour l'excellence et l'innovation au cœur de la cité phocéenne.",
    color: "from-violet-500 via-fuchsia-500 to-violet-600",
    glowColor: "shadow-violet-500/30",
    bgOverlay: "from-violet-900/40 via-fuchsia-900/20 to-violet-900/40"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920",
    category: "DOMICILIATION",
    title: "VOTRE ADRESSE PRESTIGIEUSE",
    subtitle: "Au cœur de la République",
    description: "Une adresse de prestige qui inspire confiance et crédibilité pour votre entreprise dans le quartier le plus dynamique de Marseille.",
    color: "from-amber-500 via-orange-500 to-amber-600",
    glowColor: "shadow-amber-500/30",
    bgOverlay: "from-amber-900/40 via-orange-900/20 to-amber-900/40"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920",
    category: "STUDIOS",
    title: "CRÉEZ DU CONTENU EXCEPTIONNEL",
    subtitle: "Production premium",
    description: "Studios équipés de technologies de pointe pour donner vie à vos projets créatifs les plus ambitieux avec un rendu professionnel.",
    color: "from-emerald-500 via-teal-500 to-emerald-600",
    glowColor: "shadow-emerald-500/30",
    bgOverlay: "from-emerald-900/40 via-teal-900/20 to-emerald-900/40"
  }
];

const animatedWords = ["BUREAU", "STUDIO", "DOMICILIATION"];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Animation du texte rotatif (uniquement pour le premier slide)
  useEffect(() => {
    if (currentSlide !== 0) return;
    
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, [currentSlide]);

  // Gestion du carrousel automatique
  useEffect(() => {
    if (!isPlaying) return;
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setProgress(0);
    }, 8000);

    return () => clearInterval(slideInterval);
  }, [isPlaying]);

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying) return;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 800); // 8 secondes = 800 * 10ms
      });
    }, 10);

    return () => clearInterval(progressInterval);
  }, [currentSlide, isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Progress Bar Global */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/30 z-50">
        <motion.div
          className={`h-full bg-gradient-to-r ${currentSlideData.color} shadow-lg`}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Background Images avec Ken Burns Enhanced */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1.15 : 1.08,
              filter: index === currentSlide ? 'brightness(0.6) contrast(1.3) saturate(1.4)' : 'brightness(0.4) contrast(1) saturate(1)'
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              animation: index === currentSlide ? 'kenBurnsEnhanced 30s ease-in-out infinite' : 'none'
            }}
          >
            <img 
              src={slide.image}
              alt={`${slide.category} - Le 40`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        
        {/* Overlays multiples stratégiques */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/30 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/95"></div>
        
        {/* Overlay couleur dynamique premium */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgOverlay}`}
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Film grain texture animé */}
        <div className="absolute inset-0 film-grain opacity-25 mix-blend-overlay"></div>
      </div>

      {/* Navigation Arrows (Desktop) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full items-center justify-center text-white hover:bg-black/40 hover:scale-110 hover:border-white/40 transition-all duration-500 z-40 group"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      >
        <ChevronLeft className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full items-center justify-center text-white hover:bg-black/40 hover:scale-110 hover:border-white/40 transition-all duration-500 z-40 group"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      >
        <ChevronRight className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Play/Pause Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-8 right-8 w-14 h-14 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/40 hover:scale-110 transition-all duration-500 z-40"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
      </button>

      {/* Contenu Principal */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pb-32 w-full"
      >
        {/* Badge Catégorie */}
        <motion.div
          key={`badge-${currentSlide}`}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${currentSlideData.color} rounded-full border border-white/30 mb-12 ${currentSlideData.glowColor} shadow-2xl backdrop-blur-sm`}
        >
          <Sparkles className="w-5 h-5 text-white mr-3" />
          <span className="text-sm font-montserrat font-bold text-white tracking-[0.25em] uppercase">
            {currentSlideData.category}
          </span>
        </motion.div>

        {/* Titre Principal - Animation uniquement pour le premier slide */}
        <div className="mb-12">
          {currentSlide === 0 ? (
            // Animation de texte rotatif pour le premier slide
            <>
              {/* Titre fixe "VOTRE" */}
              <motion.div
                initial={{ opacity: 0, y: 80, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.6, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-montserrat font-black text-white leading-none tracking-tight mb-6"
                style={{ 
                  textShadow: '6px 6px 12px rgba(0,0,0,0.9), 3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)',
                  transformOrigin: 'center bottom'
                }}
              >
                VOTRE
              </motion.div>

              {/* Mot qui change avec animation sophistiquée */}
              <div className="relative h-28 md:h-36 lg:h-44 xl:h-52 overflow-hidden mb-6">
                {animatedWords.map((word, index) => (
                  <motion.div
                    key={word}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: 120, rotateX: 90, scale: 0.7, filter: 'blur(10px)' }}
                    animate={{ 
                      opacity: index === currentWordIndex ? 1 : 0,
                      y: index === currentWordIndex ? 0 : -120,
                      rotateX: index === currentWordIndex ? 0 : -90,
                      scale: index === currentWordIndex ? 1 : 0.7,
                      filter: index === currentWordIndex ? 'blur(0px)' : 'blur(10px)'
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: index === currentWordIndex ? 0.3 : 0
                    }}
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    <span 
                      className={`text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-montserrat font-black leading-none tracking-tight bg-gradient-to-r ${currentSlideData.color} bg-clip-text text-transparent`}
                      style={{ 
                        textShadow: '6px 6px 12px rgba(0,0,0,0.9), 3px 3px 6px rgba(0,0,0,0.7)',
                        WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                        filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'
                      }}
                    >
                      {word}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Sous-titre "à Marseille" */}
              <motion.div
                initial={{ opacity: 0, y: 80, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 1.4, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair italic font-normal text-white/95 leading-none mb-8"
                style={{ 
                  textShadow: '4px 4px 8px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.7)',
                  transformOrigin: 'center bottom'
                }}
              >
                à Marseille
              </motion.div>
            </>
          ) : (
            // Titre statique pour les autres slides
            <motion.div
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-black text-white leading-none tracking-tight mb-8"
              style={{ 
                textShadow: '6px 6px 12px rgba(0,0,0,0.9), 3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)'
              }}
            >
              {currentSlideData.title}
            </motion.div>
          )}

          {/* Ligne décorative dynamique */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "clamp(80px, 10vw, 160px)", opacity: 1 }}
            transition={{ delay: currentSlide === 0 ? 2.2 : 1.2, duration: 1.5, ease: "easeOut" }}
            className={`h-1.5 bg-gradient-to-r ${currentSlideData.color} rounded-full ${currentSlideData.glowColor} shadow-xl`}
            key={`line-${currentSlide}`}
          />
        </div>

        {/* Sous-titre et Description du Slide */}
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: currentSlide === 0 ? 1.8 : 1, duration: 1.2 }}
          className="mb-16 max-w-5xl"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-white mb-6 leading-tight">
            {currentSlide === 0 ? "L'EXCELLENCE AU CŒUR DE MARSEILLE" : currentSlideData.title}
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-playfair italic text-white/90 mb-8">
            {currentSlide === 0 ? "Votre réussite commence ici" : currentSlideData.subtitle}
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl font-inter text-white/95 leading-relaxed" 
             style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
            {currentSlideData.description}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: currentSlide === 0 ? 2.4 : 1.4, duration: 1 }}
          className="flex flex-col sm:flex-row items-start gap-8"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`group bg-gradient-to-r ${currentSlideData.color} text-white px-12 py-6 rounded-2xl font-montserrat font-bold text-xl tracking-wide transition-all duration-500 relative overflow-hidden ${currentSlideData.glowColor} shadow-2xl`}
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="relative flex items-center">
              <Calendar className="w-7 h-7 mr-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Réserver ma visite</span>
              <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-black/20 backdrop-blur-xl text-white px-12 py-6 rounded-2xl font-montserrat font-bold text-xl tracking-wide border border-white/30 hover:bg-black/40 hover:border-white/50 transition-all duration-500 relative overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
            <div className="relative flex items-center">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mr-5 group-hover:bg-white/20 transition-colors duration-300">
                <Play className="w-6 h-6 ml-1 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold">Visite virtuelle</div>
                <div className="text-sm text-white/70">Découvrez nos espaces</div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Indicateurs de Progression */}
      <div className="absolute bottom-8 left-8 flex space-x-4 z-40">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative group"
          >
            <div className={`w-16 h-1.5 bg-white/20 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-white/60' : 'hover:bg-white/40'
            }`}>
              {index === currentSlide && (
                <motion.div
                  className={`h-full bg-gradient-to-r ${currentSlideData.color} rounded-full ${currentSlideData.glowColor} shadow-lg`}
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Compteur de Slides */}
      <div className="absolute bottom-8 right-8 bg-black/20 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-3 z-40">
        <span className="text-white font-inter text-lg tracking-wider font-medium">
          {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Styles pour Ken Burns Enhanced */}
      <style jsx>{`
        @keyframes kenBurnsEnhanced {
          0% { transform: scale(1.15) translateX(0px) translateY(0px) rotate(0deg); }
          15% { transform: scale(1.18) translateX(-20px) translateY(-10px) rotate(0.8deg); }
          30% { transform: scale(1.16) translateX(15px) translateY(-15px) rotate(-0.5deg); }
          45% { transform: scale(1.20) translateX(-10px) translateY(12px) rotate(0.3deg); }
          60% { transform: scale(1.17) translateX(18px) translateY(-8px) rotate(-0.6deg); }
          75% { transform: scale(1.19) translateX(-12px) translateY(10px) rotate(0.4deg); }
          90% { transform: scale(1.16) translateX(8px) translateY(-6px) rotate(-0.2deg); }
          100% { transform: scale(1.18) translateX(-5px) translateY(4px) rotate(0.1deg); }
        }
      `}</style>
    </section>
  );
}