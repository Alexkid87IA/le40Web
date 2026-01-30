import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Linkedin, Instagram, ArrowRight, Clock } from 'lucide-react';

const navigation = {
  services: [
    { name: 'Coworking', href: '/coworking' },
    { name: 'Bureaux Privés', href: '/bureaux' },
    { name: 'Salles de Réunion', href: '/salles' },
    { name: 'Studios', href: '/studios' },
    { name: 'Domiciliation', href: '/domiciliation' },
  ],
  company: [
    { name: 'Événements', href: '/events' },
    { name: 'Le Club', href: '/club' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Confidentialité', href: '/politique-confidentialite' },
    { name: 'CGV', href: '/cgv' },
  ],
};

const social = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/le40marseille' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/le40marseille' },
];

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Background Effects - neutral */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-full blur-[120px]" />
      </div>

      {/* Top CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - CTA */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm font-medium mb-6">
                  Visitez nos espaces
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-montserrat font-black text-white mb-4 leading-tight">
                  Prêt à rejoindre
                  <span className="block text-white/60">
                    Le 40 ?
                  </span>
                </h2>
                <p className="text-white/50 text-lg mb-8 max-w-md">
                  Découvrez l'espace de travail qui transformera votre quotidien professionnel.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/reserver-visite"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-montserrat font-bold shadow-lg shadow-white/10 hover:shadow-white/20 transition-all"
                  >
                    Planifier une visite gratuite
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="tel:+33491962151"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl font-montserrat font-bold transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    04 91 96 21 51
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right - Hours & Location Card */}
            <div className="lg:justify-self-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-sm"
              >
                {/* Hours */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white/70" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Horaires d'ouverture</h3>
                    <p className="text-white/60 text-sm">Lun - Ven : 8h30 - 19h00</p>
                    <p className="text-white/60 text-sm">Sam : 9h00 - 13h00</p>
                    <p className="text-white/80 text-sm font-medium mt-1">Accès 24/7 membres</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white/70" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Notre adresse</h3>
                    <p className="text-white/60 text-sm">40 Avenue de Saint Antoine</p>
                    <p className="text-white/60 text-sm">13015 Marseille</p>
                    <a
                      href="https://maps.google.com/?q=40+Avenue+de+Saint+Antoine+13015+Marseille"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white/80 text-sm font-medium mt-2 hover:text-white transition-colors"
                    >
                      Voir sur Google Maps
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-8 xl:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4 xl:col-span-1 mb-4 lg:mb-0">
              <Link to="/" className="inline-block mb-6">
                <img
                  src="/logo.png"
                  alt="Le 40"
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                L'espace de travail premium qui réunit entrepreneurs, créatifs et innovateurs au cœur de Marseille.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all group"
                    aria-label={item.name}
                  >
                    <item.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-montserrat font-bold text-sm mb-5 uppercase tracking-wider">
                Services
              </h3>
              <ul className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-white/50 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-montserrat font-bold text-sm mb-5 uppercase tracking-wider">
                Le 40
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-white/50 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-montserrat font-bold text-sm mb-5 uppercase tracking-wider">
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+33491962151"
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-white/40" />
                    04 91 96 21 51
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@le40.fr"
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-white/40" />
                    contact@le40.fr
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-montserrat font-bold text-sm mb-5 uppercase tracking-wider">
                Légal
              </h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Le 40 Marseille. Tous droits réservés.
              </p>
              <p className="text-white/30 text-xs">
                Conçu avec passion à Marseille
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
