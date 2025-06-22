import React from 'react';
import { motion } from 'framer-motion';
import { durations } from '../../data/durations';

export default function StepDuration({ isActive, selectedDuration, onDurationChange, onNext, basePrice }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
      className={isActive ? '' : 'pointer-events-none'}
    >
      <h3 className="text-2xl font-montserrat font-bold text-white mb-6 flex items-center gap-3">
        <span className={`text-4xl ${isActive ? 'text-purple-400' : 'text-white/20'}`}>1</span>
        Durée
      </h3>
      <div className="space-y-4">
        {durations.map(duration => (
          <motion.label
            key={duration.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`block p-6 rounded-2xl cursor-pointer transition-all relative overflow-hidden ${
              selectedDuration === duration.id
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500'
                : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
            }`}
          >
            {duration.popular && (
              <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                Recommandé
              </span>
            )}
            <input
              type="radio"
              name="duration"
              value={duration.id}
              checked={selectedDuration === duration.id}
              onChange={() => onDurationChange(duration.id)}
              className="sr-only"
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-lg">{duration.label}</p>
                <p className="text-purple-400 text-3xl font-montserrat font-bold mt-2">
                  {Math.round(basePrice * duration.multiplier)}€
                </p>
              </div>
              {duration.discount && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold"
                >
                  {duration.discount}
                </motion.span>
              )}
            </div>
          </motion.label>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-montserrat font-semibold"
      >
        Continuer →
      </motion.button>
    </motion.div>
  );
}