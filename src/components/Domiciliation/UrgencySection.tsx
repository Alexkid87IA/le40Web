import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Clock, Users, Zap, TrendingUp, CheckCircle } from 'lucide-react';

export default function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 32
  });

  const [recentSignups, setRecentSignups] = useState([
    { name: 'Sophie M.', plan: 'Business', time: '3 min' },
    { name: 'Marc D.', plan: 'Starter', time: '12 min' },
    { name: 'Julie R.', plan: 'Scale-Up', time: '28 min' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Overlay orange semi-transparent pour l'urgence */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 via-orange-500/80 to-red-600/80 pointer-events-none"></div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-white/10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-red-600/20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -80, 0],
            y: [0, -60, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 mb-6 md:mb-8"
          >
            <AlertCircle className="w-8 md:w-10 h-8 md:h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 font-montserrat leading-tight px-4">
            Nous limitons volontairement
            <br />
            nos domiciliations
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm md:text-base lg:text-lg text-white/95 mb-8 md:mb-12 max-w-2xl mx-auto font-inter leading-relaxed px-4"
          >
            Pourquoi ? Parce qu'on s'engage à scanner votre courrier en 2h,
            vous répondre en moins d'1h, et personnaliser l'accueil téléphonique.
            <br />
            <strong className="font-bold">Pour tenir cette promesse, on ne peut pas accepter tout le monde.</strong>
          </motion.p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 max-w-3xl mx-auto">
            {[
              { label: 'BUSINESS', count: 7, icon: Users, color: 'from-white/20 to-white/10' },
              { label: 'STARTER', count: 12, icon: Zap, color: 'from-white/15 to-white/5' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>

                <div className={`relative p-6 md:p-8 lg:p-10 bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/30 group-hover:border-white/50 transition-all duration-500 overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <item.icon className="w-5 h-5 text-white/90" />
                      <div className="text-xs md:text-sm font-bold text-white/90 font-montserrat tracking-wider">
                        {item.label}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-3 font-montserrat"
                    >
                      {item.count}
                    </motion.div>

                    <div className="text-white/90 font-inter font-medium text-sm md:text-base">
                      places restantes ce mois-ci
                    </div>

                    <motion.div
                      className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-white/10 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-12 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-5 md:w-6 h-5 md:h-6 text-white" />
              <span className="text-white font-montserrat font-bold text-sm md:text-base lg:text-lg">Offre limitée - Se termine dans:</span>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {[
                { value: timeLeft.hours, label: 'Heures' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Secondes' }
              ].map((item, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-6 border border-white/30">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-1 md:mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-white/90 font-inter text-xs md:text-sm font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl md:rounded-2xl p-4 md:p-6 max-w-md mx-auto mb-6 md:mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-white font-montserrat font-bold text-sm md:text-base">Inscriptions récentes</span>
              </div>
              <div className="space-y-3">
                {recentSignups.map((signup, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center justify-between bg-white/10 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-400" />
                      <div>
                        <div className="text-white font-inter font-semibold text-sm">{signup.name}</div>
                        <div className="text-white/70 text-xs">Formule {signup.plan}</div>
                      </div>
                    </div>
                    <div className="text-white/60 text-xs font-inter">Il y a {signup.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 bg-white text-orange-600 font-black text-base md:text-lg lg:text-xl rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 font-montserrat">Réserver ma place maintenant</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 md:w-6 h-5 md:h-6" />
              </motion.div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 text-white/90 font-inter text-xs md:text-sm"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="whitespace-nowrap">Activation sous 24h</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="whitespace-nowrap">Sans engagement</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="whitespace-nowrap">Satisfait ou remboursé</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
