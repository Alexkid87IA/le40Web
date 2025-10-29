import { motion } from 'framer-motion';
import { spaces } from '../../data/salles/spaces';
import { Check, X } from 'lucide-react';

export default function SpaceComparatorSection() {
  const features = [
    'Capacité',
    'Prix par heure',
    'Équipement audiovisuel',
    'Wi-Fi Fibre',
    'Climatisation',
    'Tableau blanc',
    'Restauration disponible',
    'Modulable',
    'Vue extérieure',
    'Accessible PMR'
  ];

  const spaceFeatures = {
    'salle-focus': {
      'Capacité': '2-4 pers',
      'Prix par heure': '40€',
      'Équipement audiovisuel': true,
      'Wi-Fi Fibre': true,
      'Climatisation': true,
      'Tableau blanc': true,
      'Restauration disponible': false,
      'Modulable': false,
      'Vue extérieure': false,
      'Accessible PMR': true
    },
    'salle-creative': {
      'Capacité': '6-8 pers',
      'Prix par heure': '60€',
      'Équipement audiovisuel': true,
      'Wi-Fi Fibre': true,
      'Climatisation': true,
      'Tableau blanc': true,
      'Restauration disponible': true,
      'Modulable': true,
      'Vue extérieure': false,
      'Accessible PMR': true
    },
    'salle-conference': {
      'Capacité': 'Jusqu\'à 80',
      'Prix par heure': '80€',
      'Équipement audiovisuel': true,
      'Wi-Fi Fibre': true,
      'Climatisation': true,
      'Tableau blanc': true,
      'Restauration disponible': true,
      'Modulable': true,
      'Vue extérieure': false,
      'Accessible PMR': true
    },
    'terrasse-panoramique': {
      'Capacité': '300 m²',
      'Prix par heure': '200€',
      'Équipement audiovisuel': true,
      'Wi-Fi Fibre': true,
      'Climatisation': false,
      'Tableau blanc': false,
      'Restauration disponible': true,
      'Modulable': true,
      'Vue extérieure': true,
      'Accessible PMR': true
    },
    'lounge-cafe': {
      'Capacité': '60 m²',
      'Prix par heure': '50€',
      'Équipement audiovisuel': true,
      'Wi-Fi Fibre': true,
      'Climatisation': true,
      'Tableau blanc': false,
      'Restauration disponible': true,
      'Modulable': true,
      'Vue extérieure': false,
      'Accessible PMR': true
    }
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
            COMPAREZ
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              NOS ESPACES
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Trouvez l'espace parfait pour votre événement en un coup d'œil
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[1000px]">
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-6 gap-px bg-white/5">
                <div className="bg-zinc-900 p-6">
                  <span className="text-white/60 font-inter font-medium text-sm uppercase tracking-wider">
                    Caractéristiques
                  </span>
                </div>
                {spaces.map((space, index) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-zinc-900 p-6 text-center"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${space.gradient} flex items-center justify-center`}>
                      <space.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-montserrat font-bold text-sm">
                      {space.title}
                    </h3>
                  </motion.div>
                ))}
              </div>

              {features.map((feature, featureIndex) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: featureIndex * 0.05, duration: 0.4 }}
                  className="grid grid-cols-6 gap-px bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="bg-zinc-900 p-6">
                    <span className="text-white font-inter font-medium">
                      {feature}
                    </span>
                  </div>
                  {spaces.map((space) => {
                    const value = spaceFeatures[space.id as keyof typeof spaceFeatures][feature as keyof typeof spaceFeatures['salle-focus']];
                    return (
                      <div key={space.id} className="bg-zinc-900 p-6 flex items-center justify-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${space.gradient} flex items-center justify-center`}>
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                              <X className="w-5 h-5 text-white/30" />
                            </div>
                          )
                        ) : (
                          <span className="text-white/90 font-inter text-sm font-medium">
                            {value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}

              <div className="grid grid-cols-6 gap-px bg-white/5">
                <div className="bg-zinc-900 p-6"></div>
                {spaces.map((space, index) => (
                  <div key={space.id} className="bg-zinc-900 p-6 flex items-center justify-center">
                    <motion.a
                      href="#spaces"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 bg-gradient-to-r ${space.gradient} text-white rounded-xl font-inter font-medium text-sm shadow-lg`}
                    >
                      Réserver
                    </motion.a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 font-inter text-sm">
            * Tous les tarifs s'entendent hors taxes. Services additionnels disponibles sur demande.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
