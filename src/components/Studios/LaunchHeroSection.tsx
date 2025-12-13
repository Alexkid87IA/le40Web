import { motion } from 'framer-motion';
import { Check, ArrowDown, Flame } from 'lucide-react';
import { buttons, typography } from '../../utils/designSystem';
import { useState, useEffect } from 'react';

const studioImages = [
  'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/3784324/pexels-photo-3784324.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1600'
];

const equipmentBadges = [
  'Sony FX3 4K',
  'Shure SM7B',
  'Fibre 1Gb/s'
];

export default function LaunchHeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % studioImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToConfigurator = () => {
    const configurator = document.getElementById('configurator');
    if (configurator) {
      configurator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-orange-400 font-montserrat tracking-wide">
                OFFRE DÉCOUVERTE | Premiers clients -40%
              </span>
            </motion.div>

            <div className="space-y-4">
              <h1 className={`${typography.h1.full} text-white`}>
                Votre Studio Pro
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  à Marseille
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-white/90 font-montserrat">
                Du Live Twitch à l'Émission TV
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-lg sm:text-xl text-white/80 font-inter">
                Équipement broadcast 120k€ • Technicien inclus • Rushs livrés immédiatement
              </p>
              <p className="text-2xl font-bold text-white">
                Dès{' '}
                <span className="text-orange-400">59€/heure</span>{' '}
                <span className="text-white/60 line-through text-xl">au lieu de 99€</span>
                <span className="text-sm text-orange-400 ml-2">(premiers 50 créneaux)</span>
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Check, text: 'Setup en 5 min', subtext: 'Arrivez, on gère tout' },
                { icon: Check, text: 'Annulation gratuite', subtext: 'Jusqu\'à 7 jours avant' },
                { icon: Check, text: 'Parking inclus', subtext: '6 places réservées' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{item.text}</p>
                    <p className="text-xs text-white/60">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToConfigurator}
                className={`${buttons.primary.full} text-lg px-12 py-6`}
              >
                RÉSERVER -40% MAINTENANT
              </button>
              <button
                onClick={scrollToConfigurator}
                className={`${buttons.secondary.full} text-lg px-8 py-6 group`}
              >
                Voir les Setups
                <ArrowDown className="inline-block ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-2 pt-4"
            >
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold">14 créneaux disponibles cette semaine</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-2xl">⭐</span>
                <span className="text-sm">Studio utilisé par Origines Media (2M+ abonnés)</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[700px]"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              {studioImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentImage === index ? 1 : 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <img
                    src={image}
                    alt={`Studio ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              ))}

              <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-3">
                {equipmentBadges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.2 }}
                    className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20"
                  >
                    <span className="text-sm font-semibold text-white">{badge}</span>
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-2">
                {studioImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImage === index
                        ? 'w-8 bg-orange-400'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={scrollToConfigurator}
          className="text-white/60 hover:text-white transition-colors"
        >
          <ArrowDown className="w-8 h-8" />
        </button>
      </motion.div>
    </section>
  );
}
