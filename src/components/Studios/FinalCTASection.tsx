import { motion } from 'framer-motion';
import { ArrowRight, Video, Calendar } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-black to-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-teal-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center"
          >
            <Video className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            PRÊT À CRÉER VOTRE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400">
              CONTENU PROFESSIONNEL ?
            </span>
          </h2>

          <p className="text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto">
            Réservez dès maintenant votre créneau et bénéficiez d'un studio équipé Sony FX3,
            d'un technicien dédié et d'une livraison rapide de vos fichiers.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="#setups"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 rounded-2xl px-10 py-5 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white" />
                <span className="font-montserrat font-bold text-white">
                  Réserver un créneau
                </span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-2xl font-montserrat font-bold transition-all duration-300"
            >
              Visite du studio
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>Disponible 7j/7</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>Annulation flexible</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>Devis gratuit sous 24h</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
