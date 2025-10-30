import { motion } from 'framer-motion';
import { Mail, Phone, Building2, Users, Clock, Shield, Zap, TrendingUp } from 'lucide-react';

export default function BenefitsVisualSection() {
  const benefits = [
    {
      icon: Mail,
      title: 'Scan courrier 2h',
      description: 'Votre courrier numérisé et accessible partout en moins de 2 heures',
      image: 'https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { value: '< 2h', label: 'Délai moyen' },
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Standard téléphonique pro',
      description: 'Accueil professionnel à votre nom, gestion des appels et messages',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { value: '24/7', label: 'Disponibilité' },
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Building2,
      title: 'Salles de réunion incluses',
      description: 'Accédez à nos espaces professionnels équipés selon votre formule',
      image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { value: '2-8h', label: 'Par mois' },
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Conseiller dédié',
      description: 'Un interlocuteur unique qui connaît votre dossier et répond rapidement',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { value: '1h', label: 'Délai réponse' },
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Conformité garantie',
      description: 'Agrément préfecture, dossiers certifiés, conformité légale totale',
      image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { value: '100%', label: 'Acceptation' },
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: Zap,
      title: 'Activation express',
      description: 'Votre domiciliation active en 24h, attestation délivrée immédiatement',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { value: '24h', label: 'Activation' },
      gradient: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.02]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-400/20 mb-6">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-white/90 font-inter text-sm font-semibold">Services inclus</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
            Des services qui <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">changent tout</span>
          </h2>
          <p className="text-white/70 font-inter text-lg md:text-xl max-w-3xl mx-auto">
            Chaque fonctionnalité a été pensée pour vous faire gagner du temps et de la crédibilité
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500`}></div>

              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:border-white/30 transition-all duration-500 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                  <div className={`absolute top-4 left-4 w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-2xl`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/10">
                    <div className={`text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${benefit.gradient}`}>
                      {benefit.stats.value}
                    </div>
                    <div className="text-white/70 text-xs font-inter">{benefit.stats.label}</div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-montserrat font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 font-inter leading-relaxed flex-1">
                    {benefit.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 font-inter text-sm">En savoir plus</span>
                      <motion.div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        whileHover={{ x: 4 }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-orange-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <Clock className="w-12 h-12 text-orange-400" />
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-montserrat font-black text-white mb-1">
                  Tout inclus
                </div>
                <p className="text-white/70 font-inter text-sm">Sans frais cachés</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/10"></div>
            <p className="text-white/90 font-inter text-lg max-w-xl">
              Tous ces services sont <span className="text-orange-400 font-bold">inclus dans votre abonnement</span>. Pas de surprise, pas de coût caché.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
