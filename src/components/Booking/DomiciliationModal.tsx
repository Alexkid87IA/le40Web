import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Mail, Phone, User, Building2, CheckCircle, AlertCircle, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface DomiciliationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const companyTypes = [
  'SAS / SASU',
  'SARL / EURL',
  'Auto-entrepreneur / Micro-entreprise',
  'Association',
  'Autre'
];

const formulas = [
  {
    id: 'basic',
    name: 'Formule Basique',
    price: '99€/mois HT',
    features: [
      'Adresse prestigieuse Marseille',
      'Réception du courrier',
      'Scan et transfert courrier',
      'Domiciliation officielle'
    ]
  },
  {
    id: 'premium',
    name: 'Formule Premium',
    price: '179€/mois HT',
    features: [
      'Tous les avantages Basique',
      'Salle de réunion 2h/mois',
      'Ligne téléphonique dédiée',
      'Gestion administrative courrier',
      'Accès coworking 5 jours/mois'
    ],
    popular: true
  }
];

export default function DomiciliationModal({ isOpen, onClose }: DomiciliationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyType: '',
    formulaInterest: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
      newErrors.phone = 'Numéro invalide';
    }

    if (!formData.companyType) {
      newErrors.companyType = "Le type d'entreprise est requis";
    }

    if (!formData.formulaInterest) {
      newErrors.formulaInterest = 'Sélectionnez une formule';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('domiciliation_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company_type: formData.companyType,
          formula_interest: formData.formulaInterest,
          message: formData.message || null,
          status: 'pending'
        }]);

      if (error) throw error;

      setSubmitStatus('success');

      setTimeout(() => {
        onClose();
        setFormData({
          name: '', email: '', phone: '', companyType: '', formulaInterest: '', message: ''
        });
        setSubmitStatus('idle');
        setErrors({});
      }, 2500);
    } catch (error) {
      console.error('Error submitting domiciliation request:', error);
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
            className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
                    Demande Envoyée !
                  </h3>
                  <p className="text-base sm:text-lg text-white/70 font-inter max-w-md mx-auto">
                    Nous préparons votre devis personnalisé. Vous recevrez une proposition sous 24h.
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
                      <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-2 sm:mb-3">
                      Domiciliation d'Entreprise
                    </h2>
                    <p className="text-sm sm:text-base text-white/60 font-inter">
                      Une adresse prestigieuse pour votre business à Marseille
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 sm:mb-8">
                    {formulas.map((formula) => (
                      <motion.div
                        key={formula.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border-2 ${
                          formula.popular ? 'border-emerald-500/50' : 'border-white/10'
                        }`}
                      >
                        {formula.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                              POPULAIRE
                            </div>
                          </div>
                        )}

                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">
                          {formula.name}
                        </h3>
                        <div className="text-2xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">
                          {formula.price}
                        </div>

                        <ul className="space-y-2 mb-4">
                          {formula.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          type="button"
                          onClick={() => handleChange('formulaInterest', formula.id)}
                          className={`w-full py-2 rounded-xl font-inter font-semibold transition-all ${
                            formData.formulaInterest === formula.id
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                        >
                          {formData.formulaInterest === formula.id ? 'Sélectionné' : 'Sélectionner'}
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            className={`w-full bg-white/10 border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 transition-colors`}
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
                            className={`w-full bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 transition-colors`}
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
                            className={`w-full bg-white/10 border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 transition-colors`}
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

                      <div>
                        <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                          Type d'entreprise *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
                          <select
                            value={formData.companyType}
                            onChange={(e) => handleChange('companyType', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.companyType ? 'border-red-500' : 'border-white/20'} rounded-xl px-12 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none`}
                          >
                            <option value="" className="bg-slate-800">Sélectionnez...</option>
                            {companyTypes.map(type => (
                              <option key={type} value={type} className="bg-slate-800">{type}</option>
                            ))}
                          </select>
                        </div>
                        {errors.companyType && (
                          <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors.companyType}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                        Message (optionnel)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={4}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                        placeholder="Parlez-nous de votre projet..."
                      />
                    </div>

                    {errors.formulaInterest && (
                      <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-200">{errors.formulaInterest}</p>
                      </div>
                    )}

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
                          <span>Demander un devis</span>
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs sm:text-sm text-center text-white/50 font-inter">
                      Devis gratuit et sans engagement - Réponse sous 24h
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
