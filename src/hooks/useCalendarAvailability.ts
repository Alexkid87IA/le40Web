import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
  isHold?: boolean;
}

export interface AvailabilityCheck {
  available: boolean;
  message?: string;
}

export const useCalendarAvailability = (
  resourceName: string | null,
  date: string | null
) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resourceName || !date) {
      setSlots([]);
      return;
    }

    const fetchAvailability = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('shopify_inventory_calendar')
          .select('*')
          .eq('resource_name', resourceName)
          .eq('booking_date', date)
          .order('start_time', { ascending: true });

        if (fetchError) throw fetchError;

        const timeSlots: TimeSlot[] = data.map(slot => ({
          startTime: slot.start_time,
          endTime: slot.end_time,
          available: slot.is_available,
          isHold: slot.is_temporary_hold,
        }));

        setSlots(timeSlots);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch availability');
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [resourceName, date]);

  return { slots, loading, error };
};

export const checkSlotAvailability = async (
  resourceName: string,
  bookingDate: string,
  startTime: string,
  endTime: string
): Promise<AvailabilityCheck> => {
  try {
    const { data, error } = await supabase.rpc('check_slot_availability', {
      p_resource_name: resourceName,
      p_booking_date: bookingDate,
      p_start_time: startTime,
      p_end_time: endTime,
    });

    if (error) throw error;

    if (data === true) {
      return { available: true };
    } else {
      return {
        available: false,
        message: 'Ce créneau n\'est plus disponible',
      };
    }
  } catch (err) {
    return {
      available: false,
      message: err instanceof Error ? err.message : 'Erreur lors de la vérification',
    };
  }
};

export const createTemporaryHold = async (
  shopifyProductId: string,
  shopifyVariantId: string,
  resourceName: string,
  resourceType: string,
  bookingDate: string,
  startTime: string,
  endTime: string,
  checkoutId: string,
  customerEmail?: string
): Promise<{ success: boolean; holdId?: string; error?: string }> => {
  try {
    const { data, error } = await supabase.rpc('create_temporary_hold', {
      p_shopify_product_id: shopifyProductId,
      p_shopify_variant_id: shopifyVariantId,
      p_resource_name: resourceName,
      p_resource_type: resourceType,
      p_booking_date: bookingDate,
      p_start_time: startTime,
      p_end_time: endTime,
      p_shopify_checkout_id: checkoutId,
      p_customer_email: customerEmail,
    });

    if (error) throw error;

    return {
      success: true,
      holdId: data,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Impossible de créer la réservation temporaire',
    };
  }
};

export const releaseHold = async (holdId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('shopify_inventory_calendar')
      .update({
        is_available: true,
        is_temporary_hold: false,
        hold_expires_at: null,
        shopify_checkout_id: null,
      })
      .eq('id', holdId);

    if (error) throw error;
    return true;
  } catch {
    return false;
  }
};

export const cleanupExpiredHolds = async (): Promise<void> => {
  try {
    await supabase.rpc('cleanup_expired_holds');
  } catch (err) {
    console.error('Failed to cleanup expired holds:', err);
  }
};
