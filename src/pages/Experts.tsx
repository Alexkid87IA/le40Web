import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, ArrowRight, Sparkles, Award, Target, Zap, Heart, CheckCircle, Calendar, Phone, ShoppingCart } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useShopifyCollection } from '../hooks/useShopifyCollection';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import type { ShopifyProduct } from '../lib/shopify';
import { extractTextFromHtml } from '../lib/sanitize';

const expertCategories = [
  {
    id: 1,
    title: "Juridique & Fiscal",
    description: "Avocats d'affaires, experts-comptables et conseillers fiscaux",
    icon: Award,
    color: "from-blue-400 to-blue-600",
    experts: ["Maître Dubois - Droit des sociétés", "Cabinet Martin - Expertise comptable", "Sophie Laurent - Conseil fiscal"]
  },
  {
    id: 2,
    title: "Marketing & Communication",
    description: "Spécialistes en stratégie digitale et communication",
    icon: Target,
    color: "from-purple-400 to-purple-600",
    experts: ["Agence Pixel - Marketing digital", "Thomas Créa - Design graphique", "Marie Influence - Social media"]
  },
  {
    id: 3,
    title: "Finance & Investissement",
    description: "Conseillers en financement et levée de fonds",
    icon: Zap,
    color: "from-green-400 to-green-600",
    experts: ["Capital Partners - Levée de fonds", "Fintech Solutions - Financement", "Investment Pro - Conseil stratégique"]
  },
  {
    id: 4,
    title: "Développement & Tech",
    description: "Développeurs, consultants IT et experts techniques",
    icon: Sparkles,
    color: "from-orange-400 to-orange-600",
    experts: ["DevTeam Pro - Développement web", "Tech Consulting - Architecture IT", "Digital Factory - Applications mobiles"]
  }
];

const networkBenefits = [
  {
    icon: Users,
    title: "Réseau Qualifié",
    description: "Plus de 50 experts qualifiés et recommandés par nos membres"
  },
  {
    icon: Star,
    title: "Tarifs Préférentiels",
    description: "Conditions avantageuses négociées pour nos membres"
  },
  {
    icon: CheckCircle,
    title: "Qualité Garantie",
    description: "Experts vérifiés et recommandés par la communauté"
  },
  {
    icon: Heart,
    title: "Accompagnement",
    description: "Mise en relation personnalisée selon vos besoins"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Pierre Moreau",
    role: "CEO, TechStart",
    comment: "Grâce au réseau d'experts du 40, j'ai trouvé l'avocat parfait pour ma levée de fonds. Un gain de temps énorme !",
    rating: 5
  },
  {
    id: 2,
    name: "Claire Dubois",
    role: "Fondatrice, EcoDesign",
    comment: "L'expertise comptable recommandée m'a fait économiser des milliers d'euros. Service exceptionnel.",
    rating: 5
  }
];

export default function Experts() {
  const { products: expertServices, loading } = useShopifyCollection('services-expert');
  const { addShopifyItem, loading: cartLoading } = useUnifiedCart();
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowStickyCTA(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <HeaderNav />
      <MobileBurger />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#0F172A] to-slate-900 film-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-12 lg:mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 glass-effect rounded-full border border-white/20 mb-6 md:mb-8"
              >
                <Users className="w-3 h-3 md:w-4 md:h-4 text-community mr-2" />
                <span className="text-xs md:text-sm font-inter font-medium text-white/80 tracking-wide">RÉSEAU D'EXPERTS</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-black text-white mb-4 md:mb-6">
                Réseau d'<span className="gradient-text">Experts</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-inter text-white/70 max-w-4xl mx-auto px-4">
                Accédez à notre communauté de professionnels qualifiés pour accompagner votre croissance et résoudre vos défis entrepreneuriaux
              </p>
            </motion.div>
          </div>
        </section>

        {/* Network Benefits */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-12 lg:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4 md:mb-6">
                Pourquoi notre <span className="bg-gradient-to-r from-community to-green-600 bg-clip-text text-transparent">réseau</span> ?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {networkBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-community to-green-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-2 md:mb-3">{benefit.title}</h3>
                  <p className="text-white/70 font-inter text-sm md:text-base">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Services from Shopify */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#0F172A] film-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-12 lg:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4 md:mb-6">
                Services <span className="gradient-text">Expert</span>
              </h2>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                Des services professionnels pour booster votre contenu et votre visibilité
              </p>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {expertServices.map((service, index) => {
                  const variant = service.variants.edges[0]?.node;
                  const price = variant ? parseFloat(variant.price.amount) : 0;
                  const image = service.images.edges[0]?.node;

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
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
                          onClick={async () => {
                            if (variant && variant.availableForSale) {
                              await addShopifyItem({
                                shopifyVariantId: variant.id,
                                productTitle: service.title,
                                variantTitle: variant.title,
                                price,
                                quantity: 1,
                                image: image?.url,
                                availableForSale: variant.availableForSale,
                              });
                            }
                          }}
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

        {/* Expert Categories - Keep for context */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-12 lg:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4 md:mb-6">
                Notre <span className="gradient-text">Réseau</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {expertCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="glass-effect border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 hover:border-white/20 transition-all duration-500 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    
                    <div className="relative">
                      <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${category.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>

                      <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                        {category.title}
                      </h3>
                      
                      <p className="text-white/70 font-inter mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                        {category.description}
                      </p>

                      <div className="space-y-2 md:space-y-3">
                        {category.experts.map((expert, expertIndex) => (
                          <div key={expertIndex} className="flex items-center text-white/80">
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-community mr-2 md:mr-3 flex-shrink-0" />
                            <span className="font-inter text-xs md:text-sm">{expert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-12 lg:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4 md:mb-6">
                Témoignages <span className="gradient-text">clients</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-effect border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8"
                >
                  <div className="flex mb-4 md:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-violet-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-white/80 font-inter mb-4 md:mb-6 leading-relaxed italic text-sm md:text-base">
                    "{testimonial.comment}"
                  </blockquote>

                  <div>
                    <div className="font-montserrat font-bold text-white text-base md:text-lg">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-4 md:mb-6">
                Besoin d'un expert ?
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-inter text-white/70 mb-6 md:mb-8 px-4">
                Contactez-nous pour être mis en relation avec le professionnel adapté à vos besoins
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-primary text-white font-montserrat font-semibold rounded-xl md:rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 glow-effect text-sm md:text-base"
              >
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Prendre rendez-vous
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />

      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-900/95 via-slate-900/95 to-green-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm truncate">
                    Besoin d'un expert ?
                  </div>
                  <div className="text-purple-300 text-xs font-medium">
                    Juridique · Marketing · Finance · Tech
                  </div>
                </div>

                <a
                  href="/contact"
                  className="shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600
                           rounded-xl text-white font-bold text-sm shadow-lg shadow-purple-500/30
                           active:scale-95 transition-transform"
                >
                  <span>Contacter</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:+33413252640"
                  className="shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl
                           active:scale-95 transition-transform"
                  aria-label="Appeler"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}