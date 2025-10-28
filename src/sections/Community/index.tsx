import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Rocket, ArrowRight, Sparkles, Star, Zap, Trophy, Target, TrendingUp } from 'lucide-react';

const communityPillars = [
  {
    id: 'network',
    title: 'Réseau',
    subtitle: 'Networking Premium',
    icon: Users,
    stat: '200+',
    statLabel: 'Membres actifs',
    description: 'Connectez-vous avec des entrepreneurs ambitieux, créateurs et leaders d\'opinion',
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    accentColor: '#06B6D4',
    benefits: [
      { icon: Target, text: 'Speed networking mensuel exclusif', highlight: 'Mensuels' },
      { icon: Users, text: 'Annuaire membres avec profils détaillés', highlight: 'Détaillés' },
      { icon: Trophy, text: 'Groupes par secteur d\'activité', highlight: 'Secteurs' },
      { icon: Sparkles, text: 'Mentorat personnalisé avec experts', highlight: 'Experts' }
    ]
  },
  {
    id: 'events',
    title: 'Événements',
    subtitle: 'Inspiration Continue',
    icon: Calendar,
    stat: '50+',
    statLabel: 'Par an',
    description: 'Ateliers, conférences et masterclass pour développer vos compétences',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    accentColor: '#f59e0b',
    benefits: [
      { icon: Sparkles, text: 'Conférences d\'experts reconnus', highlight: 'Experts' },
      { icon: Target, text: 'Ateliers pratiques hebdomadaires', highlight: 'Pratiques' },
      { icon: TrendingUp, text: 'Afterworks thématiques networking', highlight: 'Networking' },
      { icon: Trophy, text: 'Masterclass exclusives membres', highlight: 'Exclusives' }
    ]
  },
  {
    id: 'growth',
    title: 'Croissance',
    subtitle: 'Opportunités Business',
    icon: Rocket,
    stat: '85%',
    statLabel: 'Collaborations',
    description: 'Des opportunités concrètes pour développer votre activité rapidement',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentColor: '#10B981',
    benefits: [
      { icon: Target, text: 'Mise en relation business qualifiée', highlight: 'Qualifiée' },
      { icon: Trophy, text: 'Appels d\'offres partagés entre membres', highlight: 'Partagés' },
      { icon: Rocket, text: 'Projets collaboratifs inter-membres', highlight: 'Collaboratifs' },
      { icon: Zap, text: 'Accès direct aux investisseurs', highlight: 'Direct' }
    ]
  }
];

const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO TechStart",
    company: "SaaS B2B",
    content: "J'ai trouvé mon CTO et levé 2M€ en 18 mois. Le réseau du 40 est exceptionnel.",
    avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    metric: "2M€ levés"
  },
  {
    name: "Thomas Dubois",
    role: "Consultant",
    company: "Finance & Stratégie",
    content: "Plus de 60% de mes clients viennent du réseau. C'est un vrai game changer.",
    avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    metric: "60% clients"
  },
  {
    name: "Marie Chen",
    role: "Designer",
    company: "Product Design",
    content: "Les événements m'ont permis de rencontrer mes meilleurs partenaires business.",
    avatar: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    metric: "10+ projets"
  }
];

const stats = [
  { value: '200+', label: 'Membres actifs', icon: Users },
  { value: '50+', label: 'Événements/an', icon: Calendar },
  { value: '85%', label: 'Taux collaboration', icon: Trophy },
  { value: '24/7', label: 'Accès communauté', icon: Zap }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);

  const currentPillar = communityPillars[activeTab];
  const PillarIcon = currentPillar.icon;

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/70 font-medium">Communauté Exclusive</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            Rejoignez{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentPillar.gradient}`}>
              L'Élite
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Un réseau d'entrepreneurs visionnaires • Opportunités illimitées • Croissance exponentielle
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all"
              >
                <Icon className="w-10 h-10 text-cyan-400 mb-4" />
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3 mb-16">
          {communityPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isActive = activeTab === index;

            return (
              <motion.button
                key={pillar.id}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-500 ${
                  isActive ? 'text-white' : 'text-white/40 bg-white/5 hover:bg-white/10'
                }`}
                style={{
                  background: isActive ? `linear-gradient(135deg, ${pillar.accentColor}20, ${pillar.accentColor}10)` : undefined,
                  borderWidth: 2,
                  borderColor: isActive ? pillar.accentColor : 'transparent'
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-bold">{pillar.title}</div>
                    <div className="text-xs opacity-70">{pillar.subtitle}</div>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeCommunityTab"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${pillar.accentColor}15, transparent)`,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPillar.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${currentPillar.gradient} mb-6`}
              >
                <PillarIcon className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-4xl font-black text-white mb-3">
                {currentPillar.subtitle}
              </h3>
              <p className="text-xl text-white/50 italic max-w-2xl mx-auto">
                {currentPillar.description}
              </p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-4 mt-8 bg-white/5 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/10"
              >
                <div className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${currentPillar.gradient}`}>
                  {currentPillar.stat}
                </div>
                <div className="text-left">
                  <div className="text-white/60 text-sm">{currentPillar.statLabel}</div>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {currentPillar.benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all"
                    style={{
                      borderColor: `${currentPillar.accentColor}20`
                    }}
                  >
                    <div className="flex items-start gap-6">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${currentPillar.gradient} flex items-center justify-center`}
                      >
                        <BenefitIcon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-white/80 text-lg leading-relaxed">
                          {benefit.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-black text-white text-center mb-10">
                Success Stories
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    onMouseEnter={() => setHoveredTestimonial(index)}
                    onMouseLeave={() => setHoveredTestimonial(null)}
                    whileHover={{ y: -8 }}
                    className="relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all"
                    style={{
                      borderColor: hoveredTestimonial === index ? currentPillar.accentColor : undefined,
                      boxShadow: hoveredTestimonial === index ? `0 0 40px ${currentPillar.accentColor}40` : undefined
                    }}
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-white/80 text-base leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2"
                        style={{ borderColor: currentPillar.accentColor }}
                      />
                      <div>
                        <div className="font-bold text-white">{testimonial.name}</div>
                        <div className="text-white/60 text-sm">{testimonial.role}</div>
                        <div className="text-white/40 text-xs">{testimonial.company}</div>
                      </div>
                    </div>

                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                      style={{ background: `${currentPillar.accentColor}20` }}
                    >
                      <Trophy className="w-4 h-4" style={{ color: currentPillar.accentColor }} />
                      <span>{testimonial.metric}</span>
                    </div>

                    {hoveredTestimonial === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${currentPillar.accentColor}10, transparent)`,
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl rounded-3xl p-16 border border-white/10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="inline-block mb-8"
                >
                  <Sparkles className="w-20 h-20 text-white/60" />
                </motion.div>

                <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Prêt à Accélérer Votre Succès ?
                </h3>

                <p className="text-xl text-white/60 mb-10 max-w-3xl mx-auto">
                  Rejoignez une communauté où chaque connexion est une opportunité.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative px-10 py-5 rounded-2xl bg-gradient-to-r ${currentPillar.gradient} text-white font-black text-lg shadow-2xl overflow-hidden`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="relative flex items-center gap-3">
                      <Users className="w-6 h-6" />
                      <span>Devenir Membre</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-2xl bg-white/10 backdrop-blur-xl text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-all"
                  >
                    Visiter Le 40
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
