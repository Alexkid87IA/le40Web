import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { useEventRegistration, Event } from '../../hooks/useEventRegistration';
import EventDetailModal from './EventDetailModal';

export default function FeaturedEventsSection() {
  const { upcomingEvents, loading } = useEventRegistration();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

  if (loading) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-black text-center text-white">
        Chargement des événements...
      </section>
    );
  }

  const getCapacityPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const getCapacityStatus = (percentage: number) => {
    if (percentage >= 90) return { text: 'Presque complet', color: 'text-red-400', bg: 'bg-red-500/10' };
    if (percentage >= 70) return { text: 'Places limitées', color: 'text-orange-400', bg: 'bg-orange-500/10' };
    return { text: 'Places disponibles', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
  };

  return (
    <section id="upcoming-events" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white">
              Événements à{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
                Venir
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-inter">
            {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} disponible{filteredEvents.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                onClick={() => setSelectedEvent(event)}
                className="group relative flex cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/30 transition-all duration-300 flex flex-col w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                    <motion.img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: isHovered ? 1.05 : 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold shadow-lg">
                        {event.categoryName}
                      </div>
                    </div>

                    {event.priceMember === 0 && event.priceNonMember === 0 ? (
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-emerald-500 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold">
                        GRATUIT
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur text-slate-900 px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold">
                        dès {Math.min(event.priceMember, event.priceNonMember)}€
                      </div>
                    )}

                    {capacityPercentage >= 70 && (
                      <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3">
                        <div className={`${capacityStatus.bg} ${capacityStatus.color} px-2 py-0.5 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold backdrop-blur-sm`}>
                          {capacityStatus.text}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative p-4 md:p-5 flex flex-col flex-1">
                    <h3 className="text-base md:text-lg font-montserrat font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed font-inter line-clamp-2">
                      {event.shortDescription}
                    </p>

                    <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                      <div className="flex items-center gap-2 text-white/70">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400 shrink-0" />
                        <span className="text-[10px] md:text-xs font-inter">{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 shrink-0" />
                        <span className="text-[10px] md:text-xs font-inter">{formatTime(event.eventDate)} • {event.duration} min</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
                          <span className="text-[10px] md:text-xs text-white/60">{event.currentAttendees}/{event.maxAttendees}</span>
                        </div>
                        {speakers.length > 0 && (
                          <div className="flex -space-x-2">
                            {speakers.slice(0, 2).map((speaker) => (
                              <img
                                key={speaker.id}
                                src={speaker.photoUrl}
                                alt={speaker.name}
                                className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover border-2 border-slate-950"
                              />
                            ))}
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

