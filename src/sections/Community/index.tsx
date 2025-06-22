import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Coffee, Calendar, ArrowRight, Heart, Sparkles, Trophy, MessageCircle, Lightbulb, Rocket, Star, TrendingUp } from 'lucide-react';

const communityPillars = [
  {
    id: 'network',
    title: 'Réseau & Networking',
    icon: Users,
    stat: '200+',
    statLabel: 'Membres actifs',
    description: 'Un écosystème d\'entrepreneurs ambitieux qui partagent la même vision du succès',
    features: [
      'Speed networking mensuel',
      'Annuaire membres exclusif',
      'Groupes par secteur d\'activité',
      'Mentorat personnalisé'
    ],
    gradient: 'from-violet-600 to-purple-600',
    image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'events',
    title: 'Événements & Formation',
    icon: Calendar,
    stat: '50+',
    statLabel: 'Événements/an',
    description: 'Des rendez-vous inspirants pour apprendre, partager et grandir ensemble',
    features: [
      'Conférences d\'experts',
      'Ateliers pratiques',
      'Afterworks thématiques',
      'Masterclass exclusives'
    ],
    gradient: 'from-emerald-600 to-teal-600',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'growth',
    title: 'Croissance & Opportunités',
    icon: Rocket,
    stat: '85%',
    statLabel: 'Collaborations réussies',
    description: 'Transformez les rencontres en opportunités concrètes de développement',
    features: [
      'Mise en relation business',
      'Appels d\'offres partagés',
      'Projets collaboratifs',
      'Accès investisseurs'
    ],
    gradient: 'from-pink-600 to-rose-600',
    image: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO, TechStart",
    content: "Le 40 m'a permis de rencontrer mon CTO actuel. Notre startup a levé 2M€ en 18 mois.",
    avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5
  },
  {
    name: "Thomas Dubois",
    role: "Consultant Finance",
    content: "Plus qu'un espace de travail, c'est un véritable accélérateur de business.",
    avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5
  },
  {
    name: "Marie Chen",
    role: "Designer Freelance",
    content: "J'ai trouvé 80% de mes clients actuels grâce au réseau du 40. Game changer!",
    avatar: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5
  }
];

