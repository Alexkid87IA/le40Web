import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Monitor, Video, ArrowRight, CheckCircle, Star, Award, Zap, ChevronLeft, ChevronRight, Sparkles, Building2, Shield } from 'lucide-react';

const spaceCategories = [
  {
    id: 'coworking',
    title: 'Espaces Coworking',
    subtitle: 'Bureaux flexibles et communauté',
    tagline: 'Votre écosystème créatif',
    icon: Users,
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    accentColor: '#06B6D4',
    spaces: [
      {
        name: 'Open Space',
        capacity: '120+ postes',
        price: 299,
        priceLabel: '€/mois',
        features: ['Bureaux flexibles', 'Écrans disponibles', 'Casiers sécurisés', 'Wifi 1Gb/s'],
        highlight: 'L\'énergie collective',
        icon: Users,
        popular: true
      },
      {
        name: 'Terrasse',
        capacity: 'Espace partagé',
        price: 0,
        priceLabel: 'Inclus',
        features: ['Vue dégagée', 'Mobilier confort', 'Espace détente', 'Accès membres'],
        highlight: 'Travaillez en plein air',
        icon: Sparkles
      }
    ]
  },
  {
    id: 'bureaux',
    title: 'Bureaux Privés',
    subtitle: 'Espaces dédiés pour équipes',
    tagline: 'Votre QG professionnel',
    icon: Building2,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentColor: '#10B981',
    spaces: [
      {
        name: 'Bureaux Privés',
        capacity: '2-20 personnes',
        price: 699,
        priceLabel: '€/mois',
        features: ['Mobilier premium', 'Ligne téléphonique', 'Stockage privé', 'Personnalisable'],
        highlight: 'Votre espace dédié',
        icon: Award,
        featured: true
      },
      {
        name: 'Parking Privé',
        capacity: 'Sécurisé 24/7',
        price: 150,
        priceLabel: '€/mois',
        features: ['Accès sécurisé', 'Places réservées', 'Vidéosurveillance', 'Accès badge'],
        highlight: 'Stationnement garanti',
        icon: Shield
      }
    ]
  },
  {
    id: 'meeting',
    title: 'Salles de Réunion',
    subtitle: 'Espaces équipés tout compris',
    tagline: 'Où les idées prennent forme',
    icon: Monitor,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    accentColor: '#f59e0b',
    spaces: [
      {
        name: 'Salle Conférence',
        capacity: 'Jusqu\'à 50 personnes',
        price: 150,
        priceLabel: '€/heure',
        features: ['Écran géant 85"', 'Système audio pro', 'Streaming HD', 'Visioconférence'],
        highlight: 'Grandes présentations',
        icon: Monitor,
        featured: true
      },
      {
        name: 'Salles de Réunion',
        capacity: '2-50 personnes',
        price: 50,
        priceLabel: '€/heure',
        features: ['Écrans connectés', 'Tableau blanc', 'Visioconférence', 'Configurations flexibles'],
        highlight: 'Pour tous vos besoins',
        icon: Users,
        popular: true
      }
    ]
  },
  {
    id: 'studio',
    title: 'Studios Créatifs',
    subtitle: 'Production professionnelle',
    tagline: 'Créez du contenu exceptionnel',
    icon: Video,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    accentColor: '#a855f7',
    spaces: [
      {
        name: 'Studio Créatif',
        capacity: '5-15 personnes',
        price: 80,
        priceLabel: '€/heure',
        features: ['Matériel photo/vidéo', 'Éclairage pro', 'Fond modulable', 'Équipement audio'],
        highlight: 'Qualité broadcast',
        icon: Video,
        popular: true
      },
      {
        name: 'Studios de Tournage',
        capacity: '20-200m²',
        price: 120,
        priceLabel: '€/heure',
        features: ['4 studios disponibles', 'Équipement complet', 'Fonds verts', 'Régie intégrée'],
        highlight: 'Production cinéma',
        icon: Monitor,
        featured: true
      }
    ]
  }
];

export default function SpacesSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const currentCategory = spaceCategories[activeCategory];
  const CategoryIcon = currentCategory.icon;

  const nextCategory = () => {
    setActiveCategory((prev) => (prev + 1) % spaceCategories.length);
    setExpandedCard(null);
  };

  const prevCategory = () => {
    setActiveCategory((prev) => (prev - 1 + spaceCategories.length) % spaceCategories.length);
    setExpandedCard(null);
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-white/70 font-medium">Nos Espaces Premium</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            Des Espaces Pour{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient}`}>
              Chaque Ambition
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Du coworking flexible aux studios pro. Tout l'équipement, zéro compromis.
          </motion.p>
        </div>

        {/* Category Navigation */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevCategory}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="flex gap-3">
            {spaceCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === index;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(index);
                    setExpandedCard(null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-500 ${
                    isActive
                      ? 'text-white shadow-2xl'
                      : 'text-white/40 bg-white/5 hover:bg-white/10'
                  }`}
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${category.accentColor}20, ${category.accentColor}10)` : undefined,
                    borderWidth: 2,
                    borderColor: isActive ? category.accentColor : 'transparent'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="hidden md:inline">{category.title}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${category.accentColor}15, transparent)`,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextCategory}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Category Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Hero */}
            <div className="mb-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${currentCategory.gradient} mb-6`}
              >
                <CategoryIcon className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-4xl font-black text-white mb-3">
                {currentCategory.subtitle}
              </h3>
              <p className="text-xl text-white/50 italic">
                "{currentCategory.tagline}"
              </p>
            </div>

            {/* Space Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {currentCategory.spaces.map((space, index) => {
                const isExpanded = expandedCard === index;
                const SpaceIcon = space.icon;

                return (
                  <motion.div
                    key={space.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                    className="relative"
                  >
                    <motion.div
                      onClick={() => setExpandedCard(isExpanded ? null : index)}
                      whileHover={{ y: -8 }}
                      className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer h-full"
                      style={{
                        borderColor: isExpanded ? currentCategory.accentColor : undefined,
                        boxShadow: isExpanded ? `0 0 40px ${currentCategory.accentColor}40` : undefined
                      }}
                    >
                      {/* Badges */}
                      <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                        {space.popular && (
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            POPULAIRE
                          </span>
                        )}
                        {space.featured && (
                          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            PREMIUM
                          </span>
                        )}
                      </div>

                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${currentCategory.gradient} mb-6`}
                      >
                        <SpaceIcon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Content */}
                      <h4 className="text-2xl font-black text-white mb-2">
                        {space.name}
                      </h4>

                      <p className="text-white/50 italic text-sm mb-6">
                        "{space.highlight}"
                      </p>

                      {/* Capacity & Price */}
                      <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Users className="w-4 h-4" />
                          {space.capacity}
                        </div>
                        <div className={`font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient}`}>
                          {space.price > 0 ? space.price : 'Inclus'}
                          {space.price > 0 && (
                            <span className="text-xs text-white/40 ml-1">{space.priceLabel}</span>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <AnimatePresence>
                        {isExpanded ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 mb-6"
                          >
                            {space.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle
                                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                                  style={{ color: currentCategory.accentColor }}
                                />
                                <span className="text-white/80 text-sm">{feature}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/40 text-sm mb-6"
                          >
                            {space.features.length} caractéristiques • Cliquer pour détails
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-2xl bg-gradient-to-r ${currentCategory.gradient} text-white font-bold flex items-center justify-center gap-2 shadow-xl`}
                      >
                        <span>Réserver</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-lg shadow-2xl hover:shadow-white/20 transition-all"
              >
                <span>Voir Tous Les Espaces</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
