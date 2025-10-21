import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { pricingPlans } from '../../data/domiciliation/pricingPlans';
import { useCart } from '../../hooks/useCart';

export default function PricingSection() {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const handleAddToCart = (plan: typeof pricingPlans[0]) => {
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

  return (
    <section id="pricing" className="py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader
          title="Choisissez selon"
          highlightedText="VOS"
          subtitle="besoins - Pas selon notre envie de vendre"
          className="mb-12"
        />

        <div className="flex justify-center mb-16">
          <div className="bg-white/5 p-2 rounded-full inline-flex gap-2">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-orange-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingPeriod === 'annual'
                  ? 'bg-orange-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Annuel <span className="text-green-400 text-sm ml-1">(-20%)</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl relative ${
                plan.popular ? 'border-2 border-orange-500' : 'border border-zinc-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1 rounded-full text-white text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  POPULAIRE
                </div>
              )}

              <div className="text-sm font-semibold text-zinc-400 mb-2">{plan.name}</div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black text-white">{plan.price}€</span>
                <span className="text-zinc-400 mb-2">{plan.period}</span>
              </div>
              <p className="text-zinc-400 mb-8">{plan.description}</p>

              <div className="mb-8">
                <div className="text-orange-400 font-semibold mb-4">ON GÈRE POUR VOUS :</div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/80">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-xl mb-8">
                <div className="text-xs text-zinc-400 mb-2">CE QUE VOUS ÉCONOMISEZ :</div>
                <div className="text-sm text-white/70">
                  {plan.savings.map((saving, i) => (
                    <div key={i}>→ {saving}</div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(plan)}
                className={`w-full py-4 font-bold rounded-xl transition-all ${
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
          <p className="text-white/60 flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              Résiliable en 1 clic
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              Satisfait ou remboursé 30j
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
