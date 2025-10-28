import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Users, Clock, ArrowRight, Star, Check, Calendar, Wifi, Heart } from 'lucide-react';
import SidebarNav from '../../components/Nav/SidebarNav';
import MobileBurger from '../../components/Nav/MobileBurger';
import Footer from '../../components/Footer';

const spaceFeatures = [
  "Canapés lounge confortables",
  "Machine à expresso barista",
  "Jus frais et snacks",
  "Arrière-plan végétal",
  "Prises électriques partout",
  "Wi-Fi haut débit",
  "Éclairage d'ambiance",
  "Musique d'ambiance douce"
];

const spaceGallery = [
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=800"
];

const testimonials = [
  {
    name: "Emma Leroy",
    role: "Designer Graphique",
    comment: "Le lounge café est mon endroit préféré pour les pauses créatives. L'ambiance est parfaite pour se ressourcer.",
    rating: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Lucas Moreau", 
    role: "Entrepreneur",
    comment: "Idéal pour les rencontres informelles et le networking. J'ai noué de belles collaborations autour d'un café !",
    rating: 5,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

export default function LoungeCafe() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0A0A0A] to-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Lounge & Café Connecté"
              className="w-full h-full object-cover opacity-30 ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 to-slate-900/80"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
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
                <Coffee className="w-4 h-4 text-orange-400 mr-2" />
                <span className="text-sm font-inter font-medium text-white/80 tracking-wide">ESPACE N°4</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
                Lounge & Café <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Connecté</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Le spot détente qui booste les idées
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-white mb-8">
                {[
                  { icon: Users, text: '15 places assises', color: 'text-orange-400' },
                  { icon: Clock, text: '8h - 20h', color: 'text-blue-400' },
                  { icon: Coffee, text: 'Café premium', color: 'text-green-400' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    className="flex items-center space-x-3 glass-effect px-6 py-3 rounded-2xl border border-white/10"
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="font-inter font-medium tracking-wide">{stat.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                Voir la galerie
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Description détaillée */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-black text-white mb-6">
                  L'espace détente qui <span className="text-orange-400">inspire</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Canapés lounge, machine à expresso barista, jus frais, arrière-plan végétal et prises partout : parfait pour un brainstorm informel ou une pause networking. Inclus dans tous les pass.
                </p>
                
                <div className="space-y-4">
                  {spaceFeatures.slice(0, 4).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="flex items-center text-gray-300"
                    >
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative h-96 rounded-3xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Lounge café vue d'ensemble"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Zones du lounge */}
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-white mb-6">
                Différentes <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">ambiances</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Zone Café */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Zone Café</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Espace dédié aux boissons avec machine à expresso professionnelle et sélection de thés premium.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Expresso barista</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Thés et infusions</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Jus frais</span>
                  </div>
                </div>
              </motion.div>

              {/* Zone Lounge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Zone Lounge</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Canapés confortables et tables basses pour vos moments de détente et discussions informelles.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Canapés design</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Tables basses</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Éclairage tamisé</span>
                  </div>
                </div>
              </motion.div>

              {/* Zone Végétale */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Zone Verte</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Mur végétal et plantes pour une ambiance naturelle et apaisante, idéale pour la créativité.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Mur végétal</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Plantes dépolluantes</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Lumière naturelle</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-white mb-6">
                Ambiance <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">lounge</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {spaceGallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={image}
                    alt={`Vue ${index + 1} du lounge café`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Équipements complets */}
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-white mb-6">
                Tout pour votre <span className="text-orange-400">confort</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {spaceFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <Check className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <span className="text-white font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-white mb-6">
                Avis des <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">habitués</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
                >
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-white/80 mb-6 leading-relaxed italic">
                    "{testimonial.comment}"
                  </blockquote>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                Envie d'une pause créative ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Le lounge café est inclus dans tous nos pass. Venez découvrir cet espace unique !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/coworking"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Découvrir nos pass
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Réserver une visite
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}