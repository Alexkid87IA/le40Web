import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 3000);
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
      content: "40 Avenue de Saint Antoine",
      subcontent: "13015 Marseille",
      gradient: "from-orange-500 via-amber-500 to-yellow-500"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+33 4 91 23 45 67",
      subcontent: "Disponible 7j/7",
      gradient: "from-orange-500 via-amber-500 to-yellow-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@le40.fr",
      subcontent: "Réponse sous 24h",
      gradient: "from-orange-500 via-amber-500 to-yellow-500"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun - Ven : 8h - 20h",
      subcontent: "Sam - Dim : 9h - 18h",
      gradient: "from-orange-500 via-amber-500 to-yellow-500"
    }
  ];

  const services = [
    "Coworking",
    "Bureaux Privés",
    "Salles de Réunion",
    "Studios Audio/Vidéo",
    "Domiciliation",
    "Événements",
    "Autre"
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/10">
              <h3 className="text-3xl font-black text-white mb-8">
                Envoyez-nous un Message
              </h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-6"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h4 className="text-2xl font-black text-white mb-4">
                      Message Envoyé !
                    </h4>
                    <p className="text-white/60 text-lg">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-3">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all"
                          placeholder="Votre prénom"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-3">
                          Nom *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-3">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all"
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-3">
                        Service d'intérêt *
                      </label>
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                      >
                        <option value="">Sélectionnez un service</option>
                        {services.map((service) => (
                          <option key={service} value={service.toLowerCase()}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-3">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all resize-none"
                        placeholder="Parlez-nous de votre projet..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full py-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-black text-lg shadow-2xl relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="relative flex items-center justify-center gap-3">
                        <Send className="w-6 h-6" />
                        <span>Envoyer le Message</span>
                      </div>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/10 mb-6">
              <h3 className="text-3xl font-black text-white mb-8">
                Nos Coordonnées
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-5"
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">
                          {info.title}
                        </h4>
                        <p className="text-white/80 text-base mb-1">
                          {info.content}
                        </p>
                        <p className="text-white/70 text-sm">
                          {info.subcontent}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.a
                href="tel:+33491234567"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-bold text-center shadow-xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <div className="relative flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>Appeler</span>
                </div>
              </motion.a>

              <motion.a
                href="mailto:contact@le40.fr"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-5 rounded-2xl bg-white/10 backdrop-blur-xl text-white font-bold text-center border border-white/20 hover:bg-white/20 transition-all overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <div className="relative flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
