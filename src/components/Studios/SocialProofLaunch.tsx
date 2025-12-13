import { motion } from 'framer-motion';
import { Building2, Euro, MapPin, Star } from 'lucide-react';
import { cards } from '../../utils/designSystem';
import { studioTestimonials, socialProofStats } from '../../data/studios/testimonials';

export default function SocialProofLaunch() {
  const originesMedia = studioTestimonials[0];

  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-black to-slate-950">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-montserrat text-white mb-4">
            Ils Nous Font Déjà Confiance
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${cards.premium.full} relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-3xl font-black text-white">OM</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-montserrat">
                    {originesMedia.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <span className="text-lg">{originesMedia.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              <blockquote className="text-xl sm:text-2xl text-white/90 leading-relaxed italic">
                "{originesMedia.content}"
              </blockquote>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/60">
                  — Équipe {originesMedia.name}
                </p>
                <p className="text-sm text-cyan-400 font-semibold">
                  {originesMedia.videoType}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {socialProofStats.map((stat, index) => {
              let Icon;
              if (stat.icon === 'Building2') Icon = Building2;
              else if (stat.icon === 'Euro') Icon = Euro;
              else Icon = MapPin;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`${cards.standard.full} text-center`}
                >
                  <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-montserrat">
                    {stat.title}
                  </h3>
                  <p className="text-white/70">{stat.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className={`${cards.minimal.full} text-center`}
          >
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="text-4xl">🎙️</div>
              <h3 className="text-2xl font-bold text-white font-montserrat">
                Rejoignez les Premiers
              </h3>
            </div>

            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Profitez de notre lancement pour créer votre contenu à prix réduit et faire partie de nos premiers clients satisfaits.
            </p>

            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center"
                >
                  <span className="text-3xl">?</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-white/50 mt-4">
              Votre témoignage ici bientôt ?
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
