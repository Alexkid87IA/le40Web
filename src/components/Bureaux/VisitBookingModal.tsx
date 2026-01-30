import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface VisitBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  officeTitle?: string;
  officePrice?: string;
}

export default function VisitBookingModal({ isOpen, onClose, officeTitle, officePrice }: VisitBookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('visit_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferred_date: formData.date,
          preferred_time: formData.time,
          office_title: officeTitle || null,
          office_price: officePrice || null,
          message: formData.message,
          status: 'pending'
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
        setSubmitStatus('idle');
      }, 2000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <Calendar className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-montserrat font-bold text-white mb-3">
                  Réserver une visite
                </h2>
                <p className="text-white/70 font-inter">
                  Choisissez votre créneau et découvrez nos espaces
                </p>
                {officeTitle && (
                  <div className="mt-4 inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                    <p className="text-blue-400 font-semibold">{officeTitle}</p>
                    {officePrice && <p className="text-white/70 text-sm">{officePrice}</p>}
                  </div>
                )}
              </div>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-montserrat font-bold text-white mb-2">Demande envoyée{'\u00A0'}!</h3>
                  <p className="text-white/70">Nous vous contacterons rapidement pour confirmer votre visite.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-montserrat font-semibold mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-montserrat font-semibold mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="jean@exemple.fr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-montserrat font-semibold mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-montserrat font-semibold mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Date souhaitée *
                      </label>
                      <input
                        type="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-montserrat font-semibold mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Heure souhaitée *
                      </label>
                      <select
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-slate-800">Choisir un créneau</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-slate-800">{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-montserrat font-semibold mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message (optionnel)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="Des questions ou besoins spécifiques ?"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
                    >
                      <p className="text-red-400 text-sm">Une erreur est survenue. Veuillez réessayer.</p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-montserrat font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Confirmer ma visite'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
