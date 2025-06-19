import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Check, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { meetingRooms } from '../data/mockData';

// Mock calendar data
const mockCalendar = {
  currentMonth: 'Janvier 2024',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    available: Math.random() > 0.3, // 70% availability
    bookings: Math.floor(Math.random() * 3)
  }))
};

const roomFeatures = [
  "Écrans haute définition",
  "Connexion wifi fibré",
  "Système de visioconférence",
  "Tableau blanc interactif",
  "Climatisation",
  "Éclairage modulable",
  "Isolation phonique",
  "Accès sécurisé"
];

export default function Salles() {
  const [selectedRoom, setSelectedRoom] = useState(meetingRooms[0]);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0F172A] to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                Salles de <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Réunion</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Espaces équipés et modulables pour tous vos rendez-vous professionnels, réunions et présentations
              </p>
            </motion.div>
          </div>
        </section>

        {/* Rooms Grid */}
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
                Nos <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Espaces</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {meetingRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className={`bg-white/5 backdrop-blur-md border rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full ${
                    selectedRoom.id === room.id ? 'border-orange-400/50 bg-white/10' : 'border-white/10 hover:border-white/20'
                  }`}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {room.title}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-400">{room.price}</div>
                        {room.price !== "Sur devis" && <div className="text-sm text-gray-400">par heure</div>}
                      </div>
                    </div>

                    <div className="flex items-center mb-4 text-gray-300">
                      <Users className="w-5 h-5 text-orange-400 mr-2" />
                      <span className="font-medium">{room.capacity}</span>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {room.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-300">
                          <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {room.features.length > 3 && (
                        <div className="text-sm text-orange-400">
                          +{room.features.length - 3} autres équipements
                        </div>
                      )}
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Calendar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-white mb-8">
                  Disponibilités - <span className="text-orange-400">{selectedRoom.title}</span>
                </h3>
                
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <h4 className="text-xl font-semibold text-white">{mockCalendar.currentMonth}</h4>
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
                      <div key={day} className="text-center text-gray-400 text-sm font-medium py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {mockCalendar.days.map((day) => (
                      <motion.button
                        key={day.day}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`aspect-square rounded-lg text-sm font-medium transition-all duration-200 ${
                          day.available
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-red-500/20 text-red-400 cursor-not-allowed'
                        }`}
                      >
                        {day.day}
                      </motion.button>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500/20 rounded mr-2"></div>
                      <span className="text-gray-300">Disponible</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500/20 rounded mr-2"></div>
                      <span className="text-gray-300">Occupé</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Room Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-white mb-8">
                  Détails de la salle
                </h3>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-2xl font-bold text-white">{selectedRoom.title}</h4>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-400">{selectedRoom.price}</div>
                      {selectedRoom.price !== "Sur devis" && <div className="text-sm text-gray-400">par heure</div>}
                    </div>
                  </div>

                  <div className="flex items-center mb-6 text-gray-300">
                    <Users className="w-6 h-6 text-orange-400 mr-3" />
                    <span className="text-lg font-medium">{selectedRoom.capacity}</span>
                  </div>

                  <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                    {selectedRoom.description}
                  </p>

                  <h5 className="text-lg font-semibold text-white mb-4">Équipements inclus :</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {selectedRoom.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center text-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Réserver cette salle
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Additional Features */}
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
                Tous nos <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">équipements</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {roomFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center"
                >
                  <Check className="w-6 h-6 text-green-400 mx-auto mb-3" />
                  <span className="text-white text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
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
                Besoin d'un espace sur-mesure ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Nous proposons également des configurations personnalisées pour vos événements spéciaux
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                Nous contacter
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