import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { DetailedService } from '../../data/domiciliation/services';

interface ServiceCardProps {
  service: DetailedService;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const isFirstService = index === 0;

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
      <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">
        {service.title}
      </h3>

      <div className="mb-6">
        <div className={`text-sm ${service.color} font-semibold mb-3 font-montserrat`}>Ce qu'on fait :</div>
        <ul className="space-y-2 text-white/70 text-sm font-inter">
          {service.features.map((feature, i) => (
            <li key={i}>• {feature}</li>
          ))}
        </ul>
      </div>

      {isFirstService && (
        <div className="mb-6">
          <div className="text-xs text-white/40 mb-3 font-montserrat tracking-wide">APERÇU DE L'INTERFACE :</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative group overflow-hidden rounded-lg border border-white/10 bg-white/5 aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-orange-400/50 mx-auto mb-2" />
                  <div className="text-xs text-white/40 font-inter">Interface de scan</div>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg border border-white/10 bg-white/5 aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Phone className="w-8 h-8 text-blue-400/50 mx-auto mb-2" />
                  <div className="text-xs text-white/40 font-inter">Notif push</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 bg-white/5 rounded-xl border-l-4 border-green-400">
        <div className="text-xs text-green-400 font-semibold mb-1 font-montserrat">TÉMOIGNAGE</div>
        <p className="text-sm text-white/80 italic font-inter">
          "{service.testimonial.quote}"
        </p>
        <p className="text-xs text-white/50 mt-2 font-inter">
          — {service.testimonial.author}, {service.testimonial.role}
        </p>
      </div>
    </motion.div>
  );
}
