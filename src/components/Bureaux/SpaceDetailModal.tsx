import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Users, Maximize2, MapPin, CheckCircle, Star, Clock, ArrowRight, Zap, Shield, Heart } from 'lucide-react';

interface SpaceImage {
  url: string;
  alt: string;
}

interface SpaceDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  images: SpaceImage[];
  capacity: string;
  surface: string;
  priceFrom: string;
  features: string[];
  equipments: string[];
  tags: string[];
  availability: string;
}

interface SpaceDetailModalProps {
  space: SpaceDetail;
  isOpen: boolean;
  onClose: () => void;
}

export default function SpaceDetailModal({ space, isOpen, onClose }: SpaceDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? space.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === space.images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full h-full max-w-[1600px] max-h-[90vh] m-4 md:m-8 bg-gradient-to-br from-zinc-900/95 to-black/95 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-50 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-10 h-10 flex items-center justify-center bg-black/90 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all shadow-xl"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-black/90 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all shadow-xl"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex flex-col lg:flex-row h-full overflow-hidden">
              <div className="lg:w-[60%] relative bg-black flex flex-col">
                <div className="relative flex-1 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: isZoomed ? 1.3 : 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      src={space.images[currentImageIndex].url}
                      alt={space.images[currentImageIndex].alt}
                      className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500"
                      onClick={() => setIsZoomed(!isZoomed)}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {space.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1, x: -4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/80 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/10 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-7 h-7" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, x: 4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/80 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/10 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-7 h-7" />
                      </motion.button>
                    </>
                  )}

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {space.images.map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => handleThumbnailClick(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white w-8'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      {space.category}
                    </span>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-xl border-t border-white/10 p-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {space.images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-emerald-500 shadow-lg shadow-emerald-500/30'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-[40%] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black">
                <div className="p-8 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-black font-montserrat text-white mb-3 leading-tight">
                      {space.title}
                    </h2>
                    <p className="text-white/70 font-inter text-lg leading-relaxed">
                      {space.longDescription}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                      <Users className="w-6 h-6 text-emerald-400 mb-2" />
                      <div className="text-white/50 text-xs mb-1">Capacité</div>
                      <div className="text-white font-bold">{space.capacity}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                      <Maximize2 className="w-6 h-6 text-emerald-400 mb-2" />
                      <div className="text-white/50 text-xs mb-1">Surface</div>
                      <div className="text-white font-bold">{space.surface}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                      <Clock className="w-6 h-6 text-emerald-400 mb-2" />
                      <div className="text-white/50 text-xs mb-1">Accès</div>
                      <div className="text-white font-bold">24/7</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-xl font-black font-montserrat text-white">Points Forts</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {space.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-xl font-black font-montserrat text-white">Caractéristiques</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {space.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/90 font-inter">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-xl font-black font-montserrat text-white">Équipements</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {space.equipments.map((equipment, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.03 }}
                          className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10"
                        >
                          <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-white/80 text-sm font-inter">{equipment}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20"
                  >
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-black font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                        {space.priceFrom}
                      </span>
                      <span className="text-white/60 font-inter">/mois</span>
                    </div>
                    <p className="text-white/70 text-sm font-inter mb-1">{space.availability}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold font-montserrat rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Réserver une visite</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-white/10 backdrop-blur-xl text-white font-semibold font-montserrat rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                    >
                      Demander un devis
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
