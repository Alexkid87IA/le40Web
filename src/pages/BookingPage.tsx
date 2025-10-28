import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ArrowRight, Check, Sparkles, Building2, Presentation, Video, Coffee, Wifi, Monitor, Phone, ChevronRight } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';

// Types de services
const serviceTypes = [
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

// Durées disponibles
const durations = {
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
    { id: 'halfDay', label: 'Demi-journée', multiplier: 1 },
    { id: 'day', label: 'Journée', multiplier: 1 }
  ],
  'creative-studio': [
    { id: 'halfDay', label: 'Demi-journée', multiplier: 1 },
    { id: 'day', label: 'Journée', multiplier: 1 }
  ]
};

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [step, setStep] = useState(1);
  const { addItem } = useCart();

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

  // Calculer le prix total
  const calculatePrice = () => {
    if (!selectedService || !selectedDuration) return 0;
    const service = serviceTypes.find(s => s.id === selectedService);
    const duration = durations[selectedService].find(d => 
      d.id === selectedDuration.id && d.multiplier === selectedDuration.multiplier
    );
    return service.price[selectedDuration.id] * selectedDuration.multiplier;
  };

  // Ajouter au panier
  const handleAddToCart = () => {
    if (!selectedService || !selectedDate || !selectedDuration) return;

    const service = serviceTypes.find(s => s.id === selectedService);
    const price = calculatePrice();

    addItem({
      id: `${selectedService}-${Date.now()}`,
      serviceType: selectedService as any,
      serviceName: service.name,
      date: selectedDate,
      startTime: selectedTime || undefined,
      endTime: selectedTime ? `${parseInt(selectedTime.split(':')[0]) + 1}:00` : undefined,
      duration: selectedDuration.id as any,
      price: price,
      quantity: 1
    });

    // Reset
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDuration(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-black">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
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
                  className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
                >
                  RÉSERVEZ VOTRE
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    ESPACE
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto"
                >
                  Bureaux, salles de réunion et studios disponibles immédiatement
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-8 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    animate={{
                      scale: step >= s ? 1 : 0.9,
                      opacity: step >= s ? 1 : 0.5
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-bold
                      ${step >= s ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-white/10 text-white/50'}`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </motion.div>
                  {s < 3 && (
                    <div className={`w-20 h-[2px] ml-4 ${step > s ? 'bg-purple-600' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-8 mt-4">
              <span className={`text-sm font-inter ${step >= 1 ? 'text-white' : 'text-white/50'}`}>
                Service
              </span>
              <span className={`text-sm font-inter ${step >= 2 ? 'text-white' : 'text-white/50'}`}>
                Date & Durée
              </span>
              <span className={`text-sm font-inter ${step >= 3 ? 'text-white' : 'text-white/50'}`}>
                Confirmation
              </span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-montserrat font-black text-white mb-8">
                    Choisissez votre espace
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceTypes.map((service) => (
                      <motion.div
                        key={service.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedService(service.id);
                          setStep(2);
                        }}
                        className={`relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl p-8 border cursor-pointer transition-all duration-300
                          ${selectedService === service.id ? 'border-purple-500' : 'border-white/10 hover:border-white/20'}`}
                      >
                        {/* Gradient background */}
                        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl`} />
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-6">
                            <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center`}>
                              <service.icon className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-white/60 text-sm font-inter">{service.capacity}</span>
                          </div>
                          
                          <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                            {service.name}
                          </h3>
                          <p className="text-white/60 font-inter mb-6">
                            {service.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                <span className="text-white/80 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-white/60 text-sm">À partir de</span>
                              <div className="text-3xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                {Object.values(service.price)[0]}€
                              </div>
                            </div>
                            <ChevronRight className="w-6 h-6 text-white/60" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Duration Selection */}
              {step === 2 && selectedService && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-montserrat font-black text-white">
                      Choisissez date et durée
                    </h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      ← Retour
                    </button>
                  </div>

                  {/* Service sélectionné */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${serviceTypes.find(s => s.id === selectedService).gradient} rounded-xl flex items-center justify-center`}>
                        {React.createElement(serviceTypes.find(s => s.id === selectedService).icon, { className: "w-6 h-6 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-xl font-montserrat font-bold text-white">
                          {serviceTypes.find(s => s.id === selectedService).name}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {serviceTypes.find(s => s.id === selectedService).description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Durée */}
                  <div className="mb-8">
                    <h3 className="text-xl font-montserrat font-semibold text-white mb-4">
                      Durée de réservation
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {durations[selectedService].map((duration) => (
                        <motion.button
                          key={`${duration.id}-${duration.multiplier}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDuration(duration)}
                          className={`p-4 rounded-xl font-inter font-medium transition-all duration-300 ${
                            selectedDuration?.id === duration.id && selectedDuration?.multiplier === duration.multiplier
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                              : 'bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          {duration.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Calendrier */}
                  <div className="mb-8">
                    <h3 className="text-xl font-montserrat font-semibold text-white mb-4">
                      Sélectionnez une date
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                      {dates.slice(0, 14).map((date) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const isSelected = selectedDate === dateStr;
                        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                        
                        return (
                          <motion.button
                            key={dateStr}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDate(dateStr)}
                            className={`p-4 rounded-xl text-center transition-all duration-300 ${
                              isSelected
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : isWeekend
                                ? 'bg-white/5 text-white/50 hover:bg-white/10'
                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                          >
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
                  {(selectedService === 'meeting-room' || selectedService === 'hot-desk') && selectedDuration?.id === 'hour' && (
                    <div className="mb-8">
                      <h3 className="text-xl font-montserrat font-semibold text-white mb-4">
                        Heure de début
                      </h3>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg font-inter transition-all duration-300 ${
                              selectedTime === time
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bouton continuer */}
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectedDate && selectedDuration && setStep(3)}
                      disabled={!selectedDate || !selectedDuration}
                      className={`px-8 py-4 rounded-2xl font-montserrat font-semibold transition-all duration-300 ${
                        selectedDate && selectedDuration
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      Continuer
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && selectedService && selectedDate && selectedDuration && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-montserrat font-black text-white">
                      Confirmez votre réservation
                    </h2>
                    <button
                      onClick={() => setStep(2)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      ← Retour
                    </button>
                  </div>

                  {/* Résumé de la réservation */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <div className="flex items-start gap-6 mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${serviceTypes.find(s => s.id === selectedService).gradient} rounded-2xl flex items-center justify-center`}>
                        {React.createElement(serviceTypes.find(s => s.id === selectedService).icon, { className: "w-10 h-10 text-white" })}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                          {serviceTypes.find(s => s.id === selectedService).name}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-white/80">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          {selectedTime && (
                            <div className="flex items-center gap-2 text-white/80">
                              <Clock className="w-4 h-4" />
                              <span>{selectedTime}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-white/80">
                            <Users className="w-4 h-4" />
                            <span>{selectedDuration.label}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-white/60 text-lg">Total</span>
                        <span className="text-4xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {calculatePrice()}€
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-montserrat font-semibold flex items-center justify-center gap-3"
                      >
                        <span>Ajouter au panier</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Features incluses */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceTypes.find(s => s.id === selectedService).features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                      >
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-white/80 font-inter">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
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
              <h2 className="text-3xl font-montserrat font-black text-white mb-4">
                Besoin d'aide pour votre réservation ?
              </h2>
              <p className="text-white/60 font-inter mb-8">
                Notre équipe est disponible pour vous accompagner
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:0123456789"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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