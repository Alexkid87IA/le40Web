import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar, Award, CheckCircle } from 'lucide-react';

const benefits = [
  { icon: Users, text: 'Accès à une communauté de 120+ entrepreneurs' },
  { icon: Calendar, text: 'Équipements professionnels et espaces modulables' },
  { icon: Award, text: 'Support logistique et communication inclus' },
  { icon: CheckCircle, text: 'Flexibilité et tarifs préférentiels membres' }
];

export default function OrganizeCTASection() {
  return (
    <section id="organize-event" className="py-20 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Effets visuels (vidéo au niveau page) */}
      <div className="absolute inset-0 pointer-events-none">
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              <Award className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              <span className="text-white/80 font-inter font-medium text-xs md:text-sm">Organisez votre événement</span>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6 leading-tight">
            CRÉEZ VOTRE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              ÉVÉNEMENT
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-12 font-inter"
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
                className="flex items-start gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left group hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl shrink-0">
                  <benefit.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-white/80 font-inter pt-2 text-sm">{benefit.text}</span>
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-montserrat font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
            >
              <span>Proposer mon événement</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white rounded-xl font-montserrat font-bold transition-all"
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

    </section>
  );
}
