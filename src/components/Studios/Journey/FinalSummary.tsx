import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Download, Share2, Calendar, Edit, ArrowRight, Sparkles, Info, TrendingDown } from 'lucide-react';
import { studioSetups } from '../../../data/studios/setups';
import { formulas, durations } from '../../../data/studios/formulas';
import { optionsCatalog } from '../../../data/studios/options';
import BookingModal from '../BookingModal';

interface FinalSummaryProps {
  studioId: string;
  formulaId: string;
  durationId: string;
  selectedOptions: Record<string, number>;
  onEdit: (step: number) => void;
}

export default function FinalSummary({
  studioId,
  formulaId,
  durationId,
  selectedOptions,
  onEdit
}: FinalSummaryProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const studio = studioSetups.find(s => s.id === studioId);
  const formula = formulas.find(f => f.id === formulaId);
  const duration = durations.find(d => d.id === durationId);

  if (!studio || !formula || !duration) return null;

  const hourlyRate = Math.round(studio.basePrice * formula.priceMultiplier);
  const basePrice = Math.round(hourlyRate * duration.hours * duration.multiplier);

  const optionsPrice = Object.entries(selectedOptions).reduce((total, [optionId, quantity]) => {
    const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
    const price = option.unit === '/h' ? option.price * duration.hours : option.price;
    return Math.round(total + (price * quantity));
  }, 0);

  const totalPrice = basePrice + optionsPrice;
  const hasOptions = Object.keys(selectedOptions).length > 0;

  const StudioIcon = studio.icon;
  const FormulaIcon = formula.icon;

  const handleShare = () => {
    const config = {
      studio: studio.name,
      formula: formula.name,
      duration: duration.label,
      options: Object.keys(selectedOptions).map(id => optionsCatalog[id as keyof typeof optionsCatalog].name),
      total: totalPrice
    };

    const text = `Configuration studio Le 40:\n${studio.name} - ${formula.name} - ${duration.label}\nTotal: ${totalPrice}€`;

    if (navigator.share) {
      navigator.share({
        title: 'Ma configuration studio',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Configuration copiée dans le presse-papier !');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 via-black to-slate-950">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 font-inter text-sm font-bold">Configuration complète</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            RÉCAPITULATIF
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              DE VOTRE PROJET
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Vérifiez les détails avant de finaliser votre réservation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-montserrat font-black text-white flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${studio.gradient} flex items-center justify-center`}>
                    <StudioIcon className="w-5 h-5 text-white" />
                  </div>
                  Studio sélectionné
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(1)}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-inter font-bold"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </motion.button>
              </div>

              <div className="flex gap-6">
                <img
                  src={studio.image}
                  alt={studio.name}
                  className="w-32 h-32 object-cover rounded-2xl"
                />
                <div className="flex-1">
                  <div className={`text-transparent bg-clip-text bg-gradient-to-r ${studio.gradient} font-montserrat font-bold text-xs tracking-wider uppercase mb-2`}>
                    {studio.subtitle}
                  </div>
                  <h4 className="text-2xl font-montserrat font-black text-white mb-2">
                    {studio.name}
                  </h4>
                  <p className="text-white/70 font-inter text-sm mb-4">
                    {studio.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5" />
                      <span className="text-white/80 text-sm font-inter">{studio.equipment.cameras}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-400 mt-0.5" />
                      <span className="text-white/80 text-sm font-inter">{studio.equipment.audio}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-montserrat font-black text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <FormulaIcon className="w-4 h-4 text-white" />
                    </div>
                    Formule
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(2)}
                    className="text-blue-400 hover:text-blue-300 text-xs font-inter font-bold"
                  >
                    <Edit className="w-3 h-3" />
                  </motion.button>
                </div>
                <div className="text-xl font-montserrat font-bold text-white mb-2">
                  {formula.name}
                </div>
                <p className="text-white/60 text-sm font-inter mb-3">
                  {formula.longDescription}
                </p>
                <div className="space-y-1">
                  {formula.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-400" />
                      <span className="text-white/70 text-xs font-inter">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-montserrat font-black text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    Durée
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(3)}
                    className="text-teal-400 hover:text-teal-300 text-xs font-inter font-bold"
                  >
                    <Edit className="w-3 h-3" />
                  </motion.button>
                </div>
                <div className="text-xl font-montserrat font-bold text-white mb-2">
                  {duration.label}
                </div>
                <p className="text-white/60 text-sm font-inter mb-3">
                  {duration.hours} heure{duration.hours > 1 ? 's' : ''} de location
                </p>
                {duration.discount && (
                  <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-lg px-3 py-2">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-inter font-bold text-sm">
                      Économie de {duration.discount}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {hasOptions && (
              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-montserrat font-black text-white">
                    Options sélectionnées ({Object.keys(selectedOptions).length})
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(4)}
                    className="text-orange-400 hover:text-orange-300 text-xs font-inter font-bold flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Modifier
                  </motion.button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedOptions).map(([optionId, quantity]) => {
                    const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                    const OptionIcon = option.icon;
                    const price = option.unit === '/h' ? option.price * duration.hours * quantity : option.price * quantity;
                    return (
                      <div key={optionId} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <OptionIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-inter font-bold truncate">
                            {option.name} {quantity > 1 ? `(×${quantity})` : ''}
                          </div>
                          <div className="text-white/50 text-xs font-inter">
                            +{price}€
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border-2 border-emerald-400/30 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-montserrat font-black text-white mb-6">
                Détail du devis
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <div className="text-white font-inter font-medium mb-1">
                      {studio.name}
                    </div>
                    <div className="text-white/50 text-sm">
                      {duration.label} • {formula.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-montserrat font-black text-white">
                      {basePrice}€
                    </div>
                  </div>
                </div>

                {hasOptions && (
                  <>
                    <div className="text-white/70 text-sm font-inter font-medium pt-2">
                      Options:
                    </div>
                    {Object.entries(selectedOptions).map(([optionId, quantity]) => {
                      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                      const price = option.unit === '/h' ? option.price * duration.hours * quantity : option.price * quantity;
                      return (
                        <div key={optionId} className="flex items-center justify-between py-2">
                          <div className="text-white/80 text-sm font-inter">
                            {option.name} {quantity > 1 ? `(×${quantity})` : ''}
                          </div>
                          <div className="text-white/80 font-inter font-medium">
                            +{price}€
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-2xl p-6 mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-white/70 font-inter text-sm">Total TTC</span>
                  <div className="text-right">
                    <div className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      {totalPrice}€
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm mt-4">
                  <Info className="w-4 h-4" />
                  <span className="font-inter">Prix fixe, sans surprise</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
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
                  <span>Installation et assistance</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Garantie satisfait ou remboursé</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-4 rounded-xl font-montserrat font-bold flex items-center justify-center gap-3 shadow-xl"
                >
                  Réserver maintenant
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-montserrat font-bold flex items-center justify-center gap-2 border border-white/20"
                  >
                    <Share2 className="w-4 h-4" />
                    Partager
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.print()}
                    className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-montserrat font-bold flex items-center justify-center gap-2 border border-white/20"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </motion.button>
                </div>
              </div>

              <div className="text-center text-white/50 text-xs font-inter">
                Devis valable 30 jours • Paiement sécurisé
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedStudio={studioId}
      />
    </section>
  );
}
