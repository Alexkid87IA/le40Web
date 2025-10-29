import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, TrendingUp } from 'lucide-react';
import { clubTestimonials } from '../../data/club/testimonials';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group h-full"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

      <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all">
        <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />

        <div className="flex items-start gap-4 mb-6">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
          />
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg">{testimonial.name}</h3>
            <p className="text-white/60 text-sm">{testimonial.role}</p>
            <p className="text-orange-400 text-xs font-semibold mt-1">{testimonial.company}</p>
          </div>
        </div>

        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
          ))}
        </div>

        <p className="text-white/80 leading-relaxed mb-6 italic">
          "{testimonial.quote}"
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">{testimonial.achievement}</span>
          </div>
          <span className="text-xs text-white/40">Membre depuis {testimonial.memberSince}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-slate-950 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-sm font-semibold text-amber-400 mb-6"
          >
            ILS TÉMOIGNENT
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ce que disent
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
              nos membres
            </span>
          </h2>

          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Découvrez les témoignages authentiques de membres qui ont transformé leur activité grâce au Club
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
