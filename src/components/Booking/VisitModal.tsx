import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Z_INDEX } from '../../utils/zIndex';

interface VisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VisitModal({ isOpen, onClose }: VisitModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const timeSlots = [
    { value: 'morning', label: 'Matin (9h-12h)', time: '09:00' },
    { value: 'afternoon', label: 'Après-midi (14h-17h)', time: '14:00' }
  ];

  const today = new Date().toISOString().split('T')[0];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Le créneau horaire est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const selectedTimeSlot = timeSlots.find(slot => slot.value === formData.timeSlot);

      const { error } = await supabase
        .from('visit_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferred_date: formData.date,
          preferred_time: selectedTimeSlot?.time || formData.timeSlot,
          office_title: null,
          office_price: null,
          message: formData.message || null,
          status: 'pending'
        }]);

      if (error) throw error;

      setSubmitStatus('success');

      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', message: '' });
        setSubmitStatus('idle');
        setErrors({});
      }, 2500);
    } catch (error) {
      console.error('Error submitting visit request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: Z_INDEX.modal }}>
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
            className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="p-6 sm:p-8">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-white mb-4">
                    Visite Confirmée !
                  </h3>
                  <p className="text-base sm:text-lg text-white/70 font-inter max-w-md mx-auto">
                    Votre demande de visite a été enregistrée. Nous vous contactons sous 2h pour confirmer le créneau.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-6 sm:mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
                    >
                      <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-2 sm:mb-3">
                      Réservez Votre Visite Gratuite
                    </h2>
                    <p className="text-sm sm:text-base text-white/60 font-inter">
                      Découvrez nos espaces et rencontrez l'équipe - Sans engagement
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`w-full bg-white/10 border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-xl px-12 py-3 sm:py-4 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 transition-colors`}
                          placeholder="Jean Dupont"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-xl px-12 py-3 sm:py-4 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 transition-colors`}
                            placeholder="jean@exemple.fr"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                          Téléphone *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-xl px-12 py-3 sm:py-4 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 transition-colors`}
                            placeholder="06 12 34 56 78"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                        Date souhaitée *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="date"
                          value={formData.date}
                          min={today}
                          onChange={(e) => handleChange('date', e.target.value)}
                          className={`w-full bg-white/10 border ${errors.date ? 'border-red-500' : 'border-white/20'} rounded-xl px-12 py-3 sm:py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                        />
                      </div>
                      {errors.date && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-medium text-white/80 mb-3">
                        Créneau horaire *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => handleChange('timeSlot', slot.value)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                              formData.timeSlot === slot.value
                                ? 'bg-emerald-600/20 border-emerald-500 text-white'
                                : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                            }`}
                          >
                            <Clock className="w-5 h-5" />
                            <span className="font-inter font-medium">{slot.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.timeSlot && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.timeSlot}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                        Message (optionnel)
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                        <textarea
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          rows={4}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 sm:py-4 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                          placeholder="Précisez vos besoins..."
                        />
                      </div>
                    </div>

                    {submitStatus === 'error' && (
                      <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-200">
                          Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-montserrat font-bold py-4 sm:py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirmer ma visite gratuite</span>
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs sm:text-sm text-center text-white/50 font-inter">
                      Nous vous recontactons sous 2h pour confirmer votre créneau
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
