import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Coffee, ArrowRight, Star, Heart, Zap, Target } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

const communityStats = [
  { number: "200+", label: "Membres actifs", icon: Users },
  { number: "50+", label: "Événements/an", icon: Calendar },
  { number: "15+", label: "Partenaires", icon: Heart },
  { number: "4.9★", label: "Satisfaction", icon: Star }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Afterwork Networking",
    date: "25 Jan 2024",
    time: "18h30 - 21h00",
    type: "Networking",
    attendees: 25,
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    title: "Workshop Marketing Digital",
    date: "2 Fév 2024",
    time: "14h00 - 17h00",
    type: "Formation",
    attendees: 15,
    image: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "Pitch Session Startups",
    date: "8 Fév 2024",
    time: "19h00 - 21h30",
    type: "Pitch",
    attendees: 30,
    image: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

const pastEvents = [
  {
    id: 1,
    title: "Conférence IA & Business",
    date: "Décembre 2023",
    attendees: 80,
    image: "https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    title: "Hackathon Innovation",
    date: "Novembre 2023",
    attendees: 45,
    image: "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "Table Ronde Financement",
    date: "Octobre 2023",
    attendees: 35,
    image: "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

const communityBenefits = [
  {
    icon: Zap,
    title: "Networking Actif",
    description: "Rencontrez des entrepreneurs, freelances et experts de tous secteurs",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    icon: Target,
    title: "Opportunités Business",
    description: "Développez votre activité grâce aux collaborations et partenariats",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Coffee,
    title: "Événements Exclusifs",
    description: "Accédez à nos conférences, ateliers et afterworks privés",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Heart,
    title: "Entraide & Support",
    description: "Bénéficiez de l'expérience et des conseils de la communauté",
    color: "from-pink-400 to-pink-600"
  }
];

export default function Community() {
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
                Notre <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Communauté</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Rejoignez un écosystème dynamique d'entrepreneurs, freelances et créateurs qui partagent leurs expériences et construisent l'avenir ensemble
              </p>
            </motion.div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {communityStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Benefits */}
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
                Pourquoi rejoindre notre <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">communauté</span> ?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {communityBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
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
                Événements à <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">venir</span>
              </h2>
              <p className="text-xl text-gray-300">
                Ne manquez pas nos prochains rendez-vous
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {event.type}
                      </div>

                      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center">
                        <Users className="w-3 h-3 text-white mr-1" />
                        <span className="text-white text-xs">{event.attendees}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 text-orange-400 mr-2" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Clock className="w-4 h-4 text-orange-400 mr-2" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        S'inscrire
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
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
                Événements <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">passés</span>
              </h2>
              <p className="text-xl text-gray-300">
                Découvrez nos dernières réalisations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
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
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center">
                        <Users className="w-3 h-3 text-white mr-1" />
                        <span className="text-white text-xs">{event.attendees}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{event.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Prêt à rejoindre notre communauté ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Devenez membre et accédez à tous nos événements exclusifs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Rejoindre la communauté
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/coworking"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Découvrir nos espaces
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