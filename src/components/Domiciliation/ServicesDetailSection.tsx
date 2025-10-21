import SectionHeader from './SectionHeader';
import ServiceCard from './ServiceCard';
import { detailedServices } from '../../data/domiciliation/services';

export default function ServicesDetailSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader
          title="Voici"
          highlightedText="EXACTEMENT"
          subtitle="ce qu'on fait pour vous (et pourquoi nos clients restent)"
          className="mb-20"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {detailedServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
