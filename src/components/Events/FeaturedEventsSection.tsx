import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ArrowRight, Star } from 'lucide-react';
import { upcomingEvents, UpcomingEvent } from '../../data/events/upcomingEvents';
import { eventSpeakers } from '../../data/events/speakers';
import { useState } from 'react';
import EventDetailModal from './EventDetailModal';

export default function FeaturedEventsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);

  const filteredEvents = upcomingEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventSpeakers = (speakerIds: string[]) => {
    return eventSpeakers.filter(speaker => speakerIds.includes(speaker.id));
  };

  const getCapacityPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const getCapacityStatus = (percentage: number) => {
    if (percentage >= 90) return { text: 'Presque complet', color: 'text-red-400', bg: 'bg-red-500/10' };
    if (percentage >= 70) return { text: 'Places limitées', color: 'text-orange-400', bg: 'bg-orange-500/10' };
    return { text: 'Places disponibles', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
  };

  return (
    <section id="upcoming-events" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: 'scaleY(-1)',
            filter: 'brightness(0.6)',
            playbackRate: 0.5
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.5;
            }
          }}
        >
          <source
            src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761792125/f6861355-bc98-4c72-b9bc-fb13a1abdfb7_i7v3kj.mp4#t=0.1"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-slate-950/30 to-black/40" />
        <motion.div
          className="absolute top-40 left-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white">
              Événements à{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
                Venir
              </span>
            </h2>
          </div>
          <p className="text-xl text-white/60 font-inter">
            {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} disponible{filteredEvents.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
          {filteredEvents.map((event, index) => {
            const capacityPercentage = getCapacityPercentage(event.currentAttendees, event.maxAttendees);
            const capacityStatus = getCapacityStatus(capacityPercentage);
            const speakers = getEventSpeakers(event.speakerIds);
            const isHovered = hoveredCard === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredCard(event.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative flex"
              >
                {event.isFeatured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-montserrat font-bold shadow-lg">
                      <Star className="w-3 h-3" />
                      ÉVÉNEMENT PHARE
                    </div>
                  </div>
                )}

                <div className="relative overflow-hidden rounded-3xl bg-slate-950/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-500 flex flex-col w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative h-64 overflow-hidden shrink-0">
                    <motion.img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                    <div className="absolute top-6 left-6 flex items-center gap-3">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                        {event.categoryName}
                      </div>
                      <div className={`${capacityStatus.bg} ${capacityStatus.color} px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm`}>
                        {capacityStatus.text}
                      </div>
                    </div>

                    {event.priceMember === 0 && event.priceNonMember === 0 ? (
                      <div className="absolute top-6 right-6 bg-emerald-500/90 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm">
                        GRATUIT
                      </div>
                    ) : (
                      <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold">
                        dès {Math.min(event.priceMember, event.priceNonMember)}€
                      </div>
                    )}
                  </div>

                  <div className="relative p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500">
                      {event.title}
                    </h3>

                    <p className="text-white/70 mb-6 leading-relaxed font-inter line-clamp-2 h-12">
                      {event.shortDescription}
                    </p>

                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center gap-3 text-white/70">
                        <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
                        <span className="text-sm font-inter">{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                        <span className="text-sm font-inter">{formatTime(event.eventDate)} • {event.duration} min</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                        <span className="text-sm font-inter">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <Users className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm font-inter mb-2">
                            <span>{event.currentAttendees}/{event.maxAttendees} participants</span>
                            <span className="text-white/50">{Math.round(capacityPercentage)}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${capacityPercentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      {speakers.length > 0 && (
                        <div className="mb-6 pb-6 border-b border-white/10">
                          <div className="text-sm text-white/50 mb-3 font-inter">Intervenant{speakers.length > 1 ? 's' : ''}</div>
                          <div className="flex items-center gap-3 flex-wrap">
                            {speakers.slice(0, 2).map((speaker) => (
                              <div key={speaker.id} className="flex items-center gap-2 min-w-0">
                                <img
                                  src={speaker.photoUrl}
                                  alt={speaker.name}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-white truncate">{speaker.name}</div>
                                  <div className="text-xs text-white/50 truncate">{speaker.title}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedEvent(event)}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-montserrat font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                        >
                          <span>S'inscrire</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        {event.difficultyLevel && (
                          <div className="px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/60 text-xs font-semibold whitespace-nowrap">
                            {event.difficultyLevel}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Aucun événement trouvé</h3>
            <p className="text-white/60 mb-6">Aucun événement ne correspond à votre recherche dans cette catégorie</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all duration-300"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseFeaturedEvents">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFeaturedEvents)" />
        </svg>
      </div>

      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
}

