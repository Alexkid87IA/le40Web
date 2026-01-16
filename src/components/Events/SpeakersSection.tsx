import { motion } from 'framer-motion';
import { Star, Award, Calendar, Linkedin, ExternalLink } from 'lucide-react';
import { eventSpeakers } from '../../data/events/speakers';
import { useState } from 'react';

export default function SpeakersSection() {
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: 'scaleY(-1)',
            filter: 'brightness(0.6)',
            playbackRate: 0.5
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.5;
            }
          }}
        >
          <source
            src="https://le40-cdn.b-cdn.net/videos/hero/hero-background.mp4#t=0.1"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-slate-950/30 to-black/40" />
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-4 md:mb-6">
            Nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              Intervenants
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-inter px-4">
            Des experts reconnus qui partagent leur savoir-faire et leur expérience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 auto-rows-fr">
          {eventSpeakers.map((speaker, index) => {
            const isHovered = hoveredSpeaker === speaker.id;

            return (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredSpeaker(speaker.id)}
                onHoverEnd={() => setHoveredSpeaker(null)}
                className="group relative flex"
              >
                <div className="relative h-full bg-slate-950/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 flex flex-col w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-52 md:h-64 overflow-hidden shrink-0">
                    <motion.img
                      src={speaker.photoUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1.5">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-white text-sm font-bold">{speaker.rating}</span>
                        </div>

                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1.5">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span className="text-white text-sm font-bold">{speaker.totalEvents}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-montserrat font-bold text-white mb-2">
                      {speaker.name}
                    </h3>
                    <div className="text-cyan-400 text-xs md:text-sm font-semibold mb-3 md:mb-4 font-inter">
                      {speaker.title}
                    </div>

                    <p className="text-white/70 mb-4 md:mb-6 leading-relaxed text-xs md:text-sm font-inter line-clamp-3">
                      {speaker.bio}
                    </p>

                    <div className="mb-6 flex-1">
                      <div className="text-[10px] md:text-xs text-white/50 mb-2 md:mb-3 font-inter">Domaines d'expertise</div>
                      <div className="flex flex-wrap gap-2">
                        {speaker.expertiseAreas.slice(0, 3).map((area, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-1 md:px-3 md:py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-md md:rounded-lg text-cyan-300 text-[10px] md:text-xs font-semibold"
                          >
                            {area}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      {speaker.linkedinUrl && (
                        <motion.a
                          href={speaker.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base"
                        >
                          <Linkedin className="w-5 h-5" />
                          <span className="font-inter">Voir le profil</span>
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-cyan-950/50 to-blue-950/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 mx-4">
            <Award className="w-6 h-6 text-cyan-400" />
            <span className="text-white font-inter text-sm md:text-base">
              Vous souhaitez intervenir ?{' '}
              <a href="#organize-event" className="text-cyan-400 hover:text-cyan-300 font-bold underline">
                Proposez votre expertise
              </a>
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseSpeakers">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseSpeakers)" />
        </svg>
      </div>
    </section>
  );
}
