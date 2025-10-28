import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Users, Clock, ArrowRight, Star, Check, Calendar, Wifi, Cloud } from 'lucide-react';
import SidebarNav from '../../components/Nav/SidebarNav';
import MobileBurger from '../../components/Nav/MobileBurger';
import Footer from '../../components/Footer';

const spaceFeatures = [
  "120 m² de terrasse panoramique",
  "Vues imprenables sur la ville",
  "Wi-Fi mesh extérieur",
  "Parasols et protection solaire",
  "Bar mobile pour événements",
  "Éclairage LED d'ambiance",
  "Chauffage extérieur (hiver)",
  "Accès sécurisé par badge"
];

const spaceGallery = [
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=800"
];

const testimonials = [
  {
    name: "Julien Moreau",
    role: "Event Manager",
    comment: "La terrasse rooftop est parfaite pour nos afterworks d'été. La vue est à couper le souffle et l'ambiance unique !",
    rating: 5,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Sarah Dubois", 
    role: "Architecte",
    comment: "J'adore travailler sur la terrasse quand il fait beau. C'est inspirant et ça change complètement du bureau !",
    rating: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

export default function TerrasseRooftop() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0A0A0A] to-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Terrasse Rooftop"
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
                <Sun className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-inter font-medium text-white/80 tracking-wide">ESPACE N°5</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
                Terrasse <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Rooftop</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Travailler au soleil, pitcher sous les étoiles
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-white mb-8">
                {[
                  { icon: Users, text: '25 pers. debout', color: 'text-yellow-400' },
                  { icon: Clock, text: '9h - 21h', color: 'text-blue-400' },
                  { icon: Sun, text: 'Avril - Octobre', color: 'text-orange-400' }
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
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Privatiser la terrasse
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
                  Un espace unique <span className="text-yellow-400">à ciel ouvert</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Rooftop de 120 m² avec vues panoramiques, Wi-Fi mesh extérieur, parasols et bar mobile. Idéal pour afterworks et sessions créatives à ciel ouvert. Disponible d'avril à octobre, météo permitting.
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
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Terrasse rooftop vue d'ensemble"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Disponibilité saisonnière */}
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
                Disponibilité <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">saisonnière</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Saison ouverte */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Saison Ouverte</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  D'avril à octobre, profitez pleinement de notre terrasse avec tous les équipements disponibles.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Accès libre aux membres</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Événements et afterworks</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Privatisation possible</span>
                  </div>
                </div>
              </motion.div>

              {/* Saison fermée */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Hors Saison</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  De novembre à mars, la terrasse reste accessible avec chauffage extérieur pour les événements spéciaux.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Chauffage extérieur</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Événements sur demande</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Protection météo</span>
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
                Vues <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">panoramiques</span>
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
                    alt={`Vue ${index + 1} de la terrasse rooftop`}
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
                Équipements <span className="text-yellow-400">extérieurs</span>
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
                Expériences <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">uniques</span>
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
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
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
                Envie de travailler au soleil ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Réservez votre créneau sur la terrasse ou privatisez l'espace pour votre événement
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Privatiser la terrasse
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Organiser un événement
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