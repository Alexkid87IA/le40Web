import { motion } from 'framer-motion';
import { studios } from '../../data/studios/studiosData';
import { Check, X } from 'lucide-react';

export default function StudioComparatorSection() {
  const features = [
    'Capacité',
    'Prix/heure lancement',
    'Caméras',
    'Audio professionnel',
    'Éclairage cinéma',
    'Technicien inclus',
    'Streaming live',
    'Montage disponible',
    'Décors modulables',
    'Usage idéal'
  ];

  const studioFeatures: Record<string, Record<string, any>> = {
    'face-cam': {
      'Capacité': '1 personne',
      'Prix/heure lancement': '59€',
      'Caméras': '1 Sony FX3 4K',
      'Audio professionnel': true,
      'Éclairage cinéma': true,
      'Technicien inclus': true,
      'Streaming live': false,
      'Montage disponible': true,
      'Décors modulables': true,
      'Usage idéal': 'YouTube, Formation'
    },
    'podcast-audio': {
      'Capacité': '2-4 voix',
      'Prix/heure lancement': '54€',
      'Caméras': 'Optionnelles',
      'Audio professionnel': true,
      'Éclairage cinéma': true,
      'Technicien inclus': true,
      'Streaming live': false,
      'Montage disponible': true,
      'Décors modulables': true,
      'Usage idéal': 'Podcast, Interview'
    },
    'stream': {
      'Capacité': '1-3 pers',
      'Prix/heure lancement': '79€',
      'Caméras': '3 caméras',
      'Audio professionnel': true,
      'Éclairage cinéma': true,
      'Technicien inclus': true,
      'Streaming live': true,
      'Montage disponible': true,
      'Décors modulables': true,
      'Usage idéal': 'Twitch, YouTube Live'
    },
    'full-show': {
      'Capacité': '4-8 pers',
      'Prix/heure lancement': '119€',
      'Caméras': '6 caméras',
      'Audio professionnel': true,
      'Éclairage cinéma': true,
      'Technicien inclus': true,
      'Streaming live': true,
      'Montage disponible': true,
      'Décors modulables': true,
      'Usage idéal': 'Émission, Talk-Show'
    },
    'intimiste': {
      'Capacité': '2-3 pers',
      'Prix/heure lancement': '84€',
      'Caméras': '2 Sony FX3',
      'Audio professionnel': true,
      'Éclairage cinéma': true,
      'Technicien inclus': true,
      'Streaming live': false,
      'Montage disponible': true,
      'Décors modulables': true,
      'Usage idéal': 'Interview, Podcast vidéo'
    },
    'vertical-social': {
      'Capacité': '1-2 pers',
      'Prix/heure lancement': '49€',
      'Caméras': '1 FX3 vertical',
      'Audio professionnel': true,
      'Éclairage cinéma': true,
      'Technicien inclus': true,
      'Streaming live': false,
      'Montage disponible': true,
      'Décors modulables': true,
      'Usage idéal': 'TikTok, Reels'
    }
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px]"></div>
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
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400">
              NOS STUDIOS
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Trouvez le studio parfait pour votre projet en un coup d'œil
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[1200px]">
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-7 gap-px bg-white/5">
                <div className="bg-zinc-900 p-6">
                  <span className="text-white/60 font-inter font-medium text-sm uppercase tracking-wider">
                    Caractéristiques
                  </span>
                </div>
                {studios.map((studio, index) => (
                  <motion.div
                    key={studio.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-zinc-900 p-6 text-center"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center`}>
                      <studio.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-montserrat font-bold text-xs">
                      {studio.name}
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
                  className="grid grid-cols-7 gap-px bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="bg-zinc-900 p-6">
                    <span className="text-white font-inter font-medium text-sm">
                      {feature}
                    </span>
                  </div>
                  {studios.map((studio) => {
                    const value = studioFeatures[studio.id]?.[feature];
                    return (
                      <div key={studio.id} className="bg-zinc-900 p-6 flex items-center justify-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${studio.gradient} flex items-center justify-center`}>
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                              <X className="w-5 h-5 text-white/30" />
                            </div>
                          )
                        ) : (
                          <span className="text-white/90 font-inter text-xs font-medium text-center">
                            {value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}

              <div className="grid grid-cols-7 gap-px bg-white/5">
                <div className="bg-zinc-900 p-6"></div>
                {studios.map((studio) => (
                  <div key={studio.id} className="bg-zinc-900 p-6 flex items-center justify-center">
                    <motion.a
                      href="#configurator"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 bg-gradient-to-r ${studio.gradient} text-white rounded-xl font-inter font-medium text-sm shadow-lg`}
                    >
                      Choisir
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
            * Tous les tarifs s'entendent hors taxes. Tarifs de lancement limités aux 50 premières réservations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
