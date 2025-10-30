import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { studios } from '../../data/studios/studiosData';
import { formulas, durations } from '../../data/studios/formulas';
import { studioAdditionalServices } from '../../data/studios/studioAdditionalServices';
import { Calculator, Clock, Sparkles, ShoppingCart, Check, Share2, Save, ChevronRight, Info, Package, Wrench, Truck, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { supabase } from '../../lib/supabase';

interface StudioPricingSimulatorSectionProps {
  selectedStudioId: string | null;
  onStudioSelect: (studioId: string) => void;
}

const STEPS = [
  { id: 1, label: 'Studio', icon: Sparkles },
  { id: 2, label: 'Formule & Durée', icon: Clock },
  { id: 3, label: 'Options', icon: Package },
  { id: 4, label: 'Récapitulatif', icon: Check }
];

export default function StudioPricingSimulatorSection({ selectedStudioId, onStudioSelect }: StudioPricingSimulatorSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFormulaId, setSelectedFormulaId] = useState('postprod');
  const [selectedDurationId, setSelectedDurationId] = useState('3h');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<'post-production' | 'equipement' | 'services'>('post-production');
  const [isSaving, setIsSaving] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
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

  const saveConfiguration = async () => {
    setIsSaving(true);
    try {
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
        .filter(Boolean);

      const { data, error } = await supabase
        .from('studio_configurations')
        .insert({
          studio_id: currentStudio.id,
          studio_name: currentStudio.name,
          formula_id: currentFormula.id,
          formula_name: currentFormula.name,
          duration_id: currentDuration.id,
          duration_label: currentDuration.label,
          duration_hours: currentDuration.hours,
          selected_options: selectedOptionsArray,
          total_price_ht: finalPrice,
          total_price_ttc: finalPrice * 1.2
        })
        .select('share_token')
        .single();

      if (error) throw error;

      setShareToken(data.share_token);

      setTimeout(() => {
        setShareToken(null);
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const categorizedOptions = {
    'post-production': studioAdditionalServices.filter(o => o.category === 'post-production'),
    'equipement': studioAdditionalServices.filter(o => o.category === 'equipement'),
    'services': studioAdditionalServices.filter(o => o.category === 'services')
  };

  const categoryIcons = {
    'post-production': Package,
    'equipement': Wrench,
    'services': Truck
  };

  const categoryLabels = {
    'post-production': 'Post-Production',
    'equipement': 'Équipement',
    'services': 'Services'
  };

  return (
    <section id="configurator" className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
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
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 backdrop-blur-xl rounded-full border border-emerald-400/30"
          >
            <Calculator className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 font-montserrat font-bold text-sm tracking-wider uppercase">
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
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400 animate-gradient">
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
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <span>Tarifs transparents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              <span>Sans frais cachés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <span>Devis instantané</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="mb-16">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <motion.button
                    onClick={() => setCurrentStep(step.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-3 flex-1"
                  >
                    <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/50'
                        : isCompleted
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                        : 'bg-white/10 border border-white/20'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-7 h-7 text-white" />
                      ) : (
                        <StepIcon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-white/60'}`} />
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`font-inter font-bold text-sm ${
                        isActive ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-white/60'
                      }`}>
                        {step.label}
                      </div>
                    </div>
                  </motion.button>
                  {index < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-4 transition-all ${
                      currentStep > step.id ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-white/10'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-600/10 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-montserrat font-bold text-white">
                            Choisissez votre studio
                          </h3>
                          <p className="text-white/50 text-sm">Sélectionnez l'espace qui correspond à votre projet</p>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        {studios.map((studio, idx) => (
                          <motion.button
                            key={studio.id}
                            onClick={() => onStudioSelect(studio.id)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-5 rounded-2xl border-2 transition-all group overflow-hidden text-left ${
                              selectedStudioId === studio.id
                                ? `border-emerald-400 shadow-lg shadow-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10`
                                : 'border-white/10 bg-white/5 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                <studio.icon className="w-8 h-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`font-inter font-bold text-lg ${selectedStudioId === studio.id ? 'text-white' : 'text-white/80'}`}>
                                    {studio.name}
                                  </span>
                                  {studio.popular && (
                                    <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold">
                                      ⭐ Populaire
                                    </span>
                                  )}
                                </div>
                                <p className="text-white/60 text-sm mb-2">{studio.subtitle}</p>
                                <div className="flex items-center gap-4">
                                  <div>
                                    <span className={`text-3xl font-montserrat font-black ${selectedStudioId === studio.id ? 'text-emerald-400' : 'text-white/60'}`}>
                                      {studio.launchPrice}€
                                    </span>
                                    <span className="text-white/40 text-xs ml-1">/h</span>
                                  </div>
                                  {studio.savings > 0 && (
                                    <div className="px-2 py-1 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
                                      <span className="text-emerald-400 text-xs font-bold">-{studio.savings}€</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {selectedStudioId === studio.id && (
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => setCurrentStep(2)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-inter font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                      >
                        Continuer
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                            <span className="text-white font-bold">1</span>
                          </div>
                          <h3 className="text-xl font-inter font-bold text-white">Formule</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {formulas.map((formula, idx) => (
                            <motion.button
                              key={formula.id}
                              onClick={() => setSelectedFormulaId(formula.id)}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{ scale: 1.05, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-5 rounded-2xl border-2 transition-all overflow-hidden ${
                                selectedFormulaId === formula.id
                                  ? 'border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/30'
                                  : 'border-white/10 bg-white/5 hover:border-white/30'
                              }`}
                            >
                              {formula.popular && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-lg">
                                  ⭐
                                </div>
                              )}
                              <formula.icon className={`w-7 h-7 mx-auto mb-3 ${selectedFormulaId === formula.id ? 'text-emerald-400' : 'text-white/60'}`} />
                              <span className={`font-inter font-bold text-sm block mb-1 ${selectedFormulaId === formula.id ? 'text-white' : 'text-white/70'}`}>
                                {formula.name}
                              </span>
                              <span className={`text-xs font-medium ${selectedFormulaId === formula.id ? 'text-emerald-400' : 'text-white/40'}`}>
                                {formula.displayPrice}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center">
                            <span className="text-white font-bold">2</span>
                          </div>
                          <h3 className="text-xl font-inter font-bold text-white">Durée</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {durations.map((duration, idx) => (
                            <motion.button
                              key={duration.id}
                              onClick={() => setSelectedDurationId(duration.id)}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                              whileHover={{ scale: 1.05, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-5 rounded-2xl border-2 transition-all overflow-hidden ${
                                selectedDurationId === duration.id
                                  ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/30'
                                  : 'border-white/10 bg-white/5 hover:border-white/30'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Clock className={`w-5 h-5 ${selectedDurationId === duration.id ? 'text-cyan-400' : 'text-white/60'}`} />
                                {duration.discount && (
                                  <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold">
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

                      <div className="flex gap-4">
                        <motion.button
                          onClick={() => setCurrentStep(1)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 bg-white/10 text-white rounded-xl font-inter font-bold border border-white/20 hover:bg-white/20 transition-all"
                        >
                          Retour
                        </motion.button>
                        <motion.button
                          onClick={() => setCurrentStep(3)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-inter font-bold shadow-lg flex items-center justify-center gap-2"
                        >
                          Continuer
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-montserrat font-bold text-white">
                            Options additionnelles
                          </h3>
                          <p className="text-white/50 text-sm">Personnalisez votre prestation</p>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-6">
                        {(Object.keys(categorizedOptions) as Array<keyof typeof categorizedOptions>).map((category) => {
                          const Icon = categoryIcons[category];
                          const isActive = activeCategory === category;
                          const count = categorizedOptions[category].filter(o => selectedOptions[o.id]).length;

                          return (
                            <motion.button
                              key={category}
                              onClick={() => setActiveCategory(category)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-inter font-bold text-sm transition-all ${
                                isActive
                                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg'
                                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{categoryLabels[category]}</span>
                              {count > 0 && (
                                <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                                  {count}
                                </span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-600/30 scrollbar-track-white/5">
                        <AnimatePresence mode="wait">
                          {categorizedOptions[activeCategory].map((option, idx) => (
                            <motion.label
                              key={option.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: idx * 0.03 }}
                              whileHover={{ x: 5, scale: 1.01 }}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                selectedOptions[option.id]
                                  ? 'bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 border-emerald-400'
                                  : 'bg-white/5 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedOptions[option.id] || false}
                                onChange={(e) => setSelectedOptions({...selectedOptions, [option.id]: e.target.checked})}
                                className="w-5 h-5 accent-emerald-400 cursor-pointer"
                              />
                              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center flex-shrink-0`}>
                                <option.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`font-inter font-bold text-sm ${selectedOptions[option.id] ? 'text-white' : 'text-white/80'}`}>
                                    {option.name}
                                  </span>
                                  {option.popular && (
                                    <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                                  )}
                                </div>
                                <span className="text-white/50 text-xs">{option.description}</span>
                              </div>
                              <span className={`font-montserrat font-black text-lg ${selectedOptions[option.id] ? 'text-emerald-400' : 'text-white/60'}`}>
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
                        </AnimatePresence>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <motion.button
                          onClick={() => setCurrentStep(2)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 bg-white/10 text-white rounded-xl font-inter font-bold border border-white/20 hover:bg-white/20 transition-all"
                        >
                          Retour
                        </motion.button>
                        <motion.button
                          onClick={() => setCurrentStep(4)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-inter font-bold shadow-lg flex items-center justify-center gap-2"
                        >
                          Voir le récapitulatif
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-montserrat font-bold text-white">
                            Configuration complète
                          </h3>
                          <p className="text-white/50 text-sm">Vérifiez et ajoutez au panier</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentStudio.gradient} flex items-center justify-center`}>
                              <currentStudio.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="text-white font-inter font-bold block">{currentStudio.name}</span>
                              <span className="text-white/50 text-sm">{currentDuration.label} • {currentFormula.name}</span>
                            </div>
                            <button
                              onClick={() => setCurrentStep(1)}
                              className="text-emerald-400 text-sm hover:underline"
                            >
                              Modifier
                            </button>
                          </div>
                        </div>

                        {Object.values(selectedOptions).filter(Boolean).length > 0 && (
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-white/70 text-sm font-inter font-medium">
                                Options sélectionnées ({Object.values(selectedOptions).filter(Boolean).length})
                              </span>
                              <button
                                onClick={() => setCurrentStep(3)}
                                className="text-emerald-400 text-sm hover:underline"
                              >
                                Modifier
                              </button>
                            </div>
                            <div className="space-y-2">
                              {Object.keys(selectedOptions).filter(key => selectedOptions[key]).map((optionId) => {
                                const option = studioAdditionalServices.find(o => o.id === optionId);
                                if (!option) return null;
                                const optionPrice = option.unit === '/h' ? option.price * currentDuration.hours : option.price;
                                return (
                                  <div key={optionId} className="flex items-center justify-between text-sm">
                                    <span className="text-white/80">{option.name}</span>
                                    <span className="text-white font-medium">+{optionPrice}€</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      <motion.button
                        onClick={() => setCurrentStep(3)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mb-4 py-4 bg-white/10 text-white rounded-xl font-inter font-bold border border-white/20 hover:bg-white/20 transition-all"
                      >
                        Retour aux options
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-950 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-600/5 via-transparent to-transparent"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-cyan-600 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-montserrat font-black text-white">
                        Récapitulatif
                      </h3>
                      <p className="text-white/50 text-xs">Votre configuration</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <div>
                        <span className="text-white/80 font-inter block text-sm">{currentStudio.name}</span>
                        <span className="text-white/50 text-xs">{currentDuration.label} • {currentFormula.name}</span>
                      </div>
                      <span className="text-white font-montserrat font-bold">
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
                          className="flex items-center justify-between py-2 border-b border-white/10"
                        >
                          <span className="text-white/70 font-inter text-sm">{option.name}</span>
                          <span className="text-white font-montserrat font-bold text-sm">
                            +{optionPrice}€
                          </span>
                        </motion.div>
                      );
                    })}

                    {hasMultipleOptions && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between py-2 border-b border-white/10 bg-emerald-500/10 -mx-2 px-2 rounded-lg"
                      >
                        <span className="text-emerald-400 font-inter text-sm">Réduction pack</span>
                        <span className="text-emerald-400 font-montserrat font-bold text-sm">
                          -{packageDiscount.toFixed(0)}€
                        </span>
                      </motion.div>
                    )}

                    {savings > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between py-2 border-b border-white/10 bg-emerald-500/10 -mx-2 px-2 rounded-lg"
                      >
                        <span className="text-emerald-400 font-inter text-sm">Offre de lancement</span>
                        <span className="text-emerald-400 font-montserrat font-bold text-sm">
                          -{savings.toFixed(0)}€
                        </span>
                      </motion.div>
                    )}
                  </div>

                  <div className="relative mb-6">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(236, 72, 153, 0.3)",
                          "0 0 40px rgba(236, 72, 153, 0.5)",
                          "0 0 20px rgba(236, 72, 153, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 rounded-xl p-6 border-2 border-emerald-400/50"
                    >
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-white/60 font-inter text-xs">Total estimé HT</span>
                        <motion.span
                          key={finalPrice}
                          initial={{ scale: 1.3, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400"
                        >
                          {finalPrice.toFixed(0)}€
                        </motion.span>
                      </div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-white/50">TVA 20%</span>
                        <span className="text-white/70 font-medium">+{(finalPrice * 0.2).toFixed(0)}€</span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-inter font-bold text-sm">Total TTC</span>
                        <span className="text-2xl font-montserrat font-black text-white">
                          {(finalPrice * 1.2).toFixed(0)}€
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
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
                          image: currentStudio.gallery?.[0] || currentStudio.image,
                          gradient: currentStudio.gradient || 'from-emerald-600 to-cyan-600',
                          studioConfig: {
                            studioId: currentStudio.id,
                            formulaId: currentFormula.id,
                            formulaName: currentFormula.name,
                            durationId: currentDuration.id,
                            durationLabel: currentDuration.label,
                            durationHours: currentDuration.hours,
                            options: selectedOptionsArray
                          }
                        });
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
                      whileTap={{ scale: 0.97 }}
                      className="relative w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-montserrat font-bold text-lg shadow-2xl flex items-center justify-center gap-3 group overflow-hidden"
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

                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        onClick={saveConfiguration}
                        disabled={isSaving}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="py-3 bg-white/10 text-white rounded-lg font-inter font-medium text-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          if (shareToken) {
                            navigator.clipboard.writeText(`${window.location.origin}/config/${shareToken}`);
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!shareToken}
                        className="py-3 bg-white/10 text-white rounded-lg font-inter font-medium text-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Share2 className="w-4 h-4" />
                        Partager
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {shareToken && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-lg"
                        >
                          <p className="text-emerald-400 text-xs font-inter text-center">
                            Configuration sauvegardée et copiée dans le presse-papier!
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-white/50 text-xs font-inter mt-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p>Aucun engagement • Modification gratuite</p>
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
