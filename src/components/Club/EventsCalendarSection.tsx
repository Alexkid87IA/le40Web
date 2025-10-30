import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { upcomingEvents } from '../../data/club/events';

const EventCard = ({ event, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const availableSeats = event.maxParticipants - event.currentParticipants;
  const fillPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />

      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${event.gradient} mb-3`}>
              {event.type.toUpperCase()}
            </span>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-rose-400 transition-all">
              {event.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">{event.description}</p>
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
            <span className="text-xs font-semibold text-emerald-400">Membres uniquement</span>
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
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-semibold text-red-400 mb-6"
          >
            CALENDRIER DES ÉVÉNEMENTS
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Prochains
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400">
              Événements
            </span>
          </h2>

          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
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
