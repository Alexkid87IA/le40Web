import { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Quote } from 'lucide-react';
import { DetailedService } from '../../data/domiciliation/services';

interface ServiceCardProps {
  service: DetailedService;
  index: number;
}

const ServiceCard = memo<ServiceCardProps>(function ServiceCard({ service, index }) {
  const isFirstService = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative h-full"
    >
      <motion.div
        whileHover={{ y: -12, scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full"
      >
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <motion.div
          className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.color.replace('text-', '').replace('-400', '-500').replace('-', ' ')}/25, transparent 70%)`
          }}
        />

        <div className="relative h-full bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-950/95 backdrop-blur-2xl rounded-3xl border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-500/[0.08] via-transparent to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          <div className="relative p-10">
            <motion.div
              className="relative mb-8"
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${service.color.replace('text-', '').replace('-400', '-500').replace('-', ' ')}/40, transparent)`
                }}></div>
              <div className={`relative inline-flex p-5 rounded-2xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-500 shadow-lg`}>
                <service.icon className={`w-14 h-14 ${service.color}`} />
              </div>
            </motion.div>

            <h3 className="text-3xl font-bold text-white mb-3 font-montserrat group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-500">
              {service.title}
            </h3>

            <div className="mb-8">
              <div className={`inline-block text-xs ${service.color} font-bold mb-4 font-montserrat tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/[0.04] border border-current/20`}>
                Ce qu'on fait
              </div>
              <ul className="space-y-3 text-white/70 text-sm font-inter">
                {service.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 + i * 0.05 }}
                    className="flex items-start gap-3 group/item"
                  >
                    <span className={`${service.color} mt-1 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300`}>▸</span>
                    <span className="group-hover/item:text-white/90 transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {isFirstService && (
              <div className="mb-8">
                <div className="text-[10px] text-white/50 mb-4 font-montserrat tracking-widest uppercase font-semibold">Aperçu de l'interface</div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="relative group/preview overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] aspect-[4/3] hover:border-orange-400/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Mail className="w-10 h-10 text-orange-400/60 mx-auto mb-2 group-hover/preview:text-orange-400 transition-colors" />
                        <div className="text-xs text-white/60 font-inter font-medium">Interface de scan</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="relative group/preview overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] aspect-[4/3] hover:border-blue-400/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Phone className="w-10 h-10 text-blue-400/60 mx-auto mb-2 group-hover/preview:text-blue-400 transition-colors" />
                        <div className="text-xs text-white/60 font-inter font-medium">Notif push</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative p-6 bg-gradient-to-br from-orange-950/40 via-orange-950/20 to-transparent rounded-2xl border border-orange-500/20 overflow-hidden group/testimonial"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.06] to-transparent opacity-0 group-hover/testimonial:opacity-100 transition-opacity duration-500"></div>

              <Quote className="absolute top-4 right-4 w-12 h-12 text-orange-400/10 group-hover/testimonial:text-orange-400/20 transition-colors" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
                  <div className="text-[10px] text-orange-400 font-bold font-montserrat tracking-widest uppercase">Témoignage</div>
                </div>
                <p className="text-base text-white/85 italic font-inter leading-relaxed mb-4">
                  "{service.testimonial.quote}"
                </p>
                <p className="text-xs text-white/50 font-inter font-medium">
                  — {service.testimonial.author}, <span className="text-orange-400/70">{service.testimonial.role}</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default ServiceCard;
