import { motion } from 'framer-motion';
import { Users, GraduationCap, Mic2, Wrench, Wine, Award, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { eventCategories, EventCategory } from '../../data/events/categories';
import CategoryModal from './CategoryModal';

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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black">
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
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
          <svg width="100%" height="100%">
            <filter id="noiseCategories">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseCategories)" />
          </svg>
        </div>
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
    </section>

    <CategoryModal category={selectedCategory} onClose={() => setSelectedCategory(null)} />
    </>
  );
}
