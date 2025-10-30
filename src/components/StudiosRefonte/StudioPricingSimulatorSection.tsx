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
          <div className="inline-flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-fuchsia-400" />
            <span className="text-fuchsia-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Configurateur de prix
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
            CONFIGUREZ VOTRE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400">
              SESSION
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Calculez le coût de votre production en temps réel
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-montserrat font-bold text-white mb-8">
                Configurez votre production
              </h3>

              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-medium mb-4">
                    <Sparkles className="w-5 h-5 text-fuchsia-400" />
                    Choisissez votre studio
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {studios.map((studio) => (
                      <motion.button
                        key={studio.id}
                        onClick={() => onStudioSelect(studio.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedStudioId === studio.id
                            ? `border-fuchsia-400 bg-gradient-to-r ${studio.gradient} bg-opacity-20`
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <studio.icon className={`w-5 h-5 ${selectedStudioId === studio.id ? 'text-fuchsia-400' : 'text-white/60'}`} />
                          <span className={`font-inter font-medium text-xs ${selectedStudioId === studio.id ? 'text-white' : 'text-white/70'}`}>
                            {studio.name}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className={`text-lg font-montserrat font-bold ${selectedStudioId === studio.id ? 'text-fuchsia-400' : 'text-white/50'}`}>
                            {studio.launchPrice}€
                          </span>
                          <span className="text-white/40 text-xs ml-1">/h</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-medium mb-4">
                    <Sparkles className="w-5 h-5 text-fuchsia-400" />
                    Formule
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {formulas.map((formula) => (
                      <motion.button
                        key={formula.id}
                        onClick={() => setSelectedFormulaId(formula.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all relative ${
                          selectedFormulaId === formula.id
                            ? 'border-fuchsia-400 bg-fuchsia-400/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        {formula.popular && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                            Populaire
                          </div>
                        )}
                        <formula.icon className={`w-5 h-5 mx-auto mb-2 ${selectedFormulaId === formula.id ? 'text-fuchsia-400' : 'text-white/60'}`} />
                        <span className={`font-inter font-medium text-xs block mb-1 ${selectedFormulaId === formula.id ? 'text-white' : 'text-white/70'}`}>
                          {formula.name}
                        </span>
                        <span className={`text-xs ${selectedFormulaId === formula.id ? 'text-fuchsia-400' : 'text-white/40'}`}>
                          {formula.displayPrice}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-medium mb-4">
                    <Clock className="w-5 h-5 text-fuchsia-400" />
                    Durée
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {durations.map((duration) => (
                      <motion.button
                        key={duration.id}
                        onClick={() => setSelectedDurationId(duration.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all relative ${
                          selectedDurationId === duration.id
                            ? 'border-fuchsia-400 bg-fuchsia-400/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        {duration.popular && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                            Recommandé
                          </div>
                        )}
                        <span className={`font-inter font-medium block ${selectedDurationId === duration.id ? 'text-white' : 'text-white/70'}`}>
                          {duration.label}
                        </span>
                        {duration.discount && (
                          <span className="text-xs text-rose-400 font-bold">
                            {duration.discount}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-white font-inter font-medium mb-4">Options additionnelles</h4>

                  <div className="space-y-3">
                    {studioAdditionalServices.map((option) => (
                      <motion.label
                        key={option.id}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedOptions[option.id] || false}
                            onChange={(e) => setSelectedOptions({...selectedOptions, [option.id]: e.target.checked})}
                            className="w-5 h-5 accent-fuchsia-400"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-inter font-medium">{option.name}</span>
                              {option.popular && (
                                <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white rounded-full">
                                  Populaire
                                </span>
                              )}
                            </div>
                            <span className="text-white/50 text-sm">{option.description}</span>
                          </div>
                        </div>
                        <span className="text-fuchsia-400 font-montserrat font-bold ml-4">
                          {option.unit === 'fixe' && `+${option.price}€`}
                          {option.unit === '/h' && `+${option.price * currentDuration.hours}€`}
                          {option.unit === 'A/R' && `+${option.price}€`}
                        </span>
                      </motion.label>
                    ))}
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
              <div className="bg-gradient-to-br from-zinc-900 to-black backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-montserrat font-bold text-white mb-8">
                  Récapitulatif
                </h3>

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

                <div className="bg-gradient-to-r from-rose-600/20 via-fuchsia-600/20 to-violet-600/20 rounded-2xl p-6 border border-fuchsia-400/30 mb-8">
                  <div className="flex items-baseline justify-between">
                    <span className="text-white/80 font-inter text-lg">Total HT</span>
                    <div className="text-right">
                      <motion.span
                        key={finalPrice}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400 block"
                      >
                        {finalPrice.toFixed(0)}€
                      </motion.span>
                      <span className="text-white/50 text-sm">TVA 20% en sus</span>
                    </div>
                  </div>
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 text-white rounded-2xl font-montserrat font-bold text-lg shadow-2xl mb-4 flex items-center justify-center gap-3 group"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Ajouter au panier</span>
                </motion.button>

                <p className="text-white/50 text-center text-xs font-inter">
                  Configuration enregistrée dans votre panier
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
