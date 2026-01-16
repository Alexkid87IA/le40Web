/**
 * StudioStep - Step 1: Studio Selection
 */

import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import { STUDIOS } from '../../../data/studios';
import type { StudioStepProps } from './types';

export default function StudioStep({
  selectedStudio,
  selectedDuration,
  onSelectStudio,
  onSelectDuration,
  durationSectionRef,
}: StudioStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-2">
          Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">studio</span>
        </h2>
        <p className="text-white/60">Sélectionnez le studio adapté à votre projet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {STUDIOS.map((studio) => {
          const Icon = studio.icon;
          const isSelected = selectedStudio?.id === studio.id;

          return (
            <motion.button
              key={studio.id}
              onClick={() => onSelectStudio(studio)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? `border-${studio.color}-500 bg-gradient-to-br ${studio.gradient} shadow-lg shadow-${studio.color}-500/20`
                  : 'border-white/10 bg-zinc-900/50 hover:border-white/20'
              }`}
            >
              {studio.recommended && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-amber-500 rounded-full text-xs font-bold text-black">
                  Recommandé
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  isSelected ? 'bg-white/20' : `bg-${studio.color}-500/10`
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isSelected ? 'text-white' : `text-${studio.color}-400`
                  }`} />
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-white'}`}>
                    {studio.shortName}
                  </h3>
                  <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                    {studio.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {studio.features.slice(0, 2).map((feature, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-lg text-xs ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60'
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`text-2xl font-black ${isSelected ? 'text-white' : 'text-white'}`}>
                  {studio.basePrice}€<span className="text-sm font-normal opacity-60">/h</span>
                </span>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-emerald-500" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Duration Selection */}
      {selectedStudio && (
        <motion.div
          ref={durationSectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            Durée de location
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {['2h', '4h', '8h'].map((dur) => (
              <button
                key={dur}
                onClick={() => onSelectDuration(dur)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedDuration === dur
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="text-2xl font-black text-white">{dur}</div>
                <div className="text-sm text-white/60">
                  {dur === '2h' ? 'Standard' : dur === '4h' ? 'Demi-journée' : 'Journée'}
                </div>
                <div className="text-lg font-bold text-emerald-400 mt-2">
                  {selectedStudio.basePrice * parseInt(dur)}€
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
