import { motion } from 'framer-motion';
import { partners } from '../../data/salles/partners';
import { Building2, Award } from 'lucide-react';

export default function PartnersSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-emerald-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute inset-0 bg-cyan-600/10 rounded-full blur-[150px] animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Nos clients
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6">
            ILS ORGANISENT
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              CHEZ NOUS
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Les plus grandes entreprises nous font confiance pour leurs événements
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl md:rounded-3xl opacity-20 blur-2xl"></div>

          <div className="relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl md:rounded-3xl p-12 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="relative group"
                >
                  <div className="relative aspect-square">
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500"
                    />
                    <div className="relative w-full h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-white/30 transition-all flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-montserrat font-black text-2xl">
                            {partner.logo}
                          </span>
                        </div>
                        <span className="text-white/90 font-inter font-bold text-sm block mb-1">
                          {partner.name}
                        </span>
                        <span className="text-white/40 font-inter text-xs">
                          {partner.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            {
              number: '100+',
              label: 'Entreprises CAC 40',
              gradient: 'from-cyan-600 to-blue-600'
            },
            {
              number: '500+',
              label: 'Événements organisés',
              gradient: 'from-emerald-600 to-teal-600'
            },
            {
              number: '98%',
              label: 'Clients satisfaits',
              gradient: 'from-violet-600 to-purple-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
              />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-5 md:p-6 lg:p-8 border border-white/10 group-hover:border-white/20 transition-all text-center">
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  className={`text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2`}
                >
                  {stat.number}
                </motion.div>
                <p className="text-white/70 font-inter">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <p className="text-white font-inter">
              <span className="font-bold text-emerald-400">Vous aussi</span>, rejoignez les leaders qui nous font confiance
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
