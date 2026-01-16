import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Lock, Wifi, Coffee, Clock, ArrowRight, Check, Sparkles, Shield, Zap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

const workspaceOptions = [
  {
    id: 'coworking',
    title: 'Espaces Coworking',
    subtitle: 'Flexibilité & Communauté',
    description: 'Rejoignez une communauté dynamique de 120+ entrepreneurs dans un open space de 300m². Postes flexibles ou dédiés, selon vos besoins.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'À partir de 29€/jour',
    priceDetail: 'ou 299€/mois',
    features: [
      'Postes de travail flexibles',
      'Accès à la communauté',
      'Événements networking',
      'Salles de réunion',
      'Services mutualisés',
      'Ambiance collaborative'
    ],
    highlights: [
      { icon: Users, text: '120+ membres' },
      { icon: MapPin, text: '300m² ouvert' },
      { icon: Wifi, text: 'Fibre 1 Gbps' },
      { icon: Coffee, text: 'Espace café' }
    ],
    gradient: 'from-cyan-600 via-blue-600 to-teal-600',
    link: '/coworking',
    badge: 'Populaire',
    badgeColor: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'bureaux-prives',
    title: 'Bureaux Privés',
    subtitle: 'Confidentialité & Confort',
    description: 'Bureaux fermés et sécurisés de 15m² à 100m² pour des équipes de 2 à 20 personnes. Personnalisables et entièrement équipés.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'À partir de 499€/mois',
    priceDetail: 'Bureau 2-4 personnes',
    features: [
      'Bureau privé fermé',
      'Mobilier ergonomique',
      'Ligne téléphonique dédiée',
      'Accès sécurisé par badge',
      'Configuration personnalisable',
      'Stockage sécurisé'
    ],
    highlights: [
      { icon: Lock, text: 'Accès sécurisé' },
      { icon: Building2, text: '15-100m²' },
      { icon: Shield, text: 'Privé & fermé' },
      { icon: Zap, text: 'Fibre dédiée' }
    ],
    gradient: 'from-emerald-600 to-teal-600',
    link: '/bureaux-prives',
    badge: 'Premium',
    badgeColor: 'from-emerald-600 to-teal-600'
  }
];

const comparisonFeatures = [
  {
    category: 'Espace',
    coworking: 'Postes partagés ou dédiés',
    bureaux: 'Bureau privé fermé'
  },
  {
    category: 'Capacité',
    coworking: '1 personne',
    bureaux: '2 à 20 personnes'
  },
  {
    category: 'Accès',
    coworking: 'Lun-Ven 9h-20h',
    bureaux: 'Lun-Ven 9h-20h'
  },
  {
    category: 'Tarif',
    coworking: 'À partir de 29€/jour',
    bureaux: 'À partir de 499€/mois'
  },
  {
    category: 'Confidentialité',
    coworking: 'Espace partagé',
    bureaux: 'Bureau fermé & privé'
  },
  {
    category: 'Personnalisation',
    coworking: 'Standard',
    bureaux: 'Personnalisable'
  }
];

export default function Bureaux() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24">
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
                alt="Bureaux Le 40"
                className="w-full h-full object-cover opacity-20"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>

            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
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
                    Espaces de Travail
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
                >
                  TROUVEZ VOTRE
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400">
                    ESPACE IDÉAL
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto mb-12"
                >
                  Coworking flexible ou bureau privé : choisissez l'espace qui correspond à vos besoins
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20"
                >
                  {[
                    { number: '300m²', label: 'Espace total' },
                    { number: '120+', label: 'Membres' },
                    { number: '29€', label: 'À partir de' },
                    { number: '24/7', label: 'Accès disponible' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400">
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

        <section id="options" className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                CHOISISSEZ VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400">FORMULE</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Deux solutions professionnelles adaptées à votre activité
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {workspaceOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${option.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

                  <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={option.image}
                        alt={option.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                      <div className="absolute top-6 left-6">
                        <div className={`bg-gradient-to-r ${option.badgeColor} text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1`}>
                          <Sparkles className="w-3 h-3" />
                          {option.badge}
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-4 mb-3">
                          {option.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-black/60 backdrop-blur-xl rounded-lg px-3 py-1.5">
                              <highlight.icon className="w-4 h-4 text-white/80" />
                              <span className="text-white/90 text-xs font-medium">{highlight.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="mb-6">
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${option.gradient} font-montserrat font-semibold text-sm tracking-wider uppercase`}>
                          {option.subtitle}
                        </span>
                        <h3 className="text-3xl font-montserrat font-black text-white mt-2 mb-3">
                          {option.title}
                        </h3>
                        <p className="text-white/70 font-inter leading-relaxed">
                          {option.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {option.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm font-inter">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-end justify-between mb-6 pb-6 border-b border-white/10">
                        <div>
                          <div className="text-3xl font-montserrat font-black text-white mb-1">
                            {option.price}
                          </div>
                          <div className="text-white/50 text-sm font-inter">
                            {option.priceDetail}
                          </div>
                        </div>
                      </div>

                      <Link to={option.link} className="block">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full bg-gradient-to-r ${option.gradient} rounded-2xl px-6 py-4 flex items-center justify-center gap-3 group/btn`}
                        >
                          <span className="font-montserrat font-semibold text-white">
                            Découvrir cette formule
                          </span>
                          <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="comparison" className="relative py-32 bg-black">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400">COMPARATIF</span>
              </h2>
              <p className="text-xl font-inter text-white/60">
                Trouvez la solution qui vous correspond
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10"
            >
              <div className="grid grid-cols-3 bg-white/5 p-6 border-b border-white/10">
                <div></div>
                <div className="text-center">
                  <div className="text-lg font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    Coworking
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                    Bureaux Privés
                  </div>
                </div>
              </div>

              {comparisonFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="font-montserrat font-semibold text-white/90">
                    {feature.category}
                  </div>
                  <div className="text-center text-white/70 font-inter">
                    {feature.coworking}
                  </div>
                  <div className="text-center text-white/70 font-inter">
                    {feature.bureaux}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="features" className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400">INCLUS</span> DANS TOUTES LES FORMULES
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Wifi, title: 'Fibre optique', desc: '1 Gb/s inclus' },
                { icon: Coffee, title: 'Café et thé', desc: 'Illimité' },
                { icon: Clock, title: 'Accès flexible', desc: 'Selon formule' },
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
                    className="w-16 h-16 bg-gradient-to-r from-cyan-600 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
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
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-600/10 via-emerald-600/10 to-teal-600/10 rounded-full blur-[150px]"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Building2 className="w-12 h-12 text-gradient-to-r from-cyan-400 to-emerald-400 mx-auto mb-6" />
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                BESOIN DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400">CONSEILS</span> ?
              </h2>
              <p className="text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto">
                Notre équipe vous aide à choisir la formule idéale pour votre activité
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
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

                <Link to="/tarifs" className="group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl px-10 py-5 border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <span className="font-montserrat font-semibold text-white">
                      Voir tous les tarifs
                    </span>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
