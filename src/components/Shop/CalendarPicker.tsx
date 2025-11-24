import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useCalendarAvailability, checkSlotAvailability } from '../../hooks/useCalendarAvailability';

interface CalendarPickerProps {
  resourceName: string;
  resourceType: string;
  durationHours: number;
  onSelect: (date: string, startTime: string, endTime: string) => void;
  onCancel: () => void;
}

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function CalendarPicker({
  resourceName,
  resourceType,
  durationHours,
  onSelect,
  onCancel
}: CalendarPickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [checking, setChecking] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const { slots, loading } = useCalendarAvailability(selectedDate ? resourceName : null, selectedDate);

  useEffect(() => {
    setSelectedTime('');
    setAvailabilityMessage(null);
  }, [selectedDate]);

  const calculateEndTime = (startTime: string): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + durationHours;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const isTimeSlotAvailable = (time: string): boolean => {
    if (!slots.length) return true;

    const endTime = calculateEndTime(time);

    return !slots.some(slot => {
      const slotStart = slot.startTime;
      const slotEnd = slot.endTime;

      return (
        !slot.available &&
        ((time >= slotStart && time < slotEnd) ||
         (endTime > slotStart && endTime <= slotEnd) ||
         (time <= slotStart && endTime >= slotEnd))
      );
    });
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    setChecking(true);
    setAvailabilityMessage(null);

    const endTime = calculateEndTime(selectedTime);
    const result = await checkSlotAvailability(resourceName, selectedDate, selectedTime, endTime);

    if (result.available) {
      setAvailabilityMessage({ type: 'success', text: 'Créneau disponible!' });
      setTimeout(() => {
        onSelect(selectedDate, selectedTime, endTime);
      }, 500);
    } else {
      setAvailabilityMessage({ type: 'error', text: result.message || 'Créneau non disponible' });
    }

    setChecking(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Sélectionner une date
        </label>
        <input
          type="date"
          min={today}
          max={maxDateString}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
        />
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Heure de début ({durationHours}h)
          </label>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((time) => {
                const available = isTimeSlotAvailable(time);
                const isSelected = selectedTime === time;

                return (
                  <motion.button
                    key={time}
                    whileHover={available ? { scale: 1.05 } : {}}
                    whileTap={available ? { scale: 0.95 } : {}}
                    onClick={() => available && setSelectedTime(time)}
                    disabled={!available}
                    className={`
                      py-3 px-4 rounded-lg font-medium transition-all
                      ${isSelected
                        ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white shadow-lg'
                        : available
                        ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                        : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                      }
                    `}
                  >
                    {time}
                  </motion.button>
                );
              })}
            </div>
          )}

          {selectedTime && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="text-sm text-white/60 mb-1">Créneau sélectionné</div>
              <div className="text-white font-semibold">
                {new Date(selectedDate).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-white/80 mt-1">
                De {selectedTime} à {calculateEndTime(selectedTime)}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {availabilityMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`
              flex items-center gap-2 p-4 rounded-xl
              ${availabilityMessage.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }
            `}
          >
            {availabilityMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{availabilityMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
        >
          Annuler
        </motion.button>

        <motion.button
          whileHover={selectedDate && selectedTime && !checking ? { scale: 1.02 } : {}}
          whileTap={selectedDate && selectedTime && !checking ? { scale: 0.98 } : {}}
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime || checking}
          className={`
            flex-1 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
            ${selectedDate && selectedTime && !checking
              ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/25'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
            }
          `}
        >
          {checking ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Vérification...
            </>
          ) : (
            'Confirmer'
          )}
        </motion.button>
      </div>
    </div>
  );
}
