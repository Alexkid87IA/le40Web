import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const navigation = {
  services: [
    { name: 'Coworking', href: '/coworking' },
    { name: 'Bureaux Privés', href: '/bureaux' },
    { name: 'Salles de Réunion', href: '/salles' },
    { name: 'Studios', href: '/studios' },
    { name: 'Domiciliation', href: '/domiciliation' },
  ],
  company: [
    { name: 'Nos Events', href: '/events' },
    { name: 'Le Club', href: '/club' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Confidentialité', href: '/politique-confidentialite' },
    { name: 'CGV', href: '/cgv' },
  ],
};

const social = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
];

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand & Contact - Takes more space */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <Link to="/" className="inline-block mb-6">
                <img
                  src="https://bureau-le40.fr/wp-content/uploads/2024/04/Logo-le-40.png"
                  alt="Le 40"
                  className="h-10 w-auto brightness-0 invert"
                />
              </Link>

              <p className="text-white/50 text-sm mb-6 max-w-xs">
                Votre espace de travail premium au coeur de Marseille. Coworking, bureaux, studios et événements.
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <a
                  href="https://maps.google.com/?q=40+Avenue+de+Saint+Antoine+13015+Marseille"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">40 Avenue de Saint Antoine, 13015 Marseille</span>
                </a>
                <a
                  href="tel:+33491962151"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">04 91 96 21 51</span>
                </a>
                <a
                  href="mailto:contact@bureauxle40.fr"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">contact@bureauxle40.fr</span>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {/* Services */}
                <div>
                  <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
                  <ul className="space-y-2.5">
                    {navigation.services.map((item) => (
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

                {/* Company */}
                <div>
                  <h3 className="text-white font-semibold text-sm mb-4">Le 40</h3>
                  <ul className="space-y-2.5">
                    {navigation.company.map((item) => (
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

                {/* CTA Card */}
                <div className="col-span-2 sm:col-span-1">
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="text-white font-semibold text-sm mb-2">
                      Visitez nos espaces
                    </h3>
                    <p className="text-white/50 text-xs mb-4">
                      Découvrez Le 40 et trouvez l'espace idéal pour votre activité.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Planifier une visite
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <span className="text-white/40 text-xs">
                © {new Date().getFullYear()} Le 40 Marseille
              </span>
              <div className="flex items-center gap-4">
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white/40 hover:text-white/60 text-xs transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4 text-white/60" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
