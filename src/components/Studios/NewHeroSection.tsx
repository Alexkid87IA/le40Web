import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Check, Zap, Star, TrendingUp, Video, Users, Award, Sparkles, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useStudioTracking, ProfileType } from '../../hooks/useStudioTracking';

interface ProfileOption {
  id: ProfileType;
  title: string;
  subtitle: string;
  icon: any;
  gradient: string;
  benefits: string[];
  cta: string;
}

const profileOptions: ProfileOption[] = [
  {
    id: 'creator',
    title: 'Créateur de Contenu',
    subtitle: 'YouTube, TikTok, Podcast',
    icon: Video,
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    benefits: [
      'Setup rapide en 5 min',
      'Formules flexibles dès 79€/h',
      'Technicien expert inclus',
      'Livraison rushs en 2h'
    ],
    cta: 'Voir les Studios Creators'
  },
  {
    id: 'enterprise',
    title: 'Entreprise',
    subtitle: 'Corporate, Marketing, Formation',
    icon: TrendingUp,
    gradient: 'from-emerald-500 via-teal-500 to-green-500',
    benefits: [
      'Qualité broadcast garantie',
      'Accompagnement stratégique',
      'Post-production incluse',
      'Facturation entreprise'
    ],
    cta: 'Solutions Entreprises'
  },
  {
    id: 'agency',
    title: 'Agence',
    subtitle: 'Production, Communication',
    icon: Users,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    benefits: [
      'Tarifs préférentiels volume',
      'Réservations prioritaires',
      'Multi-projets simultanés',
      'Support dédié 24/7'
    ],
    cta: 'Partenariat Agence'
  }
];

