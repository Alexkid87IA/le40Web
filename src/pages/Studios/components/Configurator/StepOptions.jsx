import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Camera, Film, Sparkles, Zap, Monitor, Coffee } from 'lucide-react';
import { optionsCatalog } from '../../data/optionsCatalog';
import { durations } from '../../data/durations';

export default function StepOptions({ isActive, selectedOptions, onOptionsChange, onNext, selectedDuration }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleOption = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      onOptionsChange(selectedOptions.filter(id => id !== optionId));
    } else {
      onOptionsChange([...selectedOptions, optionId]);
    }
  };

  const duration = durations.find(d => d.id === selectedDuration);

  const categories = [
    { id: 'all', name: 'Toutes', icon: Layers, color: 'purple' },
    { id: 'production', name: 'Production', icon: Camera, color: 'purple' },
    { id: 'postprod', name: 'Post-Prod', icon: Film, color: 'blue' },
    { id: 'creative', name: 'Création', icon: Sparkles, color: 'emerald' },
    { id: 'social', name: 'Social', icon: Zap, color: 'pink' },
    { id: 'ads', name: 'Ads', icon: Monitor, color: 'orange' },
    { id: 'comfort', name: 'Confort', icon: Coffee, color: 'violet' }
  ];

  const optionsByCategory = {
    production: ['extra-cameras', 'live-switch', 'teleprompter', 'sd-card', 'cloud-backup'],
    postprod: ['color-grading', 'subtitles', 'motion-graphics', 'vertical-master'],
    creative: ['coaching', 'script', 'youtube-audit'],
    social: ['shorts-pack', 'extra-short', 'thumbnail', 'calendar'],
    ads: ['setup-ads', 'tiktok-boost', 'dashboard'],
    comfort: ['snacks', 'lunch-box', 'buffet', 'transport-gare', 'transport-airport']
  };

  const getVisibleOptions = () => {
    if (selectedCategory === 'all') {
      return Object.keys(optionsCatalog);
    }
    return optionsByCategory[selectedCategory] || [];
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
      className={isActive ? '' : 'pointer-events-none'}
    >
      <h3 className="text-2xl font-montserrat font-bold text-white mb-6 flex items-center gap-3">
        <span className={`text-4xl ${isActive ? 'text-purple-400' : 'text-white/20'}`}>3</span>
        Options
      </h3>
      
      {/* Tabs pour les catégories */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                selectedCategory === category.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {getVisibleOptions().map(optionId => {
          const option = optionsCatalog[optionId];
          if (!option) return null;

          return (
            <motion.label
              key={optionId}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`block p-4 rounded-2xl cursor-pointer transition-all ${
                selectedOptions.includes(optionId)
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500'
                  : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(optionId)}
                  onChange={() => toggleOption(optionId)}
                  className="w-5 h-5 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <option.icon className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">
                          {option.name}
                          {option.recommended && (
                            <span className="ml-2 text-xs bg-purple-600/50 text-purple-300 px-2 py-0.5 rounded-full">
                              Recommandé
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold">
                        {option.unit === '/h' ? option.price * duration.hours : option.price}€
                      </span>
                      <span className="text-white/40 text-xs ml-1">{option.unit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.label>
          );
        })}
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