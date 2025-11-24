import { motion } from 'framer-motion';
import { Flame, Users, TrendingUp, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-500/30 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <AlertCircle className="w-5 md:w-6 h-5 md:h-6 text-red-400" />
            <h3 className="text-lg md:text-xl font-montserrat font-black text-white">
              OFFRE SPÉCIALE - EXPIRE DANS:
            </h3>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[100px]">
              <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-black text-red-400">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-white/60 text-xs md:text-sm font-inter mt-1">Heures</div>
            </div>
            <div className="text-xl md:text-2xl lg:text-3xl font-black text-red-400">:</div>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[100px]">
              <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-black text-red-400">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-white/60 text-xs md:text-sm font-inter mt-1">Minutes</div>
            </div>
            <div className="text-xl md:text-2xl lg:text-3xl font-black text-red-400">:</div>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[100px]">
              <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-black text-red-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-white/60 text-xs md:text-sm font-inter mt-1">Secondes</div>
            </div>
          </div>

          <p className="text-sm md:text-base text-white/80 font-inter">
            <span className="font-bold text-emerald-400">1 mois offert</span> pour toute réservation avant la fin du compte à rebours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-950/30 to-red-950/30 border-2 border-orange-500/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 md:mb-8"
            >
              <Flame className="w-4 md:w-5 h-4 md:h-5 text-white" />
              <span className="text-sm md:text-base text-white font-montserrat font-bold">FORTE DEMANDE</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4 md:mb-6 px-4">
              Seulement <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">3 bureaux</span>
              <br />
              disponibles ce mois
            </h2>

            <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
              La demande pour nos bureaux privés est très forte. Les meilleurs emplacements partent en premier. <span className="text-orange-400 font-bold">Ne laissez pas passer votre chance.</span>
            </p>

            <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 md:p-6 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10"
              >
                <Users className="w-8 md:w-10 h-8 md:h-10 text-orange-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-black text-white mb-2">12</div>
                <div className="text-white/70 text-xs md:text-sm">Demandes cette semaine</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 md:p-6 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl border border-orange-500/30"
              >
                <TrendingUp className="w-8 md:w-10 h-8 md:h-10 text-orange-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-black text-orange-400 mb-2">3</div>
                <div className="text-white/70 text-xs md:text-sm">Bureaux restants</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 md:p-6 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10"
              >
                <Clock className="w-8 md:w-10 h-8 md:h-10 text-orange-400 mx-auto mb-3 md:mb-4" />
                <div className="text-2xl md:text-3xl font-black text-white mb-2">48h</div>
                <div className="text-white/70 text-xs md:text-sm">Délai moyen de location</div>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-montserrat font-bold flex items-center gap-2 md:gap-3 text-sm md:text-base"
                >
                  Réserver ma visite maintenant
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </div>

            <p className="text-white/60 text-xs md:text-sm mt-4 md:mt-6 px-4">
              ⏱️ Les bureaux disponibles sont réservés en moyenne en 48h
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-3 md:gap-6 px-6 md:px-8 py-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-white/70 text-xs md:text-sm">Dernières réservations :</div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-black"></div>
              ))}
            </div>
            <div className="text-white/70 text-xs md:text-sm">
              <span className="text-emerald-400 font-bold">+5 entreprises</span> cette semaine
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
