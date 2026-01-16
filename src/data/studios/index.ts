/**
 * Studio Data Module
 * Central export for all studio-related data and utilities
 */

// Types
export type {
  Studio,
  Formule,
  FormuleVariant,
  Extra,
  ExtraCategory,
  StudioCartItem,
  BookingState,
} from './types';

// Studios
export { STUDIOS, findStudioById, getRecommendedStudios } from './studios';

// Formules
export {
  FORMULES,
  FORMULE_COMPARISON,
  findFormuleById,
  getFormulePrice,
  getRecommendedFormule,
} from './formules';

// Extras
export {
  EXTRAS,
  EXTRAS_CATEGORIES,
  findExtraById,
  getExtrasByCategory,
  searchExtras,
  getCategoryById,
  calculateExtrasTotal,
  getExtraIncludes,
} from './extras';

// ============================================================
// BOOKING UTILITIES
// ============================================================

/**
 * Available durations for studio booking
 */
export const DURATIONS = [
  { id: '2h', label: '2h', name: 'Standard', hours: 2 },
  { id: '4h', label: '4h', name: 'Demi-journée', hours: 4 },
  { id: '8h', label: '8h', name: 'Journée', hours: 8 },
] as const;

/**
 * Available time slots
 */
export const AVAILABLE_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] as const;

/**
 * Generate next available days (excluding Sundays)
 */
export function generateNextDays(count: number): Date[] {
  const days: Date[] = [];
  const today = new Date();
  let i = 0;
  while (days.length < count) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Exclude Sundays (0 = Sunday in JavaScript)
    if (date.getDay() !== 0) {
      days.push(date);
    }
    i++;
  }
  return days;
}

/**
 * Format date for display
 */
export function formatBookingDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
}

/**
 * Calculate studio price based on duration
 */
export function calculateStudioPrice(basePrice: number, duration: string): number {
  const hours = parseInt(duration);
  return basePrice * hours;
}

/**
 * Calculate end time from start time and duration
 */
export function calculateEndTime(startTime: string, duration: string): string {
  const [hours] = startTime.split(':').map(Number);
  const durationHours = parseInt(duration);
  const endHours = hours + durationHours;
  return `${endHours.toString().padStart(2, '0')}:00`;
}
