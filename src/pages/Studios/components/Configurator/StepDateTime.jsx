import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Info } from 'lucide-react';

export default function StepDateTime({ isActive, price, selectedDate, selectedTime, onDateChange, onTimeChange, setupName }) {
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
      className={isActive ? '' : 'pointer-events-none'}
    >
      <h3 className="text-2xl font-montserrat font-bold text-white mb-6 flex items-center gap-3">
        <span className={`text-4xl ${isActive ? 'text-purple-400' : 'text-white/20'}`}>4</span>
        Date & Créneau
      </h3>

      {/* Sélection de date */}
      <div className="mb-6">
        <label className="block text-white/80 mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          Choisir la date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-4 rounded-2xl bg-white/5 border-2 border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Sélection du créneau */}
      <div className="mb-6">
        <label className="block text-white/80 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          Choisir le créneau
        </label>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map(time => (
            <motion.button
              key={time}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTimeChange(time)}
              className={`py-3 rounded-xl font-medium transition-all ${
                selectedTime === time
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border-2 border-white/10'
              }`}
            >
              {time}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Résumé de la réservation */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/20">
        <h4 className="text-lg font-montserrat font-bold text-white mb-4">
          Récapitulatif
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between text-white/80">
            <span>Setup</span>
            <span className="font-semibold">{setupName}</span>
          </div>
          {selectedDate && (
            <div className="flex justify-between text-white/80">
              <span>Date</span>
              <span className="font-semibold">
                {new Date(selectedDate).toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          )}
          {selectedTime && (
            <div className="flex justify-between text-white/80">
              <span>Créneau</span>
              <span className="font-semibold">{selectedTime}</span>
            </div>
          )}
          <div className="pt-3 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-white">Total HT</span>
              <span className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {price}€
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Message informatif */}
      {selectedDate && selectedTime && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-start gap-3 bg-purple-500/10 rounded-xl p-4 border border-purple-500/20"
        >
          <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-purple-300">
            <p className="font-medium mb-1">Prêt à réserver !</p>
            <p className="text-purple-300/70">
              Utilisez le bouton "Confirmer la réservation" dans le récapitulatif à droite pour finaliser votre réservation.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}