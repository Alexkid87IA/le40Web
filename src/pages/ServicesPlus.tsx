import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Sparkles, Zap, Target, Award, Users, CheckCircle, Calendar, Crown, ShoppingCart } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useShopifyCollection } from '../hooks/useShopifyCollection';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import type { ShopifyProduct } from '../lib/shopify';
import { extractTextFromHtml } from '../lib/sanitize';

const premiumServices = [
  {
    id: 1,
    title: "Accompagnement Stratégique",
    description: "Coaching personnalisé pour développer votre vision et votre stratégie d'entreprise",
    icon: Target,
    color: "from-violet-400 to-fuchsia-400",
    features: ["Sessions 1-to-1 avec experts", "Plan stratégique personnalisé", "Suivi mensuel", "Accès prioritaire aux événements"],
    price: "Sur mesure"
  },
  {
    id: 2,
    title: "Concierge Business",
    description: "Service de conciergerie premium pour gérer vos tâches administratives",
    icon: Crown,
    color: "from-yellow-400 to-orange-500",
    features: ["Assistant dédié", "Gestion administrative", "Prise de RDV", "Suivi de dossiers"],
    price: "À partir de 299€/mois"
  },
  {
    id: 3,
    title: "Networking Avancé",
    description: "Accès privilégié à notre réseau d'entrepreneurs et d'investisseurs actifs",
    icon: Users,
    color: "from-green-400 to-emerald-500",
    features: ["Événements membres", "Introductions qualifiées", "Dîners d'affaires", "Accès investisseurs"],
    price: "Sur demande"
  },
  {
    id: 4,
    title: "Formation Sur-Mesure",
    description: "Programmes de formation personnalisés selon vos besoins spécifiques",
    icon: Award,
    color: "from-blue-400 to-cyan-500",
    features: ["Contenu personnalisé", "Formateurs experts", "Certification", "Suivi post-formation"],
    price: "À partir de 1500€"
  }
];

