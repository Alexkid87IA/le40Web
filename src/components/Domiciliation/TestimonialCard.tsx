import { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Check, Quote } from 'lucide-react';
import { Testimonial } from '../../data/domiciliation/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = memo<TestimonialCardProps>(function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative h-full"
      style={{ transformPerspective: 1000 }}
    >
      <motion.div
        whileHover={{ y: -12, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full"
      >
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <motion.div
          className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 bg-orange-500/20"
        />

        <div className="relative p-8 lg:p-10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-2xl border border-white/[0.08] group-hover:border-orange-500/30 transition-all duration-500 h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <motion.div
            className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <Quote className="w-16 h-16 text-orange-400" />
          </motion.div>

          <div className="relative flex items-center gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-black font-montserrat shadow-xl ring-2 ring-orange-500/20 group-hover:ring-orange-500/40 transition-all">
                {testimonial.initial}
              </div>
            </motion.div>
            <div>
              <div className="font-bold text-white font-montserrat text-lg mb-1 group-hover:text-orange-400 transition-colors">
                {testimonial.name}
              </div>
              <div className="text-sm text-zinc-400 font-inter">{testimonial.role}</div>
            </div>
          </div>

          <div className="relative mb-6 p-5 rounded-xl bg-zinc-800/40 border border-white/5">
            <div className="text-[10px] font-montserrat font-bold tracking-wider text-red-400/80 mb-3 uppercase">
              Avant Le 40
            </div>
            <ul className="text-sm text-white/60 space-y-2 font-inter">
              {testimonial.before.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + i * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-red-400/50 shrink-0 mt-0.5">×</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative mb-8 p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="text-[10px] font-montserrat font-bold tracking-wider text-green-400 mb-3 uppercase flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              Après 6 mois
            </div>
            <ul className="text-sm text-white space-y-3 font-inter">
              {testimonial.after.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + i * 0.05 + 0.1 }}
                  className="flex items-start gap-3 group/item"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="shrink-0 mt-0.5"
                  >
                    {item.metric.includes('+') ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <Check className="w-5 h-5 text-green-400" />
                    )}
                  </motion.div>
                  <span className="group-hover/item:text-white transition-colors">
                    {item.label} : <strong className="text-green-400 font-semibold">{item.metric}</strong>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative p-6 bg-gradient-to-br from-orange-950/30 to-orange-950/10 rounded-xl border-l-4 border-orange-400 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Quote className="absolute top-3 left-3 w-8 h-8 text-orange-400/20" />
            <p className="relative text-sm text-white/80 italic font-inter leading-relaxed pl-8">
              {testimonial.quote}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default TestimonialCard;
