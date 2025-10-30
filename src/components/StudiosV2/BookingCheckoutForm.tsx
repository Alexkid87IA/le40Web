import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, User, Mail, Phone, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ConfigurationState } from '../../utils/pricingCalculations';
import { Studio, Duration, Formula, Option } from '../../data/studiosLaunch/config';

interface BookingCheckoutFormProps {
  configuration: ConfigurationState;
  selectedDate: Date;
  selectedTime: string;
  totalPrice: number;
  options: Option[];
  onSuccess: () => void;
}

export default function BookingCheckoutForm({
  configuration,
  selectedDate,
  selectedTime,
  totalPrice,
  options,
  onSuccess
}: BookingCheckoutFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!configuration.studio || !configuration.duration) {
        throw new Error('Configuration incomplète');
      }

      const selectedOptionsObj: { [key: string]: number } = {};
      configuration.selectedOptions.forEach((quantity, optionId) => {
        selectedOptionsObj[optionId] = quantity;
      });

      const { data, error: insertError } = await supabase
        .from('bookings_extended')
        .insert([
          {
            studio_id: configuration.studio.id,
            booking_date: selectedDate.toISOString().split('T')[0],
            booking_time: selectedTime,
            duration_hours: configuration.duration.hours,
            formula_id: configuration.formula.id,
            selected_options: selectedOptionsObj,
            total_price: totalPrice,
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            notes: formData.notes,
            status: 'confirmed',
            payment_status: 'pending'
          }
        ])
        .select();

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la réservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Réservation confirmée !
        </h3>
        <p className="text-slate-400">
          Un email de confirmation a été envoyé à {formData.customerEmail}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Finaliser la réservation
        </h3>
        <p className="text-slate-400">
          Complétez vos informations pour confirmer votre réservation
        </p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
            <User className="w-4 h-4" />
            Nom complet
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            placeholder="jean.dupont@example.com"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
            <Phone className="w-4 h-4" />
            Téléphone
          </label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
            <MessageSquare className="w-4 h-4" />
            Notes additionnelles (optionnel)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
            placeholder="Informations complémentaires pour votre réservation..."
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-2xl transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Réservation en cours...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Confirmer et payer {totalPrice}€
            </>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center mt-4">
          En confirmant, vous acceptez nos conditions générales de vente.
          Le paiement sera effectué sur place ou via un lien sécurisé envoyé par email.
        </p>
      </div>
    </motion.form>
  );
}
