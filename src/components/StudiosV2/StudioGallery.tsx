import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { studios } from '../../data/studiosLaunch/config';

export default function StudioGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState<typeof studios[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const studioGalleryImages = {
    'face-cam': [
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7991487/pexels-photo-7991487.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    'duo-interview': [
      'https://images.pexels.com/photos/7991487/pexels-photo-7991487.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    'multi-cam-pro': [
      'https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7991487/pexels-photo-7991487.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    'green-screen': [
      'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ]
  };

  const openLightbox = (studio: typeof studios[0]) => {
    setSelectedStudio(studio);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedStudio(null);
  };

  const nextImage = () => {
    if (selectedStudio) {
      const images = studioGalleryImages[selectedStudio.id as keyof typeof studioGalleryImages];
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedStudio) {
      const images = studioGalleryImages[selectedStudio.id as keyof typeof studioGalleryImages];
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Découvrez Nos Espaces
            </h2>
            <p className="text-xl text-slate-400">
              Studios neufs équipés de matériel Sony pro • Inaugurés en janvier 2025
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {studios.map((studio, index) => (
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(studio)}
              >
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                    {studio.badge}
                  </div>
                </div>

                <div className="relative h-64 overflow-hidden">
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold">
                      Voir plus de photos
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {studio.name}
                  </h3>
                  <p className="text-slate-400 mb-4">
                    {studio.subtitle}
                  </p>

                  <div className="space-y-2 mb-6">
                    {studio.equipment.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400 text-sm">{studio.capacity} • {studio.surface}</span>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">
                          {studio.priceDiscounted}€/h
                        </span>
                        <span className="text-slate-500 line-through text-sm">
                          {studio.priceNormal}€/h
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(studio);
                    }}
                    className="w-full mt-4 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all"
                  >
                    Voir plus de photos
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && selectedStudio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img
                src={studioGalleryImages[selectedStudio.id as keyof typeof studioGalleryImages][currentImageIndex]}
                alt={`${selectedStudio.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-auto rounded-2xl"
              />

              <div className="mt-4 text-center">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {selectedStudio.name}
                </h3>
                <p className="text-slate-400">
                  Image {currentImageIndex + 1} sur {studioGalleryImages[selectedStudio.id as keyof typeof studioGalleryImages].length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
