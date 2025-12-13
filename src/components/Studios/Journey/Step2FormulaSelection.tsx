import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Info, Sparkles, Star } from 'lucide-react';
import { formulas } from '../../../data/studios/formulas';
import { studioSetups } from '../../../data/studios/setups';

interface Step2FormulaSelectionProps {
  selectedStudioId: string;
  selectedFormulaId: string | null;
  onFormulaSelect: (formulaId: string) => void;
  onContinue: () => void;
}

export default function Step2FormulaSelection({
  selectedStudioId,
  selectedFormulaId,
  onFormulaSelect,
  onContinue
}: Step2FormulaSelectionProps) {
  const studio = studioSetups.find(s => s.id === selectedStudioId);
  const selectedFormula = formulas.find(f => f.id === selectedFormulaId);

  if (!studio) return null;

  const calculatePrice = (formulaId: string) => {
    const formula = formulas.find(f => f.id === formulaId);
    if (!formula) return 0;
    return Math.round(studio.basePrice * formula.priceMultiplier);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-400/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 font-inter text-sm font-bold">Étape 2 sur 4</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            CHOISISSEZ VOTRE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              FORMULE DE SERVICE
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed mb-4">
            De la simple location au service clé en main avec post-production
          </p>

          <div className="inline-flex items-center gap-2 text-white/50 text-sm">
            <Info className="w-4 h-4" />
            <span className="font-inter">Studio sélectionné: <span className="text-cyan-400 font-bold">{studio.name}</span></span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {formulas.map((formula, index) => {
            const Icon = formula.icon;
            const isSelected = selectedFormulaId === formula.id;
            const price = calculatePrice(formula.id);

            return (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => onFormulaSelect(formula.id)}
                className="group relative cursor-pointer h-full"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl transition-all duration-500"
                  animate={{
                    opacity: isSelected ? 0.5 : 0,
                  }}
                />

                <div className={`relative bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-8 border-2 transition-all duration-500 h-full flex flex-col ${
                  isSelected ? 'border-blue-400 shadow-xl shadow-blue-500/20' : 'border-white/10 group-hover:border-white/30'
                }`}>
                  {formula.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                        <Star className="w-3 h-3" />
                        PLUS POPULAIRE
                      </div>
                    </div>
                  )}

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-6 right-6 bg-blue-500 text-white p-2 rounded-full shadow-xl"
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}

                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    isSelected ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-3xl font-montserrat font-black text-white mb-2">
                      {formula.name}
                    </h3>
                    <p className="text-white/60 font-inter text-sm mb-4">
                      {formula.longDescription}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        {price}€
                      </span>
                      <span className="text-white/50 text-sm font-inter">/heure</span>
                    </div>
                    {formula.priceMultiplier !== 1 && (
                      <div className="text-emerald-400 text-sm font-inter font-bold mt-1">
                        {formula.displayPrice} vs. tarif de base
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 mb-6">
                    {formula.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 font-inter text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`px-4 py-3 rounded-xl border-2 text-center font-montserrat font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-500 border-blue-400 text-white'
                      : 'bg-white/5 border-white/10 text-white/60 group-hover:border-white/20'
                  }`}>
                    {isSelected ? '✓ Formule sélectionnée' : 'Sélectionner'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-montserrat font-black text-white mb-6 text-center">
            Tableau comparatif des formules
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 font-inter text-sm font-medium pb-4 pr-4">Inclusions</th>
                  {formulas.map(formula => (
                    <th key={formula.id} className="text-center text-white font-montserrat font-bold pb-4 px-4">
                      {formula.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-white/80 font-inter text-sm">Accès studio équipé</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-white/80 font-inter text-sm">Technicien sur place</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-white/80 font-inter text-sm">Transfert rushs en 2h</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-cyan-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-white/80 font-inter text-sm">Montage professionnel</td>
                  <td className="py-4 px-4 text-center text-white/30">-</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-white/80 font-inter text-sm">Colorimétrie</td>
                  <td className="py-4 px-4 text-center text-white/30">-</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4 text-white/80 font-inter text-sm">Stratégie créative</td>
                  <td className="py-4 px-4 text-center text-white/30">-</td>
                  <td className="py-4 px-4 text-center text-white/30">-</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-blue-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 text-white/80 font-inter text-sm">Distribution multi-plateformes</td>
                  <td className="py-4 px-4 text-center text-white/30">-</td>
                  <td className="py-4 px-4 text-center text-white/30">-</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-blue-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedFormula && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-12 py-5 rounded-xl font-montserrat font-bold text-lg flex items-center gap-3 shadow-2xl"
              >
                Continuer vers la durée
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
