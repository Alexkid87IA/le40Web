/**
 * Studio Booking Types
 * Centralized types for studio booking flow
 */

import type { LucideIcon } from 'lucide-react';

// ============================================================
// STUDIO TYPES
// ============================================================

export interface Studio {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  basePrice: number;
  features: string[];
  recommended?: boolean;
}

// ============================================================
// FORMULE TYPES
// ============================================================

export interface FormuleVariant {
  duration: string;
  price: number;
  sku: string;
}

export interface Formule {
  id: string;
  name: string;
  tagline: string;
  price: number;
  unit: string;
  color: string;
  icon: string;
  features: string[];
  recommended?: boolean;
  variants: FormuleVariant[];
}

// ============================================================
// EXTRA TYPES
// ============================================================

export interface Extra {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  image?: string;
  icon: LucideIcon;
  includes?: string[];
}

export interface ExtraCategory {
  id: string;
  name: string;
  icon: LucideIcon;
}

// ============================================================
// CART TYPES
// ============================================================

export interface StudioCartItem {
  type: 'studio' | 'formule' | 'extra';
  id: string;
  name: string;
  price: number;
  variantId?: string;
  quantity?: number;
}

// ============================================================
// BOOKING STATE TYPES
// ============================================================

export interface BookingState {
  currentStep: number;
  selectedStudio: Studio | null;
  selectedFormule: Formule | null;
  selectedDuration: string;
  selectedExtras: Extra[];
  selectedDate: Date;
  selectedSlot: string | null;
  timestamp?: string;
}
