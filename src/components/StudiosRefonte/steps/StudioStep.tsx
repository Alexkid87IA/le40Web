/**
 * StudioStep - Step 1: Studio Selection
 * Refonte UX: plus compact, meilleure lisibilité
 */

import { motion } from 'framer-motion';
import { Check, Clock, Star } from 'lucide-react';
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
      className="space-y-5"
    >
      {/* Header compact */}
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-montserrat font-black text-white mb-1">
          Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">studio</span>
        </h2>
        <p className="text-white/60 text-sm">Sélectionnez le studio adapté à votre projet</p>
      </div>

      {/* Studios grid - more compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {STUDIOS.map((studio) => {
          const Icon = studio.icon;
          const isSelected = selectedStudio?.id === studio.id;

          return (
            <motion.button
              key={studio.id}
              onClick={() => onSelectStudio(studio)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              {/* Recommended badge */}
              {studio.recommended && (
                <div className="absolute -top-2 right-3 px-2 py-0.5 bg-amber-500 rounded-full text-[10px] font-bold text-black flex items-center gap-1">
                  <Star className="w-2.5 h-2.5" />
                  Top
                </div>
              )}

              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`p-2.5 rounded-lg shrink-0 ${
                  isSelected ? 'bg-emerald-500' : 'bg-white/10'
                }`}>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white/70'}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-bold text-sm leading-tight ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                      {studio.shortName}
                    </h3>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-white/70' : 'text-white/50'}`}>
                    {studio.description}
                  </p>
                </div>
              </div>

              {/* Features tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {studio.features.slice(0, 2).map((feature, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-white/50'
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className={`text-xl font-black ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                  {studio.basePrice}€
                </span>
                <span className="text-xs text-white/40">/heure</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Duration Selection - inline when studio selected */}
      {selectedStudio && (
        <motion.div
          ref={durationSectionRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Durée de location
            </h3>
            <span className="text-xs text-white/40">
              Studio: {selectedStudio.shortName}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['2h', '4h', '8h'].map((dur) => {
              const isActive = selectedDuration === dur;
              const price = selectedStudio.basePrice * parseInt(dur);

              return (
                <button
                  key={dur}
                  onClick={() => onSelectDuration(dur)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className={`text-xl font-black ${isActive ? 'text-emerald-400' : 'text-white'}`}>
                    {dur}
                  </div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wide">
                    {dur === '2h' ? 'Standard' : dur === '4h' ? 'Demi-journée' : 'Journée'}
                  </div>
                  <div className={`text-sm font-bold mt-1 ${isActive ? 'text-emerald-400' : 'text-white/70'}`}>
                    {price}€
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