export default function NewHeroSection() {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [showProfileSelector, setShowProfileSelector] = useState(true);
  const [availableSlots, setAvailableSlots] = useState(12);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { initSession, trackEvent } = useStudioTracking();

  useEffect(() => {
    initSession();

    const slotsInterval = setInterval(() => {
      setAvailableSlots(prev => Math.max(8, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 15000);

    return () => clearInterval(slotsInterval);
  }, [initSession]);

  const handleProfileSelect = (profileId: ProfileType) => {
    setSelectedProfile(profileId);
    setShowProfileSelector(false);
    trackEvent({
      eventType: 'profile_selected',
      eventData: { profileType: profileId },
      pageSection: 'hero'
    });
  };

  const handlePlayVideo = () => {
    setVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
    trackEvent({
      eventType: 'hero_video_played',
      pageSection: 'hero'
    });
  };

  const currentProfile = selectedProfile ? profileOptions.find(p => p.id === selectedProfile) : null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {!videoPlaying ? (
            <motion.div
              key="poster"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1920)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95"></div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
                poster="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1920"
              >
                <source src="https://videos.pexels.com/video-files/3044127/3044127-uhd_2560_1440_25fps.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute -top-40 left-1/4 w-[900px] h-[900px] rounded-full blur-[150px] ${currentProfile ? `bg-gradient-to-r ${currentProfile.gradient}` : 'bg-cyan-500'} opacity-20`}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 w-full">
        <AnimatePresence mode="wait">
          {showProfileSelector ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-12"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-xl mb-8"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300 font-inter text-sm font-bold">8 Studios Professionnels Disponibles</span>
                </motion.div>

                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-montserrat font-black text-white leading-none mb-8">
                  Produisez du Contenu
                  <br />
                  <span className="relative inline-block mt-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400">
                      Niveau Professionnel
                    </span>
                    <motion.div
                      className="absolute -inset-6 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-teal-500/30 blur-3xl -z-10"
                      animate={{
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </span>
                </h1>

                <p className="text-2xl text-white/80 font-inter max-w-4xl mx-auto mb-12 leading-relaxed">
                  Studios équipés <span className="font-bold text-cyan-400">Sony FX3</span>, technicien inclus, livraison rushs en 2h.
                  <br />Choisissez votre profil pour découvrir nos solutions sur-mesure.
                </p>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-3 mb-16"
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/50"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/90 font-inter font-medium">
                    <span className="text-green-400 font-bold">{availableSlots} créneaux disponibles</span> cette semaine
                  </span>
                </motion.div>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {profileOptions.map((profile, index) => {
                  const Icon = profile.icon;
                  return (
                    <motion.button
                      key={profile.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      onClick={() => handleProfileSelect(profile.id)}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative"
                    >
                      <motion.div
                        className={`absolute -inset-1 bg-gradient-to-r ${profile.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}
                      />
                      <div className="relative bg-slate-900/90 backdrop-blur-2xl border-2 border-white/10 group-hover:border-white/30 rounded-3xl p-8 transition-all duration-500 h-full">
                        <div className={`inline-flex p-5 bg-gradient-to-br ${profile.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>

                        <h3 className="text-3xl font-montserrat font-black text-white mb-2">
                          {profile.title}
                        </h3>
                        <p className="text-white/60 font-inter text-sm mb-6">
                          {profile.subtitle}
                        </p>

                        <div className="space-y-3 mb-8">
                          {profile.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                              <span className="text-white/80 font-inter text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>

                        <div className={`flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r ${profile.gradient} rounded-xl text-white font-montserrat font-bold group-hover:shadow-2xl transition-all duration-300`}>
                          <span>{profile.cta}</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <button
                  onClick={handlePlayVideo}
                  className="group inline-flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-300"
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 group-hover:border-white/60 transition-colors duration-300">
                      <Play className="w-7 h-7 ml-1 fill-white" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-montserrat font-bold text-lg">Découvrir nos studios</div>
                    <div className="text-sm text-white/50">Visite vidéo 360° - 45 secondes</div>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          ) : currentProfile && (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto"
            >
              <motion.button
                onClick={() => setShowProfileSelector(true)}
                className="mb-8 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ x: -5 }}
              >
                <ChevronDown className="w-5 h-5 rotate-90" />
                <span className="font-inter">Changer de profil</span>
              </motion.button>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${currentProfile.gradient} bg-opacity-10 border border-opacity-30 mb-6`}>
                    <currentProfile.icon className="w-4 h-4 text-white" />
                    <span className="text-white font-inter text-sm font-bold">{currentProfile.title}</span>
                  </div>

                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
                    Votre Studio
                    <br />
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentProfile.gradient}`}>
                      {currentProfile.subtitle.split(',')[0]}
                    </span>
                  </h2>

                  <p className="text-xl text-white/80 font-inter mb-8 leading-relaxed">
                    Configuration optimale pour {currentProfile.title.toLowerCase()}s. Équipement professionnel, accompagnement expert et résultats garantis.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {currentProfile.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`p-2 bg-gradient-to-br ${currentProfile.gradient} bg-opacity-10 rounded-lg`}>
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white/80 text-sm leading-tight pt-1">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <motion.a
                      href="#studios"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r ${currentProfile.gradient} text-white rounded-xl font-montserrat font-black text-lg shadow-2xl`}
                      onClick={() => trackEvent({ eventType: 'cta_clicked', ctaClicked: 'hero_main', pageSection: 'hero' })}
                    >
                      <span>Voir les Studios</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.a>

                    <motion.a
                      href="#calculator"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-2xl border-2 border-white/30 hover:border-white/50 text-white rounded-xl font-montserrat font-bold text-lg transition-all duration-300"
                      onClick={() => trackEvent({ eventType: 'cta_clicked', ctaClicked: 'hero_secondary', pageSection: 'hero' })}
                    >
                      Calculer mon projet
                    </motion.a>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2.5 text-white/80 font-inter font-medium">
                      <Star className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                      <span><span className="font-bold text-white">4.9/5</span> (80+ avis)</span>
                    </div>
                    <div className="w-px h-5 bg-white/30"></div>
                    <div className="flex items-center gap-2.5 text-white/80 font-inter font-medium">
                      <Award className="w-5 h-5 text-emerald-400" />
                      <span>Certifié Sony Pro</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <motion.div
                    className={`absolute -inset-4 bg-gradient-to-r ${currentProfile.gradient} rounded-3xl blur-3xl opacity-30`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="text-white/60 text-sm font-inter mb-2">À partir de</div>
                      <div className="flex items-baseline justify-center gap-3 mb-4">
                        <span className={`text-6xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${currentProfile.gradient}`}>
                          {currentProfile.id === 'creator' ? '79€' : currentProfile.id === 'enterprise' ? '149€' : '199€'}
                        </span>
                        <span className="text-xl font-montserrat text-white/70 font-bold">/heure</span>
                      </div>
                      <p className="text-white/60 text-sm">Technicien & matériel inclus</p>
                    </div>

                    <div className="h-px bg-white/10 my-6"></div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Studios disponibles</span>
                        <span className="text-white font-semibold">8 configurations</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Livraison rushs</span>
                        <span className="text-white font-semibold">2h après tournage</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Réservation</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Instantanée
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />
    </section>
  );
}
