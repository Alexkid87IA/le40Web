import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle, Loader2, ArrowLeft, Sparkles, Star, Zap } from 'lucide-react';
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
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full relative z-10"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative mx-auto mb-8 w-28 h-28"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-full blur-xl opacity-50" />
              <div className="relative w-full h-full bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-5xl font-montserrat font-black text-white mb-6">
                C'est dans la poche !
              </h1>
              <p className="text-xl text-white/80 font-inter mb-3">
                On vous rappelle dans les <span className="font-bold text-red-400">2 heures</span>
              </p>
              <p className="text-base text-white/60 font-inter mb-10">
                Préparez-vous à découvrir quelque chose d'exceptionnel
              </p>

              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <ArrowLeft className="w-5 h-5 text-white relative z-10" />
                <span className="text-white font-montserrat font-bold relative z-10">Retour à l'accueil</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-2 text-white/60 hover:text-red-400 transition-colors mb-8 font-inter group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-400/20 rounded-full px-5 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold uppercase tracking-wider text-red-300">Visite Gratuite</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
              Venez nous voir,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">
                on vous attend
              </span>
            </h1>
            <p className="text-xl text-white/70 font-inter max-w-2xl mx-auto mb-8">
              4000m² d'espaces incroyables à découvrir. Réponse garantie sous 2h.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              {[
                { icon: Zap, text: 'Réponse sous 2h', color: 'text-red-400' },
                { icon: Star, text: 'Sans engagement', color: 'text-rose-400' },
                { icon: CheckCircle, text: '100% gratuit', color: 'text-red-400' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-white/80 font-inter text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden"
          >

          <div className="p-8 sm:p-10 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-inter font-bold text-white/90 mb-3">
                  Comment on vous appelle ?
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-red-400 transition-colors" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full bg-white/5 border-2 ${errors.name ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-red-400/50'} rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all`}
                    placeholder="Jean Dupont"
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-inter font-bold text-white/90 mb-3">
                    Votre email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-red-400 transition-colors" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full bg-white/5 border-2 ${errors.email ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-red-400/50'} rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all`}
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-400 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-inter font-bold text-white/90 mb-3">
                    Votre téléphone
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-red-400 transition-colors" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full bg-white/5 border-2 ${errors.phone ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-red-400/50'} rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all`}
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-400 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-bold text-white/90 mb-3">
                  Quand souhaitez-vous venir ?
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-red-400 transition-colors" />
                  <input
                    type="date"
                    value={formData.date}
                    min={today}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className={`w-full bg-white/5 border-2 ${errors.date ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-red-400/50'} rounded-xl px-12 py-4 text-white focus:outline-none focus:bg-white/10 transition-all [&::-webkit-calendar-picker-indicator]:invert`}
                  />
                </div>
                {errors.date && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.date}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-inter font-bold text-white/90 mb-4">
                  Plutôt matin ou après-midi ?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {timeSlots.map((slot, index) => (
                    <motion.button
                      key={slot.value}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => handleChange('timeSlot', slot.value)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                        formData.timeSlot === slot.value
                          ? 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400/50 text-white'
                          : 'bg-white/5 border-white/10 text-white/80 hover:border-red-400/30 hover:bg-white/10'
                      }`}
                    >
                      {formData.timeSlot === slot.value && (
                        <motion.div
                          layoutId="selectedSlot"
                          className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-xl border-2 border-red-400/50"
                        />
                      )}
                      <Clock className={`w-5 h-5 relative z-10 ${formData.timeSlot === slot.value ? 'text-red-400' : 'text-white/60'}`} />
                      <span className="font-inter font-semibold text-base relative z-10">{slot.label}</span>
                    </motion.button>
                  ))}
                </div>
                {errors.timeSlot && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.timeSlot}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-inter font-bold text-white/90 mb-3">
                  Un truc à nous dire ? (optionnel)
                </label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/40 group-focus-within:text-red-400 transition-colors" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border-2 border-white/10 focus:border-red-400/50 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all resize-none"
                    placeholder="Vos besoins, questions, envies..."
                  />
                </div>
              </div>

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border-2 border-red-400/30 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">
                    Oups, une erreur s'est produite. Réessayez ou appelez-nous directement !
                  </p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="group relative w-full overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-r from-red-500 via-rose-500 to-red-500 text-white font-montserrat font-black py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="text-lg">On envoie tout ça...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      <span className="text-lg">C'est parti, je réserve !</span>
                    </>
                  )}
                </div>
              </motion.button>

              <div className="text-center pt-4">
                <p className="text-sm text-white/50 font-inter">
                  Réponse ultra-rapide • 100% gratuit • Zéro engagement
                </p>
              </div>
            </form>
          </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
