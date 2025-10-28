import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    price: number;
    priceDisplay: string;
    period?: string;
    description: string;
    features: string[];
    gradient?: string;
    popular?: boolean;
    type: 'coworking' | 'meeting-room' | 'studio' | 'private-office' | 'domiciliation';
    duration?: 'hour' | 'half-day' | 'day' | 'week' | 'month';
  };
  index?: number;
}

const PricingCard = React.memo(function PricingCard({ plan, index = 0 }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative"
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Plus populaire
          </div>
        </div>
      )}

      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className={`relative h-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 ${
          plan.popular ? 'border-purple-500/50' : 'border-white/10'
        } hover:border-white/20`}
      >
        {/* Plan header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
            {plan.name}
          </h3>
          <p className="text-white/60 text-sm mb-6">
            {plan.description}
          </p>
          <div className="flex items-baseline justify-center">
            <span className={`text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${
              plan.gradient || 'from-purple-400 to-pink-400'
            }`}>
              {plan.priceDisplay}
            </span>
            {plan.period && (
              <span className="text-white/40 ml-2">{plan.period}</span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 font-inter text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <AddToCartButton
            item={{
              id: plan.id,
              name: plan.name,
              price: plan.price,
              type: plan.type,
              duration: plan.duration
            }}
            variant={plan.popular ? 'primary' : 'secondary'}
          />

          <Link to="/contact" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-montserrat font-medium text-center transition-all duration-300 bg-white/5 text-white hover:bg-white/10 border border-white/10"
            >
              En savoir plus
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default PricingCard;