import { motion } from 'framer-motion';
import { DetailedService } from '../../data/domiciliation/services';

interface ServiceCardProps {
  service: DetailedService;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`p-8 bg-gradient-to-br ${service.bgColor} border border-zinc-700 rounded-2xl`}
    >
      <service.icon className={`w-12 h-12 ${service.color} mb-6`} />
      <h3 className="text-2xl font-bold text-white mb-4">
        {service.title}
      </h3>

      <div className="mb-6">
        <div className={`text-sm ${service.color} font-semibold mb-3`}>Ce qu'on fait :</div>
        <ul className="space-y-2 text-white/70 text-sm">
          {service.features.map((feature, i) => (
            <li key={i}>• {feature}</li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-white/5 rounded-xl border-l-4 border-green-400">
        <div className="text-xs text-green-400 font-semibold mb-1">TÉMOIGNAGE</div>
        <p className="text-sm text-white/80 italic">
          "{service.testimonial.quote}"
        </p>
        <p className="text-xs text-white/50 mt-2">
          — {service.testimonial.author}, {service.testimonial.role}
        </p>
      </div>
    </motion.div>
  );
}
