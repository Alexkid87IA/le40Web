import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Lock, Wifi, Phone, Check, ArrowRight, Star, Shield, Users, Clock, Package, Briefcase, MapPin, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

const officeConfigurations = [
  {
    id: 'bureau-2-4',
    title: 'Bureau 2-4 personnes',
    subtitle: 'Idéal pour startup',
    description: 'Bureau privé fermé de 15m² à 25m² parfait pour les petites équipes en croissance.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '15-25m²',
    capacity: '2-4 personnes',
    price: 'À partir de 699€/mois',
    features: [
      'Bureau fermé et sécurisé',
      'Mobilier ergonomique inclus',
      'Ligne téléphonique dédiée',
      'Accès 24/7 avec badge'
    ],
    gradient: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'bureau-5-10',
    title: 'Bureau 5-10 personnes',
    subtitle: 'Pour équipes établies',
    description: 'Espace privatif de 40m² à 60m² avec zone de travail et petit espace réunion intégré.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '40-60m²',
    capacity: '5-10 personnes',
    price: 'À partir de 1499€/mois',
    features: [
      'Espace meeting intégré',
      'Configuration personnalisable',
      'Armoires de stockage',
      'Imprimante dédiée'
    ],
    gradient: 'from-teal-600 to-cyan-600'
  },
  {
    id: 'bureau-10-20',
    title: 'Bureau 10-20 personnes',
    subtitle: 'Solution entreprise',
    description: 'Grand bureau privatif de 80m² à 100m² pour accueillir votre équipe dans les meilleures conditions.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '80-100m²',
    capacity: '10-20 personnes',
    price: 'À partir de 2499€/mois',
    features: [
      'Salle de réunion privée',
      'Espace détente intégré',
      'Kitchenette privée',
      'Signalétique personnalisée'
    ],
    gradient: 'from-cyan-600 to-blue-600'
  }
];

