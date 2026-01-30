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
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Effets lumineux (vidéo au niveau page) */}
      <div className="absolute inset-0 pointer-events-none">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-sm font-medium text-cyan-400 mb-6"
          >
            NOS FORMATS
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            CATÉGORIES{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              D'ÉVÉNEMENTS
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto font-inter">
            Explorez nos différentes catégories et trouvez les événements qui correspondent à vos objectifs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
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
                <div className="relative h-full w-full bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/30 rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col">

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div
                      className={`inline-flex p-3 md:p-4 rounded-xl bg-gradient-to-br ${category.colorGradient} mb-6 self-start`}
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>

                    <h3 className="text-lg md:text-xl font-montserrat font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-white/60 mb-4 leading-relaxed font-inter text-sm flex-1">
                      {category.description}
                    </p>

                    <motion.div
                      className="flex items-center gap-2 text-sm font-semibold mt-auto"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white/60 group-hover:text-white transition-colors duration-300 text-sm">
                        Explorer
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60 group-hover:text-white transition-all duration-300" />
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
