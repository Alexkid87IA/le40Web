import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, Mic2, Wrench, Wine, Award, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { eventCategories, EventCategory } from '../../data/events/categories';

const iconMap: Record<string, typeof Users> = {
  Users,
  GraduationCap,
  Mic2,
  Wrench,
  Wine,
  Award
};

export default function CategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);

  return (
    <>
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: 'scaleY(-1)',
            filter: 'brightness(0.6)',
            playbackRate: 0.5
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.5;
            }
          }}
        >
          <source
            src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761792125/f6861355-bc98-4c72-b9bc-fb13a1abdfb7_i7v3kj.mp4#t=0.1"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-slate-950/30 to-black/40" />
        <motion.div
          className="absolute top-40 left-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            Catégories{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              d'Événements
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-inter">
            Explorez nos différentes catégories et trouvez les événements qui correspondent à vos objectifs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {eventCategories.map((category, index) => {
            const Icon = iconMap[category.iconName] || Users;

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setSelectedCategory(category)}
                className="group relative text-left flex"
              >
                <div className="relative h-full w-full bg-slate-950/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 rounded-3xl p-8 transition-all duration-500 flex flex-col">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.colorGradient.replace(/from-(\w+)-(\d+) to-(\w+)-(\d+)/, 'from-$1-$2/5 via-transparent to-$3-$4/5')} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 flex-1 flex flex-col">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.colorGradient} mb-6 self-start transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-montserrat font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-white/70 mb-6 leading-relaxed font-inter text-sm flex-1">
                      {category.description}
                    </p>

                    <motion.div
                      className="flex items-center gap-2 text-sm font-semibold mt-auto"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white/60 group-hover:text-white transition-colors duration-300">
                        Explorer
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white transition-all duration-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseCategories">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseCategories)" />
        </svg>
      </div>
    </section>

    <AnimatePresence>
      {selectedCategory && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCategory(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[900px] max-h-[80vh] z-[10000]"
          >
            <div className="relative bg-slate-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-12">
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedCategory.colorGradient} opacity-20`} />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative z-10"
                  >
                    <div className={`inline-flex p-12 rounded-3xl bg-gradient-to-br ${selectedCategory.colorGradient} shadow-2xl`}>
                      {(() => {
                        const Icon = iconMap[selectedCategory.iconName] || Users;
                        return <Icon className="w-32 h-32 text-white" />;
                      })()}
                    </div>
                  </motion.div>
                </div>

                <div className="md:w-1/2 p-12 overflow-y-auto max-h-[80vh]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className={`text-4xl font-montserrat font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r ${selectedCategory.colorGradient}`}>
                      {selectedCategory.name}
                    </h3>

                    <p className="text-white/80 text-lg leading-relaxed mb-8 font-inter">
                      {selectedCategory.description}
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-xl font-montserrat font-bold text-white mb-3">
                        Ce que vous allez découvrir
                      </h4>

                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedCategory.colorGradient} mt-2 flex-shrink-0`} />
                          <span className="text-white/70 font-inter">
                            Des événements organisés par des professionnels de votre secteur
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedCategory.colorGradient} mt-2 flex-shrink-0`} />
                          <span className="text-white/70 font-inter">
                            Un espace propice aux échanges et au networking
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedCategory.colorGradient} mt-2 flex-shrink-0`} />
                          <span className="text-white/70 font-inter">
                            Des opportunités de développement professionnel
                          </span>
                        </li>
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full mt-8 py-4 px-6 bg-gradient-to-r ${selectedCategory.colorGradient} text-white font-montserrat font-bold rounded-xl shadow-lg hover:shadow-xl transition-all`}
                    >
                      Voir les événements
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
