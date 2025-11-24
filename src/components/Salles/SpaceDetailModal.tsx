import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Users, Wifi, Sparkles, Calendar, Clock, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Space } from '../../data/salles/spaces';
import { useCart } from '../../hooks/useCart';

interface SpaceDetailModalProps {
  space: Space | null;
  onClose: () => void;
}

export default function SpaceDetailModal({ space, onClose }: SpaceDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (space) {
      setCurrentImageIndex(0);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedDuration(null);
    }
  }, [space]);

  useEffect(() => {
    if (space) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [space]);

  if (!space) return null;

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const handleAddToCart = (duree: string, price: number) => {
    if (!selectedDate || !selectedTime) {
      alert('Veuillez sélectionner une date et une heure avant de réserver.');
      return;
    }

    addItem({
      id: `salle-${space.id}-${duree.toLowerCase().replace(/\s/g, '-')}-${selectedDate}-${selectedTime}`,
      serviceType: 'meeting-room',
      serviceName: `${space.title} - ${duree}`,
      date: selectedDate,
      startTime: selectedTime,
      endTime: calculateEndTime(selectedTime, duree),
      duration: durationMap[duree] || 'hour',
      price: price,
      quantity: 1,
      image: space.images[0],
      gradient: space.gradient
    });

    setSelectedDuration(duree);
    setTimeout(() => {
      setSelectedDuration(null);
    }, 2000);
  };

  const calculateEndTime = (startTime: string, duration: string): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    let addHours = 1;

    switch (duration) {
      case '2 heures':
        addHours = 2;
        break;
      case '4 heures':
        addHours = 4;
        break;
      case 'Demi-journée':
        addHours = 4;
        break;
      case 'Journée':
        addHours = 8;
        break;
      case 'Soirée complète':
      case 'Soirée':
        addHours = 6;
        break;
      default:
        addHours = 1;
    }

    const endHours = hours + addHours;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const calculatePrice = (duration: string) => {
    let basePrice = space.price;

    switch (duration) {
      case '2 heures':
        return basePrice * 2;
      case '4 heures':
        return basePrice * 4;
      case 'Demi-journée':
        return Math.round(basePrice * 3.5);
      case 'Journée':
        return Math.round(basePrice * 7);
      case 'Soirée complète':
      case 'Soirée':
        return basePrice * 6;
      default:
        return basePrice;
    }
  };

  const durationMap: Record<string, string> = {
    'Heure': 'hour',
    'Demi-journée': 'half-day',
    'Journée': 'day',
    '2 heures': 'hour',
    '4 heures': 'half-day',
    'Soirée complète': 'day',
    'Soirée': 'day'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="bg-gradient-to-br from-zinc-900 to-black rounded-t-3xl md:rounded-3xl max-w-6xl w-full h-[95vh] md:h-auto md:max-h-[90vh] overflow-hidden shadow-2xl border-t border-white/10 md:border md:border-white/10 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-y-auto">
            <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[700px] bg-black flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={space.images[currentImageIndex]}
                  alt={space.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {space.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev =>
                      prev === 0 ? space.images.length - 1 : prev - 1
                    )}
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => setCurrentImageIndex(prev =>
                      prev === space.images.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
                    {space.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className="group"
                      >
                        <div className={`h-1 rounded-full transition-all ${idx === currentImageIndex
                          ? 'w-8 md:w-12 bg-white'
                          : 'w-4 md:w-6 bg-white/30 group-hover:bg-white/50'
                          }`} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-5 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-zinc-900 to-zinc-950 flex-1 overflow-y-auto">
              <div className="flex items-start justify-between mb-5 md:mb-8">
                <div className="flex-1 pr-2">
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-${space.accentColor}-500/10 text-${space.accentColor}-400 mb-3 md:mb-4`}
                  >
                    <space.icon className="w-3.5 h-3.5" />
                    {space.category}
                  </motion.span>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-black text-white mb-3 md:mb-4"
                  >
                    {space.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-400 leading-relaxed text-sm md:text-base"
                  >
                    {space.description}
                  </motion.p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-9 h-9 md:w-10 md:h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2 md:gap-3 text-zinc-400 mb-5 md:mb-10 flex-wrap">
                <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-white/5 rounded-lg">
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">{space.capacity}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-white/5 rounded-lg">
                  <Wifi className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">Wi-Fi 1Gb/s</span>
                </div>
              </div>

              <div className="mb-6 md:mb-10">
                <h3 className="text-base md:text-lg font-montserrat font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  Équipements premium inclus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {space.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-zinc-300 text-xs md:text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-emerald-500/20">
                  <h4 className="text-sm md:text-base font-montserrat font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                    Sélectionnez date et heure
                  </h4>

                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <div>
                      <label htmlFor="date" className="block text-xs md:text-sm text-white/80 mb-2">
                        Date de réservation
                      </label>
                      <input
                        id="date"
                        type="date"
                        min={getTodayDate()}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg md:rounded-xl text-white text-sm md:text-base
                                 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400
                                 [color-scheme:dark]"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-xs md:text-sm text-white/80 mb-2">
                        Heure de début
                      </label>
                      <select
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg md:rounded-xl text-white text-sm md:text-base
                                 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400
                                 cursor-pointer"
                      >
                        <option value="" className="bg-zinc-900">Sélectionner une heure</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time} className="bg-zinc-900">{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {(!selectedDate || !selectedTime) && (
                    <p className="text-emerald-400/80 text-xs mt-3 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Veuillez choisir une date et une heure pour continuer
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm md:text-base font-montserrat font-semibold text-white mb-3 md:mb-4">
                    Choisissez votre durée
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    {space.disponibilites.map((duree, idx) => {
                      const price = calculatePrice(duree);
                      const isSelected = selectedDuration === duree;

                      return (
                        <motion.div
                          key={duree}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl transition-all gap-3 ${
                            isSelected
                              ? 'bg-emerald-500/20 border-2 border-emerald-400'
                              : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                          }`}
                        >
                          <div className="w-full sm:w-auto">
                            <p className="text-white font-medium text-sm md:text-base">{space.title} - {duree}</p>
                            <p className="text-zinc-400 text-xs md:text-sm">
                              {price}€ TTC
                              {selectedTime && (
                                <span className="ml-2 text-emerald-400">
                                  • {selectedTime} - {calculateEndTime(selectedTime, duree)}
                                </span>
                              )}
                            </p>
                          </div>
                          <motion.button
                            whileHover={selectedDate && selectedTime ? { scale: 1.05 } : {}}
                            whileTap={selectedDate && selectedTime ? { scale: 0.95 } : {}}
                            onClick={() => handleAddToCart(duree, price)}
                            disabled={!selectedDate || !selectedTime}
                            className={`w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-medium text-sm md:text-base flex items-center justify-center gap-2 transition-all ${
                              !selectedDate || !selectedTime
                                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                                : isSelected
                                ? 'bg-emerald-500 text-white'
                                : idx === 0
                                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                                : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-4 h-4" />
                                Ajouté
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                Réserver
                              </>
                            )}
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <p className="text-center text-zinc-500 text-xs mt-4">
                  Réservation flexible • Annulation gratuite jusqu'à 24h avant
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
