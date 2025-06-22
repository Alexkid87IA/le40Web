import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { formulas } from '../../data/formulas';

export default function StepFormula({ isActive, selectedFormula, onFormulaChange, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
      className={isActive ? '' : 'pointer-events-none'}
    >
      <h3 className="text-2xl font-montserrat font-bold text-white mb-6 flex items-center gap-3">
        <span className={`text-4xl ${isActive ? 'text-purple-400' : 'text-white/20'}`}>2</span>
        Formule
      </h3>
      <div className="space-y-4">
        {formulas.map(formula => (
          <motion.label
            key={formula.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`block p-6 rounded-2xl cursor-pointer transition-all relative ${
              selectedFormula === formula.id
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500'
                : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
            }`}
          >
            {formula.popular && (
              <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                Populaire
              </span>
            )}
            <input
              type="radio"
              name="formula"
              value={formula.id}
              checked={selectedFormula === formula.id}
              onChange={() => onFormulaChange(formula.id)}
              className="sr-only"
            />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <formula.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-lg mb-1">{formula.name}</p>
                <p className="text-white/60 text-sm mb-3">{formula.longDescription}</p>
                <div className="mb-3">
                  <span className="text-purple-400 font-bold text-lg">{formula.displayPrice}</span>
                </div>
                <ul className="space-y-2">
                  {formula.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-white/80 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
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