# Guide des Collections Shopify

## Collections Créées

Le système crée automatiquement **8 collections intelligentes (smart collections)** qui organisent vos produits automatiquement selon leurs propriétés.

### 1. Studios Créatifs
**Handle:** `studios-creatifs`
- Tous les studios (Face-Cam, Podcast, Stream, etc.)
- 6 produits avec offres de lancement
- Règle: `type = "Studio Créatif"`

### 2. Salles de Réunion
**Handle:** `salles-de-reunion`
- Salles Focus et Créative (2-8 personnes)
- 2 produits
- Règle: `type = "Salle de Réunion"`

### 3. Espaces Événementiels
**Handle:** `espaces-evenementiels`
- Terrasse Panoramique et Lounge & Café
- 2 produits
- Règle: `type = "Espace Événementiel"`

### 4. Salles de Conférence
**Handle:** `salles-de-conference`
- Grande salle jusqu'à 80 personnes
- 1 produit
- Règle: `type = "Salle de Conférence"`

### 5. Services de Post-Production
**Handle:** `post-production`
- Montage standard, premium, clipping shorts
- 3 produits
- Règle: `type = "Service Post-Production"`

### 6. Location Équipement
**Handle:** `location-equipement`
- Téléprompter, caméras extras, ATEM
- 3 produits
- Règle: `type = "Location Équipement"`

### 7. Offres de Lancement
**Handle:** `offres-de-lancement`
- Tous les produits avec réductions temporaires
- 6 studios avec -38% à -40%
- Règle: `tag = "offre-lancement"`

### 8. Les Plus Populaires
**Handle:** `populaires`
- Produits les plus réservés
- Triés par ventes
- Règle: `tag = "populaire"`

## Scripts Disponibles

### Créer les collections
```bash
npm run shopify:create-collections
```
Crée les 8 collections smart et supprime les anciennes (sauf "Page d'accueil")

### Setup complet (inclut les collections)
```bash
npm run shopify:setup-all
```
Exécute dans l'ordre :
1. Création des produits
2. Création des collections ✨ NOUVEAU
3. Génération des créneaux
4. Configuration des webhooks

## Avantages des Smart Collections

- **Automatiques** : Les produits sont assignés automatiquement selon leurs propriétés
- **Dynamiques** : Nouveaux produits apparaissent automatiquement dans les bonnes collections
- **Aucune maintenance** : Pas besoin d'assigner manuellement les produits
- **SEO optimisé** : Chaque collection a sa propre URL et description

## Vérification

Après l'exécution du script, vérifiez :

1. **Admin Shopify** : https://renaissance-9581.myshopify.com/admin/collections
2. **Comptage des produits** : Chaque collection doit contenir ses produits
3. **URLs publiques** :
   - `/collections/studios-creatifs`
   - `/collections/offres-de-lancement`
   - etc.

## Notes Techniques

- Les collections utilisent l'API `smart_collections` de Shopify
- Les règles sont basées sur `product_type` et `tags`
- Le tri peut être `manual` ou `best-selling`
- Les collections sont publiées automatiquement
