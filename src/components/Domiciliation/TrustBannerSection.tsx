import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, Star, Building2, FileCheck } from 'lucide-react';

export default function TrustBannerSection() {
  const certifications = [
    {
      icon: Shield,
      title: 'Agrément Préfecture',
      subtitle: 'N° 13-2018-042',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Certifié ISO',
      subtitle: 'Qualité garantie',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: CheckCircle,
      title: 'Conformité RGPD',
      subtitle: 'Données sécurisées',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      title: '4.9/5',
      subtitle: '127 avis clients',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Building2,
      title: 'CCI Marseille',
      subtitle: 'Membre actif',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FileCheck,
      title: 'Greffe certifié',
      subtitle: 'Dossiers validés',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '32px 32px'
             }}>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-400/20 mb-6">
            <Shield className="w-4 h-4 text-orange-400" />
            <span className="text-white/90 font-inter text-sm font-semibold">Certifications et Garanties</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-montserrat font-black text-white mb-4">
            Une <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">confiance</span> méritée
          </h2>
          <p className="text-white/60 font-inter text-lg max-w-2xl mx-auto">
            Agréments officiels, certifications et reconnaissance professionnelle
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-all duration-500`}></div>

              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center group-hover:border-white/30 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <cert.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-montserrat font-bold text-sm mb-1">{cert.title}</h3>
                <p className="text-white/60 font-inter text-xs">{cert.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
              127+
            </div>
            <p className="text-white/70 font-inter text-sm">Entreprises nous font confiance</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
              100%
            </div>
            <p className="text-white/70 font-inter text-sm">Dossiers acceptés en Préfecture</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
              24h
            </div>
            <p className="text-white/70 font-inter text-sm">Activation garantie</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-400/20 rounded-2xl p-8 text-center backdrop-blur-xl"
        >
          <p className="text-white/90 font-inter text-base md:text-lg leading-relaxed">
            <span className="font-bold text-orange-400">Agrément Préfecture vérifié</span> - Tous nos documents sont vérifiables auprès de la Préfecture des Bouches-du-Rhône.
            <span className="block mt-2 text-white/70 text-sm">Numéro d'agrément disponible sur simple demande</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
