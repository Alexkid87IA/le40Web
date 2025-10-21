import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Check, ArrowRight, Star, FileText, Mail, Phone, Shield,
  Building2, Globe, Clock, Users, ChevronRight,
  Zap, X, TrendingUp, Search, ChevronDown, AlertCircle,
  RefreshCw, MessageCircle, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';

const pricingPlans = [
  {
    id: 'domiciliation-starter',
    name: 'STARTER',
    price: 49,
    period: '/mois',
    description: 'Freelances, auto-entrepreneurs',
    features: [
      'Votre courrier (scan 2h)',
      'Votre adresse officielle',
      'Vos attestations',
      'Réexpédition 1x/semaine'
    ],
    savings: [
      '5h/mois de paperasse',
      '0€ de location bureau',
      '100% conformité garantie'
    ],
    gradient: 'from-zinc-600 to-gray-600',
    popular: false
  },
  {
    id: 'domiciliation-business',
    name: 'BUSINESS',
    price: 99,
    period: '/mois',
    description: 'SARL, SAS, PME',
    features: [
      'Standard téléphonique pro',
      'Accueil clients',
      '2h salle/mois',
      'Réexpédition quotidienne',
      'Google Business Profile'
    ],
    savings: [
      '300€/mois de secrétariat',
      '150€/mois de salle',
      'Image d\'entreprise établie'
    ],
    gradient: 'from-amber-600 to-orange-600',
    popular: true
  },
  {
    id: 'domiciliation-premium',
    name: 'SCALE-UP',
    price: 199,
    period: '/mois',
    description: 'Siège social complet',
    features: [
      'Secrétariat dédié',
      '8h salle/mois',
      '4h bureau privatif/mois',
      'Gestion administrative',
      'Conseiller prioritaire'
    ],
    savings: [
      '800€/mois de location',
      '1000€/mois d\'assistante',
      'Infrastructure complète'
    ],
    gradient: 'from-orange-600 to-red-600',
    popular: false
  }
];

