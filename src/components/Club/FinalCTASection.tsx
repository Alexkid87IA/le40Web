import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail, Phone, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function FinalCTASection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: name || 'Prospect Club',
            email,
            message: 'Demande de notification pour le lancement du Club Le 40',
            subject: 'Liste d\'attente Club',
          }
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setEmail('');
      setName('');
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="notify" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-red-600/10 via-rose-600/10 to-red-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/30 backdrop-blur-sm mb-8"
          >
            <span className="text-red-300 font-inter text-sm font-bold">Lancement imminent</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6 leading-tight">
            SOYEZ PARMI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">
              LES PREMIERS
            </span>
          </h2>

          <p className="text-base md:text-lg font-inter text-white/70 mb-12 max-w-2xl mx-auto">
            Le Club Le 40 ouvre bientôt ses portes. Inscrivez-vous pour être notifié en avant-première et bénéficier d'un tarif de lancement exclusif.
          </p>

          {/* 3 cards CTA */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 - Notification */}
            <div className="group">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-red-500/50 transition-all duration-300 h-full"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                  Être notifié
                </h3>
                <p className="text-white/70 font-inter text-sm mb-4">
                  Recevez un email dès l'ouverture du Club et profitez du tarif early-bird
                </p>
                <div className="inline-flex items-center gap-2 text-red-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  S'inscrire ci-dessous
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </div>

            {/* Card 2 - Appeler */}
            <a href="tel:+33491962151" className="group">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-rose-500/50 transition-all duration-300 h-full"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                  Appeler maintenant
                </h3>
                <p className="text-white/70 font-inter text-sm mb-4">
                  Posez vos questions directement à notre équipe
                </p>
                <div className="inline-flex items-center gap-2 text-rose-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  04 91 96 21 51
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </a>

            {/* Card 3 - Visite */}
            <a href="/reserver-visite" className="group">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-red-500/50 transition-all duration-300 h-full"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3">
                  Planifier une visite
                </h3>
                <p className="text-white/70 font-inter text-sm mb-4">
                  Découvrez nos espaces et rencontrez la communauté
                </p>
                <div className="inline-flex items-center gap-2 text-red-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Réserver un créneau
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </a>
          </div>

          {/* Formulaire notification */}
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto mb-12 p-8 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-montserrat font-bold text-white mb-2">Merci pour votre inscription !</h3>
              <p className="text-white/70 font-inter text-sm">
                Vous serez parmi les premiers informés du lancement du Club. À très bientôt !
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleNotifyMe}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto mb-12"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Votre nom (optionnel)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-red-400/50 transition-colors font-inter text-sm"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-red-400/50 transition-colors font-inter text-sm"
                />
                {error && (
                  <p className="text-red-400 text-sm font-inter">{error}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl text-white font-montserrat font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Mail className="w-5 h-5" />
                      </motion.div>
                      <span>Inscription en cours...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>Me notifier du lancement</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* Info bar */}
          <div className="p-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-2xl">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span className="text-white/80 font-inter text-sm">
                  Dès <span className="text-red-400 font-bold">50€/mois</span>
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="text-white/80 font-inter text-sm">
                <span className="text-red-400 font-bold">15+ événements</span> par mois
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="text-white/80 font-inter text-sm">
                Visite <span className="text-red-400 font-bold">sans engagement</span>
              </div>
            </div>
          </div>

          <p className="text-white/40 font-inter text-xs mt-8">
            En vous inscrivant, vous acceptez d'être contacté par notre équipe lors du lancement du Club
          </p>
        </motion.div>
      </div>
    </section>
  );
}
