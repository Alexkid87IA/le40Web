import { motion } from 'framer-motion';
import { Star, Plus, Monitor, Presentation, Projector, Sun, Coffee } from 'lucide-react';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

// Interface flexible qui accepte les deux types de données
interface SpaceItem {
  id: string;
  title: string;
  capacity: string;
  images: string[];
  price?: number;
  priceUnit?: string;
  gradient?: string;
  icon?: LucideIcon;
  popular?: boolean;
  variants?: Array<{
    id: string;
    title: string;
    price: number;
  }>;
}

interface SpacesGridSectionProps {
  spaces: SpaceItem[];
  onSpaceClick: (space: SpaceItem) => void;
}

// Icônes par défaut basées sur l'index
const defaultIcons: LucideIcon[] = [Monitor, Presentation, Projector, Sun, Coffee];

// Gradients par défaut
const defaultGradients = [
  'from-cyan-600 to-teal-600',
  'from-emerald-600 to-teal-600',
  'from-violet-600 to-purple-600',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500'
];

export default function SpacesGridSection({ spaces, onSpaceClick }: SpacesGridSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Fonction pour obtenir le prix affiché
  const getDisplayPrice = (space: SpaceItem): string => {
    if (space.price !== undefined) {
      return `${space.price}`;
    }
    if (space.variants && space.variants.length > 0) {
      return `${space.variants[0].price}`;
    }
    return 'Sur devis';
  };

  // Fonction pour obtenir l'unité de prix
  const getPriceUnit = (space: SpaceItem): string => {
    if (space.priceUnit) {
      return space.priceUnit;
    }
    if (space.variants && space.variants.length > 0) {
      return '/heure';
    }
    return '';
  };

  return (
    <section id="spaces" className="relative py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 left-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-montserrat font-black text-white mb-4 md:mb-6 px-4">
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">ESPACES</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto px-4">
            {spaces.length} espaces modulables pour tous vos besoins professionnels
          </p>
        </motion.div>

        {/* Première rangée - 3 cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {spaces.slice(0, 3).map((space, index) => {
            const IconComponent = space.icon || defaultIcons[index % defaultIcons.length];
            const gradient = space.gradient || defaultGradients[index % defaultGradients.length];
            const displayPrice = getDisplayPrice(space);
            const priceUnit = getPriceUnit(space);

            return (
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
                  {/* Image de fond */}
                  <motion.div
                    animate={{
                      scale: hoveredCard === space.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    {space.images && space.images[0] ? (
                      <img
                        src={space.images[0]}
                        alt={space.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${gradient}`}></div>
                    )}
                  </motion.div>

                  {/* Overlay sombre */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                  {/* Overlay coloré au hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === space.id ? 0.3 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                  ></motion.div>

                  {/* Icône en haut à droite */}
                  <motion.div
                    animate={{
                      y: hoveredCard === space.id ? -5 : 0,
                      rotate: hoveredCard === space.id ? 10 : 0
                    }}
                    className="absolute top-6 right-6"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Contenu en bas */}
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
                          {displayPrice}€
                        </span>
                        <span className="text-white/40 text-sm ml-2">{priceUnit}</span>
                      </div>

                      <motion.div
                        animate={{
                          scale: hoveredCard === space.id ? 1.1 : 1,
                          rotate: hoveredCard === space.id ? 90 : 0
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                      >
                        <Plus className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Effet de lumière au hover */}
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
            );
          })}
        </div>

        {/* Deuxième rangée - 2 cartes centrées */}
        {spaces.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[850px] mx-auto">
            {spaces.slice(3).map((space, index) => {
              const realIndex = index + 3;
              const IconComponent = space.icon || defaultIcons[realIndex % defaultIcons.length];
              const gradient = space.gradient || defaultGradients[realIndex % defaultGradients.length];
              const displayPrice = getDisplayPrice(space);
              const priceUnit = getPriceUnit(space);

              return (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: realIndex * 0.1, duration: 0.6 }}
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
                    {/* Image de fond */}
                    <motion.div
                      animate={{
                        scale: hoveredCard === space.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      {space.images && space.images[0] ? (
                        <img
                          src={space.images[0]}
                          alt={space.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${gradient}`}></div>
                      )}
                    </motion.div>

                    {/* Overlay sombre */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                    {/* Overlay coloré au hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === space.id ? 0.3 : 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                    ></motion.div>

                    {/* Icône en haut à droite */}
                    <motion.div
                      animate={{
                        y: hoveredCard === space.id ? -5 : 0,
                        rotate: hoveredCard === space.id ? 10 : 0
                      }}
                      className="absolute top-6 right-6"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Contenu en bas */}
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
                            {displayPrice}€
                          </span>
                          <span className="text-white/40 text-sm ml-2">{priceUnit}</span>
                        </div>

                        <motion.div
                          animate={{
                            scale: hoveredCard === space.id ? 1.1 : 1,
                            rotate: hoveredCard === space.id ? 90 : 0
                          }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                        >
                          <Plus className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Effet de lumière au hover */}
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}