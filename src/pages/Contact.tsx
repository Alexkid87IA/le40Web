import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock, Send, Check,
  User, Building, MessageSquare, Calendar,
  ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeField, setActiveField] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            service: formData.service,
            message: formData.message,
            status: 'nouveau'
          }
        ]);

      if (insertError) throw insertError;

      setIsSubmitted(true);

      // Reset après 4 secondes
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      }, 4000);
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
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
      content: ["40 Avenue de Saint Antoine", "13015 Marseille, France"],
      action: "Voir sur Google Maps",
      link: "https://maps.google.com/?q=40+Avenue+de+Saint+Antoine+13015+Marseille",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: ["+33 4 91 XX XX XX"],
      action: "Appeler maintenant",
      link: "tel:+33491XXXXXX",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: ["contact@le40-marseille.fr"],
      action: "Envoyer un email",
      link: "mailto:contact@le40-marseille.fr",
      gradient: "from-sky-500 to-blue-500"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: ["Lun - Ven : 8h00 - 20h00", "Sam : 9h00 - 17h00", "Dim : Fermé"],
      action: "Réserver une visite",
      link: "/reserver-visite",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background animé */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-cyan-900/20" />

            {/* Grille animée */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '60px 60px']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Orbes lumineux */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${
                    ['#3b82f6', '#06b6d4', '#0ea5e9', '#2563eb'][i]
                  }40 0%, transparent 70%)`,
                  width: `${300 + i * 50}px`,
                  height: `${300 + i * 50}px`,
                  left: `${10 + i * 25}%`,
                  top: `${-20 + i * 15}%`,
                }}
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Contenu */}
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Nous sommes là pour vous</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
                <span className="text-white">Contactez</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  Le 40
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto">
                Une question, un projet ? Notre équipe vous répond sous 24h
              </p>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-blue-400/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [2, 8, 2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-blue-400/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Section principale */}
        <section className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Formulaire */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-lg text-white/60">
                    Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom et Prénom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Prénom *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          onFocus={() => setActiveField('firstName')}
                          onBlur={() => setActiveField('')}
                          className="w-full px-5 py-3.5 pl-12 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 outline-none"
                          placeholder="Votre prénom"
                        />
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          activeField === 'firstName' ? 'text-blue-400' : 'text-white/30'
                        }`} />
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Nom *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          onFocus={() => setActiveField('lastName')}
                          onBlur={() => setActiveField('')}
                          className="w-full px-5 py-3.5 pl-12 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 outline-none"
                          placeholder="Votre nom"
                        />
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          activeField === 'lastName' ? 'text-blue-400' : 'text-white/30'
                        }`} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setActiveField('email')}
                          onBlur={() => setActiveField('')}
                          className="w-full px-5 py-3.5 pl-12 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 outline-none"
                          placeholder="votre@email.fr"
                        />
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          activeField === 'email' ? 'text-blue-400' : 'text-white/30'
                        }`} />
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Téléphone
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setActiveField('phone')}
                          onBlur={() => setActiveField('')}
                          className="w-full px-5 py-3.5 pl-12 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 outline-none"
                          placeholder="06 12 34 56 78"
                        />
                        <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          activeField === 'phone' ? 'text-blue-400' : 'text-white/30'
                        }`} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Entreprise et Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Entreprise
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => setActiveField('company')}
                          onBlur={() => setActiveField('')}
                          className="w-full px-5 py-3.5 pl-12 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 outline-none"
                          placeholder="Nom de votre entreprise"
                        />
                        <Building className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          activeField === 'company' ? 'text-blue-400' : 'text-white/30'
                        }`} />
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Service d'intérêt *
                      </label>
                      <div className="relative">
                        <select
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          onFocus={() => setActiveField('service')}
                          onBlur={() => setActiveField('')}
                          className="w-full px-5 py-3.5 pl-12 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:border-blue-500 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer outline-none"
                        >
                          <option value="" className="bg-gray-900">Sélectionnez un service</option>
                          <option value="bureaux" className="bg-gray-900">Bureaux privés</option>
                          <option value="coworking" className="bg-gray-900">Espace coworking</option>
                          <option value="domiciliation" className="bg-gray-900">Domiciliation</option>
                          <option value="salles" className="bg-gray-900">Salles de réunion</option>
                          <option value="studios" className="bg-gray-900">Studio de production</option>
                          <option value="events" className="bg-gray-900">Organisation d'événements</option>
                          <option value="visite" className="bg-gray-900">Visite des locaux</option>
                          <option value="autre" className="bg-gray-900">Autre demande</option>
                        </select>
                        <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 pointer-events-none ${
                          activeField === 'service' ? 'text-blue-400' : 'text-white/30'
                        }`} />
                        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-white/30 pointer-events-none" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div whileHover={{ y: -2 }} className="relative">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Votre message *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setActiveField('message')}
                        onBlur={() => setActiveField('')}
                        className="w-full px-5 py-4 pl-12 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 resize-none outline-none"
                        placeholder="Décrivez votre projet ou votre demande..."
                      />
                      <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${
                        activeField === 'message' ? 'text-blue-400' : 'text-white/30'
                      }`} />
                    </div>
                  </motion.div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                    className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 p-[2px] group"
                  >
                    <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl px-8 py-5 flex items-center justify-center gap-3">
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="submitting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span className="text-white font-semibold text-lg">Envoi en cours...</span>
                          </motion.div>
                        ) : isSubmitted ? (
                          <motion.div
                            key="submitted"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle2 className="w-6 h-6 text-white" />
                            <span className="text-white font-semibold text-lg">Message envoyé avec succès !</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="default"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <Send className="w-5 h-5 text-white" />
                            <span className="text-white font-semibold text-lg">Envoyer le message</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    </div>
                  </motion.button>
                </form>
              </motion.div>

              {/* Informations de contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="mb-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Nos coordonnées
                  </h2>
                  <p className="text-lg text-white/60">
                    Retrouvez toutes les informations pour nous contacter
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-5">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
                        <div className="flex items-start gap-5">
                          <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <info.icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                            {info.content.map((line, i) => (
                              <p key={i} className="text-white/70 mb-1">{line}</p>
                            ))}
                            <a
                              href={info.link}
                              target={info.link.startsWith('http') ? '_blank' : undefined}
                              rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mt-3 group/link"
                            >
                              {info.action}
                              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <a
                    href="https://maps.google.com/?q=40+Avenue+de+Saint+Antoine+13015+Marseille"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-cyan-900/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/5.3698,43.3620,13,0/600x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw')] bg-cover bg-center opacity-40" />
                      <div className="relative text-center z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-white font-semibold mb-1">Le 40 - Marseille</p>
                        <p className="text-white/60 text-sm">Cliquez pour ouvrir dans Google Maps</p>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-cyan-600/20"
                        animate={{
                          x: [-200, 200],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    </div>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 px-6 bg-gradient-to-b from-black to-blue-950/10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Questions fréquentes
              </h2>
              <p className="text-lg text-white/60">
                Trouvez rapidement les réponses à vos questions
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "Quels sont vos délais de réponse ?",
                  a: "Nous nous engageons à répondre à toutes les demandes sous 24h ouvrées. Pour les demandes urgentes, n'hésitez pas à nous appeler directement."
                },
                {
                  q: "Puis-je visiter les locaux avant de m'engager ?",
                  a: "Absolument ! Nous proposons des visites guidées gratuites sur rendez-vous. Vous pouvez réserver directement en ligne ou nous contacter par téléphone."
                },
                {
                  q: "Proposez-vous des tarifs dégressifs ?",
                  a: "Oui, nous proposons des tarifs avantageux pour les engagements longue durée et les formules groupées. Contactez-nous pour obtenir un devis personnalisé."
                },
                {
                  q: "Comment se déroule le processus d'inscription ?",
                  a: "Après votre demande, nous vous contactons pour un échange téléphonique, suivi d'une visite des locaux si vous le souhaitez. Ensuite, nous établissons votre contrat et vous pouvez commencer dès le lendemain !"
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                      <p className="text-white/70 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-black to-cyan-900/20" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à rejoindre l'aventure ?
            </h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Découvrez nos espaces de travail modernes et rejoignez une communauté d'entrepreneurs passionnés
            </p>
            <motion.a
              href="/reserver-visite"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Planifier une visite
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
