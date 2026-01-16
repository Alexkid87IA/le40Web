/**
 * Generic FAQ Section Component
 * Replaces 6 duplicated FAQ implementations across:
 * - Bureaux, Club, Salles, StudiosRefonte, Domiciliation, Events
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQItem } from '../../types';

// ============================================================
// TYPES
// ============================================================

export interface FAQSectionProps {
  /** Section title */
  title?: string;
  /** Subtitle/description */
  subtitle?: string;
  /** FAQ items to display */
  items: FAQItem[];
  /** Gradient color for title (Tailwind classes) */
  titleGradient?: string;
  /** Accent color for icons and hover states */
  accentColor?: string;
  /** Whether to show the help icon in header */
  showHelpIcon?: boolean;
  /** Custom className for the section */
  className?: string;
  /** Background style variant */
  variant?: 'default' | 'dark' | 'gradient';
}

// ============================================================
// COMPONENT
// ============================================================

export default function FAQSection({
  title = 'Questions Fréquentes',
  subtitle,
  items,
  titleGradient = 'from-amber-400 to-orange-500',
  accentColor = 'amber',
  showHelpIcon = true,
  className = '',
  variant = 'default',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Background styles based on variant
  const bgStyles = {
    default: 'bg-gradient-to-b from-zinc-950 to-black',
    dark: 'bg-black',
    gradient: 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-black',
  };

  // Accent color mapping
  const accentColors: Record<string, { border: string; bg: string; text: string; hover: string }> = {
    amber: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      hover: 'hover:border-amber-500/50',
    },
    emerald: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      hover: 'hover:border-emerald-500/50',
    },
    blue: {
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      hover: 'hover:border-blue-500/50',
    },
    purple: {
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      hover: 'hover:border-purple-500/50',
    },
    rose: {
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      hover: 'hover:border-rose-500/50',
    },
  };

  const colors = accentColors[accentColor] || accentColors.amber;

  return (
    <section className={`relative py-20 md:py-32 ${bgStyles[variant]} overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 ${colors.bg} rounded-full blur-[150px] opacity-30`} />
        <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 ${colors.bg} rounded-full blur-[150px] opacity-20`} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {showHelpIcon && (
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} mb-6`}>
              <HelpCircle className={`w-8 h-8 ${colors.text}`} />
            </div>
          )}

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4">
            {title.split(' ').map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? (
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${titleGradient}`}>
                    {word}
                  </span>
                ) : (
                  `${word} `
                )}
              </span>
            ))}
          </h2>

          {subtitle && (
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={`
                  border ${colors.border} ${colors.hover}
                  rounded-2xl overflow-hidden transition-all duration-300
                  ${openIndex === index ? `${colors.bg} border-opacity-50` : 'bg-white/5'}
                `}
              >
                {/* Question */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                >
                  <span className="font-inter font-semibold text-white group-hover:text-white/90 transition-colors pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`}
                  >
                    <ChevronDown className={`w-5 h-5 ${colors.text}`} />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5">
                        <div className={`w-12 h-0.5 bg-gradient-to-r ${titleGradient} mb-4 rounded-full`} />
                        <p className="text-white/70 font-inter leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRESET DATA - Common FAQ items by category
// ============================================================

export const FAQ_PRESETS = {
  bureaux: [
    {
      id: 'engagement',
      question: 'Quelle est la durée minimum d\'engagement ?',
      answer: 'Nous proposons des engagements flexibles à partir de 1 mois. Vous pouvez choisir entre un engagement mensuel, trimestriel ou annuel selon vos besoins.',
    },
    {
      id: 'inclus',
      question: 'Qu\'est-ce qui est inclus dans le loyer ?',
      answer: 'Le loyer inclut : internet fibre, électricité, chauffage/climatisation, ménage quotidien, accès aux espaces communs, café et thé illimités, et l\'accès aux salles de réunion (selon forfait).',
    },
    {
      id: 'personnalisation',
      question: 'Puis-je personnaliser mon bureau ?',
      answer: 'Oui ! Vous pouvez apporter vos propres meubles, décoration et équipements. Nous pouvons également vous accompagner dans l\'aménagement de votre espace.',
    },
    {
      id: 'horaires',
      question: 'Quels sont les horaires d\'accès ?',
      answer: 'L\'accès est possible 24h/24 et 7j/7 avec votre badge personnel. L\'accueil est présent du lundi au vendredi de 9h à 20h.',
    },
  ],
  studios: [
    {
      id: 'reservation',
      question: 'Comment réserver un studio ?',
      answer: 'Vous pouvez réserver directement sur notre site en choisissant votre créneau. La réservation est confirmée après paiement.',
    },
    {
      id: 'equipement',
      question: 'Le matériel est-il inclus ?',
      answer: 'Oui, tout le matériel de base est inclus (caméras, éclairage, micros). Des équipements supplémentaires sont disponibles en option.',
    },
    {
      id: 'accompagnement',
      question: 'Proposez-vous un accompagnement technique ?',
      answer: 'Oui, nous proposons trois formules : Autonome (brief de 15min), Assisté (technicien présent), et Full Service (production clé en main).',
    },
    {
      id: 'livraison',
      question: 'Quels sont les délais de livraison pour le montage ?',
      answer: 'En formule Full Service, la livraison se fait sous 5 jours ouvrés avec 2 révisions incluses.',
    },
  ],
  salles: [
    {
      id: 'capacite',
      question: 'Quelle est la capacité des salles ?',
      answer: 'Nos salles vont de 2 à 80 personnes selon la configuration. Contactez-nous pour des besoins spécifiques.',
    },
    {
      id: 'equipement',
      question: 'Quel équipement est disponible ?',
      answer: 'Toutes nos salles disposent de : écran HD, système de visioconférence, paperboard, wifi haut débit et climatisation.',
    },
    {
      id: 'catering',
      question: 'Proposez-vous un service traiteur ?',
      answer: 'Oui, nous pouvons organiser des pauses café, déjeuners ou cocktails pour vos événements.',
    },
    {
      id: 'annulation',
      question: 'Quelle est la politique d\'annulation ?',
      answer: 'Annulation gratuite jusqu\'à 48h avant. Entre 24h et 48h : 50% facturés. Moins de 24h : 100% facturés.',
    },
  ],
  domiciliation: [
    {
      id: 'documents',
      question: 'Quels documents sont nécessaires ?',
      answer: 'Pour la domiciliation : Kbis ou justificatif de création, pièce d\'identité du dirigeant, et justificatif de domicile personnel.',
    },
    {
      id: 'delai',
      question: 'Quel est le délai de mise en place ?',
      answer: 'La domiciliation est effective sous 24-48h après réception des documents et validation.',
    },
    {
      id: 'courrier',
      question: 'Comment fonctionne la gestion du courrier ?',
      answer: 'Votre courrier est réceptionné, numérisé et envoyé par email. Vous pouvez le récupérer sur place ou demander un réacheminement.',
    },
    {
      id: 'resiliation',
      question: 'Comment résilier mon contrat ?',
      answer: 'Préavis de 1 mois pour les contrats mensuels, 3 mois pour les contrats annuels. La résiliation se fait par lettre recommandée.',
    },
  ],
  club: [
    {
      id: 'adhesion',
      question: 'Comment rejoindre le club ?',
      answer: 'L\'adhésion se fait sur candidature. Remplissez le formulaire et nous vous recontactons sous 48h pour un entretien.',
    },
    {
      id: 'avantages',
      question: 'Quels sont les avantages membres ?',
      answer: 'Accès prioritaire aux événements, tarifs préférentiels sur les espaces, networking exclusif, et accompagnement personnalisé.',
    },
    {
      id: 'evenements',
      question: 'À quelle fréquence ont lieu les événements ?',
      answer: 'Nous organisons 2 à 4 événements par mois : afterworks, workshops, conférences et sessions de networking.',
    },
    {
      id: 'cotisation',
      question: 'Quel est le montant de la cotisation ?',
      answer: 'La cotisation annuelle est de 990€ HT, avec possibilité de paiement mensuel à 99€/mois.',
    },
  ],
  events: [
    {
      id: 'privatisation',
      question: 'Puis-je privatiser un espace pour mon événement ?',
      answer: 'Oui, tous nos espaces sont privatisables. Contactez-nous pour un devis personnalisé selon vos besoins.',
    },
    {
      id: 'capacite',
      question: 'Quelle est la capacité maximale ?',
      answer: 'Notre terrasse panoramique accueille jusqu\'à 300 personnes, la salle de conférence 80 personnes assises.',
    },
    {
      id: 'prestataires',
      question: 'Travaillez-vous avec des prestataires ?',
      answer: 'Oui, nous avons un réseau de partenaires (traiteurs, photographes, DJ, techniciens) que nous pouvons recommander.',
    },
    {
      id: 'horaires',
      question: 'Jusqu\'à quelle heure peuvent durer les événements ?',
      answer: 'Les événements peuvent se prolonger jusqu\'à minuit en semaine et 2h du matin le week-end.',
    },
  ],
};
