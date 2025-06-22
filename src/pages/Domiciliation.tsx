import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Check, ArrowRight, Star, FileText, Mail, Phone, Shield, Building2, Sparkles, Globe, Award, Clock, Users, ChevronRight, Zap, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';

// Services inclus
const includedServices = [
  {
    icon: Mail,
    title: 'Gestion du courrier',
    description: 'Réception et numérisation'
  },
  {
    icon: Phone,
    title: 'Ligne téléphonique',
    description: 'Numéro dédié professionnel'
  },
  {
    icon: Shield,
    title: 'Conformité légale',
    description: '100% aux normes'
  },
  {
    icon: Globe,
    title: 'Présence digitale',
    description: 'Référencement Google Maps'
  },
  {
    icon: FileText,
    title: 'Documents officiels',
    description: 'Attestations et justificatifs'
  },
  {
    icon: Users,
    title: 'Accueil clients',
    description: 'Sur rendez-vous'
  }
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: "Choisissez votre formule",
    description: "Sélectionnez l'offre adaptée à vos besoins",
    icon: FileText,
    gradient: "from-amber-600 to-orange-600"
  },
  {
    step: 2,
    title: "Envoyez vos documents",
    description: "Kbis, pièce d'identité, justificatifs",
    icon: Mail,
    gradient: "from-orange-600 to-red-600"
  },
  {
    step: 3,
    title: "Activation sous 24h",
    description: "Votre adresse est opérationnelle",
    icon: Shield,
    gradient: "from-red-600 to-pink-600"
  }
];

// Pricing plans
const pricingPlans = [
  {
    id: 'domiciliation-starter',
    name: 'Starter',
    price: 49,
    priceDisplay: '49€',
    period: '/mois',
    description: 'Pour les entrepreneurs individuels',
    features: [
      'Adresse commerciale prestigieuse',
      'Réception du courrier',
      'Scan et envoi par email',
      'Réexpédition 1x/semaine',
      'Attestation de domiciliation',
      'Mise à jour INSEE/Kbis'
    ],
    gradient: 'from-zinc-600 to-gray-600',
    popular: false
  },
  {
    id: 'domiciliation-business',
    name: 'Business',
    price: 99,
    priceDisplay: '99€',
    period: '/mois',
    description: 'La solution complète pour votre société',
    features: [
      'Tout Starter +',
      'Ligne téléphonique dédiée',
      'Accueil téléphonique personnalisé',
      'Réexpédition quotidienne',
      'Salle de réunion (2h/mois)',
      'Présence Google Business'
    ],
    gradient: 'from-amber-600 to-orange-600',
    popular: true
  },
  {
    id: 'domiciliation-premium',
    name: 'Premium',
    price: 199,
    priceDisplay: '199€',
    period: '/mois',
    description: 'Services exclusifs pour votre siège social',
    features: [
      'Tout Business +',
      'Secrétariat dédié',
      'Gestion administrative',
      'Salle de réunion (8h/mois)',
      'Bureau privatif (4h/mois)',
      'Parking visiteurs'
    ],
    gradient: 'from-orange-600 to-red-600',
    popular: false
  }
];

// Success stories
const successStories = [
  {
    company: 'TechStart SAS',
    logo: '🚀',
    testimonial: 'Grâce à cette adresse prestigieuse, nous avons gagné en crédibilité auprès de nos investisseurs.',
    author: 'Marie Chen',
    role: 'CEO'
  },
  {
    company: 'ConseilPro',
    logo: '💼',
    testimonial: 'Service impeccable, notre courrier est géré avec professionnalisme. Un vrai plus pour notre image.',
    author: 'Pierre Durand',
    role: 'Consultant'
  },
  {
    company: 'EcoDesign',
    logo: '🌱',
    testimonial: 'La flexibilité du service nous permet de recevoir nos clients dans un cadre professionnel.',
    author: 'Sophie Martin',
    role: 'Fondatrice'
  }
];

