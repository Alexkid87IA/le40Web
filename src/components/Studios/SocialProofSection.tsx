import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, Video, Award, Clock, CheckCircle, Play } from 'lucide-react';

export default function SocialProofSection() {
  const stats = [
    { value: '380+', label: 'Productions réalisées', icon: Video, gradient: 'from-blue-500 to-cyan-500' },
    { value: '4.9/5', label: 'Satisfaction client', icon: Star, gradient: 'from-cyan-500 to-blue-500' },
    { value: '2h', label: 'Délai de livraison', icon: Clock, gradient: 'from-emerald-500 to-teal-500' },
    { value: '95%', label: 'Clients réguliers', icon: Award, gradient: 'from-cyan-500 to-blue-500' },
  ];

  const testimonials = [
    {
      name: 'Sophie Martin',
      role: 'Fondatrice - BeautyTech',
      avatar: 'SM',
      rating: 5,
      text: 'Nos vidéos produit ont généré +340% de conversions après avoir utilisé le studio Green Screen. La qualité broadcast et le professionnalisme de l\'équipe sont impressionnants.',
      result: '+340% conversions',
      videoThumbnail: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Thomas Dubois',
      role: 'YouTuber - 250k abonnés',
      avatar: 'TD',
      rating: 5,
      text: 'J\'ai tourné 15 vidéos en 3 mois. Mes abonnés ont immédiatement remarqué le jump de qualité. Le studio Face-cam est parfait pour YouTube, et le prix avec technicien inclus est imbattable.',
      result: '+85k vues/vidéo',
      videoThumbnail: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Marie Leroy',
      role: 'DG - StartupLabs',
      avatar: 'ML',
      rating: 5,
      text: 'Pour nos webinaires et formations en ligne, le studio Full Show est parfait. L\'équipe gère tout, on arrive, on tourne, c\'est fluide. Le rendu est digne d\'une chaîne TV professionnelle.',
      result: '12 formations produites',
      videoThumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const clients = [
    { name: 'L\'Oréal', logo: 'LO' },
    { name: 'Décathlon', logo: 'DC' },
    { name: 'BNP Paribas', logo: 'BP' },
    { name: 'Carrefour', logo: 'CF' },
    { name: 'Orange', logo: 'OR' },
    { name: 'Airbnb', logo: 'AB' },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-xl">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-inter text-sm font-bold">Excellence reconnue</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            ILS CRÉENT AVEC
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400">
              NOS STUDIOS
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Rejoignez plus de 200 créateurs, entreprises et marques qui nous font confiance pour leurs productions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}></div>
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 text-center transition-all">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 font-inter text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-montserrat font-black text-white mb-4">
              Témoignages vidéo
            </h3>
            <p className="text-white/60 font-inter">
              Découvrez l'expérience de nos clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-white/10 group-hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all">
                  <div className="relative h-48 overflow-hidden cursor-pointer">
                    <img
                      src={testimonial.videoThumbnail}
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/40"
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </motion.div>
                    </div>
                    <div className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {testimonial.result}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                      ))}
                    </div>

                    <p className="text-white/80 font-inter text-sm leading-relaxed mb-6">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-montserrat font-black text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="text-white font-inter font-bold">
                          {testimonial.name}
                        </div>
                        <div className="text-white/50 text-xs font-inter">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-montserrat font-black text-white mb-4">
            Ils nous font confiance
          </h3>
          <p className="text-white/60 font-inter mb-12">
            Des startups aux grandes entreprises
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-xl p-6 flex items-center justify-center transition-all cursor-pointer"
              >
                <div className="text-3xl font-montserrat font-black text-white/40 group-hover:text-white/80 transition-colors">
                  {client.logo}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-2xl p-8 backdrop-blur-xl"
        >
          <div className="flex items-start gap-6">
            <div className="p-4 bg-emerald-500/20 rounded-2xl">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-montserrat font-black text-white mb-3">
                Garantie Satisfaction 100%
              </h3>
              <p className="text-white/80 font-inter leading-relaxed mb-6">
                Si vous n'êtes pas entièrement satisfait de votre tournage, nous vous offrons une nouvelle session gratuite ou un remboursement complet. C'est notre engagement qualité.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-white/90 font-inter text-sm font-medium">Support 7j/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-white/90 font-inter text-sm font-medium">Reprise garantie</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-white/90 font-inter text-sm font-medium">Paiement sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
