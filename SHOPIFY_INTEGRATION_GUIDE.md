# Guide d'Intégration Shopify - Le 40

## Vue d'Ensemble

Votre site Le 40 dispose maintenant d'une intégration Shopify headless complète qui vous permet de :
- Vendre des produits physiques (goodies, merch)
- Vendre des réservations de salles, studios et espaces
- Gérer les paiements via Shopify
- Synchroniser automatiquement les disponibilités en temps réel
- Éviter les doubles réservations grâce au système de calendrier

## Architecture

### Flux de Données

```
Frontend React ←→ Shopify Storefront API (produits)
       ↓
Frontend React ←→ Supabase (disponibilités calendrier)
       ↓
Shopify Checkout → Paiement
       ↓
Shopify Webhooks → Supabase Edge Function → Confirmation réservations
```

### Composants Créés

#### Backend
- `src/lib/shopify.ts` - Client GraphQL Shopify
- `src/hooks/useShopifyProducts.ts` - Hook pour fetch produits
- `src/hooks/useShopifyCheckout.ts` - Hook pour gérer le panier Shopify
- `src/hooks/useCalendarAvailability.ts` - Hook pour vérifier disponibilités
- `supabase/functions/shopify-webhook/` - Webhook pour synchronisation

#### Frontend
- `src/pages/ShopPage.tsx` - Page boutique principale
- `src/components/Shop/ProductCard.tsx` - Carte produit
- `src/components/Shop/ProductModal.tsx` - Modal détail produit
- `src/components/Shop/CalendarPicker.tsx` - Sélecteur de créneaux
- `src/pages/ShopifyCheckout.tsx` - Page de redirection paiement
- `src/pages/ShopifyConfirmation.tsx` - Page de confirmation

#### Base de Données
- `shopify_inventory_calendar` - Gestion des créneaux
- `shopify_orders` - Miroir des commandes Shopify

## Configuration Shopify

### 1. Créer vos Produits

#### Pour les Espaces avec Réservation (Salles, Studios, Bureaux)

Dans Shopify Admin :

1. **Créer le produit** : "Salle de Réunion Alpha - 6 personnes"
2. **Ajouter des variantes** :
   - "1 heure - Matin" (60€)
   - "1 heure - Après-midi" (60€)
   - "Demi-journée - Matin" (150€)
   - "Demi-journée - Après-midi" (150€)
   - "Journée complète" (280€)

3. **Configurer les Metafields** (Settings → Custom Data → Products) :
   ```
   Namespace: custom

   Metafields à créer :
   - calendar_sync_required (boolean) = true
   - resource_name (text) = "Salle Alpha"
   - resource_type (text) = "meeting_room"
   - duration_hours (number) = 1 (ou 4, 8 selon variante)
   ```

4. **Ajouter des photos** de la salle

#### Pour les Produits Simples (Goodies)

1. **Créer le produit** : "T-shirt Le 40"
2. **Ajouter des variantes** :
   - S - Noir (25€)
   - M - Noir (25€)
   - L - Blanc (25€)
3. **Metafield** :
   - calendar_sync_required = false
4. **Gérer le stock** dans Shopify

### 2. Configurer les Webhooks

Dans Shopify Admin → Settings → Notifications → Webhooks :

**URL de votre webhook Supabase :**
```
https://lyzezaonpexhpizfgbes.supabase.co/functions/v1/shopify-webhook
```

**Webhooks à créer :**

1. **Order creation**
   - Event: `orders/create`
   - Format: JSON
   - URL: votre webhook URL

2. **Order update**
   - Event: `orders/updated`
   - Format: JSON
   - URL: votre webhook URL

3. **Order cancelled**
   - Event: `orders/cancelled`
   - Format: JSON
   - URL: votre webhook URL

4. **Checkout create**
   - Event: `checkouts/create`
   - Format: JSON
   - URL: votre webhook URL

### 3. Configuration Checkout Shopify

Dans Shopify Admin → Settings → Checkout :

1. **Return URL après paiement** :
   ```
   https://votre-domaine.fr/confirmation-shopify
   ```

2. **Activer** :
   - Apple Pay
   - Google Pay
   - Paiement par carte

## Utilisation

### Accéder à la Boutique

Vos utilisateurs peuvent accéder à la boutique via :
- `/boutique`
- `/shop`

### Parcours Utilisateur

#### Pour un Produit Simple (Goodies)
1. User browse `/boutique`
2. Click sur produit → Modal s'ouvre
3. Sélectionne variante et quantité
4. Click "Ajouter au panier"
5. Panier Shopify mis à jour
6. Click "Commander" → Redirigé vers Shopify Checkout
7. Paie → Redirigé vers `/confirmation-shopify`

#### Pour une Réservation (Salle/Studio)
1. User browse `/boutique`
2. Click sur salle/studio → Modal s'ouvre
3. Click "Sélectionner un créneau"
4. **CalendarPicker s'affiche** :
   - Sélectionne date
   - Sélectionne heure
   - Voit créneaux disponibles en vert, occupés en gris