export default function Domiciliation() {
  const [activeTab, setActiveTab] = useState('advantages');
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plan) => {
    addItem({
      id: plan.id,
      serviceType: 'domiciliation',
      serviceName: `Domiciliation ${plan.name}`,
      date: new Date().toISOString(),
      duration: 'month',
      price: plan.price,
      quantity: 1
    });

    // Animation de confirmation
    setAddedToCart({ ...addedToCart, [plan.id]: true });
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [plan.id]: false });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[150px]"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[150px]"></div>
            </motion.div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
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
                    Siège Social Premium
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
                  DOMICILIATION
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    D'ENTREPRISE
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto mb-8"
                >
                  Une adresse prestigieuse au cœur de Paris pour votre siège social
                </motion.p>

                {/* Address badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20 mb-12"
                >
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-montserrat font-medium">
                    40 Rue de la République, 75001 Paris
                  </span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  <Link to="/contact" className="group relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative bg-black rounded-2xl px-8 py-4 border border-amber-500/50"
                    >
                      <span className="font-montserrat font-semibold text-white flex items-center gap-3">
                        <FileText className="w-5 h-5" />
                        Obtenir un devis
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.div>
                  </Link>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <span className="font-montserrat font-semibold text-white flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      01 23 45 67 89
                    </span>
                  </motion.div>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
                >
                  {[
                    { number: '1500+', label: 'Entreprises domiciliées' },
                    { number: '12 ans', label: 'D\'expérience' },
                    { number: '98%', label: 'Satisfaction client' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
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

        {/* Services Section with Tabs */}
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
                POURQUOI NOUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">CHOISIR</span>
              </h2>
            </motion.div>

            {/* Tabs */}
            <div className="flex justify-center mb-16">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('advantages')}
                    className="relative px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    {activeTab === 'advantages' && (
                      <motion.div
                        layoutId="activeServiceTab"
                        className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 font-montserrat font-medium transition-colors ${
                      activeTab === 'advantages' ? 'text-white' : 'text-white/60'
                    }`}>
                      Nos avantages
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="relative px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    {activeTab === 'services' && (
                      <motion.div
                        layoutId="activeServiceTab"
                        className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 font-montserrat font-medium transition-colors ${
                      activeTab === 'services' ? 'text-white' : 'text-white/60'
                    }`}>
                      Services inclus
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'advantages' ? (
                <motion.div
                  key="advantages"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  {[
                    {
                      icon: MapPin,
                      title: 'Adresse prestigieuse',
                      description: '1er arrondissement de Paris, au cœur des affaires',
                      gradient: 'from-amber-600 to-orange-600'
                    },
                    {
                      icon: Shield,
                      title: 'Conformité garantie',
                      description: 'Agréé par la Préfecture, respect total de la législation',
                      gradient: 'from-orange-600 to-red-600'
                    },
                    {
                      icon: Zap,
                      title: 'Activation rapide',
                      description: 'Votre domiciliation active en moins de 24 heures',
                      gradient: 'from-red-600 to-pink-600'
                    },
                    {
                      icon: Award,
                      title: 'Service premium',
                      description: 'Accompagnement personnalisé et services sur-mesure',
                      gradient: 'from-pink-600 to-purple-600'
                    }
                  ].map((advantage, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="text-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-20 h-20 bg-gradient-to-r ${advantage.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6`}
                      >
                        <advantage.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-montserrat font-bold text-white mb-3">{advantage.title}</h3>
                      <p className="text-white/60 font-inter">{advantage.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {includedServices.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <service.icon className="w-12 h-12 text-amber-400 mb-4" />
                      <h3 className="text-xl font-montserrat font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-white/60 font-inter">{service.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative py-32 bg-black">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px]"></div>
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
                SIMPLE ET <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">RAPIDE</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Domiciliez votre entreprise en 3 étapes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative text-center"
                >
                  {/* Connection line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-20 left-1/2 w-full h-[2px] bg-gradient-to-r from-amber-600 to-orange-600 opacity-30"></div>
                  )}

                  {/* Step number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                    className="relative z-10 mx-auto mb-8"
                  >
                    <div className={`w-40 h-40 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto relative`}>
                      <step.icon className="w-20 h-20 text-white" />
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-black rounded-full flex items-center justify-center border-2 border-amber-500">
                        <span className="text-amber-400 font-montserrat font-bold">{step.step}</span>
                      </div>
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-montserrat font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60 font-inter">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
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
                NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">FORMULES</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Une solution adaptée à chaque entreprise
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
                      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Plus populaire
                      </div>
                    </div>
                  )}

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative h-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 ${
                      plan.popular ? 'border-amber-500/50' : 'border-white/10'
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
                          {plan.priceDisplay}
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

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        onClick={() => handleAddToCart(plan)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-2xl font-montserrat font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                          plan.popular
                            ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-amber-600/20`
                            : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30'
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {addedToCart[plan.id] ? (
                            <motion.span
                              key="added"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-5 h-5" />
                              Ajouté au panier !
                            </motion.span>
                          ) : (
                            <motion.span
                              key="add"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center gap-2"
                            >
                              <ShoppingCart className="w-5 h-5" />
                              Ajouter au panier
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <Link to="/contact" className="block">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 rounded-2xl font-montserrat font-medium text-center transition-all duration-300 bg-white/5 text-white hover:bg-white/10 border border-white/10"
                        >
                          En savoir plus
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
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
                ILS NOUS FONT <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">CONFIANCE</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl">{story.logo}</div>
                    <div className="text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 inline-block fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-montserrat font-bold text-white mb-4">{story.company}</h3>
                  
                  <blockquote className="text-white/70 font-inter mb-6 italic">
                    "{story.testimonial}"
                  </blockquote>
                  
                  <div className="border-t border-white/10 pt-4">
                    <div className="font-montserrat font-semibold text-white">{story.author}</div>
                    <div className="text-white/60 text-sm">{story.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px]"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Building2 className="w-16 h-16 text-amber-400 mx-auto mb-8" />
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                DOMICILIEZ VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">ENTREPRISE</span>
              </h2>
              <p className="text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto">
                Rejoignez plus de 1500 entreprises qui nous font confiance pour leur siège social
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-black rounded-2xl px-10 py-5 border border-amber-500/50"
                  >
                    <span className="font-montserrat font-semibold text-white flex items-center gap-3">
                      Commencer maintenant
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl px-10 py-5 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                >
                  <span className="font-montserrat font-semibold text-white">
                    Télécharger la brochure
                  </span>
                </motion.div>
              </div>

              <div className="mt-12 text-white/40 text-sm font-inter">
                Ou appelez-nous au <span className="text-amber-400 font-semibold">01 23 45 67 89</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}