const detailedServices = [
  {
    icon: Mail,
    title: 'Gestion Courrier Intelligente',
    color: 'text-orange-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Réception de tout votre courrier pro',
      'Scan HD sous 2 heures (vraiment)',
      'Upload automatique sur votre espace cloud',
      'Notification push sur votre tel',
      'Réexpédition où vous voulez, quand vous voulez',
      'Archive 12 mois en ligne'
    ],
    testimonial: {
      quote: 'Avant, je ratais des courriers importants. Maintenant, je scanne mon téléphone dans le métro.',
      author: 'Sophie',
      role: 'e-commerce'
    }
  },
  {
    icon: Phone,
    title: 'Standard Téléphonique Pro',
    color: 'text-blue-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Ligne fixe 04 à votre nom d\'entreprise',
      'Accueil pro personnalisé (on dit "Bonjour, [VotreEntreprise]")',
      'Transfert d\'appel vers votre mobile',
      'Messages pris et transmis par email',
      'Filtrage des spams/démarchages'
    ],
    testimonial: {
      quote: 'Mes clients pensent que j\'ai une vraie équipe. Ça change tout pour la crédibilité.',
      author: 'Marc',
      role: 'consultant'
    }
  },
  {
    icon: Building2,
    title: 'Salles de Réunion (VRAIMENT INCLUSES)',
    color: 'text-purple-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      '2h à 8h/mois selon formule (pas de supplément)',
      'Réservation en 2 clics sur l\'app',
      'Salles équipées : écran, wifi pro, café',
      'Accueil de vos clients à la réception',
      'Ambiance pro, pas "salle des fêtes"'
    ],
    testimonial: {
      quote: 'Je reçois mes clients ici plutôt que dans un café. J\'ai signé 40% plus de contrats depuis.',
      author: 'Julie',
      role: 'agence comm'
    }
  },
  {
    icon: Shield,
    title: 'Conformité & Administratif',
    color: 'text-green-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Attestation de domiciliation officielle',
      'Agrément Préfecture (les autres disent "oui" sans l\'avoir)',
      'Mise à jour automatique INSEE/Infogreffe',
      'Renouvellement géré pour vous',
      'Support admin dédié si besoin'
    ],
    testimonial: {
      quote: 'Lors du contrôle Urssaf, tout était carré. Zéro stress, zéro problème.',
      author: 'David',
      role: 'auto-entrepreneur'
    }
  },
  {
    icon: Globe,
    title: 'Présence Digitale',
    color: 'text-cyan-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Google Business Profile optimisé',
      'Référencement local automatique',
      'Adresse visible sur Google Maps',
      'Renforce votre crédibilité en ligne',
      'Améliore votre visibilité locale'
    ],
    testimonial: {
      quote: 'Mes clients me trouvent facilement sur Google. C\'est un vrai plus pour mon business.',
      author: 'Emma',
      role: 'freelance'
    }
  },
  {
    icon: Users,
    title: 'Accueil Client Premium',
    color: 'text-pink-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Réception de vos visiteurs professionnelle',
      'Espace d\'attente confortable',
      'Café offert à vos clients',
      'Notification immédiate de leur arrivée',
      'Image de marque renforcée'
    ],
    testimonial: {
      quote: 'L\'accueil fait toute la différence. Mes clients sont impressionnés dès leur arrivée.',
      author: 'Thomas',
      role: 'startup'
    }
  },
  {
    icon: Clock,
    title: 'Accès Coworking',
    color: 'text-amber-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Accès aux espaces selon formule',
      'Wi-Fi ultra-rapide',
      'Café et thé à volonté',
      'Ambiance inspirante',
      'Networking avec la communauté'
    ],
    testimonial: {
      quote: 'Quand j\'ai besoin de sortir de chez moi, je viens travailler ici. C\'est parfait.',
      author: 'Laura',
      role: 'designer'
    }
  },
  {
    icon: Sparkles,
    title: 'Conseiller Dédié',
    color: 'text-yellow-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Interlocuteur unique qui connaît votre dossier',
      'Réponse en moins d\'1h en moyenne',
      'Accompagnement personnalisé',
      'Conseils administratifs',
      'Humain, pas un chatbot'
    ],
    testimonial: {
      quote: 'J\'ai toujours une réponse rapide. C\'est rassurant de savoir que quelqu\'un suit mon dossier.',
      author: 'Pierre',
      role: 'entrepreneur'
    }
  }
];

const testimonials = [
  {
    initial: 'S',
    name: 'Sophie Martin',
    role: 'E-commerce beauté',
    before: [
      'Adresse perso sur le site',
      'Courrier souvent volé',
      '1h/jour à gérer admin'
    ],
    after: [
      { metric: '+22%', label: 'Taux de conversion' },
      { metric: '✓', label: 'Plus jamais raté un courrier' },
      { metric: '30h/mois', label: 'Temps gagné' }
    ],
    quote: 'Le scan automatique du courrier m\'a changé la vie. Et mes clients me prennent enfin au sérieux.'
  },
  {
    initial: 'M',
    name: 'Marc Dubois',
    role: 'Consultant IT',
    before: [
      'Pas de numéro fixe pro',
      'Rendez-vous dans les cafés',
      'Image peu professionnelle'
    ],
    after: [
      { metric: '+35%', label: 'Taux de signature' },
      { metric: '✓', label: 'Standard pro 24/7' },
      { metric: '15h/mois', label: 'Salle de réunion utilisée' }
    ],
    quote: 'Le standard téléphonique et les salles de réunion ont transformé mon image professionnelle.'
  },
  {
    initial: 'J',
    name: 'Julie Renard',
    role: 'Startup tech',
    before: [
      'Domiciliation basique',
      'Pas d\'accueil client',
      'Organisation compliquée'
    ],
    after: [
      { metric: '+40%', label: 'Deals signés' },
      { metric: '✓', label: 'Accueil premium' },
      { metric: '20h/mois', label: 'Admin gagnées' }
    ],
    quote: 'L\'accompagnement complet nous a permis de nous concentrer sur notre croissance.'
  }
];

