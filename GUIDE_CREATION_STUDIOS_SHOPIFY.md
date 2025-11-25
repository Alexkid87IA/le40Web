# Guide : Créer les Produits Studios sur Shopify

## Étape 1 : Créer la Collection

1. Va sur Shopify Admin → **Produits** → **Collections**
2. Clique **Créer une collection**
3. Remplis :
   - **Titre** : `Studios Location`
   - **Description** : `Louez nos studios professionnels à l'heure, demi-journée ou journée complète. Équipements premium inclus.`
   - **Type de collection** : Manuel
4. **Enregistrer**
5. **Note le handle** : devrait être `studios-location`

---

## Étape 2 : Créer Studio Podcast

1. Va sur **Produits** → **Ajouter un produit**
2. Remplis :

### Informations générales
- **Titre** : `Studio Podcast Le 40`
- **Description** :
```
Studio podcast professionnel équipé

• Interface audio Focusrite Scarlett
• 2 microphones Shure SM7B
• Casques monitoring professionnels
• Traitement acoustique complet
• Enregistrement multipiste
• Table de mixage 8 canaux
• Espace confortable pour 2-3 personnes

Prix dégressifs :
• 2 heures : 80€ (40€/h)
• 4 heures : 140€ (35€/h) - Économie 12.5%
• 8 heures : 250€ (31.25€/h) - Économie 22%
```

### Options du produit
- Activer **Ce produit a plusieurs options**
- Option 1 : **Durée**
  - Valeurs : `2 heures`, `4 heures (Demi-journée)`, `8 heures (Journée complète)`

### Variants
Crée 3 variants avec ces prix :
- **2 heures** : 80,00€ | SKU: `STUDIO-PODCAST-2H`
- **4 heures (Demi-journée)** : 140,00€ | SKU: `STUDIO-PODCAST-4H`
- **8 heures (Journée complète)** : 250,00€ | SKU: `STUDIO-PODCAST-8H`

### Inventaire
Pour chaque variant :
- **Suivre la quantité** : NON (décocher)
- **Continuer la vente** : OUI

### Organisation
- **Type de produit** : `Studio Location`
- **Fournisseur** : `Le 40`
- **Collections** : Ajouter à `Studios Location`
- **Tags** : `studio`, `studio-podcast`, `location-horaire`

3. **Enregistrer** le produit

---

## Étape 3 : Créer Studio Vidéo

Répète le processus avec :

### Informations
- **Titre** : `Studio Vidéo Le 40`
- **Description** :
```
Studio vidéo avec fond vert professionnel

• Fond vert 3x6m professionnel
• Kit d'éclairage LED RGB complet
• 2 caméras Sony 4K
• Stabilisateurs et trépieds professionnels
• Espace de tournage 25m²
• Régie de contrôle incluse
• Moniteurs de retour HD

Prix dégressifs :
• 2 heures : 120€ (60€/h)
• 4 heures : 220€ (55€/h) - Économie 8%
• 8 heures : 400€ (50€/h) - Économie 17%
```

### Variants
- **2 heures** : 120,00€ | SKU: `STUDIO-VIDEO-2H`
- **4 heures (Demi-journée)** : 220,00€ | SKU: `STUDIO-VIDEO-4H`
- **8 heures (Journée complète)** : 400,00€ | SKU: `STUDIO-VIDEO-8H`

### Tags
- `studio`, `studio-video`, `location-horaire`

---

## Étape 4 : Créer Studio Photo

Répète le processus avec :

### Informations
- **Titre** : `Studio Photo Le 40`
- **Description** :
```
Studio photo modulable avec équipement professionnel

• Cyclorama blanc professionnel
• Kit flash Profoto avec softbox
• Parapluies et diffuseurs multiples
• Fonds multiples (blanc/noir/gris)
• Espace shooting 30m²
• Zone maquillage et préparation
• Réflecteurs et accessoires

Prix dégressifs :
• 2 heures : 100€ (50€/h)
• 4 heures : 180€ (45€/h) - Économie 10%
• 8 heures : 320€ (40€/h) - Économie 20%
```

### Variants
- **2 heures** : 100,00€ | SKU: `STUDIO-PHOTO-2H`
- **4 heures (Demi-journée)** : 180,00€ | SKU: `STUDIO-PHOTO-4H`
- **8 heures (Journée complète)** : 320,00€ | SKU: `STUDIO-PHOTO-8H`

### Tags
- `studio`, `studio-photo`, `location-horaire`

---

## ✅ Vérification finale

Une fois les 3 produits créés :

1. Va dans **Collections** → **Studios Location**
2. Vérifie que les 3 studios apparaissent
3. Le handle de la collection devrait être : `studios-location`
4. Note le handle pour utiliser dans le code : `useShopifyCollection('studios-location')`

---

## 📝 Informations pour le développement

**Collection handle** : `studios-location`

**Produits créés** :
- Studio Podcast Le 40 (3 variants)
- Studio Vidéo Le 40 (3 variants)
- Studio Photo Le 40 (3 variants)

**Tags utilisés** :
- `studio` (commun à tous)
- `studio-podcast` / `studio-video` / `studio-photo` (spécifique)
- `location-horaire` (commun à tous)

Le hook à utiliser dans le code :
```typescript
const { products, loading } = useShopifyCollection('studios-location');
```
