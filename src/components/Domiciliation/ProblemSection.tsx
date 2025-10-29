import { motion } from 'framer-motion';
import { X, Check, Sparkles, AlertTriangle, Clock, TrendingDown, TrendingUp, Zap } from 'lucide-react';

export default function ProblemSection() {
  const painPoints = [
    {
      icon: Clock,
      stat: '5h/mois',
      problem: 'perdues en déplacements',
      description: 'pour récupérer votre courrier'
    },
    {
      icon: AlertTriangle,
      stat: '3-7 jours',
      problem: "d'attente courrier",
      description: 'documents importants bloqués'
    },
    {
      icon: TrendingDown,
      stat: '-35%',
      problem: 'crédibilité perdue',
      description: 'avec une adresse personnelle'
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-400/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-white/90 font-inter text-sm font-semibold">Le problème des entrepreneurs</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
            Sans domiciliation professionnelle,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">vous perdez sur tous les fronts</span>
          </h2>
          <p className="text-white/70 font-inter text-lg md:text-xl max-w-3xl mx-auto">
            Découvrez ce que vous coûte réellement l'absence d'une solution professionnelle
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {painPoints.map((pain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>

              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8 text-center h-full">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-400/30 flex items-center justify-center mx-auto mb-6">
                  <pain.icon className="w-8 h-8 text-red-400" />
                </div>
                <div className="text-4xl md:text-5xl font-montserrat font-black text-red-400 mb-2">
                  {pain.stat}
                </div>
                <div className="text-white font-montserrat font-bold text-lg mb-2">
                  {pain.problem}
                </div>
                <p className="text-white/60 font-inter text-sm">
                  {pain.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-montserrat font-black text-white text-center mb-12">
            La différence est <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">évidente</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative group h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-lg transition-all duration-500"></div>

              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-red-900/40 rounded-3xl p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-red-400 font-montserrat font-bold text-lg">DOMICILIATION CLASSIQUE</div>
                    <div className="text-white/50 text-sm font-inter">Solution basique</div>
                  </div>
                </div>

                <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Domiciliation classique"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white/60 text-xs font-inter">Juste une boîte aux lettres...</div>
                  </div>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-white/70 font-inter">Juste une adresse sans services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-white/70 font-inter">Courrier en vrac, vous gérez tout</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-white/70 font-inter">Support minimal ou inexistant</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-white/70 font-inter">Standard téléphonique générique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-white/70 font-inter">Salles de réunion en supplément</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative group h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-green-500 rounded-3xl opacity-50 group-hover:opacity-70 blur-xl transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border border-orange-500/40 rounded-3xl p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 font-montserrat font-bold text-lg">LE 40 MARSEILLE</div>
                    <div className="text-white/80 text-sm font-inter">Solution complète</div>
                  </div>
                </div>

                <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Le 40 Marseille"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <div className="text-white font-inter text-xs font-semibold">Écosystème professionnel complet</div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-white font-inter font-medium">Adresse + écosystème complet inclus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-white font-inter font-medium">Scan sous 2h + cloud sécurisé RGPD</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-white font-inter font-medium">Conseiller dédié qui connaît votre dossier</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-white font-inter font-medium">Accueil téléphonique personnalisé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-white font-inter font-medium">
                      <span className="text-amber-400">2h-8h/mois</span> de salles INCLUSES
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>

          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-orange-500/30 rounded-3xl p-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Clock className="w-12 h-12 text-orange-400" />
              <TrendingUp className="w-12 h-12 text-green-400" />
            </div>
            <div className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 mb-6">
              5h/mois économisées
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4 font-inter leading-relaxed">
              C'est le temps que perdent les entrepreneurs à gérer courrier et paperasse
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-white font-inter font-bold text-lg">Avec nous ? 0 minute. On s'occupe de tout.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
