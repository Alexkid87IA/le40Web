# Implémentation du Système de Paiement Stripe

## Résumé des Modifications

Ce document récapitule les modifications apportées pour préparer le site au lancement avec un système de paiement complet.

## ✅ Ce qui a été implémenté

### 1. Intégration Stripe

**Nouveau checkout avec Stripe Elements**
- ✅ Fichier: `src/pages/CheckoutWithStripe.tsx`
- ✅ Intégration complète de Stripe Elements
- ✅ Formulaire en deux étapes:
  1. Collecte des informations client
  2. Paiement sécurisé avec Stripe
- ✅ Gestion d'erreurs détaillée
- ✅ Redirect automatique vers confirmation

**Packages installés:**
```json
"@stripe/stripe-js": "^8.5.3",
"@stripe/react-stripe-js": "^5.4.1"
```

### 2. Edge Functions Supabase

**A. `create-payment-intent`** (déjà existait, vérifié)
- ✅ Crée un PaymentIntent Stripe
- ✅ Gestion des métadonnées (order_id, customer info)
- ✅ CORS configuré correctement

**B. `send-order-confirmation`** (mis à jour)
- ✅ Intégration Resend pour envoi d'emails
- ✅ Email HTML professionnel et responsive
- ✅ Fallback gracieux si Resend non configuré
- ✅ Template avec:
  - Numéro de commande
  - Détails des articles
  - Total TTC
  - Prochaines étapes

**C. `stripe-webhook`** (nouveau)
- ✅ Gestion des webhooks Stripe
- ✅ Événements gérés:
  - `payment_intent.succeeded` → Commande confirmée + Email
  - `payment_intent.payment_failed` → Commande annulée
  - `payment_intent.canceled` → Commande annulée
  - `charge.refunded` → Remboursement traité
- ✅ Mise à jour automatique des commandes
- ✅ Envoi automatique d'email de confirmation
- ✅ Synchronisation avec la table `bookings_extended`

### 3. Page Politique de Confidentialité

**Nouveau fichier:** `src/pages/PolitiqueConfidentialite.tsx`
- ✅ Page complète et professionnelle
- ✅ Sections:
  - Données collectées
  - Utilisation des données
  - Protection des données
  - Partage des données
  - Conservation des données
  - Vos droits RGPD
  - Cookies
  - Contact
- ✅ Design cohérent avec le reste du site
- ✅ Animations Framer Motion

### 4. Amélioration de la Configuration Shopify

**Fichier modifié:** `src/lib/shopify.ts`
- ✅ Détection automatique si Shopify est configuré
- ✅ Export `shopifyEnabled` pour vérification
- ✅ Messages d'erreur clairs
- ✅ Fallback gracieux si non configuré
- ✅ Console warning informatif

### 5. Mise à jour du Router

**Fichier modifié:** `src/router/AppRoutes.tsx`
- ✅ Route `/checkout` → `CheckoutWithStripe`
- ✅ Route `/checkout-old` → Ancien checkout (backup)
- ✅ Route `/politique-confidentialite` → Page dédiée

### 6. Documentation

**Nouveau fichier:** `SETUP_GUIDE.md`
- ✅ Guide complet de configuration
- ✅ Variables d'environnement requises
- ✅ Instructions étape par étape
- ✅ Section dépannage
- ✅ Exemples de configuration

## 🔑 Variables d'Environnement Nécessaires

### Frontend (.env)
```env
# Supabase (REQUIS)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Stripe (REQUIS)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Shopify (OPTIONNEL)
VITE_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_...
```

### Supabase Edge Functions (Secrets)
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

## 📋 Checklist de Lancement

### Obligatoire avant le lancement

- [ ] **Stripe configuré**
  - [ ] Clé publique dans `.env`
  - [ ] Clé secrète dans Supabase Secrets
  - [ ] Webhook configuré sur Stripe Dashboard
  - [ ] Webhook secret dans Supabase Secrets
  - [ ] Testé avec carte de test

- [ ] **Resend configuré**
  - [ ] API key dans Supabase Secrets
  - [ ] Domaine d'envoi vérifié
  - [ ] Email de test envoyé et reçu

- [ ] **Edge Functions déployées**
  ```bash
  supabase functions deploy create-payment-intent
  supabase functions deploy send-order-confirmation
  supabase functions deploy stripe-webhook
  ```

