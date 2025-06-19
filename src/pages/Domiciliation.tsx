import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check, ArrowRight, Star, FileText, Mail, Phone, Shield } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { pricingData } from '../data/mockData';

const processSteps = [
  {
    step: 1,
    title: "Choisissez votre formule",
    description: "Sélectionnez l'offre qui correspond à vos besoins",
    icon: FileText
  },
  {
    step: 2,
    title: "Envoyez vos documents",
    description: "Transmettez-nous vos pièces justificatives",
    icon: Mail
  },
  {
    step: 3,
    title: "Activation immédiate",
    description: "Votre adresse est active sous 24h",
    icon: Shield
  }
];

const domiciliationBenefits = [
  {
    icon: MapPin,
    title: "Adresse Prestigieuse",
    description: "40 Rue de la République, 75001 Paris - Une adresse qui inspire confiance"
  },
  {
    icon: Mail,
    title: "Gestion du Courrier",
    description: "Réception, tri et réexpédition de votre courrier professionnel"
  },
  {
    icon: Phone,
    title: "Accueil Téléphonique",
    description: "Service de secrétariat et prise de messages (formules Premium et Pro)"
  },
  {
    icon: Shield,
    title: "Conformité Légale",
    description: "Respect de toutes les obligations légales et administratives"
  }
];

export default function Domiciliation() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0F172A] to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Domiciliation</span> d'Entreprise
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Une adresse prestigieuse au cœur de Paris pour donner une image professionnelle à votre entreprise
              </p>
              
              <div className="mt-8 inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <MapPin className="w-5 h-5 text-orange-400 mr-2" />
                <span className="text-white font-medium">40 Rue de la République, 75001 Paris</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Pourquoi choisir notre <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">domiciliation</span> ?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {domiciliationBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Nos <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Formules</span>
              </h2>
              <p className="text-xl text-gray-300">
                Choisissez la formule qui correspond à vos besoins
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingData.domiciliation.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group ${plan.title.toLowerCase().includes('premium') ? 'lg:scale-105 lg:-mt-4' : ''}`}
                >
                  {plan.title.toLowerCase().includes('premium') && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </div>
                  )}

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full relative">
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
                      className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                        plan.title.toLowerCase().includes('premium')
                          ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30'
                      }`}
                    >
                      Choisir cette formule
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Comment ça <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">fonctionne</span> ?
              </h2>
              <p className="text-xl text-gray-300">
                Un processus simple et rapide en 3 étapes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transform translate-x-1/2"></div>
                  )}
                  
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <div className="text-orange-400 font-bold text-sm mb-2">ÉTAPE {step.step}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Prêt à domicilier votre entreprise ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Obtenez votre adresse prestigieuse dès aujourd'hui et donnez une image professionnelle à votre entreprise
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
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