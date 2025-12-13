import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Filter, Play, ArrowRight, Users, Clock, Check, Star, TrendingUp, Zap, Eye } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';
import { useStudioTracking, ProfileType } from '../../hooks/useStudioTracking';
import { supabase } from '../../lib/supabase';

type FilterType = 'all' | 'creator' | 'enterprise' | 'agency';

const filterOptions = [
  { id: 'all' as FilterType, label: 'Tous les Studios', icon: Filter },
  { id: 'creator' as FilterType, label: 'Pour Créateurs', icon: Zap },
  { id: 'enterprise' as FilterType, label: 'Corporate', icon: TrendingUp },
  { id: 'agency' as FilterType, label: 'Agences', icon: Users },
];

const profileMapping: Record<FilterType, string[]> = {
  all: [],
  creator: ['face-cam', 'tiktok', 'podcast-audio', 'stream'],
  enterprise: ['full-show', 'green-screen', 'intimiste', 'photo'],
  agency: ['full-show', 'green-screen', 'stream', 'photo']
};

interface StudioAvailability {
  studioId: string;
  availableSlotsThisWeek: number;
  demandLevel: 'low' | 'normal' | 'high' | 'critical';
}

export default function StudioDiscoverySection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [hoveredStudio, setHoveredStudio] = useState<string | null>(null);
  const [selectedStudios, setSelectedStudios] = useState<string[]>([]);
  const [availability, setAvailability] = useState<Record<string, StudioAvailability>>({});
  const { trackEvent, trackStudioView } = useStudioTracking();

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const { data } = await supabase
        .from('studio_availability_real_time')
        .select('studio_id, is_available, demand_level')
        .gte('date', new Date().toISOString().split('T')[0]);

      if (data) {
        const availabilityMap: Record<string, StudioAvailability> = {};
        data.forEach((item: any) => {
          if (!availabilityMap[item.studio_id]) {
            availabilityMap[item.studio_id] = {
              studioId: item.studio_id,
              availableSlotsThisWeek: 0,
              demandLevel: item.demand_level || 'normal'
            };
          }
          if (item.is_available) {
            availabilityMap[item.studio_id].availableSlotsThisWeek++;
          }
        });
        setAvailability(availabilityMap);
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    }
  };

  const filteredStudios = activeFilter === 'all'
    ? studioSetups
    : studioSetups.filter(studio => profileMapping[activeFilter].includes(studio.id));

  const toggleStudioSelection = (studioId: string) => {
    setSelectedStudios(prev => {
      if (prev.includes(studioId)) {
        return prev.filter(id => id !== studioId);
      }
      if (prev.length < 3) {
        return [...prev, studioId];
      }
      return prev;
    });

    trackEvent({
      eventType: 'studio_comparison_toggled',
      eventData: { studioId },
      pageSection: 'discovery'
    });
  };

  const handleStudioHover = (studioId: string) => {
    setHoveredStudio(studioId);
    trackStudioView(studioId);
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    trackEvent({
      eventType: 'filter_changed',
      eventData: { filter },
      pageSection: 'discovery'
    });
  };

  const getDemandBadge = (studioId: string) => {
    const avail = availability[studioId];
    if (!avail) return null;

    const configs = {
      critical: { text: 'Forte demande', color: 'from-red-500 to-orange-500', icon: '🔥' },
      high: { text: 'Demandé', color: 'from-orange-500 to-yellow-500', icon: '⚡' },
      normal: { text: 'Disponible', color: 'from-green-500 to-emerald-500', icon: '✓' },
      low: { text: 'Très disponible', color: 'from-blue-500 to-cyan-500', icon: '💎' }
    };

    const config = configs[avail.demandLevel];
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${config.color} rounded-full text-white text-xs font-bold shadow-lg`}>
        <span>{config.icon}</span>
        <span>{config.text}</span>
      </div>
    );
  };

  return (
    <section id="studios" className="relative py-24 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
           style={{
             backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
             backgroundSize: '48px 48px'
           }}>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-40 w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-[150px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-xl mb-8"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-inter text-sm font-bold">8 Configurations Professionnelles</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
            Choisissez Votre
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400">
              Studio Idéal
            </span>
          </h2>

          <p className="text-xl text-white/70 font-inter max-w-3xl mx-auto mb-12 leading-relaxed">
            Du podcast intime au plateau TV, chaque studio est optimisé pour un usage spécifique.
            Équipement Sony FX3, technicien inclus, livraison rapide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              const isActive = activeFilter === option.id;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleFilterChange(option.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative group ${isActive ? 'z-10' : ''}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 rounded-xl blur-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 text-white shadow-xl'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 hover:border-white/20'
                  }`}>
                    <Icon className="w-5 h-5" />
                    <span>{option.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {selectedStudios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-50"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-montserrat font-bold">
                        {selectedStudios.length} studio{selectedStudios.length > 1 ? 's' : ''} sélectionné{selectedStudios.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-white/60 text-sm font-inter">
                        Comparez jusqu'à 3 studios
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedStudios([])}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-montserrat font-bold transition-all duration-300"
                    >
                      Effacer
                    </motion.button>
                    <motion.a
                      href="#comparator"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-montserrat font-bold shadow-xl"
                    >
                      <span>Comparer</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudios.map((studio, index) => {
              const Icon = studio.icon;
              const isHovered = hoveredStudio === studio.id;
              const isSelected = selectedStudios.includes(studio.id);
              const avail = availability[studio.id];

              return (
                <motion.div
                  key={studio.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => handleStudioHover(studio.id)}
                  onMouseLeave={() => setHoveredStudio(null)}
                  className="group relative"
                >
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${studio.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  />

                  <div className={`relative bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 h-full ${
                    isSelected ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-950' : 'border border-white/10 group-hover:border-white/30'
                  }`}>
                    <div className="relative aspect-video overflow-hidden">
                      <motion.img
                        src={studio.image}
                        alt={studio.name}
                        className="w-full h-full object-cover"
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white cursor-pointer"
                        >
                          <Play className="w-7 h-7 text-white ml-1 fill-white" />
                        </motion.div>
                      </motion.div>

                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                        <div className={`inline-flex p-3 bg-gradient-to-br ${studio.gradient} rounded-xl shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {studio.popular && (
                          <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-bold shadow-lg">
                            <Star className="w-3 h-3 fill-white" />
                            <span>Populaire</span>
                          </div>
                        )}
                      </div>

                      {getDemandBadge(studio.id) && (
                        <div className="absolute bottom-4 left-4">
                          {getDemandBadge(studio.id)}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-montserrat font-black text-white mb-2">
                        {studio.name}
                      </h3>
                      <p className="text-cyan-400 font-inter text-sm font-bold mb-4">
                        {studio.subtitle}
                      </p>

                      <p className="text-white/70 font-inter text-sm mb-6 leading-relaxed">
                        {studio.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                          <Users className="w-4 h-4 text-white/50" />
                          <span className="text-white/80 font-inter">{studio.capacity}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="w-4 h-4 text-white/50" />
                          <span className="text-white/80 font-inter">Recommandé: {studio.recommendedDuration}</span>
                        </div>
                        {avail && avail.availableSlotsThisWeek > 0 && (
                          <div className="flex items-center gap-3 text-sm">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 font-inter font-semibold">
                              {avail.availableSlotsThisWeek} créneaux disponibles
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-white/50 text-xs font-inter mb-1">À partir de</p>
                          <p className="text-3xl font-montserrat font-black text-white">
                            {studio.basePrice}€
                            <span className="text-lg font-normal text-white/70">/h</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleStudioSelection(studio.id)}
                          className={`flex-1 py-3 rounded-xl font-montserrat font-bold transition-all duration-300 ${
                            isSelected
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-xl'
                              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                          }`}
                        >
                          {isSelected ? 'Sélectionné' : 'Comparer'}
                        </motion.button>

                        <motion.a
                          href={`#configure?studio=${studio.id}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${studio.gradient} text-white rounded-xl font-montserrat font-bold shadow-xl`}
                        >
                          <span>Réserver</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 font-inter mb-6">
            Pas sûr de votre choix ? Notre équipe vous conseille gratuitement
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold transition-all duration-300"
          >
            <span>Parler à un Expert</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
