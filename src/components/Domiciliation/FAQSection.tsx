import { useState } from 'react';
import { Search } from 'lucide-react';
import SectionHeader from './SectionHeader';
import FAQItem from './FAQItem';
import { faqItems } from '../../data/domiciliation/faq';

export default function FAQSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-black">
      <div className="max-w-4xl mx-auto px-8">
        <SectionHeader
          title="Les vraies questions"
          highlightedText="sur nos services"
          className="mb-12"
        />

        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Rechercher dans la FAQ..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openFaqIndex === index}
              onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
