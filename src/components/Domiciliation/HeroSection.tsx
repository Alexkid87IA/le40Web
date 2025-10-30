import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Mail, Shield, MapPin, Zap, Check, Clock } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            ref={(video) => {
              if (video) {
                video.playbackRate = 0.7;
              }
            }}
          >
            <source
              src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761803178/f6ec245d-506e-49b7-a107-01e3b561a567_1_mrh0xu.mp4#t=0.1"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-[150px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
              <Shield className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-inter font-medium text-white/80 tracking-wide uppercase">Agréé Préfecture · Conformité Totale</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-montserrat font-black text-white mb-6 leading-tight"
          >
            DOMICILIATION{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400">
                MARSEILLE
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 blur-3xl -z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/70 font-inter max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Adresse professionnelle prestigieuse à Marseille 15e. Scan courrier en 2h, activation en 24h.
            <span className="text-white font-semibold"> Conformité légale garantie.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/90 font-inter text-sm font-semibold">4.9/5</span>
              <span className="text-white/50 text-xs">(120+ avis)</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/70 font-inter text-sm">
                <span className="text-green-400 font-semibold">120+ entreprises</span> nous font confiance
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16"
          >
            {[
              { value: '49€', suffix: '/mois', label: 'À partir de', color: 'from-orange-500 via-amber-600 to-orange-500' },
              { value: '24h', suffix: '', label: 'Activation', color: 'from-amber-500 via-orange-600 to-amber-500' },
              { value: '2h', suffix: '', label: 'Scan courrier', color: 'from-orange-600 via-amber-500 to-orange-600' },
              { value: '100%', suffix: '', label: 'Conformité', color: 'from-amber-600 via-orange-500 to-amber-600' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.color} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />

                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all duration-500">
                  <div className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-sm text-white/60 uppercase tracking-wider font-inter">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 text-white rounded-xl font-montserrat font-bold text-lg shadow-2xl">
                <span>Voir les forfaits</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold text-lg transition-all duration-300"
            >
              Nous contacter
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, text: 'Activation en 24h', color: 'text-orange-400' },
              { icon: Mail, text: 'Scan courrier 2h', color: 'text-blue-400' },
              { icon: Shield, text: 'Conformité totale', color: 'text-emerald-400' },
              { icon: MapPin, text: 'Marseille centre', color: 'text-amber-400' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <benefit.icon className={`w-8 h-8 ${benefit.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <p className="text-white font-inter text-sm font-semibold">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
