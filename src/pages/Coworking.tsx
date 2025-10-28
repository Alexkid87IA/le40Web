import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Wifi, Coffee, Clock, Check, ArrowRight, Star, Shield, Building2, Sparkles, ChevronRight, MapPin, Zap, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

// Données des espaces de coworking
const coworkingSpaces = [
  {
    id: 'open-space',
    title: 'Open Space',
    subtitle: 'L\'énergie collective',
    description: 'Un plateau lumineux de 300m² pour 30 coworkers, avec vue panoramique.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    capacity: '30 postes',
    price: 'À partir de 29€/jour',
    features: [
      'Postes ergonomiques',
      'Écrans 4K disponibles',
      'Casiers sécurisés',
      'Zone silence'
    ],
    gradient: 'from-cyan-600 to-blue-600',
    link: '/spaces/open-space'
  },
  {
    id: 'bureaux-prives',
    title: 'Bureaux Privés',
    subtitle: 'Votre espace dédié',
    description: 'Des bureaux fermés de 2 à 8 personnes, personnalisables selon vos besoins.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    capacity: '2-8 personnes',
    price: 'À partir de 600€/mois',
    features: [
      'Bureau fermé',
      'Mobilier premium',
      'Ligne téléphonique',
      'Accès 24/7'
    ],
    gradient: 'from-emerald-600 to-teal-600',
    link: '/spaces/bureaux-prives'
  },
  {
    id: 'phone-box',
    title: 'Phone Box',
    subtitle: 'Confidentialité garantie',
    description: 'Cabines insonorisées pour vos appels et visioconférences importants.',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    capacity: '1 personne',
    price: 'Inclus',
    features: [
      'Isolation phonique',
      'Écran pour visio',
      'Éclairage optimal',
      'Ventilation'
    ],
    gradient: 'from-pink-600 to-rose-600',
    link: '/spaces/phone-box'
  }
];

// Formules de prix
const pricingPlans = [
  {
    name: 'Nomade',
    price: '29€',
    period: '/jour',
    description: 'Pour une journée productive',
    features: [
      'Poste de travail flexible',
      'Wi-Fi ultra rapide',
      'Café illimité',
      'Accès 8h-20h',
      'Impressions (20 pages)',
      'Salles de réunion (1h)'
    ],
    gradient: 'from-blue-600 to-cyan-600',
    popular: false
  },
  {
    name: 'Résident',
    price: '299€',
    period: '/mois',
    description: 'Votre bureau attitré',
    features: [
      'Poste de travail dédié',
      'Accès 24/7',
      'Casier personnel',
      'Salles de réunion (10h/mois)',
      'Impressions illimitées',
      'Invités (5/mois)'
    ],
    gradient: 'from-cyan-600 to-blue-600',
    popular: true
  },
  {
    name: 'Team',
    price: '1299€',
    period: '/mois',
    description: 'Pour votre équipe',
    features: [
      '5 postes dédiés',
      'Bureau privé disponible',
      'Salle de réunion privée',
      'Service conciergerie',
      'Événements exclusifs',
      'Parking (2 places)'
    ],
    gradient: 'from-amber-600 to-orange-600',
    popular: false
  }
];

