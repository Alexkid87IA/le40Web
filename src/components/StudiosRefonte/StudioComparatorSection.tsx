import { motion } from 'framer-motion';
import { useState } from 'react';
import { studios } from '../../data/studios/studiosData';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';

interface ComparisonFeature {
  label: string;
  key: keyof typeof comparisonData[keyof typeof comparisonData];
  type: 'text' | 'boolean' | 'highlight';
}

const features: ComparisonFeature[] = [
  { label: 'Capacité', key: 'capacity', type: 'highlight' },
  { label: 'Prix/heure', key: 'price', type: 'highlight' },
  { label: 'Caméras professionnelles', key: 'cameras', type: 'text' },
  { label: 'Micros broadcast', key: 'audio', type: 'text' },
  { label: 'Éclairage cinéma', key: 'lighting', type: 'boolean' },
  { label: 'Technicien sur place', key: 'technician', type: 'boolean' },
  { label: 'Régie live intégrée', key: 'liveSwitch', type: 'boolean' },
  { label: 'Streaming multi-plateformes', key: 'streaming', type: 'boolean' },
  { label: 'Green screen', key: 'greenScreen', type: 'boolean' },
  { label: 'Décors modulables', key: 'modularDecor', type: 'boolean' },
  { label: 'Post-production disponible', key: 'postProd', type: 'boolean' },
  { label: 'Usage principal', key: 'usage', type: 'text' }
];

const comparisonData = {
  'face-cam': {
    capacity: '1 personne',
    price: '59€',
    cameras: '1 Sony FX3 4K',
    audio: '1 micro SM7B',
    lighting: true,
    technician: true,
    liveSwitch: false,
    streaming: false,
    greenScreen: true,
    modularDecor: true,
    postProd: true,
    usage: 'YouTube • Formation'
  },
  'podcast-audio': {
    capacity: '2-4 voix',
    price: '54€',
    cameras: 'Optionnelles',
    audio: '4 micros SM7B',
    lighting: true,
    technician: true,
    liveSwitch: false,
    streaming: false,
    greenScreen: false,
    modularDecor: true,
    postProd: true,
    usage: 'Podcast • Interview'
  },
  'stream': {
    capacity: '1-3 pers',
    price: '79€',
    cameras: '3 caméras + PTZ',
    audio: 'Broadcast + retour',
    lighting: true,
    technician: true,
    liveSwitch: true,
    streaming: true,
    greenScreen: true,
    modularDecor: true,
    postProd: true,
    usage: 'Twitch • YouTube Live'
  },
  'full-show': {
    capacity: '4-8 pers',
    price: '119€',
    cameras: '4-6 caméras',
    audio: '8 micros SM7B',
    lighting: true,
    technician: true,
    liveSwitch: true,
    streaming: true,
    greenScreen: false,
    modularDecor: true,
    postProd: true,
    usage: 'Émission • Talk-Show'
  },
  'intimiste': {
    capacity: '2-3 pers',
    price: '84€',
    cameras: '2 Sony FX3',
    audio: '3 micros SM7B',
    lighting: true,
    technician: true,
    liveSwitch: false,
    streaming: false,
    greenScreen: false,
    modularDecor: true,
    postProd: true,
    usage: 'Interview • Podcast vidéo'
  },
  'vertical-social': {
    capacity: '1-2 pers',
    price: '49€',
    cameras: '1 FX3 vertical',
    audio: 'Micro cravate',
    lighting: true,
    technician: true,
    liveSwitch: false,
    streaming: false,
    greenScreen: false,
    modularDecor: true,
    postProd: true,
    usage: 'TikTok • Reels • Shorts'
  }
};

