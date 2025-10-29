import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStudio?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedStudio }: BookingModalProps) {
  const [formData, setFormData] = useState({
    studioId: preselectedStudio || '',
    name: '',
    email: '',
    phone: '',
    date: '',
    startTime: '',
    duration: '1',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert(`Réservation envoyée !\n\nStudio: ${formData.studioId}\nDate: ${formData.date}\nHeure: ${formData.startTime}\nDurée: ${formData.duration}h\n\nNous vous contacterons sous 24h pour confirmer.`);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const selectedStudio = studioSetups.find(s => s.id === formData.studioId);
  const estimatedPrice = selectedStudio ? selectedStudio.basePrice * parseInt(formData.duration || '1') : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-3xl border border-white/10 shadow-2xl"
          >
            <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-8 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-montserrat font-black text-white">
                  Réserver un Studio
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <p className="text-white/60 font-inter mt-2">
                Remplissez le formulaire, nous vous confirmerons la disponibilité sous 24h
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-white font-inter font-medium mb-3">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  Studio
                </label>
                <select
                  name="studioId"
                  value={formData.studioId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="">Sélectionnez un studio</option>
                  {studioSetups.map(studio => (
                    <option key={studio.id} value={studio.id}>
                      {studio.name} - {studio.basePrice}€/h
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-white font-inter font-medium mb-3">
                    <User className="w-5 h-5 text-cyan-400" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter placeholder:text-white/30 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white font-inter font-medium mb-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jean@exemple.fr"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter placeholder:text-white/30 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white font-inter font-medium mb-3">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="06 12 34 56 78"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter placeholder:text-white/30 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-white font-inter font-medium mb-3">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white font-inter font-medium mb-3">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    Heure
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white font-inter font-medium mb-3">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    Durée
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(h => (
                      <option key={h} value={h}>{h}h</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white font-inter font-medium mb-3">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  Notes (optionnel)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Précisez vos besoins spécifiques..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter placeholder:text-white/30 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              {selectedStudio && (
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 font-inter">Estimation</span>
                    <div className="text-right">
                      <div className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {estimatedPrice}€
                      </div>
                      <div className="text-xs text-white/50 font-inter">
                        {formData.duration}h × {selectedStudio.basePrice}€
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm font-inter mt-4">
                    Prix indicatif hors options. Le tarif final sera confirmé lors de la validation.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-montserrat font-bold transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-montserrat font-bold transition-all shadow-lg"
                >
                  Envoyer la demande
                </button>
              </div>

              <p className="text-center text-white/50 text-sm font-inter">
                Confirmation sous 24h • Paiement à la réservation
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
