import { motion } from 'framer-motion';
import { ArrowRight, Check, Phone } from 'lucide-react';

export default function HeroSectionV2() {
  const scrollToConfigurator = () => {
    const configurator = document.getElementById('configurator');
    if (configurator) {
      configurator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-slate-950 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[90vh] py-12 lg:py-0">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <span className="text-orange-400 text-sm font-medium">
                🎬 Nouveau à Marseille | Ouverture Spéciale
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Créez du Contenu Pro
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                  Sans le Prix Pro
                </span>
              </h1>

              <h2 className="text-xl sm:text-2xl text-slate-300 max-w-2xl">
                Studio équipé Sony FX3 4K + technicien expert
                <br />
                Location flexible dès <span className="text-white font-bold">59€/h</span>
              </h2>
            </div>

            <div className="space-y-3">
              {[
                'Matériel pro complet fourni (15K€ d\'équipement)',
                'Rendu 48h garanti ou remboursé',
                '-30% sur toute réservation avant le 31 janvier'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-slate-200">{benefit}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
              <p className="text-orange-300 font-medium flex items-center gap-2">
                <span className="text-xl">⚡</span>
                Offre Découverte : Seulement 15 places/mois disponibles
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={scrollToConfigurator}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2"
              >
                Voir les Studios & Prix
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <a
                href="tel:04XXXXXXXX"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                04 XX XX XX XX
              </a>
            </div>

            <p className="text-slate-400 text-sm">
              Simulation gratuite • Sans engagement
            </p>

            <div className="pt-6 border-t border-white/10">
              <p className="text-slate-400 text-sm mb-3">
                Déjà utilisé par des créateurs YouTube avec +500K abonnés
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">OM</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Origines Media</p>
                    <p className="text-slate-400 text-xs">580K abonnés</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-pink-600/20 z-10" />
            <img
              src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Studio professionnel"
              className="w-full h-full object-cover"
            />

            <div className="absolute top-6 right-6 z-20">
              <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <p className="text-white font-bold text-2xl">-30%</p>
                <p className="text-slate-300 text-xs">Offre Découverte</p>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">15K€</p>
                    <p className="text-xs text-slate-300">Équipement</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">48h</p>
                    <p className="text-xs text-slate-300">Livraison</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">100%</p>
                    <p className="text-xs text-slate-300">Satisfait</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
