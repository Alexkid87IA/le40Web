import React, { useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Building2,
  MapPin,
  Shield,
  CheckCircle2,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Award,
  FileText,
  Search,
  ChevronDown,
  Sparkles,
  Lock,
  HeadphonesIcon,
  Target,
} from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

export default function DomiciliationNew() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <SidebarNav />
      <MobileBurger />

      <main className="lg:ml-60">
        {/* Hero Section - Ultra moderne */}
        <HeroSection opacity={opacity} scale={scale} />

        {/* Trust Indicators */}
        <TrustSection />

        {/* Benefits Grid - Interactive */}
        <BenefitsSection />

        {/* Pricing - Comparaison interactive */}
        <PricingSection />

        {/* Process Timeline - Animated */}
        <ProcessSection />

        {/* Social Proof - Testimonials */}
        <TestimonialsSection />

        {/* FAQ Interactive */}
        <FAQSection />

        {/* Final CTA - Conversion optimisée */}
        <FinalCTASection />

        {/* Sticky Mobile CTA */}
        <MobileCTA />
      </main>

      <Footer />
    </div>
  );
}

// ============ HERO SECTION ============
interface HeroSectionProps {
  opacity: any;
  scale: any;
}

function HeroSection({ opacity, scale }: HeroSectionProps) {
  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 px-4"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-orange-400 text-sm font-semibold">
            #1 Domiciliation à Marseille
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
        >
          Domiciliez votre
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
            entreprise
          </span>
          <br />
          en 24h
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Adresse prestigieuse au cœur de Marseille. Gestion du courrier, accueil téléphonique et
          services inclus.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-2xl shadow-orange-500/50 flex items-center gap-2 transition-all"
          >
            Voir les offres
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#process"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-semibold rounded-2xl border border-white/10 transition-all"
          >
            Comment ça marche ?
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
        >
          {[
            { value: '500+', label: 'Entreprises' },
            { value: '24h', label: 'Mise en place' },
            { value: '4.9/5', label: 'Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ============ TRUST SECTION ============
function TrustSection() {
  const badges = [
    { icon: Shield, text: 'Conforme légal' },
    { icon: Lock, text: 'Données sécurisées' },
    { icon: Award, text: 'Service premium' },
    { icon: HeadphonesIcon, text: 'Support 7j/7' },
  ];

  return (
    <section className="py-12 border-y border-white/5 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-3 p-4"
              >
                <div className="p-3 bg-orange-500/10 rounded-2xl">
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>
                <span className="text-sm font-medium text-gray-300">{badge.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ BENEFITS SECTION ============
function BenefitsSection() {
  const benefits = [
    {
      icon: Building2,
      title: 'Adresse prestigieuse',
      description: 'Une adresse professionnelle au cœur de Marseille pour valoriser votre image',
      color: 'orange',
    },
    {
      icon: Mail,
      title: 'Gestion du courrier',
      description: 'Réception, numérisation et transfert de votre courrier en temps réel',
      color: 'cyan',
    },
    {
      icon: Phone,
      title: 'Accueil téléphonique',
      description: 'Standard professionnel avec gestion des appels en votre nom',
      color: 'emerald',
    },
    {
      icon: FileText,
      title: 'Extrait Kbis inclus',
      description: 'Nous gérons vos démarches administratives et juridiques',
      color: 'purple',
    },
    {
      icon: Users,
      title: 'Salles de réunion',
      description: 'Accès à nos espaces de coworking et salles de réunion équipées',
      color: 'pink',
    },
    {
      icon: Zap,
      title: 'Mise en place rapide',
      description: 'Domiciliation active sous 24h avec tous les documents nécessaires',
      color: 'yellow',
    },
  ];

  return (
    <section className="py-32 px-4" id="benefits">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Une solution complète pour domicilier votre entreprise avec tous les services inclus
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-${benefit.color}-500/0 to-${benefit.color}-500/0 group-hover:from-${benefit.color}-500/10 group-hover:to-${benefit.color}-500/5 transition-all duration-500`} />

                <div className="relative z-10">
                  <div className={`inline-flex p-4 bg-${benefit.color}-500/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${benefit.color}-400`} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ PRICING SECTION ============
function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Essentiel',
      price: billingCycle === 'monthly' ? 49 : 490,
      period: billingCycle === 'monthly' ? '/mois' : '/an',
      description: 'Parfait pour débuter',
      features: [
        'Adresse prestigieuse Marseille',
        'Réception du courrier',
        'Scan et transfert courrier',
        'Accès espace client',
        'Support email',
      ],
      popular: false,
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? 89 : 890,
      period: billingCycle === 'monthly' ? '/mois' : '/an',
      description: 'Le plus populaire',
      features: [
        'Tout Essentiel +',
        'Accueil téléphonique pro',
        'Transfert d\'appels',
        '5h salles de réunion/mois',
        'Support prioritaire',
        'Gestion administrative',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? 149 : 1490,
      period: billingCycle === 'monthly' ? '/mois' : '/an',
      description: 'Solution complète',
      features: [
        'Tout Business +',
        'Standard téléphonique dédié',
        '10h salles de réunion/mois',
        'Accès coworking illimité',
        'Secrétariat à la demande',
        'Support 24/7',
        'Services juridiques inclus',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden" id="pricing">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Choisissez votre formule
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Transparent, sans engagement, résiliable à tout moment
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annuel
              <span className="absolute -top-2 -right-2 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                -17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-3xl border transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-orange-500/20 to-orange-500/5 border-orange-500/50 scale-105'
                  : 'bg-white/5 backdrop-blur-xl border-white/10'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-full">
                  Le plus populaire
                </div>
              )}

              {/* Plan Info */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-black text-white">{plan.price}€</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>

                {billingCycle === 'yearly' && (
                  <p className="text-sm text-emerald-400">
                    Soit {Math.round(plan.price / 12)}€/mois
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                Choisir {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-emerald-400">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Satisfait ou remboursé 30 jours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ PROCESS SECTION ============
function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Choisissez votre formule',
      description: 'Sélectionnez l\'offre adaptée à vos besoins et validez en ligne',
      icon: Target,
    },
    {
      number: '02',
      title: 'Fournissez vos documents',
      description: 'Uploadez vos justificatifs via notre plateforme sécurisée',
      icon: FileText,
    },
    {
      number: '03',
      title: 'Validation & activation',
      description: 'Nous vérifions et activons votre domiciliation sous 24h',
      icon: CheckCircle2,
    },
    {
      number: '04',
      title: 'C\'est prêt !',
      description: 'Recevez vos documents et commencez à utiliser votre adresse',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-32 px-4" id="process">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Domiciliation en 4 étapes
          </h2>
          <p className="text-xl text-gray-400">
            Un processus simple et rapide pour domicilier votre entreprise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent" />
                )}

                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-xl" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500/20 to-orange-500/5 border-2 border-orange-500/50 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-black text-orange-400">{step.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-orange-400 mx-auto" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIALS SECTION ============
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sophie Martin',
      company: 'Startup Tech',
      role: 'CEO',
      content:
        'Service impeccable ! La domiciliation chez Le 40 nous a permis d\'avoir une adresse prestigieuse à Marseille tout en bénéficiant de services de qualité.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Thomas Dubois',
      company: 'Consulting Pro',
      role: 'Fondateur',
      content:
        'L\'accueil téléphonique et la gestion du courrier sont parfaits. Je recommande vivement Le 40 pour tous les entrepreneurs.',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Marie Laurent',
      company: 'Design Studio',
      role: 'Directrice',
      content:
        'Équipe réactive et professionnelle. Les salles de réunion sont un vrai plus quand nous recevons nos clients.',
      rating: 5,
      avatar: '👩‍🎨',
    },
  ];

  return (
    <section className="py-32 px-4 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-orange-400 text-orange-400" />
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-400">
            Plus de 500 entreprises domiciliées nous recommandent
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role} - {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FAQ SECTION ============
function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Qu\'est-ce que la domiciliation d\'entreprise ?',
      answer:
        'La domiciliation d\'entreprise consiste à établir l\'adresse administrative et fiscale de votre société dans nos locaux. Cela vous permet d\'avoir une adresse professionnelle prestigieuse sans avoir à louer des bureaux.',
    },
    {
      question: 'Combien de temps faut-il pour domicilier mon entreprise ?',
      answer:
        'La domiciliation est activée sous 24h après validation de vos documents. Vous recevez immédiatement l\'attestation de domiciliation nécessaire pour vos démarches.',
    },
    {
      question: 'Quels documents dois-je fournir ?',
      answer:
        'Vous devez fournir une pièce d\'identité valide, un justificatif de domicile de moins de 3 mois, et les statuts de votre société si elle existe déjà.',
    },
    {
      question: 'Puis-je résilier mon contrat ?',
      answer:
        'Oui, nos contrats sont sans engagement. Vous pouvez résilier à tout moment avec un préavis d\'un mois.',
    },
    {
      question: 'Comment fonctionne la gestion du courrier ?',
      answer:
        'Nous réceptionnons votre courrier, le scannons et vous l\'envoyons par email. Vous pouvez ensuite demander le transfert du courrier physique ou venir le récupérer.',
    },
    {
      question: 'Les salles de réunion sont-elles vraiment incluses ?',
      answer:
        'Oui, selon votre formule, vous bénéficiez de 5h à 10h de salles de réunion par mois. Vous pouvez réserver facilement via votre espace client.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-32 px-4" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Tout ce que vous devez savoir sur notre service de domiciliation
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-all"
              >
                <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-orange-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-gray-400 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-orange-500/10 to-orange-500/5 rounded-3xl border border-orange-500/20"
        >
          <p className="text-white mb-4">Vous ne trouvez pas votre réponse ?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all"
          >
            Contactez-nous
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FINAL CTA SECTION ============
function FinalCTASection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Prêt à domicilier
            <br />
            votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">entreprise</span> ?
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Rejoignez les 500+ entreprises qui nous font confiance.
            Activation sous 24h garantie.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-orange-500/50 flex items-center justify-center gap-2"
            >
              Commencer maintenant
              <ArrowRight className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-semibold text-lg rounded-2xl border border-white/10 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Nous appeler
            </motion.a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Sans engagement
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Satisfait ou remboursé
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Activation 24h
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ MOBILE CTA ============
function MobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/95 backdrop-blur-2xl border-t border-white/10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-white font-bold">Domiciliation Marseille</div>
          <div className="text-orange-400 text-sm font-semibold">Dès 49€/mois</div>
        </div>
        <motion.a
          href="#pricing"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl whitespace-nowrap shadow-lg"
        >
          Voir les offres
        </motion.a>
      </div>
    </div>
  );
}
