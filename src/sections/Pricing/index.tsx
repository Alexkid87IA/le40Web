import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Zap, Sparkles, Building2, Users, Video, Crown, Target, Award, Gem } from 'lucide-react';
import { pricingData } from '../../data/mockData';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'domiciliation' | 'coworking' | 'studio'>('domiciliation');

  const tabs = [
    { id: 'domiciliation', label: 'Domiciliation', icon: Building2, color: 'text-domiciliation' },
    { id: 'coworking', label: 'Coworking', icon: Users, color: 'text-coworking' },
    { id: 'studio', label: 'Studio', icon: Video, color: 'text-studios' }
  ];

  return (
    <section id="pricing" className="min-h-screen bg-gradient-to-br from-black-deep via-black-nuanced to-black-deep relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pricing" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pricing)" />
        </svg>
      </div>

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain"></div>

      <div className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge "Acte 6" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-violet-400"></div>
                <span className="text-sm font-inter font-medium text-violet-400 tracking-[0.3em] uppercase">ACTE 6</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-violet-400 to-transparent"></div>
              </div>
            </motion.div>

            {/* Titre principal avec animation mot par mot */}
            <div className="mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-hero font-montserrat font-black text-white leading-none tracking-tight"
              >
                {['NOS', 'TARIFS'].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                    className={`inline-block mr-6 ${word === 'TARIFS' ? 'gradient-text' : ''}`}
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-body-large font-inter text-white/70 max-w-4xl mx-auto leading-relaxed"
            >
              Des éclats de formules premium adaptées à tous les profils d'entrepreneurs visionnaires
            </motion.p>
          </motion.div>

          {/* Tab Navigation avec design "Fragments" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <div className="glass-effect border border-white/10 rounded-4xl p-3 flex flex-wrap gap-2">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'domiciliation' | 'coworking' | 'studio')}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-4 rounded-3xl font-montserrat font-semibold transition-all duration-500 flex items-center space-x-3 relative overflow-hidden ${
                    activeTab === tab.id
                      ? 'bg-gradient-primary text-white shadow-lg glow-effect'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] animate-[slideIn_0.5s_ease-out_forwards]"></div>
                  )}
                  <div className="relative flex items-center space-x-3">
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
                    <span className="tracking-wide">{tab.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Pricing Cards avec design "Fragments" */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`grid gap-8 mb-20 ${
              activeTab === 'domiciliation' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {pricingData[activeTab].map((plan, index) => {
              const isPopular = plan.title.toLowerCase().includes('premium') || 
                               plan.title.toLowerCase().includes('résident') ||
                               plan.title.toLowerCase().includes('créateur');
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -12, scale: 1.03, zIndex: 10 }}
                  className={`group cursor-pointer h-full relative ${
                    isPopular ? 'lg:scale-105 lg:-mt-6' : ''
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-montserrat font-semibold flex items-center glow-effect z-10">
                      <Crown className="w-4 h-4 mr-2" />
                      <span className="tracking-wide">POPULAIRE</span>
                    </div>
                  )}

                  <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-700 h-full relative">
                    {/* Background Image avec Ken Burns */}
                    <div className="absolute inset-0">
                      <img
                        src={`https://images.pexels.com/photos/${3184400 + index * 15}/pexels-photo-${3184400 + index * 15}.jpeg?auto=compress&cs=tinysrgb&w=600`}
                        alt={plan.title}
                        className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Overlays gradients stratégiques */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black-deep/95 via-black-nuanced/60 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black-deep/80 via-transparent to-black-nuanced/60"></div>
                    </div>

                    {/* Numérotation massive */}
                    <div className="absolute top-8 left-8 z-20">
                      <span 
                        className="font-playfair font-bold text-violet-400 opacity-80 group-hover:text-fuchsia-300 transition-colors duration-500"
                        style={{ 
                          fontSize: 'clamp(3rem, 6vw, 4rem)',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                          WebkitTextStroke: '1px rgba(139, 92, 246, 0.3)'
                        }}
                      >
                        {plan.id.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Badge prix */}
                    <div className="absolute top-8 right-8 glass-effect border border-white/20 rounded-full px-4 py-2">
                      <span className="gradient-text font-montserrat font-bold text-sm tracking-wide">
                        {plan.price}
                      </span>
                    </div>

                    {/* Icône flottante selon le type */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 transition-all duration-500 z-20">
                      <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 glow-effect">
                        {isPopular && <Crown className="w-10 h-10 text-white" />}
                        {!isPopular && <Gem className="w-10 h-10 text-white" />}
                      </div>
                    </div>

                    {/* Zone de contenu (bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                      <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                        {plan.title}
                      </h3>
                      
                      {/* Ligne décorative */}
                      <div className="w-16 h-1 bg-gradient-primary rounded-full mb-4 group-hover:w-24 transition-all duration-500"></div>
                      
                      <p className="text-white/80 font-inter leading-relaxed line-clamp-2 group-hover:text-white transition-colors duration-500 mb-6">
                        {plan.description}
                      </p>

                      {/* Features preview */}
                      <div className="space-y-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {plan.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-white/80">
                            <Check className="w-4 h-4 text-community mr-3 flex-shrink-0" />
                            <span className="font-inter text-sm">{feature}</span>
                          </div>
                        ))}
                        {plan.features.length > 3 && (
                          <div className="text-sm text-violet-400 font-inter">
                            +{plan.features.length - 3} autres avantages
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full font-montserrat font-semibold py-4 rounded-2xl transition-all duration-500 flex items-center justify-center relative overflow-hidden ${
                          isPopular
                            ? 'bg-gradient-primary text-white hover:bg-gradient-primary-hover glow-effect'
                            : 'glass-effect text-white border border-white/20 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative flex items-center">
                          <Zap className="w-5 h-5 mr-2" />
                          <span className="tracking-wide">Choisir cette formule</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </motion.button>
                    </div>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-violet-400/50 rounded-4xl transition-all duration-700"></div>
                    <div className="absolute inset-0 shadow-none group-hover:shadow-2xl group-hover:shadow-violet-400/25 rounded-4xl transition-all duration-700"></div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Features Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {[
              { icon: Target, title: "Flexibilité", desc: "Changement de formule à tout moment", color: "from-blue-400 to-blue-600" },
              { icon: Award, title: "Qualité Premium", desc: "Services haut de gamme inclus", color: "from-green-400 to-green-600" },
              { icon: Sparkles, title: "Sans Engagement", desc: "Résiliation simple et rapide", color: "from-purple-400 to-purple-600" },
              { icon: Crown, title: "Support Dédié", desc: "Accompagnement personnalisé", color: "from-orange-400 to-orange-600" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 font-inter text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center"
          >
            <div className="glass-effect border border-white/10 rounded-4xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
              <div className="relative">
                <Sparkles className="w-12 h-12 text-violet-400 mx-auto mb-6" />
                <h3 className="text-3xl font-montserrat font-bold text-white mb-6">
                  Besoin d'une formule sur-mesure ?
                </h3>
                <p className="text-white/70 font-inter mb-8 max-w-3xl mx-auto leading-relaxed text-lg">
                  Contactez-nous pour créer une offre personnalisée qui correspond parfaitement à vos besoins spécifiques et à votre vision entrepreneuriale.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center px-10 py-5 bg-gradient-primary text-white font-montserrat font-semibold text-lg rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 relative overflow-hidden glow-effect"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="relative flex items-center">
                      <Crown className="w-6 h-6 mr-3" />
                      <span className="tracking-wide">Demander un devis</span>
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="/offres"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center px-10 py-5 glass-effect text-white font-montserrat font-semibold text-lg rounded-2xl border border-violet-400/30 hover:bg-violet-400/10 hover:border-violet-400 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="relative flex items-center">
                      <span className="tracking-wide">Voir toutes les offres</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}