import { motion } from 'framer-motion';
import { Shield, RefreshCw, HeadphonesIcon, Award, Lock, Zap } from 'lucide-react';

const guarantees = [
  {
    icon: Shield,
    title: 'Satisfait ou remboursé 3 mois',
    description: 'Pas convaincu ? On vous rembourse intégralement les 3 premiers mois. Sans question, sans discussion.',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    icon: RefreshCw,
    title: 'Upgrade/Downgrade flexible',
    description: 'Votre équipe grandit ou diminue ? Changez de bureau facilement. Adaptation permanente à vos besoins.',
    color: 'from-teal-600 to-cyan-600'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support dédié 5j/7',
    description: 'Une question ? Un problème ? Notre équipe répond en moins de 2h. Support français et réactif.',
    color: 'from-cyan-600 to-blue-600'
  },
  {
    icon: Award,
    title: 'Qualité garantie',
    description: 'Mobilier premium, maintenance régulière, propreté irréprochable. On ne fait aucun compromis sur la qualité.',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    icon: Lock,
    title: 'Sécurité certifiée',
    description: 'Vidéosurveillance 24/7, contrôle d\'accès par badge, assurance tous risques. Vos données et matériel en sécurité.',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    icon: Zap,
    title: 'Aucune surprise',
    description: 'Prix tout inclus, transparence totale. Ce que vous voyez sur le devis est ce que vous payez. Point.',
    color: 'from-teal-600 to-cyan-600'
  }
];

export default function GuaranteesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">GARANTIES</span>
          </h2>
          <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
            Louez en toute sérénité. Nous assumons tous les risques pour que vous n'en ayez aucun.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${guarantee.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${guarantee.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <guarantee.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
                  {guarantee.title}
                </h3>

                <p className="text-white/70 font-inter leading-relaxed">
                  {guarantee.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-10 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl text-center"
        >
          <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h3 className="text-3xl font-montserrat font-black text-white mb-4">
            Protection totale de votre investissement
          </h3>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Contrairement à un bail 3-6-9 ans où vous êtes bloqué, chez nous vous ne prenez aucun risque. Testez pendant 3 mois, et si ça ne vous convient pas, on vous rembourse.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <div className="text-white font-semibold">Aucun engagement long terme</div>
                <div className="text-white/60 text-sm">Préavis 1-3 mois selon formule</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <div className="text-white font-semibold">Zéro frais cachés</div>
                <div className="text-white/60 text-sm">Tout est inclus dans le loyer</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <div className="text-white font-semibold">Support réactif</div>
                <div className="text-white/60 text-sm">Réponse garantie sous 2h</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
