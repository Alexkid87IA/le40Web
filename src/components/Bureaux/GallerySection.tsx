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
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative"
              >
                <div className="absolute -inset-[2px] bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-cyan-500/25 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />

                <motion.div
                  whileHover={{ y: -12, scale: 1.01 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleCardClick(item)}
                  className="relative overflow-hidden rounded-3xl cursor-pointer border border-white/[0.08] hover:border-emerald-400/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-zinc-950">
                    <motion.img
                      src={item.images[0].url}
                      alt={item.images[0].alt}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7, y: 10 }}
                        whileHover={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-60"></div>
                        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl border border-emerald-300/30">
                          <Eye className="w-6 h-6" />
                          <span className="font-bold text-lg">Explorer</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="absolute top-5 left-5 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-md opacity-60"></div>
                      <span className="relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 backdrop-blur-xl text-white text-xs font-bold rounded-full shadow-xl border border-emerald-300/30 block">
                        {item.category}
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-5 right-5 z-10"
                  >
                    <div className="bg-black/90 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 text-white text-xs font-bold border border-white/10 shadow-xl">
                      <span className="text-emerald-400">{item.images.length}</span>
                      <span className="text-white/70">photos</span>
                    </div>
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                    <motion.div
                      initial={{ y: 10, opacity: 0.8 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white font-montserrat font-black text-2xl mb-3 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
                        {item.title}
                      </h3>
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        whileHover={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="text-white/85 font-inter text-sm mb-4 line-clamp-2 leading-relaxed"
                      >
                        {item.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <span className="text-emerald-400 text-sm font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {item.capacity}
                        </span>
                        <span className="text-white/30">•</span>
                        <span className="text-teal-400 text-sm font-bold">{item.surface}</span>
                        <span className="text-white/30">•</span>
                        <span className="text-cyan-400 text-sm font-bold">Dès {item.priceFrom}</span>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(16, 185, 129, 0.08) 30%, rgba(20, 184, 166, 0.08) 60%, transparent 100%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
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
