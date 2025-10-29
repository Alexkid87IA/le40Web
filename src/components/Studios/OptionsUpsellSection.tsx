import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Sparkles, TrendingUp, ArrowRight, Plus, Minus, ShoppingCart } from 'lucide-react';
import { optionsCatalog } from '../../data/studios/options';
import { useCart } from '../../hooks/useCart';

export default function OptionsUpsellSection() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [showAllOptions, setShowAllOptions] = useState(false);
  const { addItem } = useCart();

  const popularOptions = Object.entries(optionsCatalog).filter(([_, option]) => option.recommended || option.popular);
  const displayedOptions = showAllOptions ? Object.entries(optionsCatalog) : popularOptions;

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => {
      const current = prev[optionId] || 0;
      if (current > 0) {
        const { [optionId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [optionId]: 1 };
    });
  };

  const updateQuantity = (optionId: string, delta: number) => {
    setSelectedOptions(prev => {
      const current = prev[optionId] || 0;
      const newValue = Math.max(0, current + delta);
      if (newValue === 0) {
        const { [optionId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [optionId]: newValue };
    });
  };

  const calculateTotal = () => {
    return Object.entries(selectedOptions).reduce((total, [optionId, quantity]) => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      return total + (option.price * quantity);
    }, 0);
  };

  const addToCart = () => {
    Object.entries(selectedOptions).forEach(([optionId, quantity]) => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      addItem({
        id: `option-${optionId}-${Date.now()}`,
        serviceType: 'creative-studio',
        serviceName: option.name,
        date: new Date().toISOString().split('T')[0],
        duration: 'hour',
        price: option.price,
        quantity: quantity
      });
    });
    setSelectedOptions({});
  };

  const totalSelected = Object.keys(selectedOptions).length;
  const totalPrice = calculateTotal();

  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[140px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-400/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 font-inter text-sm font-bold">Maximisez votre production</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            OPTIONS PREMIUM
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              POUR ALLER PLUS LOIN
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Transformez votre tournage en production professionnelle complète.
            Ajoutez des services premium pour un résultat exceptionnel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-2xl p-8 mb-12 backdrop-blur-xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-montserrat font-black text-white mb-3">
                Pack Réussite : +42% de qualité perçue
              </h3>
              <p className="text-white/80 font-inter leading-relaxed mb-4">
                Nos clients qui ajoutent au moins 2 options premium constatent une augmentation moyenne de <span className="font-bold text-emerald-400">+120% d'engagement</span> sur leurs contenus.
                Le téléprompteur et le color grading sont les plus demandés.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/90 text-sm font-inter font-medium">80% de nos clients ajoutent des options</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/90 text-sm font-inter font-medium">Satisfaction garantie</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedOptions.map(([optionId, option], index) => {
            const Icon = option.icon;
            const isSelected = selectedOptions[optionId] > 0;
            const quantity = selectedOptions[optionId] || 0;

            return (
              <motion.div
                key={optionId}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl opacity-0 blur-xl transition-all duration-500 group-hover:opacity-30"
                  animate={isSelected ? { opacity: 0.4 } : {}}
                />

                <div className={`relative bg-slate-900/80 backdrop-blur-2xl rounded-2xl p-6 border-2 transition-all duration-500 h-full ${
                  isSelected ? 'border-violet-500' : 'border-white/10 group-hover:border-white/20'
                }`}>
                  {(option.recommended || option.popular) && (
                    <div className="absolute -top-3 -right-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl"
                      >
                        <Star className="w-3 h-3" />
                        POPULAIRE
                      </motion.div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${
                      isSelected
                        ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
                        : 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-montserrat font-black text-white mb-1">
                        {option.name}
                      </h3>
                      <p className="text-white/60 text-sm font-inter">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                        {option.price}€
                      </span>
                      <span className="text-white/50 text-sm font-inter">
                        {option.unit}
                      </span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isSelected ? (
                      <motion.button
                        key="add"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleOption(optionId)}
                        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-3 rounded-xl font-montserrat font-bold flex items-center justify-center gap-2 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                        Ajouter
                      </motion.button>
                    ) : (
                      <motion.div
                        key="quantity"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(optionId, -1)}
                          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </motion.button>
                        <div className="flex-1 text-center">
                          <div className="text-2xl font-montserrat font-black text-white">
                            {quantity}
                          </div>
                          <div className="text-xs text-white/50 font-inter">
                            {quantity * option.price}€
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(optionId, 1)}
                          className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg flex items-center justify-center text-white transition-all"
                        >
                          <Plus className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {!showAllOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllOptions(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold transition-all duration-300"
            >
              Voir toutes les options
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {totalSelected > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4"
            >
              <div className="bg-slate-900/95 backdrop-blur-2xl border-2 border-violet-500/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white/60 text-sm font-inter mb-1">
                      {totalSelected} option{totalSelected > 1 ? 's' : ''} sélectionnée{totalSelected > 1 ? 's' : ''}
                    </div>
                    <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                      {totalPrice}€
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addToCart}
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-xl font-montserrat font-bold flex items-center gap-3 shadow-xl"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Ajouter au panier
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-inter">
                  <Check className="w-4 h-4" />
                  <span>Vous économisez en achetant plusieurs options ensemble</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
