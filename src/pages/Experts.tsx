import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, ArrowRight, Sparkles, Award, Target, Zap, Heart, CheckCircle, Calendar } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

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
    description: "Plus de 50 experts sélectionnés pour leur excellence"
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
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0A0A0A] to-slate-900 film-grain">
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
                <Users className="w-4 h-4 text-community mr-2" />
                <span className="text-sm font-inter font-medium text-white/80 tracking-wide">RÉSEAU D'EXPERTS</span>
              </motion.div>

              <h1 className="text-hero font-montserrat font-black text-white mb-6">
                Réseau d'<span className="gradient-text">Experts</span>
              </h1>
              <p className="text-body-large font-inter text-white/70 max-w-4xl mx-auto">
                Accédez à notre communauté de professionnels qualifiés pour accompagner votre croissance et résoudre vos défis entrepreneuriaux
              </p>
            </motion.div>
          </div>
        </section>

        {/* Network Benefits */}
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
                Pourquoi notre <span className="bg-gradient-to-r from-community to-green-600 bg-clip-text text-transparent">réseau</span> ?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {networkBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-community to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/70 font-inter">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Categories */}
        <section className="py-20 bg-[#0A0A0A] film-grain">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-section-title font-montserrat font-black text-white mb-6">
                Nos <span className="gradient-text">Expertises</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <div className="glass-effect border border-white/10 rounded-4xl p-8 hover:border-white/20 transition-all duration-500 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    
                    <div className="relative">
                      <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                        {category.title}
                      </h3>
                      
                      <p className="text-white/70 font-inter mb-6 leading-relaxed">
                        {category.description}
                      </p>

                      <div className="space-y-3">
                        {category.experts.map((expert, expertIndex) => (
                          <div key={expertIndex} className="flex items-center text-white/80">
                            <CheckCircle className="w-4 h-4 text-community mr-3 flex-shrink-0" />
                            <span className="font-inter text-sm">{expert}</span>
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
                Témoignages <span className="gradient-text">clients</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-effect border border-white/10 rounded-4xl p-8"
                >
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-violet-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-white/80 font-inter mb-6 leading-relaxed italic">
                    "{testimonial.comment}"
                  </blockquote>

                  <div>
                    <div className="font-montserrat font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-montserrat font-black text-white mb-6">
                Besoin d'un expert ?
              </h2>
              <p className="text-xl font-inter text-white/70 mb-8">
                Contactez-nous pour être mis en relation avec le professionnel adapté à vos besoins
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-montserrat font-semibold rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 glow-effect"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
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