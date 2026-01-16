import { motion } from 'framer-motion';
import { Users, Star, Calendar, Award, TrendingUp } from 'lucide-react';
import { pastEvents } from '../../data/events/pastEvents';
import { useState } from 'react';

export default function PastEventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
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
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-4 md:mb-6">
            Événements{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              Passés
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-inter px-4">
            Découvrez nos précédents événements et leur impact sur la communauté
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 auto-rows-fr">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setSelectedEvent(event.id)}
              onHoverEnd={() => setSelectedEvent(null)}
              className="group relative flex"
            >
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-950/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-500 flex flex-col w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-44 md:h-56 overflow-hidden shrink-0">
                  <motion.img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: selectedEvent === event.id ? 1.1 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                  <div className="absolute top-3 left-3 md:top-4 md:left-4 lg:top-6 lg:left-6 flex items-center gap-2 md:gap-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs lg:text-sm font-bold shadow-lg">
                      {event.categoryName}
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-white text-sm font-bold">{event.rating}</span>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 md:top-4 md:right-4 lg:top-6 lg:right-6">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1.5">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-white text-sm font-bold">{event.attendees}</span>
                    </div>
                  </div>
                </div>

                <div className="relative p-4 md:p-5 lg:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-white/50 text-xs md:text-sm mb-2 md:mb-3 font-inter">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="text-base md:text-lg lg:text-xl font-montserrat font-bold text-white mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 md:space-y-2 mb-4 md:mb-6 flex-1">
                    {event.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span className="font-inter line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {event.testimonials.length > 0 && (
                    <div className="border-t border-white/10 pt-4 mt-auto">
                      <div className="text-[10px] md:text-xs text-white/50 mb-2 font-inter">Témoignage</div>
                      <p className="text-xs md:text-sm text-white/70 italic line-clamp-2 font-inter">
                        "{event.testimonials[0].text}"
                      </p>
                      <div className="mt-2 text-[10px] md:text-xs text-white/50 font-inter">— {event.testimonials[0].name}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 lg:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 bg-gradient-to-r from-cyan-950/50 to-blue-950/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8">
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                150+
              </div>
              <div className="text-sm text-white/60 font-inter">Événements réalisés</div>
            </div>
            <div className="w-full h-px sm:w-px sm:h-12 md:h-16 bg-white/10" />
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">
                4.8/5
              </div>
              <div className="text-sm text-white/60 font-inter">Satisfaction moyenne</div>
            </div>
            <div className="w-full h-px sm:w-px sm:h-12 md:h-16 bg-white/10" />
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                2500+
              </div>
              <div className="text-sm text-white/60 font-inter">Participants ravis</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