export default function StudioComparatorSection() {
  const [hoveredStudio, setHoveredStudio] = useState<string | null>(null);

  const scrollToConfigurator = (studioId: string) => {
    const element = document.getElementById('configurator');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-fuchsia-400" />
            <span className="text-fuchsia-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Tableau comparatif
            </span>
          </div>
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
          className="overflow-x-auto pb-4"
        >
          <div className="min-w-[1400px]">
            <div className="bg-zinc-900/30 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

              <div className="grid grid-cols-7 border-b border-white/10">
                <div className="bg-zinc-950/80 p-8 flex items-end">
                  <span className="text-white/40 font-inter font-medium text-xs uppercase tracking-wider">
                    Caractéristiques
                  </span>
                </div>
                {studios.map((studio, index) => (
                  <motion.div
                    key={studio.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    onMouseEnter={() => setHoveredStudio(studio.id)}
                    onMouseLeave={() => setHoveredStudio(null)}
                    className={`relative bg-zinc-950/80 p-6 transition-all duration-300 ${
                      hoveredStudio === studio.id ? 'bg-zinc-900/80' : ''
                    }`}
                  >
                    {studio.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                          Le plus réservé
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col items-center gap-4">
                      <motion.div
                        animate={{
                          scale: hoveredStudio === studio.id ? 1.1 : 1,
                          rotate: hoveredStudio === studio.id ? 5 : 0
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <studio.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="text-center">
                        <h3 className="text-white font-montserrat font-bold text-sm mb-1">
                          {studio.name}
                        </h3>
                        <p className="text-white/50 text-xs font-inter">
                          {studio.subtitle.split('•')[0].trim()}
                        </p>
                      </div>
                    </div>

                    {hoveredStudio === studio.id && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${studio.gradient}`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {features.map((feature, featureIndex) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: featureIndex * 0.03, duration: 0.4 }}
                  className={`grid grid-cols-7 border-b border-white/5 hover:bg-white/5 transition-colors group ${
                    feature.type === 'highlight' ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="bg-zinc-950/80 p-6 flex items-center">
                    <span className={`font-inter text-sm ${
                      feature.type === 'highlight'
                        ? 'text-white font-semibold'
                        : 'text-white/80 font-medium'
                    }`}>
                      {feature.label}
                    </span>
                  </div>
                  {studios.map((studio) => {
                    const value = comparisonData[studio.id as keyof typeof comparisonData]?.[feature.key];
                    return (
                      <div
                        key={studio.id}
                        className={`bg-zinc-950/60 p-6 flex items-center justify-center transition-all ${
                          hoveredStudio === studio.id ? 'bg-zinc-900/60' : ''
                        }`}
                      >
                        {typeof value === 'boolean' ? (
                          value ? (
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center shadow-lg`}
                            >
                              <Check className="w-5 h-5 text-white" strokeWidth={3} />
                            </motion.div>
                          ) : (
                            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                              <X className="w-5 h-5 text-white/20" strokeWidth={2} />
                            </div>
                          )
                        ) : (
                          <span className={`font-inter text-center ${
                            feature.type === 'highlight'
                              ? 'text-white font-bold text-base'
                              : 'text-white/90 font-medium text-sm'
                          }`}>
                            {value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}

              <div className="grid grid-cols-7 bg-zinc-950/60">
                <div className="p-6"></div>
                {studios.map((studio, index) => (
                  <motion.div
                    key={studio.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="p-6 flex items-center justify-center"
                  >
                    <motion.button
                      onClick={() => scrollToConfigurator(studio.id)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full px-6 py-3.5 bg-gradient-to-r ${studio.gradient} text-white rounded-xl font-montserrat font-bold text-sm shadow-xl flex items-center justify-center gap-2 group relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <span className="relative">Configurer</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
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
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-6 text-white/50 text-sm font-inter">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-rose-500 to-fuchsia-500"></div>
              <span>Inclus dans toutes les formules</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-fuchsia-400" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-white/20" />
              <span>Non disponible</span>
            </div>
          </div>
          <p className="text-white/40 font-inter text-xs text-center">
            Tarifs de lancement HT • Limités aux 50 premières réservations • TVA 20% en sus
          </p>
        </motion.div>
      </div>
    </section>
  );
}
