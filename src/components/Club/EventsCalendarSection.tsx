import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { upcomingEvents } from '../../data/club/events';

const EventCard = ({ event, index }) => {
  const availableSeats = event.maxParticipants - event.currentParticipants;
  const fillPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-red-500/30 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${event.gradient} mb-3`}>
              {event.type.toUpperCase()}
            </span>
            <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
              {event.title}
            </h3>
            <p className="text-white/60 text-sm font-inter leading-relaxed">{event.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Calendar className="w-4 h-4 text-red-400" />
            <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock className="w-4 h-4 text-red-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin className="w-4 h-4 text-red-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Users className="w-4 h-4 text-red-400" />
            <span>{availableSeats} places restantes</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span>{event.currentParticipants} inscrits</span>
            <span>{event.maxParticipants} max</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${fillPercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full bg-gradient-to-r ${event.gradient}`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {event.isMembersOnly ? (
            <span className="text-xs font-semibold text-rose-400">Membres uniquement</span>
          ) : (
            <span className="text-xs font-semibold text-red-400">Ouvert à tous</span>
          )}
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-white font-semibold text-sm"
          >
            Réserver
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function EventsCalendarSection() {
  const [filter, setFilter] = useState('all');

  const filteredEvents = filter === 'all'
    ? upcomingEvents
    : upcomingEvents.filter(event => event.type === filter);

  const eventTypes = [
    { value: 'all', label: 'Tous' },
    { value: 'afterwork', label: 'Afterwork' },
    { value: 'hotseat', label: 'Hotseat' },
    { value: 'masterclass', label: 'Masterclass' },
    { value: 'formation', label: 'Formation' },
    { value: 'networking', label: 'Networking' },
    { value: 'coworking', label: 'Coworking' },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-medium text-red-400 mb-6"
          >
            CALENDRIER DES ÉVÉNEMENTS
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            PROCHAINS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">ÉVÉNEMENTS</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-inter mb-12">
            Réservez votre place dès maintenant pour nos prochains événements
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {eventTypes.map((type) => (
              <motion.button
                key={type.value}
                onClick={() => setFilter(type.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  filter === type.value
                    ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {type.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">Aucun événement trouvé pour ce filtre</p>
          </div>
        )}
      </div>
    </section>
  );
}
