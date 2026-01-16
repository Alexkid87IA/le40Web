import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, Crown } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function ComparisonTableSection() {
  const comparisonData = [
    {
      feature: 'Scan courrier',
      le40: { type: 'highlight', value: '2h', icon: Check },
      competitorA: { type: 'warning', value: 'Hebdo', icon: AlertTriangle },
      competitorB: { type: 'negative', value: 'Pas de scan', icon: X }
    },
    {
      feature: 'Standard inclus',
      le40: { type: 'positive', icon: Check },
      competitorA: { type: 'negative', value: 'En option', icon: X },
      competitorB: { type: 'negative', value: 'En option', icon: X }
    },
    {
      feature: 'Salle incluse',
      le40: { type: 'positive', icon: Check },
      competitorA: { type: 'negative', value: 'Payant', icon: X },
      competitorB: { type: 'negative', value: 'Payant', icon: X }
    },
    {
      feature: 'Conseiller dédié',
      le40: { type: 'positive', icon: Check },
      competitorA: { type: 'negative', value: 'Support générique', icon: X },
      competitorB: { type: 'negative', value: 'FAQ seulement', icon: X }
    },
    {
      feature: 'Agrément Préfecture',
      le40: { type: 'positive', icon: Check },
      competitorA: { type: 'positive', icon: Check },
      competitorB: { type: 'warning', value: 'À vérifier', icon: AlertTriangle }
    },
    {
      feature: 'Résiliation',
      le40: { type: 'highlight', value: '1 clic', icon: Check },
      competitorA: { type: 'negative', value: 'Engagement 12 mois' },
      competitorB: { type: 'negative', value: 'Préavis 3 mois' }
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Effets lumineux subtils */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-[120px] bg-orange-500/8"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title="Pourquoi nos clients"
          highlightedText="ne partent pas"
          className="mb-10 md:mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent opacity-50 blur"></div>

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-6 px-6 text-white/60 font-semibold font-montserrat text-sm tracking-wide">
                        CRITÈRE
                      </th>
                      <th className="text-center py-6 px-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent"></div>
                        <div className="relative flex flex-col items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Crown className="w-5 h-5 text-orange-400" />
                            <span className="text-orange-400 font-bold font-montserrat">Le 40</span>
                          </div>
                          <span className="text-xs text-orange-400/60 font-inter">Notre service</span>
                        </div>
                      </th>
                      <th className="text-center py-6 px-6 text-white/60 font-semibold font-montserrat text-sm">
                        Concurrent A
                      </th>
                      <th className="text-center py-6 px-6 text-white/60 font-semibold font-montserrat text-sm">
                        Concurrent B
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-5 px-6 font-inter text-white/80 font-medium">
                          {row.feature}
                        </td>

                        <td className="text-center py-5 px-6 relative">
                          <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative inline-flex items-center justify-center gap-2">
                            {row.le40.type === 'highlight' && (
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                className="flex items-center gap-2 text-orange-400 font-semibold font-montserrat"
                              >
                                <div className="w-6 h-6 rounded-lg bg-orange-400/20 flex items-center justify-center">
                                  <row.le40.icon className="w-4 h-4" />
                                </div>
                                {row.le40.value}
                              </motion.div>
                            )}
                            {row.le40.type === 'positive' && (
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                className="w-8 h-8 rounded-lg bg-orange-400/20 flex items-center justify-center"
                              >
                                <Check className="w-5 h-5 text-orange-400" />
                              </motion.div>
                            )}
                          </div>
                        </td>

                        <td className="text-center py-5 px-6 text-white/60 font-inter text-sm">
                          <div className="inline-flex items-center justify-center gap-2">
                            {row.competitorA.icon && (
                              <row.competitorA.icon className={`w-4 h-4 ${
                                row.competitorA.type === 'positive' ? 'text-orange-400' :
                                row.competitorA.type === 'warning' ? 'text-orange-400' :
                                'text-red-400'
                              }`} />
                            )}
                            {row.competitorA.value}
                          </div>
                        </td>

                        <td className="text-center py-5 px-6 text-white/60 font-inter text-sm">
                          <div className="inline-flex items-center justify-center gap-2">
                            {row.competitorB.icon && (
                              <row.competitorB.icon className={`w-4 h-4 ${
                                row.competitorB.type === 'positive' ? 'text-orange-400' :
                                row.competitorB.type === 'warning' ? 'text-orange-400' :
                                'text-red-400'
                              }`} />
                            )}
                            {row.competitorB.value}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {comparisonData.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-xl border border-white/[0.08] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-orange-500/10 to-transparent p-4 border-b border-white/10">
                  <h3 className="text-white font-montserrat font-bold text-sm">{row.feature}</h3>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-orange-400" />
                      <span className="text-white/80 font-inter text-sm font-semibold">Le 40</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {row.le40.type === 'highlight' && (
                        <>
                          <div className="w-6 h-6 rounded-lg bg-orange-400/20 flex items-center justify-center">
                            <row.le40.icon className="w-3.5 h-3.5 text-orange-400" />
                          </div>
                          <span className="text-orange-400 font-semibold font-montserrat text-sm">{row.le40.value}</span>
                        </>
                      )}
                      {row.le40.type === 'positive' && (
                        <div className="w-7 h-7 rounded-lg bg-orange-400/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-orange-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/60 font-inter text-sm">Concurrent A</span>
                    <div className="flex items-center gap-2">
                      {row.competitorA.icon && (
                        <row.competitorA.icon className={`w-3.5 h-3.5 ${
                          row.competitorA.type === 'positive' ? 'text-orange-400' :
                          row.competitorA.type === 'warning' ? 'text-orange-400' :
                          'text-red-400'
                        }`} />
                      )}
                      <span className="text-white/60 font-inter text-xs">{row.competitorA.value || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/60 font-inter text-sm">Concurrent B</span>
                    <div className="flex items-center gap-2">
                      {row.competitorB.icon && (
                        <row.competitorB.icon className={`w-3.5 h-3.5 ${
                          row.competitorB.type === 'positive' ? 'text-orange-400' :
                          row.competitorB.type === 'warning' ? 'text-orange-400' :
                          'text-red-400'
                        }`} />
                      )}
                      <span className="text-white/60 font-inter text-xs">{row.competitorB.value || '—'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 md:mt-12 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 p-6 md:p-8 bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/[0.08]">
              <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl font-inter leading-relaxed px-4">
                Le prix n'est <strong className="text-white font-bold">PAS</strong> le seul critère.
                <br />
                Ce qui compte : <strong className="text-orange-400 font-bold">le service après l'achat</strong>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
