/**
 * StudioBookingFlow - Parcours de réservation en 4 étapes
 * 
 * Étape 1: Choix du studio
 * Étape 2: Choix de la formule (Autonome/Assisté/Full Service)
 * Étape 3: Ajout des extras
 * Étape 4: Récapitulatif & Paiement
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Mic, Radio, Users, MessageSquare, Smartphone,
  Check, ChevronRight, ChevronLeft, ArrowRight,
  Scissors, Camera, Car, Coffee, Sparkles, Music,
  Palette, Heart, FileText, Package, Star, Zap,
  Calendar, Clock, Loader2, X, Filter, Search
} from 'lucide-react';
import { useShopifyCheckout } from '../../hooks/useShopifyCheckout';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';

// ============================================================
// TYPES
// ============================================================

interface Studio {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  basePrice: number;
  features: string[];
  recommended?: boolean;
}

interface Formule {
  id: string;
  name: string;
  tagline: string;
  price: number;
  unit: string;
  color: string;
  icon: string;
  features: string[];
  recommended?: boolean;
  variants: { duration: string; price: number; sku: string }[];
}

interface Extra {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  popular?: boolean;
  icon: any;
}

interface CartItem {
  type: 'studio' | 'formule' | 'extra';
  id: string;
  name: string;
  price: number;
  variantId?: string;
  quantity?: number;
}

// ============================================================
// DATA - STUDIOS
// ============================================================

const STUDIOS: Studio[] = [
  {
    id: 'face-cam-solo',
    name: 'Studio Face-Cam Solo',
    shortName: 'Face-Cam',
    description: 'Parfait pour vlogs, tutoriels et contenus solo',
    icon: Video,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    basePrice: 45,
    features: ['1 caméra 4K', 'Éclairage 3 points', 'Micro cravate', 'Téléprompter inclus'],
    recommended: true,
  },
  {
    id: 'podcast-audio',
    name: 'Studio Podcast Audio',
    shortName: 'Podcast',
    description: 'Configuration audio pro pour podcasts',
    icon: Mic,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    basePrice: 55,
    features: ['4 micros Shure SM7B', 'Console RodeCaster', 'Casques monitoring', 'Traitement acoustique'],
  },
  {
    id: 'live-stream',
    name: 'Studio Live Stream',
    shortName: 'Live',
    description: 'Multi-caméras pour streaming pro',
    icon: Radio,
    color: 'red',
    gradient: 'from-red-500 to-orange-500',
    basePrice: 75,
    features: ['3 caméras', 'ATEM Mini Pro', 'Overlay personnalisé', 'Chat management'],
  },
  {
    id: 'talk-show',
    name: 'Studio Émission / Talk-Show',
    shortName: 'Talk-Show',
    description: 'Plateau TV pour émissions et interviews',
    icon: Users,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    basePrice: 95,
    features: ['Plateau 4 places', '4 caméras', 'Décor modulable', 'Régie intégrée'],
    recommended: true,
  },
  {
    id: 'interview',
    name: 'Studio Interview Intimiste',
    shortName: 'Interview',
    description: 'Ambiance cosy pour interviews profondes',
    icon: MessageSquare,
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-500',
    basePrice: 65,
    features: ['2 places face à face', 'Éclairage cinématique', 'Fond bokeh', 'Son broadcast'],
  },
  {
    id: 'vertical-social',
    name: 'Studio Vertical Social',
    shortName: 'Vertical',
    description: 'Optimisé TikTok, Reels, Shorts',
    icon: Smartphone,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    basePrice: 40,
    features: ['Setup vertical 9:16', 'Ring light pro', 'Fond LED RGB', 'Prompteur vertical'],
  },
];

// ============================================================
// DATA - FORMULES
// ============================================================

const FORMULES: Formule[] = [
  {
    id: 'autonome',
    name: 'Autonome',
    tagline: 'Je gère, vous installez',
    price: 0,
    unit: 'inclus',
    color: 'emerald',
    icon: '🟢',
    features: [
      'Installation du matériel par notre tech',
      'Briefing de 15 minutes',
      'Support téléphone pendant la session',
      'Vous gérez le reste en toute autonomie',
    ],
    variants: [
      { duration: '2h', price: 0, sku: 'FORM-AUTO-2H' },
      { duration: '4h', price: 0, sku: 'FORM-AUTO-4H' },
      { duration: '8h', price: 0, sku: 'FORM-AUTO-8H' },
    ],
  },
  {
    id: 'assiste',
    name: 'Assisté',
    tagline: 'Accompagnement technique',
    price: 60,
    unit: '/h',
    color: 'amber',
    icon: '🟡',
    recommended: true,
    features: [
      'Tout le pack Autonome',
      'Tech dédié pendant toute la session',
      'Cadrage et recadrage temps réel',
      'Gestion éclairage et audio',
      'Monitoring et conseils posture',
      'Backup fichiers sécurisé',
    ],
    variants: [
      { duration: '2h', price: 120, sku: 'FORM-ASSIST-2H' },
      { duration: '4h', price: 220, sku: 'FORM-ASSIST-4H' },
      { duration: '8h', price: 400, sku: 'FORM-ASSIST-8H' },
    ],
  },
  {
    id: 'full-service',
    name: 'Full Service',
    tagline: 'Expertise totale, clé en main',
    price: 295,
    unit: '/h',
    color: 'red',
    icon: '🔴',
    features: [
      'Tout le pack Assisté',
      'Appel stratégique avant tournage',
      'Rédaction script incluse',
      'Direction artistique complète',
      'Coaching caméra personnalisé',
      'Montage professionnel inclus',
      'Color grading cinématique',
      'Mixage audio broadcast',
      'Sous-titres incrustés',
      '3 formats de sortie (16:9, 9:16, 1:1)',
      'Miniature YouTube offerte',
      '2 révisions incluses',
      'Livraison en 5 jours',
    ],
    variants: [
      { duration: '2h', price: 590, sku: 'FORM-FULL-2H' },
      { duration: '4h', price: 990, sku: 'FORM-FULL-4H' },
      { duration: '8h', price: 1790, sku: 'FORM-FULL-8H' },
    ],
  },
];

// ============================================================
// DATA - EXTRAS PAR CATÉGORIE
// ============================================================

const EXTRAS_CATEGORIES = [
  { id: 'all', name: 'Tout', icon: Package },
  { id: 'post-production', name: 'Post-Prod', icon: Scissors },
  { id: 'equipement', name: 'Équipement', icon: Camera },
  { id: 'beauty', name: 'Beauty', icon: Sparkles },
  { id: 'transport', name: 'Transport', icon: Car },
  { id: 'catering', name: 'Catering', icon: Coffee },
  { id: 'technique', name: 'Technique', icon: Music },
  { id: 'decoration', name: 'Déco', icon: Palette },
  { id: 'wellness', name: 'Wellness', icon: Heart },
];

const EXTRAS: Extra[] = [
  // POST-PRODUCTION
  { id: 'montage-standard', name: 'Montage Standard', category: 'post-production', price: 79, unit: '/h rush', description: 'Montage pro avec transitions et titres', popular: true, icon: Scissors },
  { id: 'montage-premium', name: 'Montage Premium', category: 'post-production', price: 120, unit: '/h rush', description: 'Montage cinématique avec motion design', popular: true, icon: Scissors },
  { id: 'clipping-shorts', name: 'Pack Clipping Shorts', category: 'post-production', price: 149, unit: '/pack', description: '5-10 clips optimisés TikTok/Reels', popular: true, icon: Smartphone },
  { id: 'miniatures', name: 'Pack Miniatures (3)', category: 'post-production', price: 39, unit: '/pack', description: '3 miniatures YouTube optimisées CTR', popular: true, icon: Camera },
  { id: 'sous-titrage', name: 'Sous-titrage FR/EN', category: 'post-production', price: 45, unit: '/h vidéo', description: 'Sous-titres pro incrustés', icon: FileText },
  { id: 'mixage-audio', name: 'Mixage Audio Pro', category: 'post-production', price: 55, unit: '/h vidéo', description: 'Nettoyage et mastering audio', icon: Music },
  { id: 'etalonnage', name: 'Étalonnage Cinéma', category: 'post-production', price: 149, unit: '/vidéo', description: 'Color grading professionnel', popular: true, icon: Palette },

  // ÉQUIPEMENT
  { id: 'teleprompter', name: 'Téléprompter 15"', category: 'equipement', price: 15, unit: '/h', description: 'Avec iPad et télécommande', popular: true, icon: FileText },
  { id: 'camera-extra', name: 'Caméra Extra Sony FX3', category: 'equipement', price: 25, unit: '/h', description: 'Angle supplémentaire 4K', icon: Camera },
  { id: 'atem-live', name: 'Live-Switch ATEM', category: 'equipement', price: 35, unit: '/h', description: 'Régie multi-caméras live', popular: true, icon: Radio },
  { id: 'micro-cravate', name: 'Micro Cravate HF', category: 'equipement', price: 15, unit: '/h', description: 'Sennheiser sans fil', popular: true, icon: Mic },
  { id: 'micro-sm7b', name: 'Micro Shure SM7B', category: 'equipement', price: 25, unit: '/h', description: 'Le micro podcast par excellence', popular: true, icon: Mic },

  // BEAUTY
  { id: 'maquillage-pro', name: 'Maquillage Pro', category: 'beauty', price: 89, unit: '/pers', description: 'Adapté caméra et éclairage', popular: true, icon: Sparkles },
  { id: 'maquillage-coiffure', name: 'Maquillage + Coiffure', category: 'beauty', price: 149, unit: '/pers', description: 'Pack complet maquillage et brushing', popular: true, icon: Sparkles },

  // TRANSPORT
  { id: 'navette-gare', name: 'Navette Gare', category: 'transport', price: 20, unit: 'A/R', description: 'Gare Saint-Charles', icon: Car },
  { id: 'navette-aeroport', name: 'Navette Aéroport', category: 'transport', price: 60, unit: 'A/R', description: 'Marseille-Provence', popular: true, icon: Car },

  // CATERING
  { id: 'coffee-break', name: 'Coffee Break', category: 'catering', price: 12, unit: '/pers', description: 'Café, thé, viennoiseries', popular: true, icon: Coffee },
  { id: 'dejeuner-traiteur', name: 'Déjeuner Traiteur', category: 'catering', price: 25, unit: '/pers', description: 'Entrée, plat, dessert, boissons', popular: true, icon: Coffee },

  // TECHNIQUE
  { id: 'regie-live', name: 'Régie Vidéo Live', category: 'technique', price: 149, unit: '/session', description: 'Technicien régie multi-caméras', popular: true, icon: Radio },
  { id: 'photographe-bts', name: 'Photographe BTS', category: 'technique', price: 299, unit: '/session', description: 'Behind-the-scenes + portraits', popular: true, icon: Camera },
  { id: 'drone', name: 'Drone Intérieur/Extérieur', category: 'technique', price: 399, unit: '/session', description: 'Prises de vues aériennes', icon: Camera },

  // DÉCORATION
  { id: 'deco-personnalisee', name: 'Décoration Personnalisée', category: 'decoration', price: 299, unit: '/setup', description: 'Setup déco selon votre univers', popular: true, icon: Palette },
  { id: 'setup-gaming', name: 'Setup Gaming RGB', category: 'decoration', price: 249, unit: '/setup', description: 'Configuration gaming avec LEDs', popular: true, icon: Zap },

  // WELLNESS
  { id: 'massage-express', name: 'Massage Express', category: 'wellness', price: 49, unit: '/30min', description: 'Relaxation avant tournage', icon: Heart },
  { id: 'yoga-meditation', name: 'Yoga/Méditation', category: 'wellness', price: 119, unit: '/session', description: 'Se recentrer avant de passer devant la caméra', icon: Heart },
];

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function StudioBookingFlow() {
  // État principal
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [selectedFormule, setSelectedFormule] = useState<Formule | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('2h');
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [extraCategory, setExtraCategory] = useState('all');
  const [searchExtra, setSearchExtra] = useState('');
  
  // Date et créneau
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Client
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  // Shopify
  const { createCheckout, loading: checkoutLoading } = useShopifyCheckout();

  // ============================================================
  // CALCULS
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

  // Filtrer les extras
  const filteredExtras = useMemo(() => {
    return EXTRAS.filter(extra => {
      const matchCategory = extraCategory === 'all' || extra.category === extraCategory;
      const matchSearch = extra.name.toLowerCase().includes(searchExtra.toLowerCase()) ||
                          extra.description.toLowerCase().includes(searchExtra.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [extraCategory, searchExtra]);

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

  const handleCheckout = async () => {
    // TODO: Intégrer avec Shopify
    console.log('Checkout:', {
      studio: selectedStudio,
      formule: selectedFormule,
      duration: selectedDuration,
      extras: selectedExtras,
      total: totalPrice,
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedStudio !== null;
      case 2: return selectedFormule !== null;
      case 3: return true; // Extras optionnels
      case 4: return customerName && customerEmail && selectedSlot;
      default: return false;
    }
  };

  // Générer les prochains jours
  const generateNextDays = (count: number): Date[] => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const availableSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  // ============================================================
  // RENDER - STEPPER
  // ============================================================

  const renderStepper = () => (
    <div className="flex items-center justify-center mb-8 md:mb-12">
      {[1, 2, 3, 4].map((step, idx) => (
        <div key={step} className="flex items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: currentStep >= step ? 1 : 0.8 }}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all ${
              currentStep > step
                ? 'bg-emerald-500 text-white'
                : currentStep === step
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-white/10 text-white/40'
            }`}
          >
            {currentStep > step ? <Check className="w-5 h-5" /> : step}
          </motion.div>
          {idx < 3 && (
            <div className={`w-8 md:w-16 h-1 mx-1 md:mx-2 rounded-full transition-all ${
              currentStep > step ? 'bg-emerald-500' : 'bg-white/10'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  // ============================================================
  // RENDER - ÉTAPE 1: CHOIX STUDIO
  // ============================================================

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-2">
          Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">studio</span>
        </h2>
        <p className="text-white/60">Sélectionnez le studio adapté à votre projet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {STUDIOS.map((studio) => {
          const Icon = studio.icon;
          const isSelected = selectedStudio?.id === studio.id;
          
          return (
            <motion.button
              key={studio.id}
              onClick={() => handleSelectStudio(studio)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? `border-${studio.color}-500 bg-gradient-to-br ${studio.gradient} shadow-lg shadow-${studio.color}-500/20`
                  : 'border-white/10 bg-zinc-900/50 hover:border-white/20'
              }`}
            >
              {studio.recommended && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-amber-500 rounded-full text-xs font-bold text-black">
                  ⭐ Recommandé
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  isSelected ? 'bg-white/20' : `bg-${studio.color}-500/10`
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isSelected ? 'text-white' : `text-${studio.color}-400`
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-white'}`}>
                    {studio.shortName}
                  </h3>
                  <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                    {studio.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {studio.features.slice(0, 2).map((feature, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-lg text-xs ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60'
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-2xl font-black ${isSelected ? 'text-white' : 'text-white'}`}>
                  {studio.basePrice}€<span className="text-sm font-normal opacity-60">/h</span>
                </span>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-emerald-500" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Sélection durée */}
      {selectedStudio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            Durée de location
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {['2h', '4h', '8h'].map((dur) => (
              <button
                key={dur}
                onClick={() => setSelectedDuration(dur)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedDuration === dur
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="text-2xl font-black text-white">{dur}</div>
                <div className="text-sm text-white/60">
                  {dur === '2h' ? 'Standard' : dur === '4h' ? 'Demi-journée' : 'Journée'}
                </div>
                <div className="text-lg font-bold text-emerald-400 mt-2">
                  {selectedStudio.basePrice * parseInt(dur)}€
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  // ============================================================
  // RENDER - ÉTAPE 2: CHOIX FORMULE
  // ============================================================

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-2">
          Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">formule</span>
        </h2>
        <p className="text-white/60">Quel niveau d'accompagnement souhaitez-vous ?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {FORMULES.map((formule) => {
          const isSelected = selectedFormule?.id === formule.id;
          const variant = formule.variants.find(v => v.duration === selectedDuration);
          const price = variant?.price || 0;
          
          return (
            <motion.button
              key={formule.id}
              onClick={() => handleSelectFormule(formule)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? `border-${formule.color}-500 bg-${formule.color}-500/10 shadow-lg shadow-${formule.color}-500/20`
                  : 'border-white/10 bg-zinc-900/50 hover:border-white/20'
              }`}
            >
              {formule.recommended && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-amber-500 rounded-full text-xs font-bold text-black">
                  ⭐ Recommandé
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{formule.icon}</span>
                <div>
                  <h3 className="font-bold text-xl text-white">{formule.name}</h3>
                  <p className="text-sm text-white/60">{formule.tagline}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                {formule.features.slice(0, 5).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      isSelected ? `text-${formule.color}-400` : 'text-emerald-400'
                    }`} />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
                {formule.features.length > 5 && (
                  <div className="text-sm text-white/40">
                    +{formule.features.length - 5} autres avantages...
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  {price === 0 ? (
                    <span className="text-2xl font-black text-emerald-400">Inclus</span>
                  ) : (
                    <>
                      <span className="text-2xl font-black text-white">+{price}€</span>
                      <span className="text-sm text-white/60 ml-1">pour {selectedDuration}</span>
                    </>
                  )}
                </div>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-8 h-8 rounded-full bg-${formule.color}-500 flex items-center justify-center`}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Comparatif détaillé */}
      <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="font-bold text-lg text-white mb-4">Comparatif des formules</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/60">Inclus</th>
                {FORMULES.map(f => (
                  <th key={f.id} className="text-center py-3 px-4 text-white">{f.icon} {f.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 text-white/80">Installation matériel</td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 text-white/80">Tech dédié</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 text-white/80">Montage inclus</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 text-white/80">Script inclus</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/80">Livraison clé en main</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  // ============================================================
  // RENDER - ÉTAPE 3: EXTRAS
  // ============================================================

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-2">
          Ajoutez des <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">extras</span>
        </h2>
        <p className="text-white/60">Personnalisez votre expérience (optionnel)</p>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Catégories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {EXTRAS_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setExtraCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  extraCategory === cat.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Recherche */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchExtra}
            onChange={(e) => setSearchExtra(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Extras sélectionnés */}
      {selectedExtras.length > 0 && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-white">{selectedExtras.length} extra(s) sélectionné(s)</span>
            <span className="text-emerald-400 font-bold">+{extrasPrice}€</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedExtras.map((extra) => (
              <span
                key={extra.id}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm text-white"
              >
                {extra.name}
                <button
                  onClick={() => handleToggleExtra(extra)}
                  className="hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Grille des extras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExtras.map((extra) => {
          const isSelected = selectedExtras.some(e => e.id === extra.id);
          const Icon = extra.icon;
          
          return (
            <motion.button
              key={extra.id}
              onClick={() => handleToggleExtra(extra)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-white/10 bg-zinc-900/50 hover:border-white/20'
              }`}
            >
              {extra.popular && (
                <div className="absolute -top-2 right-4 px-2 py-0.5 bg-amber-500 rounded-full text-xs font-bold text-black">
                  ⭐ Populaire
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-white/60'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white truncate">{extra.name}</h4>
                  <p className="text-xs text-white/60 line-clamp-2">{extra.description}</p>
                </div>
                
                {isSelected && (
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                )}
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-white">
                  {extra.price}€
                  <span className="text-xs font-normal text-white/60 ml-1">{extra.unit}</span>
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {filteredExtras.length === 0 && (
        <div className="text-center py-12 text-white/40">
          Aucun extra trouvé pour cette recherche
        </div>
      )}
    </motion.div>
  );

  // ============================================================
  // RENDER - ÉTAPE 4: RÉCAPITULATIF
  // ============================================================

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-2">
          Finalisez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">réservation</span>
        </h2>
        <p className="text-white/60">Vérifiez votre commande et complétez vos informations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne gauche - Date, créneau, infos */}
        <div className="space-y-6">
          {/* Date */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Sélectionnez une date
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {generateNextDays(14).map((day, idx) => {
                const isSelected = day.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(day)}
                    className={`p-2 rounded-xl text-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-white/60'
                    }`}
                  >
                    <div className="text-xs font-bold">{formatDate(day).split(' ')[0]}</div>
                    <div className="text-lg font-bold">{day.getDate()}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Créneaux */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Choisissez un créneau
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedSlot === slot
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="text-white font-bold">{slot}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Infos client */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Vos informations</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Nom complet *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Email *</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite - Récap */}
        <div>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 sticky top-4">
            <h3 className="text-xl font-bold text-white mb-6">Récapitulatif</h3>
            
            <div className="space-y-4">
              {/* Studio */}
              {selectedStudio && (
                <div className="flex justify-between items-center text-white/90 pb-3 border-b border-white/20">
                  <div>
                    <div className="font-semibold">{selectedStudio.name}</div>
                    <div className="text-sm text-white/60">{selectedDuration}</div>
                  </div>
                  <span className="font-bold">{studioPrice}€</span>
                </div>
              )}

              {/* Formule */}
              {selectedFormule && formulePrice > 0 && (
                <div className="flex justify-between items-center text-white/90 pb-3 border-b border-white/20">
                  <div>
                    <div className="font-semibold">Formule {selectedFormule.name}</div>
                    <div className="text-sm text-white/60">{selectedDuration}</div>
                  </div>
                  <span className="font-bold">+{formulePrice}€</span>
                </div>
              )}

              {/* Extras */}
              {selectedExtras.length > 0 && (
                <div className="pb-3 border-b border-white/20">
                  <div className="text-white/90 font-semibold mb-2">Extras ({selectedExtras.length})</div>
                  {selectedExtras.map((extra) => (
                    <div key={extra.id} className="flex justify-between items-center text-white/70 text-sm py-1">
                      <span>{extra.name}</span>
                      <span>+{extra.price}€</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Date et créneau */}
              {selectedSlot && (
                <div className="flex justify-between items-center text-white/90">
                  <span>Date & Créneau</span>
                  <span className="font-semibold">{formatDate(selectedDate)} - {selectedSlot}</span>
                </div>
              )}

              {/* Total */}
              <div className="pt-4 mt-4 border-t-2 border-white/30">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xl font-bold">Total</span>
                  <span className="text-white text-3xl font-black">{totalPrice}€</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleCheckout}
              disabled={!canProceed() || checkoutLoading}
              whileHover={canProceed() ? { scale: 1.02 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
              className={`w-full mt-6 py-4 rounded-xl font-montserrat font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                canProceed()
                  ? 'bg-white text-emerald-600 shadow-xl hover:shadow-2xl'
                  : 'bg-white/20 text-white/40 cursor-not-allowed'
              }`}
            >
              {checkoutLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Traitement...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Confirmer et payer</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="text-white/60 text-xs text-center mt-4">
              🔒 Paiement sécurisé via Shopify
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ============================================================
  // RENDER PRINCIPAL
  // ============================================================

  return (
    <section id="booking-flow" className="relative py-16 md:py-24 bg-gradient-to-b from-black to-zinc-950 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Titre section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
            RÉSERVEZ
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              VOTRE SESSION
            </span>
          </h1>
        </motion.div>

        {/* Stepper */}
        {renderStepper()}

        {/* Contenu étape */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
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

          {/* Résumé prix mobile */}
          <div className="text-center">
            <div className="text-sm text-white/60">Total</div>
            <div className="text-2xl font-black text-white">{totalPrice}€</div>
          </div>

          {currentStep < 4 ? (
            <motion.button
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
            <div className="w-32" /> // Placeholder pour l'alignement
          )}
        </div>
      </div>
    </section>
  );
}