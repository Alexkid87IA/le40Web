# Guide du Panier Unifié - Le 40 Coworking

## Vue d'ensemble

Le système de panier unifié permet de gérer **deux types d'articles** dans un seul panier :
1. **Articles Shopify** : Produits de la boutique (salles, studios, services) avec paiement via Shopify
2. **Réservations locales** : Réservations personnalisées avec dates/heures spécifiques gérées par Supabase

## Architecture

### Composants Principaux

#### 1. UnifiedCartContext (`src/contexts/UnifiedCartContext.tsx`)
- Gère l'état unifié du panier
- Synchronise automatiquement avec Shopify Checkout via l'API Storefront
- Stocke les items locaux dans localStorage
- Types d'items :
  - `LocalCartItem` : Réservations avec dates, heures, configurations studio
  - `ShopifyCartItem` : Produits Shopify avec variants et line items

#### 2. UnifiedCartDrawer (`src/components/Cart/UnifiedCartDrawer.tsx`)
- Affiche le panier avec sections séparées :
  - **Produits Boutique** (icône Store) : Items Shopify
  - **Réservations Personnalisées** (icône Sparkles) : Items locaux
- Gestion des quantités et suppression
- Calcul automatique du total combiné

#### 3. UnifiedCartButton (`src/components/Cart/UnifiedCartButton.tsx`)
- Bouton panier dans HeaderNav
- Badge animé avec compteur total d'items (local + Shopify)
- Ouvre le drawer au clic

#### 4. UnifiedCheckout (`src/pages/UnifiedCheckout.tsx`)
- Page intelligente de redirection checkout
- **Scénario 1 : Uniquement Shopify** → Redirige vers Shopify Checkout
- **Scénario 2 : Uniquement local** → Redirige vers /checkout (Supabase)
- **Scénario 3 : Mixte** → Affiche choix avec deux cartes

## Flux Utilisateur

### Ajout au Panier

#### Articles Shopify (depuis /boutique)
```typescript
const { addShopifyItem } = useUnifiedCart();

await addShopifyItem({
  shopifyVariantId: variant.id,
  productTitle: product.title,
  variantTitle: variant.title,
  price: parseFloat(variant.price.amount),
  quantity: 1,
  image: product.images[0]?.url,
  availableForSale: true,
});
```

#### Réservations Locales (depuis /salles, /studios)
```typescript
const { addLocalItem } = useUnifiedCart();

addLocalItem({
  serviceType: 'meeting-room',
  serviceName: 'Salle Focus',
  date: '2025-11-25',
  startTime: '14:00',
  endTime: '16:00',
  duration: 'hour',
  price: 40,
  quantity: 1,
  image: 'https://...',
});
```

### Procédure de Checkout

1. **Utilisateur clique sur "Procéder au paiement"** dans le drawer
2. **Redirection vers `/panier` (UnifiedCheckout)**
3. **Analyse du contenu du panier :**

   a. **100% Shopify** :
   - Récupération de l'URL Shopify Checkout
   - Redirection automatique vers `checkout.shopify.com`

   b. **100% Local** :
   - Redirection vers `/checkout`
   - Formulaire classique + création dans Supabase

   c. **Mixte (Local + Shopify)** :
   - Affichage de 2 cartes de choix
   - Utilisateur choisit quel type traiter en premier
   - Possibilité de traiter séparément

## API UnifiedCartContext

### Méthodes

```typescript
const {
  // State
  items,              // UnifiedCartItem[] - Tous les items (local + Shopify)
  shopifyCheckout,    // ShopifyCheckout | null
  totalPrice,         // number - Total combiné
  itemCount,          // number - Nombre total d'items
  isOpen,             // boolean - État du drawer
  loading,            // boolean - Opération en cours
  error,              // string | null

  // Actions
  addLocalItem,       // (item) => void
  addShopifyItem,     // (item) => Promise<void>
  removeItem,         // (id) => Promise<void>
  updateQuantity,     // (id, qty) => Promise<void>
  clearCart,          // () => Promise<void>
  setIsOpen,          // (open) => void
  getCheckoutUrl,     // () => string | null

  // Helpers
  calculateStudioTotal, // (item) => number
} = useUnifiedCart();
```

### Types

```typescript
// Item local avec configuration
interface LocalCartItem {
  id: string;
  type: 'local';
  serviceType: 'coworking' | 'meeting-room' | 'studio' | ...;
  serviceName: string;
  date: string;
  startTime?: string;
  endTime?: string;
  duration: 'hour' | 'half-day' | 'day' | ...;
  price: number;
  quantity: number;
  studioConfig?: StudioConfiguration;
  image?: string;
  gradient?: string;
}

// Item Shopify
interface ShopifyCartItem {
  id: string;
  type: 'shopify';
  shopifyVariantId: string;
  shopifyLineItemId?: string;
  productTitle: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image?: string;
  availableForSale: boolean;
  customAttributes?: Array<{ key: string; value: string }>;
}
```

## Synchronisation Shopify

### Fonctionnement

1. **Création du Checkout** : Premier item Shopify → `createCheckout()`
2. **Ajout d'items** : Items suivants → `addToCheckout(checkoutId, lineItems)`
3. **Suppression** : `removeFromCheckout(checkoutId, lineItemIds)`
4. **Stockage** : Checkout ID dans localStorage (`le40-shopify-checkout-id`)
5. **Récupération** : Au chargement, fetch du checkout existant

