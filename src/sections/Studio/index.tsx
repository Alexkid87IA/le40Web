import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Clock, Users, Check, ArrowRight, Play, Mic, Camera, Sparkles, Monitor, Headphones, Radio, Plus, Minus, ShoppingCart, Star, Zap, Coffee, Car, FileText, TrendingUp, Palette, Globe, Package, ChevronDown, Phone } from 'lucide-react';

// Packs de base
const basePacks = [
  {
    id: 'studio',
    name: 'Studio',
    subtitle: 'Tournage brut',
    prices: { '1h': 119, '3h': 329, '7h': 599 },
    features: ['Plateau équipé', '2 caméras 4K', 'Éclairage cinéma', 'Micros pro', 'Technicien', 'Transfert rushs'],
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'postprod',
    name: 'Post-Prod',
    subtitle: 'Tournage + montage simple',
    prices: { '1h': 169, '3h': 469, '7h': null },
    features: ['Tout du pack Studio', 'Montage professionnel', 'Colorimétrie de base', 'Export HD optimisé'],
    gradient: 'from-purple-600 to-pink-600',
    popular: true
  },
  {
    id: 'expert',
    name: 'Expert',
    subtitle: 'Création & SEO inclus',
    prices: { '1h': 299, '3h': 849, '7h': null },
    features: ['Tout du pack Post-Prod', 'Stratégie créative', 'Optimisation SEO', 'Coaching storytelling'],
    gradient: 'from-amber-600 to-orange-600'
  }
];

// Catalogue d'upsells
const upsellCategories = [
  {
    id: 'production',
    name: 'Production & Matériel',
    icon: Camera,
    items: [
      { name: 'Caméra 4K supplémentaire', price: 49, unit: '/h' },
      { name: 'Multi-cam live-switch (régie)', price: 149, unit: '/h' },
      { name: 'Teleprompteur + iPad', price: 25, unit: '/h' },
      { name: 'Carte SD 128 Go à emporter', price: 19, unit: '' },
      { name: 'Backup cloud 30 jours', price: 29, unit: '' }
    ]
  },
  {
    id: 'postprod',
    name: 'Post-Production avancée',
    icon: Palette,
    items: [
      { name: 'Color grading cinéma', price: 99, unit: '/vidéo' },
      { name: 'Sous-titres dynamiques FR/EN', price: 49, unit: '/vidéo' },
      { name: 'Motion graphics / lower-thirds', price: 99, unit: '/min' },
      { name: 'Master vertical TikTok/Reels', price: 25, unit: '/export' }
    ]
  },
  {
    id: 'creation',
    name: 'Création & Stratégie',
    icon: Sparkles,
    items: [
      { name: 'Coaching storytelling 1h', price: 119, unit: '' },
      { name: 'Script long-form (≤ 10 min)', price: 149, unit: '' },
      { name: 'Audit & stratégie YouTube 360°', price: 299, unit: '' }
    ]
  },
  {
    id: 'social',
    name: 'Social Media Assets',
    icon: Globe,
    items: [
      { name: 'Pack Shorts : 3 shorts 9:16 + 1 miniature', price: 149, unit: '' },
      { name: 'Short supplémentaire', price: 25, unit: '/pièce' },
      { name: 'Miniature YouTube', price: 35, unit: '/pièce' },
      { name: 'Calendrier contenu 30 jours', price: 299, unit: '' }
    ]
  },
  {
    id: 'media',
    name: 'Media Buying & Analytics',
    icon: TrendingUp,
    items: [
      { name: 'Set-up campagnes Ads', price: 249, unit: '+ 10% budget' },
      { name: 'Boost TikTok 50k vues', price: 219, unit: '' },
      { name: 'Dashboard temps réel', price: 99, unit: '/mois' }
    ]
  },
  {
    id: 'confort',
    name: 'Confort & Logistique',
    icon: Coffee,
    items: [
      { name: 'Café, softs & snacks (1-4 pers.)', price: 29, unit: '' },
      { name: 'Lunch box gourmet', price: 19, unit: '/personne' },
      { name: 'Buffet journée (≤ 6 pers.)', price: 99, unit: '' },
      { name: 'Transport Gare ↔ studio', price: 59, unit: '/trajet' },
      { name: 'Transport CDG/Orly ↔ studio', price: 79, unit: '/trajet' }
    ]
  }
];

