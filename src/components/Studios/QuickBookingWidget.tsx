import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, X, Zap, Users } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';

export default function QuickBookingWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState('');
  const [availableSlots, setAvailableSlots] = useState(8);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAvailableSlots(prev => Math.max(3, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const popularStudios = studioSetups.filter(s => s.popular).slice(0, 3);
  const today = new Date();
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {!isExpanded ? (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-8 bottom-8 z-50"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(true)}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Calendar className="w-6 h-6" />
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-montserrat font-black text-lg">
                        Réserver
                      </div>
                      <div className="text-xs text-white/80">
                        {availableSlots} créneaux dispo
                      </div>
                    </div>
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsExpanded(false)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-3xl border-2 border-white/20 shadow-2xl"
              >
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 border-b border-white/20 backdrop-blur-xl z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-montserrat font-black text-white mb-1">
                        Réservation Express
                      </h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span>{availableSlots} créneaux disponibles cette semaine</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>12 personnes consultent actuellement</span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsExpanded(false)}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-montserrat font-bold text-white">
                        Studios populaires
                      </h4>
                      <span className="text-white/60 text-sm font-inter">
                        Étape 1/3
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {popularStudios.map((studio) => {
                        const Icon = studio.icon;
                        const isSelected = selectedStudio === studio.id;

                        return (
                          <motion.button
                            key={studio.id}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedStudio(studio.id)}
                            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                              isSelected
                                ? 'border-cyan-500 bg-cyan-500/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="absolute top-4 right-4">
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center"
                                >
                                  <ArrowRight className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                            </div>

                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${studio.gradient} flex items-center justify-center mb-4`}>
                              <Icon className="w-7 h-7 text-white" />
                            </div>

                            <h5 className="text-lg font-montserrat font-black text-white mb-2">
                              {studio.name}
                            </h5>

                            <p className="text-white/60 text-sm mb-3">
                              {studio.subtitle}
                            </p>

                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                {studio.basePrice}€
                              </span>
                              <span className="text-white/50 text-sm">/heure</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedStudio && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                      >
                        <h4 className="text-xl font-montserrat font-bold text-white mb-4">
                          Choisissez une date
                        </h4>

                        <div className="grid grid-cols-7 gap-2">
                          {nextDays.map((date, index) => {
                            const isToday = index === 0;
                            const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
                            const dayNumber = date.getDate();

                            return (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  isToday
                                    ? 'border-blue-500 bg-blue-500/10'
                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                }`}
                              >
                                <div className="text-white/60 text-xs mb-1 capitalize">
                                  {dayName}
                                </div>
                                <div className="text-white font-montserrat font-bold text-lg">
                                  {dayNumber}
                                </div>
                                {isToday && (
                                  <div className="text-blue-400 text-xs font-bold mt-1">
                                    Aujourd'hui
                                  </div>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                      >
                        <h4 className="text-xl font-montserrat font-bold text-white mb-4">
                          Horaires disponibles
                        </h4>

                        <div className="grid grid-cols-4 gap-3">
                          {timeSlots.map((time, index) => {
                            const isAvailable = Math.random() > 0.3;

                            return (
                              <motion.button
                                key={time}
                                whileHover={isAvailable ? { scale: 1.05 } : {}}
                                whileTap={isAvailable ? { scale: 0.95 } : {}}
                                disabled={!isAvailable}
                                className={`p-3 rounded-xl font-inter font-bold transition-all ${
                                  isAvailable
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white'
                                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                                }`}
                              >
                                <Clock className="w-4 h-4 mx-auto mb-1" />
                                {time}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-white/60 text-sm font-inter mb-1">
                              Prix estimé
                            </div>
                            <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                              119€
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-xl font-montserrat font-bold flex items-center gap-3 shadow-xl"
                          >
                            Confirmer
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                        <div className="text-white/60 text-sm font-inter">
                          Technicien expert inclus • Rushs livrés en 2h
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
