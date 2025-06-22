import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Calendar, Linkedin, Twitter, Instagram, Facebook, Youtube, ArrowRight, Heart, Star, Users, Award, Sparkles, Zap, Crown, Globe, ChevronRight } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Coworking Premium', href: '/coworking', badge: 'Hot' },
    { name: 'Domiciliation', href: '/domiciliation' },
    { name: 'Salles de Réunion', href: '/salles', badge: 'New' },
    { name: 'Studios Créatifs', href: '/studios' },
    { name: 'Cercle Privé', href: '/community', badge: 'VIP' }
  ],
  company: [
    { name: 'Notre Histoire', href: '/about' },
    { name: 'Blog & Actualités', href: '/blog' },
    { name: 'Événements', href: '/events' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Presse', href: '/press' }
  ],
  support: [
    { name: 'Centre d\'aide', href: '/help' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Tarifs', href: '/pricing' }
  ]
};

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#', gradient: 'from-blue-600 to-blue-400' },
  { name: 'Instagram', icon: Instagram, href: '#', gradient: 'from-purple-600 to-pink-600' },
  { name: 'Twitter', icon: Twitter, href: '#', gradient: 'from-sky-600 to-sky-400' },
  { name: 'Facebook', icon: Facebook, href: '#', gradient: 'from-blue-700 to-blue-500' },
  { name: 'Youtube', icon: Youtube, href: '#', gradient: 'from-red-600 to-red-400' }
];

const footerStats = [
  { number: "2500", suffix: "m²", label: "d'espaces", icon: Crown, color: 'from-violet-600 to-purple-600' },
  { number: "150", suffix: "+", label: "entreprises", icon: Users, color: 'from-emerald-600 to-teal-600' },
  { number: "4.9", suffix: "★", label: "satisfaction", icon: Star, color: 'from-amber-600 to-yellow-600' },
  { number: "24", suffix: "/7", label: "accès", icon: Zap, color: 'from-blue-600 to-cyan-600' }
];

// Composant pour les particules flottantes
const FloatingParticle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/30 rounded-full"
      initial={{
        x: Math.random() * 100 + '%',
        y: '100%',
      }}
      animate={{
        y: '-10%',
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    />
  );
};

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden lg:ml-60">
      {/* Background avec gradient mesh animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        
        {/* Gradient orbs animés */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Grid pattern subtil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Section principale */}
        <div className="max-w-7xl mx-auto px-8 pt-24 pb-16">
          {/* Header avec logo et stats */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Logo Le 40 */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8 relative inline-block"
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-pink-600/40 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <img
                  src="https://res.cloudinary.com/diqco2njt/image/upload/v1750536822/0afc7668-eadb-4d3e-a56c-b66bc5e92653_xh1ie5.png"
                  alt="Le 40 - République Marseille"
                  className="relative h-24 w-auto mx-auto"
                  style={{
                    filter: 'drop-shadow(0 10px 40px rgba(147, 51, 234, 0.3))'
                  }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed"
              >
                L'écosystème premium qui propulse votre vision entrepreneuriale
                au cœur de la cité phocéenne
              </motion.p>
            </motion.div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {footerStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden hover:border-white/20 transition-all duration-500">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    {/* Number */}
                    <div className="text-3xl font-black text-white mb-1">
                      {stat.number}
                      <span className="text-2xl">{stat.suffix}</span>
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm text-white/60">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Links sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            {/* Contact section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <Globe className="w-5 h-5 text-purple-400 mr-2" />
                Nous trouver
              </h4>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: MapPin, 
                    text: '40 Rue de la République\n13001 Marseille, France',
                    link: 'https://maps.google.com',
                    gradient: 'from-red-500 to-orange-500'
                  },
                  { 
                    icon: Phone, 
                    text: '+33 4 91 XX XX XX',
                    link: 'tel:+33491000000',
                    gradient: 'from-green-500 to-emerald-500'
                  },
                  { 
                    icon: Mail, 
                    text: 'hello@le40-marseille.fr',
                    link: 'mailto:hello@le40-marseille.fr',
                    gradient: 'from-blue-500 to-cyan-500'
                  }
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 group"
                  >
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${contact.gradient} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <contact.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/70 group-hover:text-white transition-colors whitespace-pre-line text-sm">
                      {contact.text}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-8">
                <h5 className="text-sm font-semibold text-white/60 mb-4">Suivez-nous</h5>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="group relative"
                    >
                      <div className="relative w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center overflow-hidden group-hover:border-white/30 transition-all duration-300">
                        <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                        <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-bold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center justify-between text-white/70 hover:text-white transition-colors group"
                    >
                      <span className="text-sm group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                      {link.badge && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          link.badge === 'Hot' ? 'bg-red-500/20 text-red-400' :
                          link.badge === 'New' ? 'bg-green-500/20 text-green-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-bold text-white mb-6">Entreprise</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm group flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-lg font-bold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm group flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl border border-white/10 p-12">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>

              <div className="relative text-center max-w-3xl mx-auto">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity }
                  }}
                  className="inline-block mb-6"
                >
                  <Sparkles className="w-12 h-12 text-purple-400" />
                </motion.div>

                <h3 className="text-3xl font-black text-white mb-4">
                  Restez à la pointe de l'innovation
                </h3>
                <p className="text-white/70 mb-8 text-lg">
                  Insights exclusifs, invitations VIP et opportunités business directement dans votre boîte mail
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="votre@email.pro"
                    className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    S'inscrire
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                <p className="text-xs text-white/40 mt-4">
                  En vous inscrivant, vous acceptez notre politique de confidentialité
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold rounded-full text-lg group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors">
                Réserver une visite guidée
              </span>
              <Calendar className="w-5 h-5 relative z-10 group-hover:text-white transition-colors" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white/40 text-sm text-center md:text-left">
                © 2024 Le 40 République Marseille. Tous droits réservés. 
                <span className="inline-flex items-center ml-2">
                  Crafted with <Heart className="w-4 h-4 text-red-500 mx-1" /> in Marseille
                </span>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <a href="/privacy" className="text-white/40 hover:text-white transition-colors">
                  Confidentialité
                </a>
                <a href="/terms" className="text-white/40 hover:text-white transition-colors">
                  CGU
                </a>
                <a href="/cookies" className="text-white/40 hover:text-white transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </footer>
  );
}