5. Click "Confirmer"
6. **Système vérifie disponibilité** en temps réel
7. Si disponible : **Crée un "hold" temporaire (15 min)** dans Supabase
8. Ajoute au panier Shopify avec metadata (date, heure, hold_id)
9. Click "Commander" → Redirigé vers Shopify Checkout
10. Paie → **Webhook Shopify déclenché**
11. **Edge Function confirme le hold** → réservation définitive
12. Redirigé vers `/confirmation-shopify`

### Système Anti-Double Réservation

**Blocage temporaire (Hold) :**
- Durée : 15 minutes
- Créé dès l'ajout au panier
- Nettoyé automatiquement si panier abandonné
- Converti en réservation définitive après paiement

**Vérification en temps réel :**
- À chaque sélection de créneau : check Supabase
- Avant ajout au panier : re-check pour éviter race condition
- Webhooks confirment ou libèrent les créneaux

## Gestion des Créneaux

### Créer des Créneaux Disponibles

Les créneaux ne sont PAS créés automatiquement. Vous devez les créer manuellement dans Supabase.

**Option 1 : Manuellement via SQL**

```sql
-- Créer des créneaux pour la Salle Alpha toute une semaine
INSERT INTO shopify_inventory_calendar (
  shopify_product_id,
  shopify_variant_id,
  resource_name,
  resource_type,
  booking_date,
  start_time,
  end_time,
  is_available
) VALUES
  ('gid://shopify/Product/123456', 'gid://shopify/ProductVariant/789', 'Salle Alpha', 'meeting_room', '2025-12-01', '09:00', '10:00', true),
  ('gid://shopify/Product/123456', 'gid://shopify/ProductVariant/789', 'Salle Alpha', 'meeting_room', '2025-12-01', '10:00', '11:00', true),
  ('gid://shopify/Product/123456', 'gid://shopify/ProductVariant/789', 'Salle Alpha', 'meeting_room', '2025-12-01', '14:00', '15:00', true);
```

**Option 2 : Script automatique (à créer)**

Vous pouvez créer un script qui génère automatiquement des créneaux pour les 3 prochains mois :
- Tous les jours de 8h à 20h
- Par tranches d'1 heure
- Pour chaque ressource

### Voir les Réservations

**Via Supabase Dashboard :**
```sql
SELECT
  resource_name,
  booking_date,
  start_time,
  end_time,
  customer_name,
  customer_email,
  shopify_order_id,
  is_available
FROM shopify_inventory_calendar
WHERE is_available = false
ORDER BY booking_date, start_time;
```

**Créneaux avec hold temporaire :**
```sql
SELECT * FROM shopify_inventory_calendar
WHERE is_temporary_hold = true
AND hold_expires_at > now();
```

## Maintenance

### Nettoyage Automatique

La fonction `cleanup_expired_holds()` est appelée automatiquement :
- Avant chaque vérification de disponibilité
- Via les webhooks

Pour forcer un nettoyage manuel :
```sql
SELECT cleanup_expired_holds();
```

### Logs Webhooks

Pour voir les logs des webhooks Shopify :
```bash
# Dans le terminal Supabase
supabase functions logs shopify-webhook
```

Ou via le Dashboard Supabase → Edge Functions → shopify-webhook → Logs

## Troubleshooting

### Problème : "Créneau non disponible" alors qu'il devrait l'être

**Solution :**
```sql
-- Vérifier l'état du créneau
SELECT * FROM shopify_inventory_calendar
WHERE resource_name = 'Salle Alpha'
AND booking_date = '2025-12-01'
AND start_time = '14:00';

-- Nettoyer les holds expirés
SELECT cleanup_expired_holds();

-- Libérer manuellement si nécessaire
UPDATE shopify_inventory_calendar
SET is_available = true,
    is_temporary_hold = false,
    hold_expires_at = NULL
WHERE id = 'xxx-xxx-xxx';
```

### Problème : Webhook non reçu

**Vérifications :**
1. URL webhook correcte dans Shopify Admin
2. Edge Function déployée : `supabase functions list`
3. Logs Edge Function : vérifier les erreurs

### Problème : Double réservation malgré système

**Cause probable :** Hold temporaire expiré avant paiement

**Solution :**
- Augmenter durée du hold à 20-30 minutes
- Modifier dans `useCalendarAvailability.ts` :
```typescript
now() + interval '20 minutes'  // au lieu de 15
```

## Évolutions Futures

### Features à Ajouter

1. **Admin Dashboard Calendrier**
   - Page `/admin/calendar` avec vue complète
   - Drag & drop pour modifier réservations
   - Export CSV

2. **Notifications**
   - Email 24h avant la réservation
   - SMS de rappel

3. **Génération Automatique Créneaux**
   - Script cron qui créée créneaux 3 mois à l'avance
   - Gestion horaires d'ouverture/fermeture

4. **Système de Tarification Dynamique**
   - Prix bas en heures creuses
   - Prix élevés en peak hours

5. **Abonnements Récurrents**
   - Pass mensuel coworking
   - Abonnement studio

## Support

Pour toute question ou problème :
- Email : support@le40.fr
- Docs Shopify Storefront API : https://shopify.dev/docs/api/storefront
- Docs Supabase : https://supabase.com/docs

---

**Dernière mise à jour :** 24 novembre 2025
