import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Eye, ArrowRight, Sparkles, Users, Clock, Star, TrendingUp, Zap } from 'lucide-react';

interface StudioCardProps {
  studio: {
    id: string;
    name: string;
    subtitle: string;
    capacity: string;
    description: string;
    usage: string;
    basePrice: number;
    recommendedDuration: string;
    popular?: boolean;
    gradient: string;
    image: string;
    icon: React.ElementType;
    equipment: {
      cameras: string;
      audio: string;
      light: string;
      extras: string;
    };
  };
  onClick: () => void;
  index: number;
}

export default function EnhancedStudioCard({ studio, onClick, index }: StudioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = studio.icon;

  const quickFeatures = [
    { icon: Users, value: studio.capacity, label: 'Capacité' },
    { icon: Clock, value: studio.recommendedDuration, label: 'Recommandé' },
    { icon: Zap, value: `${studio.basePrice}€/h`, label: 'Tarif' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer h-full"
      onClick={onClick}
    >
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${studio.gradient} rounded-3xl opacity-0 blur-xl transition-all duration-500`}
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.05 : 1
        }}
      />

      <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={studio.image}
            alt={studio.name}
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
                  <div className={`p-4 rounded-full bg-gradient-to-r ${studio.gradient}`}>
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-white font-montserrat font-bold text-lg">Voir les détails</span>
                  <div className="flex items-center gap-2 text-cyan-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Configuration interactive</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {studio.popular && (
            <div className="absolute top-4 right-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + (index * 0.05), type: "spring" }}
                className={`bg-gradient-to-r ${studio.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl`}
              >
                <Sparkles className="w-3 h-3" />
                TOP CHOIX
              </motion.div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.05) }}
              className="grid grid-cols-3 gap-2"
            >
              {quickFeatures.map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={idx} className="bg-black/70 backdrop-blur-xl rounded-lg px-3 py-2 border border-white/20">
                    <FeatureIcon className="w-3.5 h-3.5 text-white mb-1" />
                    <div className="text-white text-xs font-bold truncate">{feature.value}</div>
                    <div className="text-white/60 text-[10px]">{feature.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${studio.gradient} font-montserrat font-bold text-xs tracking-wider uppercase`}>
              {studio.subtitle}
            </span>
            <h3 className="text-2xl font-montserrat font-black text-white mt-2 mb-2 flex items-center gap-2">
              <Icon className="w-6 h-6" />
              {studio.name}
            </h3>
            <p className="text-white/70 font-inter text-sm mb-2 line-clamp-2">
              {studio.description}
            </p>
            <div className="flex items-center gap-2 text-white/50 text-xs italic">
              <Star className="w-3 h-3 text-yellow-400" />
              <span className="line-clamp-1">{studio.usage}</span>
            </div>
          </div>

          <div className="space-y-2 mb-5 pb-5 border-b border-white/10">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-xs font-inter">{studio.equipment.cameras}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-xs font-inter">{studio.equipment.audio}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-xs font-inter">{studio.equipment.light}</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {studio.basePrice}€
                </div>
                <div className="text-white/50 text-xs font-inter font-medium">
                  par heure
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r ${studio.gradient} rounded-xl px-5 py-3 flex items-center gap-2 group/btn shadow-lg`}
              >
                <span className="font-montserrat font-bold text-white text-sm">
                  Configurer
                </span>
                <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-white/5 px-6 py-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/70 font-inter">
                  ✓ Technicien inclus
                </span>
                <span className="text-white/70 font-inter">
                  ✓ Rushs en 2h
                </span>
                <span className="text-cyan-400 font-inter font-bold">
                  → Cliquer pour détails
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
