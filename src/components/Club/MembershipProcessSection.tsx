import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, UserPlus, Rocket } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Contact Initial",
    description: "Contactez-nous pour découvrir Le Club et poser vos questions",
    icon: Mail,
    gradient: "from-red-500 to-rose-600"
  },
  {
    number: "02",
    title: "Visite Découverte",
    description: "Visitez nos espaces et rencontrez l'équipe et quelques membres (gratuit)",
    icon: Eye,
    gradient: "from-rose-500 to-pink-600"
  },
  {
    number: "03",
    title: "Inscription Simple",
    description: "Choisissez votre formule et inscrivez-vous en ligne en 2 minutes",
    icon: UserPlus,
    gradient: "from-pink-500 to-red-600"
  },
  {
    number: "04",
    title: "Bienvenue au Club",
    description: "Accédez immédiatement à tous les événements et à la communauté",
    icon: Rocket,
    gradient: "from-red-400 to-rose-600"
  }
];

export default function MembershipProcessSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-medium text-red-400 mb-6"
          >
            PROCESSUS D'ADHÉSION
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            COMMENT ÇA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">MARCHE</span> ?
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-inter">
            Un processus rapide et transparent pour intégrer la communauté
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-4 w-8 h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0" />
                )}

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:border-red-500/30 transition-all h-full">
                  <div className="text-sm font-montserrat font-bold text-red-400/60 mb-4">
                    ÉTAPE {step.number}
                  </div>

                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.gradient} mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60 text-sm font-inter leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#notify"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl text-white font-montserrat font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all"
          >
            <Mail className="w-5 h-5" />
            <span>Commencer maintenant</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
