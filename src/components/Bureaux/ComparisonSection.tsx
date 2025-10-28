import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { comparisonData } from '../../data/bureaux/comparison';

export default function ComparisonSection() {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            POURQUOI CHOISIR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">LE 40</span> ?
          </h2>
          <p className="text-xl font-inter text-white/60 max-w-3xl mx-auto">
            Comparaison détaillée avec les solutions traditionnelles. Les chiffres parlent d'eux-mêmes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <div className="min-w-[800px] bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-4 bg-gradient-to-r from-emerald-950/30 to-teal-950/30 p-6 border-b border-white/10">
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
                  {index === 3 && <div className="text-xs text-emerald-400/60 mb-1">👑 MEILLEURE OPTION</div>}
                  <div className={index === 0 ? 'text-white font-montserrat font-bold' : ''}>{header}</div>
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
                className={`grid grid-cols-4 p-6 border-b border-white/5 hover:bg-white/5 transition-colors ${
                  row.le40Highlight ? 'bg-emerald-500/5' : ''
                }`}
              >
                <div className="font-montserrat font-semibold text-white pr-4">
                  {row.criterion}
                </div>
                <div className="text-center text-white/60 font-inter text-sm px-2">
                  {row.classique}
                </div>
                <div className="text-center text-white/60 font-inter text-sm px-2">
                  {row.teletravail}
                </div>
                <div className={`text-center font-inter text-sm px-2 ${
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
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="p-8 bg-gradient-to-br from-red-950/20 to-red-900/10 border border-red-900/30 rounded-2xl text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <X className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-2">Location Classique</h3>
            <p className="text-white/60 text-sm mb-4">Engagement 3-9 ans</p>
            <div className="text-3xl font-black text-red-400 mb-2">2500-3500€</div>
            <p className="text-white/50 text-xs">+ charges + aménagement</p>
          </div>

          <div className="p-8 bg-gradient-to-br from-orange-950/20 to-orange-900/10 border border-orange-900/30 rounded-2xl text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <X className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-2">Télétravail</h3>
            <p className="text-white/60 text-sm mb-4">Isolement & limites</p>
            <div className="text-3xl font-black text-orange-400 mb-2">0€</div>
            <p className="text-white/50 text-xs">mais perte de productivité</p>
          </div>

          <div className="p-8 bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border-2 border-emerald-500/50 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-montserrat font-bold text-white mb-2">Le 40 Bureaux</h3>
              <p className="text-white/60 text-sm mb-4">Flexibilité maximale</p>
              <div className="text-3xl font-black text-emerald-400 mb-2">699-2499€</div>
              <p className="text-emerald-300 text-xs font-semibold">TOUT INCLUS • Sans engagement long</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
