import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, ArrowRight, Sparkles, TrendingUp, Zap, Calculator } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';
import { formulas, durations } from '../../data/studios/formulas';
import { optionsCatalog } from '../../data/studios/options';
import { useStudioTracking, ProfileType } from '../../hooks/useStudioTracking';

interface ConfiguratorProps {
  initialStudioId?: string;
  initialProfile?: ProfileType;
}

export default function SimplifiedConfigurator({ initialStudioId, initialProfile }: ConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [selectedStudio, setSelectedStudio] = useState(initialStudioId || '');
  const [selectedFormula, setSelectedFormula] = useState('postprod');
  const [selectedDuration, setSelectedDuration] = useState('3h');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const { trackEvent, saveConfiguration } = useStudioTracking();

  const studio = studioSetups.find(s => s.id === selectedStudio);
  const formula = formulas.find(f => f.id === selectedFormula);
  const duration = durations.find(d => d.id === selectedDuration);

  const basePrice = studio ? studio.basePrice : 0;
  const formulaPrice = formula ? basePrice * formula.priceMultiplier : basePrice;
  const durationPrice = duration ? formulaPrice * duration.multiplier : formulaPrice;
  const optionsPrice = Object.entries(selectedOptions).reduce((sum, [optionId, quantity]) => {
    const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
    return sum + (option ? option.price * quantity : 0);
  }, 0);
  const totalPrice = durationPrice + optionsPrice;

  const recommendedOptions = studio ? studio.relevantOptions.slice(0, 4) : [];

  useEffect(() => {
    if (selectedStudio) {
      trackEvent({
        eventType: 'configurator_studio_selected',
        eventData: { studioId: selectedStudio },
        pageSection: 'configurator'
      });
    }
  }, [selectedStudio]);

  const handleStudioSelect = (studioId: string) => {
    setSelectedStudio(studioId);
    setStep(2);
  };

  const handleFormulaSelect = (formulaId: string) => {
    setSelectedFormula(formulaId);
    trackEvent({
      eventType: 'configurator_formula_selected',
      eventData: { formulaId },
      pageSection: 'configurator'
    });
  };

  const handleDurationSelect = (durationId: string) => {
    setSelectedDuration(durationId);
    setStep(3);
    trackEvent({
      eventType: 'configurator_duration_selected',
      eventData: { durationId },
      pageSection: 'configurator'
    });
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      if (newOptions[optionId]) {
        delete newOptions[optionId];
      } else {
        newOptions[optionId] = 1;
      }
      return newOptions;
    });
  };

  const handleReserve = async () => {
    if (!studio || !formula || !duration) return;

    const result = await saveConfiguration({
      studioId: studio.id,
      studioName: studio.name,
      formulaId: formula.id,
      formulaName: formula.name,
      durationId: duration.id,
      durationHours: duration.hours,
      selectedOptions,
      totalPrice,
      profileType: initialProfile
    });

    trackEvent({
      eventType: 'configurator_completed',
      eventData: { totalPrice, configId: result.configId },
      pageSection: 'configurator'
    });

    window.location.href = `/checkout?config=${result.shareToken}`;
  };

  return (
    <section id="configure" className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
           style={{
             backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
             backgroundSize: '48px 48px'
           }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 backdrop-blur-xl mb-8"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 font-inter text-sm font-bold">Configurateur Intelligent</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
            Configurez Votre
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Réservation
            </span>
          </h2>

          <p className="text-xl text-white/70 font-inter max-w-3xl mx-auto leading-relaxed">
            3 étapes simples pour réserver votre studio. Prix transparent, aucune surprise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {step >= 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-lg opacity-20"
                  />
                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-montserrat font-black text-white">
                        1. Studio + Formule
                      </h3>
                      {selectedStudio && step > 1 && (
                        <button
                          onClick={() => setStep(1)}
                          className="text-cyan-400 hover:text-cyan-300 font-inter text-sm font-bold transition-colors duration-300"
                        >
                          Modifier
                        </button>
                      )}
                    </div>

                    {step === 1 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {studioSetups.slice(0, 4).map((studioOption) => {
                          const Icon = studioOption.icon;
                          return (
                            <motion.button
                              key={studioOption.id}
                              onClick={() => handleStudioSelect(studioOption.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative group text-left ${
                                selectedStudio === studioOption.id ? 'ring-2 ring-cyan-500' : ''
                              }`}
                            >
                              <div className="bg-slate-800/50 hover:bg-slate-800 border border-white/10 hover:border-white/30 rounded-2xl p-6 transition-all duration-300">
                                <div className={`inline-flex p-3 bg-gradient-to-br ${studioOption.gradient} rounded-xl mb-4`}>
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-lg font-montserrat font-bold text-white mb-2">
                                  {studioOption.name}
                                </h4>
                                <p className="text-white/60 text-sm font-inter mb-4">
                                  {studioOption.subtitle}
                                </p>
                                <p className="text-cyan-400 font-montserrat font-bold">
                                  {studioOption.basePrice}€/h
                                </p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    ) : studio && (
                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                        <div className={`inline-flex p-3 bg-gradient-to-br ${studio.gradient} rounded-xl`}>
                          <studio.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-montserrat font-bold text-white">{studio.name}</p>
                          <p className="text-white/60 text-sm font-inter">{studio.subtitle}</p>
                        </div>
                        <p className="text-cyan-400 font-montserrat font-bold text-xl">
                          {studio.basePrice}€/h
                        </p>
                      </div>
                    )}

                    {step === 1 && selectedStudio && (
                      <div className="mt-6 space-y-3">
                        <p className="text-white font-montserrat font-bold mb-4">Choisissez votre formule:</p>
                        {formulas.map((f) => {
                          const FormulaIcon = f.icon;
                          const isSelected = selectedFormula === f.id;
                          return (
                            <motion.button
                              key={f.id}
                              onClick={() => {
                                handleFormulaSelect(f.id);
                                setStep(2);
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`w-full relative ${isSelected ? 'ring-2 ring-emerald-500' : ''}`}
                            >
                              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500'
                                  : 'bg-white/5 border-white/10 hover:border-white/30'
                              }`}>
                                <div className={`p-2 ${isSelected ? 'bg-emerald-500' : 'bg-white/10'} rounded-lg`}>
                                  <FormulaIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="flex items-center gap-2">
                                    <p className="font-montserrat font-bold text-white">{f.name}</p>
                                    {f.popular && (
                                      <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                                        Populaire
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-white/60 text-sm font-inter">{f.description}</p>
                                </div>
                                {isSelected && <Check className="w-5 h-5 text-emerald-400" />}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}

                    {step > 1 && formula && (
                      <div className="mt-6 flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/30">
                        <div className="p-2 bg-emerald-500 rounded-lg">
                          <formula.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-montserrat font-bold text-white">{formula.name}</p>
                          <p className="text-white/60 text-sm font-inter">{formula.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-lg opacity-20"
                  />
                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-montserrat font-black text-white">
                        2. Durée
                      </h3>
                      {step > 2 && (
                        <button
                          onClick={() => setStep(2)}
                          className="text-emerald-400 hover:text-emerald-300 font-inter text-sm font-bold transition-colors duration-300"
                        >
                          Modifier
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {durations.map((d) => {
                        const isSelected = selectedDuration === d.id;
                        return (
                          <motion.button
                            key={d.id}
                            onClick={() => handleDurationSelect(d.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative ${isSelected ? 'ring-2 ring-emerald-500' : ''}`}
                          >
                            {d.popular && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-bold shadow-lg z-10">
                                Le plus choisi
                              </div>
                            )}
                            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                              isSelected
                                ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500'
                                : 'bg-slate-800/50 border-white/10 hover:border-white/30'
                            }`}>
                              <p className="text-3xl font-montserrat font-black text-white mb-2">
                                {d.label}
                              </p>
                              {d.discount && (
                                <p className="text-emerald-400 font-inter text-sm font-bold mb-2">
                                  {d.discount} économies
                                </p>
                              )}
                              {formula && studio && (
                                <p className="text-white/60 text-sm font-inter">
                                  {Math.round(studio.basePrice * formula.priceMultiplier * d.multiplier)}€
                                </p>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-lg opacity-20"
                  />
                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                    <h3 className="text-2xl font-montserrat font-black text-white mb-6">
                      3. Options (recommandées)
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {recommendedOptions.map((optionId) => {
                        const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                        if (!option) return null;
                        const Icon = option.icon;
                        const isSelected = !!selectedOptions[optionId];

                        return (
                          <motion.button
                            key={optionId}
                            onClick={() => toggleOption(optionId)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative text-left ${isSelected ? 'ring-2 ring-cyan-500' : ''}`}
                          >
                            <div className={`p-4 rounded-xl border transition-all duration-300 ${
                              isSelected
                                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500'
                                : 'bg-slate-800/50 border-white/10 hover:border-white/30'
                            }`}>
                              <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 ${isSelected ? 'bg-cyan-500' : 'bg-white/10'} rounded-lg`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                {isSelected && <Check className="w-5 h-5 text-cyan-400" />}
                              </div>
                              <p className="font-montserrat font-bold text-white mb-1">
                                {option.name}
                              </p>
                              <p className="text-white/60 text-sm font-inter mb-3">
                                {option.description}
                              </p>
                              <p className="text-cyan-400 font-montserrat font-bold">
                                +{option.price}€ {option.unit}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    <p className="text-white/50 text-sm font-inter mt-6 text-center">
                      Vous pourrez ajouter d'autres options plus tard
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 rounded-3xl blur-xl opacity-50"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-montserrat font-black text-white">
                    Votre Réservation
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  {studio && (
                    <div className="pb-4 border-b border-white/10">
                      <p className="text-white/60 text-sm font-inter mb-1">Studio</p>
                      <p className="text-white font-montserrat font-bold">{studio.name}</p>
                    </div>
                  )}

                  {formula && (
                    <div className="pb-4 border-b border-white/10">
                      <p className="text-white/60 text-sm font-inter mb-1">Formule</p>
                      <p className="text-white font-montserrat font-bold">{formula.name}</p>
                    </div>
                  )}

                  {duration && (
                    <div className="pb-4 border-b border-white/10">
                      <p className="text-white/60 text-sm font-inter mb-1">Durée</p>
                      <div className="flex items-center justify-between">
                        <p className="text-white font-montserrat font-bold">{duration.label}</p>
                        {duration.discount && (
                          <span className="text-emerald-400 text-sm font-bold">{duration.discount}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {Object.keys(selectedOptions).length > 0 && (
                    <div className="pb-4 border-b border-white/10">
                      <p className="text-white/60 text-sm font-inter mb-2">Options</p>
                      {Object.keys(selectedOptions).map((optionId) => {
                        const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                        if (!option) return null;
                        return (
                          <div key={optionId} className="flex items-center justify-between mb-1">
                            <p className="text-white/80 text-sm font-inter">{option.name}</p>
                            <p className="text-cyan-400 text-sm font-bold">+{option.price}€</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mb-6 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30">
                  <p className="text-white/60 text-sm font-inter mb-2">Prix total</p>
                  <p className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {Math.round(totalPrice)}€
                  </p>
                  {duration && duration.discount && (
                    <p className="text-emerald-400 text-sm font-bold mt-2">
                      Vous économisez {Math.round(durationPrice * 0.15)}€
                    </p>
                  )}
                </div>

                <motion.button
                  onClick={handleReserve}
                  disabled={step < 3}
                  whileHover={step >= 3 ? { scale: 1.02 } : {}}
                  whileTap={step >= 3 ? { scale: 0.98 } : {}}
                  className={`w-full flex items-center justify-center gap-3 py-5 rounded-xl font-montserrat font-black text-lg shadow-2xl transition-all duration-300 ${
                    step >= 3
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 text-white cursor-pointer'
                      : 'bg-white/10 text-white/50 cursor-not-allowed'
                  }`}
                >
                  <span>Réserver Maintenant</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Annulation gratuite 48h avant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Confirmation immédiate</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