// Témoignages
const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'CEO, TechStart',
    comment: 'Le40 a transformé notre façon de travailler. L\'énergie est incroyable et les rencontres enrichissantes.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'Consultant',
    comment: 'Les espaces sont magnifiques et l\'équipe toujours aux petits soins. Je recommande vivement !',
    rating: 5,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export default function Coworking() {
  const [activeSpace, setActiveSpace] = useState('open-space');

  return (
    <div className="min-h-screen bg-black">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background avec effet parallax */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Coworking space"
                className="w-full h-full object-cover opacity-20"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
            
            {/* Floating elements */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-8 lg:px-16 py-32">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center mb-12"
                >
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
                  <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
                    Espaces Coworking
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
                >
                  ESPACES DE
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    COWORKING
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto mb-12"
                >
                  Rejoignez une communauté de 120+ entrepreneurs dans un espace professionnel de 300m²
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  <Link to="/contact" className="group relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative bg-black rounded-2xl px-8 py-4 border border-cyan-500/50"
                    >
                      <span className="font-montserrat font-semibold text-white flex items-center gap-3">
                        Réserver une visite
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.div>
                  </Link>

                  <Link to="#pricing" className="group">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <span className="font-montserrat font-semibold text-white">
                        Voir les tarifs
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
                >
                  {[
                    { number: '120+', label: 'Entrepreneurs' },
                    { number: '300m²', label: 'Espace ouvert' },
                    { number: '4.9★', label: 'Note moyenne' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        {stat.number}
                      </div>
                      <div className="text-white/60 font-inter text-sm mt-2">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Espaces Section avec Tabs */}
        <section className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">ESPACES</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Des espaces adaptés à tous vos besoins professionnels
              </p>
            </motion.div>

            {/* Tabs Navigation */}
            <div className="flex justify-center mb-16">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
                <div className="flex gap-2">
                  {coworkingSpaces.map((space) => (
                    <button
                      key={space.id}
                      onClick={() => setActiveSpace(space.id)}
                      className="relative px-6 py-3 rounded-xl transition-all duration-300"
                    >
                      {activeSpace === space.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl"
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      <span className={`relative z-10 font-montserrat font-medium transition-colors ${
                        activeSpace === space.id ? 'text-white' : 'text-white/60'
                      }`}>
                        {space.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {coworkingSpaces.map((space) => (
                activeSpace === space.id && (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                  >
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="relative"
                    >
                      <div className="relative rounded-3xl overflow-hidden">
                        <img
                          src={space.image}
                          alt={space.title}
                          className="w-full h-[600px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Floating badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="absolute top-8 left-8"
                        >
                          <div className={`bg-gradient-to-r ${space.gradient} p-4 rounded-2xl backdrop-blur-xl`}>
                            <Users className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>

                        {/* Capacity badge */}
                        <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20">
                          <span className="text-white font-montserrat font-semibold">{space.capacity}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div className="mb-6">
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${space.gradient} font-montserrat font-semibold text-lg`}>
                          {space.subtitle}
                        </span>
                        <h3 className="text-4xl font-montserrat font-black text-white mt-2 mb-4">
                          {space.title}
                        </h3>
                        <p className="text-xl text-white/70 font-inter leading-relaxed">
                          {space.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {space.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${space.gradient} rounded-full`}></div>
                            <span className="text-white/80 font-inter">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-montserrat font-black text-white">
                            {space.price}
                          </span>
                        </div>
                        
                        <Link to={space.link} className="group">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`bg-gradient-to-r ${space.gradient} rounded-2xl px-8 py-4 flex items-center gap-3`}
                          >
                            <span className="font-montserrat font-semibold text-white">
                              Découvrir cet espace
                            </span>
                            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative py-32 bg-black">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">TARIFS</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Des formules flexibles pour tous les besoins
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Plus populaire
                      </div>
                    </div>
                  )}

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative h-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 ${
                      plan.popular ? 'border-cyan-500/50' : 'border-white/10'
                    } hover:border-white/20`}
                  >
                    {/* Plan header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-6">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center">
                        <span className={`text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                          {plan.price}
                        </span>
                        <span className="text-white/40 ml-2">{plan.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 font-inter text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link to="/contact" className="block">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-2xl font-montserrat font-semibold text-center transition-all duration-300 ${
                          plan.popular
                            ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-cyan-600/20`
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        Choisir cette offre
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">INCLUS</span> DANS L'OFFRE
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Wifi, title: 'Fibre optique', desc: '1 Gb/s inclus' },
                { icon: Coffee, title: 'Café et thé', desc: 'Illimité' },
                { icon: Clock, title: 'Accès 24/7', desc: 'Badge sécurisé' },
                { icon: Users, title: 'Communauté', desc: '120+ entrepreneurs' },
                { icon: Shield, title: 'Sécurité', desc: 'Surveillance 24h' },
                { icon: Zap, title: 'Networking', desc: 'Événements réguliers' },
                { icon: Building2, title: 'Salles', desc: 'Sur réservation' },
                { icon: MapPin, title: 'Localisation', desc: 'Centre-ville' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-white font-montserrat font-bold mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-sm font-inter">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-32 bg-black">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">TÉMOIGNAGES</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-cyan-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-white/80 font-inter text-lg mb-8 leading-relaxed">
                    "{testimonial.comment}"
                  </blockquote>

                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-montserrat font-bold text-white">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px]"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                PRÊT À <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">COMMENCER</span> ?
              </h2>
              <p className="text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto">
                Réservez votre visite et découvrez nos espaces de coworking
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-black rounded-2xl px-10 py-5 border border-cyan-500/50"
                  >
                    <span className="font-montserrat font-semibold text-white flex items-center gap-3">
                      Réserver une visite
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl px-10 py-5 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                >
                  <span className="font-montserrat font-semibold text-white flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    01 23 45 67 89
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}