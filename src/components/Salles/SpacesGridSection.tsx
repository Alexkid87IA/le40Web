import { motion } from 'framer-motion';
import { Star, Plus, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Space } from '../../data/salles/spaces';

interface SpacesGridSectionProps {
  spaces: Space[];
  onSpaceClick: (space: Space) => void;
}

export default function SpacesGridSection({ spaces, onSpaceClick }: SpacesGridSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="spaces" className="relative py-32 bg-black">
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
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">ESPACES</span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            5 espaces modulables pour tous vos besoins professionnels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {spaces.slice(0, 3).map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredCard(space.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => onSpaceClick(space)}
              className="relative group cursor-pointer"
            >
              {space.popular && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-4 right-6 z-10"
                >
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    Plus demandée
                  </div>
                </motion.div>
              )}

              <motion.div
                animate={{
                  scale: hoveredCard === space.id ? 1.02 : 1,
                  y: hoveredCard === space.id ? -5 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-[400px] rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/5"
              >
                <motion.div
                  animate={{
                    scale: hoveredCard === space.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={space.images[0]}
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90`}></div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === space.id ? 0.3 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${space.gradient}`}
                ></motion.div>

                <motion.div
                  animate={{
                    y: hoveredCard === space.id ? -5 : 0,
                    rotate: hoveredCard === space.id ? 10 : 0
                  }}
                  className="absolute top-6 right-6"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${space.gradient} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                    <space.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h3
                    animate={{
                      x: hoveredCard === space.id ? 5 : 0
                    }}
                    className="text-3xl font-montserrat font-bold text-white mb-2"
                  >
                    {space.title}
                  </motion.h3>
                  <p className="text-white/60 text-sm mb-8">{space.capacity}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl font-montserrat font-black text-white">
                        {space.price}€
                      </span>
                      <span className="text-white/40 text-sm ml-2">{space.priceUnit}</span>
                    </div>

                    <motion.div
                      animate={{
                        scale: hoveredCard === space.id ? 1.1 : 1,
                        rotate: hoveredCard === space.id ? 90 : 0
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20`}
                    >
                      <Plus className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: hoveredCard === space.id ? 1 : 0,
                    x: hoveredCard === space.id ? 100 : -100
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[850px] mx-auto">
          {spaces.slice(3).map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 3) * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredCard(space.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => onSpaceClick(space)}
              className="relative group cursor-pointer"
            >
              <motion.div
                animate={{
                  scale: hoveredCard === space.id ? 1.02 : 1,
                  y: hoveredCard === space.id ? -5 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-[400px] rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/5"
              >
                <motion.div
                  animate={{
                    scale: hoveredCard === space.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={space.images[0]}
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90`}></div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === space.id ? 0.3 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${space.gradient}`}
                ></motion.div>

                <motion.div
                  animate={{
                    y: hoveredCard === space.id ? -5 : 0,
                    rotate: hoveredCard === space.id ? 10 : 0
                  }}
                  className="absolute top-6 right-6"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${space.gradient} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                    <space.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h3
                    animate={{
                      x: hoveredCard === space.id ? 5 : 0
                    }}
                    className="text-3xl font-montserrat font-bold text-white mb-2"
                  >
                    {space.title}
                  </motion.h3>
                  <p className="text-white/60 text-sm mb-8">{space.capacity}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl font-montserrat font-black text-white">
                        {space.price}€
                      </span>
                      <span className="text-white/40 text-sm ml-2">{space.priceUnit}</span>
                    </div>

                    <motion.div
                      animate={{
                        scale: hoveredCard === space.id ? 1.1 : 1,
                        rotate: hoveredCard === space.id ? 90 : 0
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20`}
                    >
                      <Plus className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: hoveredCard === space.id ? 1 : 0,
                    x: hoveredCard === space.id ? 100 : -100
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
