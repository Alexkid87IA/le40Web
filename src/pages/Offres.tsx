import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Building2, Users, Video, MapPin } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { pricingData } from '../data/mockData';

const offerCategories = [
  {
    id: 'domiciliation',
    title: 'Domiciliation',
    icon: MapPin,
    description: 'Adresse prestigieuse pour votre entreprise',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'coworking',
    title: 'Coworking',
    icon: Users,
    description: 'Espaces de travail flexibles et modernes',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'studio',
    title: 'Studio',
    icon: Video,
    description: 'Production vidéo et podcast professionnelle',
    color: 'from-red-400 to-red-600'
  }
];

const faqData = [
  {
    question: "Puis-je changer de formule en cours d'abonnement ?",
    answer: "Oui, vous pouvez upgrader ou downgrader votre formule à tout moment. Les changements prennent effet le mois suivant."
  },
  {
    question: "Y a-t-il un engagement minimum ?",
    answer: "Aucun engagement pour les formules coworking. 3 mois minimum pour la domiciliation pour des raisons administratives."
  },
  {
    question: "Les tarifs incluent-ils la TVA ?",
    answer: "Tous nos tarifs sont affichés HT. La TVA de 20% s'applique selon votre statut fiscal."
  }
];

export default function Offres() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0A0A0A] to-slate-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
                Toutes nos <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Offres</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Découvrez l'ensemble de nos services et trouvez la formule qui correspond parfaitement à vos besoins
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Overview */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {offerCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-center text-orange-400 font-medium">
                      <span>Voir les formules</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Pricing Plans */}
        {Object.entries(pricingData).map(([categoryKey, plans], categoryIndex) => (
          <section key={categoryKey} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 capitalize">
                  Formules <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">{categoryKey}</span>
                </h2>
              </motion.div>

              <div className={`grid gap-8 ${
                categoryKey === 'domiciliation' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                          {plan.title}
                        </h3>
                        <div className="text-3xl font-bold text-orange-400 mb-2">
                          {plan.price}
                        </div>
                        <p className="text-gray-300 text-sm">
                          {plan.description}
                        </p>
                      </div>

                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start text-gray-300">
                            <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                      >
                        Choisir cette formule
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* FAQ Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                Questions <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Fréquentes</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                Prêt à nous rejoindre ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Réservez votre visite gratuite et découvrez l'espace qui transformera votre façon de travailler
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Réserver ma visite
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}