const pricingPlans = [
  {
    name: 'Court Terme',
    period: '1-5 mois',
    description: 'Flexibilité maximale',
    priceInfo: '+20% sur tarif standard',
    features: [
      'Préavis 1 mois',
      'Aucun engagement long',
      'Configuration standard',
      'Tous les services inclus',
      'Accès salles de réunion',
      'Support dédié'
    ],
    gradient: 'from-emerald-600 to-teal-600',
    popular: false
  },
  {
    name: 'Moyen Terme',
    period: '6-11 mois',
    description: 'Équilibre idéal',
    priceInfo: 'Tarif standard',
    features: [
      'Préavis 2 mois',
      'Engagement 6 mois',
      'Personnalisation possible',
      'Tous les services inclus',
      '10h salles/mois incluses',
      'Événements networking'
    ],
    gradient: 'from-teal-600 to-cyan-600',
    popular: true
  },
  {
    name: 'Long Terme',
    period: '12+ mois',
    description: 'Meilleur tarif',
    priceInfo: '-15% sur tarif standard',
    features: [
      'Préavis 3 mois',
      'Engagement 12 mois',
      'Personnalisation complète',
      'Services premium inclus',
      '20h salles/mois incluses',
      'Parking réservé (selon dispo)'
    ],
    gradient: 'from-cyan-600 to-blue-600',
    popular: false
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Marie Lefebvre',
    role: 'CEO, TechFlow',
    company: 'Startup Tech - 8 personnes',
    comment: 'Notre équipe a trouvé le cadre parfait pour se développer. Le bureau privé nous offre la confidentialité nécessaire tout en profitant de l\'écosystème Le 40.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    name: 'Alexandre Moreau',
    role: 'Directeur',
    company: 'Cabinet Conseil - 12 personnes',
    comment: 'La flexibilité du contrat et la qualité des services nous ont convaincus. Plus besoin de gérer la maintenance, on se concentre sur notre activité.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export default function BureauxPrives() {
  const [activeOffice, setActiveOffice] = useState('bureau-2-4');

  return (
    <div className="min-h-screen bg-black">
      <SidebarNav />
      <MobileBurger />

      <main className="lg:ml-60">
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0"
            >
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Bureaux privés"
                className="w-full h-full object-cover opacity-20"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>

            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center mb-12"
                >
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
                  <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
                    Bureaux Privés
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
                >
                  BUREAUX
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                    PRIVATIFS
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto mb-12"
                >
                  Louez votre bureau privé sécurisé et entièrement équipé de 15m² à 100m²
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  <Link to="/contact" className="group relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative bg-black rounded-2xl px-8 py-4 border border-emerald-500/50"
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

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
                >
                  {[
                    { number: '15-100m²', label: 'Surfaces disponibles' },
                    { number: '699€', label: 'À partir de' },
                    { number: '24/7', label: 'Accès sécurisé' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
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
                NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">CONFIGURATIONS</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Des espaces adaptés à la taille de votre équipe
              </p>
            </motion.div>

            <div className="flex justify-center mb-16">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
                <div className="flex gap-2">
                  {officeConfigurations.map((office) => (
                    <button
                      key={office.id}
                      onClick={() => setActiveOffice(office.id)}
                      className="relative px-6 py-3 rounded-xl transition-all duration-300"
                    >
                      {activeOffice === office.id && (
                        <motion.div
                          layoutId="activeOfficeTab"
                          className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl"
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      <span className={`relative z-10 font-montserrat font-medium transition-colors ${
                        activeOffice === office.id ? 'text-white' : 'text-white/60'
                      }`}>
                        {office.capacity}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {officeConfigurations.map((office) => (
                activeOffice === office.id && (
                  <motion.div
                    key={office.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="relative"
                    >
                      <div className="relative rounded-3xl overflow-hidden">
                        <img
                          src={office.image}
                          alt={office.title}
                          className="w-full h-[600px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="absolute top-8 left-8"
                        >
                          <div className={`bg-gradient-to-r ${office.gradient} p-4 rounded-2xl backdrop-blur-xl`}>
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>

                        <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20">
                          <span className="text-white font-montserrat font-semibold">{office.size}</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div className="mb-6">
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${office.gradient} font-montserrat font-semibold text-lg`}>
                          {office.subtitle}
                        </span>
                        <h3 className="text-4xl font-montserrat font-black text-white mt-2 mb-4">
                          {office.title}
                        </h3>
                        <p className="text-xl text-white/70 font-inter leading-relaxed">
                          {office.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {office.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${office.gradient} rounded-full`}></div>
                            <span className="text-white/80 font-inter">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-montserrat font-black text-white">
                            {office.price}
                          </span>
                        </div>

                        <Link to="/contact" className="group">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`bg-gradient-to-r ${office.gradient} rounded-2xl px-8 py-4 flex items-center gap-3`}
                          >
                            <span className="font-montserrat font-semibold text-white">
                              Réserver une visite
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

        <section id="pricing" className="relative py-32 bg-black">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
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
                FORMULES DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">LOCATION</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Choisissez la durée d'engagement adaptée à vos besoins
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
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Plus populaire
                      </div>
                    </div>
                  )}

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative h-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 ${
                      plan.popular ? 'border-emerald-500/50' : 'border-white/10'
                    } hover:border-white/20`}
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">
                        {plan.description}
                      </p>
                      <div className="text-lg font-montserrat font-medium text-emerald-400 mb-2">
                        {plan.period}
                      </div>
                      <div className="text-white/50 text-sm">
                        {plan.priceInfo}
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

                    <Link to="/contact" className="block">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-2xl font-montserrat font-semibold text-center transition-all duration-300 ${
                          plan.popular
                            ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-emerald-600/20`
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        Demander un devis
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-6 py-3">
                <Package className="w-5 h-5 text-emerald-400" />
                <span className="text-white/80 text-sm">
                  Besoin d'une option coworking flexible ? <Link to="/coworking" className="text-emerald-400 hover:text-emerald-300 font-medium">Découvrez nos espaces partagés</Link>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">INCLUS</span> DANS TOUS LES BUREAUX
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Wifi, title: 'Fibre dédiée', desc: '1 Gb/s garantie' },
                { icon: Phone, title: 'Téléphonie', desc: 'Ligne fixe incluse' },
                { icon: Lock, title: 'Sécurité', desc: 'Badges 24/7' },
                { icon: Users, title: 'Salles réunion', desc: 'Heures incluses' },
                { icon: Shield, title: 'Assurance', desc: 'Locaux sécurisés' },
                { icon: Briefcase, title: 'Conciergerie', desc: 'Services pros' },
                { icon: Clock, title: 'Ménage', desc: 'Hebdomadaire' },
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
                    className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
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
                ILS NOUS FONT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">CONFIANCE</span>
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
                      <Star key={i} className="w-5 h-5 text-emerald-400 fill-current" />
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
                      <div className="text-emerald-400 text-xs">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[150px]"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Building2 className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                TROUVEZ VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">BUREAU IDÉAL</span>
              </h2>
              <p className="text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto">
                Réservez une visite et découvrez nos bureaux privés disponibles
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-black rounded-2xl px-10 py-5 border border-emerald-500/50"
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
                    <Calendar className="w-5 h-5" />
                    Demander un devis
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
