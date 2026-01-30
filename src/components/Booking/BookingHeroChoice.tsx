import { motion } from 'framer-motion';
import { Calendar, Eye, Building2, Users, Award, TrendingUp } from 'lucide-react';

interface BookingHeroChoiceProps {
  onSelectVisit: () => void;
  onSelectService: () => void;
}

export default function BookingHeroChoice({ onSelectVisit, onSelectService }: BookingHeroChoiceProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />

        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center mb-6 md:mb-8"
            >
              <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-white/30 mr-3 md:mr-4" />
              <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
                Réservation
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-white/30 ml-3 md:ml-4" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-montserrat font-bold text-white mb-4 md:mb-6 leading-tight"
            >
              Bienvenue au 40
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-white/60 font-inter max-w-3xl mx-auto mb-8 md:mb-12 px-4"
            >
              Choisissez votre prochaine étape : découvrir nos espaces premium ou réserver directement
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              onClick={onSelectVisit}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-white/10 hover:border-emerald-500/50 transition-all duration-500 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-6 right-6 md:top-8 md:right-8">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-xs md:text-sm font-bold">
                    GRATUIT
                  </div>
                </div>
              </div>

              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8"
                >
                  <Eye className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-3 md:mb-4">
                  Découvrir Le 40
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-white/60 font-inter mb-6 md:mb-8 leading-relaxed">
                  Visitez nos 4000m² d'espaces premium, rencontrez l'équipe et découvrez la communauté. Sans engagement, 100% gratuit.
                </p>

                <div className="space-y-3 mb-6 md:mb-8">
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm md:text-base font-inter">Visite personnalisée 30-45min</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm md:text-base font-inter">Rencontre avec notre équipe</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm md:text-base font-inter">Découverte des services</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-emerald-400 font-montserrat font-semibold group-hover:gap-4 transition-all text-sm md:text-base">
                  <span>Réserver ma visite gratuite</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </div>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              onClick={onSelectService}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-white/10 hover:border-purple-500/50 transition-all duration-500 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <motion.div
                  whileHover={{ rotate: -12, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8"
                >
                  <Building2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-3 md:mb-4">
                  Réserver Maintenant
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-white/60 font-inter mb-6 md:mb-8 leading-relaxed">
                  Accédez directement à tous nos services : espaces de travail, salles, studios, domiciliation et plus encore.
                </p>

                <div className="space-y-3 mb-6 md:mb-8">
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <span className="text-sm md:text-base font-inter">6 services disponibles</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <span className="text-sm md:text-base font-inter">Réservation instantanée</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <span className="text-sm md:text-base font-inter">Tarifs flexibles</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-purple-400 font-montserrat font-semibold group-hover:gap-4 transition-all text-sm md:text-base">
                  <span>Voir tous les services</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </div>
              </div>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { value: '120+', label: 'Entreprises', icon: Users },
              { value: '4000m²', label: "D'espaces", icon: Building2 },
              { value: '24/7', label: 'Accès', icon: Calendar },
              { value: '100%', label: 'Satisfaction', icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 text-center"
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white/40 mx-auto mb-2 md:mb-3" />
                <div className="text-xl sm:text-2xl md:text-3xl font-montserrat font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/60 font-inter">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
