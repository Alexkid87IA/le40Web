import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Video, Eye, Maximize2 } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';

type MediaType = 'photo' | 'video';

interface MediaItem {
  type: MediaType;
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
}

export default function EnhancedGallerySection() {
  const [selectedStudio, setSelectedStudio] = useState<string | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | MediaType>('all');

  const studioMedia: Record<string, MediaItem[]> = {
    'full-show': [
      {
        type: 'photo',
        url: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'Vue d\'ensemble plateau 50m²',
        description: 'Grand plateau modulable avec décors premium'
      },
      {
        type: 'video',
        url: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
        thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Exemple talk-show',
        description: 'Émission complète tournée dans notre studio'
      },
      {
        type: 'photo',
        url: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'Détail caméras',
        description: 'Setup 4 caméras Sony FX3'
      },
    ],
    'intimiste': [
      {
        type: 'photo',
        url: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'Ambiance cosy',
        description: 'Canapé design et éclairage cinéma'
      },
      {
        type: 'video',
        url: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600',
        thumbnail: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Interview exemple',
        description: 'Podcast vidéo professionnel'
      },
    ],
    'face-cam': [
      {
        type: 'photo',
        url: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'Setup face-cam',
        description: 'Configuration optimale pour YouTube'
      },
      {
        type: 'video',
        url: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600',
        thumbnail: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Masterclass exemple',
        description: 'Vidéo YouTube professionnelle'
      },
    ],
  };

  const selectedStudioData = selectedStudio ? studioSetups.find(s => s.id === selectedStudio) : null;
  const mediaItems = selectedStudio ? (studioMedia[selectedStudio] || []) : [];
  const filteredMedia = filter === 'all' ? mediaItems : mediaItems.filter(m => m.type === filter);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === filteredMedia.length - 1 ? 0 : prev + 1
    );
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? filteredMedia.length - 1 : prev - 1
    );
  };

  const openGallery = (studioId: string) => {
    setSelectedStudio(studioId);
    setCurrentMediaIndex(0);
    setFilter('all');
  };

  const closeGallery = () => {
    setSelectedStudio(null);
    setCurrentMediaIndex(0);
    setFilter('all');
  };

  return (
    <>
      <section className="py-32 bg-gradient-to-b from-black to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>

        <div className="relative max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mr-4"></div>
              <span className="text-xs font-montserrat font-medium text-cyan-400 tracking-[0.3em] uppercase">
                Galerie immersive
              </span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-cyan-500 to-transparent ml-4"></div>
            </div>

            <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
              VISUALISEZ VOS
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-400 to-pink-400">
                FUTURS TOURNAGES
              </span>
            </h2>

            <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
              Explorez nos studios en photos et vidéos. Découvrez l'équipement, les décors et les résultats obtenus par nos clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studioSetups.slice(0, 6).map((studio, index) => {
              const Icon = studio.icon;
              const hasMedia = studioMedia[studio.id];
              const mediaCount = hasMedia ? studioMedia[studio.id].length : 0;
              const photoCount = hasMedia ? studioMedia[studio.id].filter(m => m.type === 'photo').length : 0;
              const videoCount = hasMedia ? studioMedia[studio.id].filter(m => m.type === 'video').length : 0;

              return (
                <motion.div
                  key={studio.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative cursor-pointer"
                  onClick={() => openGallery(studio.id)}
                >
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${studio.gradient} rounded-2xl opacity-0 blur-xl transition-all duration-500 group-hover:opacity-40`}
                  />

                  <div className="relative h-96 rounded-2xl overflow-hidden bg-slate-900/80 backdrop-blur-2xl border-2 border-white/10 group-hover:border-white/30 transition-all">
                    <div className="relative h-72 overflow-hidden">
                      <motion.img
                        src={studio.image}
                        alt={studio.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                            className={`p-5 rounded-full bg-gradient-to-r ${studio.gradient} mb-4`}
                          >
                            <Eye className="w-10 h-10 text-white" />
                          </motion.div>
                          <span className="text-white font-montserrat font-bold text-xl mb-2">
                            Explorer
                          </span>
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <span className="flex items-center gap-1">
                              <ImageIcon className="w-4 h-4" />
                              {photoCount} photos
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              {videoCount} vidéos
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {studio.popular && (
                        <div className="absolute top-4 right-4">
                          <div className={`bg-gradient-to-r ${studio.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl`}>
                            ★ POPULAIRE
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${studio.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-montserrat font-black text-white mb-1">
                            {studio.name}
                          </h3>
                          <p className="text-white/60 text-sm font-inter">
                            {studio.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-400">
                          {studio.basePrice}€/h
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`bg-gradient-to-r ${studio.gradient} rounded-lg p-2`}
                        >
                          <Maximize2 className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedStudio && selectedStudioData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilter('all');
                      }}
                      className={`px-4 py-2 rounded-lg font-inter font-bold text-sm transition-all ${
                        filter === 'all'
                          ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      Tout
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilter('photo');
                      }}
                      className={`px-4 py-2 rounded-lg font-inter font-bold text-sm transition-all flex items-center gap-2 ${
                        filter === 'photo'
                          ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Photos
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilter('video');
                      }}
                      className={`px-4 py-2 rounded-lg font-inter font-bold text-sm transition-all flex items-center gap-2 ${
                        filter === 'video'
                          ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      Vidéos
                    </motion.button>
                  </div>

                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
                    <AnimatePresence mode="wait">
                      {filteredMedia[currentMediaIndex] && (
                        <motion.div
                          key={currentMediaIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative w-full h-full"
                        >
                          <img
                            src={filteredMedia[currentMediaIndex].url}
                            alt={filteredMedia[currentMediaIndex].title}
                            className="w-full h-full object-cover"
                          />
                          {filteredMedia[currentMediaIndex].type === 'video' && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/40"
                              >
                                <Play className="w-10 h-10 text-white ml-2" />
                              </motion.button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevMedia();
                      }}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-2">
                      {filteredMedia.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentMediaIndex(idx);
                          }}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentMediaIndex
                              ? 'bg-cyan-500 w-8'
                              : 'bg-white/30 hover:bg-white/50 w-2'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextMedia();
                      }}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {filteredMedia.map((media, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentMediaIndex(idx);
                        }}
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentMediaIndex
                            ? 'border-cyan-500'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <img
                          src={media.thumbnail || media.url}
                          alt={media.title}
                          className="w-full h-full object-cover"
                        />
                        {media.type === 'video' && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white"
                >
                  <div className={`inline-block bg-gradient-to-r ${selectedStudioData.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4`}>
                    {selectedStudioData.subtitle}
                  </div>

                  <h2 className="text-4xl font-montserrat font-black mb-4">
                    {selectedStudioData.name}
                  </h2>

                  <p className="text-white/70 font-inter leading-relaxed mb-6">
                    {selectedStudioData.description}
                  </p>

                  {filteredMedia[currentMediaIndex] && (
                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                      <h3 className="font-montserrat font-bold text-white mb-2">
                        {filteredMedia[currentMediaIndex].title}
                      </h3>
                      <p className="text-white/60 text-sm font-inter">
                        {filteredMedia[currentMediaIndex].description}
                      </p>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${selectedStudioData.gradient} text-white font-montserrat font-bold py-4 rounded-xl mb-4`}
                  >
                    Réserver ce studio
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
