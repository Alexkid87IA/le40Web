import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ReserverVisite() {
  const navigate = useNavigate();
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
          preferred_time: selectedTimeSlot?.label || formData.timeSlot,
          office_title: null,
          office_price: null,
          message: formData.message || null,
          status: 'pending'
        }]);

      if (error) throw error;

      setSubmitStatus('success');

      setTimeout(() => {
        navigate('/');
      }, 3000);
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

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-montserrat font-bold text-slate-900 mb-4">
            Demande envoyée avec succès !
          </h1>
          <p className="text-xl text-slate-600 font-inter mb-8">
            Nous vous recontactons sous <span className="font-bold text-emerald-600">2 heures</span> pour confirmer votre visite.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors mb-8 font-inter"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 sm:p-12 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Calendar className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-montserrat font-bold mb-4">
              Réservez votre visite gratuite
            </h1>
            <p className="text-lg text-emerald-50 font-inter max-w-2xl mx-auto">
              Découvrez nos 4000m² d'espaces premium à Marseille. Visite sans engagement, réponse sous 2h.
            </p>
          </div>

          <div className="p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-inter font-semibold text-slate-700 mb-2">
                  Nom complet *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full bg-slate-50 border-2 ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'} rounded-xl px-12 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all`}
                    placeholder="Jean Dupont"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-inter font-semibold text-slate-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full bg-slate-50 border-2 ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'} rounded-xl px-12 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all`}
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-slate-700 mb-2">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full bg-slate-50 border-2 ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'} rounded-xl px-12 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all`}
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-semibold text-slate-700 mb-2">
                  Date souhaitée *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    value={formData.date}
                    min={today}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className={`w-full bg-slate-50 border-2 ${errors.date ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'} rounded-xl px-12 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-inter font-semibold text-slate-700 mb-3">
                  Créneau horaire *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => handleChange('timeSlot', slot.value)}
                      className={`flex items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                        formData.timeSlot === slot.value
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md ring-4 ring-emerald-500/10'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                      <span className="font-inter font-medium text-lg">{slot.label}</span>
                    </button>
                  ))}
                </div>
                {errors.timeSlot && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.timeSlot}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-inter font-semibold text-slate-700 mb-2">
                  Message (optionnel)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl px-12 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none"
                    placeholder="Précisez vos besoins ou questions..."
                  />
                </div>
              </div>

              {submitStatus === 'error' && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">
                    Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-montserrat font-bold py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-lg">Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-6 h-6" />
                    <span className="text-lg">Réserver ma visite gratuite</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-sm text-slate-500 font-inter">
                  Réponse sous <span className="font-bold text-emerald-600">2h</span> • Visite gratuite • Sans engagement
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-montserrat font-bold text-slate-900 mb-2">Sans engagement</h3>
            <p className="text-sm text-slate-600 font-inter">Visite gratuite, aucune obligation</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-montserrat font-bold text-slate-900 mb-2">Réponse rapide</h3>
            <p className="text-sm text-slate-600 font-inter">Confirmation sous 2 heures</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-montserrat font-bold text-slate-900 mb-2">Visite guidée</h3>
            <p className="text-sm text-slate-600 font-inter">Découvrez tous nos espaces</p>
          </div>
        </div>
      </div>
    </div>
  );
}
