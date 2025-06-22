import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Check, ArrowRight, Sparkles, Monitor, Wifi, Coffee, Shield, Calendar, Phone, Camera, Mic, Utensils, Projector, Headphones, Car, ChevronDown, Star, Zap } from 'lucide-react';

const meetingRooms = [
  {
    id: 1,
    title: "Salle Conférence",
    subtitle: "Pour vos grandes présentations",
    capacity: "2-50 personnes",
    price: "150€/heure",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920",
    features: ["Écran géant 85\"", "Système audio pro", "Streaming HD", "Scène modulable"],
    ideal: "Conférences, Keynotes, Assemblées",
    gradient: "from-indigo-600 to-blue-600"
  },
  {
    id: 2,
    title: "Salle Créative",
    subtitle: "Pour vos brainstormings",
    capacity: "4-20 personnes",
    price: "80€/heure",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920",
    features: ["Murs inscriptibles", "Écrans tactiles", "Mobilier flexible", "Kit créatif"],
    ideal: "Workshops, Design thinking, Brainstorming",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    id: 3,
    title: "Salle Executive",
    subtitle: "Pour vos réunions stratégiques",
    capacity: "6-12 personnes",
    price: "120€/heure",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920",
    features: ["Table ovale premium", "Visio 4K", "Insonorisation totale", "Bar privé"],
    ideal: "Boards, Négociations, Réunions VIP",
    gradient: "from-amber-600 to-orange-600"
  }
];

const allServices = [
  { icon: Monitor, label: "Écrans HD/4K", desc: "De 55\" à 85\"" },
  { icon: Wifi, label: "WiFi Gigabit", desc: "Fibre dédiée" },
  { icon: Coffee, label: "Café Premium", desc: "Barista sur place" },
  { icon: Utensils, label: "Catering", desc: "Menu sur mesure" },
  { icon: Camera, label: "Captation vidéo", desc: "Multi-caméras" },
  { icon: Mic, label: "Sonorisation", desc: "Système pro" },
  { icon: Projector, label: "Vidéoprojecteur", desc: "4K laser" },
  { icon: Headphones, label: "Traduction", desc: "Casques sans fil" },
  { icon: Phone, label: "Assistance", desc: "Support dédié" },
  { icon: Shield, label: "Sécurité", desc: "Accès contrôlé" },
  { icon: Car, label: "Parking", desc: "Places réservées" },
  { icon: Zap, label: "Prises USB", desc: "Chargement rapide" }
];

export default function MeetingRooms() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const currentRoom = meetingRooms[selectedRoom];

  return (
    <section id="salles" className="relative min-h-screen bg-black overflow-hidden py-32">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentRoom.gradient} opacity-10 transition-all duration-1000`}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black"></div>
      </div>

      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center mb-12"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Salles de Réunion
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
          >
            SALLES DE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              RÉUNION
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto"
          >
            Espaces équipés tout compris • Réservation instantanée • Services premium inclus
          </motion.p>
        </motion.div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-8">
          {/* Room selector */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {meetingRooms.map((room, index) => (
              <motion.button
                key={room.id}
                onClick={() => setSelectedRoom(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                whileHover={{ y: -8 }}
                className={`relative group text-left transition-all duration-500 ${
                  selectedRoom === index ? 'scale-105' : 'scale-100 opacity-80 hover:opacity-100'
                }`}
              >
                <div className={`relative rounded-3xl overflow-hidden border ${
                  selectedRoom === index ? 'border-white/30' : 'border-white/10'
                }`}>
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} opacity-20`}></div>
                    
                    {/* Price badge */}
                    <div className="absolute top-6 right-6">
                      <div className={`px-4 py-2 bg-gradient-to-r ${room.gradient} rounded-full backdrop-blur-sm`}>
                        <span className="text-white font-montserrat font-bold text-sm">{room.price}</span>
                      </div>
                    </div>

                    {/* Selected indicator */}
                    {selectedRoom === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-6 left-6"
                      >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-black" />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-montserrat font-bold text-white mb-2">{room.title}</h3>
                    <p className="text-white/60 font-inter text-sm mb-4">{room.subtitle}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/40" />
                        <span className="text-white/80 text-sm font-inter">{room.capacity}</span>
                      </div>
                      <div className="w-px h-4 bg-white/20"></div>
                      <span className="text-white/60 text-sm font-inter">{room.ideal}</span>
                    </div>

                    {/* Features preview */}
                    <div className="flex flex-wrap gap-2">
                      {room.features.slice(0, 2).map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-white/60 text-xs font-inter">
                          {feature}
                        </span>
                      ))}
                      {room.features.length > 2 && (
                        <span className="px-3 py-1 bg-white/5 rounded-full text-white/40 text-xs font-inter">
                          +{room.features.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Services section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
                Tout est inclus pour votre confort
              </h3>
              <p className="text-white/60 font-inter text-lg">
                Services premium disponibles dans toutes nos salles
              </p>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {(showAllServices ? allServices : allServices.slice(0, 8)).map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white/80" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-montserrat font-semibold mb-1">{service.label}</h4>
                          <p className="text-white/40 text-sm font-inter">{service.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Show more button */}
            {!showAllServices && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllServices(true)}
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                >
                  <span className="font-inter">Voir tous les services</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
              <div className="max-w-3xl mx-auto text-center">
                <Sparkles className="w-12 h-12 text-white/60 mx-auto mb-6" />
                
                <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
                  Réservation simple et rapide
                </h3>
                
                <p className="text-white/60 font-inter text-lg mb-8 leading-relaxed">
                  Réservez en ligne 24/7 ou contactez notre équipe pour un accompagnement personnalisé. 
                  Configuration sur mesure, services additionnels, nous nous occupons de tout.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mb-10">
                  <div>
                    <div className="text-3xl font-montserrat font-bold text-white mb-1">98%</div>
                    <div className="text-white/40 text-sm font-inter">Satisfaction client</div>
                  </div>
                  <div>
                    <div className="text-3xl font-montserrat font-bold text-white mb-1">24/7</div>
                    <div className="text-white/40 text-sm font-inter">Réservation en ligne</div>
                  </div>
                  <div>
                    <div className="text-3xl font-montserrat font-bold text-white mb-1">15min</div>
                    <div className="text-white/40 text-sm font-inter">Confirmation rapide</div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/reservation"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <div className="relative bg-white text-black rounded-2xl px-8 py-4 font-montserrat font-bold overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <Calendar className="w-5 h-5" />
                        <span>RÉSERVER MAINTENANT</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+33400000000"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <div className="relative bg-white/10 backdrop-blur-sm text-white rounded-2xl px-8 py-4 font-montserrat font-semibold border border-white/20 overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <Phone className="w-5 h-5" />
                        <span>04 00 00 00 00</span>
                      </div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}