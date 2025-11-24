import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { comparisonData } from '../../data/bureaux/comparison';

export default function ComparisonSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-black text-white mb-4 md:mb-6 px-4">
            POURQUOI CHOISIR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">LE 40</span> ?
          </h2>
          <p className="text-sm md:text-base lg:text-xl font-inter text-white/60 max-w-3xl mx-auto px-4">
            Comparaison détaillée avec les solutions traditionnelles. Les chiffres parlent d'eux-mêmes.
          </p>
        </motion.div>

        {/* Mobile: Card-based layout */}
        <div className="md:hidden space-y-4">
          {comparisonData.rows.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10"
            >
              <h3 className="text-white font-montserrat font-bold text-base mb-4 pb-3 border-b border-white/10">
                {row.criterion}
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-950/20 rounded-xl border border-red-900/30">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-red-400 text-xs font-inter font-semibold mb-1">Location Classique</div>
                    <div className="text-white/80 text-sm font-inter">{row.classique}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-950/20 rounded-xl border border-orange-900/30">
                  <X className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-orange-400 text-xs font-inter font-semibold mb-1">Télétravail</div>
                    <div className="text-white/80 text-sm font-inter">{row.teletravail}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-950/30 to-teal-950/30 rounded-xl border-2 border-emerald-500/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl"></div>
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 relative z-10" />
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-emerald-400 text-xs font-inter font-semibold">Le 40 Bureaux</div>
                      <div className="px-2 py-0.5 bg-emerald-500/20 rounded-full">
                        <span className="text-emerald-300 text-[10px] font-bold">MEILLEUR CHOIX</span>
                      </div>
                    </div>
                    <div className="text-white font-inter text-sm font-semibold">{row.le40}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Table layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0"
        >
          <div className="min-w-[800px] bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="grid grid-cols-4 bg-gradient-to-r from-emerald-950/30 to-teal-950/30 p-4 md:p-6 border-b border-white/10">
              {comparisonData.headers.map((header, index) => (
                <div
                  key={index}
                  className={`${
                    index === 0
                      ? 'text-left'
                      : index === 3
                      ? 'text-center font-montserrat font-black text-emerald-400'
                      : 'text-center text-white/60 font-inter'
                  }`}
                >
                  {index === 3 && <div className="text-[10px] md:text-xs text-emerald-400/60 mb-1">👑 MEILLEURE OPTION</div>}
                  <div className={`text-xs md:text-sm lg:text-base ${index === 0 ? 'text-white font-montserrat font-bold' : ''}`}>{header}</div>
                </div>
              ))}
            </div>

            {comparisonData.rows.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-4 p-4 md:p-6 border-b border-white/5 hover:bg-white/5 transition-colors ${
                  row.le40Highlight ? 'bg-emerald-500/5' : ''
                }`}
              >
                <div className="font-montserrat font-semibold text-white pr-2 md:pr-4 text-xs md:text-sm">
                  {row.criterion}
                </div>
                <div className="text-center text-white/60 font-inter text-xs md:text-sm px-1 md:px-2">
                  {row.classique}
                </div>
                <div className="text-center text-white/60 font-inter text-xs md:text-sm px-1 md:px-2">
                  {row.teletravail}
                </div>
                <div className={`text-center font-inter text-xs md:text-sm px-1 md:px-2 ${
                  row.le40Highlight ? 'text-emerald-400 font-semibold' : 'text-white/70'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    {row.le40Highlight && <Check className="w-4 h-4 text-green-400" />}
                    <span>{row.le40}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-16 grid md:grid-cols-3 gap-6 md:gap-8"
        >
          <div className="p-6 md:p-8 bg-gradient-to-br from-red-950/20 to-red-900/10 border border-red-900/30 rounded-xl md:rounded-2xl text-center">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-red-500/20 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <X className="w-5 md:w-6 h-5 md:h-6 text-red-400" />
            </div>
            <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-2">Location Classique</h3>
            <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4">Engagement 3-9 ans</p>
            <div className="text-2xl md:text-3xl font-black text-red-400 mb-2">2500-3500€</div>
            <p className="text-white/50 text-xs">+ charges + aménagement</p>
          </div>

          <div className="p-6 md:p-8 bg-gradient-to-br from-orange-950/20 to-orange-900/10 border border-orange-900/30 rounded-xl md:rounded-2xl text-center">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-orange-500/20 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <X className="w-5 md:w-6 h-5 md:h-6 text-orange-400" />
            </div>
            <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-2">Télétravail</h3>
            <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4">Isolement & limites</p>
            <div className="text-2xl md:text-3xl font-black text-orange-400 mb-2">0€</div>
            <p className="text-white/50 text-xs">mais perte de productivité</p>
          </div>

          <div className="p-6 md:p-8 bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border-2 border-emerald-500/50 rounded-xl md:rounded-2xl text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-emerald-500/20 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Check className="w-5 md:w-6 h-5 md:h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-2">Le 40 Bureaux</h3>
              <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4">Flexibilité maximale</p>
              <div className="text-2xl md:text-3xl font-black text-emerald-400 mb-2">699-2499€</div>
              <p className="text-emerald-300 text-xs font-semibold">TOUT INCLUS • Sans engagement long</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
