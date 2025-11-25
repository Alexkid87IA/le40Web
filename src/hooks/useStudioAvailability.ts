import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface BookingData {
  studioType: 'podcast' | 'video' | 'photo';
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  totalPrice: number;
  shopifyOrderId?: string;
  shopifyVariantId?: string;
}

export function useStudioAvailability(studioType: 'podcast' | 'video' | 'photo', date: Date) {
  const [loading, setLoading] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAvailability();
  }, [studioType, date]);

  const loadAvailability = async () => {
    try {
      setLoading(true);
      setError(null);

      const dayOfWeek = date.getDay();
      const dateStr = date.toISOString().split('T')[0];

      const { data: availability, error: availError } = await supabase
        .from('studio_availability')
        .select('*')
        .eq('studio_type', studioType)
        .eq('day_of_week', dayOfWeek)
        .eq('is_available', true)
        .maybeSingle();

      if (availError) throw availError;

      if (!availability) {
        setAvailableSlots([]);
        setLoading(false);
        return;
      }

      const { data: blockedDates, error: blockedError } = await supabase
        .from('studio_blocked_dates')
        .select('*')
        .eq('blocked_date', dateStr)
        .in('studio_type', [studioType, 'all']);

      if (blockedError) throw blockedError;

      if (blockedDates && blockedDates.length > 0) {
        setAvailableSlots([]);
        setLoading(false);
        return;
      }

      const { data: bookings, error: bookingsError } = await supabase
        .from('studio_bookings')
        .select('start_time, end_time')
        .eq('studio_type', studioType)
        .eq('booking_date', dateStr)
        .in('status', ['pending', 'confirmed']);

      if (bookingsError) throw bookingsError;

      const slots = generateTimeSlots(
        availability.start_time,
        availability.end_time,
        bookings || []
      );

      setAvailableSlots(slots);
    } catch (err) {
      console.error('Error loading availability:', err);
      setError('Erreur lors du chargement des disponibilités');
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = (
    startTime: string,
    endTime: string,
    bookings: Array<{ start_time: string; end_time: string }>
  ): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const [startHour] = startTime.split(':').map(Number);
    const [endHour] = endTime.split(':').map(Number);

    for (let hour = startHour; hour < endHour; hour += 2) {
      const slotStart = `${hour.toString().padStart(2, '0')}:00`;
      const slotEnd = `${(hour + 2).toString().padStart(2, '0')}:00`;

      const isBooked = bookings.some(booking => {
        return (
          (slotStart >= booking.start_time && slotStart < booking.end_time) ||
          (slotEnd > booking.start_time && slotEnd <= booking.end_time) ||
          (slotStart <= booking.start_time && slotEnd >= booking.end_time)
        );
      });

      slots.push({
        start: slotStart,
        end: slotEnd,
        available: !isBooked,
      });
    }

    return slots;
  };

  const createBooking = async (bookingData: BookingData) => {
    try {
      const dateStr = bookingData.date.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('studio_bookings')
        .insert({
          studio_type: bookingData.studioType,
          booking_date: dateStr,
          start_time: bookingData.startTime,
          end_time: bookingData.endTime,
          duration_hours: bookingData.duration,
          customer_email: bookingData.customerEmail,
          customer_name: bookingData.customerName,
          customer_phone: bookingData.customerPhone,
          total_price: bookingData.totalPrice,
          shopify_order_id: bookingData.shopifyOrderId,
          shopify_variant_id: bookingData.shopifyVariantId,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      await loadAvailability();

      return { success: true, booking: data };
    } catch (err) {
      console.error('Error creating booking:', err);
      return { success: false, error: 'Erreur lors de la création de la réservation' };
    }
  };

  return {
    loading,
    availableSlots,
    error,
    createBooking,
    refreshAvailability: loadAvailability,
  };
}
