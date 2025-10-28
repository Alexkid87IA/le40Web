import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Users, Clock, ArrowRight, Star, Check, Calendar, Mic, Video } from 'lucide-react';
import SidebarNav from '../../components/Nav/SidebarNav';
import MobileBurger from '../../components/Nav/MobileBurger';
import Footer from '../../components/Footer';

const spaceFeatures = [
  "Cabines insonorisées",
  "Bureau rabattable intégré",
  "Lumière douce LED",
  "Ventilation silencieuse",
  "Écran 32'' pour visio",
  "Anneau LED professionnel",
  "Réservation par app",
  "Nettoyage après chaque usage"
];

const spaceGallery = [
  "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=800"
];

const testimonials = [
  {
    name: "Claire Rousseau",
    role: "Consultante RH",
    comment: "Parfait pour mes entretiens confidentiels. L'isolation phonique est excellente et l'équipement vidéo très professionnel.",
    rating: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "David Chen", 
    role: "Commercial",
    comment: "Les phone box sont un game-changer pour mes appels clients. Je peux me concentrer sans déranger personne.",
    rating: 5,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

export default function PhoneBox() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0A0A0A] to-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Phone Box & Call Rooms"
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
                <Phone className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm font-inter font-medium text-white/80 tracking-wide">ESPACE N°3</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
                Cabines Téléphoniques & <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Salles d'Appel</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Passez vos appels en toute confidentialité
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-white mb-8">
                {[
                  { icon: Users, text: '1-3 personnes', color: 'text-green-400' },
                  { icon: Clock, text: '7h - 22h', color: 'text-blue-400' },
                  { icon: Video, text: 'Équipement vidéo', color: 'text-purple-400' }
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
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Réserver
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
                  Confidentialité et <span className="text-green-400">professionnalisme</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Cabines insonorisées avec bureau rabattable, lumière douce et ventilation silencieuse ; call rooms équipées d'écran 32'' et anneau LED pour visios impeccables. Réservable à la demi-heure depuis l'appli interne.
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
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Phone box vue d'ensemble"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Types d'espaces */}
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
                Deux types d'<span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">espaces</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Cabine Téléphonique</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Cabine individuelle parfaite pour vos appels confidentiels et entretiens téléphoniques.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">1 personne</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Isolation phonique totale</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Bureau rabattable</span>
                  </div>
                </div>
              </motion.div>

              {/* Call Room */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Salle d'Appel</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Salle équipée pour vos visioconférences professionnelles avec un rendu vidéo impeccable.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">2-3 personnes</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Écran 32'' HD</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-sm">Éclairage LED professionnel</span>
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
                Nos <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">installations</span>
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
                    alt={`Vue ${index + 1} des phone box`}
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
                Équipements <span className="text-green-400">inclus</span>
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
                Retours <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">utilisateurs</span>
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
                      <Star key={i} className="w-5 h-5 text-green-400 fill-current" />
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
                Besoin d'un espace pour vos appels ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Réservez votre cabine ou salle d'appel dès maintenant
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Nous contacter
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