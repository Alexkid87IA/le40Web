import { motion } from 'framer-motion';
import { ArrowRight, Shield, Check, Star, Phone, Calendar } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-400 mb-8"
          >
            PASSEZ À L'ACTION
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6 leading-tight">
            PRÊT À CRÉER DU{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              CONTENU PRO
            </span>{'\u00A0'}?
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-12 font-inter">
            Réservez votre session studio et commencez à produire du contenu de qualité professionnelle
          </p>

          {/* 3 cards CTA */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="#booking-flow" className="group">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all h-full"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                  Réserver en ligne
                </h3>
                <p className="text-white/60 font-inter text-sm mb-4">
                  Choisissez votre studio, formule et créneau en quelques clics
                </p>
                <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  Configurer ma session
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </a>

            <a href="tel:+33491962151" className="group">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-teal-500/30 transition-all h-full"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                  Appeler maintenant
                </h3>
                <p className="text-white/60 font-inter text-sm mb-4">
                  Posez vos questions directement à notre équipe
                </p>
                <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-sm">
                  04 91 96 21 51
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </a>

            <a href="/reserver-visite" className="group">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all h-full"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                  Visiter les studios
                </h3>
                <p className="text-white/60 font-inter text-sm mb-4">
                  Découvrez nos espaces et testez l'équipement sur place
                </p>
                <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  Réserver une visite
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </a>
          </div>

          {/* Info bar */}
          <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-white/80 font-inter text-sm">Paiement sécurisé</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-white/80 font-inter text-sm">Confirmation immédiate</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-white/80 font-inter text-sm">Annulation flexible</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
