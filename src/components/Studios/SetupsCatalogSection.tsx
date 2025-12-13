import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Users, Clock, Filter, X, Eye } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';
import SetupDetailModal from './SetupDetailModal';

type FilterType = 'all' | 'popular' | 'solo' | 'team';

export default function SetupsCatalogSection() {
  const [selectedSetup, setSelectedSetup] = useState<typeof studioSetups[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const openModal = (setup: typeof studioSetups[0]) => {
    setSelectedSetup(setup);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSetup(null), 300);
  };

  const filters = [
    { id: 'all' as FilterType, label: 'Tous les studios', count: studioSetups.length },
    { id: 'popular' as FilterType, label: 'Populaires', count: studioSetups.filter(s => s.popular).length },
    { id: 'solo' as FilterType, label: 'Solo (1-2 pers)', count: studioSetups.filter(s => s.capacity.includes('1') || s.capacity.includes('2')).length },
    { id: 'team' as FilterType, label: 'Équipe (3+ pers)', count: studioSetups.filter(s => !s.capacity.includes('1-2')).length },
  ];

  const filteredSetups = studioSetups.filter(setup => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'popular') return setup.popular;
    if (activeFilter === 'solo') return setup.capacity.includes('1') || setup.capacity.includes('2');
    if (activeFilter === 'team') return !setup.capacity.includes('1-2');
    return true;
  });

  return (
    <>
      <section id="setups" className="py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
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
            className="text-center mb-12"
          >
            <div className="inline-flex items-center mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mr-4"></div>
              <span className="text-xs font-montserrat font-medium text-cyan-400 tracking-[0.3em] uppercase">
                Nos Configurations
              </span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-cyan-500 to-transparent ml-4"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
              8 STUDIOS
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400">
                ULTRA-ÉQUIPÉS
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
              Du podcast audio au plateau Full Show 50m², trouvez le setup parfait pour votre projet.
              Chaque studio est clé en main avec technicien expert inclus.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-inter font-bold text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {activeFilter === filter.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Filter className="w-4 h-4" />
                )}
                <span>{filter.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === filter.id
                    ? 'bg-white/20'
                    : 'bg-white/10'
                }`}>
                  {filter.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredSetups.map((setup, index) => {
                const Icon = setup.icon;
                const isHovered = hoveredCard === setup.id;

                return (
                  <motion.div
                    key={setup.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -12 }}
                    onMouseEnter={() => setHoveredCard(setup.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative cursor-pointer"
                    onClick={() => openModal(setup)}
                  >
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${setup.gradient} rounded-3xl opacity-0 blur-xl transition-all duration-500`}
                      animate={{
                        opacity: isHovered ? 0.4 : 0,
                        scale: isHovered ? 1.05 : 1
                      }}
                    />

                    <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 h-full">
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={setup.image}
                          alt={setup.name}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: isHovered ? 1.1 : 1
                          }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                            >
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex flex-col items-center gap-3"
                              >
                                <div className={`p-4 rounded-full bg-gradient-to-r ${setup.gradient}`}>
                                  <Eye className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-white font-montserrat font-bold text-lg">Voir les détails</span>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {setup.popular && (
                          <div className="absolute top-4 right-4">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                              className={`bg-gradient-to-r ${setup.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl`}
                            >
                              <Sparkles className="w-3 h-3" />
                              TOP
                            </motion.div>
                          </div>
                        )}

                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-xl rounded-lg px-3 py-1.5 border border-white/20">
                            <Users className="w-3.5 h-3.5 text-white" />
                            <span className="text-white text-xs font-bold">{setup.capacity}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-xl rounded-lg px-3 py-1.5 border border-white/20">
                            <Clock className="w-3.5 h-3.5 text-white" />
                            <span className="text-white text-xs font-bold">{setup.recommendedDuration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="mb-4">
                          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${setup.gradient} font-montserrat font-bold text-xs tracking-wider uppercase`}>
                            {setup.subtitle}
                          </span>
                          <h3 className="text-xl font-montserrat font-black text-white mt-2 mb-2 flex items-center gap-2">
                            <Icon className="w-5 h-5" />
                            {setup.name}
                          </h3>
                          <p className="text-white/70 font-inter text-sm mb-2 line-clamp-2">
                            {setup.description}
                          </p>
                          <p className="text-white/50 font-inter text-xs italic">
                            {setup.usage}
                          </p>
                        </div>

                        <div className="space-y-2 mb-5 pb-5 border-b border-white/10">
                          <div className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-xs font-inter">{setup.equipment.cameras}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-xs font-inter">{setup.equipment.audio}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                              {setup.basePrice}€
                            </div>
                            <div className="text-white/50 text-xs font-inter font-medium">
                              par heure
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`bg-gradient-to-r ${setup.gradient} rounded-xl px-4 py-2.5 flex items-center gap-2 group/btn shadow-lg`}
                          >
                            <span className="font-montserrat font-bold text-white text-sm">
                              Découvrir
                            </span>
                            <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 mb-8 max-w-2xl">
              <p className="text-white/80 font-inter text-lg mb-4 leading-relaxed">
                <span className="font-bold text-cyan-400">Tous les studios incluent :</span> technicien expert présent,
                transfert des rushes en 2h, assistance technique complète, et équipement Sony professionnel.
              </p>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold transition-all duration-300 shadow-xl"
            >
              Besoin de conseils ? Contactez-nous
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <SetupDetailModal
        setup={selectedSetup}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
