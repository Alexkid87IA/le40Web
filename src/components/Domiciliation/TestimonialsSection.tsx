import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../../data/domiciliation/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-orange-500/8"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <SectionHeader
          title="Ils ont choisi nos services."
          subtitle="Voici ce qui a changé."
          className="mb-20"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/[0.03] backdrop-blur-xl rounded-xl border border-white/10">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-zinc-900 flex items-center justify-center text-white text-xs font-bold"
                >
                  {['A', 'M', 'S'][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-semibold font-montserrat">120+ entreprises</div>
              <div className="text-white/40 text-sm font-inter">nous font confiance</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
