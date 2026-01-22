import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Users, Wifi, Star, Calendar, Clock, ShoppingCart, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

interface SpaceItem {
  id: string;
  title: string;
  capacity: string;
  description?: string;
  images: string[];
  price?: number;
  priceUnit?: string;
  gradient?: string;
  features?: string[];
  disponibilites?: string[];
  variants?: Array<{
    id: string;
    title: string;
    price: number;
  }>;
}

interface SpaceDetailModalProps {
  space: SpaceItem | null;
  onClose: () => void;
}

const defaultFeatures = [
  'Wi-Fi haut débit',
  'Écran de présentation',
  'Climatisation',
  'Café & thé offerts'
];

const defaultDisponibilites = ['Heure', 'Demi-journée', 'Journée'];

const defaultGradients = [
  'from-cyan-600 to-teal-600',
  'from-emerald-600 to-teal-600',
  'from-violet-600 to-purple-600',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500'
];

export default function SpaceDetailModal({ space, onClose }: SpaceDetailModalProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  
  // IMPORTANT: On récupère addLocalItem ET setIsOpen pour contrôler le panier
  const { addLocalItem, setIsOpen } = useUnifiedCart();

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

  const images = space.images && space.images.length > 0 ? space.images : ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'];
  const features = space.features && space.features.length > 0 ? space.features : defaultFeatures;
  const disponibilites = space.disponibilites && space.disponibilites.length > 0 ? space.disponibilites : defaultDisponibilites;
  const gradient = space.gradient || defaultGradients[0];
  
  const getBasePrice = (): number => {
    if (space.price !== undefined) {
      return space.price;
    }
    if (space.variants && space.variants.length > 0) {
      return space.variants[0].price;
    }
    return 50;
  };

  const basePrice = getBasePrice();

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

    setIsProcessing(duree);

    // Ajouter au panier local
    addLocalItem({
      serviceType: 'meeting-room',
      serviceName: `${space.title} - ${duree}`,
      date: selectedDate,
      startTime: selectedTime,
      endTime: calculateEndTime(selectedTime, duree),
      duration: durationMap[duree] || 'hour',
      price: price,
      quantity: 1,
      image: images[0],
      gradient: gradient
    });

    setSelectedDuration(duree);
    
    // CORRECTION: Fermer le panier latéral, fermer le modal, puis naviguer
    setTimeout(() => {
      setIsOpen(false); // Fermer le panier latéral
      onClose(); // Fermer le modal
      document.body.style.overflow = 'unset';
      navigate('/checkout'); // Aller à la page récap
    }, 300);
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
      case 'Demi-journée (4h)':
        addHours = 4;
        break;
      case 'Journée':
      case 'Journée complète':
      case 'Journée complète (8h)':
        addHours = 8;
        break;
      case 'Soirée complète':
      case 'Soirée complète (6h)':
      case 'Soirée':
      case 'Soirée (6h)':
        addHours = 6;
        break;
      default:
        addHours = 1;
    }

    const endHours = hours + addHours;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const calculatePrice = (duration: string) => {
    if (space.variants && space.variants.length > 0) {
      const variant = space.variants.find(v => 
        v.title.toLowerCase().includes(duration.toLowerCase()) ||
        duration.toLowerCase().includes(v.title.toLowerCase().split(' ')[0])
      );
      if (variant) return variant.price;
    }

    switch (duration) {
      case '2 heures':
        return basePrice * 2;
      case '4 heures':
        return basePrice * 4;
      case 'Demi-journée':
      case 'Demi-journée (4h)':
        return Math.round(basePrice * 3.5);
      case 'Journée':
      case 'Journée complète':
      case 'Journée complète (8h)':
        return Math.round(basePrice * 7);
      case 'Soirée complète':
      case 'Soirée complète (6h)':
      case 'Soirée':
      case 'Soirée (6h)':
        return basePrice * 6;
      case 'Heure':
      case '1 heure':
      default:
        return basePrice;
    }
  };

  const durationMap: Record<string, string> = {
    'Heure': 'hour',
    '1 heure': 'hour',
    'Demi-journée': 'half-day',
    'Demi-journée (4h)': 'half-day',
    'Journée': 'day',
    'Journée complète': 'day',
    'Journée complète (8h)': 'day',
    '2 heures': 'hour',
    '4 heures': 'half-day',
    'Soirée complète': 'day',
    'Soirée complète (6h)': 'day',
    'Soirée': 'day',
    'Soirée (6h)': 'day'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/10 relative"
          onClick={e => e.stopPropagation()}
        >
          {/* CORRECTION: Conteneur scrollable */}
          <div className="grid md:grid-cols-2 max-h-[90vh]">
            {/* Image - fixe sur desktop */}
            <div className="relative h-48 sm:h-64 md:h-full md:min-h-[500px] bg-zinc-900 md:sticky md:top-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${space.title} - Image ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-20`} />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </button>

                  <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? 'bg-white w-6'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CORRECTION: Contenu scrollable */}
            <div className="p-4 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div className="flex-1 pr-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                    {space.description || `Espace professionnel idéal pour vos réunions et événements. Capacité: ${space.capacity}.`}
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

              <div className="flex items-center gap-2 md:gap-3 text-zinc-400 mb-5 md:mb-8 flex-wrap">
                <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-white/5 rounded-lg">
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">{space.capacity}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-white/5 rounded-lg">
                  <Wifi className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">Wi-Fi 1Gb/s</span>
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-montserrat font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  Équipements inclus
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-zinc-300 text-xs md:text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-xl p-4 border border-emerald-500/20">
                  <h4 className="text-sm md:text-base font-montserrat font-semibold text-white mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    Date et heure
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="date" className="block text-xs text-white/80 mb-1">
                        Date
                      </label>
                      <div 
                        className="relative cursor-pointer"
                        onClick={() => document.getElementById('date')?.showPicker?.()}
                      >
                        <input
                          id="date"
                          type="date"
                          min={getTodayDate()}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm
                                   focus:outline-none focus:ring-2 focus:ring-emerald-400
                                   [color-scheme:dark] cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-xs text-white/80 mb-1">
                        Heure
                      </label>
                      <select
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm
                                 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      >
                        <option value="" className="bg-zinc-900">Heure</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time} className="bg-zinc-900">{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {(!selectedDate || !selectedTime) && (
                    <p className="text-emerald-400/80 text-xs mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Choisissez date et heure
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm md:text-base font-montserrat font-semibold text-white mb-3">
                    Durée
                  </h4>

                  <div className="space-y-2">
                    {disponibilites.map((duree, idx) => {
                      const price = calculatePrice(duree);
                      const isSelected = selectedDuration === duree;
                      const isLoading = isProcessing === duree;

                      return (
                        <motion.div
                          key={duree}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-emerald-500/20 border-2 border-emerald-400'
                              : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <p className="text-white font-medium text-sm">{duree}</p>
                            <p className="text-zinc-400 text-xs">
                              {price}€ TTC
                              {selectedTime && (
                                <span className="ml-1 text-emerald-400">
                                  • {selectedTime} - {calculateEndTime(selectedTime, duree)}
                                </span>
                              )}
                            </p>
                          </div>
                          <motion.button
                            whileHover={selectedDate && selectedTime && !isLoading ? { scale: 1.05 } : {}}
                            whileTap={selectedDate && selectedTime && !isLoading ? { scale: 0.95 } : {}}
                            onClick={() => handleAddToCart(duree, price)}
                            disabled={!selectedDate || !selectedTime || isLoading}
                            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                              !selectedDate || !selectedTime
                                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                                : isLoading
                                ? 'bg-emerald-500/50 text-white cursor-wait'
                                : isSelected
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                            }`}
                          >
                            {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isSelected ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <ShoppingCart className="w-4 h-4" />
                            )}
                            {isLoading ? '' : isSelected ? 'OK' : 'Réserver'}
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <p className="text-center text-zinc-500 text-xs pt-2">
                  Annulation gratuite jusqu'à 24h avant
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}