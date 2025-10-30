import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, Check, Zap, Star } from 'lucide-react';

export default function FinalCTASection() {
  const remainingSlots = 37;
  const totalSlots = 50;

  return (
    <section className="relative py-32 bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600/20 via-fuchsia-600/20 to-violet-600/20 backdrop-blur-xl border border-fuchsia-400/30 mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-fuchsia-400" />
            </motion.div>
            <span className="text-sm font-inter font-medium text-white tracking-wide uppercase">
              Offre de lancement limitée
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight"
          >
            PRÊT À CRÉER DU
            <span className="block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400">
                CONTENU PRO
              </span>
              <span className="text-white"> ?</span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-inter"
          >
            Réservez votre session studio maintenant et profitez de 40% de réduction sur nos tarifs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-rose-400" />
                <span className="text-white font-inter text-lg">
                  Plus que <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400">{remainingSlots}</span> places sur {totalSlots}
                </span>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((totalSlots - remainingSlots) / totalSlots) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.a
              href="#configurator"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 text-white rounded-xl font-montserrat font-bold text-lg shadow-2xl">
                <span>Réserver maintenant</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold text-lg transition-all duration-300"
            >
              Poser une question
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Shield, text: 'Paiement sécurisé' },
              { icon: Check, text: 'Confirmation immédiate' },
              { icon: Star, text: 'Annulation flexible' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + (index * 0.1), duration: 0.4 }}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl"
              >
                <item.icon className="w-5 h-5 text-fuchsia-400" />
                <span className="text-white/80 font-inter">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
