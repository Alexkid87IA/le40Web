import { motion } from 'framer-motion';
import { Users, Star, Calendar, Award, TrendingUp } from 'lucide-react';
import { pastEvents } from '../../data/events/pastEvents';
import { useState } from 'react';

export default function PastEventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
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
            src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761792125/f6861355-bc98-4c72-b9bc-fb13a1abdfb7_i7v3kj.mp4#t=0.1"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-slate-950/30 to-black/40" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            Événements{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Passés
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-inter">
            Découvrez nos précédents événements et leur impact sur la communauté
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setSelectedEvent(event.id)}
              onHoverEnd={() => setSelectedEvent(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: selectedEvent === event.id ? 1.1 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <div className="absolute top-6 left-6">
                    <div className="bg-emerald-500/90 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm">
                      {event.categoryName}
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-white text-sm font-bold">{event.rating}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1.5">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span className="text-white text-sm font-bold">{event.attendees}</span>
                    </div>
                  </div>
                </div>

                <div className="relative p-6">
                  <div className="flex items-center gap-2 text-white/50 text-sm mb-3 font-inter">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="text-xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-500">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    {event.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="font-inter">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {event.testimonials.length > 0 && (
                    <div className="border-t border-white/10 pt-4">
                      <div className="text-xs text-white/50 mb-2 font-inter">Témoignage</div>
                      <p className="text-sm text-white/70 italic line-clamp-2 font-inter">
                        "{event.testimonials[0].text}"
                      </p>
                      <div className="mt-2 text-xs text-white/50 font-inter">— {event.testimonials[0].name}</div>
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
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-emerald-950/50 to-teal-950/50 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8">
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                150+
              </div>
              <div className="text-sm text-white/60 font-inter">Événements réalisés</div>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">
                4.8/5
              </div>
              <div className="text-sm text-white/60 font-inter">Satisfaction moyenne</div>
            </div>
            <div className="w-px h-16 bg-white/10" />
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
