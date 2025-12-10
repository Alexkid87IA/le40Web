import { motion } from 'framer-motion';
import { Shield, Zap, Users, TrendingUp, Award, Clock, Star, Check } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '127+',
      label: 'Entreprises hébergées',
      description: 'Startups, PME et cabinets conseil nous font confiance',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Note Google',
      description: 'Basée sur 89 avis vérifiés',
    },
    {
      icon: TrendingUp,
      value: '+25%',
      label: 'Croissance moyenne',
      description: 'De nos clients après 1 an',
    },
    {
      icon: Clock,
      value: '48h',
      label: 'Installation rapide',
      description: 'Vous emménagez en 2 jours',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Sécurité maximale',
      description: 'Accès par badge 24/7, vidéosurveillance, alarme connectée',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Internet haut débit compris',
      description: 'Connexion ultra-rapide et stable pour toute votre équipe',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Award,
      title: 'Adresse de caractère',
      description: '40 avenue de Saint Antoine, Marseille 15e - Idéal pour votre image',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Networking actif',
      description: 'Événements mensuels, introductions business, partenariats',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-zinc-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-teal-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            DES CHIFFRES QUI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">PARLENT</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Rejoignez des entrepreneurs ambitieux qui ont trouvé leur espace idéal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center group-hover:border-emerald-500/30 transition-all duration-500">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30"
                >
                  <stat.icon className="w-8 h-8 text-emerald-400" />
                </motion.div>

                <div className="text-4xl md:text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2 leading-none h-[3rem] md:h-[3.5rem] flex items-center justify-center">
                  {stat.value}
                </div>

                <div className="text-white font-montserrat font-bold mb-2">
                  {stat.label}
                </div>

                <div className="text-white/60 text-sm font-inter">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-montserrat font-black text-white mb-4">
            CE QUI EST <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">INCLUS</span>
          </h3>
          <p className="text-sm md:text-base text-white/60">
            Tout ce dont votre équipe a besoin pour performer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group-hover:border-emerald-500/30 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center shrink-0`}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-white/70 font-inter leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  <Check className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/30 rounded-3xl p-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>

          <blockquote className="text-lg md:text-xl font-montserrat font-bold text-white mb-4 max-w-4xl mx-auto">
            "En 3 ans au 40 notre société a pris un tournant incroyable, on a explosé le chiffre d'affaire et avons constitué une équipe de presque 10 personnes. L'environnement et le réseau ont été déterminants"
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400"></div>
            <div className="text-left">
              <p className="text-white font-montserrat font-bold text-lg">Morgan Aiwekhoe</p>
              <p className="text-white/60 font-inter">CEO @ South Management</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
