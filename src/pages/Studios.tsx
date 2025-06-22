import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Video, Clock, Users, Check, ArrowRight, Play, Mic, Camera, Calendar, Sparkles, Zap, Headphones, Radio, Film, Monitor, Wifi, Shield, Star, ChevronLeft, ChevronRight, X, ShoppingCart, Plus, Coffee, Car, Utensils, MapPin, Phone, Palette, Volume2, Image, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

// Setups disponibles avec design amélioré
const studioSetups = [
  {
    id: 'full-show',
    name: 'Full Show',
    subtitle: 'Talk-show & émissions',
    capacity: '4-8 personnes',
    description: 'Grand plateau 50m² avec décors premium pour émissions professionnelles',
    usage: 'Talk-show, table ronde, émission, quiz',
    basePrice: 119,
    recommendedDuration: '3h',
    popular: true,
    color: 'purple',
    gradient: 'from-purple-600 via-purple-500 to-pink-600',
    shadowColor: 'shadow-purple-500/25',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Radio,
    equipment: {
      cameras: '4-6 caméras Sony FX3',
      audio: '8 micros Shure SM7B',
      light: 'Éclairage 3 points + RGB',
      extras: 'Table modulable, décors NV Gallery'
    },
    relevantOptions: ['live-switch', 'extra-cameras', 'buffet', 'transport-gare'],
    animationDelay: 0
  },
  {
    id: 'intimiste',
    name: 'Intimiste',
    subtitle: 'Interview & podcast vidéo',
    capacity: '2-3 personnes',
    description: 'Setup cosy avec canapé et éclairage cinéma pour interviews intimes',
    usage: 'Interview, podcast vidéo, conversation',
    basePrice: 119,
    recommendedDuration: '1h',
    color: 'emerald',
    gradient: 'from-emerald-600 via-teal-500 to-cyan-600',
    shadowColor: 'shadow-emerald-500/25',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Mic,
    equipment: {
      cameras: '2 caméras Sony FX3',
      audio: '3 micros SM7B ou lavaliers',
      light: 'Éclairage doux cinéma',
      extras: 'Canapé design, décor cosy'
    },
    relevantOptions: ['teleprompter', 'color-grading', 'transport-gare'],
    animationDelay: 0.1
  },
  {
    id: 'face-cam',
    name: 'Face-cam Solo',
    subtitle: 'YouTube & masterclass',
    capacity: '1 personne',
    description: 'Configuration solo optimisée pour créateurs de contenu',
    usage: 'Vidéo YouTube, cours en ligne, vlog',
    basePrice: 119,
    recommendedDuration: '1h',
    popular: true,
    color: 'blue',
    gradient: 'from-blue-600 via-indigo-500 to-purple-600',
    shadowColor: 'shadow-blue-500/25',
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Camera,
    equipment: {
      cameras: '1 caméra Sony FX3 4K',
      audio: '1 micro SM7B sur perche',
      light: 'Key light + rim light',
      extras: 'Fond modulable'
    },
    relevantOptions: ['teleprompter', 'subtitles', 'shorts-pack'],
    animationDelay: 0.2
  },
  {
    id: 'tiktok',
    name: 'TikTok Studio',
    subtitle: 'Contenu vertical',
    capacity: '1-2 personnes',
    description: 'Studio optimisé pour formats courts verticaux',
    usage: 'TikTok, Reels, Shorts',
    basePrice: 119,
    recommendedDuration: '1h',
    color: 'pink',
    gradient: 'from-pink-600 via-rose-500 to-red-600',
    shadowColor: 'shadow-pink-500/25',
    image: 'https://images.pexels.com/photos/9786304/pexels-photo-9786304.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Zap,
    equipment: {
      cameras: '1 FX3 montée verticale',
      audio: 'Micro cravate sans fil',
      light: 'Ring light 18" + LED RGB',
      extras: 'Fonds colorés'
    },
    relevantOptions: ['shorts-pack', 'calendar', 'tiktok-boost'],
    animationDelay: 0.3
  },
  {
    id: 'podcast-audio',
    name: 'Podcast Audio',
    subtitle: 'Enregistrement pro',
    capacity: '2-4 voix',
    description: 'Studio dédié podcast avec acoustique traitée',
    usage: 'Podcast audio, voix-off, audiobook',
    basePrice: 119,
    recommendedDuration: '1h',
    color: 'violet',
    gradient: 'from-violet-600 via-purple-500 to-indigo-600',
    shadowColor: 'shadow-violet-500/25',
    image: 'https://images.pexels.com/photos/3784324/pexels-photo-3784324.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Headphones,
    equipment: {
      cameras: 'Vidéo optionnelle (+2 FX3)',
      audio: '4 SM7B → RØDECaster Pro II',
      light: 'Éclairage d\'ambiance',
      extras: 'Table ronde, isolation acoustique'
    },
    relevantOptions: ['motion-podcast', 'thumbnail', 'transport-gare'],
    animationDelay: 0.4
  },
  {
    id: 'stream',
    name: 'Stream/Webinaire',
    subtitle: 'Live multi-plateformes',
    capacity: '1-3 personnes',
    description: 'Configuration streaming avec régie live intégrée',
    usage: 'Twitch, webinaire, live YouTube',
    basePrice: 119,
    recommendedDuration: '1h',
    color: 'red',
    gradient: 'from-red-600 via-orange-500 to-yellow-600',
    shadowColor: 'shadow-red-500/25',
    image: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Radio,
    equipment: {
      cameras: '2 FX3 + 1 PTZ',
      audio: 'Micro broadcast + retour',
      light: 'Éclairage streaming',
      extras: 'ATEM Mini Pro, OBS'
    },
    relevantOptions: ['live-switch', 'dashboard', 'transport-gare'],
    animationDelay: 0.5
  },
  {
    id: 'photo',
    name: 'Studio Photo',
    subtitle: 'Portraits & packshot',
    capacity: '1-4 personnes',
    description: 'Studio photo avec cyclo et éclairage modulable',
    usage: 'Portrait, packshot e-commerce, lookbook',
    basePrice: 119,
    recommendedDuration: '1h',
    color: 'amber',
    gradient: 'from-amber-600 via-yellow-500 to-orange-600',
    shadowColor: 'shadow-amber-500/25',
    image: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Image,
    equipment: {
      cameras: 'Sony A7IV ou FX3',
      audio: 'N/A',
      light: '2 softbox + strip light',
      extras: 'Cyclo blanc/gris/vert'
    },
    relevantOptions: ['extra-backdrop', 'retouching', 'transport-gare'],
    animationDelay: 0.6
  }
];