const successStories = [
  {
    id: 1,
    name: "Alexandre Dubois",
    company: "TechVision",
    result: "Levée de fonds de 2M€",
    description: "Grâce à l'accompagnement stratégique, Alexandre a structuré sa vision et convaincu des investisseurs.",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    name: "Sophie Martin",
    company: "EcoDesign",
    result: "Croissance de 300%",
    description: "Le service concierge lui a permis de se concentrer sur le développement de son activité.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 3,
    name: "Thomas Laurent",
    company: "FinTech Pro",
    result: "Partenariat stratégique",
    description: "Le networking VIP lui a ouvert les portes d'un partenariat majeur avec une grande banque.",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const processSteps = [
  {
    step: 1,
    title: "Audit Initial",
    description: "Analyse approfondie de vos besoins et objectifs",
    icon: Target
  },
  {
    step: 2,
    title: "Stratégie Personnalisée",
    description: "Élaboration d'un plan d'action sur-mesure",
    icon: Zap
  },
  {
    step: 3,
    title: "Mise en Œuvre",
    description: "Accompagnement dans l'exécution de votre stratégie",
    icon: Award
  },
  {
    step: 4,
    title: "Suivi & Optimisation",
    description: "Monitoring continu et ajustements stratégiques",
    icon: CheckCircle
  }
];

export default function ServicesPlus() {
  const { products: premiumServices, loading } = useShopifyCollection('services-beauty');
  const { products: additionalServices } = useShopifyCollection('services-additionnels');
  const { addShopifyItem, loading: cartLoading } = useUnifiedCart();

  const handleAddToCart = async (product: ShopifyProduct) => {
    const firstVariant = product.variants.edges[0]?.node;
    if (firstVariant && firstVariant.availableForSale) {
      await addShopifyItem({
        shopifyVariantId: firstVariant.id,
        productTitle: product.title,
        variantTitle: firstVariant.title,
        price: parseFloat(firstVariant.price.amount),
        quantity: 1,
        image: product.images.edges[0]?.node.url,
        availableForSale: firstVariant.availableForSale,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <HeaderNav />
      <MobileBurger />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0F172A] to-slate-900 film-grain">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-6 py-3 glass-effect rounded-full border border-white/20 mb-8"
              >
                <Star className="w-4 h-4 text-violet-400 mr-2" />
                <span className="text-sm font-inter font-medium text-white/80 tracking-wide">SERVICES PREMIUM</span>
              </motion.div>

              <h1 className="text-hero font-montserrat font-black text-white mb-6">
                Services<span className="gradient-text">+</span>
              </h1>
              <p className="text-body-large font-inter text-white/70 max-w-4xl mx-auto">
                Accompagnement personnalisé et services premium pour accélérer votre développement et transformer votre vision en succès
              </p>
            </motion.div>
          </div>
        </section>

        {/* Premium Services from Shopify */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-section-title font-montserrat font-black text-white mb-6">
                Services <span className="gradient-text">Premium</span>
              </h2>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                Beauty, décoration, catering et support technique pour vos tournages
              </p>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...premiumServices, ...additionalServices].map((service, index) => {
                  const variant = service.variants.edges[0]?.node;
                  const price = variant ? parseFloat(variant.price.amount) : 0;
                  const image = service.images.edges[0]?.node;

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
                      className="group glass-effect border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
                    >
                      {image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={image.url}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                      )}

                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-all">
                          {service.title}
                        </h3>

                        <p className="text-white/70 text-sm mb-4 line-clamp-3">
                          {extractTextFromHtml(service.description)?.substring(0, 150)}...
                        </p>

                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-bold text-white">{price}€</span>
                          {variant && variant.title !== 'Default Title' && (
                            <span className="text-sm text-white/60">/ {variant.title}</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(service)}
                          disabled={cartLoading}
                          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {cartLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              <span>Ajouter au panier</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Keep old static content for context */}
        <section className="py-20 bg-[#0F172A] film-grain" style={{display: 'none'}}>
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {premiumServices.slice(0, 0).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="glass-effect border border-white/10 rounded-4xl p-8 hover:border-white/20 transition-all duration-500 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    
                    <div className="relative">
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-montserrat font-bold text-white group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                          {service.title}
                        </h3>
                        <div className="text-right">
                          <div className="text-lg font-montserrat font-bold text-violet-400">{service.price}</div>
                        </div>
                      </div>
                      
                      <p className="text-white/70 font-inter mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-white/80">
                            <CheckCircle className="w-4 h-4 text-community mr-3 flex-shrink-0" />
                            <span className="font-inter text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-primary text-white font-montserrat font-semibold py-3 rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 flex items-center justify-center relative overflow-hidden glow-effect"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative flex items-center">
                          <span className="tracking-wide">En savoir plus</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-[#0F172A] film-grain">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-section-title font-montserrat font-black text-white mb-6">
                Notre <span className="gradient-text">Méthode</span>
              </h2>
              <p className="text-body-large font-inter text-white/70 max-w-3xl mx-auto">
                Un processus éprouvé en 4 étapes pour maximiser votre réussite
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="text-center relative"
                >
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-primary transform translate-x-1/2"></div>
                  )}
                  
                  <div className="relative z-10 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="glass-effect border border-white/10 rounded-3xl p-6">
                    <div className="text-violet-400 font-montserrat font-bold text-sm mb-2">ÉTAPE {step.step}</div>
                    <h3 className="text-xl font-montserrat font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/70 font-inter text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-section-title font-montserrat font-black text-white mb-6">
                Success <span className="gradient-text">Stories</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="glass-effect border border-white/10 rounded-4xl p-8 hover:border-white/20 transition-all duration-500 text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 ring-2 ring-violet-400/30 group-hover:ring-fuchsia-400/50 transition-all duration-500">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover ken-burns"
                      />
                    </div>

                    <h3 className="text-xl font-montserrat font-bold text-white mb-2">{story.name}</h3>
                    <p className="text-white/60 font-inter text-sm mb-4">{story.company}</p>
                    
                    <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-montserrat font-semibold mb-4 inline-block">
                      {story.result}
                    </div>

                    <p className="text-white/70 font-inter text-sm leading-relaxed italic">
                      "{story.description}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-12 h-12 text-violet-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-white mb-6">
                Prêt à passer au niveau supérieur ?
              </h2>
              <p className="text-xl font-inter text-white/70 mb-8">
                Discutons de vos objectifs et créons ensemble la stratégie qui transformera votre vision en réalité
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-montserrat font-semibold rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 glow-effect"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver un audit gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 glass-effect text-white font-montserrat font-semibold rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-500"
                >
                  Poser une question
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}