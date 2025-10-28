import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { enrichedGalleryData, galleryCategories, EnrichedSpaceDetail } from '../../data/bureaux/galleryEnriched';
import SpaceDetailModal from './SpaceDetailModal';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedSpace, setSelectedSpace] = useState<EnrichedSpaceDetail | null>(null);

  const filteredGallery = activeCategory === 'Tous'
    ? enrichedGalleryData
    : enrichedGalleryData.filter(item => item.category === activeCategory);

  const handleCardClick = (space: EnrichedSpaceDetail) => {
    setSelectedSpace(space);
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-600/30 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-300 font-medium">Explorez nos espaces</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            VISITEZ NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">ESPACES</span>
          </h2>
          <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
            Découvrez en images nos bureaux privés et espaces communs. Cliquez sur une carte pour explorer en détail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {galleryCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-3 rounded-xl font-inter font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl -z-10"
                />
              )}
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onClick={() => handleCardClick(item)}
                className="group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500" />

                  <div className="relative h-full bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group-hover:border-emerald-500/30 transition-all duration-500">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={item.images[0].url}
                        alt={item.images[0].alt}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/10">
                          <span className="text-emerald-400">{item.images.length}</span> photos
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold shadow-xl">
                          <Eye className="w-5 h-5" />
                          <span>Explorer</span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-montserrat font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="text-white/60 font-inter text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-emerald-400 font-bold">{item.capacity}</span>
                          <span className="text-white/30">•</span>
                          <span className="text-teal-400 font-bold">{item.surface}</span>
                        </div>
                        <span className="text-white font-bold">Dès {item.priceFrom}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 font-inter mb-6">
            Les photos valent mieux que mille mots, mais rien ne remplace une visite en personne
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-montserrat font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-600/30 transition-all"
          >
            Réserver une visite guidée gratuite
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {selectedSpace && (
        <SpaceDetailModal
          space={selectedSpace}
          isOpen={!!selectedSpace}
          onClose={() => setSelectedSpace(null)}
        />
      )}
    </section>
  );
}
