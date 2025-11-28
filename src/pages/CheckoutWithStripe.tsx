import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Lock, ArrowLeft, Check, AlertCircle,
  ShoppingCart, Mail, Phone, User, Loader2, Trash2, Calendar, Clock
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import { supabase } from '../lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  acceptTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  acceptTerms?: string;
}

function CheckoutForm() {
  const navigate = useNavigate();
  const { items: allItems, totalPrice, calculateStudioTotal, clearCart, removeItem } = useUnifiedCart();
  const stripe = useStripe();
  const elements = useElements();

  // Filter only local items for this checkout (Shopify items go through Shopify checkout)
  const items = allItems.filter(item => item.type === 'local');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items.length, navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les CGV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!stripe || !elements) {
      setOrderError('Le système de paiement n\'est pas encore prêt.');
      return;
    }

    setIsProcessing(true);
    setOrderError(null);

    try {
      const totalHT = totalPrice;
      const totalTVA = totalHT * 0.20;
      const totalTTC = totalHT * 1.20;

      // 1. Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_company: formData.company || null,
          total_ht: totalHT,
          total_tva: totalTVA,
          total_ttc: totalTTC,
          status: 'pending',
          payment_status: 'pending',
          metadata: {
            cart_items_count: items.length,
            browser: navigator.userAgent
          }
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        service_type: item.serviceType,
        service_name: item.serviceName,
        booking_date: item.date,
        booking_time: item.startTime || null,
        duration: item.duration,
        quantity: item.quantity,
        unit_price_ht: item.price,
        total_price_ht: item.serviceType === 'studio' && item.studioConfig
          ? calculateStudioTotal(item)
          : item.price * item.quantity,
        configuration: item.studioConfig || {}
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Create payment intent
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const paymentResponse = await fetch(`${supabaseUrl}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          amount: totalTTC,
          orderId: order.order_number,
          customerEmail: formData.email,
          customerName: formData.name,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Erreur lors de la création du paiement');
      }

      const { clientSecret: secret, paymentIntentId } = await paymentResponse.json();

      // 4. Update order with payment intent ID
      await supabase
        .from('orders')
        .update({ payment_intent_id: paymentIntentId })
        .eq('id', order.id);

      setClientSecret(secret);
      setOrderId(order.order_number);

    } catch (error: any) {
      console.error('Order creation error:', error);
      setOrderError(error.message || 'Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);
    setOrderError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation/${orderId}`,
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // Success - Stripe will redirect
      clearCart();

    } catch (error: any) {
      console.error('Payment error:', error);
      setOrderError(error.message || 'Erreur lors du paiement. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  const totalHT = totalPrice;
  const totalTVA = totalHT * 0.20;
  const totalTTC = totalHT * 1.20;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au panier
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
              Finaliser votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400">commande</span>
            </h1>
            <p className="text-xl text-white/60">Complétez vos informations pour confirmer votre réservation</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!clientSecret ? (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <h2 className="text-2xl font-montserrat font-bold text-white mb-6 flex items-center gap-3">
                      <User className="w-6 h-6 text-fuchsia-400" />
                      Vos informations
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                          Nom complet *
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40
                                    focus:outline-none focus:ring-2 transition-all ${
                            errors.name
                              ? 'border-red-500 focus:ring-red-500/50'
                              : 'border-white/20 focus:border-fuchsia-400 focus:ring-fuchsia-400/50'
                          }`}
                          placeholder="Jean Dupont"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40
                                    focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? 'border-red-500 focus:ring-red-500/50'
                              : 'border-white/20 focus:border-fuchsia-400 focus:ring-fuchsia-400/50'
                          }`}
                          placeholder="jean.dupont@exemple.fr"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                          Téléphone *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40
                                    focus:outline-none focus:ring-2 transition-all ${
                            errors.phone
                              ? 'border-red-500 focus:ring-red-500/50'
                              : 'border-white/20 focus:border-fuchsia-400 focus:ring-fuchsia-400/50'
                          }`}
                          placeholder="06 12 34 56 78"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                          Entreprise (optionnel)
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white
                                   placeholder-white/40 focus:outline-none focus:ring-2 focus:border-fuchsia-400
                                   focus:ring-fuchsia-400/50 transition-all"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="flex items-start gap-3">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                        className="mt-1 w-5 h-5 accent-fuchsia-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <label htmlFor="terms" className="text-sm text-white/80 cursor-pointer">
                          J'accepte les{' '}
                          <a href="/cgv" target="_blank" className="text-fuchsia-400 hover:underline">
                            conditions générales de vente
                          </a>{' '}
                          et la{' '}
                          <a href="/politique-confidentialite" target="_blank" className="text-fuchsia-400 hover:underline">
                            politique de confidentialité
                          </a>
                        </label>
                        {errors.acceptTerms && (
                          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.acceptTerms}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {orderError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-400">{orderError}</p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    whileHover={!isProcessing ? { scale: 1.02 } : {}}
                    whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    className="w-full py-5 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500
                             rounded-2xl font-montserrat font-bold text-white text-lg
                             flex items-center justify-center gap-3 shadow-lg shadow-fuchsia-500/30
                             disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Lock className="w-6 h-6" />
                        Continuer vers le paiement
                      </>
                    )}
                  </motion.button>

                  <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Paiement sécurisé - Vos données sont protégées</span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <h2 className="text-2xl font-montserrat font-bold text-white mb-6">
                      Paiement sécurisé
                    </h2>

                    <div className="mb-6">
                      <PaymentElement />
                    </div>

                    {orderError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 mb-6"
                      >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-400">{orderError}</p>
                      </motion.div>
                    )}

                    <button
                      onClick={handlePaymentSubmit}
                      disabled={isProcessing || !stripe}
                      className="w-full py-5 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500
                               rounded-2xl font-montserrat font-bold text-white text-lg
                               flex items-center justify-center gap-3 shadow-lg shadow-fuchsia-500/30
                               disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Paiement en cours...
                        </>
                      ) : (
                        <>
                          <Lock className="w-6 h-6" />
                          Payer {totalTTC.toFixed(2)}€
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-32"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-6 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-fuchsia-400" />
                    Récapitulatif
                  </h3>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => {
                      const itemTotal = item.serviceType === 'studio' && item.studioConfig
                        ? calculateStudioTotal(item)
                        : item.price * item.quantity;

                      return (
                        <div
                          key={item.id}
                          className="bg-white/5 rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex gap-4">
                            {item.image && (
                              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.serviceName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="text-white font-semibold text-sm leading-tight">
                                  {item.serviceName}
                                </h4>
                                <span className="text-white font-bold text-lg whitespace-nowrap">
                                  {itemTotal.toFixed(0)}€
                                </span>
                              </div>

                              {item.date && (
                                <div className="flex items-center gap-1 text-white/60 text-xs mb-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(item.date).toLocaleDateString('fr-FR')}</span>
                                </div>
                              )}

                              {item.startTime && item.endTime && (
                                <div className="flex items-center gap-1 text-white/60 text-xs">
                                  <Clock className="w-3 h-3" />
                                  <span>{item.startTime} - {item.endTime}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 py-4 border-t border-white/20">
                    <div className="flex justify-between text-white/60">
                      <span>Sous-total HT</span>
                      <span>{totalHT.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>TVA (20%)</span>
                      <span>{totalTVA.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-xl font-montserrat font-black text-white pt-3 border-t border-white/20">
                      <span>Total TTC</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400">
                        {totalTTC.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 backdrop-blur-xl rounded-xl p-4 border border-fuchsia-500/20">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-white/80 space-y-1">
                      <p>✓ Confirmation immédiate par email</p>
                      <p>✓ Annulation gratuite jusqu'à 24h avant</p>
                      <p>✓ Modification possible selon disponibilité</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutWithStripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
