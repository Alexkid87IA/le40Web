import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Studio } from '../../data/studios/studiosData';
import { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';

interface StudioDetailModalProps {
  studio: Studio | null;
  onClose: () => void;
  onSelect: (studioId: string) => void;
}

interface Thumbnail {
  src: string;
  index: number;
}

export default function StudioDetailModal({ studio, onClose, onSelect }: StudioDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [studio?.id]);

  if (!studio) return null;

  const images = studio.gallery || [studio.image];

  const handleSelect = () => {
    onSelect(studio.id);
    const element = document.getElementById('configurator');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    onClose();
  };

  const handleAddToCart = () => {
    addItem({
      id: `studio-${studio.id}-${Date.now()}`,
      serviceType: 'studio',
      serviceName: studio.name,
      date: new Date().toISOString().split('T')[0],
      duration: 'hour',
      price: studio.launchPrice,
      quantity: 1
    });
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
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-zinc-950 rounded-3xl max-w-7xl w-full my-8 overflow-hidden border border-white/10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="grid lg:grid-cols-2 min-h-[600px]">
              <div className="relative bg-black group">
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

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-black/90 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                      <ChevronLeft className="w-7 h-7 text-white" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-black/90 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                      <ChevronRight className="w-7 h-7 text-white" />
                    </button>
                  </>
                )}

                {images.length > 1 && (
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="flex gap-2 justify-center">
                      {images.map((img, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-teal-400 scale-110'
                              : 'border-white/20 hover:border-white/40 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 lg:p-12 space-y-6 overflow-y-auto max-h-[600px]">
                <div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${studio.gradient} text-white text-sm font-bold mb-4 shadow-lg`}>
                    <studio.icon className="w-4 h-4" />
                    {studio.subtitle}
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-montserrat font-black text-white mb-4">
                    {studio.name}
                  </h2>
                  <div className="flex items-baseline gap-3 flex-wrap mb-6">
                    <span className="text-5xl font-montserrat font-black text-white">
                      {studio.launchPrice}€
                    </span>
                    <span className="text-white/80 text-lg">{studio.priceUnit}</span>
                    <span className="text-white/40 text-xl line-through ml-2">{studio.basePrice}€</span>
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold rounded-full">
                      -{studio.savings}€
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-bold text-white mb-3">À propos de ce studio</h3>
                  <p className="text-white/70 font-inter leading-relaxed">
                    {studio.description}. Configuration {studio.capacity} idéale pour {studio.usage}.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h3 className="text-lg font-montserrat font-bold text-white mb-4 flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${studio.gradient} flex items-center justify-center`}>
                        <studio.icon className="w-4 h-4 text-white" />
                      </div>
                      Équipement professionnel
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Caméras</span>
                        <p className="text-white font-inter text-sm mt-1">{studio.equipment.cameras}</p>
                      </div>
                      <div>
                        <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Audio</span>
                        <p className="text-white font-inter text-sm mt-1">{studio.equipment.audio}</p>
                      </div>
                      <div>
                        <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Lumières</span>
                        <p className="text-white font-inter text-sm mt-1">{studio.equipment.light}</p>
                      </div>
                      <div>
                        <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Extras</span>
                        <p className="text-white font-inter text-sm mt-1">{studio.equipment.extras}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h3 className="text-lg font-montserrat font-bold text-white mb-4">Inclus dans le prix</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {studio.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br ${studio.gradient} flex items-center justify-center mt-0.5`}>
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                          <span className="text-white/80 font-inter text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-montserrat font-bold text-white mb-3">Parfait pour</h3>
                  <div className="flex flex-wrap gap-2">
                    {studio.perfectFor.map((item, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/90 text-xs font-inter hover:bg-white/10 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-shrink-0 py-4 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl font-montserrat font-bold border border-white/20 flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Ajouter</span>
                  </motion.button>
                  <motion.button
                    onClick={handleSelect}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-4 bg-gradient-to-r ${studio.gradient} text-white rounded-xl font-montserrat font-bold shadow-2xl flex items-center justify-center gap-2 group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative">Configurer</span>
                    <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
