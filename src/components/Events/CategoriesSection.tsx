import { motion } from 'framer-motion';
import { Users, GraduationCap, Mic2, Wrench, Wine, Award, ArrowRight, Sparkles } from 'lucide-react';
import { eventCategories } from '../../data/events/categories';

const iconMap: Record<string, typeof Users> = {
  Users,
  GraduationCap,
  Mic2,
  Wrench,
  Wine,
  Award,
  Sparkles
};

interface CategoriesSectionProps {
  selectedCategory: string;
  onCategorySelect: (slug: string) => void;
}

export default function CategoriesSection({ selectedCategory, onCategorySelect }: CategoriesSectionProps) {
  const handleCategoryClick = (slug: string) => {
    onCategorySelect(slug);
    setTimeout(() => {
      const eventsSection = document.getElementById('upcoming-events');
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
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
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => handleCategoryClick('all')}
            className="group relative text-left flex"
          >
            <div className={`relative h-full w-full bg-slate-950/50 backdrop-blur-xl border ${selectedCategory === 'all' ? 'border-white/20' : 'border-white/10 group-hover:border-white/20'} rounded-3xl p-8 transition-all duration-500 flex flex-col`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-amber-500/5 rounded-3xl ${selectedCategory === 'all' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500`} />

              <div className="relative z-10 flex-1 flex flex-col">
                <motion.div
                  animate={{
                    rotate: selectedCategory === 'all' ? 360 : 0,
                    scale: selectedCategory === 'all' ? 1.05 : 1
                  }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-amber-500 mb-6 self-start transition-transform duration-300 shadow-lg"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className={`text-2xl font-montserrat font-bold mb-3 transition-all duration-500 ${selectedCategory === 'all' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-amber-500'}`}>
                  Tous les événements
                </h3>

                <p className="text-white/70 mb-6 leading-relaxed font-inter text-sm flex-1">
                  Découvrez l'ensemble de notre programmation événementielle
                </p>

                <motion.div
                  className="flex items-center gap-2 text-sm font-semibold mt-auto"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={`${selectedCategory === 'all' ? 'text-white' : 'text-white/60 group-hover:text-white'} transition-colors duration-300`}>
                    Explorer
                  </span>
                  <ArrowRight className={`w-4 h-4 ${selectedCategory === 'all' ? 'text-white' : 'text-white/60 group-hover:text-white'} transition-all duration-300`} />
                </motion.div>
              </div>

              {selectedCategory === 'all' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-4 right-4 z-20"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 shadow-lg" />
                </motion.div>
              )}
            </div>
          </motion.button>

          {eventCategories.map((category, index) => {
            const Icon = iconMap[category.iconName] || Users;
            const isSelected = selectedCategory === category.slug;

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1, duration: 0.6 }}
                onClick={() => handleCategoryClick(category.slug)}
                className="group relative text-left flex"
              >
                <div className={`relative h-full w-full bg-slate-950/50 backdrop-blur-xl border ${isSelected ? 'border-white/20' : 'border-white/10 group-hover:border-white/20'} rounded-3xl p-8 transition-all duration-500 flex flex-col`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.colorGradient.replace(/from-(\w+)-(\d+) to-(\w+)-(\d+)/, 'from-$1-$2/5 via-transparent to-$3-$4/5')} rounded-3xl ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500`} />

                  <div className="relative z-10 flex-1 flex flex-col">
                    <motion.div
                      animate={{
                        rotate: isSelected ? 360 : 0,
                        scale: isSelected ? 1.05 : 1
                      }}
                      transition={{ duration: 0.8 }}
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.colorGradient} mb-6 self-start transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className={`text-2xl font-montserrat font-bold mb-3 transition-all duration-500 ${isSelected ? 'text-transparent bg-clip-text bg-gradient-to-r ' + category.colorGradient : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:' + category.colorGradient}`}>
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
                      <span className={`${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'} transition-colors duration-300`}>
                        Explorer
                      </span>
                      <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'} transition-all duration-300`} />
                    </motion.div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-4 right-4 z-20"
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.colorGradient} shadow-lg`} />
                    </motion.div>
                  )}
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
  );
}
