import { motion } from 'framer-motion';
import { Calendar, Eye, FileCheck, Key, Rocket } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    icon: Calendar,
    title: 'Réservez votre visite',
    description: 'En ligne ou par téléphone en 2 minutes. Choisissez le créneau qui vous convient.',
    duration: '2 min',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 2,
    icon: Eye,
    title: 'Visitez les bureaux',
    description: 'Découvrez nos espaces disponibles, posez toutes vos questions. Visite sans engagement.',
    duration: '30-45 min',
    color: 'from-indigo-600 to-blue-600'
  },
  {
    id: 3,
    icon: FileCheck,
    title: 'Signez votre contrat',
    description: 'Contrat simple et transparent. Tout se fait en ligne ou sur place selon votre préférence.',
    duration: '15 min',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 4,
    icon: Key,
    title: 'Recevez vos accès',
    description: 'Accès sécurisés pour toute l\'équipe. Contrôle d\'accès 24/7 activé immédiatement.',
    duration: '48h',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 5,
    icon: Rocket,
    title: 'Emménagez et lancez-vous',
    description: 'Bureau prêt à l\'emploi : mobilier, fibre, ligne téléphonique. Il ne reste qu\'à travailler !',
    duration: '48-72h',
    color: 'from-blue-600 to-indigo-600'
  }
];

export default function ProcessSection() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            COMMENT ÇA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">MARCHE</span> ?
          </h2>
          <p className="text-base md:text-lg font-inter text-white/60 max-w-2xl mx-auto">
            De la visite à l'emménagement en <span className="text-blue-400 font-bold">moins d'une semaine</span>. Simple, transparent, sans surprise.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-600 opacity-20 hidden lg:block"></div>

          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative mb-16 last:mb-0"
            >
              <div className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                <div className="flex-1 lg:text-right lg:pr-12">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-block"
                  >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${step.color} rounded-full mb-4`}>
                      <span className="text-white font-montserrat font-bold text-sm">Étape {step.id}</span>
                      <span className="text-white/80 text-xs">• {step.duration}</span>
                    </div>
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-montserrat font-black text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/70 font-inter text-lg leading-relaxed max-w-md lg:ml-auto">
                    {step.description}
                  </p>
                </div>

                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                      <step.icon className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-2xl opacity-50 animate-pulse`}></div>
                </div>

                <div className="flex-1 lg:pl-12">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block w-full h-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 mt-8"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-3xl text-center"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-montserrat font-black text-white mb-4">
            Prêt en moins d'une semaine
          </h3>
          <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Contrairement à une location classique qui prend des mois, vous pouvez emménager chez nous en quelques jours seulement.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-2">48-72h</div>
              <div className="text-white/60 text-sm">Délai d'emménagement</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-2">0€</div>
              <div className="text-white/60 text-sm">Frais d'aménagement</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-2">100%</div>
              <div className="text-white/60 text-sm">Prêt à l'emploi</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
