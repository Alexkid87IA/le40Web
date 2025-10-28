import { motion } from 'framer-motion';
import { detailedServices } from '../../data/domiciliation/services';
import { ArrowRight, Check } from 'lucide-react';

export default function ServicesDetailSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">

      <div className="absolute inset-0 opacity-[0.015]"
           style={{
             backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
             backgroundSize: '48px 48px'
           }}>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-40 w-96 h-96 rounded-full blur-[120px] bg-amber-500/5"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-40 w-96 h-96 rounded-full blur-[120px] bg-orange-500/5"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="text-amber-400 font-inter text-sm font-bold">8 services premium inclus</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
            Tout ce que vous obtenez
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              dans votre formule
            </span>
          </h2>

          <p className="text-xl text-white/60 font-inter max-w-3xl mx-auto">
            Pas de frais cachés, pas de surprises. Voici exactement ce qui est inclus pour faire grandir votre entreprise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {detailedServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

              <div className="relative h-full p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">

                <div className="mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 font-montserrat leading-tight">
                    {service.title}
                  </h3>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70 font-inter">
                      <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {service.features.length > 4 && (
                  <div className="text-xs text-amber-400 font-inter font-semibold mb-4">
                    + {service.features.length - 4} autres avantages
                  </div>
                )}

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shrink-0"></div>
                    <div>
                      <p className="text-xs text-white/90 italic font-inter leading-relaxed mb-1">
                        "{service.testimonial.quote}"
                      </p>
                      <p className="text-xs text-white/60 font-inter">
                        {service.testimonial.author}
                      </p>
                    </div>
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
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 backdrop-blur-sm">
            <div className="flex-1 text-left">
              <p className="text-white font-montserrat font-bold text-lg mb-1">
                Prêt à accéder à tous ces services ?
              </p>
              <p className="text-white/60 font-inter text-sm">
                Choisissez votre formule et commencez en 24h
              </p>
            </div>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-montserrat font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
            >
              <span>Voir les formules</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
