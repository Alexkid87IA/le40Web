import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ArrowRight, Sparkles, Filter, Star } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

const eventCategories = ["Tous", "Networking", "Formation", "Conférence", "Atelier", "Afterwork"];

const upcomingEvents = [
  {
    id: 1,
    title: "Afterwork Networking Premium",
    date: "2024-02-15",
    time: "18h30 - 21h00",
    category: "Networking",
    attendees: 35,
    maxAttendees: 50,
    price: "Gratuit",
    description: "Rencontrez des entrepreneurs passionnés dans une ambiance décontractée avec cocktails et petits fours.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: true
  },
  {
    id: 2,
    title: "Workshop : Lever des fonds en 2024",
    date: "2024-02-22",
    time: "14h00 - 17h00",
    category: "Formation",
    attendees: 12,
    maxAttendees: 20,
    price: "49€",
    description: "Stratégies et techniques pour réussir sa levée de fonds avec des experts du secteur.",
    image: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: false
  },
  {
    id: 3,
    title: "Conférence : L'IA au service des PME",
    date: "2024-03-05",
    time: "19h00 - 21h00",
    category: "Conférence",
    attendees: 45,
    maxAttendees: 80,
    price: "25€",
    description: "Comment intégrer l'intelligence artificielle dans votre stratégie d'entreprise.",
    image: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: true
  },
  {
    id: 4,
    title: "Atelier Marketing Digital",
    date: "2024-03-12",
    time: "10h00 - 16h00",
    category: "Atelier",
    attendees: 8,
    maxAttendees: 15,
    price: "89€",
    description: "Masterclass intensive sur les stratégies marketing digital qui convertissent.",
    image: "https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: false
  },
  {
    id: 5,
    title: "Pitch Session Startups",
    date: "2024-03-20",
    time: "18h00 - 20h30",
    category: "Networking",
    attendees: 28,
    maxAttendees: 40,
    price: "Gratuit",
    description: "Présentez votre startup devant un panel d'investisseurs et d'entrepreneurs expérimentés.",
    image: "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: false
  }
];

const pastEvents = [
  {
    id: 1,
    title: "Conférence IA & Business",
    date: "Décembre 2023",
    attendees: 80,
    rating: 4.8,
    image: "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "Hackathon Innovation",
    date: "Novembre 2023",
    attendees: 45,
    rating: 4.9,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    title: "Table Ronde Financement",
    date: "Octobre 2023",
    attendees: 35,
    rating: 4.7,
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredEvents = upcomingEvents.filter(event => 
    selectedCategory === "Tous" || event.category === selectedCategory
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <HeaderNav />
      <MobileBurger />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0F172A] to-slate-900 film-grain">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
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
                <Calendar className="w-4 h-4 text-violet-400 mr-2" />
                <span className="text-sm font-inter font-medium text-white/80 tracking-wide">ÉVÉNEMENTS PREMIUM</span>
              </motion.div>

              <h1 className="text-hero font-montserrat font-black text-white mb-6">
                Nos <span className="gradient-text">Événements</span>
              </h1>
              <p className="text-body-large font-inter text-white/70 max-w-4xl mx-auto">
                Participez à nos ateliers, conférences et événements networking pour développer votre réseau et vos compétences
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-12 bg-slate-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center"
              >
                <Filter className="w-5 h-5 text-white/60 mr-3" />
                <span className="text-white/60 font-inter">Filtrer par catégorie :</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {eventCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-2xl font-montserrat font-semibold transition-all duration-500 ${
                      selectedCategory === category
                        ? 'bg-gradient-primary text-white glow-effect'
                        : 'glass-effect text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
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
                Événements à <span className="gradient-text">venir</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative"
                >
                  {event.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-4 py-1 rounded-full text-xs font-montserrat font-semibold flex items-center glow-effect z-10">
                      <Star className="w-3 h-3 mr-1" />
                      FEATURED
                    </div>
                  )}

                  <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full relative">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 to-transparent" />
                      
                      <div className="absolute top-4 left-4 bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold">
                        {event.category}
                      </div>

                      <div className="absolute top-4 right-4 glass-effect border border-white/20 rounded-full px-3 py-1">
                        <span className="text-white font-inter text-xs font-medium">{event.price}</span>
                      </div>

                      <div className="absolute bottom-4 right-4 glass-effect border border-white/20 rounded-full px-3 py-1 flex items-center">
                        <Users className="w-3 h-3 text-white mr-1" />
                        <span className="text-white text-xs">{event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </div>

                    <div className="p-6 relative">
                      <h3 className="text-xl font-montserrat font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-white/70">
                          <Calendar className="w-4 h-4 text-violet-400 mr-2" />
                          <span className="font-inter text-sm">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <Clock className="w-4 h-4 text-fuchsia-400 mr-2" />
                          <span className="font-inter text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <MapPin className="w-4 h-4 text-community mr-2" />
                          <span className="font-inter text-sm">Le 40 - Paris</span>
                        </div>
                      </div>

                      <p className="text-white/70 font-inter text-sm mb-6 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-primary text-white font-montserrat font-semibold py-3 rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 flex items-center justify-center relative overflow-hidden glow-effect"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative flex items-center">
                          <span className="tracking-wide">S'inscrire</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
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
                Événements <span className="gradient-text">passés</span>
              </h2>
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
                  <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 flex items-center glass-effect border border-white/20 rounded-full px-3 py-1">
                        <Star className="w-3 h-3 text-violet-400 mr-1" />
                        <span className="text-white text-xs">{event.rating}</span>
                      </div>

                      <div className="absolute bottom-4 right-4 glass-effect border border-white/20 rounded-full px-3 py-1 flex items-center">
                        <Users className="w-3 h-3 text-white mr-1" />
                        <span className="text-white text-xs">{event.attendees}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-montserrat font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                        {event.title}
                      </h3>
                      <p className="text-white/60 font-inter text-sm">{event.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-12 h-12 text-violet-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-white mb-6">
                Organisez votre événement
              </h2>
              <p className="text-xl font-inter text-white/70 mb-8">
                Vous souhaitez organiser un événement dans nos espaces ? Contactez-nous pour discuter de votre projet
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-montserrat font-semibold rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 glow-effect"
              >
                Organiser un événement
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