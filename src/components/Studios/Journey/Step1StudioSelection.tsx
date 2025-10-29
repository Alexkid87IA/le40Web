import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Users, Zap, Info, Star, Sparkles } from 'lucide-react';
import { studioSetups } from '../../../data/studios/setups';

interface Step1StudioSelectionProps {
  selectedStudioId: string | null;
  onStudioSelect: (studioId: string) => void;
  onContinue: () => void;
}

export default function Step1StudioSelection({ selectedStudioId, onStudioSelect, onContinue }: Step1StudioSelectionProps) {
  const [hoveredStudio, setHoveredStudio] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'youtube' | 'podcast' | 'social' | 'live'>('all');

  const filterOptions = [
    { id: 'all', label: 'Tous les studios' },
    { id: 'youtube', label: 'YouTube / Vidéo' },
    { id: 'podcast', label: 'Podcast / Interview' },
    { id: 'social', label: 'Réseaux sociaux' },
    { id: 'live', label: 'Live / Streaming' },
  ];

  const getFilteredStudios = () => {
    if (filterType === 'all') return studioSetups;

    const filters: Record<string, string[]> = {
      'youtube': ['face-cam', 'green-screen'],
      'podcast': ['podcast-audio', 'intimiste'],
      'social': ['tiktok', 'face-cam'],
      'live': ['stream', 'full-show'],
    };

    const allowedIds = filters[filterType] || [];
    return studioSetups.filter(s => allowedIds.includes(s.id));
  };

  const filteredStudios = getFilteredStudios();
  const selectedStudio = studioSetups.find(s => s.id === selectedStudioId);

  return (
    <section className="py-16 bg-gradient-to-b from-black via-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-inter text-sm font-bold">Étape 1 sur 4</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            CHOISISSEZ VOTRE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">
              STUDIO PARFAIT
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Sélectionnez le studio adapté à votre type de contenu et vos besoins
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filterOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(option.id as any)}
              className={`px-6 py-3 rounded-xl font-inter font-bold text-sm transition-all ${
                filterType === option.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filterType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredStudios.map((studio, index) => {
              const Icon = studio.icon;
              const isSelected = selectedStudioId === studio.id;
              const isHovered = hoveredStudio === studio.id;

              return (
                <motion.div
                  key={studio.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setHoveredStudio(studio.id)}
                  onMouseLeave={() => setHoveredStudio(null)}
                  onClick={() => onStudioSelect(studio.id)}
                  className="group relative cursor-pointer h-full"
                >
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${studio.gradient} rounded-3xl blur-xl transition-all duration-500`}
                    animate={{
                      opacity: isSelected ? 0.6 : isHovered ? 0.3 : 0,
                    }}
                  />

                  <div className={`relative bg-slate-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden border-2 transition-all duration-500 h-full flex flex-col ${
                    isSelected ? 'border-cyan-400' : 'border-white/10 group-hover:border-white/30'
                  }`}>
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={studio.image}
                        alt={studio.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: isHovered ? 1.1 : 1
                        }}
                        transition={{ duration: 0.6 }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                      {studio.popular && (
                        <div className="absolute top-4 right-4">
                          <div className={`bg-gradient-to-r ${studio.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl`}>
                            <Star className="w-3 h-3" />
                            POPULAIRE
                          </div>
                        </div>
                      )}

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 left-4 bg-cyan-500 text-white p-2 rounded-full shadow-xl"
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <div className="flex-1 bg-black/70 backdrop-blur-xl rounded-lg px-3 py-2 border border-white/20">
                          <Users className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                          <div className="text-white text-xs font-bold truncate">{studio.capacity}</div>
                        </div>
                        <div className="flex-1 bg-black/70 backdrop-blur-xl rounded-lg px-3 py-2 border border-white/20">
                          <Zap className="w-3.5 h-3.5 text-blue-400 mb-1" />
                          <div className="text-white text-xs font-bold">{studio.basePrice}€/h</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${studio.gradient} font-montserrat font-bold text-xs tracking-wider uppercase`}>
                          {studio.subtitle}
                        </span>
                        <h3 className="text-xl font-montserrat font-black text-white mt-2 mb-2 flex items-center gap-2">
                          <Icon className="w-5 h-5" />
                          {studio.name}
                        </h3>
                        <p className="text-white/70 font-inter text-sm mb-2 line-clamp-2">
                          {studio.description}
                        </p>
                      </div>

                      <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-xs font-inter">{studio.equipment.cameras}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-xs font-inter">{studio.equipment.audio}</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className={`px-4 py-3 rounded-xl border-2 text-center font-montserrat font-bold transition-all ${
                          isSelected
                            ? 'bg-cyan-500 border-cyan-400 text-white'
                            : 'bg-white/5 border-white/10 text-white/60'
                        }`}>
                          {isSelected ? '✓ Sélectionné' : 'Choisir ce studio'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedStudio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-900/80 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8"
            >
              <div className="flex items-start justify-between gap-8 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedStudio.gradient} flex items-center justify-center`}>
                      {(() => {
                        const Icon = selectedStudio.icon;
                        return <Icon className="w-6 h-6 text-white" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-cyan-400 text-sm font-inter font-bold">Studio sélectionné</div>
                      <div className="text-2xl font-montserrat font-black text-white">{selectedStudio.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                    <Info className="w-4 h-4" />
                    <span className="font-inter italic">{selectedStudio.usage}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/50 text-xs font-inter mb-1">Capacité</div>
                      <div className="text-white font-inter font-bold">{selectedStudio.capacity}</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs font-inter mb-1">Tarif de base</div>
                      <div className="text-white font-inter font-bold">{selectedStudio.basePrice}€/heure</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs font-inter mb-1">Durée recommandée</div>
                      <div className="text-white font-inter font-bold">{selectedStudio.recommendedDuration}</div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onContinue}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-montserrat font-bold flex items-center gap-3 shadow-xl"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
