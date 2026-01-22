import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, Building2 } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

export default function Contact() {
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

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-bold uppercase tracking-wider">Le 40 Marseille</span>
              </div>
            </motion.div>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-[1.1]"
            >
              CONTACTEZ
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
                  NOTRE ÉQUIPE
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
              className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
            >
              Une question, un projet ? Notre équipe est à votre écoute pour vous accompagner.
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

            {/* Cartes d'info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
            >
              {/* Adresse */}
              <motion.a
                href="https://maps.google.com/?q=40+Avenue+de+Saint+Antoine+13015+Marseille"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-amber-500/20 transition-colors">
                  <MapPin className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Adresse</h3>
                <p className="text-white/60 text-sm mb-1">40 Avenue de Saint Antoine</p>
                <p className="text-white/60 text-sm mb-3">13015 Marseille</p>
                <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Voir sur Maps <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:contact@bureauxle40.fr"
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Email</h3>
                <p className="text-white/60 text-sm mb-3">contact@bureauxle40.fr</p>
                <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Envoyer un email <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>

              {/* Horaires */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Horaires</h3>
                <p className="text-white/60 text-sm mb-1">Lun - Ven : 9h00 - 19h00</p>
                <p className="text-white/60 text-sm mb-1">Sam : 9h00 - 13h00</p>
                <p className="text-emerald-400 text-sm font-medium mt-2">Accès 24/7 membres</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section CTA Visite */}
        <section className="relative py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 text-center overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-montserrat font-black text-white mb-4">
                  Envie de découvrir nos espaces ?
                </h2>
                <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                  Réservez une visite gratuite et découvrez l'environnement de travail qui transformera votre quotidien professionnel.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.a
                    href="/reserver-visite"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ opacity: [0.5, 0.75, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white rounded-xl font-montserrat font-bold shadow-2xl">
                      <span>Réserver une visite gratuite</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+33491962151"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Appeler maintenant</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.a
              href="https://maps.google.com/?q=40+Avenue+de+Saint+Antoine+13015+Marseille"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="block relative overflow-hidden rounded-3xl border border-white/10 group"
            >
              <div className="aspect-[21/9] bg-gradient-to-br from-amber-900/20 to-orange-900/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/5.3698,43.3620,14,0/1200x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative text-center z-10">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30"
                  >
                    <MapPin className="w-10 h-10 text-white" />
                  </motion.div>
                  <p className="text-white font-montserrat font-bold text-xl mb-2">Le 40 - Marseille</p>
                  <p className="text-white/60">40 Avenue de Saint Antoine, 13015</p>
                  <p className="text-amber-400 text-sm mt-3 font-medium">Cliquez pour ouvrir dans Google Maps →</p>
                </div>
              </div>
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
