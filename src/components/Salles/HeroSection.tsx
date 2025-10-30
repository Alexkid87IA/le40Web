import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Star, Zap, Shield, Clock, Users, Building2, Calendar } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source
            src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761793838/9cc01971-7e57-46bd-8b62-2371cda76e82_h68lfm.mp4#t=0.1"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80"></div>
        <div className="absolute inset-0 opacity-[0.02]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 left-1/4 w-[800px] h-[800px] rounded-full bg-emerald-500/15 blur-[150px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full bg-teal-500/15 blur-[140px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[130px]"
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
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-inter text-sm font-bold">5 Espaces Premium</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white font-inter text-sm font-bold">4.9/5</span>
              <span className="text-white/50 text-xs font-medium">(500+ événements)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-400/30 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 font-inter text-sm font-bold">Équipement Premium</span>
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
                Salles de Réunion
                <br />
                <span className="relative inline-block mt-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
                    Haut de Gamme
                  </span>
                  <motion.div
                    className="absolute -inset-6 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 blur-3xl -z-10"
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-4 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"
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
              De la salle intime pour <span className="font-bold text-emerald-400">2 personnes</span> au
              rooftop panoramique pour <span className="font-bold text-cyan-400">300 m²</span>.
              Équipement professionnel, réservation flexible, disponible immédiatement.
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
                    className="text-7xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                  >
                    40€
                  </motion.span>
                  <div className="flex flex-col">
                    <span className="text-2xl font-montserrat text-white/70 font-bold">/heure</span>
                    <span className="text-xs text-white/50 font-inter">Selon la salle</span>
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
              { icon: Calendar, text: '5 salles uniques', subtext: 'Tous usages', color: 'from-emerald-500 to-teal-500', iconColor: 'text-emerald-400' },
              { icon: Zap, text: 'Réservation rapide', subtext: 'En ligne 24/7', color: 'from-cyan-500 to-teal-500', iconColor: 'text-cyan-400' },
              { icon: Shield, text: 'Équipement inclus', subtext: 'Tout est fourni', color: 'from-teal-500 to-emerald-500', iconColor: 'text-teal-400' },
              { icon: Clock, text: 'Flexibilité totale', subtext: 'Annulation 24h', color: 'from-emerald-500 to-cyan-500', iconColor: 'text-emerald-400' }
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
              href="#spaces"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur-xl group-hover:blur-2xl"
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-montserrat font-black text-lg shadow-2xl">
                <Building2 className="w-6 h-6" />
                <span>Découvrir nos espaces</span>
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
                <span className="text-green-400 font-bold">Disponible maintenant</span>
              </span>
            </div>
            <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="flex items-center gap-2.5 text-white/80 font-inter font-medium">
              <Users className="w-5 h-5 text-cyan-400" />
              <span><span className="font-bold text-white">500+</span> événements réussis</span>
            </div>
            <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="flex items-center gap-2.5 text-white/80 font-inter font-medium">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>Annulation flexible</span>
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
                className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-2xl transition-all duration-500"
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
                      <Star className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-white text-xl font-inter leading-relaxed mb-8">
                  "Les salles sont <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">exceptionnelles</span> !
                  Nous organisons tous nos séminaires au 40 maintenant. L'équipement est professionnel,
                  le service impeccable, et nos clients adorent la <span className="font-black text-emerald-400">terrasse panoramique</span>."
                </p>
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-xl">
                      MD
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-inter font-black text-lg">Marie Durand</p>
                    <p className="text-emerald-400 font-inter text-sm font-bold">CEO @ TechStartup</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none"
      />

    </section>
  );
}
