import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook, ArrowRight, Building2, Users, Clock, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  services: [
    { name: 'Coworking', href: '/coworking' },
    { name: 'Bureaux Privés', href: '/bureaux' },
    { name: 'Salles de Réunion', href: '/salles' },
    { name: 'Studios Audio/Vidéo', href: '/studios' },
    { name: 'Domiciliation', href: '/domiciliation' }
  ],
  company: [
    { name: 'Événements', href: '/events' },
    { name: 'Le Club', href: '/club' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Confidentialité', href: '/politique-confidentialite' },
    { name: 'CGV', href: '/cgv' }
  ]
};

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' }
];

const footerStats = [
  { number: "4000", suffix: "m²", label: "d'espaces premium", icon: Building2 },
  { number: "120", suffix: "+", label: "entreprises", icon: Users },
  { number: "9h", suffix: "-20h", label: "Lun-Ven", icon: Clock },
  { number: "100", suffix: "%", label: "satisfaction", icon: Award }
];

const contactInfo = [
  {
    icon: MapPin,
    text: '40 Avenue de Saint Antoine\n13015 Marseille',
    link: 'https://maps.google.com'
  },
  {
    icon: Phone,
    text: '04 91 96 21 51',
    link: 'tel:+33491962151'
  },
  {
    icon: Mail,
    text: 'contact@bureauxle40.fr',
    link: 'mailto:contact@bureauxle40.fr'
  }
];

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden" role="contentinfo" aria-label="Pied de page">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black" />

        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-12">
          <div className="mb-12 md:mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12 lg:mb-16"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6 md:mb-8 relative inline-block"
              >
                <img
                  src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                  alt="Le 40"
                  className="h-12 sm:h-16 md:h-20 w-auto brightness-0 invert"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4"
              >
                Votre espace de travail premium au cœur de Marseille
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20">
              {footerStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className="inline-flex p-2 md:p-3 rounded-lg md:rounded-xl bg-white/10 mb-3 md:mb-4"
                    >
                      <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                    </motion.div>

                    <div className="text-2xl md:text-3xl font-black text-white mb-1">
                      {stat.number}
                      <span className="text-base md:text-xl text-white/70">{stat.suffix}</span>
                    </div>

                    <div className="text-xs md:text-sm text-white/60">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h4 className="text-base md:text-lg font-black text-white mb-4 md:mb-6">
                Contact
              </h4>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.link}
                    href={contact.link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-2 rounded-lg md:rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                      <contact.icon className="w-4 h-4 md:w-5 md:h-5 text-white/70" aria-hidden="true" />
                    </div>
                    <span className="text-white/70 group-hover:text-white transition-colors whitespace-pre-line text-xs md:text-sm">
                      {contact.text}
                    </span>
                  </motion.a>
                ))}
              </div>

              <div>
                <h5 className="text-xs md:text-sm font-bold text-white/60 mb-3 md:mb-4">Suivez-nous</h5>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{ y: -3, scale: 1.1 }}
                      className="group relative"
                      aria-label={`Suivez-nous sur ${social.name}`}
                    >
                      <div className="w-10 h-10 md:w-11 md:h-11 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg">
                        <social.icon className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white transition-colors" aria-hidden="true" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-base md:text-lg font-black text-white mb-4 md:mb-6">Services</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white transition-colors text-xs md:text-sm group flex items-center"
                    >
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" aria-hidden="true" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-base md:text-lg font-black text-white mb-4 md:mb-6">À propos</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white transition-colors text-xs md:text-sm group flex items-center"
                    >
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" aria-hidden="true" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-base md:text-lg font-black text-white mb-4 md:mb-6">Légal</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white/70 transition-colors text-xs"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 lg:p-12 hover:border-white/20 transition-all duration-500">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
              </div>

              <div className="relative text-center max-w-2xl mx-auto px-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 md:mb-4">
                  Prêt à Rejoindre Le 40 ?
                </h3>
                <p className="text-white/70 mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
                  Visitez nos espaces et découvrez votre futur lieu de travail
                </p>

                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black rounded-xl md:rounded-2xl shadow-2xl shadow-white/[0.05] group transition-all duration-300 text-sm md:text-base"
                  >
                    <span>Réserver une Visite</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              <div className="text-white/70 text-xs md:text-sm text-center md:text-left">
                © 2025 Le 40 Marseille. Tous droits réservés.
              </div>

              <div className="flex items-center gap-2 text-xs text-white/70">
                <span>Made with precision in Marseille</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
