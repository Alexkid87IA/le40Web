import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Check, Mail, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const quickFeatures = [
  "Accès immédiat à tous les événements",
  "Réseau de 120+ entrepreneurs actifs",
  "Sans engagement, annulation facile",
  "Première visite découverte offerte"
];

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
    } catch (err) {
      console.error('Error submitting notification request:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="notify" className="py-40 relative overflow-hidden bg-gradient-to-b from-slate-950 to-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black to-rose-900/20" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/30 text-sm font-semibold text-red-400 mb-8"
          >
            <Sparkles className="w-4 h-4" />
            LANCEMENT IMMINENT
          </motion.span>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8">
            <span className="text-white">Soyez parmi</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">
              les Premiers
            </span>
          </h2>

          <p className="text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Le Club Le 40 ouvre bientôt ses portes. Inscrivez-vous pour être notifié en avant-première
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12"
          >
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 text-white/80"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-left">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto mb-12 p-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Merci pour votre inscription !</h3>
              <p className="text-white/70">
                Vous serez parmi les premiers informés du lancement du Club. À très bientôt !
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleNotifyMe}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto mb-12"
            >
              <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Votre nom (optionnel)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-red-400/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-red-400/50 transition-colors"
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="group relative w-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 rounded-xl text-white font-bold text-lg shadow-xl">
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
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            </motion.form>
          )}

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-white font-bold text-base hover:bg-white/10 hover:border-white/30 transition-all shadow-xl mb-12"
          >
            <Calendar className="w-5 h-5" />
            Planifier une Visite
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="inline-flex flex-col gap-4 p-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl"
          >
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">
                  50€
                </div>
                <div className="text-sm text-white/60">par mois</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                  15+
                </div>
                <div className="text-sm text-white/60">événements</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">
                  120+
                </div>
                <div className="text-sm text-white/60">membres</div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-12 text-white/40 text-sm"
          >
            🔒 Paiement sécurisé • ⚡ Activation immédiate • 💝 Sans engagement • 🎁 Visite offerte
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
