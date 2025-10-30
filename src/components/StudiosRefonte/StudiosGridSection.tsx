import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { useState } from 'react';
import { Studio } from '../../data/studios/studiosData';

interface StudiosGridSectionProps {
  studios: Studio[];
  onStudioSelect: (studio: Studio) => void;
  selectedStudioId: string | null;
}

export default function StudiosGridSection({ studios, onStudioSelect, selectedStudioId }: StudiosGridSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="studios" className="relative py-32 bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 left-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
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
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400">STUDIOS</span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            6 configurations professionnelles pour tous vos projets audiovisuels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {studios.slice(0, 3).map((studio, index) => (
            <motion.div
              key={studio.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredCard(studio.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => onStudioSelect(studio)}
              className="relative group cursor-pointer"
            >
              {studio.popular && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-4 right-6 z-10"
                >
                  <div className="bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    {studio.badge}
                  </div>
                </motion.div>
              )}

              {studio.badge && !studio.popular && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-4 right-6 z-10"
                >
                  <div className="bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                    {studio.badge}
                  </div>
                </motion.div>
              )}

              <motion.div
                animate={{
                  scale: hoveredCard === studio.id ? 1.02 : 1,
                  y: hoveredCard === studio.id ? -5 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-[400px] rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border-2 ${
                  selectedStudioId === studio.id ? 'border-fuchsia-500' : 'border-white/5'
                }`}
              >
                <motion.div
                  animate={{
                    scale: hoveredCard === studio.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === studio.id ? 0.3 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${studio.gradient}`}
                ></motion.div>

                <motion.div
                  animate={{
                    y: hoveredCard === studio.id ? -5 : 0,
                    rotate: hoveredCard === studio.id ? 10 : 0
                  }}
                  className="absolute top-6 right-6"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${studio.gradient} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                    <studio.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h3
                    animate={{
                      x: hoveredCard === studio.id ? 5 : 0
                    }}
                    className="text-3xl font-montserrat font-bold text-white mb-2"
                  >
                    {studio.name}
                  </motion.h3>
                  <p className="text-white/60 text-sm mb-4">{studio.subtitle}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-montserrat font-black text-white">
                          {studio.launchPrice}€
                        </span>
                        <span className="text-white/40 text-sm">{studio.priceUnit}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/40 text-sm line-through">{studio.basePrice}€</span>
                        <span className="text-rose-400 text-xs font-bold">-{studio.savings}€</span>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        scale: hoveredCard === studio.id ? 1.1 : 1,
                        rotate: hoveredCard === studio.id ? 90 : 0
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                    >
                      <Plus className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: hoveredCard === studio.id ? 1 : 0,
                    x: hoveredCard === studio.id ? 100 : -100
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {studios.slice(3).map((studio, index) => (
            <motion.div
              key={studio.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 3) * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredCard(studio.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => onStudioSelect(studio)}
              className="relative group cursor-pointer"
            >
              {studio.badge && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-4 right-6 z-10"
                >
                  <div className="bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                    {studio.badge}
                  </div>
                </motion.div>
              )}

              <motion.div
                animate={{
                  scale: hoveredCard === studio.id ? 1.02 : 1,
                  y: hoveredCard === studio.id ? -5 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-[400px] rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border-2 ${
                  selectedStudioId === studio.id ? 'border-fuchsia-500' : 'border-white/5'
                }`}
              >
                <motion.div
                  animate={{
                    scale: hoveredCard === studio.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === studio.id ? 0.3 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${studio.gradient}`}
                ></motion.div>

                <motion.div
                  animate={{
                    y: hoveredCard === studio.id ? -5 : 0,
                    rotate: hoveredCard === studio.id ? 10 : 0
                  }}
                  className="absolute top-6 right-6"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${studio.gradient} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                    <studio.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h3
                    animate={{
                      x: hoveredCard === studio.id ? 5 : 0
                    }}
                    className="text-3xl font-montserrat font-bold text-white mb-2"
                  >
                    {studio.name}
                  </motion.h3>
                  <p className="text-white/60 text-sm mb-4">{studio.subtitle}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-montserrat font-black text-white">
                          {studio.launchPrice}€
                        </span>
                        <span className="text-white/40 text-sm">{studio.priceUnit}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/40 text-sm line-through">{studio.basePrice}€</span>
                        <span className="text-rose-400 text-xs font-bold">-{studio.savings}€</span>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        scale: hoveredCard === studio.id ? 1.1 : 1,
                        rotate: hoveredCard === studio.id ? 90 : 0
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                    >
                      <Plus className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: hoveredCard === studio.id ? 1 : 0,
                    x: hoveredCard === studio.id ? 100 : -100
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
