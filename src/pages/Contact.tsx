import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, ArrowRight, Send, CheckCircle } from 'lucide-react';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "40 Rue de la République\n75001 Paris",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "+33 1 23 45 67 89",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@le40.fr",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun - Ven : 8h00 - 20h00\nSam - Dim : 9h00 - 18h00",
    color: "from-orange-400 to-orange-600"
  }
];

const faqItems = [
  {
    question: "Comment réserver une visite ?",
    answer: "Vous pouvez réserver directement via notre formulaire ou nous appeler. Les visites sont gratuites et sans engagement."
  },
  {
    question: "Puis-je tester l'espace avant de m'engager ?",
    answer: "Oui ! Nous proposons une journée d'essai gratuite pour tous nos espaces de coworking."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les virements bancaires, cartes bancaires et prélèvements automatiques."
  },
  {
    question: "Y a-t-il un parking disponible ?",
    answer: "Oui, nous avons un parking partenaire à 2 minutes à pied avec tarifs préférentiels pour nos membres."
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredDate: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Contactez</span>-nous
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Prêt à rejoindre notre communauté ? Réservez votre visite ou contactez-nous pour plus d'informations
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                      {info.title}
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                      {info.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  Réservez votre <span className="text-orange-400">visite</span>
                </h2>
                
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Message envoyé !
                      </h3>
                      <p className="text-gray-300">
                        Nous vous recontacterons dans les plus brefs délais.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                            placeholder="Votre prénom"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                            Nom *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                            placeholder="votre@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                            placeholder="+33 1 23 45 67 89"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                            Service d'intérêt *
                          </label>
                          <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                          >
                            <option value="">Sélectionnez un service</option>
                            <option value="coworking">Coworking</option>
                            <option value="domiciliation">Domiciliation</option>
                            <option value="salles">Salles de réunion</option>
                            <option value="studios">Studios de production</option>
                            <option value="visite">Visite des lieux</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-300 mb-2">
                            Date souhaitée
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="Décrivez votre projet ou posez vos questions..."
                        ></textarea>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Map & Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Nous <span className="text-orange-400">trouver</span>
                  </h2>
                  
                  {/* Map Placeholder */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8">
                    <div className="aspect-video bg-gray-800 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                          Carte interactive
                        </h3>
                        <p className="text-gray-300">
                          40 Rue de la République, 75001 Paris
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          TODO: Intégrer Google Maps ou Mapbox
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <motion.a
                    href="tel:+33123456789"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Appeler maintenant
                  </motion.a>
                  
                  <motion.a
                    href="mailto:contact@le40.fr"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Envoyer un email
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Calendly (à intégrer)
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Questions <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Fréquentes</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {faqItems.map((faq, index) => (
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
                Prêt à nous rejoindre ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Découvrez l'espace qui transformera votre façon de travailler
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Réserver ma visite gratuite
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