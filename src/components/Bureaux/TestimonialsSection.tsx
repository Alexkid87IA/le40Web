import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { bureauTestimonials } from '../../data/bureaux/testimonials';

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
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            ILS ONT TROUVÉ LEUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">QG IDÉAL</span>
          </h2>
          <p className="text-xl font-inter text-white/60 max-w-2xl mx-auto">
            Découvrez comment 127 équipes ont transformé leur façon de travailler avec un bureau privé au Le 40
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bureauTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-emerald-400" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                    ))}
                  </div>
                  <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="text-emerald-400 font-inter text-xs font-bold">{testimonial.officeType}</span>
                  </div>
                </div>

                <blockquote className="text-white/90 font-inter text-lg leading-relaxed mb-6">
                  "{testimonial.comment}"
                </blockquote>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/30"
                    />
                    <div>
                      <div className="font-montserrat font-bold text-white text-base">{testimonial.name}</div>
                      <div className="text-white/60 text-sm font-inter">{testimonial.role}</div>
                      <div className="text-emerald-400 text-xs font-inter font-semibold">{testimonial.company} • {testimonial.industry}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-white/50 font-inter">
                      <span className="text-emerald-400 font-semibold">{testimonial.teamSize}</span> • {testimonial.duration}
                    </div>
                  </div>
                </div>

                {testimonial.highlight && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-xl">
                    <div className="text-emerald-400 font-inter text-sm font-semibold text-center">
                      🎯 {testimonial.highlight}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">127</div>
              <div className="text-white/60 text-sm">Entreprises hébergées</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">4.9/5</div>
              <div className="text-white/60 text-sm">Satisfaction moyenne</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">98%</div>
              <div className="text-white/60 text-sm">Renouvellent leur contrat</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
