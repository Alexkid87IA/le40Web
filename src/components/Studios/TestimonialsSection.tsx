import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { studioTestimonials } from '../../data/studios/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Témoignages
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            ILS ONT CRÉÉ LEUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-500">
              CONTENU AVEC NOUS
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-inter">
            Créateurs, podcasteurs et entrepreneurs partagent leur expérience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {studioTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-1.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                  ))}
                </div>

                <p className="text-white/90 font-inter text-lg leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white font-inter font-bold">{testimonial.name}</p>
                      <p className="text-white/60 font-inter text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="bg-cyan-500/20 text-cyan-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {testimonial.videoType}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-cyan-400 fill-cyan-400" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-montserrat font-bold text-lg">5.0/5</div>
              <div className="text-white/60 font-inter text-sm">Note moyenne sur 80+ productions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
