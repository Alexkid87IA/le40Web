import { motion } from 'framer-motion';
import { Users, GraduationCap, Mic2, Wrench, Wine, Award, ArrowRight } from 'lucide-react';
import { eventCategories } from '../../data/events/categories';

const iconMap: Record<string, typeof Users> = {
  Users,
  GraduationCap,
  Mic2,
  Wrench,
  Wine,
  Award
};

interface CategoriesSectionProps {
  selectedCategory: string;
  onCategorySelect: (slug: string) => void;
}

export default function CategoriesSection({ selectedCategory, onCategorySelect }: CategoriesSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            Catégories{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              d'Événements
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-inter">
            Explorez nos différentes catégories et trouvez les événements qui correspondent à vos objectifs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventCategories.map((category, index) => {
            const Icon = iconMap[category.iconName] || Users;
            const isSelected = selectedCategory === category.slug;

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => onCategorySelect(category.slug)}
                className="group relative text-left"
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${category.colorGradient} rounded-3xl ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} blur-xl transition-all duration-500`} />

                <div className={`relative h-full bg-black/50 backdrop-blur-xl border ${isSelected ? 'border-white/30' : 'border-white/10 group-hover:border-white/20'} rounded-3xl p-8 transition-all duration-500`}>
                  <motion.div
                    animate={{ rotate: isSelected ? 360 : 0 }}
                    transition={{ duration: 0.8 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.colorGradient} mb-6 ${isSelected ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className={`text-2xl font-montserrat font-bold mb-3 ${isSelected ? 'text-white' : 'text-white/90 group-hover:text-white'} transition-colors duration-300`}>
                    {category.name}
                  </h3>

                  <p className="text-white/60 mb-6 leading-relaxed font-inter text-sm">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className={`${isSelected ? 'text-white' : 'text-white/40 group-hover:text-white/60'} transition-colors duration-300`}>
                      Explorer
                    </span>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'translate-x-1 text-white' : 'text-white/40 group-hover:translate-x-1 group-hover:text-white/60'} transition-all duration-300`} />
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.colorGradient}`} />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onCategorySelect('all')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white rounded-xl font-inter font-semibold transition-all duration-300"
            >
              Voir tous les événements
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
