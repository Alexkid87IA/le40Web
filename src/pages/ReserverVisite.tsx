import { motion } from 'framer-motion';
import { Phone, Clock, MapPin, ArrowLeft, Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

export default function ReserverVisite() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      {/* Vidéo de fond fixe */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://le40-cdn.b-cdn.net/videos/hero/hero-background.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Bouton retour */}
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="absolute top-24 left-4 sm:left-8 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-inter group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Retour
          </motion.button>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm font-bold uppercase tracking-wider">Bientôt disponible</span>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-black text-white mb-6 leading-[1.1]"
          >
            PLANIFIER
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
                UNE VISITE
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto"
          >
            Notre formulaire de réservation en ligne arrive bientôt. En attendant, appelez-nous pour planifier votre visite gratuite !
          </motion.p>

          {/* CTA Téléphone Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <motion.a
              href="tel:+33491962151"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-block"
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white rounded-2xl font-montserrat font-black text-2xl md:text-3xl shadow-2xl">
                <Phone className="w-8 h-8" />
                <span>04 91 96 21 51</span>
              </div>
            </motion.a>
          </motion.div>

          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {/* Visite gratuite */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3 mx-auto">
                <Star className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">100% Gratuit</h3>
              <p className="text-white/60 text-xs">Sans engagement</p>
            </div>

            {/* Horaires */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3 mx-auto">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Lun - Ven</h3>
              <p className="text-white/60 text-xs">9h00 - 19h00</p>
            </div>

            {/* Adresse */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3 mx-auto">
                <MapPin className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Le 40</h3>
              <p className="text-white/60 text-xs">40 Av. Saint Antoine</p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
