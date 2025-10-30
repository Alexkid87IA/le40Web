import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Studio } from '../../data/studios/studiosData';
import { useState } from 'react';

interface StudioDetailModalProps {
  studio: Studio | null;
  onClose: () => void;
  onSelect: (studioId: string) => void;
}

export default function StudioDetailModal({ studio, onClose, onSelect }: StudioDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!studio) return null;

  const images = studio.gallery || [studio.image];

  const handleSelect = () => {
    onSelect(studio.id);
    onClose();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {studio && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-zinc-950 rounded-3xl max-w-5xl w-full my-8 overflow-hidden border border-white/10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="relative h-[500px] bg-black group">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={images[currentImageIndex]}
                alt={`${studio.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"></div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white w-8'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute bottom-8 left-8 right-8">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${studio.gradient} text-white text-sm font-bold mb-4 shadow-lg`}>
                  <studio.icon className="w-4 h-4" />
                  {studio.subtitle}
                </div>
                <h2 className="text-5xl lg:text-6xl font-montserrat font-black text-white mb-4">
                  {studio.name}
                </h2>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-5xl font-montserrat font-black text-white">
                    {studio.launchPrice}€
                  </span>
                  <span className="text-white/80 text-lg">{studio.priceUnit}</span>
                  <span className="text-white/40 text-xl line-through ml-2">{studio.basePrice}€</span>
                  <span className="px-3 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-bold rounded-full">
                    -{studio.savings}€
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12 space-y-8">
              <div>
                <h3 className="text-2xl font-montserrat font-bold text-white mb-4">À propos de ce studio</h3>
                <p className="text-white/70 font-inter leading-relaxed text-lg">
                  {studio.description}. Configuration {studio.capacity} idéale pour {studio.usage}.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-6 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${studio.gradient} flex items-center justify-center`}>
                      <studio.icon className="w-4 h-4 text-white" />
                    </div>
                    Équipement professionnel
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Caméras</span>
                      <p className="text-white font-inter mt-1">{studio.equipment.cameras}</p>
                    </div>
                    <div>
                      <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Audio</span>
                      <p className="text-white font-inter mt-1">{studio.equipment.audio}</p>
                    </div>
                    <div>
                      <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Lumières</span>
                      <p className="text-white font-inter mt-1">{studio.equipment.light}</p>
                    </div>
                    <div>
                      <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Extras</span>
                      <p className="text-white font-inter mt-1">{studio.equipment.extras}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-6">Inclus dans le prix</h3>
                  <div className="space-y-3">
                    {studio.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${studio.gradient} flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white/80 font-inter text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-montserrat font-bold text-white mb-4">Parfait pour</h3>
                <div className="flex flex-wrap gap-3">
                  {studio.perfectFor.map((item, index) => (
                    <span
                      key={index}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/90 text-sm font-inter hover:bg-white/10 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button
                  onClick={handleSelect}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-5 bg-gradient-to-r ${studio.gradient} text-white rounded-2xl font-montserrat font-bold text-lg shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative">Choisir ce studio</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
