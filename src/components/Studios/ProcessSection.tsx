import { motion } from 'framer-motion';
import { Calendar, Video, Clapperboard, Download } from 'lucide-react';

const processSteps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Choisissez votre setup',
    description: 'Sélectionnez le studio adapté à votre projet : podcast, interview, Full Show, ou TikTok. Réservez votre créneau en ligne.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    number: '02',
    icon: Video,
    title: 'Tournage assisté',
    description: 'Notre technicien configure tout le matériel, gère l\'éclairage et le son. Vous vous concentrez sur votre contenu.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: '03',
    icon: Clapperboard,
    title: 'Post-production (optionnel)',
    description: 'Ajoutez montage, colorimétrie, et exports optimisés. Formule Post-Prod avec 1 révision incluse.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    number: '04',
    icon: Download,
    title: 'Livraison rapide',
    description: 'Récupérez vos fichiers en 2h via WeTransfer. Format 4K MP4 ou ProRes selon vos besoins.',
    color: 'from-blue-500 to-cyan-500'
  }
];

export default function ProcessSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Le Process
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            COMMENT ÇA
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400">
              FONCTIONNE ?
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-inter">
            4 étapes simples pour créer du contenu professionnel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group h-full">
                <div className={`absolute -top-6 left-8 text-7xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${step.color} opacity-20`}>
                  {step.number}
                </div>

                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-montserrat font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 font-inter leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-white/30 to-transparent"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-400/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-emerald-300 font-inter font-semibold">
              Réservation flexible • Annulation gratuite 48h avant
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
