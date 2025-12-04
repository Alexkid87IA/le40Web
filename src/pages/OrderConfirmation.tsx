import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle, Mail, Phone, Calendar, Clock, Download,
  ArrowRight, Home, Printer, Share2, MapPin
} from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_company: string | null;
  total_ht: number;
  total_tva: number;
  total_ttc: number;
  status: string;
  payment_status: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  service_type: string;
  service_name: string;
  booking_date: string | null;
  booking_time: string | null;
  duration: string;
  quantity: number;
  unit_price_ht: number;
  total_price_ht: number;
  configuration: any;
}

export default function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      navigate('/');
      return;
    }

    loadOrderData();
  }, [orderNumber]);

  const loadOrderData = async () => {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

      if (orderError) throw orderError;

      if (!orderData) {
        setError('Commande introuvable');
        return;
      }

      setOrder(orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderData.id);

      if (itemsError) throw itemsError;

      setOrderItems(itemsData || []);
    } catch (err) {
      setError('Erreur lors du chargement de la commande');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Commande ${orderNumber}`,
          text: 'Confirmation de ma réservation Le 40',
          url: url
        });
      } catch (err) {
        // Share cancelled by user
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Lien copié dans le presse-papier !');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Commande introuvable</h1>
          <p className="text-white/60 mb-8">{error || 'Cette commande n\'existe pas'}</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-xl text-white font-bold">
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const configs = {
      pending: { label: 'En attente', bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
      confirmed: { label: 'Confirmée', bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      cancelled: { label: 'Annulée', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
      completed: { label: 'Terminée', bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' }
    };

    const config = configs[status as keyof typeof configs] || configs.pending;

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full
                       flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
              Commande confirmée !
            </h1>
            <p className="text-xl text-white/60 mb-2">
              Merci {order.customer_name.split(' ')[0]}, votre réservation a été enregistrée
            </p>
            <p className="text-lg text-white/40">
              Un email de confirmation a été envoyé à <span className="text-fuchsia-400">{order.customer_email}</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <p className="text-white/60 text-sm mb-1">Numéro de commande</p>
                <p className="text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400">
                  {order.order_number}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(order.status)}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <h3 className="font-montserrat font-bold text-white text-lg mb-4">Informations client</h3>
                <div className="flex items-center gap-3 text-white/80">
                  <Mail className="w-5 h-5 text-fuchsia-400" />
                  <span>{order.customer_email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Phone className="w-5 h-5 text-fuchsia-400" />
                  <span>{order.customer_phone}</span>
                </div>
                {order.customer_company && (
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="w-5 h-5 text-fuchsia-400" />
                    <span>{order.customer_company}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-montserrat font-bold text-white text-lg mb-4">Détails de la commande</h3>
                <div className="flex items-center gap-3 text-white/80">
                  <Calendar className="w-5 h-5 text-fuchsia-400" />
                  <span>{new Date(order.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Clock className="w-5 h-5 text-fuchsia-400" />
                  <span>{new Date(order.created_at).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
            </div>

            <h3 className="font-montserrat font-bold text-white text-lg mb-4">Articles commandés</h3>
            <div className="space-y-3 mb-6">
              {orderItems.map((item) => (
                <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.service_name}</h4>
                      <div className="text-sm text-white/60 mt-1">
                        {item.booking_date && (
                          <span>📅 {new Date(item.booking_date).toLocaleDateString('fr-FR')} </span>
                        )}
                        {item.booking_time && <span>🕐 {item.booking_time}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{item.total_price_ht.toFixed(2)}€</p>
                      <p className="text-sm text-white/60">Qté: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-6 border-t border-white/20">
              <div className="flex justify-between text-white/60">
                <span>Sous-total HT</span>
                <span>{order.total_ht.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>TVA (20%)</span>
                <span>{order.total_tva.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-2xl font-montserrat font-black text-white pt-4 border-t border-white/20">
                <span>Total TTC</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400">
                  {order.total_ttc.toFixed(2)}€
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20
                       rounded-xl border border-white/20 text-white font-medium transition-all"
            >
              <Printer className="w-5 h-5" />
              Imprimer
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20
                       rounded-xl border border-white/20 text-white font-medium transition-all"
            >
              <Share2 className="w-5 h-5" />
              Partager
            </button>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500
                       rounded-xl text-white font-bold shadow-lg shadow-fuchsia-500/30 transition-all hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 backdrop-blur-xl rounded-xl p-6 border border-fuchsia-500/20"
          >
            <h3 className="font-montserrat font-bold text-white mb-4">Prochaines étapes</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <p>Vous recevrez un email de confirmation avec tous les détails</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <p>Un rappel vous sera envoyé 24h avant votre réservation</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <p>Pour toute question, contactez-nous au <a href="tel:+33413252640" className="text-fuchsia-400 hover:underline">04 13 25 26 40</a></p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
