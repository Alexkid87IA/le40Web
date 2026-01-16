/**
 * StudioBookingFlow - Parcours de réservation en 4 étapes
 *
 * Étape 1: Choix du studio
 * Étape 2: Choix de la formule (Autonome/Assisté/Full Service)
 * Étape 3: Ajout des extras
 * Étape 4: Récapitulatif & Paiement
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';
import BookingSidebar from './BookingSidebar';
import BookingBottomSheet from './BookingBottomSheet';
import StudioDetailModal from './StudioDetailModal';

// Import step components
import {
  StudioStep,
  FormuleStep,
  ExtrasStep,
  SummaryStep,
  BookingStepper,
  ExtraDetailModal,
  RestoreModal,
} from './steps';

// Import data from centralized modules
import {
  EXTRAS,
  findStudioById, findFormuleById, findExtraById,
  calculateEndTime,
  type Studio, type Formule, type Extra, type BookingState
} from '../../data/studios';

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function StudioBookingFlow() {
  // Navigation and unified cart
  const navigate = useNavigate();
  const { addLocalItem, setIsOpen } = useUnifiedCart();

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const durationSectionRef = useRef<HTMLDivElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  // Main state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [selectedFormule, setSelectedFormule] = useState<Formule | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('2h');
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [extraCategory, setExtraCategory] = useState('all');
  const [searchExtra, setSearchExtra] = useState('');

  // Date and slot
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Extra detail modal
  const [extraDetailModal, setExtraDetailModal] = useState<Extra | null>(null);

  // Studio detail modal
  const [studioDetailModal, setStudioDetailModal] = useState<Studio | null>(null);

  // LocalStorage save/restore
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [savedBooking, setSavedBooking] = useState<Partial<BookingState> | null>(null);

  // ============================================================
  // AUTO-SCROLL EFFECTS
  // ============================================================

  // Scroll to top of section on step change
  useEffect(() => {
    if (sectionRef.current) {
      const yOffset = -20;
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentStep]);

  // Scroll to duration section when studio selected
  useEffect(() => {
    if (selectedStudio && durationSectionRef.current) {
      setTimeout(() => {
        if (durationSectionRef.current) {
          const yOffset = -100;
          const y = durationSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [selectedStudio]);

  // Scroll to continue button when duration selected (step 1)
  useEffect(() => {
    if (selectedStudio && selectedDuration && currentStep === 1 && continueButtonRef.current) {
      setTimeout(() => {
        if (continueButtonRef.current) {
          const yOffset = -350;
          const y = continueButtonRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [selectedDuration, selectedStudio, currentStep]);

  // Scroll to continue button when formule selected (step 2)
  useEffect(() => {
    if (selectedFormule && currentStep === 2 && continueButtonRef.current) {
      setTimeout(() => {
        if (continueButtonRef.current) {
          const yOffset = -400;
          const y = continueButtonRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [selectedFormule, currentStep]);

  // ============================================================
  // PRICE CALCULATIONS
  // ============================================================

  const studioPrice = useMemo(() => {
    if (!selectedStudio) return 0;
    const hours = parseInt(selectedDuration);
    return selectedStudio.basePrice * hours;
  }, [selectedStudio, selectedDuration]);

  const formulePrice = useMemo(() => {
    if (!selectedFormule) return 0;
    const variant = selectedFormule.variants.find(v => v.duration === selectedDuration);
    return variant?.price || 0;
  }, [selectedFormule, selectedDuration]);

  const extrasPrice = useMemo(() => {
    return selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  }, [selectedExtras]);

  const totalPrice = studioPrice + formulePrice + extrasPrice;

  // Filter extras
  const filteredExtras = useMemo(() => {
    return EXTRAS.filter(extra => {
      const matchCategory = extraCategory === 'all' || extra.category === extraCategory;
      const matchSearch = extra.name.toLowerCase().includes(searchExtra.toLowerCase()) ||
                          extra.description.toLowerCase().includes(searchExtra.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [extraCategory, searchExtra]);

  // ============================================================
  // LOCALSTORAGE SAVE/RESTORE
  // ============================================================

  // Load saved booking on mount
  useEffect(() => {
    const saved = localStorage.getItem('studioBooking_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const savedTime = new Date(parsed.timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24 && (parsed.selectedStudio || parsed.selectedFormule)) {
          setSavedBooking(parsed);
          setShowRestoreModal(true);
        } else {
          localStorage.removeItem('studioBooking_draft');
        }
      } catch {
        localStorage.removeItem('studioBooking_draft');
      }
    }
  }, []);

  // Auto-save every 3 seconds
  useEffect(() => {
    if (!selectedStudio && !selectedFormule) return;

    const timeoutId = setTimeout(() => {
      const bookingState = {
        timestamp: new Date().toISOString(),
        currentStep,
        selectedStudio,
        selectedFormule,
        selectedDuration,
        selectedExtras,
        selectedDate: selectedDate?.toISOString(),
        selectedSlot,
      };

      localStorage.setItem('studioBooking_draft', JSON.stringify(bookingState));
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [currentStep, selectedStudio, selectedFormule, selectedDuration, selectedExtras, selectedDate, selectedSlot]);

  // Restore booking
  const handleRestoreBooking = () => {
    if (savedBooking) {
      if (savedBooking.selectedStudio) {
        const studio = findStudioById(savedBooking.selectedStudio.id);
        if (studio) setSelectedStudio(studio);
      }
      if (savedBooking.selectedFormule) {
        const formule = findFormuleById(savedBooking.selectedFormule.id);
        if (formule) setSelectedFormule(formule);
      }
      if (savedBooking.selectedDuration) {
        setSelectedDuration(savedBooking.selectedDuration);
      }
      if (savedBooking.selectedExtras) {
        const extras = savedBooking.selectedExtras
          .map(saved => findExtraById(saved.id))
          .filter((e): e is Extra => e !== undefined);
        setSelectedExtras(extras);
      }
      if (savedBooking.selectedDate) {
        setSelectedDate(new Date(savedBooking.selectedDate as unknown as string));
      }
      if (savedBooking.selectedSlot) {
        setSelectedSlot(savedBooking.selectedSlot);
      }
      setCurrentStep(savedBooking.currentStep || 1);
    }
    setShowRestoreModal(false);
  };

  // Start fresh
  const handleStartFresh = () => {
    localStorage.removeItem('studioBooking_draft');
    setShowRestoreModal(false);
    setSavedBooking(null);
  };

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSelectStudio = (studio: Studio) => {
    setSelectedStudio(studio);
  };

  const handleSelectFormule = (formule: Formule) => {
    setSelectedFormule(formule);
  };

  const handleToggleExtra = (extra: Extra) => {
    setSelectedExtras(prev => {
      const exists = prev.find(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      }
      return [...prev, extra];
    });
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    document.getElementById('booking-flow')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCheckout = async () => {
    if (!selectedStudio || !selectedFormule || !selectedSlot) return;

    setIsProcessing(true);

    const endTime = calculateEndTime(selectedSlot, selectedDuration);
    const extrasText = selectedExtras.length > 0
      ? ` + ${selectedExtras.length} extra${selectedExtras.length > 1 ? 's' : ''}`
      : '';
    const serviceName = `${selectedStudio.name} - ${selectedDuration} - ${selectedFormule.name}${extrasText}`;

    addLocalItem({
      serviceType: 'studio',
      serviceName: serviceName,
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedSlot,
      endTime: endTime,
      duration: selectedDuration === '2h' ? 'hour' : selectedDuration === '4h' ? 'half-day' : 'day',
      price: totalPrice,
      quantity: 1,
      gradient: selectedStudio.gradient,
      studioConfig: {
        studioId: selectedStudio.id,
        formulaId: selectedFormule.id,
        formulaName: selectedFormule.name,
        formulaMultiplier: 1,
        durationId: selectedDuration,
        durationLabel: selectedDuration,
        durationHours: parseInt(selectedDuration),
        durationMultiplier: 1,
        options: selectedExtras.map(e => ({
          id: e.id,
          name: e.name,
          price: e.price
        }))
      }
    });

    setTimeout(() => {
      setIsOpen(false);
      navigate('/checkout');
    }, 300);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedStudio !== null;
      case 2: return selectedFormule !== null;
      case 3: return true; // Extras are optional
      case 4: return selectedSlot !== null;
      default: return false;
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section ref={sectionRef} id="booking-flow" className="relative py-16 md:py-24 bg-gradient-to-b from-black to-zinc-950 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Restore Modal */}
      {showRestoreModal && savedBooking && (
        <RestoreModal
          savedBooking={savedBooking}
          onRestore={handleRestoreBooking}
          onStartFresh={handleStartFresh}
        />
      )}

      {/* Extra Detail Modal */}
      <ExtraDetailModal
        extra={extraDetailModal}
        selectedExtras={selectedExtras}
        onClose={() => setExtraDetailModal(null)}
        onToggleExtra={handleToggleExtra}
      />

      {/* Studio Detail Modal */}
      <StudioDetailModal
        studio={studioDetailModal}
        isOpen={studioDetailModal !== null}
        onClose={() => setStudioDetailModal(null)}
        onSelect={handleSelectStudio}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
            RÉSERVEZ
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              VOTRE SESSION
            </span>
          </h1>
        </motion.div>

        {/* 2-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Form (2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stepper */}
            <BookingStepper
              currentStep={currentStep}
              selectedStudio={selectedStudio}
              selectedFormule={selectedFormule}
              selectedExtras={selectedExtras}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              selectedDuration={selectedDuration}
              onEditStep={handleEditStep}
            />

            {/* Step content */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <StudioStep
                  key="step1"
                  selectedStudio={selectedStudio}
                  selectedDuration={selectedDuration}
                  onSelectStudio={handleSelectStudio}
                  onSelectDuration={setSelectedDuration}
                  onOpenStudioDetail={setStudioDetailModal}
                  durationSectionRef={durationSectionRef}
                />
              )}
              {currentStep === 2 && (
                <FormuleStep
                  key="step2"
                  selectedFormule={selectedFormule}
                  selectedDuration={selectedDuration}
                  onSelectFormule={handleSelectFormule}
                />
              )}
              {currentStep === 3 && (
                <ExtrasStep
                  key="step3"
                  selectedExtras={selectedExtras}
                  extraCategory={extraCategory}
                  searchExtra={searchExtra}
                  filteredExtras={filteredExtras}
                  extrasPrice={extrasPrice}
                  onToggleExtra={handleToggleExtra}
                  onSetCategory={setExtraCategory}
                  onSetSearch={setSearchExtra}
                  onOpenExtraDetail={setExtraDetailModal}
                />
              )}
              {currentStep === 4 && (
                <SummaryStep
                  key="step4"
                  selectedStudio={selectedStudio}
                  selectedFormule={selectedFormule}
                  selectedDuration={selectedDuration}
                  selectedExtras={selectedExtras}
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  studioPrice={studioPrice}
                  formulePrice={formulePrice}
                  extrasPrice={extrasPrice}
                  totalPrice={totalPrice}
                  isProcessing={isProcessing}
                  canProceed={canProceed()}
                  onSelectDate={setSelectedDate}
                  onSelectSlot={setSelectedSlot}
                  onCheckout={handleCheckout}
                />
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-white/10">
              <motion.button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
                whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep > 1
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Retour
              </motion.button>

              {/* Mobile price summary (hidden on desktop as it's in sidebar) */}
              <div className="text-center lg:hidden">
                <div className="text-sm text-white/60">Total</div>
                <div className="text-2xl font-black text-white">{totalPrice}€</div>
              </div>

              {currentStep < 4 ? (
                <motion.button
                  ref={continueButtonRef}
                  onClick={handleNextStep}
                  disabled={!canProceed()}
                  whileHover={canProceed() ? { scale: 1.02 } : {}}
                  whileTap={canProceed() ? { scale: 0.98 } : {}}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    canProceed()
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  Continuer
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <div className="w-32" />
              )}
            </div>
          </div>

          {/* Right column - Sidebar summary (1/3 on desktop) */}
          <div className="lg:col-span-1">
            <BookingSidebar
              selectedStudio={selectedStudio}
              selectedFormule={selectedFormule}
              selectedDuration={selectedDuration}
              selectedExtras={selectedExtras}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              studioPrice={studioPrice}
              formulePrice={formulePrice}
              extrasPrice={extrasPrice}
              totalPrice={totalPrice}
              onEditStep={handleEditStep}
              onCheckout={handleCheckout}
              currentStep={currentStep}
              canCheckout={canProceed() && currentStep === 4}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>

      {/* Bottom Sheet for mobile */}
      <BookingBottomSheet
        selectedStudio={selectedStudio}
        selectedFormule={selectedFormule}
        selectedDuration={selectedDuration}
        selectedExtras={selectedExtras}
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        studioPrice={studioPrice}
        formulePrice={formulePrice}
        extrasPrice={extrasPrice}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
        canCheckout={canProceed() && currentStep === 4}
        isProcessing={isProcessing}
      />
    </section>
  );
}
