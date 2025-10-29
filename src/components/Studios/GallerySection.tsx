import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { studioGalleryData } from '../../data/studios/gallery';

export default function GallerySection() {
  const [selectedStudio, setSelectedStudio] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedStudioData = selectedStudio !== null
    ? studioGalleryData.find(s => s.id === selectedStudio)
    : null;

  const nextImage = () => {
    if (selectedStudioData) {
      setCurrentImageIndex((prev) =>
        prev === selectedStudioData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedStudioData) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedStudioData.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
              <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
                Découvrez nos espaces
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
              VISITE VIRTUELLE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                DU STUDIO
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-inter">
              Explorez nos 6 espaces équipés professionnellement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studioGalleryData.map((studio, index) => (
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  setSelectedStudio(studio.id);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  <img
                    src={studio.mainImage}
                    alt={studio.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  <div className="absolute top-4 right-4">
                    <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {studio.tag}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-montserrat font-bold text-white mb-2">
                      {studio.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <span>{studio.images.length} photos</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/10 group-hover:to-amber-500/10 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedStudio !== null && selectedStudioData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedStudio(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedStudio(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <img
                      src={selectedStudioData.images[currentImageIndex]}
                      alt={selectedStudioData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={prevImage}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-2">
                      {selectedStudioData.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex
                              ? 'bg-orange-500 w-8'
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextImage}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white"
                >
                  <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-4">
                    {selectedStudioData.tag}
                  </div>
                  <h2 className="text-4xl font-montserrat font-black mb-4">
                    {selectedStudioData.title}
                  </h2>
                  <p className="text-white/70 font-inter leading-relaxed mb-8">
                    {selectedStudioData.description}
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-xl font-montserrat font-bold mb-4 text-orange-400">
                      Équipements inclus :
                    </h3>
                    {selectedStudioData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-montserrat font-bold py-4 rounded-xl"
                  >
                    Réserver cet espace
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
