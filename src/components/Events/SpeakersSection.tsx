import { motion } from 'framer-motion';
import { Star, Award, Calendar, Linkedin, ExternalLink } from 'lucide-react';
import { eventSpeakers } from '../../data/events/speakers';
import { useState } from 'react';

export default function SpeakersSection() {
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Effet lumineux (vidéo au niveau page) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-sm font-medium text-cyan-400 mb-6"
          >
            EXPERTS
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            NOS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              INTERVENANTS
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto font-inter">
            Des experts reconnus qui partagent leur savoir-faire et leur expérience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
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
                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col w-full">
                  <div className="relative h-52 md:h-64 overflow-hidden shrink-0">
                    <motion.img
                      src={speaker.photoUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

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
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
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

    </section>
  );
}
