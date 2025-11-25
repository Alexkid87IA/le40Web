import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useDomiciliationPricing } from '../../hooks/useDomiciliationPricing';
import { useCart } from '../../hooks/useCart';

export default function PricingSection() {
  const { plans, loading } = useDomiciliationPricing();
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const handleAddToCart = (plan: typeof plans[0]) => {
    addItem({
      id: plan.id,
      serviceType: 'domiciliation',
      serviceName: `Domiciliation ${plan.name}`,
      date: new Date().toISOString(),
      duration: 'month',
      price: plan.price,
      quantity: 1
    });

    setAddedToCart({ ...addedToCart, [plan.id]: true });
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [plan.id]: false });
    }, 2000);
  };

  if (loading) {
    return (
      <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          Chargement des offres...
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          title="Choisissez selon"
          highlightedText="VOS"
          subtitle="besoins - Pas selon notre envie de vendre"
          className="mb-8 md:mb-12"
        />

        <div className="flex justify-center mb-10 md:mb-16">
          <div className="bg-white/5 p-1.5 md:p-2 rounded-full inline-flex gap-1.5 md:gap-2">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-sm md:text-base font-semibold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-orange-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-sm md:text-base font-semibold transition-all ${
                billingPeriod === 'annual'
                  ? 'bg-orange-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Annuel <span className="text-orange-400 text-sm ml-1">(-20%)</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-6 md:p-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl md:rounded-2xl relative ${
                plan.popular ? 'border-2 border-orange-500' : 'border border-zinc-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 px-3 md:px-4 py-1 rounded-full text-white text-xs md:text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  POPULAIRE
                </div>
              )}

              <div className="text-xs md:text-sm font-semibold text-zinc-400 mb-2">{plan.name}</div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl md:text-5xl font-black text-white">
                  {billingPeriod === 'annual' ? Math.round(plan.price * 12 * 0.8) : plan.price}€
                </span>
                <span className="text-zinc-400 mb-2">
                  {billingPeriod === 'annual' ? '/an' : plan.period}
                </span>
              </div>
              {billingPeriod === 'annual' && (
                <div className="text-sm text-orange-400 mb-2">
                  Soit {Math.round(plan.price * 0.8)}€/mois
                </div>
              )}
              <p className="text-zinc-400 text-sm md:text-base mb-6 md:mb-8">{plan.description}</p>

              <div className="mb-6 md:mb-8">
                <div className="text-orange-400 font-semibold text-sm md:text-base mb-3 md:mb-4">ON GÈRE POUR VOUS :</div>
                <ul className="space-y-2 md:space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/80 text-sm md:text-base">
                      <Check className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl mb-6 md:mb-8">
                <div className="text-xs text-zinc-400 mb-2">CE QUE VOUS ÉCONOMISEZ :</div>
                <div className="text-xs md:text-sm text-white/70">
                  {plan.savings.map((saving, i) => (
                    <div key={i}>→ {saving}</div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(plan)}
                className={`w-full py-3 md:py-4 text-sm md:text-base font-bold rounded-lg md:rounded-xl transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <AnimatePresence mode="wait">
                  {addedToCart[plan.id] ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Ajouté au panier !
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      {plan.popular ? 'Le plus choisi' : 'Démarrer'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/60 flex items-center justify-center gap-4 md:gap-6 flex-wrap text-sm md:text-base">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-orange-400" />
              Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-orange-400" />
              Résiliable en 1 clic
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-orange-400" />
              Satisfait ou remboursé 30j
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
