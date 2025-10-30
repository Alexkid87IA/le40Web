import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, X, Check, Tag, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UpcomingEvent } from '../../data/events/upcomingEvents';
import { eventSpeakers } from '../../data/events/speakers';
import { useCart } from '../../hooks/useCart';

interface EventDetailModalProps {
  event: UpcomingEvent | null;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const [selectedTicketType, setSelectedTicketType] = useState<'member' | 'non-member'>('non-member');
  const { addItem } = useCart();

  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && event) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [event, onClose]);

  if (!event) return null;

  const speakers = eventSpeakers.filter(speaker => event.speakerIds.includes(speaker.id));
  const capacityPercentage = (event.currentAttendees / event.maxAttendees) * 100;
  const spotsLeft = event.maxAttendees - event.currentAttendees;

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

  const selectedPrice = selectedTicketType === 'member' ? event.priceMember : event.priceNonMember;

  const handleAddToCart = () => {
    addItem({
      id: `event-${event.id}-${selectedTicketType}`,
      serviceType: 'event',
      serviceName: `${event.title} (${selectedTicketType === 'member' ? 'Membre' : 'Visiteur'})`,
      date: event.eventDate,
      duration: 'hour',
      price: selectedPrice,
      quantity: 1,
      image: event.imageUrl,
      gradient: 'from-cyan-500 to-blue-500'
    });
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-slate-950/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                    {event.categoryName}
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold">
                    {event.difficultyLevel}
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-6">
                    {event.title}
                  </h3>

                  <p className="text-white/80 text-lg leading-relaxed font-inter mb-8">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-white/70 bg-white/5 p-4 rounded-xl">
                      <Calendar className="w-6 h-6 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-xs text-white/50 mb-1">Date</div>
                        <div className="text-sm font-semibold text-white">{formatDate(event.eventDate)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-white/70 bg-white/5 p-4 rounded-xl">
                      <Clock className="w-6 h-6 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-xs text-white/50 mb-1">Horaire</div>
                        <div className="text-sm font-semibold text-white">{formatTime(event.eventDate)} • {event.duration} min</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-white/70 bg-white/5 p-4 rounded-xl">
                      <MapPin className="w-6 h-6 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-xs text-white/50 mb-1">Lieu</div>
                        <div className="text-sm font-semibold text-white">{event.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-white/70 bg-white/5 p-4 rounded-xl">
                      <Users className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs text-white/50 mb-1">Participants</div>
                        <div className="text-sm font-semibold text-white mb-2">{event.currentAttendees}/{event.maxAttendees}</div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${capacityPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {spotsLeft <= 10 && spotsLeft > 0 && (
                    <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 p-4 rounded-xl mb-8">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold mb-1">Places limitées !</div>
                        <div className="text-sm">Plus que {spotsLeft} place{spotsLeft > 1 ? 's' : ''} disponible{spotsLeft > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  )}

                  {speakers.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                      <h4 className="text-xl font-montserrat font-bold text-white mb-6">
                        Intervenant{speakers.length > 1 ? 's' : ''}
                      </h4>

                      <div className="space-y-4">
                        {speakers.map((speaker) => (
                          <div key={speaker.id} className="flex items-start gap-4">
                            <img
                              src={speaker.photoUrl}
                              alt={speaker.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shrink-0"
                            />
                            <div>
                              <div className="text-lg font-bold text-white mb-1">{speaker.name}</div>
                              <div className="text-sm text-cyan-400 mb-2">{speaker.title}</div>
                              <div className="text-sm text-white/60 leading-relaxed">{speaker.bio}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.prerequisites && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                      <h4 className="text-lg font-montserrat font-bold text-white mb-3">Prérequis</h4>
                      <p className="text-white/70 font-inter">{event.prerequisites}</p>
                    </div>
                  )}

                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {event.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white/60 text-sm"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h4 className="text-2xl font-montserrat font-bold text-white mb-6">Choisissez votre billet</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <button
                        onClick={() => setSelectedTicketType('member')}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedTicketType === 'member'
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        {selectedTicketType === 'member' && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="text-sm text-white/60 mb-2">Membres du Club</div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {event.priceMember === 0 ? 'Gratuit' : `${event.priceMember}€`}
                        </div>
                        <div className="text-xs text-white/50">Tarif préférentiel membres</div>
                      </button>

                      <button
                        onClick={() => setSelectedTicketType('non-member')}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedTicketType === 'non-member'
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        {selectedTicketType === 'non-member' && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="text-sm text-white/60 mb-2">Visiteurs</div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {event.priceNonMember === 0 ? 'Gratuit' : `${event.priceNonMember}€`}
                        </div>
                        <div className="text-xs text-white/50">Tarif standard</div>
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={spotsLeft === 0}
                      className={`w-full py-4 px-6 rounded-xl font-montserrat font-bold shadow-lg transition-all ${
                        spotsLeft === 0
                          ? 'bg-white/10 text-white/40 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white'
                      }`}
                    >
                      {spotsLeft === 0 ? 'Événement complet' : 'Ajouter au panier'}
                    </motion.button>

                    {selectedPrice === 0 && (
                      <div className="mt-4 text-center text-sm text-white/60">
                        Cet événement est gratuit. Réservez votre place dès maintenant !
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
