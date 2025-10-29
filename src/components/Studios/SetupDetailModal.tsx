import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Plus, Minus, Users, Clock, Video, Camera, Mic2, Lightbulb, Package, ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';
import { optionsCatalog } from '../../data/studios/options';

interface Setup {
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
  equipment: {
    cameras: string;
    audio: string;
    light: string;
    extras: string;
  };
  relevantOptions: string[];
}

interface SetupDetailModalProps {
  setup: Setup | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SetupDetailModal({ setup, isOpen, onClose }: SetupDetailModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [duration, setDuration] = useState(1);

  if (!setup) return null;

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const calculateTotal = () => {
    let total = setup.basePrice * duration;
    selectedOptions.forEach(optionId => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      if (option) {
        if (option.unit === '/h') {
          total += option.price * duration;
        } else {
          total += option.price;
        }
      }
    });
    return total;
  };

  const Icon = setup.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-slate-900 rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden border-2 border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full transition-colors border border-white/20"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="relative h-80 overflow-hidden">
                  <img
                    src={setup.image}
                    alt={setup.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                  {setup.popular && (
                    <div className="absolute top-6 left-6">
                      <div className={`bg-gradient-to-r ${setup.gradient} text-white text-sm font-bold px-5 py-2 rounded-full flex items-center gap-2 shadow-xl`}>
                        <Icon className="w-4 h-4" />
                        POPULAIRE
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-bold">{setup.capacity}</span>
                      </div>
                      <div className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-bold">Recommandé: {setup.recommendedDuration}</span>
                      </div>
                    </div>
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${setup.gradient} font-montserrat font-bold text-lg tracking-wider uppercase`}>
                      {setup.subtitle}
                    </span>
                    <h2 className="text-5xl font-montserrat font-black text-white mb-2">
                      {setup.name}
                    </h2>
                  </div>
                </div>

                <div className="p-8 max-h-[60vh] overflow-y-auto">
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-2xl font-montserrat font-black text-white mb-4">À propos</h3>
                      <p className="text-white/80 font-inter text-lg mb-4 leading-relaxed">
                        {setup.description}
                      </p>
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                        <p className="text-white/60 font-inter text-sm mb-2 font-semibold">IDÉAL POUR:</p>
                        <p className="text-white font-inter">{setup.usage}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-montserrat font-black text-white mb-4">Équipement inclus</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                          <Camera className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white/60 text-xs font-inter font-semibold mb-1">CAMÉRAS</p>
                            <p className="text-white font-inter font-medium">{setup.equipment.cameras}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                          <Mic2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white/60 text-xs font-inter font-semibold mb-1">AUDIO</p>
                            <p className="text-white font-inter font-medium">{setup.equipment.audio}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                          <Lightbulb className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white/60 text-xs font-inter font-semibold mb-1">ÉCLAIRAGE</p>
                            <p className="text-white font-inter font-medium">{setup.equipment.light}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                          <Package className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white/60 text-xs font-inter font-semibold mb-1">EXTRAS</p>
                            <p className="text-white font-inter font-medium">{setup.equipment.extras}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-montserrat font-black text-white mb-6 flex items-center gap-2">
                      <Plus className="w-6 h-6 text-cyan-400" />
                      Options recommandées
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {setup.relevantOptions.map((optionId) => {
                        const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                        if (!option) return null;

                        const OptionIcon = option.icon;
                        const isSelected = selectedOptions.includes(optionId);

                        return (
                          <motion.div
                            key={optionId}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleOption(optionId)}
                            className={`relative cursor-pointer rounded-xl p-5 border-2 transition-all duration-300 ${
                              isSelected
                                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/50'
                                : 'bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/30'
                            }`}
                          >
                            {option.recommended && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  RECOMMANDÉ
                                </div>
                              </div>
                            )}
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-xl ${isSelected ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
                                <OptionIcon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-white/60'}`} />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-inter font-bold mb-1">{option.name}</h4>
                                <p className="text-white/60 text-sm font-inter mb-2">{option.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-cyan-400 font-montserrat font-bold">
                                    {option.price}€ {option.unit}
                                  </span>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-white/30'
                                  }`}>
                                    {isSelected && <Check className="w-4 h-4 text-white" />}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-montserrat font-black text-white mb-2">Durée de réservation</h3>
                        <p className="text-white/60 text-sm font-inter">Ajustez la durée selon vos besoins</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setDuration(Math.max(1, duration - 1))}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
                        >
                          <Minus className="w-5 h-5 text-white" />
                        </button>
                        <div className="text-center">
                          <div className="text-3xl font-montserrat font-black text-white">{duration}</div>
                          <div className="text-white/60 text-sm font-inter">heure{duration > 1 ? 's' : ''}</div>
                        </div>
                        <button
                          onClick={() => setDuration(duration + 1)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
                        >
                          <Plus className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div>
                        <p className="text-white/60 text-sm font-inter mb-1">TOTAL ESTIMÉ</p>
                        <p className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                          {calculateTotal()}€
                        </p>
                      </div>
                      <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white rounded-xl font-montserrat font-bold shadow-2xl hover:shadow-cyan-500/50 transition-shadow"
                      >
                        <span>Réserver maintenant</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-2 text-sm text-white/60 font-inter">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Technicien professionnel et livraison des rushs inclus dans tous les forfaits. Annulation gratuite jusqu'à 48h avant.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
