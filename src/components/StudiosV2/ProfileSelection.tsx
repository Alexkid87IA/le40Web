import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profiles } from '../../data/studiosLaunch/config';

interface ProfileSelectionProps {
  onSelectProfile: (profileId: string) => void;
}

export default function ProfileSelection({ onSelectProfile }: ProfileSelectionProps) {
  const handleSelect = (profileId: string) => {
    onSelectProfile(profileId);

    const configurator = document.getElementById('configurator');
    if (configurator) {
      setTimeout(() => {
        configurator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Quel est votre projet ?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choisissez votre profil pour voir les studios adaptés
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {profile.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-semibold rounded-full shadow-lg">
                    {profile.badge}
                  </div>
                </div>
              )}

              <div className="h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 group cursor-pointer"
                onClick={() => handleSelect(profile.id)}
              >
                <div className="text-6xl mb-6">{profile.icon}</div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                  {profile.title}
                </h3>

                <p className="text-slate-400 mb-6">
                  {profile.subtitle}
                </p>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-300 mb-3">
                    Parfait pour :
                  </p>
                  <ul className="space-y-2">
                    {profile.benefits.map((benefit, i) => (
                      <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                        <span className="text-violet-400 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <p className="text-sm text-slate-400 mb-3">
                    À partir de
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">
                      {profile.startingPrice}€
                    </span>
                    <span className="text-slate-400">/h</span>
                  </div>

                  <button
                    onClick={() => handleSelect(profile.id)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-violet-500/25"
                  >
                    Voir mes options
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-400 mt-8"
        >
          Pas sûr de votre profil ?{' '}
          <button
            onClick={() => handleSelect('all')}
            className="text-violet-400 hover:text-violet-300 underline font-semibold"
          >
            Voir tous les studios
          </button>
        </motion.p>
      </div>
    </section>
  );
}