const faqItems = [
  {
    question: 'Le scan en 2h, c\'est vraiment vrai ?',
    answer: 'Oui, absolument. Votre courrier arrive le matin, on le scanne avant midi. Vous recevez une notification sur votre téléphone avec le scan en pièce jointe.',
    highlight: 'Regardez comment ça fonctionne',
    hasVideo: true
  },
  {
    question: 'Je peux vraiment utiliser la salle 2h/mois ?',
    answer: 'Oui, c\'est inclus dans le prix. Réservation en ligne simple, annulation gratuite jusqu\'à 24h avant. Aucun frais caché.',
    highlight: 'Voir le planning de disponibilité',
    hasVideo: false
  },
  {
    question: 'Qu\'arrive-t-il si je rate un appel ?',
    answer: 'Notre standard prend le message et vous l\'envoie par email immédiatement. Vous pouvez aussi configurer un transfert automatique vers votre mobile.',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'L\'agrément Préfecture, c\'est obligatoire ?',
    answer: 'Oui ! C\'est une obligation légale pour toute société de domiciliation. Nous avons cet agrément, et il est vérifiable. Méfiez-vous des offres qui ne le mentionnent pas.',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'Je peux changer de formule ?',
    answer: 'Oui, à tout moment. Upgrade immédiat, downgrade au prochain cycle de facturation. Pas de pénalités.',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'C\'est légal de ne pas avoir de bureau physique ?',
    answer: 'Totalement légal avec une domiciliation conforme. Notre attestation est reconnue par tous les organismes (URSSAF, impôts, banques, etc.).',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'Mon courrier est-il en sécurité ?',
    answer: 'Oui. Stockage sécurisé, scan confidentiel, archive chiffrée. Seul vous avez accès à vos documents numérisés.',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'Différence avec les concurrents ?',
    answer: 'Les autres vendent une adresse. Nous gérons TOUT : scan 2h, standard inclus, salles incluses, conseiller dédié. C\'est un service complet, pas juste une boîte aux lettres.',
    highlight: null,
    hasVideo: false
  }
];