// Formules avec nouveau design
const formulas = [
  {
    id: 'studio',
    name: 'Studio',
    description: 'Tournage brut',
    longDescription: 'Accès au studio équipé avec technicien',
    priceMultiplier: 1,
    priceAddition: 0,
    displayPrice: 'Prix de base',
    icon: Camera,
    features: [
      'Plateau équipé complet',
      'Technicien sur place',
      'Transfert des rushs',
      'Installation incluse'
    ]
  },
  {
    id: 'postprod',
    name: 'Post-Prod',
    description: 'Tournage + montage',
    longDescription: 'Production complète avec montage professionnel',
    priceMultiplier: 1.42,
    priceAddition: 0,
    displayPrice: '+42% du prix studio',
    icon: Film,
    features: [
      'Tout le pack Studio',
      'Montage professionnel',
      'Colorimétrie de base',
      'Exports optimisés',
      '1 révision incluse'
    ],
    popular: true
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Création complète',
    longDescription: 'Solution clé en main avec stratégie créative',
    priceMultiplier: 2.5,
    priceAddition: 0,
    displayPrice: '+150% du prix studio',
    icon: Sparkles,
    features: [
      'Tout le pack Post-Prod',
      'Stratégie créative',
      'SEO & optimisation',
      'Distribution multi-plateformes',
      'Analytics & suivi'
    ]
  }
];

// Options optimisées
const optionsCatalog = {
  'live-switch': { 
    name: 'Live-Switch ATEM', 
    price: 149, 
    unit: '/h',
    description: 'Master monté en direct',
    icon: Layers,
    recommended: true
  },
  'extra-cameras': { 
    name: '2 caméras supplémentaires', 
    price: 98, 
    unit: '/h',
    icon: Camera
  },
  'teleprompter': { 
    name: 'Téléprompteur + iPad', 
    price: 25, 
    unit: '/h',
    icon: Monitor
  },
  'color-grading': { 
    name: 'Color grading cinéma', 
    price: 99, 
    unit: 'fixe',
    icon: Palette
  },
  'subtitles': { 
    name: 'Sous-titres dynamiques', 
    price: 49, 
    unit: 'fixe',
    icon: Monitor
  },
  'shorts-pack': { 
    name: 'Pack 3 Shorts', 
    price: 149, 
    unit: 'fixe',
    icon: Zap,
    popular: true
  },
  'motion-podcast': { 
    name: 'Habillage motion', 
    price: 99, 
    unit: '/min',
    icon: Film
  },
  'thumbnail': { 
    name: 'Miniature YouTube', 
    price: 35, 
    unit: 'fixe',
    icon: Image
  },
  'calendar': { 
    name: 'Calendrier 30j', 
    price: 299, 
    unit: 'fixe',
    icon: Calendar
  },
  'tiktok-boost': { 
    name: 'Boost TikTok 50k', 
    price: 219, 
    unit: 'fixe',
    icon: Zap
  },
  'dashboard': { 
    name: 'Dashboard analytics', 
    price: 99, 
    unit: '/mois',
    icon: Monitor
  },
  'extra-backdrop': { 
    name: 'Fond supplémentaire', 
    price: 10, 
    unit: 'fixe',
    icon: Image
  },
  'retouching': { 
    name: 'Retouche pro', 
    price: 5, 
    unit: '/photo',
    icon: Palette
  },
  'buffet': { 
    name: 'Buffet journée', 
    price: 99, 
    unit: 'fixe',
    icon: Utensils
  },
  'transport-gare': { 
    name: 'Navette Gare', 
    price: 25, 
    unit: 'A/R',
    icon: Car
  },
  'transport-airport': { 
    name: 'Navette Aéroport', 
    price: 49, 
    unit: 'A/R',
    icon: Car
  }
};

// Durées
const durations = [
  { id: '1h', label: '1 heure', hours: 1, multiplier: 1 },
  { id: '3h', label: '3 heures', hours: 3, multiplier: 2.76, discount: '-8%', popular: true },
  { id: '7h', label: 'Journée', hours: 7, multiplier: 5.03, discount: '-28%' }
];

