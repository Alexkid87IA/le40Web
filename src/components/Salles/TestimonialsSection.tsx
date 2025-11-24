import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/salles/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-zinc-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            ILS NOUS FONT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">CONFIANCE</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-inter text-white/60 max-w-2xl mx-auto">
            Plus de 500 événements organisés avec succès
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500">
                <Quote className="w-10 h-10 text-emerald-400/30 mb-6" />
                
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-white/90 font-inter leading-relaxed mb-8">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="text-white font-inter font-bold">{testimonial.name}</p>
                    <p className="text-white/60 font-inter text-sm">{testimonial.role} @ {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
