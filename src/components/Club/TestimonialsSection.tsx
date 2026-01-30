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
      <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 group-hover:border-red-500/30 transition-all">
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
            <p className="text-red-400 text-xs font-semibold mt-1">{testimonial.company}</p>
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
            <TrendingUp className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400">{testimonial.achievement}</span>
          </div>
          <span className="text-xs text-white/40">Membre depuis {testimonial.memberSince}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-medium text-red-400 mb-6"
          >
            ILS TÉMOIGNENT
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            CE QUE DISENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">NOS MEMBRES</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-inter">
            Découvrez les témoignages authentiques de membres qui ont transformé leur activité grâce au Club
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
