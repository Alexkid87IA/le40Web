import SectionHeader from './SectionHeader';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../../data/domiciliation/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader
          title="Ils ont choisi nos services."
          subtitle="Voici ce qui a changé."
          className="mb-20"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
