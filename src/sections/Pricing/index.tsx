import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Building2, Users, Video, Sparkles, Crown, Shield, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { pricingData } from '../../data/mockData';

const categories = [
  {
    id: 'domiciliation',
    title: 'Domiciliation',
    subtitle: 'Adresse de prestige',
    icon: Building2,
    gradient: 'from-amber-600 via-orange-600 to-red-600',
    shadowColor: '#f59e0b',
  },
  {
    id: 'coworking',
    title: 'Coworking',
    subtitle: 'Espaces collaboratifs',
    icon: Users,
    gradient: 'from-violet-600 via-purple-600 to-indigo-600',
    shadowColor: '#8b5cf6',
  },
  {
    id: 'studio',
    title: 'Studio',
    subtitle: 'Production audiovisuelle',
    icon: Video,
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    shadowColor: '#3b82f6',
  }
];

const globalFeatures = [
  { icon: Shield, title: 'Sans Engagement', desc: 'Flexibilité maximale', gradient: 'from-emerald-500 to-green-500' },
  { icon: TrendingUp, title: 'Évolutif', desc: 'Changez à tout moment', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Sparkles, title: 'Premium', desc: 'Services haut de gamme', gradient: 'from-purple-500 to-pink-500' },
  { icon: Crown, title: 'Support Dédié', desc: 'Équipe à votre écoute', gradient: 'from-orange-500 to-amber-500' }
];

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState<'domiciliation' | 'coworking' | 'studio'>('domiciliation');
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const currentCategory = categories.find(cat => cat.id === activeCategory)!;
  const currentPlans = pricingData[activeCategory];

  return (
    <section id="pricing" className="relative min-h-screen bg-[#0A0A0A] py-32 overflow-hidden">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

        {/* Subtle mesh pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      {/* Dynamic ambient light orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[120px]"
              style={{ backgroundColor: currentCategory.shadowColor, opacity: 0.08 }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px]"
              style={{ backgroundColor: currentCategory.shadowColor, opacity: 0.06 }}
              animate={{
                scale: [1, 1.15, 1],
                x: [0, -50, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? currentCategory.shadowColor : i % 3 === 1 ? '#ec4899' : '#3b82f6',
              boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.7, 0],
              scale: [0, Math.random() * 1.5 + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center mb-12"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Acte 4 - Nos Tarifs
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
          >
            ESPACES
            <motion.span
              className={`block text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient}`}
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              PREMIUM
            </motion.span>
          </motion.h2>

          {/* Refined accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-24 origin-center mb-8"
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <motion.div
              className="absolute top-0 left-0 h-[1px] w-6 bg-white/60"
              animate={{ x: [0, 72, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            Des formules pensées pour accompagner votre croissance à chaque étape
          </motion.p>
        </motion.div>

        {/* Category Navigation */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10">
            <div className="grid grid-cols-3 gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id as 'domiciliation' | 'coworking' | 'studio')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative rounded-2xl p-6 transition-all duration-500 ${
                      isActive ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-20 rounded-2xl`}
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}

                    <div className="relative flex flex-col items-center gap-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center ${
                        isActive ? 'scale-110' : 'scale-100 opacity-70'
                      } transition-all duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-montserrat font-bold text-lg ${
                          isActive ? 'text-white' : 'text-white/60'
                        } transition-colors duration-300`}>
                          {category.title}
                        </h3>
                        <p className={`text-sm font-inter mt-1 ${
                          isActive ? 'text-white/70' : 'text-white/40'
                        } transition-colors duration-300`}>
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-6 mb-20 ${
              activeCategory === 'domiciliation'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {currentPlans.map((plan, index) => {
              const isPopular = plan.title.toLowerCase().includes('premium') ||
                               plan.title.toLowerCase().includes('résident') ||
                               plan.title.toLowerCase().includes('créateur');

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className="group relative"
                >
                  {isPopular && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className={`px-4 py-2 bg-gradient-to-r ${currentCategory.gradient} rounded-full flex items-center gap-2`}>
                        <Crown className="w-4 h-4 text-white" />
                        <span className="text-white font-montserrat font-bold text-sm uppercase tracking-wide">
                          Populaire
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <div className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 h-full ${
                    hoveredPlan === plan.id
                      ? 'border-white/30 bg-white/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}>
                    {/* Hover gradient overlay */}
                    {hoveredPlan === plan.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`absolute inset-0 bg-gradient-to-br ${currentCategory.gradient} opacity-5 rounded-3xl`}
                      />
                    )}

                    <div className="relative">
                      {/* Plan ID Badge */}
                      <div className="mb-6">
                        <span
                          className={`font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient} opacity-60`}
                          style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {plan.id.toString().padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                        {plan.title}
                      </h3>

                      {/* Price */}
                      <div className={`inline-block px-6 py-2 bg-gradient-to-r ${currentCategory.gradient} rounded-full mb-4`}>
                        <span className="text-white font-montserrat font-bold text-xl">
                          {plan.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-white/60 font-playfair italic text-base mb-6 leading-relaxed">
                        "{plan.description}"
                      </p>

                      {/* Decorative line */}
                      <div className={`h-[1px] w-16 bg-gradient-to-r ${currentCategory.gradient} rounded-full mb-6 group-hover:w-24 transition-all duration-500`}></div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i + 0.3 }}
                            className="flex items-start gap-3"
                          >
                            <motion.div
                              className="mt-1"
                              animate={{
                                scale: hoveredPlan === plan.id ? [1, 1.2, 1] : 1,
                              }}
                              transition={{
                                duration: 0.5,
                                delay: i * 0.1
                              }}
                            >
                              <Check className="w-5 h-5 text-emerald-400" />
                            </motion.div>
                            <span className="text-white/80 font-inter text-sm leading-relaxed">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full font-montserrat font-semibold py-4 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden ${
                          isPopular
                            ? `bg-gradient-to-r ${currentCategory.gradient} text-white`
                            : 'bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        {isPopular && (
                          <motion.div
                            className="absolute inset-0 bg-white/10"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                        <div className="relative flex items-center gap-3">
                          <Zap className="w-5 h-5" />
                          <span className="tracking-wide">Choisir</span>
                          <motion.div
                            animate={{ x: hoveredPlan === plan.id ? [0, 3, 0] : 0 }}
                            transition={{ duration: 0.5, repeat: hoveredPlan === plan.id ? Infinity : 0 }}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Global Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-montserrat font-bold text-white/80 text-center mb-12">
            Inclus dans toutes nos formules
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {globalFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group text-center"
                >
                  <div className="relative inline-block mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    />
                    <div className={`relative w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h4 className="text-lg font-montserrat font-semibold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-white/60 font-inter">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Custom Offer Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.gradient} opacity-5`}></div>

            <div className="relative text-center">
              {/* Icon */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block mb-8"
              >
                <Sparkles className={`w-16 h-16 text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient}`} style={{ filter: `drop-shadow(0 0 20px ${currentCategory.shadowColor}40)` }} />
              </motion.div>

              <h3 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-6">
                Besoin d'une formule sur-mesure ?
              </h3>

              <p className="text-xl font-inter font-light text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                Contactez-nous pour créer une offre personnalisée qui correspond parfaitement à vos besoins et ambitions
              </p>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Primary CTA */}
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${currentCategory.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`}></div>
                  <div className="relative bg-white text-black rounded-2xl px-10 py-5 overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${currentCategory.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    <div className="relative flex items-center gap-3">
                      <Crown className="w-5 h-5" />
                      <span className="font-montserrat font-bold tracking-wide">
                        DEMANDER UN DEVIS
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.a>

                {/* Secondary CTA */}
                <motion.a
                  href="/offres"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <div className="relative bg-white/5 border border-white/20 rounded-2xl px-10 py-5 hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                    <span className="font-montserrat font-semibold text-white tracking-wide">
                      Voir toutes les offres
                    </span>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium film grain texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none z-20">
        <svg width="100%" height="100%">
          <filter id="sophisticatedNoisePricing">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sophisticatedNoisePricing)" />
        </svg>
      </div>
    </section>
  );
}
