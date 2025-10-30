import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Users, MapPin, ArrowRight, Check, Sparkles, 
  Building2, Presentation, Video, Coffee, Wifi, Monitor, Phone, 
  ChevronRight, CheckCircle, AlertCircle, X, Info
} from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';

// ============================================
// TYPES ET INTERFACES
// ============================================
interface ServiceType {
  id: string;
  name: string;
  icon: any;
  description: string;
  price: Record<string, number>;
  capacity: string;
  gradient: string;
  features: string[];
}

interface Duration {
  id: string;
  label: string;
  multiplier: number;
}

// ============================================
// DONNÉES DES SERVICES
// ============================================
const serviceTypes: ServiceType[] = [
  {
    id: 'hot-desk',
    name: 'Hot Desk',
    icon: Coffee,
    description: 'Bureau flexible en open space',
    price: { hour: 8, day: 35, week: 150, month: 400 },
    capacity: '1 personne',
    gradient: 'from-blue-600 to-cyan-600',
    features: ['Wifi haut débit', 'Café illimité', 'Casier sécurisé', 'Accès 24/7']
  },
  {
    id: 'private-office',
    name: 'Bureau Privé',
    icon: Building2,
    description: 'Espace de travail dédié et fermé',
    price: { day: 120, week: 500, month: 1500 },
    capacity: '1-4 personnes',
    gradient: 'from-emerald-600 to-teal-600',
    features: ['Bureau ergonomique', 'Rangements', 'Ligne téléphonique', 'Personnalisable']
  },
  {
    id: 'meeting-room',
    name: 'Salle de Réunion',
    icon: Presentation,
    description: 'Salles équipées pour vos meetings',
    price: { hour: 50, halfDay: 180, day: 300 },
    capacity: '4-12 personnes',
    gradient: 'from-purple-600 to-indigo-600',
    features: ['Écran 4K', 'Visioconférence', 'Tableau blanc', 'Service café']
  },
  {
    id: 'creative-studio',
    name: 'Studio Créatif',
    icon: Video,
    description: 'Espace pour production audiovisuelle',
    price: { halfDay: 250, day: 450 },
    capacity: 'Équipe créative',
    gradient: 'from-pink-600 to-rose-600',
    features: ['Fond vert', 'Éclairage pro', 'Matériel audio', 'Post-production']
  }
];

// Créneaux horaires disponibles
const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

// Durées disponibles par type de service
const durations: Record<string, Duration[]> = {
  'hot-desk': [
    { id: 'hour', label: '1 heure', multiplier: 1 },
    { id: 'day', label: '1 jour', multiplier: 1 },
    { id: 'week', label: '1 semaine', multiplier: 1 },
    { id: 'month', label: '1 mois', multiplier: 1 }
  ],
  'private-office': [
    { id: 'day', label: '1 jour', multiplier: 1 },
    { id: 'week', label: '1 semaine', multiplier: 1 },
    { id: 'month', label: '1 mois', multiplier: 1 }
  ],
  'meeting-room': [
    { id: 'hour', label: '1 heure', multiplier: 1 },
    { id: 'hour', label: '2 heures', multiplier: 2 },
    { id: 'hour', label: '3 heures', multiplier: 3 },
    { id: 'halfDay', label: 'Demi-journée', multiplier: 1 },
    { id: 'day', label: 'Journée', multiplier: 1 }
  ],
  'creative-studio': [
    { id: 'halfDay', label: 'Demi-journée', multiplier: 1 },
    { id: 'day', label: 'Journée', multiplier: 1 }
  ]
};

