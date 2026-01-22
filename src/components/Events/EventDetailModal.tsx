import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, X, Check, ArrowRight, TrendingUp, Target, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpcomingEvent } from '../../data/events/upcomingEvents';
import { eventSpeakers } from '../../data/events/speakers';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

interface EventDetailModalProps {
  event: UpcomingEvent | null;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const navigate = useNavigate();
  const [selectedTicketType, setSelectedTicketType] = useState<'member' | 'non-member'>('non-member');
  const [dragY, setDragY] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addLocalItem, setIsOpen } = useUnifiedCart();

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

  const speakers = event.speakerIds?.length 
    ? eventSpeakers.filter(speaker => event.speakerIds.includes(speaker.id))
    : [];
  const capacityPercentage = (event.currentAttendees / event.maxAttendees) * 100;
  const spotsLeft = event.maxAttendees - event.currentAttendees;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
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
    setIsProcessing(true);
    
    addLocalItem({
      serviceType: 'event',
      serviceName: `${event.title} (${selectedTicketType === 'member' ? 'Membre' : 'Visiteur'})`,
      date: event.eventDate,
      startTime: formatTime(event.eventDate),
      duration: 'hour',
      price: selectedPrice,
      quantity: 1,
      image: event.imageUrl,
      gradient: 'from-cyan-500 to-blue-500'
    });
    
    // Fermer le panier, fermer le modal, et rediriger vers checkout
    setTimeout(() => {
      setIsOpen(false);
      onClose();
      document.body.style.overflow = 'unset';
      navigate('/checkout');
    }, 300);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
    setDragY(0);
  };

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[9999] flex items-start md:items-center justify-center overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 50 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-3xl mt-auto md:my-8 touch-pan-y"
          style={{ maxHeight: 'calc(100vh - env(safe-area-inset-top) - 20px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-slate-950/95 backdrop-blur-xl border border-white/20 rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden">
            <div className="lg:hidden sticky top-0 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="w-12 h-1 bg-white/30 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2"></div>
              <h3 className="text-white font-montserrat font-bold text-base pt-4 truncate">{event.title}</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all group"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="hidden lg:flex absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="overflow-y-auto lg:max-h-[85vh]">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-full">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/40 to-transparent" />

                  <div className="relative h-full p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold mb-4">
                        {event.categoryName}
                      </div>

                      <h3 className="text-3xl font-montserrat font-black text-white mb-3 leading-tight">
                        {event.title}
                      </h3>

                      {spotsLeft <= 10 && spotsLeft > 0 && (
                        <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3 py-1.5 rounded-lg text-xs font-bold mb-4">
                          <TrendingUp className="w-3 h-3" />
                          Plus que {spotsLeft} places !
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/90">
                        <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
                        <span className="text-sm font-semibold">{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                        <span className="text-sm font-semibold">{formatTime(event.eventDate)} • {event.duration} min</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                        <span className="text-sm font-semibold">{event.location}</span>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {event.currentAttendees}/{event.maxAttendees}
                          </span>
                          <span>{Math.round(capacityPercentage)}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${capacityPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col">
                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-montserrat font-bold text-white mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-cyan-400" />
                        Pourquoi participer ?
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm">Contenu exclusif et actionnable immédiatement</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm">Networking avec des entrepreneurs motivés</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm">Accélération de votre projet professionnel</span>
                        </div>
                        {speakers.length > 0 && (
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="text-white/70 text-sm">Intervenants experts reconnus dans leur domaine</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {speakers.length > 0 && (
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-sm text-white/50 mb-3 font-semibold">Avec {speakers.length > 1 ? 'les experts' : "l'expert"}</div>
                        <div className="space-y-3">
                          {speakers.slice(0, 1).map((speaker) => (
                            <div key={speaker.id} className="flex items-center gap-3">
                              <img
                                src={speaker.photoUrl}
                                alt={speaker.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shrink-0"
                              />
                              <div>
                                <div className="text-sm font-bold text-white">{speaker.name}</div>
                                <div className="text-xs text-cyan-400">{speaker.title}</div>
                              </div>
                            </div>
                          ))}
                          {speakers.length > 1 && (
                            <div className="text-xs text-white/50">+ {speakers.length - 1} autre{speakers.length > 2 ? 's' : ''} intervenant{speakers.length > 2 ? 's' : ''}</div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/20">
                      <div className="flex items-start gap-3 mb-4">
                        <TrendingUp className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-white mb-1">Investissement stratégique</div>
                          <div className="text-xs text-white/60">Une seule action concrète appliquée peut générer un ROI considérable pour votre business</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedTicketType('member')}
                        className={`flex-1 relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedTicketType === 'member'
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        {selectedTicketType === 'member' && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="text-xs text-white/50 mb-1">Membre</div>
                        <div className="text-2xl font-bold text-white">
                          {event.priceMember === 0 ? 'Gratuit' : `${event.priceMember}€`}
                        </div>
                      </button>

                      <button
                        onClick={() => setSelectedTicketType('non-member')}
                        className={`flex-1 relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedTicketType === 'non-member'
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        {selectedTicketType === 'non-member' && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="text-xs text-white/50 mb-1">Visiteur</div>
                        <div className="text-2xl font-bold text-white">
                          {event.priceNonMember === 0 ? 'Gratuit' : `${event.priceNonMember}€`}
                        </div>
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={spotsLeft === 0 || isProcessing}
                      className={`w-full py-4 px-6 rounded-xl font-montserrat font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                        spotsLeft === 0 || isProcessing
                          ? 'bg-white/10 text-white/40 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Chargement...</span>
                        </>
                      ) : (
                        <>
                          <span>{spotsLeft === 0 ? 'Événement complet' : 'Réserver ma place'}</span>
                          {spotsLeft > 0 && <ArrowRight className="w-5 h-5" />}
                        </>
                      )}
                    </motion.button>

                    {selectedPrice === 0 && spotsLeft > 0 && (
                      <div className="text-center text-xs text-white/50">
                        Gratuit • Réservation obligatoire
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}