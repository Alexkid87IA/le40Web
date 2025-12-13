import { motion } from 'framer-motion';
import { Check, TrendingDown } from 'lucide-react';
import { cards } from '../../utils/designSystem';
import { studioSetups, degressivePricing } from '../../data/studios/setups';
import { optionsCatalog } from '../../data/studios/options';

const includedItems = [
  'Tout l\'équipement listé',
  'Technicien présent pendant la session',
  'Transfert des rushs (4K)',
  'Parking gratuit (6 places)',
  'WiFi Fibre 1Gb/s',
  'Espace détente avec café'
];

export default function TransparentPricing() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-montserrat text-white">
            Tarifs Clairs, Sans Surprise
          </h2>
          <p className="text-xl text-white/80">
            Offre découverte valable sur les 50 premiers créneaux
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${cards.premium.full} overflow-hidden`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-white font-bold font-montserrat">
                      SETUP
                    </th>
                    <th className="text-right py-4 px-6 text-white font-bold font-montserrat">
                      TARIF NORMAL
                    </th>
                    <th className="text-right py-4 px-6 text-orange-400 font-bold font-montserrat">
                      OFFRE LANCEMENT
                    </th>
                    <th className="text-right py-4 px-6 text-green-400 font-bold font-montserrat">
                      ÉCONOMIE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studioSetups.map((setup, index) => (
                    <motion.tr
                      key={setup.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{setup.popular ? '⭐' : ''}</div>
                          <span className="font-semibold text-white">{setup.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-white/60 line-through">{setup.basePrice}€/h</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-2xl font-bold text-orange-400">
                          {setup.launchPrice}€/h
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <TrendingDown className="w-4 h-4 text-green-400" />
                          <span className="font-bold text-green-400">-{setup.savings}€</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${cards.standard.full} space-y-6`}
            >
              <h3 className="text-2xl font-bold text-white font-montserrat">
                Inclus dans tous les tarifs
              </h3>

              <div className="space-y-3">
                {includedItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${cards.standard.full} space-y-6`}
            >
              <h3 className="text-2xl font-bold text-white font-montserrat">
                Tarifs dégressifs
              </h3>

              <div className="space-y-3">
                {degressivePricing.filter(d => d.discount > 0).map((tier, index) => (
                  <motion.div
                    key={tier.hours}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div>
                      <span className="text-white font-semibold">{tier.label} réservées</span>
                      {tier.recommended && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs font-bold">
                          Recommandé
                        </span>
                      )}
                    </div>
                    <span className="text-orange-400 font-bold">
                      -{Math.round(tier.discount * 100)}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${cards.minimal.full}`}
          >
            <h3 className="text-2xl font-bold text-white font-montserrat mb-6">
              Options
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(optionsCatalog).map(([id, option], index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white text-sm">{option.name}</h4>
                        <span className="text-orange-400 font-bold text-sm whitespace-nowrap">
                          {option.price}€
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">{option.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