// ============================================
// COMPOSANT DE NOTIFICATION
// ============================================
interface NotificationProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'from-green-600 to-emerald-600',
    error: 'from-red-600 to-rose-600',
    info: 'from-blue-600 to-cyan-600'
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className="fixed top-24 right-8 z-50 max-w-md"
    >
      <div className={`bg-gradient-to-r ${styles[type]} rounded-2xl p-6 shadow-2xl border border-white/20`}>
        <div className="flex items-start gap-4">
          <Icon className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
          <p className="text-white font-inter flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function BookingPage() {
  // États
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<Duration | null>(null);
  const [step, setStep] = useState(1);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  // ============================================
  // FONCTIONS UTILITAIRES
  // ============================================

  // Générer les dates des 30 prochains jours
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  // Calculer le prix total avec validation
  const calculatePrice = (): number => {
    if (!selectedService || !selectedDuration) return 0;
    
    try {
      const service = serviceTypes.find(s => s.id === selectedService);
      if (!service) return 0;

      const pricePerUnit = service.price[selectedDuration.id];
      if (typeof pricePerUnit !== 'number') return 0;

      return pricePerUnit * selectedDuration.multiplier;
    } catch (error) {
      console.error('Erreur calcul prix:', error);
      return 0;
    }
  };

  // Calculer l'heure de fin (AMÉLIORÉ - gère les cas limites)
  const calculateEndTime = (startTime: string, durationHours: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHour = (hours + durationHours) % 24;
    return `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Valider que tous les champs requis sont remplis
  const isBookingValid = (): boolean => {
    if (!selectedService || !selectedDate || !selectedDuration) {
      return false;
    }

    // Si c'est une réservation à l'heure, vérifier qu'une heure est sélectionnée
    if ((selectedService === 'meeting-room' || selectedService === 'hot-desk') && 
        selectedDuration.id === 'hour' && !selectedTime) {
      return false;
    }

    return true;
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDuration(null);
    setStep(1);
  };

  // ============================================
  // GESTION DU PANIER
  // ============================================
  const handleAddToCart = async () => {
    if (!isBookingValid()) {
      setNotification({
        type: 'error',
        message: 'Veuillez remplir tous les champs requis',
        onClose: () => setNotification(null)
      });
      return;
    }

    setIsAdding(true);

    try {
      const service = serviceTypes.find(s => s.id === selectedService);
      if (!service) throw new Error('Service non trouvé');

      const price = calculatePrice();
      if (price <= 0) throw new Error('Prix invalide');

      // Calculer l'heure de fin si nécessaire
      let endTime: string | undefined;
      if (selectedTime && selectedDuration) {
        endTime = calculateEndTime(selectedTime, selectedDuration.multiplier);
      }

      addItem({
        id: `${selectedService}-${Date.now()}`,
        serviceType: selectedService as any,
        serviceName: service.name,
        date: selectedDate,
        startTime: selectedTime || undefined,
        endTime: endTime,
        duration: selectedDuration!.id as any,
        price: price,
        quantity: 1
      });

      // Notification de succès
      setNotification({
        type: 'success',
        message: `${service.name} ajouté au panier avec succès ! 🎉`,
        onClose: () => setNotification(null)
      });

      // Réinitialiser le formulaire après un court délai
      setTimeout(resetForm, 1500);
    } catch (error) {
      console.error('Erreur ajout panier:', error);
      setNotification({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer.',
        onClose: () => setNotification(null)
      });
    } finally {
      setIsAdding(false);
    }
  };

  // ============================================
  // GESTION DES CHANGEMENTS D'ÉTAT
  // ============================================

  // Quand on change de service, réinitialiser les sélections
  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedDuration(null);
    setSelectedTime('');
    setStep(2);
    // Scroll automatique vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quand on passe à l'étape suivante, scroll automatique
  const handleNextStep = (nextStep: number) => {
    setStep(nextStep);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Obtenir le service actuellement sélectionné
  const currentService = selectedService ? serviceTypes.find(s => s.id === selectedService) : null;

  // ============================================
  // RENDU
  // ============================================
  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />
      
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <Notification {...notification} />
        )}
      </AnimatePresence>
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center overflow-hidden">
          {/* Background animé */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[150px]"></div>
            </motion.div>
          </div>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center mb-8"
                >
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
                  <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
                    Réservation en ligne
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white mb-6"
                >
                  Réservez votre
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    espace idéal
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-white/60 font-inter text-lg max-w-2xl mx-auto"
                >
                  Choisissez votre espace de travail parfait en quelques clics. Simple, rapide et flexible.
                </motion.p>

                {/* Indicateur de progression amélioré */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex items-center justify-center gap-4 mt-12"
                >
                  {[1, 2, 3].map((stepNum) => (
                    <React.Fragment key={stepNum}>
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale: step === stepNum ? 1.1 : 1,
                            backgroundColor: step >= stepNum 
                              ? 'rgb(168, 85, 247)' 
                              : 'rgba(255, 255, 255, 0.1)'
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20"
                        >
                          {step > stepNum ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white font-montserrat font-semibold">
                              {stepNum}
                            </span>
                          )}
                        </motion.div>
                        <span className={`text-sm font-inter hidden sm:block ${
                          step >= stepNum ? 'text-white' : 'text-white/40'
                        }`}>
                          {stepNum === 1 && 'Service'}
                          {stepNum === 2 && 'Date & Durée'}
                          {stepNum === 3 && 'Confirmation'}
                        </span>
                      </div>
                      {stepNum < 3 && (
                        <motion.div
                          animate={{
                            backgroundColor: step > stepNum 
                              ? 'rgb(168, 85, 247)' 
                              : 'rgba(255, 255, 255, 0.1)'
                          }}
                          className="w-12 h-1 rounded-full"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section de réservation */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <AnimatePresence mode="wait">
              {/* Step 1: Sélection du service */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-montserrat font-bold text-white mb-8 text-center">
                    Choisissez votre espace
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {serviceTypes.map((service, index) => (
                      <motion.button
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleServiceChange(service.id)}
                        className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border-2 transition-all duration-300 text-left overflow-hidden ${
                          selectedService === service.id
                            ? 'border-purple-500 bg-white/10'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        
                        {/* Icône */}
                        <div className={`relative w-16 h-16 mb-6 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                          {React.createElement(service.icon, { className: "w-8 h-8 text-white" })}
                        </div>

                        {/* Contenu */}
                        <div className="relative">
                          <h3 className="text-xl font-montserrat font-bold text-white mb-2">
                            {service.name}
                          </h3>
                          <p className="text-white/60 font-inter text-sm mb-4">
                            {service.description}
                          </p>

                          {/* Capacité */}
                          <div className="flex items-center gap-2 mb-4">
                            <Users className="w-4 h-4 text-white/40" />
                            <span className="text-white/60 text-sm font-inter">
                              {service.capacity}
                            </span>
                          </div>

                          {/* Prix à partir de */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                              {Math.min(...Object.values(service.price))}€
                            </span>
                            <span className="text-white/40 text-sm">/ heure</span>
                          </div>

                          {/* Arrow */}
                          <div className="absolute top-0 right-0 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                            <ArrowRight className="w-6 h-6 text-purple-400" />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date et durée */}
              {step === 2 && selectedService && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-montserrat font-bold text-white">
                      Choisissez votre créneau
                    </h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      ← Retour
                    </button>
                  </div>

                  {/* Service sélectionné - recap */}
                  {currentService && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8 flex items-center gap-6"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${currentService.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        {React.createElement(currentService.icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-1">
                          {currentService.name}
                        </h3>
                        <p className="text-white/60 font-inter text-sm">
                          {currentService.description}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Durée */}
                  <div className="mb-8">
                    <h3 className="text-xl font-montserrat font-semibold text-white mb-4">
                      Durée de réservation
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {durations[selectedService]?.map((duration, index) => (
                        <motion.button
                          key={`${duration.id}-${duration.multiplier}-${index}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDuration(duration)}
                          className={`p-6 rounded-2xl font-inter transition-all duration-300 ${
                            selectedDuration?.id === duration.id && 
                            selectedDuration?.multiplier === duration.multiplier
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-400'
                              : 'bg-white/10 text-white/80 hover:bg-white/20 border-2 border-transparent'
                          }`}
                        >
                          <div className="text-lg font-semibold mb-1">{duration.label}</div>
                          {currentService && (
                            <div className="text-sm opacity-80">
                              {currentService.price[duration.id] * duration.multiplier}€
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mb-8">
                    <h3 className="text-xl font-montserrat font-semibold text-white mb-4">
                      Date de réservation
                    </h3>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                      {dates.map((date) => {
                        const isSelected = selectedDate === date.toISOString().split('T')[0];
                        const isToday = date.toDateString() === new Date().toDateString();
                        
                        return (
                          <motion.button
                            key={date.toISOString()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                            className={`p-4 rounded-xl font-inter transition-all duration-300 relative ${
                              isSelected
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : isToday
                                ? 'bg-white/20 text-white border-2 border-purple-400/50'
                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                          >
                            {isToday && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                            )}
                            <div className="text-xs font-inter mb-1">
                              {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                            </div>
                            <div className="text-lg font-montserrat font-semibold">
                              {date.getDate()}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Horaires (si nécessaire) */}
                  {(selectedService === 'meeting-room' || selectedService === 'hot-desk') && 
                   selectedDuration?.id === 'hour' && (
                    <div className="mb-8">
                      <h3 className="text-xl font-montserrat font-semibold text-white mb-4 flex items-center gap-2">
                        Heure de début
                        <span className="text-sm text-white/60 font-normal">
                          (durée: {selectedDuration.multiplier}h)
                        </span>
                      </h3>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTime(time)}
                            className={`p-4 rounded-lg font-inter transition-all duration-300 ${
                              selectedTime === time
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                          >
                            <div className="font-semibold">{time}</div>
                            {selectedTime === time && selectedDuration && (
                              <div className="text-xs mt-1 opacity-80">
                                → {calculateEndTime(time, selectedDuration.multiplier)}
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prix estimé */}
                  {selectedDuration && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 mb-8"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white/60 text-sm mb-1">Prix estimé</div>
                          <div className="text-3xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {calculatePrice()}€
                          </div>
                        </div>
                        <Sparkles className="w-8 h-8 text-purple-400" />
                      </div>
                    </motion.div>
                  )}

                  {/* Bouton continuer */}
                  <div className="flex justify-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNextStep(3)}
                      disabled={!isBookingValid()}
                      className={`px-8 py-4 rounded-2xl font-montserrat font-semibold transition-all duration-300 flex items-center gap-3 ${
                        isBookingValid()
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      <span>Continuer</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Message d'aide si incomplet */}
                  {!isBookingValid() && selectedDuration && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-center text-white/60 text-sm font-inter"
                    >
                      {!selectedDate && '← Sélectionnez une date'}
                      {selectedDate && !selectedTime && (selectedService === 'meeting-room' || selectedService === 'hot-desk') && 
                       selectedDuration.id === 'hour' && '← Sélectionnez une heure'}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && selectedService && selectedDate && selectedDuration && currentService && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-montserrat font-bold text-white">
                      Confirmez votre réservation
                    </h2>
                    <button
                      onClick={() => setStep(2)}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      ← Modifier
                    </button>
                  </div>

                  {/* Résumé de la réservation */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8">
                    <div className="flex items-start gap-6 mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${currentService.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        {React.createElement(currentService.icon, { className: "w-10 h-10 text-white" })}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
                          {currentService.name}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-white/80">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <span className="font-inter">
                              {new Date(selectedDate).toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          {selectedTime && (
                            <div className="flex items-center gap-3 text-white/80">
                              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4" />
                              </div>
                              <span className="font-inter">
                                {selectedTime} → {calculateEndTime(selectedTime, selectedDuration.multiplier)}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-3 text-white/80">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                              <Users className="w-4 h-4" />
                            </div>
                            <span className="font-inter">{selectedDuration.label}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-white/60 text-lg font-inter">Total</span>
                        <span className="text-5xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {calculatePrice()}€
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-montserrat font-semibold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAdding ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Ajout en cours...</span>
                          </>
                        ) : (
                          <>
                            <span>Ajouter au panier</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Features incluses */}
                  <div className="mb-8">
                    <h3 className="text-xl font-montserrat font-semibold text-white mb-4">
                      Inclus dans votre réservation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentService.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                        >
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-green-400" />
                          </div>
                          <span className="text-white/80 font-inter">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Informations supplémentaires */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-600/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20"
                  >
                    <div className="flex items-start gap-4">
                      <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-montserrat font-semibold mb-2">
                          Bon à savoir
                        </h4>
                        <ul className="text-white/60 font-inter text-sm space-y-2">
                          <li>• Annulation gratuite jusqu'à 24h avant</li>
                          <li>• Modification possible jusqu'à 2h avant</li>
                          <li>• Confirmation immédiate par email</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-montserrat font-bold text-white mb-4">
                Besoin d'aide pour votre réservation ?
              </h2>
              <p className="text-white/60 font-inter mb-8">
                Notre équipe est disponible pour vous accompagner
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:0123456789"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <Phone className="w-5 h-5 text-white" />
                  <span className="text-white font-montserrat font-semibold">01 23 45 67 89</span>
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