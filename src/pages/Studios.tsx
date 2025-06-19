import React from 'react';
import { motion } from 'framer-motion';
import { Video, Clock, Users, Check, ArrowRight, Play, Mic, Camera, Calendar } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { studioData, pricingData } from '../data/mockData';

const studioPackages = [
  {
    id: 1,
    title: "Pack Studio",
    price: "200€",
    duration: "Demi-journée",
    description: "Studio + assistance technique",
    features: ["4h de studio", "Technicien dédié", "Matériel inclus", "Fichiers bruts"]
  },
  {
    id: 2,
    title: "Pack Production",
    price: "450€",
    duration: "Journée complète",
    description: "Studio + post-production",
    features: ["8h de studio", "Montage inclus", "Étalonnage", "Livraison 48h"]
  },
  {
    id: 3,
    title: "Pack Expert",
    price: "Sur devis",
    duration: "Projet complet",
    description: "Accompagnement de A à Z",
    features: ["Pré-production", "Tournage multi-caméras", "Post-production avancée", "Diffusion"]
  }
];

const beforeAfterGallery = [
  {
    before: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    after: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Podcast Professionnel"
  },
  {
    before: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=400",
    after: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Interview Corporate"
  },
  {
    before: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=400",
    after: "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Formation en Ligne"
  }
];

export default function Studios() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section with Video Background */}
        <section className="relative py-20 bg-gradient-to-b from-[#0F172A] to-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Studio de tournage"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 to-slate-900/80"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                Studio de <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Production</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Équipements professionnels pour vos contenus vidéo, podcasts et événements en direct
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver un studio
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Voir la visite virtuelle
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Studios Grid */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Nos <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Studios</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studioData.map((studio, index) => (
                <motion.div
                  key={studio.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={studio.image} 
                        alt={studio.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-orange-500/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1">
                        <span className="text-orange-400 font-bold text-sm">{studio.price}</span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                          {studio.title}
                        </h3>
                        <div className="flex items-center text-gray-300">
                          <Users className="w-4 h-4 text-orange-400 mr-1" />
                          <span className="text-sm">{studio.capacity}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {studio.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {studio.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-gray-300">
                            <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Réserver
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Nos <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Packs</span>
              </h2>
              <p className="text-xl text-gray-300">
                Solutions complètes pour tous vos projets de production
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studioPackages.map((pack, index) => (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {pack.title}
                      </h3>
                      <div className="text-3xl font-bold text-orange-400 mb-1">
                        {pack.price}
                      </div>
                      <div className="text-sm text-gray-400 mb-3">{pack.duration}</div>
                      <p className="text-gray-300 text-sm">
                        {pack.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pack.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start text-gray-300">
                          <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                    >
                      Choisir ce pack
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Gallery */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Nos <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Réalisations</span>
              </h2>
              <p className="text-xl text-gray-300">
                Découvrez la qualité de nos productions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beforeAfterGallery.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.after} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-md rounded-full px-3 py-1">
                        <span className="text-white text-xs font-medium">Après</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm">Production réalisée dans nos studios</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Réservez votre <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Studio</span>
              </h2>
              <p className="text-xl text-gray-300">
                Discutons de votre projet et trouvons la solution parfaite
              </p>
            </motion.div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              {/* TODO: Replace with Calendly embed or booking form component */}
              <div className="text-center py-16">
                <Video className="w-16 h-16 text-orange-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Calendly Embed à intégrer
                </h3>
                <p className="text-gray-300 mb-8">
                  Le widget de réservation Calendly sera intégré ici pour permettre la réservation directe des créneaux studio.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver maintenant
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Highlight */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Équipement Pro</h3>
                <p className="text-gray-300 text-sm">Caméras 4K, éclairage LED professionnel et matériel audio haut de gamme</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Studio Podcast</h3>
                <p className="text-gray-300 text-sm">Isolation acoustique parfaite et micros Shure SM7B pour un son cristallin</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Streaming Live</h3>
                <p className="text-gray-300 text-sm">Diffusion en direct multi-plateformes avec régie technique intégrée</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Prêt à créer du contenu exceptionnel ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Notre équipe technique vous accompagne de la conception à la diffusion de vos projets
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                Discuter de votre projet
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