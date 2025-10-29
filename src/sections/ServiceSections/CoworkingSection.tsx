import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Wifi, Coffee, Clock, ArrowRight, Zap, Building2, Target,
  Star, Shield, MapPin, Calendar, Phone, Check, Sparkles
} from 'lucide-react';
import Button from '../../components/UI/Button';

const stats = [
  { value: '120+', label: 'Membres actifs', icon: Users },
  { value: '4000m²', label: 'Surface totale', icon: Building2 },
  { value: '15+', label: 'Événements / mois', icon: Target }
];

const features = [
  { icon: Wifi, title: 'Internet Très Haut Débit Fibre', desc: '1 Gb/s inclus' },
  { icon: Coffee, title: 'Café et thé', desc: 'Illimité' },
  { icon: Clock, title: 'Accès 24/7', desc: 'Contrôle sécurisé' },
  { icon: Users, title: 'Communauté', desc: '120+ entrepreneurs' },
  { icon: Shield, title: 'Sécurité', desc: 'Surveillance 24h' },
  { icon: Zap, title: 'Networking', desc: 'Événements réguliers' },
  { icon: Building2, title: 'Salles', desc: 'Sur réservation' },
  { icon: MapPin, title: 'Localisation', desc: 'Centre-ville' }
];

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
    gradient: 'from-cyan-600 via-blue-600 to-teal-600',
    popular: false
  },
  {
    name: 'Résident',
    price: '199€',
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
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    popular: true
  },
  {
    name: 'Team',
    price: '899€',
    period: '/mois',
    description: 'Pour votre équipe',
    features: [
      '5 postes dédiés',
      'Bureau privé disponible',
      'Salle de réunion privée',
      'Service conciergerie',
      'Événements membres',
      'Parking (2 places)'
    ],
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    popular: false
  }
];

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

export default function CoworkingSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section id="coworking" className="relative bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

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

      <div className="relative z-10">
        <div className="relative min-h-screen flex items-center">
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
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-8"
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-montserrat font-medium uppercase tracking-wider">
                  Espaces Premium
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-8 leading-[1.1]"
              >
                Travaillez
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">
                  Entouré d'Entrepreneurs
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-white/70 font-inter mb-12 leading-relaxed max-w-3xl"
              >
                Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme. Flexibilité totale, équipements premium et networking au quotidien.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="grid sm:grid-cols-3 gap-6 mb-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-white/60 text-sm font-inter">{stat.label}</div>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="text-white/50 text-sm font-inter">À partir de</div>
                <div className="text-5xl font-montserrat font-black text-white">199€</div>
                <div className="text-white/50 text-sm font-inter">/mois</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="/coworking" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-black rounded-2xl px-8 py-4 border border-cyan-500/50"
                  >
                    <span className="font-montserrat font-semibold text-white flex items-center gap-3">
                      RÉSERVER MAINTENANT
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </a>

                <a href="/tarifs" className="group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <span className="font-montserrat font-semibold text-white">
                      Voir tous les tarifs
                    </span>
                  </motion.div>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">TARIFS</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Des formules flexibles pour tous les besoins
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
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
                      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 text-white text-xs font-montserrat font-medium px-4 py-1.5 rounded-full flex items-center gap-1">
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
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-white/60 text-sm font-inter mb-6">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center">
                        <span className={`text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                          {plan.price}
                        </span>
                        <span className="text-white/40 ml-2 font-inter">{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 font-inter text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a href="/contact" className="block">
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
                    </a>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">INCLUS</span> DANS L'OFFRE
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isHovered = hoveredFeature === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-white font-montserrat font-bold mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm font-inter">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">TÉMOIGNAGES</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
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
                      <div className="text-white/60 text-sm font-inter">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative py-32 bg-gradient-to-b from-zinc-900 to-black">
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
                PRÊT À <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">COMMENCER</span> ?
              </h2>
              <p className="text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto">
                Réservez votre visite et découvrez nos espaces de coworking
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/contact" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                </a>

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
        </div>
      </div>
    </section>
  );
}
