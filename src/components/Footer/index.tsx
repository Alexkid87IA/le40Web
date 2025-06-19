import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Phone, Mail, Calendar, Linkedin, Twitter, Instagram, ExternalLink, Sparkles, ArrowRight, Heart, Star, Users, Award } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Coworking', href: '/coworking' },
    { name: 'Domiciliation', href: '/domiciliation' },
    { name: 'Salles de réunion', href: '/salles' },
    { name: 'Studios', href: '/studios' },
    { name: 'Réseau d\'experts', href: '/experts' },
    { name: 'Services+', href: '/services-plus' }
  ],
  company: [
    { name: 'À propos', href: '#about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Événements', href: '/events' },
    { name: 'Communauté', href: '/community' },
    { name: 'Offres', href: '/offres' }
  ],
  legal: [
    { name: 'Mentions légales', href: '#legal' },
    { name: 'CGU', href: '#terms' },
    { name: 'RGPD', href: '#privacy' },
    { name: 'Cookies', href: '#cookies' }
  ]
};

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-400' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-300' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-fuchsia-400' }
];

const footerStats = [
  { number: "200+", label: "Entrepreneurs", icon: Users },
  { number: "4.9★", label: "Satisfaction", icon: Star },
  { number: "24/7", label: "Accès", icon: Calendar },
  { number: "Premium", label: "Qualité", icon: Award }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black-deep via-black-nuanced to-black-deep border-t border-white/10 lg:ml-60 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-footer" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-footer)" />
        </svg>
      </div>

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="py-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge Final */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-fuchsia-400"></div>
                <span className="text-sm font-inter font-medium text-fuchsia-400 tracking-[0.3em] uppercase">ÉPILOGUE</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-fuchsia-400 to-transparent"></div>
              </div>
            </motion.div>

            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center glow-effect">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-4xl font-montserrat font-black text-white">Le 40</h3>
                <p className="text-sm font-inter text-white/60 tracking-wide flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  COWORKING PREMIUM MARSEILLE
                </p>
              </div>
            </div>
            
            <p className="text-body-large font-inter text-white/70 max-w-4xl mx-auto leading-relaxed">
              L'espace premium qui transforme votre vision entrepreneuriale en réalité partagée, 
              au cœur de la cité phocéenne.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {footerStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="glass-effect border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-500 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  <div className="relative">
                    <stat.icon className="w-8 h-8 text-fuchsia-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl font-montserrat font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                      {stat.number}
                    </div>
                    <div className="text-white/70 font-inter text-sm tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="lg:col-span-1"
            >
              <h4 className="text-xl font-montserrat font-bold text-white mb-8 flex items-center">
                <MapPin className="w-5 h-5 text-fuchsia-400 mr-3" />
                Contact
              </h4>
              
              <div className="space-y-6">
                {[
                  { icon: MapPin, text: '40 Rue de la République\n13001 Marseille', color: 'text-domiciliation' },
                  { icon: Phone, text: '+33 4 91 23 45 67', color: 'text-community' },
                  { icon: Mail, text: 'contact@le40.fr', color: 'text-blog' }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="flex items-start text-white/70 hover:text-white transition-colors duration-300 group cursor-pointer"
                  >
                    <contact.icon className={`w-5 h-5 ${contact.color} mr-4 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`} />
                    <span className="font-inter text-sm whitespace-pre-line leading-relaxed">{contact.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h4 className="text-xl font-montserrat font-bold text-white mb-8 flex items-center">
                <Building2 className="w-5 h-5 text-coworking mr-3" />
                Services
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white font-inter transition-all duration-300 flex items-center group text-sm"
                    >
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
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
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h4 className="text-xl font-montserrat font-bold text-white mb-8 flex items-center">
                <Heart className="w-5 h-5 text-community mr-3" />
                Entreprise
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white font-inter transition-all duration-300 flex items-center group text-sm"
                    >
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <h4 className="text-xl font-montserrat font-bold text-white mb-8 flex items-center">
                <Award className="w-5 h-5 text-violet-400 mr-3" />
                Légal
              </h4>
              <ul className="space-y-4 mb-10">
                {footerLinks.legal.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white font-inter transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center px-6 py-4 bg-gradient-primary text-white font-montserrat font-semibold rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 relative overflow-hidden glow-effect"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="tracking-wide">Réserver</span>
                </div>
              </motion.a>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-20"
          >
            <div className="glass-effect border border-white/10 rounded-4xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
              <div className="relative text-center">
                <Sparkles className="w-12 h-12 text-fuchsia-400 mx-auto mb-6" />
                <h3 className="text-3xl font-montserrat font-bold text-white mb-6">
                  Restez connecté à l'innovation
                </h3>
                <p className="text-white/70 font-inter mb-8 max-w-2xl mx-auto leading-relaxed">
                  Recevez nos dernières actualités, conseils d'experts et invitations exclusives 
                  directement dans votre boîte mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Votre email professionnel"
                    className="flex-1 px-6 py-4 glass-effect border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all duration-300 font-inter"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-primary text-white font-montserrat font-semibold rounded-2xl hover:bg-gradient-primary-hover transition-all duration-500 flex items-center justify-center glow-effect"
                  >
                    <span className="tracking-wide">S'abonner</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="text-white/60 font-inter text-sm mb-6 md:mb-0 text-center md:text-left">
            © 2024 Le 40. Tous droits réservés. Conçu avec{' '}
            <Heart className="w-4 h-4 inline text-fuchsia-400 mx-1" />
            à Marseille.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 glass-effect border border-white/10 rounded-2xl flex items-center justify-center text-white/60 ${social.color} transition-all duration-500 hover:border-white/30 relative overflow-hidden group`}
                aria-label={social.name}
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <social.icon className="w-5 h-5 relative z-10" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}