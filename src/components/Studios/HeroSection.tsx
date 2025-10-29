import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Video, Star, Zap, Shield, Clock, Play, TrendingUp, Users, Award } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-950 to-purple-950/20"></div>
        <div className="absolute inset-0 opacity-[0.02]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 left-1/4 w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-[150px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full bg-cyan-500/15 blur-[140px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[130px]"
          animate={{
            x: [0, -60, 0],
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.18, 0.12]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 w-full"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 backdrop-blur-xl shadow-lg shadow-emerald-500/10">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-inter text-sm font-bold">Équipement Sony Pro</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                ))}
              </div>
              <span className="text-white font-inter text-sm font-bold">5.0/5</span>
              <span className="text-white/50 text-xs font-medium">(80+ productions)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-400/30 backdrop-blur-xl shadow-lg shadow-purple-500/10">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-inter text-sm font-bold">+120% qualité contenu</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative inline-block mb-8"
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-montserrat font-black text-white leading-none">
                Studio Vidéo
                <br />
                <span className="relative inline-block mt-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                    Nouvelle Génération
                  </span>
                  <motion.div
                    className="absolute -inset-6 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-3xl -z-10"
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-4 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl text-white/80 font-inter max-w-4xl mx-auto mb-10 leading-relaxed"
            >
              <span className="font-bold text-cyan-400">8 studios équipés Sony FX3</span>, technicien expert inclus,
              livraison des rushs en 2h. Du podcast au plateau TV, créez du contenu professionnel sans investir dans le matériel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="inline-flex items-baseline gap-4 mb-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl px-10 py-6 shadow-2xl"
            >
              <div className="text-left">
                <div className="text-white/60 text-sm font-inter mb-1.5 font-medium">À partir de</div>
                <div className="flex items-baseline gap-3">
                  <motion.span
                    className="text-7xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                  >
                    119€
                  </motion.span>
                  <div className="flex flex-col">
                    <span className="text-2xl font-montserrat text-white/70 font-bold">/heure</span>
                    <span className="text-xs text-white/50 font-inter">Technicien inclus</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
          >
            {[
              { icon: Video, text: '8 setups différents', subtext: 'Tous usages', color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-400' },
              { icon: Zap, text: 'Livraison 2h', subtext: 'Rushs prêts', color: 'from-cyan-500 to-teal-500', iconColor: 'text-cyan-400' },
              { icon: Shield, text: 'Technicien inclus', subtext: 'Expert sur place', color: 'from-purple-500 to-violet-500', iconColor: 'text-purple-400' },
              { icon: Clock, text: 'Dispo 7j/7', subtext: 'Résa flexible', color: 'from-violet-500 to-purple-500', iconColor: 'text-violet-400' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 text-center transition-all duration-500 h-full">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className={`w-10 h-10 ${benefit.iconColor} mx-auto mb-4`} />
                  </motion.div>
                  <p className="text-white font-inter text-base font-bold mb-1">{benefit.text}</p>
                  <p className="text-white/50 font-inter text-sm font-medium">{benefit.subtext}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12"
          >
            <motion.a
              href="#setups"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-xl group-hover:blur-2xl"
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-montserrat font-black text-lg shadow-2xl">
                <Play className="w-6 h-6 fill-white" />
                <span>Découvrir les 8 Studios</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-2xl border-2 border-white/30 hover:border-white/50 text-white rounded-xl font-montserrat font-bold text-lg transition-all duration-300 shadow-xl"
            >
              Réserver une visite
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm mb-12"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/50"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/80 font-inter font-medium">
                <span className="text-green-400 font-bold">Créneaux disponibles</span>
              </span>
            </div>
            <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="flex items-center gap-2.5 text-white/80 font-inter font-medium">
              <Users className="w-5 h-5 text-cyan-400" />
              <span><span className="font-bold text-white">80+</span> productions réalisées</span>
            </div>
            <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="flex items-center gap-2.5 text-white/80 font-inter font-medium">
              <Check className="w-5 h-5 text-purple-400" />
              <span>Sans engagement</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-2xl transition-all duration-500"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-3xl border-2 border-white/20 rounded-3xl p-10 shadow-2xl">
                <div className="flex items-center gap-2 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
                    >
                      <Star className="w-6 h-6 text-cyan-400 fill-cyan-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-white text-xl font-inter leading-relaxed mb-8">
                  "Les studios sont <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">exceptionnels</span> !
                  Matériel Sony FX3, éclairage cinéma, et l'équipe technique est au top.
                  J'ai produit <span className="font-black text-cyan-400">12 vidéos en 3 mois</span> avec une qualité broadcast incroyable.
                  Mes abonnés ont adoré le changement de niveau."
                </p>
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-xl shadow-xl">
                      LD
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-inter font-black text-lg">Laurent Dubois</p>
                    <p className="text-cyan-400 font-inter text-sm font-bold">YouTuber - 150k abonnés</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-slate-950/50 to-transparent pointer-events-none"
      />
    </section>
  );
}
