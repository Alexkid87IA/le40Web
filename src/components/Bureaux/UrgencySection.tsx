import { motion } from 'framer-motion';
import { Flame, Users, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UrgencySection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-950/30 to-red-950/30 border-2 border-orange-500/50 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-8"
            >
              <Flame className="w-5 h-5 text-white" />
              <span className="text-white font-montserrat font-bold">FORTE DEMANDE</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
              Seulement <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">3 bureaux</span>
              <br />
              disponibles ce mois
            </h2>

            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              La demande pour nos bureaux privés est très forte. Les meilleurs emplacements partent en premier. <span className="text-orange-400 font-bold">Ne laissez pas passer votre chance.</span>
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
              >
                <Users className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                <div className="text-3xl font-black text-white mb-2">12</div>
                <div className="text-white/70 text-sm">Demandes cette semaine</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-orange-500/30"
              >
                <TrendingUp className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                <div className="text-3xl font-black text-orange-400 mb-2">3</div>
                <div className="text-white/70 text-sm">Bureaux restants</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
              >
                <Clock className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                <div className="text-3xl font-black text-white mb-2">48h</div>
                <div className="text-white/70 text-sm">Délai moyen de location</div>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white px-10 py-5 rounded-2xl font-montserrat font-bold flex items-center gap-3"
                >
                  Réserver ma visite maintenant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </div>

            <p className="text-white/60 text-sm mt-6">
              ⏱️ Les bureaux disponibles sont réservés en moyenne en 48h
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-white/70 text-sm">Dernières réservations :</div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-black"></div>
              ))}
            </div>
            <div className="text-white/70 text-sm">
              <span className="text-emerald-400 font-bold">+5 entreprises</span> cette semaine
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
