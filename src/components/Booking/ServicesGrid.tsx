import { motion } from 'framer-motion';
import { Building2, Presentation, Video, MapPin, Sparkles, Briefcase, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  price: string;
  gradient: string;
  action: string;
}

interface ServicesGridProps {
  onSelectService: (serviceId: string) => void;
}

const services: Service[] = [
  {
    id: 'workspaces',
    title: 'Espaces de Travail',
    description: 'Hot Desk, Bureau Privé, Coworking flexible',
    icon: Building2,
    price: 'À partir de 8€/h',
    gradient: 'from-blue-600 to-cyan-600',
    action: 'Réserver un espace'
  },
  {
    id: 'meeting-rooms',
    title: 'Salles de Réunion',
    description: '4-12 personnes, équipées et connectées',
    icon: Presentation,
    price: 'À partir de 50€/h',
    gradient: 'from-orange-600 to-amber-600',
    action: 'Réserver une salle'
  },
  {
    id: 'studios',
    title: 'Studios Créatifs',
    description: 'Audio/Vidéo, Production, Post-production',
    icon: Video,
    price: 'À partir de 250€/demi-j',
    gradient: 'from-pink-600 to-rose-600',
    action: 'Configurer mon studio'
  },
  {
    id: 'domiciliation',
    title: 'Domiciliation',
    description: 'Adresse prestigieuse pour votre entreprise',
    icon: MapPin,
    price: 'À partir de 99€/mois',
    gradient: 'from-emerald-600 to-teal-600',
    action: 'En savoir plus'
  },
  {
    id: 'club',
    title: 'Le Club',
    description: 'Membership exclusif et communauté premium',
    icon: Sparkles,
    price: 'Sur demande',
    gradient: 'from-red-600 to-orange-600',
    action: 'Candidater'
  },
  {
    id: 'services-plus',
    title: 'Services Plus',
    description: 'Accompagnement, conseil et prestations sur mesure',
    icon: Briefcase,
    price: 'Variable',
    gradient: 'from-slate-600 to-gray-600',
    action: 'Découvrir'
  }
];

export default function ServicesGrid({ onSelectService }: ServicesGridProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
            Choisissez Votre Service
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-inter max-w-2xl mx-auto">
            Explorez notre gamme complète de services professionnels premium
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectService(service.id)}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white/10 hover:border-white/30 transition-all duration-500 text-left overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
                </motion.div>
              </div>

              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${service.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
                >
                  {<service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-2 sm:mb-3">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-white/60 font-inter mb-4 sm:mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-baseline gap-2 mb-4 sm:mb-6">
                  <span className={`text-xl sm:text-2xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                    {service.price.split(' ')[0]} {service.price.split(' ')[1]}
                  </span>
                  {service.price.split(' ')[2] && (
                    <span className="text-xs sm:text-sm text-white/40">
                      {service.price.split(' ').slice(2).join(' ')}
                    </span>
                  )}
                </div>

                <div className={`inline-flex items-center gap-2 text-sm sm:text-base font-inter font-semibold text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} group-hover:gap-3 transition-all`}>
                  <span>{service.action}</span>
                  <motion.svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <p className="text-sm sm:text-base text-white/70 font-inter">
                Besoin d'aide pour choisir ?
              </p>
            </div>
            <a
              href="tel:+33413252640"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-montserrat font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
            >
              04 13 25 26 40
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
