import { motion } from 'framer-motion';
import { MousePointerClick, Settings, Video, Download } from 'lucide-react';
import { cards } from '../../utils/designSystem';

const processSteps = [
  {
    number: 1,
    icon: MousePointerClick,
    title: 'RÉSERVEZ EN LIGNE',
    description: 'Choisissez votre setup et créneau',
    detail: 'Paiement sécurisé'
  },
  {
    number: 2,
    icon: Settings,
    title: 'ON PRÉPARE TOUT',
    description: 'Studio configuré avant votre arrivée',
    detail: 'Vous recevez un email de confirmation'
  },
  {
    number: 3,
    icon: Video,
    title: 'VOUS ARRIVEZ, ON GÈRE',
    description: 'Parking gratuit devant la porte',
    detail: 'Notre technicien configure tout (5 min) - Vous tournez l\'esprit tranquille'
  },
  {
    number: 4,
    icon: Download,
    title: 'RUSHS LIVRÉS IMMÉDIATEMENT',
    description: 'Transfert WeTransfer avant votre départ',
    detail: '4K ProRes ou MP4 selon votre choix - Prêt pour votre montage'
  }
];

export default function ProcessTimeline() {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-black to-slate-950">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-montserrat text-white mb-4">
            Simple, Rapide, Sans Prise de Tête
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 -translate-x-4" />
                  )}

                  <div className={`${cards.standard.full} h-full text-center space-y-4`}>
                    <div className="relative inline-block">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 mx-auto">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center border-4 border-slate-950">
                        <span className="text-sm font-black text-white">{step.number}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white font-montserrat">
                      {step.title}
                    </h3>

                    <p className="text-white/80">{step.description}</p>

                    <p className="text-sm text-white/60 italic">{step.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
