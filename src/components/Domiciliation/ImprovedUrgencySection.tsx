import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Clock, Users } from 'lucide-react';

export default function ImprovedUrgencySection() {
  const activityStats = [
    {
      icon: <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>,
      label: 'Activité',
      value: '8',
      description: 'personnes regardent cette page'
    },
    {
      icon: <Clock className="w-4 h-4 text-orange-300" />,
      label: 'Dernière activation',
      value: '2h37',
      description: 'Une entreprise vient de nous rejoindre'
    },
    {
      icon: <Users className="w-4 h-4 text-blue-300" />,
      label: 'Ce mois',
      value: '23',
      description: 'nouvelles domiciliations activées'
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <AlertCircle className="w-16 h-16 text-white mx-auto mb-8" />

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-montserrat leading-tight">
              Rejoignez les entrepreneurs
              <br />
              qui font confiance à nos services
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-inter leading-relaxed">
              Notre engagement qualité nous pousse à limiter le nombre de domiciliations
              pour garantir un scan en 2h et un conseiller toujours disponible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {activityStats.map((stat, index) => (
              <div key={index} className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  {stat.icon}
                  <div className="text-sm text-white/80 uppercase tracking-wide font-montserrat">{stat.label}</div>
                </div>
                <div className="text-3xl font-black text-white mb-2 font-montserrat">{stat.value}</div>
                <div className="text-white/80 text-sm font-inter">{stat.description}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-12 py-6 bg-white text-orange-600 font-black text-xl rounded-xl hover:scale-105 transition-transform shadow-2xl font-montserrat mb-6"
            >
              Démarrer ma domiciliation
              <ArrowRight className="w-6 h-6" />
            </a>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium font-inter">
                +115 entrepreneurs nous ont rejoint ce mois-ci
              </span>
            </div>

            <p className="text-white/80 mt-6 font-inter">
              Sans CB • Activation sous 24h • Sans engagement
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
