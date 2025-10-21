import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Calendar, Linkedin, Instagram, Facebook, ArrowRight, Heart, Users, Award, Sparkles, Zap, Crown, Globe, ChevronRight, Building2, Clock } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Coworking', href: '/coworking' },
    { name: 'Bureaux Privés', href: '/coworking' },
    { name: 'Salles de Réunion', href: '/salles' },
    { name: 'Studios Audio/Vidéo', href: '/studios' },
    { name: 'Domiciliation', href: '/domiciliation' }
  ],
  espaces: [
    { name: 'Open Space', href: '/spaces/open-space' },
    { name: 'Phone Box', href: '/spaces/phone-box' },
    { name: 'Lounge & Café', href: '/spaces/lounge-cafe' },
    { name: 'Terrasse Rooftop', href: '/spaces/terrasse-rooftop' }
  ],
  company: [
    { name: 'Communauté', href: '/community' },
    { name: 'Événements', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Mentions légales', href: '/legal' },
    { name: 'Confidentialité', href: '/privacy' },
    { name: 'CGU', href: '/terms' }
  ]
};

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'from-orange-500 to-amber-500' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'from-amber-500 to-yellow-500' },
  { name: 'Facebook', icon: Facebook, href: '#', color: 'from-orange-600 to-red-600' }
];

const footerStats = [
  { number: "4000", suffix: "m²", label: "d'espaces premium", icon: Building2 },
  { number: "120", suffix: "+", label: "entreprises", icon: Users },
  { number: "24", suffix: "/7", label: "accès flexible", icon: Clock },
  { number: "100", suffix: "%", label: "satisfaction", icon: Award }
];

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden lg:ml-60">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />

        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

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
        <div className="max-w-7xl mx-auto px-8 pt-24 pb-12">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8 relative inline-block"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative text-6xl font-black tracking-tight text-white">
                  <span className="inline-block">le</span>
                  <span className="inline-flex items-center justify-center w-16 h-16 mx-2 rounded-full bg-white text-black text-3xl align-middle">
                    40
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-white/60 max-w-2xl mx-auto"
              >
                Votre espace de travail premium au cœur de Marseille
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {footerStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-500">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className="inline-flex p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 mb-4"
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <div className="text-3xl font-black text-white mb-1">
                      {stat.number}
                      <span className="text-xl text-orange-400">{stat.suffix}</span>
                    </div>

                    <div className="text-sm text-white/60">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h4 className="text-lg font-black text-white mb-6 flex items-center">
                <Globe className="w-5 h-5 text-orange-400 mr-2" />
                Contact
              </h4>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: MapPin,
                    text: '40 Rue de la République\n13001 Marseille',
                    link: 'https://maps.google.com'
                  },
                  {
                    icon: Phone,
                    text: '+33 4 91 23 45 67',
                    link: 'tel:+33491234567'
                  },
                  {
                    icon: Mail,
                    text: 'contact@le40.fr',
                    link: 'mailto:contact@le40.fr'
                  }
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-2 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-all duration-300">
                      <contact.icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <span className="text-white/70 group-hover:text-white transition-colors whitespace-pre-line text-sm">
                      {contact.text}
                    </span>
                  </motion.a>
                ))}
              </div>

              <div>
                <h5 className="text-sm font-bold text-white/60 mb-4">Suivez-nous</h5>
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
                    >
                      <div className={`w-11 h-11 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <social.icon className="w-5 h-5 text-white" />
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
              <h4 className="text-lg font-black text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-orange-400 transition-colors text-sm group flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
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
              <h4 className="text-lg font-black text-white mb-6">Espaces</h4>
              <ul className="space-y-3">
                {footerLinks.espaces.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-orange-400 transition-colors text-sm group flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
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
              <h4 className="text-lg font-black text-white mb-6">À propos</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-orange-400 transition-colors text-sm group flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-white/40 hover:text-white/70 transition-colors text-xs"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-xl border border-orange-500/20 p-12">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
              </div>

              <div className="relative text-center max-w-2xl mx-auto">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="inline-block mb-6"
                >
                  <Sparkles className="w-12 h-12 text-orange-400" />
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  Prêt à Rejoindre Le 40 ?
                </h3>
                <p className="text-white/70 mb-8 text-lg">
                  Visitez nos espaces et découvrez votre futur lieu de travail
                </p>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-2xl shadow-orange-500/20 group"
                >
                  <Calendar className="w-6 h-6" />
                  <span>Réserver une Visite</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white/40 text-sm text-center md:text-left">
                © 2025 Le 40 République Marseille. Tous droits réservés.
                <span className="inline-flex items-center ml-2">
                  Made with <Heart className="w-4 h-4 text-orange-500 mx-1 fill-orange-500" /> in Marseille
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/30">
                <span>Propulsé par l'innovation</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4 text-orange-400" />
                </motion.div>
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
