import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Sparkles } from 'lucide-react';
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

export default function PricingCard({ plan, index = 0 }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative group h-full"
    >
      {plan.popular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-lg opacity-60"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-5 py-2 rounded-full flex items-center gap-2 shadow-2xl border border-orange-300/30">
              <Star className="w-4 h-4 fill-white" />
              Plus populaire
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full"
      >
        <div
          className={`absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
            plan.popular
              ? 'bg-gradient-to-br from-orange-500/30 via-amber-500/20 to-orange-500/30'
              : 'bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-emerald-500/20'
          }`}
        ></div>

        <motion.div
          className={`absolute -inset-[3px] rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 ${
            plan.popular
              ? 'bg-gradient-to-br from-orange-500/25 to-amber-500/25'
              : 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20'
          }`}
        />

        <div
          className={`relative h-full bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-950/98 backdrop-blur-2xl rounded-3xl p-10 border transition-all duration-500 overflow-hidden shadow-xl ${
            plan.popular
              ? 'border-orange-500/30 group-hover:border-orange-400/50'
              : 'border-white/[0.08] group-hover:border-white/[0.15]'
          }`}
        >
          <div
            className={`absolute top-0 right-0 w-40 h-40 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
              plan.popular
                ? 'bg-gradient-to-bl from-orange-500/[0.12] to-transparent'
                : 'bg-gradient-to-bl from-emerald-500/[0.10] to-transparent'
            }`}
          ></div>

          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            ></div>
          </div>

          <div className="relative">
            <div className="text-center mb-10">
              {plan.popular && (
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-400/30 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-orange-300 font-bold tracking-wider uppercase">
                    Meilleur choix
                  </span>
                </motion.div>
              )}

              <h3 className="text-3xl font-montserrat font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-emerald-400 transition-all duration-500">
                {plan.name}
              </h3>
              <p className="text-white/60 text-sm mb-8 font-inter leading-relaxed">{plan.description}</p>

              <div className="flex items-baseline justify-center mb-2">
                <span
                  className={`text-6xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${
                    plan.gradient || 'from-orange-400 via-amber-400 to-orange-400'
                  }`}
                >
                  {plan.priceDisplay}
                </span>
                {plan.period && (
                  <span className="text-white/40 ml-3 text-lg font-inter">{plan.period}</span>
                )}
              </div>
            </div>

            <div className="mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="flex items-start gap-4 group/feature"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <Check
                        className={`w-6 h-6 ${
                          plan.popular ? 'text-orange-400' : 'text-emerald-400'
                        } group-hover/feature:scale-110 transition-transform`}
                      />
                    </motion.div>
                    <span className="text-white/80 font-inter text-sm leading-relaxed group-hover/feature:text-white transition-colors">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
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
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-2xl font-montserrat font-semibold text-center transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white/[0.06] text-white/90 hover:bg-white/[0.10] border border-orange-500/20 hover:border-orange-400/40'
                      : 'bg-white/[0.04] text-white/80 hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15]'
                  }`}
                >
                  En savoir plus
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
