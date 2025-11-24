import { motion } from 'framer-motion';
import { ArrowRight, Phone, Calendar, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import VisitBookingModal from './VisitBookingModal';

export default function FinalCTASection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 backdrop-blur-sm mb-8"
          >
            <span className="text-emerald-300 font-inter text-sm font-bold">🏢 Dernière étape avant votre nouveau QG</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-8 leading-tight">
            TROUVEZ VOTRE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              BUREAU IDÉAL
            </span>
          </h2>

          <p className="text-base md:text-lg font-inter font-light text-white/70 mb-12 max-w-3xl mx-auto">
            127 équipes ont déjà fait le choix Le 40. Rejoignez une communauté d'entrepreneurs ambitieux dans des bureaux qui s'adaptent à votre croissance.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <button onClick={() => setIsBookingModalOpen(true)} className="group">
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                    Réserver une visite
                  </h3>
                  <p className="text-white/70 font-inter text-sm mb-4">
                    Découvrez nos bureaux disponibles avec un membre de l'équipe
                  </p>
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-sm group-hover:gap-3 transition-all">
                    Réserver un créneau
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </button>

            <a href="tel:+33614315214" className="group">
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-teal-500/50 transition-all duration-300"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                    Appeler maintenant
                  </h3>
                  <p className="text-white/70 font-inter text-sm mb-4">
                    Posez vos questions directement à notre équipe
                  </p>
                  <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-sm group-hover:gap-3 transition-all">
                    06 14 31 52 14
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </a>

            <button onClick={() => setIsBookingModalOpen(true)} className="group">
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                    Demander un devis
                  </h3>
                  <p className="text-white/70 font-inter text-sm mb-4">
                    Recevez une proposition personnalisée sous 24h
                  </p>
                  <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
                    Prendre rendez-vous
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </button>
          </div>

          <div className="p-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 font-inter text-sm">
                  <span className="text-green-400 font-bold">3 bureaux disponibles</span> ce mois
                </span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="text-white/80 font-inter text-sm">
                ⏱️ Réponse en <span className="text-emerald-400 font-bold">moins de 2h</span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="text-white/80 font-inter text-sm">
                ✅ Visite <span className="text-emerald-400 font-bold">sans engagement</span>
              </div>
            </div>
          </div>

          <p className="text-white/50 font-inter text-sm mt-8">
            En continuant, vous acceptez d'être contacté par notre équipe pour organiser votre visite
          </p>
        </motion.div>
      </div>

      <VisitBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
