/**
 * Shared types for booking step components
 */

import type { Studio, Formule, Extra } from '../../../data/studios';

// ============================================================
// STEP PROPS
// ============================================================

export interface StudioStepProps {
  selectedStudio: Studio | null;
  selectedDuration: string;
  onSelectStudio: (studio: Studio) => void;
  onSelectDuration: (duration: string) => void;
  durationSectionRef: React.RefObject<HTMLDivElement>;
}

export interface FormuleStepProps {
  selectedFormule: Formule | null;
  selectedDuration: string;
  onSelectFormule: (formule: Formule) => void;
}

export interface ExtrasStepProps {
  selectedExtras: Extra[];
  extraCategory: string;
  searchExtra: string;
  filteredExtras: Extra[];
  extrasPrice: number;
  onToggleExtra: (extra: Extra) => void;
  onSetCategory: (category: string) => void;
  onSetSearch: (search: string) => void;
  onOpenExtraDetail: (extra: Extra) => void;
}

export interface SummaryStepProps {
  selectedStudio: Studio | null;
  selectedFormule: Formule | null;
  selectedDuration: string;
  selectedExtras: Extra[];
  selectedDate: Date;
  selectedSlot: string | null;
  studioPrice: number;
  formulePrice: number;
  extrasPrice: number;
  totalPrice: number;
  isProcessing: boolean;
  canProceed: boolean;
  onSelectDate: (date: Date) => void;
  onSelectSlot: (slot: string) => void;
  onCheckout: () => void;
}

// ============================================================
// STEPPER PROPS
// ============================================================

export interface StepInfo {
  number: number;
  label: string;
  value: string | null;
  icon: React.ComponentType<{ className?: string }> | string | null;
}

export interface BookingStepperProps {
  currentStep: number;
  selectedStudio: Studio | null;
  selectedFormule: Formule | null;
  selectedExtras: Extra[];
  selectedDate: Date;
  selectedSlot: string | null;
  selectedDuration: string;
  onEditStep: (step: number) => void;
}

// ============================================================
// MODAL PROPS
// ============================================================

export interface ExtraDetailModalProps {
  extra: Extra | null;
  selectedExtras: Extra[];
  onClose: () => void;
  onToggleExtra: (extra: Extra) => void;
}

export interface RestoreModalProps {
  savedBooking: {
    selectedStudio?: Studio | null;
    selectedFormule?: Formule | null;
    selectedExtras?: Extra[];
    currentStep?: number;
  } | null;
  onRestore: () => void;
  onStartFresh: () => void;
}