### Gestion d'Erreurs

- Timeout : Checkout Shopify expire après 7 jours
- Erreur API : Nettoyage localStorage et création nouveau checkout
- Indisponibilité : Message utilisateur + retry

## Intégration dans les Pages

### Pages Concernées

1. **`/boutique` (ShopPage)** : Produits Shopify → `addShopifyItem()`
2. **`/salles` (Salles)** : Réservations salles → `addLocalItem()`
3. **`/studios` (Studios)** : Configurations studio → `addLocalItem()`
4. **`/reservation` (BookingPage)** : Tous types → `addLocalItem()`

### Exemple d'Intégration

```typescript
import { useUnifiedCart } from '../hooks/useUnifiedCart';

export default function MaPage() {
  const { addShopifyItem } = useUnifiedCart();

  const handleAddToCart = async (product) => {
    await addShopifyItem({
      shopifyVariantId: product.variantId,
      productTitle: product.title,
      variantTitle: product.variant,
      price: product.price,
      quantity: 1,
      image: product.image,
      availableForSale: true,
    });
  };

  return (
    <button onClick={() => handleAddToCart(product)}>
      Ajouter au panier
    </button>
  );
}
```

## Routing

```typescript
// Routes principales
/panier                 → UnifiedCheckout (page intelligente)
/checkout               → Checkout (formulaire local Supabase)
/checkout-shopify       → Redirection vers Shopify
/boutique               → ShopPage (produits Shopify)
```

## Migration depuis l'Ancien Système

L'ancien `CartContext` est remplacé par `UnifiedCartContext` :

### Avant
```typescript
import { useCart } from '../hooks/useCart';
const { items, addItem } = useCart();
```

### Après
```typescript
import { useUnifiedCart } from '../hooks/useUnifiedCart';
const { items, addLocalItem, addShopifyItem } = useUnifiedCart();
```

### Changements Clés

1. **Provider** : `CartProvider` → `UnifiedCartProvider`
2. **Hook** : `useCart()` → `useUnifiedCart()`
3. **Méthodes** :
   - `addItem()` → `addLocalItem()` OU `addShopifyItem()`
   - Reste identique : `removeItem()`, `updateQuantity()`, `clearCart()`

## Avantages du Système Unifié

✅ **Expérience utilisateur fluide** : Un seul panier pour tous les types de produits
✅ **Synchronisation automatique** : Items Shopify sync avec l'API Storefront
✅ **Flexibilité** : Supporte réservations personnalisées ET produits e-commerce
✅ **Gestion intelligente** : Redirection automatique selon le contenu du panier
✅ **Persistance** : Items locaux en localStorage, Shopify checkout en session
✅ **Type-safe** : TypeScript complet pour tous les types d'items

## Prochaines Étapes

### Phase 2 : Checkout Unifié Complet
- [ ] Fusionner les deux checkouts en un seul flow
- [ ] Utiliser customAttributes Shopify pour dates/heures
- [ ] Webhook `orders/paid` pour créer réservations Supabase
- [ ] Synchronisation bidirectionnelle complète

### Phase 3 : Optimisations
- [ ] Cache des checkouts Shopify
- [ ] Réservation temporaire de créneaux pendant checkout
- [ ] Libération automatique après 30min d'inactivité
- [ ] Notifications real-time (toast)

## Support et Debugging

### Logs Importants
```typescript
// Activer les logs détaillés
console.log('Unified Cart Items:', items);
console.log('Shopify Checkout:', shopifyCheckout);
console.log('Total Price:', totalPrice);
```

### LocalStorage Keys
- `le40-unified-cart-local` : Items locaux
- `le40-shopify-checkout-id` : ID du checkout Shopify

### Erreurs Communes

1. **"useUnifiedCart must be used within UnifiedCartProvider"**
   - Solution : Vérifier que le composant est bien wrappé dans `<UnifiedCartProvider>`

2. **"Failed to add item to cart"**
   - Vérifier que `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` est défini
   - Vérifier que le variant existe et est disponible

3. **Checkout URL null**
   - Le checkout Shopify n'a pas été créé
   - Ajouter au moins 1 item Shopify pour initialiser

## Tests

### Test Manuel

1. **Test Shopify uniquement** :
   - Aller sur `/boutique`
   - Ajouter 2 produits différents
   - Vérifier le drawer (section "Produits Boutique")
   - Cliquer "Procéder au paiement" → doit rediriger vers Shopify

2. **Test Local uniquement** :
   - Aller sur `/salles`
   - Ajouter une réservation
   - Vérifier le drawer (section "Réservations Personnalisées")
   - Cliquer "Procéder au paiement" → doit aller vers `/checkout`

3. **Test Mixte** :
   - Ajouter 1 produit Shopify
   - Ajouter 1 réservation locale
   - Vérifier les 2 sections dans le drawer
   - Cliquer "Procéder au paiement" → doit afficher page de choix `/panier`

---

**Date de création** : 2025-11-24
**Version** : 1.0.0
**Status** : ✅ Production Ready
