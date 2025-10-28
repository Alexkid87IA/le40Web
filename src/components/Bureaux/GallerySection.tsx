import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';
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
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-[120px]" />
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
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl"
                  style={{ zIndex: -1 }}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

                <motion.div
                  whileHover={{ y: -8 }}
                  onClick={() => handleCardClick(item)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer border border-white/10 hover:border-emerald-500/50 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <motion.img
                      src={item.images[0].url}
                      alt={item.images[0].alt}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-emerald-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-5 h-5" />
                        <span className="font-semibold">Explorer</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="absolute top-4 left-4 z-10">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-lg"
                    >
                      {item.category}
                    </motion.span>
                  </div>

                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/80 backdrop-blur-xl px-3 py-1.5 rounded-full flex items-center gap-1 text-white text-xs font-medium">
                      <span>{item.images.length}</span>
                      <span className="text-white/60">photos</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-montserrat font-bold text-xl mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-white/80 font-inter text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        <span className="text-emerald-400 text-sm font-semibold">{item.capacity}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-teal-400 text-sm font-semibold">{item.surface}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-cyan-400 text-sm font-semibold">Dès {item.priceFrom}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 border-2 border-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(45deg, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
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
            className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-montserrat font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-600/30 transition-all"
          >
            Réserver une visite guidée gratuite
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