export default function Domiciliation() {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleAddToCart = (plan: typeof pricingPlans[0]) => {
    addItem({
      id: plan.id,
      serviceType: 'domiciliation',
      serviceName: `Domiciliation ${plan.name}`,
      date: new Date().toISOString(),
      duration: 'month',
      price: plan.price,
      quantity: 1
    });

    setAddedToCart({ ...addedToCart, [plan.id]: true });
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [plan.id]: false });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      <SidebarNav />
      <MobileBurger />

      <main className="lg:ml-60">
        {/* SECTION 1: HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
          {/* Animated background with orange blobs */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[150px]"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[150px]"></div>
            </motion.div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* LEFT: Copywriting */}
              <div>
                {/* Eyebrow badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full mb-6"
                >
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 font-medium text-sm">Activation en 24h • Agrément Préfecture</span>
                </motion.div>

                {/* H1 */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
                >
                  La domiciliation qui gère{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    TOUT
                  </span>
                  {' '}pour vous
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-white/70 mb-8"
                >
                  Bien plus qu'une adresse : courrier numérisé en 2h, standard téléphonique pro,
                  salle de réunion incluse, et un vrai accompagnement humain.
                </motion.p>

                {/* Double CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <a
                    href="#pricing"
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
                  >
                    Voir les 3 formules
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <Link
                    to="/contact"
                    className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all inline-flex items-center justify-center gap-2"
                  >
                    Parler à un conseiller
                  </Link>
                </motion.div>

                {/* Social proof badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-orange-400">120+</div>
                    <div className="text-sm text-white/60">Entreprises</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                    <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-sm text-white/60">Agrément Préfecture</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm text-white/60">Activation 24h</div>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT: Visual mockup */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative hidden lg:block"
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ y: -5, rotate: 2 }}
                    className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                  >
                    <Mail className="w-8 h-8 text-orange-400 mb-3" />
                    <div className="text-white font-semibold mb-2">Scan courrier</div>
                    <div className="text-white/60 text-sm">2h chrono</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5, rotate: -2 }}
                    className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 mt-8"
                  >
                    <Phone className="w-8 h-8 text-blue-400 mb-3" />
                    <div className="text-white font-semibold mb-2">Standard pro</div>
                    <div className="text-white/60 text-sm">Accueil personnalisé</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5, rotate: -2 }}
                    className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 -mt-4"
                  >
                    <Building2 className="w-8 h-8 text-purple-400 mb-3" />
                    <div className="text-white font-semibold mb-2">Salle incluse</div>
                    <div className="text-white/60 text-sm">2-8h/mois</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5, rotate: 2 }}
                    className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 mt-4"
                  >
                    <Users className="w-8 h-8 text-green-400 mb-3" />
                    <div className="text-white font-semibold mb-2">Conseiller dédié</div>
                    <div className="text-white/60 text-sm">Humain, pas robot</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROBLEM (Pain Points) */}
        <section className="py-32 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-6">
                Une adresse ne suffit pas.
                <br />
                <span className="text-white/40">Ce qui compte, c'est ce qui va avec.</span>
              </h2>

              {/* Comparison table */}
              <div className="grid md:grid-cols-2 gap-8 mt-16">
                {/* LEFT: Classic domiciliation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 bg-red-950/20 border border-red-900/30 rounded-2xl"
                >
                  <div className="text-red-400 font-bold mb-4 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    DOMICILIATION CLASSIQUE
                  </div>
                  <ul className="space-y-3 text-white/60">
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>Juste une adresse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>Courrier en vrac</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>"Débrouillez-vous"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>Standard générique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>Salle en supplément</span>
                    </li>
                  </ul>
                </motion.div>

                {/* RIGHT: Le 40 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 bg-gradient-to-br from-orange-950/20 to-green-950/20 border border-orange-900/30 rounded-2xl"
                >
                  <div className="text-orange-400 font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    LE 40 MARSEILLE
                  </div>
                  <ul className="space-y-3 text-white">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Adresse + écosystème complet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Scan sous 2h + cloud sécurisé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Conseiller dédié qui connaît votre dossier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Accueil personnalisé à votre nom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>2h-8h/mois INCLUSES dans l'abonnement</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Stat choc */}
              <div className="mt-16 text-center">
                <div className="text-6xl font-black text-orange-400 mb-4">5h/mois</div>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  C'est le temps que perdent les entrepreneurs à gérer courrier et paperasse.
                  <br />
                  <span className="text-white font-bold">Avec nous ? 0 minute. On s'occupe de tout.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: SERVICES IN DETAIL */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-6">
                Voici{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  EXACTEMENT
                </span>
                {' '}ce qu'on fait pour vous
              </h2>
              <p className="text-xl text-white/60 text-center mb-20 max-w-3xl mx-auto">
                (et pourquoi nos clients restent)
              </p>

              {/* Services grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {detailedServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`p-8 bg-gradient-to-br ${service.bgColor} border border-zinc-700 rounded-2xl`}
                  >
                    <service.icon className={`w-12 h-12 ${service.color} mb-6`} />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h3>

                    <div className="mb-6">
                      <div className={`text-sm ${service.color} font-semibold mb-3`}>Ce qu'on fait :</div>
                      <ul className="space-y-2 text-white/70 text-sm">
                        {service.features.map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border-l-4 border-green-400">
                      <div className="text-xs text-green-400 font-semibold mb-1">TÉMOIGNAGE</div>
                      <p className="text-sm text-white/80 italic">
                        "{service.testimonial.quote}"
                      </p>
                      <p className="text-xs text-white/50 mt-2">
                        — {service.testimonial.author}, {service.testimonial.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: PRICING */}
        <section id="pricing" className="py-32 bg-gradient-to-b from-zinc-900 to-black">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-6">
                Choisissez selon{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  VOS
                </span>
                {' '}besoins
              </h2>
              <p className="text-xl text-white/60 text-center mb-12">
                Pas selon notre envie de vendre
              </p>

              {/* Toggle Mensuel/Annuel */}
              <div className="flex justify-center mb-16">
                <div className="bg-white/5 p-2 rounded-full inline-flex gap-2">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      billingPeriod === 'monthly'
                        ? 'bg-orange-500 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Mensuel
                  </button>
                  <button
                    onClick={() => setBillingPeriod('annual')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      billingPeriod === 'annual'
                        ? 'bg-orange-500 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Annuel <span className="text-green-400 text-sm ml-1">(-20%)</span>
                  </button>
                </div>
              </div>

              {/* Pricing cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className={`p-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl relative ${
                      plan.popular ? 'border-2 border-orange-500' : 'border border-zinc-700'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1 rounded-full text-white text-sm font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        POPULAIRE
                      </div>
                    )}

                    <div className="text-sm font-semibold text-zinc-400 mb-2">{plan.name}</div>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-5xl font-black text-white">{plan.price}€</span>
                      <span className="text-zinc-400 mb-2">{plan.period}</span>
                    </div>
                    <p className="text-zinc-400 mb-8">{plan.description}</p>

                    <div className="mb-8">
                      <div className="text-orange-400 font-semibold mb-4">ON GÈRE POUR VOUS :</div>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/80">
                            <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl mb-8">
                      <div className="text-xs text-zinc-400 mb-2">CE QUE VOUS ÉCONOMISEZ :</div>
                      <div className="text-sm text-white/70">
                        {plan.savings.map((saving, i) => (
                          <div key={i}>→ {saving}</div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(plan)}
                      className={`w-full py-4 font-bold rounded-xl transition-all ${
                        plan.popular
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {addedToCart[plan.id] ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <Check className="w-5 h-5" />
                            Ajouté au panier !
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            {plan.popular ? 'Le plus choisi' : 'Démarrer'}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Guarantees */}
              <div className="text-center">
                <p className="text-white/60 flex items-center justify-center gap-6 flex-wrap">
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Sans engagement
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Résiliable en 1 clic
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Satisfait ou remboursé 30j
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: PROCESS */}
        <section className="py-32 bg-black">
          <div className="max-w-5xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-6">
                Opérationnel en{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  3 étapes
                </span>
              </h2>
              <p className="text-xl text-white/60 text-center mb-20">
                (on s'occupe du reste)
              </p>

              {/* Timeline */}
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-xl">
                      1
                    </div>
                    <div>
                      <div className="text-sm text-orange-400 font-semibold">5 minutes</div>
                      <div className="text-white font-bold">Choisissez</div>
                    </div>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-white mb-3">Choisissez votre formule</h3>
                    <p className="text-white/70 mb-4">
                      Sélectionnez l'offre adaptée à vos besoins. Paiement sécurisé par CB ou virement.
                    </p>
                  </div>

                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-xl">
                      2
                    </div>
                    <div>
                      <div className="text-sm text-orange-400 font-semibold">2 heures</div>
                      <div className="text-white font-bold">Documents</div>
                    </div>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-white mb-3">Envoyez vos documents</h3>
                    <p className="text-white/70 mb-4">Par email :</p>
                    <ul className="text-sm text-white/60 space-y-1">
                      <li>• Photo pièce d'identité</li>
                      <li>• Kbis (si déjà créé) ou récépissé</li>
                      <li>• Justificatif domicile perso</li>
                    </ul>
                  </div>

                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-black text-xl">
                      ✓
                    </div>
                    <div>
                      <div className="text-sm text-green-400 font-semibold">24 heures</div>
                      <div className="text-white font-bold">Activation</div>
                    </div>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-white mb-3">C'est opérationnel !</h3>
                    <ul className="text-white/70 space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Adresse opérationnelle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Courrier réceptionné dès J+1</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Téléphone activé</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Attestation envoyée</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              <div className="mt-16 text-center">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
                >
                  Démarrer maintenant
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: TESTIMONIALS */}
        <section className="py-32 bg-gradient-to-b from-zinc-900 to-black">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-6">
                Ils ont choisi nos services.
                <br />
                <span className="text-white/40">Voici ce qui a changé.</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mt-20">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="p-8 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                        {testimonial.initial}
                      </div>
                      <div>
                        <div className="font-bold text-white">{testimonial.name}</div>
                        <div className="text-sm text-zinc-400">{testimonial.role}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-xs text-zinc-400 mb-2">AVANT LE 40 :</div>
                      <ul className="text-sm text-white/60 space-y-1">
                        {testimonial.before.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <div className="text-xs text-green-400 mb-2">APRÈS 6 MOIS :</div>
                      <ul className="text-sm text-white space-y-1">
                        {testimonial.after.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            {item.metric.includes('+') ? (
                              <TrendingUp className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            ) : (
                              <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            )}
                            <span>{item.label} : <strong>{item.metric}</strong></span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border-l-4 border-orange-400">
                      <p className="text-sm text-white/80 italic">"{testimonial.quote}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: FAQ */}
        <section className="py-32 bg-black">
          <div className="max-w-4xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-6">
                Les vraies questions
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  sur nos services
                </span>
              </h2>

              {/* Search bar */}
              <div className="mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Rechercher dans la FAQ..."
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>

              {/* FAQ accordion */}
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <span className="text-lg font-semibold text-white pr-4">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-orange-400 shrink-0" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 text-white/70">
                            <p className="mb-4">{item.answer}</p>
                            {item.highlight && (
                              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                                <p className="text-sm text-orange-400 font-semibold mb-2">
                                  {item.hasVideo ? '🎥 ' : ''}
                                  {item.highlight}
                                </p>
                                <button className="text-sm text-white underline hover:text-orange-400">
                                  {item.hasVideo ? 'Voir la vidéo du process (30 sec)' : 'En savoir plus →'}
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8: COMPARISON TABLE */}
        <section className="py-32 bg-gradient-to-b from-zinc-900 to-black">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-6">
                Pourquoi nos clients
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  ne partent pas
                </span>
              </h2>

              {/* Comparison table */}
              <div className="overflow-x-auto mt-16">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-white/60 font-semibold">Critère</th>
                      <th className="text-center py-4 px-4 text-orange-400 font-bold">Le 40</th>
                      <th className="text-center py-4 px-4 text-white/40 font-semibold">Concurrent A</th>
                      <th className="text-center py-4 px-4 text-white/40 font-semibold">Concurrent B</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-4">Scan courrier</td>
                      <td className="text-center py-4 px-4">
                        <div className="inline-flex items-center gap-2 text-green-400 font-semibold">
                          <Check className="w-5 h-5" />
                          2h
                        </div>
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <span className="text-orange-400">⚠️</span> Hebdo
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <X className="w-5 h-5 inline text-red-400" /> Pas de scan
                      </td>
                    </tr>

                    <tr className="border-b border-white/5">
                      <td className="py-4 px-4">Standard inclus</td>
                      <td className="text-center py-4 px-4">
                        <Check className="w-5 h-5 inline text-green-400" />
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <X className="w-5 h-5 inline text-red-400" /> En option
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <X className="w-5 h-5 inline text-red-400" /> En option
                      </td>
                    </tr>

                    <tr className="border-b border-white/5">
                      <td className="py-4 px-4">Salle incluse</td>
                      <td className="text-center py-4 px-4">
                        <Check className="w-5 h-5 inline text-green-400" />
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <X className="w-5 h-5 inline text-red-400" /> Payant
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <X className="w-5 h-5 inline text-red-400" /> Payant
                      </td>
                    </tr>

                    <tr className="border-b border-white/5">
                      <td className="py-4 px-4">Conseiller dédié</td>
                      <td className="text-center py-4 px-4">
                        <Check className="w-5 h-5 inline text-green-400" />
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <X className="w-5 h-5 inline text-red-400" /> Support générique
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <X className="w-5 h-5 inline text-red-400" /> FAQ seulement
                      </td>
                    </tr>

                    <tr className="border-b border-white/5">
                      <td className="py-4 px-4">Agrément Préfecture</td>
                      <td className="text-center py-4 px-4">
                        <Check className="w-5 h-5 inline text-green-400" />
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <Check className="w-5 h-5 inline text-green-400" />
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        <span className="text-orange-400">⚠️</span> À vérifier
                      </td>
                    </tr>

                    <tr className="border-b border-white/5">
                      <td className="py-4 px-4">Résiliation</td>
                      <td className="text-center py-4 px-4">
                        <div className="inline-flex items-center gap-2 text-green-400 font-semibold">
                          <Check className="w-5 h-5" />
                          1 clic
                        </div>
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        Engagement 12 mois
                      </td>
                      <td className="text-center py-4 px-4 text-white/40">
                        Préavis 3 mois
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-12 text-center">
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  Le prix n'est <strong className="text-white">PAS</strong> le seul critère.
                  <br />
                  Ce qui compte : <strong className="text-orange-400">le service après l'achat</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9: URGENCY */}
        <section className="py-32 bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <AlertCircle className="w-16 h-16 text-white mx-auto mb-8" />

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Nous limitons volontairement
                <br />
                nos domiciliations
              </h2>

              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                Pourquoi ? Parce qu'on s'engage à scanner votre courrier en 2h,
                vous répondre en moins d'1h, et personnaliser l'accueil téléphonique.
                Pour tenir cette promesse, on ne peut pas accepter tout le monde.
              </p>

              {/* Counters */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="text-sm text-white/80 mb-2">BUSINESS</div>
                  <div className="text-5xl font-black text-white mb-2">7</div>
                  <div className="text-white/80">places restantes ce mois-ci</div>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="text-sm text-white/80 mb-2">STARTER</div>
                  <div className="text-5xl font-black text-white mb-2">12</div>
                  <div className="text-white/80">places restantes ce mois-ci</div>
                </div>
              </div>

              {/* Giant CTA */}
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-12 py-6 bg-white text-orange-600 font-black text-xl rounded-xl hover:scale-105 transition-transform shadow-2xl mb-6"
              >
                Réserver ma place maintenant
                <ArrowRight className="w-6 h-6" />
              </a>

              <p className="text-white/80">
                Sans CB • Activation sous 24h • Sans engagement
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 10: GUARANTEES */}
        <section className="py-32 bg-black">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-20">
                Notre engagement{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  service
                </span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Guarantee 1 */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Satisfait ou remboursé
                  </h3>
                  <p className="text-white/60 text-sm">
                    30 jours pour tester. Si nos services ne tiennent pas leurs promesses,
                    on vous rembourse. Sans justification.
                  </p>
                </motion.div>

                {/* Guarantee 2 */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Sans engagement
                  </h3>
                  <p className="text-white/60 text-sm">
                    Résiliable en 1 clic depuis votre espace. Pas de courrier recommandé,
                    pas de rappels insistants.
                  </p>
                </motion.div>

                {/* Guarantee 3 */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Réponse en -1h
                  </h3>
                  <p className="text-white/60 text-sm">
                    Un problème ? Une question ? On répond en 52 minutes en moyenne.
                    Pas un robot, une vraie personne.
                  </p>
                </motion.div>

                {/* Guarantee 4 */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Conformité garantie
                  </h3>
                  <p className="text-white/60 text-sm">
                    Agrément Préfecture officiel. Si vous avez un problème avec l'admin,
                    on gère et on rembourse les frais.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 11: FINAL CTA */}
        <section className="py-32 bg-gradient-to-b from-zinc-900 to-black">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Prêt pour une domiciliation
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  qui fait vraiment le job ?
                </span>
              </h2>

              {/* Recap bullets */}
              <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
                <div className="flex items-center gap-2 text-white/80">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Courrier géré, scanné, notifié</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Standard pro + salle incluse</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Zéro paperasse</span>
                </div>
              </div>

              {/* Double CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
                >
                  Choisir ma formule
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Poser une question
                </Link>
              </div>

              <p className="text-white/40 text-sm">
                Rejoignez les 120+ entreprises qui nous font confiance
              </p>
            </motion.div>
          </div>
        </section>

        {/* MOBILE STICKY BAR */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-white font-bold">Domiciliation Marseille</div>
              <div className="text-orange-400 text-sm">Dès 49€/mois</div>
            </div>
            <a
              href="#pricing"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg whitespace-nowrap"
            >
              Choisir
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
