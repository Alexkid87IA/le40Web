import { memo } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonial } from '../../data/domiciliation/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = memo<TestimonialCardProps>(function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative h-full"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full"
      >
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-orange-400/25 transition-all duration-500 h-full overflow-hidden flex flex-col">
          {/* Photo + Identité */}
          <div className="relative p-6 md:p-8 pb-0 md:pb-0 flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-orange-400/30 transition-all duration-500">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white font-montserrat mb-1 group-hover:text-orange-400 transition-colors duration-300">
                {testimonial.name}
              </h3>
              <p className="text-sm text-white/60 font-inter">
                {testimonial.role} · <span className="text-orange-400/80">{testimonial.company}</span>
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="px-6 md:px-8 pt-5">
            <p className="text-sm text-white/50 font-inter leading-relaxed">
              {testimonial.bio}
            </p>
          </div>

          {/* Citation */}
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-end">
            <div className="relative p-5 md:p-6 bg-gradient-to-br from-orange-950/30 to-transparent rounded-xl border border-orange-500/15 overflow-hidden">
              <Quote className="absolute top-3 right-3 w-8 h-8 text-orange-400/10" />
              <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-amber-500"></div>
              <p className="relative text-sm md:text-base text-white/85 italic font-inter leading-relaxed pl-4">
                {testimonial.quote}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default TestimonialCard;
