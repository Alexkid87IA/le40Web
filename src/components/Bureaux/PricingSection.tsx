import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Bureau Starter',
      subtitle: 'Parfait pour les petites équipes',
      size: '15-25m²',
      capacity: '2-4 personnes',
      monthlyPrice: 699,
      annualPrice: 629,
      badge: 'Populaire',
      badgeColor: 'from-amber-500 to-orange-500',
      gradient: 'from-amber-600 to-orange-600',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Bureau privé 15-25m²',
        'Mobilier complet fourni',
        'Fibre 1 Gb/s dédiée',
        'Ménage hebdomadaire',
        'Accès 24/7 par badge',
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
      badgeColor: 'from-emerald-500 to-teal-500',
      gradient: 'from-emerald-600 to-teal-600',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Bureau privé 40-60m²',
        'Mobilier premium + rangements',
        'Fibre 1 Gb/s dédiée',
        'Ménage bi-hebdomadaire',
        'Accès 24/7 + badges équipe',
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
      badgeColor: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-600 to-pink-600',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Bureau privé 80-100m²+',
        'Aménagement personnalisé',
        'Fibres multiples dédiées',
        'Ménage quotidien',
        'Accès 24/7 illimité',
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
    <section id="pricing" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-600/30 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-300 font-medium">Tarifs transparents</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            CHOISISSEZ VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">ESPACE</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Trois formules adaptées à la taille de votre équipe. Tout inclus, sans surprise.
          </p>

          <div className="inline-flex items-center gap-3 p-1.5 bg-white/5 rounded-xl border border-white/10">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-lg font-inter font-semibold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2.5 rounded-lg font-inter font-semibold transition-all relative ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Annuel
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                -10%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  <div className="absolute top-4 left-4">
                    <div className={`bg-gradient-to-r ${plan.badgeColor} text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5`}>
                      {plan.id === 'starter' && <Zap className="w-3.5 h-3.5" />}
                      {plan.id === 'growth' && <Sparkles className="w-3.5 h-3.5" />}
                      {plan.id === 'scale' && <Crown className="w-3.5 h-3.5" />}
                      {plan.badge}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm font-semibold">
                      <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        {plan.size}
                      </div>
                      <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        {plan.capacity}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient} font-montserrat font-semibold text-sm tracking-wider uppercase`}>
                      {plan.subtitle}
                    </span>
                    <h3 className="text-3xl font-montserrat font-black text-white mt-2 mb-2">
                      {plan.name}
                    </h3>

                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-montserrat font-black text-white">
                        {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}€
                      </span>
                      <span className="text-white/60 font-inter text-base">/mois</span>
                    </div>

                    {billingPeriod === 'annual' && (
                      <p className="text-emerald-400 text-sm font-semibold mt-2">
                        Économisez {(plan.monthlyPrice - plan.annualPrice) * 12}€/an
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm font-inter leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.a
                    href={`https://wa.me/33614315214?text=${encodeURIComponent(`Bonjour, je souhaite réserver une visite pour le ${plan.title} à ${plan.price}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block mt-auto w-full bg-gradient-to-r ${plan.gradient} rounded-2xl px-6 py-4 flex items-center justify-center gap-3 group/btn shadow-lg`}
                  >
                    <span className="font-montserrat font-semibold text-white">
                      Réserver une visite
                    </span>
                    <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/30 rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
            Besoin d'un espace plus grand ou personnalisé ?
          </h3>
          <p className="text-white/70 font-inter mb-6 max-w-2xl mx-auto">
            Nous proposons des bureaux jusqu'à 200m² et pouvons créer des configurations sur-mesure pour votre entreprise.
          </p>
          <motion.a
            href={`https://wa.me/33614315214?text=${encodeURIComponent('Bonjour, je souhaite un devis personnalisé pour un bureau de grande taille.')}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-montserrat font-semibold rounded-xl transition-all"
          >
            Demander un devis personnalisé
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
