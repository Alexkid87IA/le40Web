import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Calendar, Award, CheckCircle } from 'lucide-react';

const benefits = [
  { icon: Users, text: 'Accès à une communauté de 120+ entrepreneurs' },
  { icon: Calendar, text: 'Équipements professionnels et espaces modulables' },
  { icon: Award, text: 'Support logistique et communication inclus' },
  { icon: CheckCircle, text: 'Flexibilité et tarifs préférentiels membres' }
];

export default function OrganizeCTASection() {
  return (
    <section id="organize-event" className="py-20 md:py-32 lg:py-40 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: 'scaleY(-1)',
            filter: 'brightness(0.6)',
            playbackRate: 0.5
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.5;
            }
          }}
        >
          <source
            src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761792125/f6861355-bc98-4c72-b9bc-fb13a1abdfb7_i7v3kj.mp4#t=0.1"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-slate-950/30 to-black/40" />

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />

        <motion.div
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-3">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              <span className="text-white/80 font-inter font-medium text-xs md:text-sm">Organisez votre événement</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-black text-white mb-6 md:mb-8 leading-tight"
          >
            Créez Votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              Événement
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto mb-8 md:mb-10 lg:mb-12 leading-relaxed font-inter px-4"
          >
            Vous souhaitez organiser un atelier, une conférence ou un événement de networking dans nos espaces ?
            Nous mettons à votre disposition nos infrastructures professionnelles et notre communauté engagée.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 md:gap-4 bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 text-left group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-2 md:p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg md:rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                </div>
                <span className="relative z-10 text-white/80 font-inter pt-1.5 md:pt-2 text-sm md:text-base">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 hover:from-cyan-400 hover:via-blue-400 hover:to-amber-400 text-white rounded-xl font-montserrat font-bold text-sm md:text-base lg:text-lg transition-all duration-300 shadow-lg"
            >
              <span>Proposer mon événement</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-slate-950/50 hover:bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white rounded-xl font-montserrat font-bold text-sm md:text-base lg:text-lg transition-all duration-300"
            >
              Demander des informations
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-6 md:mt-8 text-white/50 text-xs md:text-sm font-inter"
          >
            Gratuit pour les membres • Tarifs préférentiels • Support inclus
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseOrganizeCTA">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseOrganizeCTA)" />
        </svg>
      </div>
    </section>
  );
}
