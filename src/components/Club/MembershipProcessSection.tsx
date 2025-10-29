import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, UserPlus, Rocket } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Contact Initial",
    description: "Contactez-nous pour découvrir Le Club et poser vos questions",
    icon: Mail,
    gradient: "from-orange-500 to-amber-600"
  },
  {
    number: "02",
    title: "Visite Découverte",
    description: "Visitez nos espaces et rencontrez l'équipe et quelques membres (gratuit)",
    icon: Eye,
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    number: "03",
    title: "Inscription Simple",
    description: "Choisissez votre formule et inscrivez-vous en ligne en 2 minutes",
    icon: UserPlus,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    number: "04",
    title: "Bienvenue au Club",
    description: "Accédez immédiatement à tous les événements et à la communauté",
    icon: Rocket,
    gradient: "from-violet-500 to-purple-600"
  }
];

export default function MembershipProcessSection() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-sm font-semibold text-violet-400 mb-6"
          >
            PROCESSUS D'ADHÉSION
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Rejoignez-nous en
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
              4 étapes simples
            </span>
          </h2>

          <p className="text-xl text-white/60 max-w-3xl mx-auto">
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

                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all h-full group-hover:scale-105 transform duration-300">
                  <div className="text-8xl font-black text-white/5 mb-4">
                    {step.number}
                  </div>

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.gradient} mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl">
              <Mail className="w-5 h-5" />
              <span>Commencer Maintenant</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
