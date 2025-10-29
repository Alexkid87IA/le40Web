import { motion } from 'framer-motion';
import { ArrowRight, Check, Video, Star, Zap, Shield, Clock } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '32px 32px'
             }}>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 w-full">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-inter text-sm font-semibold">Équipement Pro Sony</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/90 font-inter text-sm font-semibold">5.0/5</span>
              <span className="text-white/50 text-xs">(80+ productions)</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
              Studio vidéo & podcast
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                  professionnel
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-3xl -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </h1>

            <p className="text-xl text-white/70 font-inter max-w-3xl mx-auto mb-8 leading-relaxed">
              7 setups équipés Sony FX3, technicien inclus, livraison des rushs en 2h.
              Créez du contenu de qualité broadcast sans investissement matériel.
            </p>

            <div className="inline-flex items-center gap-4 mb-10">
              <div className="text-left">
                <div className="text-white/60 text-sm font-inter mb-1">À partir de</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-montserrat font-black text-white">119€</span>
                  <span className="text-2xl font-montserrat text-white/60">/heure</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: Video, text: '7 setups différents', color: 'text-orange-400' },
              { icon: Zap, text: 'Livraison 2h', color: 'text-blue-400' },
              { icon: Shield, text: 'Technicien inclus', color: 'text-emerald-400' },
              { icon: Clock, text: 'Dispo 7j/7', color: 'text-amber-400' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <benefit.icon className={`w-8 h-8 ${benefit.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <p className="text-white font-inter text-sm font-semibold">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <motion.a
              href="#setups"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-montserrat font-bold shadow-2xl">
                <span>Découvrir les setups</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold transition-all duration-300"
            >
              Réserver une visite
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/70 font-inter">
                <span className="text-green-400 font-semibold">Créneaux disponibles</span>
              </span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/70 font-inter">
              <Check className="w-4 h-4 text-amber-400" />
              <span>80+ productions réalisées</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/70 font-inter">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Réservation flexible</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/95 font-inter text-lg leading-relaxed mb-6">
                "Le studio est incroyable ! Matériel Sony FX3, éclairage parfait, et l'équipe technique gère tout. J'ai produit <span className="font-bold text-amber-400">12 vidéos en 3 mois</span> avec une qualité broadcast. Mes abonnés ont adoré le changement."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  LD
                </div>
                <div>
                  <p className="text-white font-inter font-bold">Laurent Dubois</p>
                  <p className="text-white/60 font-inter text-sm">YouTuber - 150k abonnés</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
    </section>
  );
}
