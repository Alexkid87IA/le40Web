import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Zap, Crown } from 'lucide-react';
import { useState } from 'react';
import VisitBookingModal from './VisitBookingModal';

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<{ title: string; price: string } | null>(null);

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Bureau Starter',
      subtitle: 'Parfait pour les petites équipes',
      size: '15-25m²',
      capacity: '2-4 personnes',
      monthlyPrice: 499,
      annualPrice: 449,
      badge: 'Populaire',
      badgeIcon: Star,
      badgeColor: 'from-amber-500 to-orange-500',
      gradient: 'from-amber-600 to-orange-600',
      image: 'https://static.eno.do/x/fs-209552-default/a09bf67dc5b41c71cbb959f542013b0c/media.jpg',
      features: [
        'Bureau privé 15-25m²',
        'Mobilier complet fourni',
        'Fibre 1 Gb/s dédiée',
        'Accès sécurisé par badge',
        'Électricité & chauffage inclus',
        'Salles de réunion (2h/mois)',
        'Cuisine équipée partagée',
        'Domiciliation possible',
      ],
    },
    {
      id: 'growth',
      name: 'Bureau Growth',
      subtitle: 'Équipes en expansion',
      size: '40-60m²',
      capacity: '6-10 personnes',
      monthlyPrice: 1299,
      annualPrice: 1169,
      badge: 'Recommandé',
      badgeIcon: Zap,
      badgeColor: 'from-blue-500 to-indigo-500',
      gradient: 'from-blue-600 to-indigo-600',
      image: 'https://static.eno.do/x/fs-209553-default/471645ef37b5d4fc6eaaa10e3eab6123/media.jpg',
      features: [
        'Bureau privé 40-60m²',
        'Mobilier premium + rangements',
        'Fibre 1 Gb/s dédiée',
        'Accès sécurisé + badges équipe',
        'Électricité & chauffage inclus',
        'Salles de réunion (6h/mois)',
        'Cuisine privée possible',
        'Domiciliation + Standard tél',
        'Logo à l\'accueil',
      ],
    },
    {
      id: 'scale',
      name: 'Bureau Scale',
      subtitle: 'Solutions sur-mesure',
      size: '80-100m²+',
      capacity: '12-20 personnes',
      monthlyPrice: 2499,
      annualPrice: 2249,
      badge: 'Premium',
      badgeIcon: Crown,
      badgeColor: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-600 to-pink-600',
      image: 'https://static.eno.do/x/fs-209554-default/5ee5c82f888b795c8269da742b5a1a9a/media.jpg',
      features: [
        'Bureau privé 80-100m²+',
        'Aménagement personnalisé',
        'Fibres multiples dédiées',
        'Accès sécurisé illimité',
        'Électricité & chauffage inclus',
        'Salles de réunion illimitées',
        'Cuisine privée équipée',
        'Domiciliation + Standard dédié',
        'Signalétique personnalisée',
        'Événements privatisés',
        'Support prioritaire',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-6"
          >
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Tarifs transparents</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            CHOISISSEZ VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">ESPACE</span>
          </h2>
          <p className="text-base md:text-lg font-inter text-white/60 max-w-2xl mx-auto mb-10">
            Trois formules adaptées à la taille de votre équipe. Tout inclus, sans surprise.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-white/5 border border-white/10 rounded-full">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Annuel
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">-10%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className={`relative h-full bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col ${
                plan.id === 'growth' 
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                {/* Image */}
                <div className="relative h-40 lg:h-44 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${plan.badgeColor} text-white text-xs font-bold shadow-lg`}>
                      <plan.badgeIcon className="w-3.5 h-3.5" />
                      {plan.badge}
                    </div>
                  </div>

                  {/* Size & Capacity */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white/80 text-xs font-medium">
                      {plan.size}
                    </span>
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white/80 text-xs font-medium">
                      {plan.capacity}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1.5 text-transparent bg-clip-text bg-gradient-to-r ${plan.badgeColor}`}>
                    {plan.subtitle}
                  </p>
                  <h3 className="text-xl md:text-2xl font-montserrat font-black text-white mb-3">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-montserrat font-black text-white">
                        {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}€
                      </span>
                      <span className="text-white/60 font-inter text-sm">/mois</span>
                    </div>

                    {billingPeriod === 'annual' && (
                      <p className="text-blue-400 text-sm font-semibold mt-1">
                        Économisez {(plan.monthlyPrice - plan.annualPrice) * 12}€/an
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-1">
                    {plan.features.slice(0, 8).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-white/80 text-xs lg:text-sm font-inter leading-snug">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 8 && (
                      <div className="text-blue-400/70 text-xs font-inter font-medium pl-6">
                        + {plan.features.length - 8} autres avantages
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => {
                      setSelectedOffice({ title: plan.name, price: `${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}€/mois` });
                      setIsBookingModalOpen(true);
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-auto w-full bg-gradient-to-r ${plan.gradient} rounded-xl px-6 py-3.5 flex items-center justify-center gap-3 group/btn shadow-lg`}
                  >
                    <span className="font-montserrat font-semibold text-white">
                      Réserver une visite
                    </span>
                    <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border border-blue-500/30 rounded-3xl p-8 text-center"
        >
          <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-4">
            Besoin d'un espace plus grand ou personnalisé ?
          </h3>
          <p className="text-sm md:text-base text-white/70 font-inter mb-6 max-w-2xl mx-auto">
            Nous proposons des bureaux jusqu'à 200m² et pouvons créer des configurations sur-mesure pour votre entreprise.
          </p>
          <motion.button
            onClick={() => {
              setSelectedOffice({ title: 'Bureau Sur-Mesure', price: 'Sur devis' });
              setIsBookingModalOpen(true);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 border border-white/20 text-white font-montserrat font-semibold rounded-xl hover:bg-white/20 transition-all"
          >
            Demander un devis personnalisé
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <VisitBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedOffice={selectedOffice}
      />
    </section>
  );
}