export default function Studios() {
  const [selectedSetup, setSelectedSetup] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('3h');
  const [selectedFormula, setSelectedFormula] = useState('postprod');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [hoveredSetup, setHoveredSetup] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedStudioGallery, setSelectedStudioGallery] = useState(null);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Calculer le prix
  const calculatePrice = () => {
    if (!selectedSetup) return 0;
    
    const duration = durations.find(d => d.id === selectedDuration);
    const formula = formulas.find(f => f.id === selectedFormula);
    const basePrice = selectedSetup.basePrice;
    
    let total = basePrice * duration.multiplier * formula.priceMultiplier;
    
    selectedOptions.forEach(optionId => {
      const option = optionsCatalog[optionId];
      if (option) {
        if (option.unit === '/h') {
          total += option.price * duration.hours;
        } else {
          total += option.price;
        }
      }
    });
    
    return Math.round(total);
  };

  // Toggle option
  const toggleOption = (optionId) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  // Ouvrir configurateur
  const openConfigurator = (setup) => {
    setSelectedSetup(setup);
    setShowConfigurator(true);
    setSelectedOptions([]);
    setActiveStep(1);
    if (setup.id === 'full-show') {
      setSelectedOptions(['live-switch']);
    }
  };

  // Données des studios pour la galerie
  const studioGalleryData = [
    {
      id: 1,
      title: "Studio A - Plateau principal",
      mainImage: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "50m²",
      images: [
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
      ],
      description: "Notre plateau principal de 50m² est l'espace idéal pour vos productions d'envergure. Équipé de décors modulables NV Gallery et Maisons du Monde, il peut accueillir jusqu'à 8 personnes confortablement. L'éclairage 3 points professionnel et les panneaux RGB permettent de créer n'importe quelle ambiance.",
      features: [
        "4-6 caméras Sony FX3 4K",
        "Table modulable pour talk-show",
        "Décors premium interchangeables",
        "Éclairage Nanlite Forza 500",
        "Fond motorisé 3 couleurs"
      ]
    },
    {
      id: 2,
      title: "Régie technique",
      mainImage: "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "Live streaming",
      images: [
        "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600"
      ],
      description: "Notre régie technique ultramoderne est le cœur névralgique de vos productions live. Avec l'ATEM Mini Extreme ISO et notre configuration OBS optimisée, diffusez en direct sur toutes les plateformes simultanément. Le monitoring multi-écrans permet un contrôle total de votre production.",
      features: [
        "ATEM Mini Extreme ISO",
        "Monitoring 4 écrans",
        "Streaming multi-plateformes",
        "Enregistrement ISO multi-pistes",
        "RØDECaster Pro II"
      ]
    },
    {
      id: 3,
      title: "Studio Podcast",
      mainImage: "https://images.pexels.com/photos/7586657/pexels-photo-7586657.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "Acoustique traitée",
      images: [
        "https://images.pexels.com/photos/7586657/pexels-photo-7586657.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4907238/pexels-photo-4907238.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7586438/pexels-photo-7586438.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4907245/pexels-photo-4907245.jpeg?auto=compress&cs=tinysrgb&w=1600"
      ],
      description: "Studio dédié de 15m² avec acoustique professionnellement traitée pour des enregistrements cristallins. La table ronde peut accueillir jusqu'à 4 personnes. L'isolation phonique garantit zéro perturbation extérieure. Idéal pour podcasts, voix-off et audiobooks.",
      features: [
        "4 micros Shure SM7B",
        "RØDECaster Pro II",
        "Traitement acoustique complet",
        "Table ronde 4 places",
        "Casques monitoring pro"
      ]
    },
    {
      id: 4,
      title: "Espace maquillage",
      mainImage: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "Loges privées",
      images: [
        "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3992858/pexels-photo-3992858.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3993398/pexels-photo-3993398.jpeg?auto=compress&cs=tinysrgb&w=1600"
      ],
      description: "Nos loges maquillage professionnelles offrent un espace calme et lumineux pour la préparation de vos talents. Miroirs Hollywood avec éclairage LED réglable, fauteuils ergonomiques et tout le nécessaire pour des retouches rapides entre les prises.",
      features: [
        "2 postes maquillage",
        "Miroirs Hollywood LED",
        "Portants costumes",
        "Espace détente privé",
        "Frigo & machine à café"
      ]
    },
    {
      id: 5,
      title: "Studio B - Fond vert",
      mainImage: "https://images.pexels.com/photos/7991486/pexels-photo-7991486.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "Effets spéciaux",
      images: [
        "https://images.pexels.com/photos/7991486/pexels-photo-7991486.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/7991163/pexels-photo-7991163.jpeg?auto=compress&cs=tinysrgb&w=1600"
      ],
      description: "Studio B équipé d'un cyclorama vert de 3x3m pour tous vos besoins en effets spéciaux et incrustation. L'éclairage uniforme garantit un keying parfait. Idéal pour créations YouTube, formations en ligne et publicités nécessitant des arrière-plans virtuels.",
      features: [
        "Cyclo vert 3x3m",
        "Éclairage uniforme spécialisé",
        "Sol vert amovible",
        "Monitoring temps réel",
        "Bibliothèque d'arrière-plans"
      ]
    },
    {
      id: 6,
      title: "Espace détente",
      mainImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "Lounge & café",
      images: [
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
      ],
      description: "Notre lounge de 60m² est l'endroit parfait pour accueillir vos invités, organiser des briefings ou simplement prendre une pause entre les prises. Ambiance cosy avec canapés confortables, espace café barista et connexion Wi-Fi ultra-rapide.",
      features: [
        "Espace lounge 60m²",
        "Machine café barista",
        "Canapés & fauteuils",
        "Écran briefing 65\"",
        "Cuisine équipée"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section Premium avec univers 3D immersif */}
        <motion.section 
          style={{ 
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY 
          }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background 3D Universe */}
          <div className="absolute inset-0">
            {/* Nebula animée */}
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[200px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-pink-600/20 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[250px]"></div>
              </motion.div>
            </div>

            {/* Grille 3D perspective */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(147, 51, 234, 0.3) 2px, transparent 2px)`,
                backgroundSize: '100px 100px',
                transform: 'perspective(1000px) rotateX(60deg) translateY(-50%)',
                transformOrigin: 'center center',
              }}
            />

            {/* Particules flottantes améliorées */}
            <div className="absolute inset-0">
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#3b82f6',
                    boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 50 - 25, 0],
                    opacity: [0, 1, 0],
                    scale: [0, Math.random() * 2 + 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 10,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Orbes lumineux flottants */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute w-64 h-64 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][i]}40 0%, transparent 70%)`,
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  filter: 'blur(40px)',
                }}
                animate={{
                  x: [0, 100, -100, 0],
                  y: [0, -100, 100, 0],
                  scale: [1, 1.5, 1, 1.5, 1],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 2,
                }}
              />
            ))}

            {/* Lignes de connexion animées */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              {[...Array(10)].map((_, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={`${Math.random() * 100}%`}
                  y1={`${Math.random() * 100}%`}
                  x2={`${Math.random() * 100}%`}
                  y2={`${Math.random() * 100}%`}
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.5,
                  }}
                />
              ))}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Contenu Hero Premium */}
          <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              style={{ x: springX, y: springY }}
            >
              {/* Badge premium animé */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", bounce: 0.5 }}
                className="inline-flex items-center gap-4 mb-10"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl"></div>
                  <div className="relative bg-black border border-purple-500/50 rounded-full px-8 py-3 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium tracking-wider text-sm uppercase">
                        Studios Premium • Marseille
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Titre principal avec effet 3D */}
              <motion.div className="mb-8">
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-[8rem] xl:text-[10rem] font-montserrat font-black leading-[0.85] tracking-tighter"
                  initial={{ opacity: 0, z: -100 }}
                  animate={{ opacity: 1, z: 0 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative inline-block"
                  >
                    <span className="text-white relative z-10">Studio</span>
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-transparent blur-2xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                  
                  <br />
                  
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="relative inline-block mt-[-0.2em]"
                  >
                    <span 
                      className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_100%] animate-gradient relative z-10"
                      style={{
                        WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                      }}
                    >
                      Vision
                    </span>
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-blue-600/30 blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </motion.h1>
              </motion.div>

              {/* Sous-titre avec effet typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="mb-12 max-w-4xl mx-auto"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
                  L'excellence créative à votre portée
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="text-lg md:text-xl text-white/50 mt-4"
                >
                  2 studios ultramodernes • 7 configurations • Équipe d'experts
                </motion.p>
              </motion.div>

              {/* Boutons avec design futuriste */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.3 }}
                className="flex flex-col lg:flex-row gap-6 justify-center items-center"
              >
                {/* Bouton principal */}
                <motion.button
                  onClick={() => document.getElementById('setups').scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-70 blur-xl group-hover:opacity-100 transition-opacity"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative bg-black border border-purple-500/50 backdrop-blur-xl rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
                    <div className="relative px-12 py-6 flex items-center gap-4">
                      <span className="text-white font-montserrat font-bold text-lg tracking-wide">
                        Découvrir l'expérience
                      </span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.button>

                {/* Bouton secondaire */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl px-10 py-6 border border-white/10 hover:border-white/30 transition-all">
                    <div className="flex items-center gap-3 text-white">
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-purple-600 rounded-full blur-xl"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <Play className="w-6 h-6 relative z-10" />
                      </div>
                      <span className="font-montserrat font-semibold">Visite immersive 360°</span>
                    </div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Pricing avec animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5, type: "spring" }}
                className="mt-20"
              >
                <div className="inline-flex flex-col items-center">
                  <p className="text-white/40 text-sm uppercase tracking-widest mb-3">À partir de</p>
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-2xl blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                    <div className="relative flex items-baseline gap-2 bg-black/50 backdrop-blur-xl rounded-2xl px-8 py-4 border border-purple-500/30">
                      <span className="text-7xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        119€
                      </span>
                      <span className="text-white/40 text-xl mb-2">/heure</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Indicateurs de réalisations */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.7 }}
                className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
              >
                {[
                  { number: "500+", label: "Productions réalisées" },
                  { number: "98%", label: "Clients satisfaits" },
                  { number: "24h", label: "Livraison express" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <motion.p
                      className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      {stat.number}
                    </motion.p>
                    <p className="text-white/50 text-sm mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll indicator amélioré */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-50"></div>
                <div className="relative w-7 h-12 border-2 border-purple-400/50 rounded-full flex justify-center backdrop-blur-xl bg-black/30">
                  <motion.div
                    animate={{ y: [3, 12, 3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section Galerie Photos des Studios */}
        <section className="relative py-24 bg-gradient-to-b from-black via-zinc-900 to-black">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6">
                Visitez nos{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  studios
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Découvrez nos espaces de création équipés des dernières technologies
              </p>
            </motion.div>

            {/* Galerie principale */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {studioGalleryData.map((studio, index) => (
                <motion.div
                  key={studio.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => {
                    setSelectedStudioGallery(studio);
                    setCurrentGalleryImage(0);
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative h-80"
                  >
                    <img
                      src={studio.mainImage}
                      alt={studio.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  </motion.div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white/80 text-sm">
                      {studio.tag}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-montserrat font-bold text-xl">
                      {studio.title}
                    </h3>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-purple-600/20 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Visite virtuelle CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-white/60 mb-6">Envie d'en voir plus ?</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-montserrat font-semibold flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  Visite virtuelle 360°
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Popup Galerie Studio */}
        <AnimatePresence>
          {selectedStudioGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 overflow-y-auto"
              onClick={() => setSelectedStudioGallery(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="min-h-screen py-8 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-w-6xl mx-auto">
                  <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                      <h2 className="text-3xl font-montserrat font-bold text-white">
                        {selectedStudioGallery.title}
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedStudioGallery(null)}
                        className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <X className="w-6 h-6 text-white" />
                      </motion.button>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                      {/* Slideshow */}
                      <div className="relative">
                        <div className="aspect-video relative overflow-hidden rounded-2xl bg-black">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={currentGalleryImage}
                              src={selectedStudioGallery.images[currentGalleryImage]}
                              alt={`${selectedStudioGallery.title} - ${currentGalleryImage + 1}`}
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              transition={{ duration: 0.3 }}
                              className="w-full h-full object-cover"
                            />
                          </AnimatePresence>
                          
                          {/* Navigation */}
                          <button
                            onClick={() => setCurrentGalleryImage((prev) => 
                              prev === 0 ? selectedStudioGallery.images.length - 1 : prev - 1
                            )}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => setCurrentGalleryImage((prev) => 
                              prev === selectedStudioGallery.images.length - 1 ? 0 : prev + 1
                            )}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                          
                          {/* Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {selectedStudioGallery.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentGalleryImage(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  currentGalleryImage === idx 
                                    ? 'w-8 bg-white' 
                                    : 'bg-white/50 hover:bg-white/70'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-2 mt-4">
                          {selectedStudioGallery.images.map((image, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setCurrentGalleryImage(idx)}
                              className={`aspect-video rounded-lg overflow-hidden relative ${
                                currentGalleryImage === idx ? 'ring-2 ring-purple-500' : ''
                              }`}
                            >
                              <img
                                src={image}
                                alt={`Miniature ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {currentGalleryImage === idx && (
                                <div className="absolute inset-0 bg-purple-600/30"></div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <div className="mb-8">
                          <h3 className="text-xl font-montserrat font-bold text-white mb-4">
                            Description
                          </h3>
                          <p className="text-white/70 leading-relaxed">
                            {selectedStudioGallery.description}
                          </p>
                        </div>

                        <div className="mb-8">
                          <h3 className="text-xl font-montserrat font-bold text-white mb-4">
                            Équipements inclus
                          </h3>
                          <ul className="space-y-3">
                            {selectedStudioGallery.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-white/80">
                                <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-purple-400" />
                                </div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedStudioGallery(null);
                            document.getElementById('setups').scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-montserrat font-semibold flex items-center justify-center gap-3"
                        >
                          <Calendar className="w-5 h-5" />
                          Réserver ce studio
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Setups - Design révolutionnaire avec progression */}
        <section id="setups" className="relative py-32 bg-black">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
            <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-pink-500/20 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6"
                whileInView={{ opacity: [0, 1], y: [30, 0] }}
                viewport={{ once: true }}
              >
                Configurez votre{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  production
                </span>
              </motion.h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                3 étapes simples pour créer votre solution sur mesure
              </p>
            </motion.div>

            {/* Progression steps indicator */}
            <div className="flex items-center justify-center mb-16">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <span className="text-white font-medium hidden sm:inline">Choisir le setup</span>
                </div>
                <div className="w-20 h-px bg-white/20"></div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/50 font-bold">
                    2
                  </div>
                  <span className="text-white/50 font-medium hidden sm:inline">Durée & formule</span>
                </div>
                <div className="w-20 h-px bg-white/20"></div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/50 font-bold">
                    3
                  </div>
                  <span className="text-white/50 font-medium hidden sm:inline">Options</span>
                </div>
                <div className="w-20 h-px bg-white/20"></div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/50 font-bold">
                    4
                  </div>
                  <span className="text-white/50 font-medium hidden sm:inline">Date & Créneau</span>
                </div>
              </div>
            </div>

            {/* Grid de setups avec sélection directe */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {studioSetups.map((setup, index) => (
                <motion.div
                  key={setup.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: setup.animationDelay, duration: 0.6 }}
                  onMouseEnter={() => setHoveredSetup(setup.id)}
                  onMouseLeave={() => setHoveredSetup(null)}
                  onClick={() => openConfigurator(setup)}
                  className={`relative group cursor-pointer ${
                    setup.id === 'full-show' ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Badge populaire */}
                  {setup.popular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: setup.animationDelay + 0.3, type: "spring" }}
                      className="absolute -top-4 right-6 z-10"
                    >
                      <div className={`bg-gradient-to-r ${setup.gradient} text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg`}>
                        <Star className="w-3.5 h-3.5 fill-white" />
                        Populaire
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/5"
                  >
                    {/* Image avec parallax */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: hoveredSetup === setup.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src={setup.image}
                        alt={setup.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient overlay dynamique */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80`}></div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredSetup === setup.id ? 0.4 : 0 }}
                        className={`absolute inset-0 bg-gradient-to-br ${setup.gradient}`}
                      ></motion.div>
                    </motion.div>

                    {/* Floating elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      {hoveredSetup === setup.id && (
                        <>
                          <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="absolute top-20 left-6"
                          >
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2">
                              <Camera className="w-4 h-4 text-white" />
                              <span className="text-white text-sm">{setup.equipment.cameras.split(' ')[0]}</span>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute top-32 right-6"
                          >
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2">
                              <Users className="w-4 h-4 text-white" />
                              <span className="text-white text-sm">{setup.capacity}</span>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </div>

                    {/* Icon flottante */}
                    <motion.div
                      animate={{
                        y: hoveredSetup === setup.id ? -10 : 0,
                        rotate: hoveredSetup === setup.id ? 15 : 0
                      }}
                      className="absolute top-6 right-6"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${setup.gradient} rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl ${setup.shadowColor}`}>
                        <setup.icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        animate={{
                          x: hoveredSetup === setup.id ? 5 : 0
                        }}
                      >
                        <h3 className="text-3xl font-montserrat font-bold text-white mb-2">
                          {setup.name}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: setup.color === 'purple' ? '#c084fc' : setup.color === 'emerald' ? '#6ee7b7' : setup.color === 'blue' ? '#93c5fd' : setup.color === 'pink' ? '#f9a8d4' : setup.color === 'violet' ? '#c4b5fd' : setup.color === 'red' ? '#fca5a5' : '#fde047' }}>{setup.subtitle}</p>
                        <p className="text-white/60 text-sm mb-6">{setup.usage}</p>
                      </motion.div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/40 text-sm mb-1">À partir de</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-montserrat font-black text-white">
                              {Math.round(setup.basePrice * 2.76)}€
                            </span>
                            <span className="text-white/40 text-sm">/{setup.recommendedDuration}</span>
                          </div>
                        </div>
                        
                        <motion.div
                          animate={{
                            scale: hoveredSetup === setup.id ? 1.2 : 1,
                            rotate: hoveredSetup === setup.id ? 90 : 0
                          }}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 hover:border-white/30 transition-colors"
                        >
                          <ArrowUpRight className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover effect light sweep */}
                    <motion.div
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ 
                        x: hoveredSetup === setup.id ? '100%' : '-100%',
                        opacity: hoveredSetup === setup.id ? 1 : 0
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Quick configurator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-white/60 mb-4">Vous ne savez pas quel setup choisir ?</p>
              <button className="text-purple-400 hover:text-purple-300 font-medium underline">
                Laissez-nous vous guider →
              </button>
            </motion.div>
          </div>
        </section>

        {/* Section features incluses - Design minimaliste */}
        <section className="relative py-24 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
                Toujours inclus
              </h3>
              <p className="text-white/60">Sans frais supplémentaires</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { icon: Users, label: 'Technicien', desc: 'Sur place' },
                { icon: Coffee, label: 'Café illimité', desc: '& snacks' },
                { icon: Car, label: 'Parking', desc: '2 places' },
                { icon: Sparkles, label: 'Maquillage', desc: 'Loge dédiée' },
                { icon: Clock, label: 'Installation', desc: '30min offert' },
                { icon: Shield, label: 'Transfert', desc: 'Sécurisé' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-colors"
                  >
                    <item.icon className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </motion.div>
                  <p className="text-white font-semibold mb-1">{item.label}</p>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Tarifs et Options - Transparence totale */}
        <section className="relative py-24 bg-black">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6">
                Tarifs{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  transparents
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Composez votre formule sur mesure avec nos packs et options
              </p>
            </motion.div>

            {/* Grille des tarifs de base */}
            <div className="mb-20">
              <h3 className="text-2xl font-montserrat font-bold text-white mb-8 text-center">
                Packs de base (tout inclus)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/60 font-medium py-4 px-4">Pack</th>
                      <th className="text-center text-white/60 font-medium py-4 px-4">1 heure</th>
                      <th className="text-center text-white/60 font-medium py-4 px-4">3 heures</th>
                      <th className="text-center text-white/60 font-medium py-4 px-4">Journée (7h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <Camera className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-white font-semibold">Studio</p>
                            <p className="text-white/60 text-sm">Tournage brut</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center text-white font-bold text-xl">119€</td>
                      <td className="text-center text-white font-bold text-xl">329€</td>
                      <td className="text-center text-white font-bold text-xl">599€</td>
                    </tr>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <Film className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-white font-semibold">Post-Prod</p>
                            <p className="text-white/60 text-sm">Tournage + montage simple</p>
                          </div>
                          <span className="ml-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                            Best Value
                          </span>
                        </div>
                      </td>
                      <td className="text-center text-white font-bold text-xl">169€</td>
                      <td className="text-center text-white font-bold text-xl">469€</td>
                      <td className="text-center text-white/40">—</td>
                    </tr>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-white font-semibold">Expert</p>
                            <p className="text-white/60 text-sm">Création complète & SEO</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center text-white font-bold text-xl">299€</td>
                      <td className="text-center text-white font-bold text-xl">849€</td>
                      <td className="text-center text-white/40">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/60 text-sm mt-4 text-center">
                Chaque pack inclut : plateau équipé (2 caméras 4K, lumière cinéma, micros), technicien et transfert des rushs
              </p>
            </div>

            {/* Catalogue d'upsells */}
            <div>
              <h3 className="text-2xl font-montserrat font-bold text-white mb-8 text-center">
                Catalogue d'options à la carte
              </h3>
              
              {/* Grille des options par catégorie */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Production & Matériel */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-xl font-montserrat font-bold text-white">Production & Matériel</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Caméra 4K supplémentaire</span>
                      <span className="text-purple-400 font-bold">+49€/h</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Multi-cam live-switch (régie)</span>
                      <span className="text-purple-400 font-bold">+149€/h</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Teleprompteur + iPad</span>
                      <span className="text-purple-400 font-bold">+25€/h</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Carte SD 128 Go à emporter</span>
                      <span className="text-purple-400 font-bold">+19€</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-white/80">Backup cloud 30 jours</span>
                      <span className="text-purple-400 font-bold">+29€</span>
                    </div>
                  </div>
                </motion.div>

                {/* Post-Production avancée */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-2xl p-6 border border-blue-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Film className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="text-xl font-montserrat font-bold text-white">Post-Production avancée</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Color grading cinéma</span>
                      <span className="text-blue-400 font-bold">+99€/vidéo</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Sous-titres dynamiques FR/EN</span>
                      <span className="text-blue-400 font-bold">+49€/vidéo</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Motion graphics / lower-thirds</span>
                      <span className="text-blue-400 font-bold">+99€/min</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-white/80">Master vertical TikTok/Reels</span>
                      <span className="text-blue-400 font-bold">+25€/export</span>
                    </div>
                  </div>
                </motion.div>

                {/* Création & Stratégie */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-2xl p-6 border border-emerald-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-montserrat font-bold text-white">Création & Stratégie</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Coaching storytelling 1h</span>
                      <span className="text-emerald-400 font-bold">+119€</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Script long-form (≤ 10 min)</span>
                      <span className="text-emerald-400 font-bold">+149€</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-white/80">Audit & stratégie YouTube 360°</span>
                      <span className="text-emerald-400 font-bold">+299€</span>
                    </div>
                  </div>
                </motion.div>

                {/* Social Media Assets */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 rounded-2xl p-6 border border-pink-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-pink-400" />
                    </div>
                    <h4 className="text-xl font-montserrat font-bold text-white">Social Media Assets</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Pack Shorts : 3 shorts + miniature</span>
                      <span className="text-pink-400 font-bold">149€</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Short supplémentaire</span>
                      <span className="text-pink-400 font-bold">+25€/pièce</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Miniature YouTube</span>
                      <span className="text-pink-400 font-bold">+35€/pièce</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-white/80">Calendrier contenu 30 jours</span>
                      <span className="text-pink-400 font-bold">+299€</span>
                    </div>
                  </div>
                </motion.div>

                {/* Media Buying & Analytics */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-2xl p-6 border border-orange-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-orange-400" />
                    </div>
                    <h4 className="text-xl font-montserrat font-bold text-white">Media Buying & Analytics</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Set-up campagnes Ads</span>
                      <span className="text-orange-400 font-bold">249€ + 10% budget</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Boost TikTok 50k vues</span>
                      <span className="text-orange-400 font-bold">+219€</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-white/80">Dashboard temps réel</span>
                      <span className="text-orange-400 font-bold">+99€/mois</span>
                    </div>
                  </div>
                </motion.div>

                {/* Confort & Logistique */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 rounded-2xl p-6 border border-violet-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center">
                      <Coffee className="w-5 h-5 text-violet-400" />
                    </div>
                    <h4 className="text-xl font-montserrat font-bold text-white">Confort & Logistique</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Café, softs & snacks (1-4 pers.)</span>
                      <span className="text-violet-400 font-bold">29€</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Lunch box gourmet (par personne)</span>
                      <span className="text-violet-400 font-bold">19€</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Buffet journée (≤ 6 pers.)</span>
                      <span className="text-violet-400 font-bold">99€</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/80">Transport Gare ↔ studio</span>
                      <span className="text-violet-400 font-bold">59€/trajet</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <span className="text-white/80">Transport CDG/Orly ↔ studio</span>
                        <p className="text-white/50 text-xs">Aller + retour : -10%</p>
                      </div>
                      <span className="text-violet-400 font-bold">79€/trajet</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Exemple de parcours client */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl p-8 border border-purple-500/20"
            >
              <h4 className="text-xl font-montserrat font-bold text-white mb-6">
                💡 Exemple de parcours client
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                    1
                  </div>
                  <p className="text-white/80">Pack Post-Prod 3h</p>
                  <p className="text-purple-400 font-bold text-xl">469€</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                    2
                  </div>
                  <p className="text-white/80">Options choisies</p>
                  <p className="text-white/60 text-sm">Téléprompteur (75€)<br/>Pack Shorts (149€)<br/>Transport A/R (106€)</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                    3
                  </div>
                  <p className="text-white/80">Total prévisionnel</p>
                  <p className="text-purple-400 font-bold text-2xl">799€ HT</p>
                </div>
              </div>
              <p className="text-white/60 text-center">
                Solution « prête à poster » avec confort logistique inclus
              </p>
            </motion.div>
          </div>
        </section>

        {/* Configurateur Premium */}
        <AnimatePresence>
          {showConfigurator && selectedSetup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="min-h-screen py-8 px-4"
              >
                <div className="max-w-7xl mx-auto">
                  {/* Header avec progression */}
                  <div className="bg-zinc-900/90 backdrop-blur-xl rounded-t-3xl p-8 border-x border-t border-white/10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-4xl font-montserrat font-black text-white mb-2">
                          Configurez votre {selectedSetup.name}
                        </h2>
                        <p className="text-white/60">{selectedSetup.description}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowConfigurator(false)}
                        className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <X className="w-6 h-6 text-white" />
                      </motion.button>
                    </div>

                    {/* Progress steps */}
                    <div className="flex items-center justify-between max-w-3xl mx-auto">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center">
                          <motion.div
                            animate={{
                              scale: activeStep >= step ? 1.1 : 1,
                              backgroundColor: activeStep >= step ? '#a855f7' : '#ffffff20'
                            }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-montserrat font-bold text-white`}
                          >
                            {activeStep > step ? <Check className="w-6 h-6" /> : step}
                          </motion.div>
                          {step < 4 && (
                            <div className={`w-16 md:w-24 h-1 mx-2 rounded-full ${
                              activeStep > step ? 'bg-purple-500' : 'bg-white/10'
                            }`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="bg-zinc-900/90 backdrop-blur-xl rounded-b-3xl border-x border-b border-white/10 p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      {/* Step 1: Durée */}
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: activeStep >= 1 ? 1 : 0.3, x: 0 }}
                        className={activeStep === 1 ? '' : 'pointer-events-none'}
                      >
                        <h3 className="text-2xl font-montserrat font-bold text-white mb-6 flex items-center gap-3">
                          <span className={`text-4xl ${activeStep === 1 ? 'text-purple-400' : 'text-white/20'}`}>1</span>
                          Durée
                        </h3>
                        <div className="space-y-4">
                          {durations.map(duration => (
                            <motion.label
                              key={duration.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`block p-6 rounded-2xl cursor-pointer transition-all relative overflow-hidden ${
                                selectedDuration === duration.id
                                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500'
                                  : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
                              }`}
                            >
                              {duration.popular && (
                                <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                                  Recommandé
                                </span>
                              )}
                              <input
                                type="radio"
                                name="duration"
                                value={duration.id}
                                checked={selectedDuration === duration.id}
                                onChange={() => setSelectedDuration(duration.id)}
                                className="sr-only"
                              />
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-white font-semibold text-lg">{duration.label}</p>
                                  <p className="text-purple-400 text-3xl font-montserrat font-bold mt-2">
                                    {Math.round(selectedSetup.basePrice * duration.multiplier)}€
                                  </p>
                                </div>
                                {duration.discount && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold"
                                  >
                                    {duration.discount}
                                  </motion.span>
                                )}
                              </div>
                            </motion.label>
                          ))}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveStep(2)}
                          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-montserrat font-semibold"
                        >
                          Continuer →
                        </motion.button>
                      </motion.div>

                      {/* Step 2: Formule */}
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: activeStep >= 2 ? 1 : 0.3, x: 0 }}
                        className={activeStep === 2 ? '' : 'pointer-events-none'}
                      >
                        <h3 className="text-2xl font-montserrat font-bold text-white mb-6 flex items-center gap-3">
                          <span className={`text-4xl ${activeStep === 2 ? 'text-purple-400' : 'text-white/20'}`}>2</span>
                          Formule
                        </h3>
                        <div className="space-y-4">
                          {formulas.map(formula => (
                            <motion.label
                              key={formula.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`block p-6 rounded-2xl cursor-pointer transition-all relative ${
                                selectedFormula === formula.id
                                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500'
                                  : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
                              }`}
                            >
                              {formula.popular && (
                                <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                                  Populaire
                                </span>
                              )}
                              <input
                                type="radio"
                                name="formula"
                                value={formula.id}
                                checked={selectedFormula === formula.id}
                                onChange={() => setSelectedFormula(formula.id)}
                                className="sr-only"
                              />
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <formula.icon className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-white font-semibold text-lg mb-1">{formula.name}</p>
                                  <p className="text-white/60 text-sm mb-3">{formula.longDescription}</p>
                                  <div className="mb-3">
                                    <span className="text-purple-400 font-bold text-lg">{formula.displayPrice}</span>
                                  </div>
                                  <ul className="space-y-2">
                                    {formula.features.slice(0, 3).map((feature, idx) => (
                                      <li key={idx} className="text-white/80 text-sm flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveStep(3)}
                          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-montserrat font-semibold"
                        >
                          Continuer →
                        </motion.button>
                      </motion.div>

                      {/* Step 3: Options */}
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: activeStep >= 3 ? 1 : 0.3, x: 0 }}
                        className={activeStep === 3 ? '' : 'pointer-events-none'}
                      >
                        <h3 className="text-2xl font-montserrat font-bold text-white mb-6 flex items-center gap-3">
                          <span className={`text-4xl ${activeStep === 3 ? 'text-purple-400' : 'text-white/20'}`}>3</span>
                          Options
                        </h3>
                        
                        {/* Tabs pour les catégories */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: 'all', name: 'Toutes', icon: Layers, color: 'purple' },
                              { id: 'production', name: 'Production', icon: Camera, color: 'purple' },
                              { id: 'postprod', name: 'Post-Prod', icon: Film, color: 'blue' },
                              { id: 'creative', name: 'Création', icon: Sparkles, color: 'emerald' },
                              { id: 'social', name: 'Social', icon: Zap, color: 'pink' },
                              { id: 'ads', name: 'Ads', icon: Monitor, color: 'orange' },
                              { id: 'comfort', name: 'Confort', icon: Coffee, color: 'violet' }
                            ].map(category => (
                              <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                                  selectedCategory === category.id 
                                    ? 'bg-purple-600 text-white' 
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                              >
                                <category.icon className="w-4 h-4" />
                                {category.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                          {/* Production & Matériel */}
                          {(selectedCategory === 'all' || selectedCategory === 'production') && (
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-purple-400 mb-3 flex items-center gap-2">
                                <Camera className="w-4 h-4" />
                                Production & Matériel
                              </h4>
                              <div className="space-y-2">
                                {[
                                  { id: 'extra-cameras', name: '2 caméras supplémentaires', price: 98, unit: '/h', icon: Camera },
                                  { id: 'live-switch', name: 'Live-Switch ATEM', price: 149, unit: '/h', icon: Layers, recommended: true },
                                  { id: 'teleprompter', name: 'Téléprompteur + iPad', price: 25, unit: '/h', icon: Monitor },
                                  { id: 'sd-card', name: 'Carte SD 128 Go à emporter', price: 19, unit: 'fixe', icon: Image },
                                  { id: 'cloud-backup', name: 'Backup cloud 30 jours', price: 29, unit: 'fixe', icon: Shield }
                                ].map(option => (
                                  <motion.label
                                    key={option.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`block p-4 rounded-2xl cursor-pointer transition-all ${
                                      selectedOptions.includes(option.id)
                                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500'
                                        : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.id)}
                                        onChange={() => toggleOption(option.id)}
                                        className="w-5 h-5 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <option.icon className="w-5 h-5 text-purple-400" />
                                            <div>
                                              <p className="text-white font-medium">
                                                {option.name}
                                                {option.recommended && (
                                                  <span className="ml-2 text-xs bg-purple-600/50 text-purple-300 px-2 py-0.5 rounded-full">
                                                    Recommandé
                                                  </span>
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <span className="text-white font-bold">{option.price}€</span>
                                            <span className="text-white/40 text-xs ml-1">{option.unit}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.label>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Post-Production */}
                          {(selectedCategory === 'all' || selectedCategory === 'postprod') && (
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-blue-400 mb-3 flex items-center gap-2">
                                <Film className="w-4 h-4" />
                                Post-Production avancée
                              </h4>
                              <div className="space-y-2">
                                {[
                                  { id: 'color-grading', name: 'Color grading cinéma', price: 99, unit: '/vidéo', icon: Palette },
                                  { id: 'subtitles', name: 'Sous-titres dynamiques FR/EN', price: 49, unit: '/vidéo', icon: Monitor },
                                  { id: 'motion-graphics', name: 'Motion graphics / lower-thirds', price: 99, unit: '/min', icon: Film },
                                  { id: 'vertical-master', name: 'Master vertical TikTok/Reels', price: 25, unit: '/export', icon: Zap }
                                ].map(option => (
                                  <motion.label
                                    key={option.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`block p-4 rounded-2xl cursor-pointer transition-all ${
                                      selectedOptions.includes(option.id)
                                        ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-2 border-blue-500'
                                        : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.id)}
                                        onChange={() => toggleOption(option.id)}
                                        className="w-5 h-5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <option.icon className="w-5 h-5 text-blue-400" />
                                            <p className="text-white font-medium">{option.name}</p>
                                          </div>
                                          <div className="text-right">
                                            <span className="text-white font-bold">{option.price}€</span>
                                            <span className="text-white/40 text-xs ml-1">{option.unit}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.label>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Création & Stratégie */}
                          {(selectedCategory === 'all' || selectedCategory === 'creative') && (
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Création & Stratégie
                              </h4>
                              <div className="space-y-2">
                                {[
                                  { id: 'coaching', name: 'Coaching storytelling 1h', price: 119, unit: 'fixe', icon: Sparkles },
                                  { id: 'script', name: 'Script long-form (≤ 10 min)', price: 149, unit: 'fixe', icon: Film },
                                  { id: 'youtube-audit', name: 'Audit & stratégie YouTube 360°', price: 299, unit: 'fixe', icon: Monitor }
                                ].map(option => (
                                  <motion.label
                                    key={option.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`block p-4 rounded-2xl cursor-pointer transition-all ${
                                      selectedOptions.includes(option.id)
                                        ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-2 border-emerald-500'
                                        : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.id)}
                                        onChange={() => toggleOption(option.id)}
                                        className="w-5 h-5 text-emerald-600 bg-white/10 border-white/20 rounded focus:ring-emerald-500"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <option.icon className="w-5 h-5 text-emerald-400" />
                                            <p className="text-white font-medium">{option.name}</p>
                                          </div>
                                          <div className="text-right">
                                            <span className="text-white font-bold">{option.price}€</span>
                                            <span className="text-white/40 text-xs ml-1">{option.unit}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.label>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Social Media Assets */}
                          {(selectedCategory === 'all' || selectedCategory === 'social') && (
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-pink-400 mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Social Media Assets
                              </h4>
                              <div className="space-y-2">
                                {[
                                  { id: 'shorts-pack', name: 'Pack 3 Shorts + miniature', price: 149, unit: 'fixe', icon: Zap, popular: true },
                                  { id: 'extra-short', name: 'Short supplémentaire', price: 25, unit: '/pièce', icon: Zap },
                                  { id: 'thumbnail', name: 'Miniature YouTube', price: 35, unit: '/pièce', icon: Image },
                                  { id: 'calendar', name: 'Calendrier contenu 30 jours', price: 299, unit: 'fixe', icon: Calendar }
                                ].map(option => (
                                  <motion.label
                                    key={option.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`block p-4 rounded-2xl cursor-pointer transition-all ${
                                      selectedOptions.includes(option.id)
                                        ? 'bg-gradient-to-r from-pink-600/20 to-rose-600/20 border-2 border-pink-500'
                                        : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.id)}
                                        onChange={() => toggleOption(option.id)}
                                        className="w-5 h-5 text-pink-600 bg-white/10 border-white/20 rounded focus:ring-pink-500"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <option.icon className="w-5 h-5 text-pink-400" />
                                            <div>
                                              <p className="text-white font-medium">
                                                {option.name}
                                                {option.popular && (
                                                  <span className="ml-2 text-xs bg-pink-600/50 text-pink-300 px-2 py-0.5 rounded-full">
                                                    Populaire
                                                  </span>
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <span className="text-white font-bold">{option.price}€</span>
                                            <span className="text-white/40 text-xs ml-1">{option.unit}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.label>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </motion.div>
                      
                      {/* NOTE: Step 4 would go here. It is missing in the original code. */}
                      
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </main>
    </div>
  );
}