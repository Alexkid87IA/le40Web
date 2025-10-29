import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Users, Clock, Camera, Zap } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';

export default function StudioComparator() {
  const [selectedStudios, setSelectedStudios] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const toggleStudio = (studioId: string) => {
    setSelectedStudios(prev => {
      if (prev.includes(studioId)) {
        return prev.filter(id => id !== studioId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), studioId];
      }
      return [...prev, studioId];
    });
  };

  const selectedStudioData = selectedStudios.map(id =>
    studioSetups.find(s => s.id === id)
  ).filter(Boolean);

  const comparisonFeatures = [
    { key: 'basePrice', label: 'Prix de base', icon: Zap },
    { key: 'capacity', label: 'Capacité', icon: Users },
    { key: 'recommendedDuration', label: 'Durée recommandée', icon: Clock },
    { key: 'equipment.cameras', label: 'Caméras', icon: Camera },
  ];

  return (
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
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-blue-400 tracking-[0.3em] uppercase">
              Comparaison
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-blue-500 to-transparent ml-4"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            COMPAREZ
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              NOS STUDIOS
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Sélectionnez jusqu'à 3 studios pour comparer leurs caractéristiques et trouver celui qui correspond le mieux à votre projet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {studioSetups.map((studio) => {
              const Icon = studio.icon;
              const isSelected = selectedStudios.includes(studio.id);

              return (
                <motion.button
                  key={studio.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleStudio(studio.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? `border-blue-500 bg-gradient-to-br ${studio.gradient.replace('from-', 'from-').replace('via-', 'via-').replace('to-', 'to-')}/10`
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${studio.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-inter font-bold text-sm text-center">
                      {studio.name}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsComparing(!isComparing)}
              disabled={selectedStudios.length < 2}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-montserrat font-bold transition-all ${
                selectedStudios.length >= 2
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              {isComparing ? 'Masquer la comparaison' : `Comparer (${selectedStudios.length}/3)`}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isComparing && selectedStudioData.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selectedStudioData.length}, 1fr)` }}>
                  <div className="font-montserrat font-bold text-white text-lg">
                    Caractéristiques
                  </div>
                  {selectedStudioData.map((studio) => {
                    const Icon = studio!.icon;
                    return (
                      <div key={studio!.id} className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r ${studio!.gradient} flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-montserrat font-black text-white text-lg mb-1">
                          {studio!.name}
                        </h3>
                        <p className="text-white/60 text-sm font-inter">
                          {studio!.subtitle}
                        </p>
                      </div>
                    );
                  })}

                  <div className="col-span-full h-px bg-white/10 my-4"></div>

                  <div className="flex items-center gap-3 py-4">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-inter font-medium">Prix de base</span>
                  </div>
                  {selectedStudioData.map((studio) => (
                    <div key={`price-${studio!.id}`} className="flex items-center justify-center py-4">
                      <span className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        {studio!.basePrice}€
                      </span>
                      <span className="text-white/50 text-sm ml-2">/h</span>
                    </div>
                  ))}

                  <div className="col-span-full h-px bg-white/10"></div>

                  <div className="flex items-center gap-3 py-4">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-inter font-medium">Capacité</span>
                  </div>
                  {selectedStudioData.map((studio) => (
                    <div key={`capacity-${studio!.id}`} className="flex items-center justify-center py-4">
                      <span className="text-white font-inter font-bold">
                        {studio!.capacity}
                      </span>
                    </div>
                  ))}

                  <div className="col-span-full h-px bg-white/10"></div>

                  <div className="flex items-center gap-3 py-4">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-inter font-medium">Durée recommandée</span>
                  </div>
                  {selectedStudioData.map((studio) => (
                    <div key={`duration-${studio!.id}`} className="flex items-center justify-center py-4">
                      <span className="text-white font-inter font-bold">
                        {studio!.recommendedDuration}
                      </span>
                    </div>
                  ))}

                  <div className="col-span-full h-px bg-white/10"></div>

                  <div className="flex items-center gap-3 py-4">
                    <Camera className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-inter font-medium">Caméras</span>
                  </div>
                  {selectedStudioData.map((studio) => (
                    <div key={`cameras-${studio!.id}`} className="flex items-center justify-center py-4">
                      <span className="text-white/80 font-inter text-sm text-center">
                        {studio!.equipment.cameras}
                      </span>
                    </div>
                  ))}

                  <div className="col-span-full h-px bg-white/10"></div>

                  <div className="py-4">
                    <span className="text-white font-inter font-medium">Usage recommandé</span>
                  </div>
                  {selectedStudioData.map((studio) => (
                    <div key={`usage-${studio!.id}`} className="flex items-center justify-center py-4">
                      <span className="text-white/80 font-inter text-sm text-center">
                        {studio!.usage}
                      </span>
                    </div>
                  ))}

                  <div className="col-span-full h-px bg-white/10 my-4"></div>

                  <div></div>
                  {selectedStudioData.map((studio) => (
                    <div key={`cta-${studio!.id}`} className="flex justify-center">
                      <motion.a
                        href={`#${studio!.id}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-gradient-to-r ${studio!.gradient} text-white px-6 py-3 rounded-xl font-montserrat font-bold flex items-center gap-2`}
                      >
                        Choisir
                        <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
