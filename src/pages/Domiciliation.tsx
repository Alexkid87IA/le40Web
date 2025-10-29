import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, Shield, Clock, ArrowRight, Check, Sparkles, Star, Globe, Users, Zap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

const domiciliationPlans = [
  {
    id: 'starter',
    title: 'Starter',
    subtitle: 'Pour démarrer sereinement',
    description: 'Idéal pour freelances et auto-entrepreneurs. Une adresse professionnelle avec l\'essentiel pour développer votre activité.',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '49€/mois',
    priceDetail: 'Sans engagement',
    features: [
      'Adresse officielle Marseille',
      'Scan courrier sous 2h',
      'Attestation de domiciliation',
      'Réexpédition 1x/semaine',
      'Support administratif',
      'Conformité légale garantie'
    ],
    highlights: [
      { icon: Mail, text: 'Scan 2h' },
      { icon: Shield, text: 'Agréé préfecture' },
      { icon: Building2, text: 'Adresse pro' },
      { icon: Clock, text: 'Sans engagement' }
    ],
    gradient: 'from-amber-600 via-orange-600 to-orange-700',
    link: '/contact',
    badge: 'Populaire',
    badgeColor: 'from-amber-600 to-orange-600'
  },
  {
    id: 'business',
    title: 'Business',
    subtitle: 'Solution complète',
    description: 'Pour SARL, SAS et PME. Un service complet avec standard téléphonique et salles de réunion incluses.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '99€/mois',
    priceDetail: 'Tout inclus',
    features: [
      'Standard téléphonique pro',
      'Accueil clients',
      '2h salle de réunion/mois',
      'Réexpédition quotidienne',
      'Google Business Profile',
      'Conseiller dédié'
    ],
    highlights: [
      { icon: Phone, text: 'Standard pro' },
      { icon: Users, text: 'Accueil client' },
      { icon: Building2, text: '2h salle/mois' },
      { icon: Globe, text: 'Visibilité Google' }
    ],
    gradient: 'from-orange-600 to-red-600',
    link: '/contact',
    badge: 'Premium',
    badgeColor: 'from-orange-600 to-red-600'
  },
  {
    id: 'scaleup',
    title: 'Scale-Up',
    subtitle: 'Siège social complet',
    description: 'Pour entreprises en croissance. Un véritable siège social avec tous les services d\'une grande entreprise.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '199€/mois',
    priceDetail: 'Infrastructure complète',
    features: [
      'Secrétariat dédié',
      '8h salle de réunion/mois',
      '4h bureau privatif/mois',
      'Gestion administrative',
      'Conseiller prioritaire',
      'Services personnalisés'
    ],
    highlights: [
      { icon: Users, text: 'Secrétariat' },
      { icon: Building2, text: '8h salle' },
      { icon: Sparkles, text: 'Prioritaire' },
      { icon: Zap, text: 'Sur-mesure' }
    ],
    gradient: 'from-red-600 to-rose-600',
    link: '/contact',
    badge: 'Entreprise',
    badgeColor: 'from-red-600 to-rose-600'
  }
];

