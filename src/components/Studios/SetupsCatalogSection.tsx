import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Users, Clock } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';

export default function SetupsCatalogSection() {
  const [selectedSetup, setSelectedSetup] = useState<string | null>(null);

  return (
    <section id="setups" className="py-32 bg-gradient-to-b from-slate-950 to-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Nos Setups
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            7 CONFIGURATIONS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              PROFESSIONNELLES
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-inter">
            Du podcast audio au plateau Full Show, trouvez le setup parfait pour votre projet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studioSetups.map((setup, index) => (
            <motion.div
              key={setup.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedSetup(setup.id)}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${setup.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={setup.image}
                    alt={setup.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  {setup.popular && (
                    <div className="absolute top-4 right-4">
                      <div className={`bg-gradient-to-r ${setup.gradient} text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1`}>
                        <Sparkles className="w-3 h-3" />
                        POPULAIRE
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl rounded-lg px-3 py-1.5">
                        <Users className="w-4 h-4 text-white/80" />
                        <span className="text-white/90 text-xs font-medium">{setup.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl rounded-lg px-3 py-1.5">
                        <Clock className="w-4 h-4 text-white/80" />
                        <span className="text-white/90 text-xs font-medium">{setup.recommendedDuration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${setup.gradient} font-montserrat font-semibold text-sm tracking-wider uppercase`}>
                      {setup.subtitle}
                    </span>
                    <h3 className="text-2xl font-montserrat font-black text-white mt-2 mb-2">
                      {setup.name}
                    </h3>
                    <p className="text-white/70 font-inter text-sm mb-3">
                      {setup.description}
                    </p>
                    <p className="text-white/50 font-inter text-xs italic">
                      {setup.usage}
                    </p>
                  </div>

                  <div className="space-y-2 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm font-inter">{setup.equipment.cameras}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm font-inter">{setup.equipment.audio}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm font-inter">{setup.equipment.light}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-montserrat font-black text-white">
                        {setup.basePrice}€
                      </div>
                      <div className="text-white/50 text-sm font-inter">
                        par heure
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-r ${setup.gradient} rounded-xl px-5 py-3 flex items-center gap-2 group/btn`}
                    >
                      <span className="font-montserrat font-semibold text-white text-sm">
                        Découvrir
                      </span>
                      <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 font-inter mb-6">
            Tous les setups incluent : technicien présent, transfert des fichiers, assistance complète
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold transition-all duration-300"
          >
            Besoin de conseils ? Contactez-nous
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