- [ ] **Tests de bout en bout**
  - [ ] Ajout au panier fonctionne
  - [ ] Formulaire checkout se valide correctement
  - [ ] Paiement Stripe fonctionne
  - [ ] Email de confirmation reçu
  - [ ] Page de confirmation affiche les bonnes données
  - [ ] Commande visible dans Supabase

### Optionnel

- [ ] **Shopify** (si e-commerce activé)
  - [ ] Variables configurées
  - [ ] Produits créés
  - [ ] Collections organisées

- [ ] **Mode Production**
  - [ ] Remplacer clés test Stripe par clés live
  - [ ] Configurer domaine email personnalisé
  - [ ] Activer monitoring (Sentry, LogRocket, etc.)

## 🚀 Déploiement

### 1. Configuration des secrets

```bash
# Se connecter à Supabase CLI
supabase login

# Lier au projet
supabase link --project-ref votre-project-ref

# Configurer les secrets
supabase secrets set STRIPE_SECRET_KEY=sk_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set RESEND_API_KEY=re_...
```

### 2. Déploiement des Edge Functions

```bash
# Déployer toutes les fonctions
supabase functions deploy create-payment-intent
supabase functions deploy send-order-confirmation
supabase functions deploy stripe-webhook
```

### 3. Configuration Stripe Webhook

1. Allez sur Stripe Dashboard > Developers > Webhooks
2. Cliquez "Add endpoint"
3. URL: `https://[votre-projet].supabase.co/functions/v1/stripe-webhook`
4. Sélectionnez les événements:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - payment_intent.canceled
   - charge.refunded
5. Copiez le Signing Secret
6. Ajoutez-le dans Supabase Secrets

### 4. Build et déploiement frontend

```bash
# Build
npm run build

# Déployer sur Netlify/Vercel/etc
# (selon votre plateforme de déploiement)
```

## 🧪 Tests

### Tests manuels recommandés

1. **Flux complet de réservation:**
   - Naviguer vers une offre (studio, salle, etc.)
   - Ajouter au panier
   - Aller au checkout
   - Remplir le formulaire
   - Payer avec carte test: `4242 4242 4242 4242`
   - Vérifier la page de confirmation
   - Vérifier l'email de confirmation
   - Vérifier dans Supabase que:
     - L'order existe avec status "confirmed"
     - Les order_items sont créés
     - payment_status = "paid"

2. **Test d'échec de paiement:**
   - Utiliser carte qui échoue: `4000 0000 0000 0002`
   - Vérifier que le status passe à "failed"

3. **Test de refus de paiement:**
   - Utiliser carte refusée: `4000 0000 0000 9995`
   - Vérifier la gestion d'erreur

## 📊 Monitoring

### Logs à surveiller

1. **Supabase Dashboard:**
   - Edge Functions > Logs
   - Database > Logs

2. **Stripe Dashboard:**
   - Developers > Logs
   - Developers > Webhooks > Événements

3. **Resend Dashboard:**
   - Emails > Activity

## 🐛 Dépannage Courant

### Erreur: "Stripe is not configured"
- Vérifier que `VITE_STRIPE_PUBLISHABLE_KEY` est dans `.env`
- Relancer le serveur de dev après modification

### Erreur: "STRIPE_SECRET_KEY is not set"
- Vérifier dans Supabase > Edge Functions > Secrets
- Re-déployer la fonction après ajout du secret

### Email non reçu
- Vérifier que `RESEND_API_KEY` est configuré
- Vérifier le domaine d'envoi dans Resend
- Consulter les logs de la fonction
- Vérifier les spam

### Webhook ne se déclenche pas
- Vérifier l'URL du webhook dans Stripe
- Vérifier que le secret est correct
- Tester avec Stripe CLI:
  ```bash
  stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
  ```

## 📝 Notes Importantes

1. **Sécurité:**
   - Ne JAMAIS commit les clés API
   - Utiliser les clés test en développement
   - Passer aux clés live uniquement en production

2. **Performance:**
   - Les Edge Functions ont un timeout de 60s
   - Les webhooks doivent répondre en < 5s

3. **RGPD:**
   - La politique de confidentialité est maintenant accessible
   - Les données sont stockées de manière sécurisée
   - Les utilisateurs peuvent exercer leurs droits

## 🎉 Prêt pour le lancement!

Une fois que tous les items de la checklist sont cochés, le site est prêt pour accepter des paiements réels.

Pensez à:
- Basculer en mode production (clés live Stripe)
- Configurer le monitoring
- Avoir un plan de support client
- Documenter les procédures de remboursement

---

**Dernière mise à jour:** 27 novembre 2025
**Version:** 1.0.0
