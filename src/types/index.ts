/**
 * Shared TypeScript types and interfaces
 * Centralized type definitions used across the application
 */

import type { LucideIcon } from 'lucide-react';

// ============================================================
// COMMON TYPES
// ============================================================

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  name: string;
}

// ============================================================
// STUDIO TYPES
// ============================================================

export interface Studio extends BaseEntity {
  shortName: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  basePrice: number;
  features: string[];
  recommended?: boolean;
}

export interface StudioFormule extends BaseEntity {
  tagline: string;
  price: number;
  unit: string;
  color: string;
  icon: string;
  features: string[];
  recommended?: boolean;
  variants: StudioFormuleVariant[];
}

export interface StudioFormuleVariant {
  duration: string;
  price: number;
  sku: string;
}

export interface StudioExtra extends BaseEntity {
  category: string;
  price: number;
  unit: string;
  description: string;
  image?: string;
  icon: LucideIcon;
  includes?: string[];
}

export interface StudioExtraCategory {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface StudioBookingState {
  selectedStudio: Studio | null;
  selectedFormule: StudioFormule | null;
  selectedDuration: string;
  selectedExtras: StudioExtra[];
  selectedDate: Date;
  selectedSlot: string | null;
}

// ============================================================
// SHOPIFY TYPES
// ============================================================

export interface ShopifyImage {
  url: string;
  altText?: string;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice | null;
  availableForSale: boolean;
  sku?: string;
}

// Edge wrapper for GraphQL responses
export interface ShopifyEdge<T> {
  node: T;
}

// Simplified variant for direct access
export interface ShopifyVariantFlat {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode?: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode?: string;
  } | null;
  availableForSale?: boolean;
  sku?: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  priceRange?: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  tags?: string[];
  productType?: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

// ============================================================
// CART TYPES
// ============================================================

export interface CartItem {
  id: string;
  type: 'studio' | 'formule' | 'extra' | 'salle' | 'bureau' | 'product';
  name: string;
  price: number;
  quantity: number;
  variantId?: string;
  image?: string;
  metadata?: Record<string, unknown>;
}

export interface LocalCartItem {
  serviceType: 'studio' | 'salle' | 'bureau' | 'coworking';
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: 'hour' | 'half-day' | 'day';
  price: number;
  quantity: number;
  gradient?: string;
  studioConfig?: StudioConfig;
}

export interface StudioConfig {
  studioId: string;
  formulaId: string;
  formulaName: string;
  formulaMultiplier: number;
  durationId: string;
  durationLabel: string;
  durationHours: number;
  durationMultiplier: number;
  options: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

// ============================================================
// FORM TYPES
// ============================================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'time' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
}

export interface FormErrors {
  [fieldName: string]: string;
}

// ============================================================
// BOOKING TYPES
// ============================================================

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingData {
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  spaceId: string;
  spaceName: string;
  price: number;
}

// ============================================================
// SPACE TYPES
// ============================================================

export interface Space extends BaseEntity {
  description: string;
  capacity: number;
  pricePerHour: number;
  priceHalfDay?: number;
  priceFullDay?: number;
  amenities: string[];
  images: string[];
  available?: boolean;
}

export interface MeetingRoom extends Space {
  equipment: string[];
  configurations?: string[];
}

export interface Bureau extends Space {
  surface: number;
  pricePerMonth: number;
  floor?: string;
  orientation?: string;
}

// ============================================================
// EVENT TYPES
// ============================================================

export interface Event extends BaseEntity {
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  capacity?: number;
  price?: number;
  registrationUrl?: string;
}

// ============================================================
// FAQ TYPES
// ============================================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  items: FAQItem[];
}

// ============================================================
// TESTIMONIAL TYPES
// ============================================================

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
}

// ============================================================
// CONTACT TYPES
// ============================================================

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  subject?: string;
}

export interface VisitBookingData extends ContactFormData {
  preferredDate: string;
  preferredTime: string;
  visitType: 'bureaux' | 'coworking' | 'salles' | 'studios';
}

export interface ClubApplicationData extends ContactFormData {
  linkedin?: string;
  website?: string;
  activity: string;
  motivation: string;
}

export interface DomiciliationData extends ContactFormData {
  companyName: string;
  siret?: string;
  legalForm: string;
  plan: string;
}
