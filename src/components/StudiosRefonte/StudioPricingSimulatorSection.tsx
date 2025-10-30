import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { studios } from '../../data/studios/studiosData';
import { formulas, durations } from '../../data/studios/formulas';
import { studioAdditionalServices } from '../../data/studios/studioAdditionalServices';
import { Calculator, Clock, Sparkles, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface StudioPricingSimulatorSectionProps {
  selectedStudioId: string | null;
  onStudioSelect: (studioId: string) => void;
}

export default function StudioPricingSimulatorSection({ selectedStudioId, onStudioSelect }: StudioPricingSimulatorSectionProps) {
  const [selectedFormulaId, setSelectedFormulaId] = useState('postprod');
  const [selectedDurationId, setSelectedDurationId] = useState('3h');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();

  const currentStudio = studios.find(s => s.id === selectedStudioId) || studios[0];
  const currentFormula = formulas.find(f => f.id === selectedFormulaId) || formulas[0];
  const currentDuration = durations.find(d => d.id === selectedDurationId) || durations[0];

  useEffect(() => {
    if (!selectedStudioId) {
      onStudioSelect(studios[0].id);
    }
  }, [selectedStudioId, onStudioSelect]);

  const basePrice = currentStudio.launchPrice * currentDuration.hours * currentFormula.priceMultiplier * currentDuration.multiplier;

  let optionsPrice = 0;
  Object.keys(selectedOptions).forEach(optionId => {
    if (selectedOptions[optionId]) {
      const option = studioAdditionalServices.find(o => o.id === optionId);
      if (option) {
        if (option.unit === 'fixe') {
          optionsPrice += option.price;
        } else if (option.unit === '/h') {
          optionsPrice += option.price * currentDuration.hours;
        } else {
          optionsPrice += option.price;
        }
      }
    }
  });

  const totalPrice = basePrice + optionsPrice;
  const hasMultipleOptions = Object.values(selectedOptions).filter(Boolean).length >= 2;
  const packageDiscount = hasMultipleOptions ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice - packageDiscount;

  const savings = (currentStudio.basePrice * currentDuration.hours * currentFormula.priceMultiplier * currentDuration.multiplier) - basePrice;

  return (
    <section id="configurator" className="relative py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-fuchsia-600/20 via-rose-600/20 to-violet-600/20 backdrop-blur-xl rounded-full border border-fuchsia-400/30"
          >
            <Calculator className="w-6 h-6 text-fuchsia-400" />
            <span className="text-fuchsia-400 font-montserrat font-bold text-sm tracking-wider uppercase">
              Configurateur de prix
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-tight"
          >
            <span className="inline-block">CONFIGUREZ</span>{' '}
            <span className="inline-block">VOTRE</span>
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400 animate-gradient">
              SESSION
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl font-inter font-light text-white/70 max-w-4xl mx-auto mb-6"
          >
            Calculez le coût de votre production en temps réel
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-white/60 text-sm font-inter"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500"></div>
              <span>Tarifs transparents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"></div>
              <span>Sans frais cachés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-rose-500"></div>
              <span>Devis instantané</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fuchsia-600/10 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-fuchsia-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-montserrat font-bold text-white">
                      Configurez votre production
                    </h3>
                    <p className="text-white/50 text-sm">Personnalisez chaque détail</p>
                  </div>
                </div>

              <div className="space-y-10">
                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-semibold mb-6 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-600 to-violet-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    Choisissez votre studio
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {studios.map((studio, idx) => (
                      <motion.button
                        key={studio.id}
                        onClick={() => onStudioSelect(studio.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-5 rounded-2xl border-2 transition-all group overflow-hidden ${
                          selectedStudioId === studio.id
                            ? `border-fuchsia-400 shadow-lg shadow-fuchsia-500/30`
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        {selectedStudioId === studio.id && (
                          <motion.div
                            layoutId="studio-selector"
                            className={`absolute inset-0 bg-gradient-to-br ${studio.gradient} opacity-10`}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center shadow-lg`}>
                              <studio.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className={`font-inter font-bold text-sm ${selectedStudioId === studio.id ? 'text-white' : 'text-white/70'}`}>
                              {studio.name}
                            </span>
                          </div>
                          <div className="text-left">
                            <span className={`text-2xl font-montserrat font-black ${selectedStudioId === studio.id ? 'text-fuchsia-400' : 'text-white/50'}`}>
                              {studio.launchPrice}€
                            </span>
                            <span className="text-white/40 text-xs ml-1">/h</span>
                            {selectedStudioId === studio.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="mt-2 text-xs text-fuchsia-400 font-medium"
                              >
                                ✓ Sélectionné
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-semibold mb-6 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-fuchsia-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    Formule
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {formulas.map((formula, idx) => (
                      <motion.button
                        key={formula.id}
                        onClick={() => setSelectedFormulaId(formula.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-5 rounded-2xl border-2 transition-all overflow-hidden ${
                          selectedFormulaId === formula.id
                            ? 'border-rose-400 bg-rose-500/10 shadow-lg shadow-rose-500/30'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        {formula.popular && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-lg"
                          >
                            ⭐ Populaire
                          </motion.div>
                        )}
                        <formula.icon className={`w-7 h-7 mx-auto mb-3 ${selectedFormulaId === formula.id ? 'text-rose-400' : 'text-white/60'}`} />
                        <span className={`font-inter font-bold text-sm block mb-1 ${selectedFormulaId === formula.id ? 'text-white' : 'text-white/70'}`}>
                          {formula.name}
                        </span>
                        <span className={`text-xs font-medium ${selectedFormulaId === formula.id ? 'text-rose-400' : 'text-white/40'}`}>
                          {formula.displayPrice}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-semibold mb-6 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    Durée
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {durations.map((duration, idx) => (
                      <motion.button
                        key={duration.id}
                        onClick={() => setSelectedDurationId(duration.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-5 rounded-2xl border-2 transition-all overflow-hidden ${
                          selectedDurationId === duration.id
                            ? 'border-violet-400 bg-violet-500/10 shadow-lg shadow-violet-500/30'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Clock className={`w-5 h-5 ${selectedDurationId === duration.id ? 'text-violet-400' : 'text-white/60'}`} />
                          {duration.discount && (
                            <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white rounded-full font-bold">
                              {duration.discount}
                            </span>
                          )}
                        </div>
                        <span className={`font-inter font-bold text-base block ${selectedDurationId === duration.id ? 'text-white' : 'text-white/70'}`}>
                          {duration.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <label className="flex items-center gap-3 text-white font-inter font-semibold mb-6 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    Options additionnelles
                  </label>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-fuchsia-600/30 scrollbar-track-white/5">
                    {studioAdditionalServices.slice(0, 8).map((option, idx) => (
                      <motion.label
                        key={option.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.05 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedOptions[option.id]
                            ? 'bg-gradient-to-r from-fuchsia-600/10 to-violet-600/10 border-fuchsia-400'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <motion.input
                            type="checkbox"
                            checked={selectedOptions[option.id] || false}
                            onChange={(e) => setSelectedOptions({...selectedOptions, [option.id]: e.target.checked})}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-5 h-5 accent-fuchsia-400 cursor-pointer"
                          />
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center flex-shrink-0`}>
                            <option.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-inter font-bold text-sm ${selectedOptions[option.id] ? 'text-white' : 'text-white/80'}`}>
                                {option.name}
                              </span>
                              {option.popular && (
                                <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white rounded-full font-bold">
                                  ⭐
                                </span>
                              )}
                            </div>
                            <span className="text-white/50 text-xs leading-tight">{option.description}</span>
                          </div>
                        </div>
                        <span className={`font-montserrat font-black text-base ml-4 ${selectedOptions[option.id] ? 'text-fuchsia-400' : 'text-white/60'}`}>
                          {option.unit === 'fixe' && `+${option.price}€`}
                          {option.unit === '/h' && `+${option.price * currentDuration.hours}€`}
                          {option.unit === '/h de vidéo' && `+${option.price}€`}
                          {option.unit === '/h de rush' && `+${option.price}€`}
                          {option.unit === '/vidéo' && `+${option.price}€`}
                          {option.unit === '/pack' && `+${option.price}€`}
                          {option.unit === '/pack de 3' && `+${option.price}€`}
                          {option.unit === '/package' && `+${option.price}€`}
                          {option.unit === 'A/R' && `+${option.price}€`}
                        </span>
                      </motion.label>
                    ))}
                  </div>

                  {studioAdditionalServices.length > 8 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full mt-4 py-3 text-sm text-fuchsia-400 hover:text-fuchsia-300 font-inter font-medium border border-fuchsia-400/30 rounded-xl hover:bg-fuchsia-400/10 transition-all"
                    >
                      Voir toutes les options ({studioAdditionalServices.length})
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-8">
              <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-950 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fuchsia-600/5 via-transparent to-transparent"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-600 to-violet-600 flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-montserrat font-black text-white">
                        Récapitulatif
                      </h3>
                      <p className="text-white/50 text-sm">Votre configuration</p>
                    </div>
                  </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <span className="text-white/80 font-inter block">{currentStudio.name}</span>
                      <span className="text-white/50 text-sm">{currentDuration.label} • {currentFormula.name}</span>
                    </div>
                    <span className="text-white font-montserrat font-bold text-lg">
                      {basePrice.toFixed(0)}€
                    </span>
                  </div>

                  {Object.keys(selectedOptions).filter(key => selectedOptions[key]).map((optionId) => {
                    const option = studioAdditionalServices.find(o => o.id === optionId);
                    if (!option) return null;

                    const optionPrice = option.unit === '/h' ? option.price * currentDuration.hours : option.price;

                    return (
                      <motion.div
                        key={optionId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center justify-between py-3 border-b border-white/10"
                      >
                        <div>
                          <span className="text-white/80 font-inter block">{option.name}</span>
                          <span className="text-white/50 text-sm">{option.description}</span>
                        </div>
                        <span className="text-white font-montserrat font-bold text-lg">
                          {optionPrice}€
                        </span>
                      </motion.div>
                    );
                  })}

                  {hasMultipleOptions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between py-3 border-b border-white/10"
                    >
                      <div>
                        <span className="text-fuchsia-400 font-inter block">Réduction pack</span>
                        <span className="text-white/50 text-sm">-10% sur options</span>
                      </div>
                      <span className="text-fuchsia-400 font-montserrat font-bold text-lg">
                        -{packageDiscount.toFixed(0)}€
                      </span>
                    </motion.div>
                  )}

                  {savings > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between py-3 border-b border-white/10 bg-rose-500/10 -mx-4 px-4 rounded-xl"
                    >
                      <div>
                        <span className="text-rose-400 font-inter block">Offre de lancement</span>
                        <span className="text-white/50 text-sm">Économie sur tarif standard</span>
                      </div>
                      <span className="text-rose-400 font-montserrat font-bold text-lg">
                        -{savings.toFixed(0)}€
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="relative mt-8 mb-8">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(236, 72, 153, 0.3)",
                        "0 0 40px rgba(236, 72, 153, 0.5)",
                        "0 0 20px rgba(236, 72, 153, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-rose-600/20 via-fuchsia-600/20 to-violet-600/20 rounded-2xl p-8 border-2 border-fuchsia-400/50"
                  >
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-white/60 font-inter text-sm block mb-1">Total estimé</span>
                        <span className="text-white font-inter text-xl font-bold">Hors taxe</span>
                      </div>
                      <div className="text-right">
                        <motion.span
                          key={finalPrice}
                          initial={{ scale: 1.3, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-6xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400 block leading-none"
                        >
                          {finalPrice.toFixed(0)}€
                        </motion.span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">TVA 20%</span>
                      <span className="text-white/70 font-medium">+{(finalPrice * 0.2).toFixed(0)}€</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-3"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-inter font-bold">Total TTC</span>
                      <span className="text-2xl font-montserrat font-black text-white">
                        {(finalPrice * 1.2).toFixed(0)}€
                      </span>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  onClick={() => {
                    const selectedOptionsArray = Object.keys(selectedOptions)
                      .filter(key => selectedOptions[key])
                      .map(optionId => {
                        const option = studioAdditionalServices.find(o => o.id === optionId);
                        return option ? {
                          id: option.id,
                          name: option.name,
                          price: option.unit === '/h' ? option.price * currentDuration.hours : option.price
                        } : null;
                      })
                      .filter(Boolean) as Array<{ id: string; name: string; price: number }>;

                    addItem({
                      id: `studio-${currentStudio.id}-${Date.now()}`,
                      serviceType: 'studio',
                      serviceName: currentStudio.name,
                      date: new Date().toISOString().split('T')[0],
                      duration: 'hour',
                      price: currentStudio.launchPrice,
                      quantity: 1,
                      studioConfig: {
                        studioId: currentStudio.id,
                        formulaId: currentFormula.id,
                        formulaName: currentFormula.name,
                        durationId: currentDuration.id,
                        durationLabel: currentDuration.label,
                        durationHours: currentDuration.hours,
                        options: selectedOptionsArray
                      },
                      image: currentStudio.image,
                      gradient: currentStudio.gradient
                    });
                  }}
                  whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-full py-6 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 text-white rounded-2xl font-montserrat font-bold text-lg shadow-2xl mb-4 flex items-center justify-center gap-3 group overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">Ajouter au panier</span>
                </motion.button>

                <div className="flex items-center justify-center gap-2 text-white/50 text-xs font-inter">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p>Configuration sauvegardée • Aucun engagement</p>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
