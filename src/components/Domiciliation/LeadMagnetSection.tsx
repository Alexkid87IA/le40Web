import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Check } from 'lucide-react';

const SUCCESS_MESSAGE_DURATION = 3000;

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function LeadMagnetSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setIsSubmitting(true);

    // TODO: Intégrer avec le backend
    // await submitEmailToBackend(email);

    setSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, SUCCESS_MESSAGE_DURATION);
  };

  const benefits = [
    { title: 'Checklist complète', description: 'Les 7 docs à préparer avant de domicilier' },
    { title: 'Erreurs à éviter', description: 'Les pièges qui coûtent cher aux débutants' },
    { title: 'Timeline détaillée', description: 'Combien de temps pour chaque étape' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full mb-6">
            <FileText className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-medium text-sm font-montserrat">GUIDE GRATUIT</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-montserrat leading-tight">
            Checklist gratuite : Les 7 documents obligatoires
            <br />
            <span className="text-orange-400">pour domicilier votre entreprise</span>
          </h2>

          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto font-inter">
            Téléchargez notre guide complet (PDF 12 pages) et évitez les erreurs
            qui coûtent en moyenne <strong className="text-white">2 000€</strong> aux entrepreneurs
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg max-w-md mx-auto mb-6"
            >
              <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
                <Check className="w-5 h-5" />
                Merci ! Vérifiez votre email
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <label htmlFor="lead-magnet-email" className="sr-only">
                  Adresse email professionnelle
                </label>
                <input
                  id="lead-magnet-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email professionnel"
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!error}
                  aria-describedby={error ? "email-error" : undefined}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 backdrop-blur-sm font-inter disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Télécharger le guide gratuit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:scale-105 transition-transform whitespace-nowrap flex items-center justify-center gap-2 font-montserrat disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Envoi...' : 'Télécharger'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {error && (
                <motion.p
                  id="email-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-left"
                  role="alert"
                >
                  {error}
                </motion.p>
              )}
            </form>
          )}

          <div className="flex items-center justify-center gap-6 flex-wrap text-sm mb-12">
            {['Sans spam', 'Désinscription en 1 clic', 'Envoi immédiat'].map((text, index) => (
              <span key={index} className="flex items-center gap-2 text-white/60 font-inter">
                <Check className="w-4 h-4 text-green-400" />
                {text}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-orange-400 font-bold mb-2 text-sm font-montserrat">✓ {benefit.title}</div>
                <p className="text-white/60 text-xs font-inter">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
