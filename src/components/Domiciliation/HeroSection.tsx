import { motion } from 'framer-motion';
import { Zap, ArrowRight, Shield, Clock, Mail, Phone, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[150px]"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-medium text-sm">Activation en 24h • Agrément Préfecture</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            >
              La domiciliation qui gère{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                TOUT
              </span>
              {' '}pour vous
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/70 mb-8"
            >
              Bien plus qu'une adresse : courrier numérisé en 2h, standard téléphonique pro,
              salle de réunion incluse, et un vrai accompagnement humain.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#pricing"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
              >
                Voir les 3 formules
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all inline-flex items-center justify-center gap-2"
              >
                Parler à un conseiller
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold text-orange-400">120+</div>
                <div className="text-sm text-white/60">Entreprises</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-white/60">Agrément Préfecture</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-white/60">Activation 24h</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -5, rotate: 2 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
              >
                <Mail className="w-8 h-8 text-orange-400 mb-3" />
                <div className="text-white font-semibold mb-2">Scan courrier</div>
                <div className="text-white/60 text-sm">2h chrono</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, rotate: -2 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 mt-8"
              >
                <Phone className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-white font-semibold mb-2">Standard pro</div>
                <div className="text-white/60 text-sm">Accueil personnalisé</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, rotate: -2 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 -mt-4"
              >
                <Building2 className="w-8 h-8 text-purple-400 mb-3" />
                <div className="text-white font-semibold mb-2">Salle incluse</div>
                <div className="text-white/60 text-sm">2-8h/mois</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, rotate: 2 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 mt-4"
              >
                <Users className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-white font-semibold mb-2">Conseiller dédié</div>
                <div className="text-white/60 text-sm">Humain, pas robot</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
