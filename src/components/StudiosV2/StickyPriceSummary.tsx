import { motion } from 'framer-motion';
import { Download, Check } from 'lucide-react';
import { ConfigurationState, PriceBreakdown, formatPrice } from '../../utils/pricingCalculations';
import { options } from '../../data/studiosLaunch/config';

interface StickyPriceSummaryProps {
  configuration: ConfigurationState;
  priceBreakdown: PriceBreakdown;
  currentStep: number;
}

export default function StickyPriceSummary({
  configuration,
  priceBreakdown,
  currentStep
}: StickyPriceSummaryProps) {
  const { studio, duration, formula, selectedOptions } = configuration;

  if (!studio || !duration) {
    return (
      <div className="sticky top-24 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          📊 Votre Devis
        </h3>
        <p className="text-slate-400 text-sm">
          Sélectionnez un studio et une durée pour voir votre devis
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl"
    >
      <h3 className="text-xl font-bold text-white mb-6">
        📊 VOTRE DEVIS EN TEMPS RÉEL
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-slate-400 text-sm mb-1">Studio</p>
          <p className="text-white font-semibold">{studio.name}</p>
        </div>

        <div>
          <p className="text-slate-400 text-sm mb-1">Durée</p>
          <p className="text-white font-semibold">{duration.label}</p>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Studio ({duration.hours}h)</span>
            <span className="text-white font-semibold">
              {formatPrice(priceBreakdown.studioWithDuration)}
            </span>
          </div>
        </div>

        {formula && !formula.included && (
          <div className="flex justify-between items-center">
            <span className="text-slate-300">{formula.name}</span>
            <span className="text-white font-semibold">
              +{formatPrice(priceBreakdown.formulaPrice)}
            </span>
          </div>
        )}

        {Array.from(selectedOptions.entries()).map(([optionId, quantity]) => {
          const option = options.find(opt => opt.id === optionId);
          if (!option) return null;

          const optionTotal = option.unit === '/h'
            ? option.price * duration.hours * quantity
            : option.price * quantity;

          return (
            <div key={optionId} className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">{option.name}</span>
              <span className="text-white font-semibold">
                +{formatPrice(optionTotal)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 pt-4 border-t-2 border-slate-700">
        <div className="flex justify-between items-center">
          <span className="text-slate-300 font-semibold">SOUS-TOTAL</span>
          <span className="text-white font-bold text-xl">
            {formatPrice(priceBreakdown.subtotal)}
          </span>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-green-400 font-semibold text-sm">
              -30% Offre Découverte
            </span>
            <span className="text-green-400 font-bold">
              -{formatPrice(priceBreakdown.discountAmount)}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-slate-700 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-bold text-lg">TOTAL TTC</span>
          <span className="text-white font-bold text-3xl">
            {formatPrice(priceBreakdown.total)}
          </span>
        </div>
        <p className="text-slate-400 text-sm text-right">
          Prix/h final : {formatPrice(priceBreakdown.hourlyRate)}/h
          {priceBreakdown.savings > 0 && (
            <span className="text-green-400 ml-2">
              (au lieu de {formatPrice(priceBreakdown.normalHourlyRate)}/h)
            </span>
          )}
        </p>
      </div>

      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <button className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-500/25 text-lg">
            Réserver maintenant
          </button>

          <button className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Télécharger le devis PDF
          </button>
        </motion.div>
      )}

      <div className="mt-6 pt-6 border-t border-slate-800">
        <p className="text-slate-400 text-sm font-semibold mb-3">
          🎁 Avantages inclus:
        </p>
        <div className="space-y-2">
          {[
            'Annulation gratuite 72h avant',
            'Accès 15min avant gratuit',
            'Parking gratuit sur place',
            'WiFi fibre 1Gbps',
            'Café & collations offerts'
          ].map((benefit, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300 text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