const comparisonFeatures = [
  {
    category: 'Adresse professionnelle',
    starter: 'Marseille 15e',
    business: 'Marseille 15e',
    scaleup: 'Marseille 15e'
  },
  {
    category: 'Scan courrier',
    starter: 'Sous 2h',
    business: 'Sous 2h',
    scaleup: 'Sous 2h'
  },
  {
    category: 'Réexpédition',
    starter: '1x/semaine',
    business: 'Quotidienne',
    scaleup: 'Sur demande'
  },
  {
    category: 'Standard téléphonique',
    starter: '-',
    business: 'Inclus',
    scaleup: 'Inclus + dédié'
  },
  {
    category: 'Salles de réunion',
    starter: '-',
    business: '2h/mois',
    scaleup: '8h/mois'
  },
  {
    category: 'Accueil clients',
    starter: '-',
    business: 'Inclus',
    scaleup: 'Premium'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'E-commerce beauté',
    comment: 'Le scan automatique du courrier m\'a changé la vie. Et mes clients me prennent enfin au sérieux avec une vraie adresse professionnelle.',
    rating: 5,
    metrics: [
      { value: '+22%', label: 'Conversion' },
      { value: '30h/mois', label: 'Temps gagné' }
    ],
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    name: 'Marc Dubois',
    role: 'Consultant IT',
    comment: 'Le standard téléphonique et les salles de réunion ont transformé mon image professionnelle. Je signe 35% de contrats en plus.',
    rating: 5,
    metrics: [
      { value: '+35%', label: 'Signature' },
      { value: '15h/mois', label: 'Salle utilisée' }
    ],
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const faqItems = [
  {
    question: 'Le scan en 2h, c\'est vraiment vrai ?',
    answer: 'Oui, absolument. Votre courrier arrive le matin, on le scanne avant midi. Vous recevez une notification avec le scan en pièce jointe.'
  },
  {
    question: 'L\'agrément Préfecture, c\'est obligatoire ?',
    answer: 'Oui ! C\'est une obligation légale pour toute société de domiciliation. Nous avons cet agrément, et il est vérifiable.'
  },
  {
    question: 'Je peux changer de formule ?',
    answer: 'Oui, à tout moment. Upgrade immédiat, downgrade au prochain cycle de facturation. Pas de pénalités.'
  },
  {
    question: 'Mon courrier est-il en sécurité ?',
    answer: 'Oui. Stockage sécurisé, scan confidentiel, archive chiffrée. Seul vous avez accès à vos documents numérisés.'
  }
];

export default function Domiciliation() {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

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
                src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Domiciliation Le 40"
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
                    Domiciliation d'entreprise
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
                >
                  VOTRE ADRESSE
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                    PROFESSIONNELLE
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto mb-12"
                >
                  Domiciliez votre entreprise à Marseille avec scan courrier 2h et standard téléphonique inclus
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20"
                >
                  {[
                    { number: '127+', label: 'Entreprises' },
                    { number: '2h', label: 'Scan courrier' },
                    { number: '49€', label: 'À partir de' },
                    { number: '24/7', label: 'Support dispo' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
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
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                CHOISISSEZ VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">FORMULE</span>
              </h2>
              <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
                Trois solutions adaptées à votre développement
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {domiciliationPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

                  <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={plan.image}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                      <div className="absolute top-6 left-6">
                        <div className={`bg-gradient-to-r ${plan.badgeColor} text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1`}>
                          <Sparkles className="w-3 h-3" />
                          {plan.badge}
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-4 mb-3">
                          {plan.highlights.map((highlight, idx) => (
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
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient} font-montserrat font-semibold text-sm tracking-wider uppercase`}>
                          {plan.subtitle}
                        </span>
                        <h3 className="text-3xl font-montserrat font-black text-white mt-2 mb-3">
                          {plan.title}
                        </h3>
                        <p className="text-white/70 font-inter leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm font-inter">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-end justify-between mb-6 pb-6 border-b border-white/10">
                        <div>
                          <div className="text-3xl font-montserrat font-black text-white mb-1">
                            {plan.price}
                          </div>
                          <div className="text-white/50 text-sm font-inter">
                            {plan.priceDetail}
                          </div>
                        </div>
                      </div>

                      <Link to={plan.link} className="block">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full bg-gradient-to-r ${plan.gradient} rounded-2xl px-6 py-4 flex items-center justify-center gap-3 group/btn`}
                        >
                          <span className="font-montserrat font-semibold text-white">
                            Choisir cette formule
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

        <section className="relative py-32 bg-black">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]"></div>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">COMPARATIF</span>
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
              <div className="grid grid-cols-4 bg-white/5 p-6 border-b border-white/10">
                <div></div>
                <div className="text-center">
                  <div className="text-lg font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    Starter
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                    Business
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">
                    Scale-Up
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
                  className="grid grid-cols-4 p-6 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="font-montserrat font-semibold text-white/90">
                    {feature.category}
                  </div>
                  <div className="text-center text-white/70 font-inter">
                    {feature.starter}
                  </div>
                  <div className="text-center text-white/70 font-inter">
                    {feature.business}
                  </div>
                  <div className="text-center text-white/70 font-inter">
                    {feature.scaleup}
                  </div>
                </motion.div>
              ))}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">INCLUS</span> DANS TOUTES LES FORMULES
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Mail, title: 'Scan courrier', desc: 'Sous 2h' },
                { icon: Shield, title: 'Agréé préfecture', desc: 'Certifié' },
                { icon: Clock, title: 'Sans engagement', desc: 'Résiliable' },
                { icon: Building2, title: 'Adresse pro', desc: 'Marseille 15e' },
                { icon: Globe, title: 'Visibilité', desc: 'Google Business' },
                { icon: Zap, title: 'Activation', desc: '24h chrono' },
                { icon: Users, title: 'Support', desc: 'Conseiller dédié' },
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
                    className="w-16 h-16 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">TÉMOIGNAGES</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-white/80 font-inter text-lg mb-8 leading-relaxed">
                    "{testimonial.comment}"
                  </blockquote>

                  <div className="flex items-center justify-between">
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
                    <div className="flex gap-4">
                      {testimonial.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl font-montserrat font-black text-amber-400">{metric.value}</div>
                          <div className="text-white/60 text-xs">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
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
              <h3 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">QUESTIONS FRÉQUENTES</span>
              </h3>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-montserrat font-semibold text-white pr-8">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ArrowRight className="w-5 h-5 text-amber-400" />
                    </motion.div>
                  </button>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-white/70 font-inter leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-600/10 via-orange-600/10 to-red-600/10 rounded-full blur-[150px]"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Building2 className="w-12 h-12 text-gradient-to-r from-amber-400 to-orange-400 mx-auto mb-6" />
              <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
                PRÊT À <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">DÉMARRER</span> ?
              </h2>
              <p className="text-xl font-inter text-white/60 mb-12 max-w-2xl mx-auto">
                Domiciliez votre entreprise en 24h et concentrez-vous sur votre activité
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-black rounded-2xl px-10 py-5 border border-amber-500/50"
                  >
                    <span className="font-montserrat font-semibold text-white flex items-center gap-3">
                      Démarrer maintenant
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
