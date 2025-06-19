import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, ArrowRight, Sparkles, Send, CheckCircle, Star, MessageCircle, Headphones, Shield } from 'lucide-react';

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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "40 Rue de la République\n13001 Marseille",
      color: "from-domiciliation to-orange-600"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+33 4 91 23 45 67",
      color: "from-community to-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@le40.fr",
      color: "from-blog to-teal-600"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun - Ven : 8h00 - 20h00\nSam - Dim : 9h00 - 18h00",
      color: "from-violet-400 to-fuchsia-400"
    }
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: "Réserver une visite",
      description: "Découvrez nos espaces premium",
      color: "from-violet-400 to-fuchsia-400",
      cta: "Planifier maintenant"
    },
    {
      icon: MessageCircle,
      title: "Chat en direct",
      description: "Support instantané disponible",
      color: "from-community to-green-600",
      cta: "Démarrer le chat"
    },
    {
      icon: Headphones,
      title: "Support téléphonique",
      description: "Équipe dédiée 7j/7",
      color: "from-blog to-teal-600",
      cta: "Appeler maintenant"
    }
  ];

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-black-deep via-black-nuanced to-black-deep relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-contact" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-contact)" />
        </svg>
      </div>

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain"></div>

      <div className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge "Acte 7" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-fuchsia-400"></div>
                <span className="text-sm font-inter font-medium text-fuchsia-400 tracking-[0.3em] uppercase">ACTE 7</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-fuchsia-400 to-transparent"></div>
              </div>
            </motion.div>

            {/* Titre principal avec animation mot par mot */}
            <div className="mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-hero font-montserrat font-black text-white leading-none tracking-tight"
              >
                {['CONTACTEZ', 'NOUS'].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                    className={`inline-block mr-6 ${word === 'NOUS' ? 'gradient-text' : ''}`}
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-body-large font-inter text-white/70 max-w-4xl mx-auto leading-relaxed"
            >
              Des éclats de connexion pour transformer votre vision en réalité partagée
            </motion.p>
          </motion.div>

          {/* Quick Actions Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="glass-effect border border-white/10 rounded-4xl p-8 hover:border-white/20 transition-all duration-500 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-montserrat font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                      {action.title}
                    </h3>
                    <p className="text-white/70 font-inter mb-6 leading-relaxed">
                      {action.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-gradient-to-r ${action.color} text-white font-montserrat font-semibold py-3 rounded-2xl hover:shadow-lg transition-all duration-500 flex items-center justify-center relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                      <div className="relative flex items-center">
                        <span className="tracking-wide">{action.cta}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form avec design "Fragments" */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-500 relative">
                {/* Background Image avec Ken Burns */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Contact"
                    className="w-full h-full object-cover ken-burns opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-deep/95 via-black-nuanced/80 to-black-deep/90"></div>
                </div>

                <div className="relative z-10 p-10">
                  <h3 className="text-3xl font-montserrat font-bold text-white mb-8">
                    Réservez votre <span className="gradient-text">visite</span>
                  </h3>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <CheckCircle className="w-20 h-20 text-community mx-auto mb-6" />
                      <h4 className="text-2xl font-montserrat font-bold text-white mb-4">
                        Message envoyé !
                      </h4>
                      <p className="text-white/70 font-inter">
                        Nous vous recontacterons dans les plus brefs délais.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-inter font-medium text-white/80 mb-3">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-6 py-4 glass-effect border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 font-inter"
                            placeholder="Votre prénom"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-inter font-medium text-white/80 mb-3">
                            Nom *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-6 py-4 glass-effect border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 font-inter"
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-inter font-medium text-white/80 mb-3">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-6 py-4 glass-effect border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 font-inter"
                            placeholder="votre@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-inter font-medium text-white/80 mb-3">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-6 py-4 glass-effect border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 font-inter"
                            placeholder="+33 4 91 23 45 67"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="service" className="block text-sm font-inter font-medium text-white/80 mb-3">
                            Service d'intérêt *
                          </label>
                          <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-6 py-4 glass-effect border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 font-inter"
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
                          <label htmlFor="preferredDate" className="block text-sm font-inter font-medium text-white/80 mb-3">
                            Date souhaitée
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full px-6 py-4 glass-effect border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 font-inter"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-inter font-medium text-white/80 mb-3">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-6 py-4 glass-effect border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 resize-none font-inter"
                          placeholder="Décrivez votre projet ou posez vos questions..."
                        ></textarea>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group w-full bg-gradient-primary text-white font-montserrat font-semibold py-5 rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 flex items-center justify-center relative overflow-hidden glow-effect"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative flex items-center">
                          <Send className="w-6 h-6 mr-3" />
                          <span className="tracking-wide text-lg">Envoyer le message</span>
                        </div>
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Info avec design "Fragments" */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-montserrat font-bold text-white mb-8">
                  Nous <span className="gradient-text">trouver</span>
                </h3>
                
                {/* Map Placeholder avec design "Fragments" */}
                <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-500 relative mb-8">
                  <div className="absolute inset-0">
                    <img
                      src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Localisation"
                      className="w-full h-full object-cover ken-burns opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-deep/90 via-black-nuanced/60 to-black-deep/80"></div>
                  </div>
                  
                  <div className="relative z-10 aspect-video flex items-center justify-center p-8">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-fuchsia-400 mx-auto mb-6" />
                      <h4 className="text-2xl font-montserrat font-bold text-white mb-4">
                        Carte interactive
                      </h4>
                      <p className="text-white/70 font-inter text-lg">
                        40 Rue de la République, 13001 Marseille
                      </p>
                      <p className="text-sm text-white/50 mt-4 font-inter">
                        TODO: Intégrer Google Maps ou Mapbox
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="glass-effect border border-white/10 rounded-4xl p-6 hover:border-white/20 transition-all duration-500 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                      
                      <div className="relative">
                        <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-montserrat font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                          {info.title}
                        </h4>
                        <p className="text-white/70 font-inter text-sm whitespace-pre-line leading-relaxed">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <motion.a
                  href="tel:+33491234567"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full bg-gradient-to-r from-community to-green-600 text-white font-montserrat font-semibold py-4 rounded-2xl hover:shadow-lg transition-all duration-500 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    <span className="tracking-wide">Appeler maintenant</span>
                  </div>
                </motion.a>
                
                <motion.a
                  href="mailto:contact@le40.fr"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full glass-effect text-white font-montserrat font-semibold py-4 rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-500 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-primary opacity-5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center">
                    <Mail className="w-5 h-5 mr-3" />
                    <span className="tracking-wide">Envoyer un email</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-20"
          >
            <div className="glass-effect border border-white/10 rounded-4xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
              <div className="relative">
                <Sparkles className="w-12 h-12 text-fuchsia-400 mx-auto mb-6" />
                <h3 className="text-3xl font-montserrat font-bold text-white mb-6">
                  Prêt à nous rejoindre ?
                </h3>
                <p className="text-white/70 font-inter mb-8 max-w-3xl mx-auto leading-relaxed text-lg">
                  Découvrez l'espace qui transformera votre façon de travailler et rejoignez notre communauté d'entrepreneurs visionnaires.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center px-10 py-5 bg-gradient-primary text-white font-montserrat font-semibold text-lg rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 relative overflow-hidden glow-effect"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="relative flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      <span className="tracking-wide">Réserver ma visite gratuite</span>
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="/offres"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center px-10 py-5 glass-effect text-white font-montserrat font-semibold text-lg rounded-2xl border border-fuchsia-400/30 hover:bg-fuchsia-400/10 hover:border-fuchsia-400 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="relative flex items-center">
                      <span className="tracking-wide">Découvrir nos offres</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}