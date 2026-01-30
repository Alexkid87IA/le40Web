import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Shield, Coffee, Wifi, Users, Calendar } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';

// Types pour les données de tarification
interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  gradient: string;
}

// Données de tarification (à adapter selon vos mockData.ts)
const pricingData = {
  domiciliation: [
    {
      name: "Essentiel",
      price: "49",
      period: "/mois",
      description: "L'adresse prestigieuse pour votre entreprise",
      gradient: "from-amber-600 to-orange-600",
      features: [
        { text: "Adresse commerciale prestigieuse", included: true },
        { text: "Réception du courrier", included: true },
        { text: "Notification digitale", included: true },
        { text: "Espace de stockage courrier", included: true },
        { text: "Salle de réunion (2h/mois)", included: false },
        { text: "Accès coworking", included: false },
      ],
    },
    {
      name: "Business",
      price: "99",
      period: "/mois",
      description: "La solution complète pour votre siège social",
      gradient: "from-amber-500 to-orange-500",
      popular: true,
      features: [
        { text: "Adresse commerciale prestigieuse", included: true },
        { text: "Réception du courrier", included: true },
        { text: "Notification digitale", included: true },
        { text: "Espace de stockage courrier", included: true },
        { text: "Salle de réunion (4h/mois)", included: true },
        { text: "Accès coworking (2 jours/mois)", included: true },
      ],
    },
    {
      name: "Premium",
      price: "199",
      period: "/mois",
      description: "La solution complète pour votre entreprise",
      gradient: "from-amber-400 to-orange-400",
      features: [
        { text: "Adresse commerciale prestigieuse", included: true },
        { text: "Réception du courrier", included: true },
        { text: "Notification digitale", included: true },
        { text: "Espace de stockage courrier illimité", included: true },
        { text: "Salle de réunion (8h/mois)", included: true },
        { text: "Accès coworking illimité", included: true },
      ],
    },
  ],
  coworking: [
    {
      name: "Nomade",
      price: "29",
      period: "/jour",
      description: "Pour une journée productive",
      gradient: "from-violet-600 to-purple-600",
      features: [
        { text: "Poste de travail flexible", included: true },
        { text: "Wi-Fi ultra rapide", included: true },
        { text: "Espace café", included: true },
        { text: "Impressions (20 pages)", included: true },
        { text: "Casier personnel", included: false },
        { text: "Salle de réunion", included: false },
      ],
    },
    {
      name: "Résident",
      price: "299",
      period: "/mois",
      description: "Votre bureau dans un espace inspirant",
      gradient: "from-violet-500 to-purple-500",
      popular: true,
      features: [
        { text: "Poste de travail dédié", included: true },
        { text: "Wi-Fi ultra rapide", included: true },
        { text: "Espace café", included: true },
        { text: "Impressions illimitées", included: true },
        { text: "Casier personnel", included: true },
        { text: "Salle de réunion (10h/mois)", included: true },
      ],
    },
    {
      name: "Team",
      price: "1299",
      period: "/mois",
      description: "Pour votre équipe (jusqu'à 5 personnes)",
      gradient: "from-violet-400 to-purple-400",
      features: [
        { text: "5 postes de travail dédiés", included: true },
        { text: "Wi-Fi ultra rapide", included: true },
        { text: "Espace café", included: true },
        { text: "Impressions illimitées", included: true },
        { text: "Casiers personnels", included: true },
        { text: "Salle de réunion privée", included: true },
      ],
    },
  ],
  studio: [
    {
      name: "Créateur",
      price: "89",
      period: "/heure",
      description: "Studio photo/vidéo équipé",
      gradient: "from-pink-600 to-rose-600",
      features: [
        { text: "Studio 50m² équipé", included: true },
        { text: "Éclairage professionnel", included: true },
        { text: "Fonds interchangeables", included: true },
        { text: "Espace maquillage", included: true },
        { text: "Assistant technique", included: false },
        { text: "Matériel photo/vidéo", included: false },
      ],
    },
    {
      name: "Production",
      price: "299",
      period: "/demi-journée",
      description: "La solution complète pour vos tournages",
      gradient: "from-pink-500 to-rose-500",
      popular: true,
      features: [
        { text: "Studio 50m² équipé", included: true },
        { text: "Éclairage professionnel", included: true },
        { text: "Fonds interchangeables", included: true },
        { text: "Espace maquillage", included: true },
        { text: "Assistant technique", included: true },
        { text: "Kit caméra/photo de base", included: true },
      ],
    },
    {
      name: "Podcast Pro",
      price: "149",
      period: "/session",
      description: "Studio podcast tout équipé",
      gradient: "from-pink-400 to-rose-400",
      features: [
        { text: "Cabine insonorisée", included: true },
        { text: "4 micros professionnels", included: true },
        { text: "Table de mixage", included: true },
        { text: "Éclairage vidéo", included: true },
        { text: "Montage post-production", included: true },
        { text: "Diffusion multi-plateformes", included: true },
      ],
    },
  ],
};

const Tarifs = () => {
  const [activeTab, setActiveTab] = useState<'domiciliation' | 'coworking' | 'studio'>('domiciliation');

  const tabs = [
    { id: 'domiciliation', label: 'Domiciliation', icon: Shield, gradient: 'from-amber-600 to-orange-600' },
    { id: 'coworking', label: 'Coworking', icon: Coffee, gradient: 'from-violet-600 to-purple-600' },
    { id: 'studio', label: 'Studios', icon: Zap, gradient: 'from-pink-600 to-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-black-deep relative overflow-hidden">
      <SEOHead
        title="Tarifs - Coworking, Bureaux & Domiciliation"
        description="Découvrez les tarifs du 40 à Marseille. Domiciliation dès 49€/mois, coworking dès 29€/jour, bureaux privés dès 499€/mois. Tarifs transparents, sans surprise."
        keywords="tarifs coworking Marseille, prix domiciliation Marseille, coût bureau privé Marseille, tarif salle réunion Marseille"
      />
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-32 pb-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Acte V - Tarification
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]">
            NOS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-purple-600">
              TARIFS
            </span>
          </h1>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            Des solutions flexibles et transparentes pour accompagner votre croissance
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10">
              <div className="grid grid-cols-3 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className="relative px-6 py-4 rounded-2xl transition-all duration-300"
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-2xl`}
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      <div className={`relative flex items-center justify-center gap-3 ${
                        activeTab === tab.id ? 'text-white' : 'text-white/60'
                      }`}>
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {pricingData[activeTab].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Plus populaire
                      </div>
                    </div>
                  )}

                  <div className={`relative h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border ${
                    plan.popular ? 'border-white/20' : 'border-white/10'
                  } hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]`}>
                    {/* Plan Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-6">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline">
                        <span className={`text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
                          {plan.price}€
                        </span>
                        <span className="text-white/40 ml-2">{plan.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`mt-0.5 ${feature.included ? 'text-green-500' : 'text-white/20'}`}>
                            <Check className="w-5 h-5" />
                          </div>
                          <span className={`text-sm ${feature.included ? 'text-white/80' : 'text-white/30'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 ${
                      plan.popular 
                        ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-amber-600/20`
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}>
                      Choisir ce plan
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <p className="text-white/60 mb-6">
              Besoin d'une solution sur mesure ?
            </p>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20">
              Contactez-nous pour un devis personnalisé
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tarifs;