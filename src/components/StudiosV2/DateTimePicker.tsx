import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DateTimePickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  studioId: string;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30'
];

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  studioId
}: DateTimePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate && studioId) {
      fetchAvailability();
    }
  }, [selectedDate, studioId]);

  const fetchAvailability = async () => {
    if (!selectedDate || !studioId) return;

    setLoading(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('studio_bookings')
        .select('booking_time, duration_hours')
        .eq('studio_id', studioId)
        .eq('booking_date', dateStr)
        .eq('status', 'confirmed');

      if (error) throw error;

      const bookedSlots = new Set<string>();
      data?.forEach(booking => {
        const startTime = booking.booking_time;
        const duration = booking.duration_hours;

        const startIndex = timeSlots.indexOf(startTime);
        if (startIndex >= 0) {
          const slotsToBlock = Math.ceil(duration * 2);
          for (let i = 0; i < slotsToBlock; i++) {
            const slotIndex = startIndex + i;
            if (slotIndex < timeSlots.length) {
              bookedSlots.add(timeSlots[slotIndex]);
            }
          }
        }
      });

      const available = new Set(timeSlots.filter(slot => !bookedSlots.has(slot)));
      setAvailableSlots(available);
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-400" />
            <h4 className="text-lg font-bold text-white">
              Choisir une date
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
            <span className="text-white font-semibold min-w-[150px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs text-slate-500 font-semibold">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} />;
            }

            const isSelected = selectedDate?.toDateString() === day.toDateString();
            const isPast = isPastDate(day);
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && onDateSelect(day)}
                disabled={isPast}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                  isPast
                    ? 'text-slate-700 cursor-not-allowed'
                    : isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg'
                    : isToday
                    ? 'bg-slate-800 text-white border-2 border-violet-500'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-violet-400" />
          <h4 className="text-lg font-bold text-white">
            Choisir un horaire
          </h4>
        </div>

        {!selectedDate ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500">
              Sélectionnez d'abord une date
            </p>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500">
              Chargement des disponibilités...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2">
            {timeSlots.map(slot => {
              const isAvailable = availableSlots.has(slot);
              const isSelected = selectedTime === slot;

              return (
                <button
                  key={slot}
                  onClick={() => isAvailable && onTimeSelect(slot)}
                  disabled={!isAvailable}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    !isAvailable
                      ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        )}

        {selectedDate && !loading && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Créneaux disponibles:</span>
              <span className="text-white font-semibold">
                {availableSlots.size} / {timeSlots.length}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
