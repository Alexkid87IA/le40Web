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
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative h-full"
    >
      <motion.div
        whileHover={{ y: -16, scale: 1.015 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full"
      >
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-orange-400/20 via-amber-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <motion.div
          className="absolute -inset-[3px] rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 bg-gradient-to-br from-orange-500/25 to-amber-500/20"
        />

        <div className="relative p-10 lg:p-12 bg-gradient-to-br from-zinc-900/95 via-zinc-900/92 to-zinc-950/98 backdrop-blur-2xl rounded-3xl border border-white/[0.06] group-hover:border-orange-400/25 transition-all duration-500 h-full overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-500/[0.12] via-amber-500/[0.08] to-transparent rounded-bl-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
          </div>

          <motion.div
            className="absolute top-8 right-8 opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-700"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Quote className="w-20 h-20 text-orange-400" />
          </motion.div>

          <div className="relative flex items-center gap-5 mb-10">
            <motion.div
              whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-white text-3xl font-black font-montserrat shadow-2xl ring-4 ring-orange-500/15 group-hover:ring-orange-400/35 transition-all">
                {testimonial.initial}
              </div>
            </motion.div>
            <div>
              <div className="font-bold text-white font-montserrat text-xl mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300">
                {testimonial.name}
              </div>
              <div className="text-sm text-zinc-400 font-inter font-medium">{testimonial.role}</div>
            </div>
          </div>

          <div className="relative mb-7 p-6 rounded-2xl bg-gradient-to-br from-red-950/30 via-zinc-900/40 to-zinc-900/30 border border-red-500/15 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="text-[11px] font-montserrat font-bold tracking-widest text-red-400/90 uppercase">
                Avant Le 40
              </div>
            </div>
            <ul className="text-sm text-white/65 space-y-3 font-inter">
              {testimonial.before.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + i * 0.06 }}
                  className="flex items-start gap-3 group/item"
                >
                  <span className="text-red-400/60 shrink-0 mt-1 text-lg group-hover/item:text-red-400 transition-colors">×</span>
                  <span className="group-hover/item:text-white/80 transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative mb-10 p-6 rounded-2xl bg-gradient-to-br from-orange-950/40 via-amber-950/30 to-zinc-900/30 border border-orange-500/25 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                <div className="text-[11px] font-montserrat font-bold tracking-widest text-orange-400 uppercase">
                  Après 6 mois
                </div>
              </div>
              <ul className="text-sm text-white space-y-4 font-inter">
                {testimonial.after.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + i * 0.06 + 0.15 }}
                    className="flex items-start gap-4 group/item"
                  >
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0 mt-0.5"
                    >
                      {item.metric.includes('+') ? (
                        <TrendingUp className="w-6 h-6 text-orange-400" />
                      ) : (
                        <Check className="w-6 h-6 text-orange-400" />
                      )}
                    </motion.div>
                    <span className="text-white/90 group-hover/item:text-white transition-colors">
                      {item.label} : <strong className="text-orange-400 font-bold text-base">{item.metric}</strong>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative p-7 bg-gradient-to-br from-orange-950/40 via-orange-900/20 to-transparent rounded-2xl border border-orange-500/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.08] via-amber-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-500 to-amber-500"></div>
            <Quote className="absolute top-4 left-4 w-10 h-10 text-orange-400/[0.15]" />
            <p className="relative text-base text-white/85 italic font-inter leading-relaxed pl-10">
              {testimonial.quote}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default TestimonialCard;
