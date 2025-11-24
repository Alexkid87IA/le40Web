import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Briefcase, Building2, Users, MessageSquare, CheckCircle, AlertCircle, Loader2, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface ClubApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const companySectors = [
  'Tech & Digital',
  'Conseil & Services',
  'E-commerce',
  'Marketing & Communication',
  'Finance & Assurance',
  'Immobilier',
  'Santé & Bien-être',
  'Éducation & Formation',
  'Art & Culture',
  'Restauration & Hôtellerie',
  'Autre'
];

const companySizes = [
  'Solo / Freelance',
  '2-10 employés',
  '11-50 employés',
  '51-200 employés',
  '200+ employés'
];

export default function ClubApplicationModal({ isOpen, onClose }: ClubApplicationModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    companyName: '',
    companySector: '',
    position: '',
    companySize: '',
    motivation: '',
    contribution: '',
    referralName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';

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

    if (!formData.companyName.trim()) newErrors.companyName = "Le nom de l'entreprise est requis";
    if (!formData.companySector) newErrors.companySector = 'Le secteur est requis';
    if (!formData.position.trim()) newErrors.position = 'Le poste est requis';
    if (!formData.companySize) newErrors.companySize = 'La taille est requise';

    if (!formData.motivation.trim()) {
      newErrors.motivation = 'La motivation est requise';
    } else if (formData.motivation.trim().length < 100) {
      newErrors.motivation = 'Minimum 100 caractères requis';
    }

    if (!formData.contribution.trim()) {
      newErrors.contribution = 'Ce champ est requis';
    } else if (formData.contribution.trim().length < 50) {
      newErrors.contribution = 'Minimum 50 caractères requis';
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
        .from('club_applications')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          linkedin_url: formData.linkedinUrl || null,
          company_name: formData.companyName,
          company_sector: formData.companySector,
          position: formData.position,
          company_size: formData.companySize,
          motivation: formData.motivation,
          contribution: formData.contribution,
          referral_name: formData.referralName || null,
          status: 'pending'
        }]);

      if (error) throw error;

      setSubmitStatus('success');

      setTimeout(() => {
        onClose();
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', linkedinUrl: '',
          companyName: '', companySector: '', position: '', companySize: '',
          motivation: '', contribution: '', referralName: ''
        });
        setSubmitStatus('idle');
        setErrors({});
      }, 3000);
    } catch (error) {
      console.error('Error submitting club application:', error);
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
            className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 to-slate-800 border border-red-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
                    className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-white mb-4">
                    Candidature Envoyée !
                  </h3>
                  <p className="text-base sm:text-lg text-white/70 font-inter max-w-md mx-auto">
                    Nous étudions votre profil avec attention. Vous recevrez une réponse sous 48h.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-6 sm:mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
                    >
                      <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-2 sm:mb-3">
                      Candidature Le Club
                    </h2>
                    <p className="text-sm sm:text-base text-white/60 font-inter">
                      Rejoignez notre communauté d'entrepreneurs d'élite
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                      <h3 className="text-lg sm:text-xl font-montserrat font-bold text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-red-400" />
                        Informations Personnelles
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">Prénom *</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors`}
                            placeholder="Jean"
                          />
                          {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">Nom *</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors`}
                            placeholder="Dupont"
                          />
                          {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              className={`w-full bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors`}
                              placeholder="jean@exemple.fr"
                            />
                          </div>
                          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">Téléphone *</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              className={`w-full bg-white/10 border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors`}
                              placeholder="06 12 34 56 78"
                            />
                          </div>
                          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">LinkedIn (optionnel)</label>
                          <div className="relative">
                            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                              type="url"
                              value={formData.linkedinUrl}
                              onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors"
                              placeholder="https://linkedin.com/in/..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                      <h3 className="text-lg sm:text-xl font-montserrat font-bold text-white mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-red-400" />
                        Informations Professionnelles
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">Nom de l'entreprise *</label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.companyName ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors`}
                            placeholder="Ma Startup SAS"
                          />
                          {errors.companyName && <p className="mt-1 text-xs text-red-400">{errors.companyName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">Secteur d'activité *</label>
                          <select
                            value={formData.companySector}
                            onChange={(e) => handleChange('companySector', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.companySector ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
                          >
                            <option value="" className="bg-slate-800">Sélectionnez...</option>
                            {companySectors.map(sector => (
                              <option key={sector} value={sector} className="bg-slate-800">{sector}</option>
                            ))}
                          </select>
                          {errors.companySector && <p className="mt-1 text-xs text-red-400">{errors.companySector}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">Poste occupé *</label>
                          <input
                            type="text"
                            value={formData.position}
                            onChange={(e) => handleChange('position', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.position ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors`}
                            placeholder="CEO, Fondateur..."
                          />
                          {errors.position && <p className="mt-1 text-xs text-red-400">{errors.position}</p>}
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">Taille de l'entreprise *</label>
                          <select
                            value={formData.companySize}
                            onChange={(e) => handleChange('companySize', e.target.value)}
                            className={`w-full bg-white/10 border ${errors.companySize ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
                          >
                            <option value="" className="bg-slate-800">Sélectionnez...</option>
                            {companySizes.map(size => (
                              <option key={size} value={size} className="bg-slate-800">{size}</option>
                            ))}
                          </select>
                          {errors.companySize && <p className="mt-1 text-xs text-red-400">{errors.companySize}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                      <h3 className="text-lg sm:text-xl font-montserrat font-bold text-white mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-red-400" />
                        Motivation
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                            Pourquoi voulez-vous rejoindre Le Club ? * <span className="text-xs text-white/40">(min. 100 caractères)</span>
                          </label>
                          <textarea
                            value={formData.motivation}
                            onChange={(e) => handleChange('motivation', e.target.value)}
                            rows={4}
                            className={`w-full bg-white/10 border ${errors.motivation ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors resize-none`}
                            placeholder="Parlez-nous de vos objectifs, vos attentes..."
                          />
                          <div className="flex justify-between items-center mt-1">
                            {errors.motivation && <p className="text-xs text-red-400">{errors.motivation}</p>}
                            <p className="text-xs text-white/40 ml-auto">{formData.motivation.length} caractères</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                            Que pouvez-vous apporter à la communauté ? * <span className="text-xs text-white/40">(min. 50 caractères)</span>
                          </label>
                          <textarea
                            value={formData.contribution}
                            onChange={(e) => handleChange('contribution', e.target.value)}
                            rows={4}
                            className={`w-full bg-white/10 border ${errors.contribution ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors resize-none`}
                            placeholder="Vos compétences, votre réseau, votre expérience..."
                          />
                          <div className="flex justify-between items-center mt-1">
                            {errors.contribution && <p className="text-xs text-red-400">{errors.contribution}</p>}
                            <p className="text-xs text-white/40 ml-auto">{formData.contribution.length} caractères</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-inter font-medium text-white/80 mb-2">
                            Êtes-vous recommandé par un membre ? (optionnel)
                          </label>
                          <input
                            type="text"
                            value={formData.referralName}
                            onChange={(e) => handleChange('referralName', e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors"
                            placeholder="Nom du membre"
                          />
                        </div>
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
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-montserrat font-bold py-4 sm:py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/30"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <span>Envoyer ma candidature</span>
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs sm:text-sm text-center text-white/50 font-inter">
                      Nous étudions chaque candidature avec attention. Réponse sous 48h.
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
