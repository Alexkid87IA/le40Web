import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useShopifyCheckout } from '../hooks/useShopifyCheckout';

export default function ShopifyCheckout() {
  const { getCheckoutUrl } = useShopifyCheckout();
  const navigate = useNavigate();

  useEffect(() => {
    const checkoutUrl = getCheckoutUrl();

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      navigate('/boutique');
    }
  }, [getCheckoutUrl, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Redirection vers le paiement...</h2>
        <p className="text-white/60">Vous allez être redirigé vers Shopify pour finaliser votre commande.</p>
      </div>
    </div>
  );
}
