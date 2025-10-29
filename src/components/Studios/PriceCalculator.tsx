import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, Info, Download, ArrowRight } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';
import { formulas, durations } from '../../data/studios/formulas';
import { optionsCatalog } from '../../data/studios/options';

export default function PriceCalculator() {
  const [selectedStudio, setSelectedStudio] = useState(studioSetups[0].id);
  const [selectedFormula, setSelectedFormula] = useState(formulas[1].id);
  const [selectedDuration, setSelectedDuration] = useState(durations[0].id);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const studio = studioSetups.find(s => s.id === selectedStudio);
  const formula = formulas.find(f => f.id === selectedFormula);
  const duration = durations.find(d => d.id === selectedDuration);

  const calculateBasePrice = () => {
    if (!studio || !formula || !duration) return 0;
    return studio.basePrice * duration.multiplier * formula.priceMultiplier;
  };

  const calculateOptionsPrice = () => {
    return selectedOptions.reduce((total, optionId) => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      return total + option.price;
    }, 0);
  };

  const totalPrice = calculateBasePrice() + calculateOptionsPrice();

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const relevantOptions = studio?.relevantOptions || [];
  const displayedOptions = Object.entries(optionsCatalog).filter(([id]) =>
    relevantOptions.includes(id)
  );

  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 backdrop-blur-xl">
            <Calculator className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 font-inter text-sm font-bold">Calculateur transparent</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            ESTIMEZ VOTRE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              BUDGET PRODUCTION
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Configurez votre projet et obtenez un devis instantané transparent.
            Aucune surprise, tous les coûts sont détaillés.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-montserrat font-black text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Choisissez votre studio
              </h3>

              <div className="space-y-3">
                {studioSetups.slice(0, 6).map((studioOption) => {
                  const Icon = studioOption.icon;
                  const isSelected = selectedStudio === studioOption.id;

                  return (
                    <motion.button
                      key={studioOption.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedStudio(studioOption.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${studioOption.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-montserrat font-bold text-white mb-1">
                            {studioOption.name}
                          </div>
                          <div className="text-white/60 text-sm font-inter">
                            {studioOption.basePrice}€/h • {studioOption.capacity}
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-montserrat font-black text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Formule et durée
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-white/70 text-sm font-inter font-medium mb-3 block">
                    Formule de service
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {formulas.map((formulaOption) => {
                      const Icon = formulaOption.icon;
                      const isSelected = selectedFormula === formulaOption.id;

                      return (
                        <motion.button
                          key={formulaOption.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedFormula(formulaOption.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-cyan-400' : 'text-white/60'}`} />
                          <div className="text-xs font-montserrat font-bold text-white mb-1">
                            {formulaOption.name}
                          </div>
                          <div className="text-xs text-white/50">
                            {formulaOption.displayPrice}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm font-inter font-medium mb-3 block">
                    Durée de location
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {durations.map((durationOption) => {
                      const isSelected = selectedDuration === durationOption.id;

                      return (
                        <motion.button
                          key={durationOption.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDuration(durationOption.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="text-sm font-montserrat font-bold text-white mb-1">
                            {durationOption.label}
                          </div>
                          {durationOption.discount && (
                            <div className="text-xs text-emerald-400 font-bold">
                              {durationOption.discount}
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {displayedOptions.length > 0 && (
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-montserrat font-black text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Options recommandées
                </h3>

                <div className="space-y-3">
                  {displayedOptions.map(([optionId, option]) => {
                    const Icon = option.icon;
                    const isSelected = selectedOptions.includes(optionId);

                    return (
                      <motion.button
                        key={optionId}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleOption(optionId)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-violet-500 bg-violet-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-inter font-bold text-white text-sm mb-0.5">
                              {option.name}
                            </div>
                            <div className="text-white/60 text-xs">
                              {option.price}€ {option.unit}
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-violet-400 flex-shrink-0" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-montserrat font-black text-white">
                  Votre devis
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <div className="text-white font-inter font-medium mb-1">
                      Studio {studio?.name}
                    </div>
                    <div className="text-white/50 text-sm">
                      {duration?.label} • Formule {formula?.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-montserrat font-black text-white">
                      {calculateBasePrice().toFixed(0)}€
                    </div>
                  </div>
                </div>

                {selectedOptions.length > 0 && (
                  <>
                    <div className="text-white/70 text-sm font-inter font-medium pt-2">
                      Options sélectionnées :
                    </div>
                    {selectedOptions.map((optionId) => {
                      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                      return (
                        <div key={optionId} className="flex items-center justify-between py-2">
                          <div className="text-white/80 text-sm font-inter">
                            {option.name}
                          </div>
                          <div className="text-white/80 font-inter font-medium">
                            +{option.price}€
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-2xl p-6 mb-8">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-white/70 font-inter text-sm">Total TTC</span>
                  <div className="text-right">
                    <div className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      {totalPrice.toFixed(0)}€
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm mt-4">
                  <Info className="w-4 h-4" />
                  <span className="font-inter">Prix fixe, sans frais cachés</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Technicien expert inclus</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Transfert des rushs en 2h</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Installation et assistance technique</span>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-montserrat font-bold flex items-center justify-center gap-3 shadow-xl"
                >
                  Réserver maintenant
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/10 hover:bg-white/15 text-white py-4 rounded-xl font-montserrat font-bold flex items-center justify-center gap-3 border border-white/20"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le devis PDF
                </motion.button>
              </div>

              <div className="mt-6 text-center text-white/50 text-xs font-inter">
                Devis valable 30 jours • Paiement sécurisé
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
