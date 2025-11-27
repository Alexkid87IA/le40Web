# Guide de Configuration - Le 40 Coworking

Ce guide explique comment configurer toutes les variables d'environnement nécessaires pour le bon fonctionnement du site.

## Variables d'Environnement Requises

Créez un fichier `.env` à la racine du projet avec les variables suivantes:

### 1. Supabase (OBLIGATOIRE)

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

**Comment les obtenir:**
1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans Settings > API
4. Copiez l'URL et la clé `anon/public`

### 2. Stripe (OBLIGATOIRE pour les paiements)

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Secrets Supabase (pour les Edge Functions):**
```bash
# Dans le dashboard Supabase: Settings > Edge Functions > Secrets
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Comment les obtenir:**
1. Créez un compte sur [stripe.com](https://stripe.com)
2. Mode Test: Dashboard > Developers > API keys
3. Copiez la `Publishable key` (pk_test_...)
4. Copiez la `Secret key` (sk_test_...)
5. Pour le webhook secret:
   - Dashboard > Developers > Webhooks
   - Ajoutez un endpoint: `https://votre-projet.supabase.co/functions/v1/stripe-webhook`
   - Événements à écouter:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `payment_intent.canceled`
     - `charge.refunded`
   - Copiez le `Signing secret`

### 3. Resend (OBLIGATOIRE pour les emails)

**Secrets Supabase:**
```bash
RESEND_API_KEY=re_...
```

**Comment l'obtenir:**
1. Créez un compte sur [resend.com](https://resend.com)
2. Dashboard > API Keys
3. Créez une nouvelle clé
4. Ajoutez votre domaine (ou utilisez le domaine de test)

**Configuration du domaine d'envoi:**
- Par défaut: `reservations@le40coworking.com`
- Configurez votre domaine dans Resend pour un envoi professionnel

### 4. Shopify (OPTIONNEL - E-commerce)

```env
VITE_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
```

**Comment les obtenir:**
1. Créez une boutique sur [shopify.com](https://shopify.com)
2. Settings > Apps and sales channels > Develop apps
3. Créez une app personnalisée
4. Configurez les permissions Storefront API
5. Copiez le `Storefront API access token`

**Note:** Si Shopify n'est pas configuré, les fonctionnalités e-commerce seront désactivées automatiquement.

## Exemple de fichier .env complet

```env
# Supabase (REQUIS)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (REQUIS)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51...

# Shopify (OPTIONNEL)
VITE_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_...
```

## Configuration des Edge Functions

Les Edge Functions nécessitent des secrets supplémentaires qui doivent être configurés dans le dashboard Supabase:

1. Allez sur supabase.com > Votre projet
2. Settings > Edge Functions > Secrets
3. Ajoutez les secrets suivants:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

## Déploiement des Edge Functions

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Déployer toutes les fonctions
supabase functions deploy create-payment-intent
supabase functions deploy send-order-confirmation
supabase functions deploy stripe-webhook
```

## Vérification

Pour vérifier que tout est bien configuré:

### 1. Démarrez le serveur de développement
```bash
npm run dev
```

### 2. Vérifiez la console
- ✅ Pas d'erreurs Supabase
- ⚠️ Warning Shopify si non configuré (normal si optionnel)
- ✅ Pas d'erreurs de modules manquants

### 3. Testez le checkout
1. Ajoutez un article au panier
2. Allez au checkout
3. Remplissez le formulaire
4. Utilisez une carte de test Stripe:
   - Numéro: `4242 4242 4242 4242`
   - Date: N'importe quelle date future
   - CVC: N'importe quel 3 chiffres

### 4. Vérifiez les emails
- Configurez Resend avec votre domaine
- Testez l'envoi d'un email de confirmation

## Modes Test vs Production

### Stripe
- **Test:** Utilisez `pk_test_...` et `sk_test_...`
- **Production:** Remplacez par `pk_live_...` et `sk_live_...`

### Resend
- **Test:** Utilisez le domaine de test fourni
- **Production:** Configurez votre propre domaine

## Dépannage

### Erreur: "Shopify is not configured"
✅ Normal si vous n'utilisez pas Shopify. Les autres fonctionnalités marchent.

### Erreur: "STRIPE_SECRET_KEY is not set"
❌ Vérifiez les secrets dans Supabase Dashboard > Edge Functions

### Emails non reçus
1. Vérifiez que `RESEND_API_KEY` est configuré dans Supabase
2. Vérifiez votre domaine d'envoi dans Resend
3. Consultez les logs dans Supabase > Edge Functions

### Paiements qui échouent
1. Vérifiez que vous utilisez les clés de test
2. Vérifiez le webhook Stripe
3. Consultez les logs dans Stripe Dashboard > Developers > Logs

## Support

Pour toute question:
- Email: contact@le40-marseille.fr
- Téléphone: 04 13 25 26 40

## Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe](https://stripe.com/docs)
- [Documentation Resend](https://resend.com/docs)
- [Documentation Shopify](https://shopify.dev/docs)
