import { motion } from 'framer-motion';
import { TrendingUp, Check } from 'lucide-react';
import { Testimonial } from '../../data/domiciliation/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="p-8 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
          {testimonial.initial}
        </div>
        <div>
          <div className="font-bold text-white">{testimonial.name}</div>
          <div className="text-sm text-zinc-400">{testimonial.role}</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-xs text-zinc-400 mb-2">AVANT LE 40 :</div>
        <ul className="text-sm text-white/60 space-y-1">
          {testimonial.before.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <div className="text-xs text-green-400 mb-2">APRÈS 6 MOIS :</div>
        <ul className="text-sm text-white space-y-1">
          {testimonial.after.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              {item.metric.includes('+') ? (
                <TrendingUp className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              ) : (
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              )}
              <span>{item.label} : <strong>{item.metric}</strong></span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-white/5 rounded-xl border-l-4 border-orange-400">
        <p className="text-sm text-white/80 italic">"{testimonial.quote}"</p>
      </div>
    </motion.div>
  );
}
