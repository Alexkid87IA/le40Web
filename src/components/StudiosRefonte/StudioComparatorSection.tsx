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
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Sparkles className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-teal-400" />
            <span className="text-teal-400 font-montserrat font-medium text-xs md:text-sm tracking-wider uppercase">
              Tableau comparatif
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-black text-white mb-4 md:mb-6">
            COMPAREZ
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              NOS STUDIOS
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto px-4">
            Trouvez le studio parfait pour votre projet en un coup d'œil
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full overflow-x-auto"
        >
          <div className="min-w-[1200px] bg-zinc-900/50 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-[220px_repeat(6,1fr)] border-b border-white/20">
              <div className="bg-black/60 p-5 flex items-center border-r border-white/10">
                <span className="text-white/60 font-inter font-semibold text-sm uppercase tracking-wider">
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
                  className={`relative bg-black/40 p-4 transition-all duration-300 border-r border-white/10 last:border-r-0 ${
                    hoveredStudio === studio.id ? 'bg-black/60 scale-105' : ''
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      animate={{
                        scale: hoveredStudio === studio.id ? 1.15 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center shadow-xl`}
                    >
                      <studio.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-white font-montserrat font-bold text-sm mb-1 leading-tight">
                        {studio.name}
                      </h3>
                      <p className="text-white/70 text-xs font-inter leading-tight">
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
                className={`grid grid-cols-[220px_repeat(6,1fr)] border-b border-white/10 hover:bg-white/5 transition-colors ${
                  feature.type === 'highlight' ? 'bg-white/10' : ''
                }`}
              >
                <div className="bg-black/60 p-4 flex items-center border-r border-white/10">
                  <span className={`font-inter text-sm ${
                    feature.type === 'highlight'
                      ? 'text-white font-bold'
                      : 'text-white/90 font-medium'
                  }`}>
                    {feature.label}
                  </span>
                </div>
                {studios.map((studio) => {
                  const value = comparisonData[studio.id as keyof typeof comparisonData]?.[feature.key];
                  return (
                    <div
                      key={studio.id}
                      className={`bg-black/20 p-4 flex items-center justify-center transition-all border-r border-white/10 last:border-r-0 ${
                        hoveredStudio === studio.id ? 'bg-black/40' : ''
                      }`}
                    >
                      {typeof value === 'boolean' ? (
                        value ? (
                          <motion.div
                            whileHover={{ scale: 1.3, rotate: 15 }}
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center shadow-lg`}
                          >
                            <Check className="w-5 h-5 text-white" strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                            <X className="w-5 h-5 text-white/30" strokeWidth={2} />
                          </div>
                        )
                      ) : (
                        <span className={`font-inter text-center leading-tight ${
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

            <div className="grid grid-cols-[220px_repeat(6,1fr)] bg-black/40">
              <div className="p-4 border-r border-white/10"></div>
              {studios.map((studio, index) => (
                <motion.div
                  key={studio.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="p-4 flex items-center justify-center border-r border-white/10 last:border-r-0"
                >
                  <motion.button
                    onClick={() => scrollToConfigurator(studio.id)}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full px-4 py-3 bg-gradient-to-r ${studio.gradient} text-white rounded-xl font-montserrat font-bold text-sm shadow-xl flex items-center justify-center gap-2 group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative">Configurer</span>
                    <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-3 px-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-sm font-inter">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <span>Inclus</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-white/30" />
              <span>Non disponible</span>
            </div>
          </div>
          <p className="text-white/50 font-inter text-sm text-center">
            Tarifs de lancement HT • Limités aux 50 premières réservations • TVA 20% en sus
          </p>
        </motion.div>
      </div>
    </section>
  );
}