export default function Studio() {
  const [selectedPack, setSelectedPack] = useState('postprod');
  const [selectedDuration, setSelectedDuration] = useState('3h');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const currentPack = basePacks.find(p => p.id === selectedPack)!;
  const basePrice = currentPack.prices[selectedDuration as keyof typeof currentPack.prices] || 0;

  // Calculate cart total
  const cartTotal = Object.entries(cart).reduce((total, [itemName, quantity]) => {
    const item = upsellCategories.flatMap(c => c.items).find(i => i.name === itemName);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  const totalPrice = basePrice + cartTotal;

  const addToCart = (itemName: string) => {
    setCart(prev => ({ ...prev, [itemName]: (prev[itemName] || 0) + 1 }));
  };

  const removeFromCart = (itemName: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemName] > 1) {
        newCart[itemName]--;
      } else {
        delete newCart[itemName];
      }
      return newCart;
    });
  };

  return (
    <section id="studio" className="relative min-h-screen bg-black overflow-hidden py-32">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentPack.gradient} opacity-10 transition-all duration-1000`}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center mb-12"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Studio de Production
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
          >
            CRÉEZ
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              SUR MESURE
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto"
          >
            Composez votre solution idéale : packs essentiels + options à la carte
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-8">
          {/* Visual showcase of studios */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
                Découvrez nos 3 studios équipés
              </h3>
              <p className="text-white/60 font-inter text-lg">
                Des espaces professionnels adaptés à tous vos projets créatifs
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Studio Vidéo */}
              <motion.a
                href="/studios/video"
                whileHover={{ y: -10 }}
                className="group relative block"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Studio Vidéo - Le 40"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
                        <Video className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-inter">Studio Vidéo</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-3xl font-montserrat font-bold text-white mb-4">
                        Production<br />Audiovisuelle
                      </h4>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">200m² modulables</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">Fond vert 6x4m</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">Éclairage LED 3 points</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
                        <span className="font-montserrat font-semibold">Visiter le studio</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>

              {/* Studio Podcast */}
              <motion.a
                href="/studios/podcast"
                whileHover={{ y: -10 }}
                className="group relative block"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/7534259/pexels-photo-7534259.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Studio Podcast - Le 40"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
                        <Mic className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-inter">Studio Podcast</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-3xl font-montserrat font-bold text-white mb-4">
                        Enregistrement<br />Audio Pro
                      </h4>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">Isolation acoustique</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">4 micros Shure SM7B</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">Table ronde 6 places</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
                        <span className="font-montserrat font-semibold">Visiter le studio</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>

              {/* Studio Live */}
              <motion.a
                href="/studios/live"
                whileHover={{ y: -10 }}
                className="group relative block"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/9400245/pexels-photo-9400245.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Studio Live - Le 40"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
                        <Radio className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-inter">Studio Live</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-3xl font-montserrat font-bold text-white mb-4">
                        Streaming &<br />Événements
                      </h4>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">Régie multicam</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">Streaming 4K</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                          <span className="text-white/80 text-sm font-inter">Écran LED géant</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
                        <span className="font-montserrat font-semibold">Visiter le studio</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Virtual tour CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mt-12"
            >
              <a
                href="/visite-virtuelle"
                className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-inter text-lg">Visite virtuelle 360° de tous nos studios</span>
              </a>
            </motion.div>
          </motion.div>

          {/* What makes us unique */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-montserrat font-black text-white mb-6"
              >
                Bien plus qu'un studio
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                  Une expérience créative
                </span>
              </motion.h3>
              <p className="text-xl text-white/60 font-inter max-w-3xl mx-auto">
                Notre équipe vous accompagne de A à Z pour transformer vos idées en contenus mémorables
              </p>
            </div>

            {/* Key differentiators */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Technologie de pointe",
                  description: "Caméras 4K/8K, éclairage LED dernière génération, fond vert 6x4m, régie multicam live",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Users,
                  title: "Équipe créative",
                  description: "Réalisateurs, monteurs, motion designers et experts marketing à votre service",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: TrendingUp,
                  title: "Stratégie virale",
                  description: "Optimisation SEO, formats multi-plateformes, coaching storytelling inclus",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: Package,
                  title: "Tout inclus",
                  description: "Du script à la diffusion, nous gérons chaque étape de votre production",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Clock,
                  title: "Flexibilité totale",
                  description: "Location à l'heure, à la journée, formules sur-mesure selon vos besoins",
                  gradient: "from-red-500 to-rose-500"
                },
                {
                  icon: Star,
                  title: "Services premium",
                  description: "Catering, transport, maquillage, traduction simultanée... tout est possible",
                  gradient: "from-indigo-500 to-purple-500"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                      <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-montserrat font-bold text-white mb-4">
                        {feature.title}
                      </h4>
                      <p className="text-white/60 font-inter leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Success stories showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
                    Des créateurs qui nous font confiance
                  </h3>
                  <p className="text-white/60 font-inter text-lg mb-8 leading-relaxed">
                    Entrepreneurs, influenceurs, marques... Ils ont tous trouvé chez nous l'environnement idéal pour créer du contenu qui marque les esprits.
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                        500+
                      </div>
                      <div className="text-white/60 font-inter">Projets réalisés</div>
                    </div>
                    <div>
                      <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-2">
                        50M+
                      </div>
                      <div className="text-white/60 font-inter">Vues générées</div>
                    </div>
                    <div>
                      <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
                        98%
                      </div>
                      <div className="text-white/60 font-inter">Satisfaction</div>
                    </div>
                  </div>
                </div>

                {/* Video showcase placeholder */}
                <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
                  <img 
                    src="https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Showreel Le 40"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <span className="text-white font-montserrat font-semibold">Découvrir notre showreel</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <div className="relative">
              <Sparkles className="w-16 h-16 text-white/20 mx-auto mb-8" />
              
              <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
                Prêt à créer quelque chose d'extraordinaire ?
              </h3>
              
              <p className="text-white/60 font-inter text-lg mb-10 max-w-2xl mx-auto">
                Discutons de votre projet et découvrez comment nos studios peuvent donner vie à vos idées les plus ambitieuses.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/decouvrir-studios"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl px-8 py-4 font-montserrat font-bold overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center gap-3 text-white">
                      <span>DÉCOUVRIR NOS OFFRES</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <div className="relative bg-white/10 backdrop-blur-sm text-white rounded-2xl px-8 py-4 font-montserrat font-semibold border border-white/20 overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5" />
                      <span>PARLER À UN EXPERT</span>
                    </div>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}