const upcomingEvents = [
  {
    date: "28 Nov",
    title: "Masterclass IA & Business",
    type: "Formation",
    spots: "12 places restantes"
  },
  {
    date: "05 Déc",
    title: "Investor Day Marseille",
    type: "Networking",
    spots: "Sur invitation"
  },
  {
    date: "12 Déc",
    title: "Afterwork de Noël",
    type: "Communauté",
    spots: "Places illimitées"
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('network');
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);
  
  const currentPillar = communityPillars.find(p => p.id === activeTab)!;

  return (
    <section id="community" className="relative min-h-screen bg-black overflow-hidden py-32">
      {/* Dynamic gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${currentPillar.gradient} transition-all duration-1000`}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black"></div>
      </motion.div>

      {/* Animated mesh */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-8"
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
              Acte 4 - Notre Communauté
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
            REJOIGNEZ
            <motion.span 
              className={`block text-transparent bg-clip-text bg-gradient-to-r ${currentPillar.gradient}`}
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              L'ÉLITE
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto"
          >
            Un réseau exclusif d'entrepreneurs visionnaires • Opportunités illimitées • Croissance exponentielle
          </motion.p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="max-w-5xl mx-auto px-8 mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10">
            <div className="grid grid-cols-3 gap-2">
              {communityPillars.map((pillar) => {
                const Icon = pillar.icon;
                const isActive = activeTab === pillar.id;
                
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveTab(pillar.id)}
                    className={`relative rounded-2xl p-6 transition-all duration-500 ${
                      isActive ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="communityActiveTab"
                        className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} opacity-20 rounded-2xl`}
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    
                    <div className="relative flex flex-col items-center gap-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${pillar.gradient} flex items-center justify-center ${
                        isActive ? 'scale-110' : 'scale-100 opacity-70'
                      } transition-all duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-montserrat font-bold text-lg ${
                          isActive ? 'text-white' : 'text-white/60'
                        } transition-colors duration-300`}>
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-8"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              {/* Left: Visual */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  <img
                    src={currentPillar.image}
                    alt={currentPillar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentPillar.gradient} opacity-20`}></div>
                  
                  {/* Floating stat */}
                  <motion.div 
                    className="absolute top-8 left-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <div className="bg-black/50 backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/20">
                      <div className={`text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${currentPillar.gradient} mb-2`}>
                        {currentPillar.stat}
                      </div>
                      <div className="text-white/80 font-inter">
                        {currentPillar.statLabel}
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom content */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-3xl font-montserrat font-bold text-white mb-3">
                      {currentPillar.title}
                    </h3>
                    <p className="text-white/80 font-inter text-lg">
                      {currentPillar.description}
                    </p>
                  </div>
                </div>

                {/* Decorative element */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-10 -right-10 w-40 h-40"
                >
                  <div className={`w-full h-full bg-gradient-to-r ${currentPillar.gradient} rounded-full opacity-10 blur-3xl`}></div>
                </motion.div>
              </motion.div>

              {/* Right: Features & Events */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-8"
              >
                {/* Features */}
                <div>
                  <h3 className="text-2xl font-montserrat font-bold text-white mb-6">
                    Ce qui vous attend
                  </h3>
                  <div className="space-y-4">
                    {currentPillar.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="flex items-center gap-4"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${currentPillar.gradient} rounded-full`}></div>
                        <span className="text-white/80 font-inter text-lg">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div>
                  <h3 className="text-2xl font-montserrat font-bold text-white mb-6">
                    Prochains rendez-vous
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-6">
                            <div className="text-center">
                              <div className={`text-3xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentPillar.gradient}`}>
                                {event.date.split(' ')[0]}
                              </div>
                              <div className="text-white/60 font-inter text-sm uppercase">
                                {event.date.split(' ')[1]}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-montserrat font-semibold text-white mb-1">
                                {event.title}
                              </h4>
                              <div className="flex items-center gap-4">
                                <span className="text-white/60 font-inter text-sm">{event.type}</span>
                                <span className="text-white/40">•</span>
                                <span className="text-white/60 font-inter text-sm">{event.spots}</span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-white/40" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.a
                  href="/evenements"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block"
                >
                  <div className={`relative bg-gradient-to-r ${currentPillar.gradient} p-[2px] rounded-2xl overflow-hidden group`}>
                    <div className="relative bg-black rounded-2xl px-8 py-5 overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${currentPillar.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      />
                      
                      <div className="relative flex items-center justify-between">
                        <span className="font-montserrat font-bold text-white text-lg">
                          Voir tous les événements
                        </span>
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            </div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-montserrat font-bold text-white text-center mb-12">
                Ils ont transformé leur business ici
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onMouseEnter={() => setHoveredTestimonial(index)}
                    onMouseLeave={() => setHoveredTestimonial(null)}
                    whileHover={{ y: -5 }}
                    className="relative"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                      {/* Rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      {/* Content */}
                      <p className="text-white/80 font-inter text-lg mb-8 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-montserrat font-semibold text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-white/60 font-inter text-sm">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>

                      {/* Hover gradient */}
                      {hoveredTestimonial === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`absolute inset-0 bg-gradient-to-r ${currentPillar.gradient} opacity-5 rounded-3xl pointer-events-none`}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-violet-600/10 via-emerald-600/10 to-pink-600/10 rounded-3xl p-16 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-16 h-16 text-white/60 mx-auto mb-8" />
                
                <h3 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-6">
                  Prêt à accélérer votre succès ?
                </h3>
                
                <p className="text-xl text-white/60 font-inter mb-10 max-w-3xl mx-auto">
                  Rejoignez une communauté où chaque connexion est une opportunité, 
                  chaque événement une source d'inspiration.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/adhesion"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-emerald-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-white text-black rounded-2xl px-10 py-5 font-montserrat font-bold">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" />
                        <span>DEVENIR MEMBRE</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="/visite"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <div className="relative bg-white/10 backdrop-blur-sm text-white rounded-2xl px-10 py-5 font-montserrat font-semibold border border-white/20 overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <span>VISITER LE 40</span>
                      </div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
}