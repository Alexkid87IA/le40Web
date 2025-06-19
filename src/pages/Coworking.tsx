import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Coffee, Clock, Check, ArrowRight, Star, Shield, Building2, Sparkles } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { coworkingSpaces, pricingData, testimonials } from '../data/mockData';

const coworkingFeatures = [
  {
    icon: Wifi,
    title: "Wifi Fibré",
    description: "Connexion ultra-rapide garantie 1 Gb/s",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Coffee,
    title: "Café Illimité",
    description: "Boissons chaudes et froides à volonté",
    color: "from-orange-400 to-orange-600"
  },
  {
    icon: Clock,
    title: "Accès 24/7",
    description: "Disponible quand vous en avez besoin",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Networking et événements réguliers",
    color: "from-green-400 to-green-600"
  }
];

export default function Coworking() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0F172A] to-slate-900 film-grain">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Espace coworking"
              className="w-full h-full object-cover opacity-20 ken-burns"
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-6 py-3 glass-effect rounded-full border border-white/20 mb-8"
              >
                <Building2 className="w-4 h-4 text-coworking mr-2" />
                <span className="text-sm font-inter font-medium text-white/80 tracking-wide">ESPACES PREMIUM</span>
              </motion.div>

              <h1 className="text-hero font-montserrat font-black text-white mb-6">
                Espaces de <span className="bg-gradient-coworking bg-clip-text text-transparent">Coworking</span>
              </h1>
              <p className="text-body-large font-inter text-white/70 max-w-4xl mx-auto">
                Travaillez dans un environnement stimulant au cœur de la ville, entouré d'entrepreneurs passionnés et visionnaires
              </p>
            </motion.div>
          </div>
        </section>

        {/* Spaces Grid Détaillée */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-section-title font-montserrat font-black text-white mb-6">
                Nos <span className="bg-gradient-coworking bg-clip-text text-transparent">Espaces</span>
              </h2>
            </motion.div>

            <div className="space-y-16">
              {coworkingSpaces.map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative h-80 lg:h-96 rounded-4xl overflow-hidden group">
                      <img 
                        src={space.image} 
                        alt={space.title}
                        className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 to-transparent"></div>
                      
                      {/* Floating number */}
                      <div className="absolute top-6 left-6 w-16 h-16 glass-effect rounded-full flex items-center justify-center border border-white/20">
                        <span className="text-white font-playfair font-bold text-2xl">{space.id}</span>
                      </div>

                      {/* Capacity badge */}
                      <div className="absolute top-6 right-6 glass-effect rounded-full px-4 py-2 flex items-center border border-white/20">
                        <Users className="w-4 h-4 text-coworking mr-2" />
                        <span className="text-white font-inter font-medium text-sm">{space.capacity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="space-y-6">
                      <div>
                        <p className="text-coworking font-inter text-lg font-medium mb-3 italic">
                          {space.tagline}
                        </p>
                        <h3 className="text-4xl font-montserrat font-black text-white mb-4">
                          {space.title}
                        </h3>
                        <div className="w-20 h-1 bg-gradient-coworking rounded-full mb-6"></div>
                      </div>

                      <p className="text-white/80 font-inter text-lg leading-relaxed">
                        {space.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="glass-effect border border-white/10 rounded-2xl p-4">
                          <div className="flex items-center mb-2">
                            <Users className="w-5 h-5 text-coworking mr-2" />
                            <span className="text-white font-inter font-medium text-sm">Capacité</span>
                          </div>
                          <p className="text-white/70 text-sm">{space.capacity}</p>
                        </div>
                        <div className="glass-effect border border-white/10 rounded-2xl p-4">
                          <div className="flex items-center mb-2">
                            <Clock className="w-5 h-5 text-coworking mr-2" />
                            <span className="text-white font-inter font-medium text-sm">Accès</span>
                          </div>
                          <p className="text-white/70 text-sm">{space.access}</p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group bg-gradient-coworking text-white px-8 py-4 rounded-2xl font-montserrat font-semibold hover:shadow-lg hover:shadow-coworking/25 transition-all duration-500 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative flex items-center">
                          <span className="tracking-wide">{space.ctaLabel}</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-[#0F172A] film-grain">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-section-title font-montserrat font-black text-white mb-6">
                Tout ce dont vous avez <span className="bg-gradient-coworking bg-clip-text text-transparent">besoin</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coworkingFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 font-inter">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-section-title font-montserrat font-black text-white mb-6">
                Nos <span className="bg-gradient-coworking bg-clip-text text-transparent">Tarifs</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingData.coworking.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group ${plan.title.toLowerCase().includes('résident') ? 'lg:scale-105 lg:-mt-4' : ''}`}
                >
                  {plan.title.toLowerCase().includes('résident') && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-coworking text-white px-4 py-1 rounded-full text-sm font-montserrat font-semibold flex items-center glow-coworking">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </div>
                  )}

                  <div className="glass-effect border border-white/10 rounded-4xl p-8 hover:border-white/20 transition-all duration-300 h-full relative">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-montserrat font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-coworking group-hover:bg-clip-text transition-all duration-500">
                        {plan.title}
                      </h3>
                      <div className="text-3xl font-montserrat font-black text-coworking mb-2">
                        {plan.price}
                      </div>
                      <p className="text-white/70 font-inter text-sm">
                        {plan.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start text-white/80">
                          <Check className="w-4 h-4 text-community mr-3 flex-shrink-0 mt-0.5" />
                          <span className="font-inter text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full font-montserrat font-semibold py-3 rounded-2xl transition-all duration-300 ${
                        plan.title.toLowerCase().includes('résident')
                          ? 'bg-gradient-coworking text-white hover:shadow-lg hover:shadow-coworking/25'
                          : 'glass-effect text-white border border-white/20 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      Choisir cette formule
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-[#0F172A] film-grain">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-section-title font-montserrat font-black text-white mb-6">
                Ce qu'en pensent nos <span className="bg-gradient-coworking bg-clip-text text-transparent">membres</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-effect border border-white/10 rounded-4xl p-8"
                >
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-coworking fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-white/80 font-inter mb-8 leading-relaxed italic">
                    "{testimonial.comment}"
                  </blockquote>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-coworking/20">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-montserrat font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-12 h-12 text-coworking mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-white mb-6">
                Prêt à rejoindre notre communauté ?
              </h2>
              <p className="text-xl font-inter text-white/70 mb-8">
                Réservez votre visite gratuite et découvrez votre futur espace de travail premium
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-coworking text-white font-montserrat font-semibold rounded-2xl hover:shadow-lg hover:shadow-coworking/25 transition-all duration-500 glow-coworking"
              >
                Réserver ma visite
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}