import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Building2, Users, TrendingUp, Check, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function BureauHeroSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      window.location.href = '/contact';
    }, 1500);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Bureaux privés Le 40 Marseille"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-32">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-inter text-sm font-bold">Bureaux Disponibles</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-300 font-inter text-xs font-bold">Seulement 3 bureaux restants</span>
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
              >
                BUREAUX
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  PRIVATIFS
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl font-inter font-light text-white/70 mb-8 max-w-2xl"
              >
                Louez votre bureau privé sécurisé et entièrement équipé de 15m² à 100m². <span className="text-white font-semibold">Tout inclus</span> : fibre, mobilier, ménage, salles de réunion.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-4 mb-10"
              >
                {[
                  { icon: Building2, text: '15-100m² selon la taille de votre équipe', highlight: '2 à 20 personnes' },
                  { icon: MapPin, text: 'Adresse professionnelle 40 avenue de Saint Antoine', highlight: 'Marseille 15e' },
                  { icon: Shield, text: 'Accès sécurisé 24/7', highlight: 'Sans contraintes' },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.08, duration: 0.6 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-inter text-base font-medium leading-snug">
                        {benefit.text}
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <span className="text-emerald-400 font-inter text-xs font-bold">{benefit.highlight}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/contact" className="group relative inline-block flex-1">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-black rounded-2xl px-8 py-4 border border-emerald-500/50 flex items-center justify-center gap-3"
                  >
                    <span className="font-montserrat font-semibold text-white">
                      Réserver une visite
                    </span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>

                <Link to="#pricing" className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <span className="font-montserrat font-semibold text-white block text-center">
                      Voir les tarifs
                    </span>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-wrap items-center gap-6 pt-6"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/70 font-inter text-sm">
                    <span className="text-emerald-400 font-bold">127 entreprises</span> hébergées
                  </span>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white/70 font-inter text-sm">
                    <span className="text-white font-bold">4.9/5</span> sur Google
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <div className="lg:block">
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="space-y-5"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                      Réservez Votre <span className="text-emerald-400">Visite Gratuite</span>
                    </h3>
                    <p className="text-white/60 font-inter text-sm">
                      Remplissez le formulaire pour être contacté sous 2h
                    </p>
                  </div>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Votre nom complet"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email professionnel"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Téléphone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Nom de votre société"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-montserrat font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Réserver ma visite gratuite</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                      <div className="flex items-center gap-2 text-xs text-white/50 justify-center">
                        <Shield className="w-3 h-3" />
                        <span>Vos données sont protégées et confidentielles</span>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-400" />
                      </div>
                      <h4 className="text-xl font-montserrat font-bold text-white mb-2">Merci !</h4>
                      <p className="text-white/60 font-inter">
                        Nous vous contactons sous 2h
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <Building2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    <p className="text-4xl font-montserrat font-black text-white mb-1">699€</p>
                    <p className="text-white/60 font-inter text-sm">Dès /mois</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <Users className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    <p className="text-4xl font-montserrat font-black text-white mb-1">24/7</p>
                    <p className="text-white/60 font-inter text-sm">Accès libre</p>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl"
                >
                  <div className="flex items-center gap-1.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                    ))}
                    <span className="ml-2 text-white/90 font-inter text-sm font-bold">5.0</span>
                  </div>
                  <p className="text-white/95 font-inter text-sm leading-relaxed mb-4">
                    "Le bureau privé nous offre la <span className="font-bold text-emerald-400">confidentialité nécessaire</span> tout en profitant de l'écosystème du Le 40."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500"></div>
                    <div>
                      <p className="text-white font-inter text-sm font-bold">Marie L.</p>
                      <p className="text-white/60 font-inter text-xs">CEO @ TechFlow</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[5] pointer-events-none"></div>
    </section>
  );
}
