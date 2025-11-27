# Guide d'Utilisation - BottomBar

## Vue d'Ensemble

La **BottomBar** est une bannière d'information moderne positionnée en bas de l'écran qui remplace les anciens `StickyHeader` qui apparaissaient en haut et masquaient le header principal.

## Avantages

- ✅ Ne masque jamais le header principal
- ✅ Plus visible (regard naturellement en bas d'écran)
- ✅ Design moderne type "notification bar" (Notion, Linear, Vercel)
- ✅ Composant réutilisable et configurable
- ✅ Animations fluides et naturelles
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Persistance de l'état (localStorage)
- ✅ Accessible (clavier, ARIA labels)

## Utilisation

### Import

```tsx
import BottomBar from '../components/Shared/BottomBar';
import { Calendar } from 'lucide-react';
```

### Exemple de Base

```tsx
<BottomBar
  variant="salles"
  title="Salles de Réunion Marseille"
  subtitle="Dès 50€/heure"
  features={[
    { text: 'Réservation facile', pulse: false },
    { text: 'Équipement pro', pulse: false },
    { text: '4 à 50 personnes', highlight: true },
  ]}
  ctaText="Réserver"
  ctaHref="#spaces"
  phoneNumber="04 13 00 10 00"
  icon={<Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `'salles' \| 'bureaux' \| 'domiciliation' \| 'studios' \| 'events' \| 'club'` | Définit les couleurs et le style |
| `title` | `string` | Titre principal affiché |
| `subtitle` | `string` | Prix ou info secondaire |
| `features` | `Array<Feature>` | Liste des points clés (voir ci-dessous) |
| `ctaText` | `string` | Texte du bouton d'action principal |
| `ctaHref` | `string` | Lien du bouton d'action |
| `phoneNumber` | `string` (optionnel) | Numéro de téléphone |
| `icon` | `React.ReactNode` | Icône à afficher |
| `scrollThreshold` | `number` (optionnel) | Seuil d'apparition (défaut: 0.8) |

### Type Feature

```typescript
{
  text: string;        // Texte du point clé
  highlight?: boolean; // Mettre en surbrillance (couleur d'accent)
  pulse?: boolean;     // Ajouter une animation de pulsation
}
```

## Variants Disponibles

### Salles (Cyan/Blue)
- Gradient: cyan → blue
- Couleur d'accent: cyan-400
- Utilisé pour: Salles de réunion

### Bureaux (Emerald/Teal)
- Gradient: emerald → teal
- Couleur d'accent: emerald-400
- Utilisé pour: Bureaux privés

### Domiciliation (Orange/Amber)
- Gradient: orange → amber
- Couleur d'accent: orange-400
- Utilisé pour: Services de domiciliation

### Studios (Purple/Violet)
- Gradient: purple → violet
- Couleur d'accent: purple-400
- Utilisé pour: Studios créatifs et production

### Events (Cyan/Blue)
- Gradient: cyan → blue (plus foncé que Salles)
- Couleur d'accent: cyan-400
- Utilisé pour: Événements et networking

### Club (Red/Rose)
- Gradient: red → rose
- Couleur d'accent: red-400
- Utilisé pour: Club entrepreneurs premium

## Comportement

### Apparition
- La barre apparaît après avoir scrollé 80% de la hauteur du hero (configurable via `scrollThreshold`)
- Animation de slide depuis le bas avec effet spring naturel

### États
- **Étendu** : Toutes les informations visibles
- **Réduit** : Version compacte (bouton toggle avec chevron)
- **Fermé** : Disparaît complètement (bouton X)

### Persistance
L'état de la barre est sauvegardé dans `localStorage`:
- `bottomBar_${variant}_expanded` : État étendu/réduit
- `bottomBar_${variant}_dismissed` : État fermé définitivement

## Responsive

### Mobile (< 640px)
- Hauteur: 56px
- Icône + titre court + CTA uniquement
- Features et téléphone masqués

### Tablet (640px - 1024px)
- Hauteur: 64px
- Titre + prix + CTA + toggle
- Features masquées

### Desktop (> 1024px)
- Hauteur: 80px
- Tous les éléments visibles
- Spacing généreux

## Migration depuis StickyHeader

### Avant (Ancien code)
```tsx
import StickyHeader from '../components/Salles/StickyHeader';

<StickyHeader />
```

### Après (Nouveau code)
```tsx
import BottomBar from '../components/Shared/BottomBar';
import { Calendar } from 'lucide-react';

<BottomBar
  variant="salles"
  title="Salles de Réunion Marseille"
  subtitle="Dès 50€/heure"
  features={[
    { text: 'Réservation facile' },
    { text: 'Équipement pro' },
    { text: '4 à 50 personnes', highlight: true },
  ]}
  ctaText="Réserver"
  ctaHref="#spaces"
  phoneNumber="04 13 00 10 00"
  icon={<Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />}
/>
```

## Accessibilité

- Tous les boutons ont des labels ARIA appropriés
- Navigation au clavier complète (Tab, Enter, Escape)
- Contraste de couleurs conforme WCAG
- Focus visible pour tous les éléments interactifs

## Z-Index Management

Pour éviter les conflits de z-index, utilisez les constantes définies dans `src/utils/zIndex.ts`:

```typescript
import { Z_INDEX } from '@/utils/zIndex';

// BottomBar : z-40
// HeaderNav : z-100
// MobileBurger : z-150
// Modal : z-200
// Toast : z-300
```

## Pages Implémentées

- ✅ `/salles` - Salles de Réunion (Cyan/Blue)
- ✅ `/bureaux` - Bureaux Privés (Emerald/Teal)
- ✅ `/domiciliation` - Services de Domiciliation (Orange/Amber)
- ✅ `/studios` - Studios Créatifs (Purple/Violet)
- ✅ `/events` - Événements & Networking (Cyan/Blue)
- ✅ `/club` - Club Entrepreneurs (Red/Rose)

## Personnalisation

Pour ajouter un nouveau variant:

1. Ajouter le variant dans le type `variant`
2. Ajouter les styles dans `variantStyles`
3. Utiliser le nouveau variant dans votre page

```typescript
const variantStyles = {
  // ... variants existants
  monNouveauService: {
    gradient: 'from-purple-600 to-pink-600',
    gradientHover: 'from-purple-700 to-pink-700',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    glowColor: 'shadow-purple-500/30',
    pulseColor: 'bg-purple-400',
    barGradient: 'from-purple-500 via-pink-500 to-purple-500',
  },
};
```

## Troubleshooting

### La barre n'apparaît pas
- Vérifier que vous avez scrollé suffisamment (par défaut 80% du hero)
- Vérifier que la barre n'a pas été fermée (vider le localStorage si besoin)

### Conflits de z-index
- Utiliser les constantes de `src/utils/zIndex.ts`
- BottomBar est à z-40, bien en dessous du HeaderNav (z-100)

### Animation saccadée
- Vérifier que `will-change: transform` est présent
- Réduire le debounce du scroll listener si nécessaire

## Support

Pour toute question ou amélioration, référez-vous au code source dans:
- Component: `src/components/Shared/BottomBar.tsx`
- Z-Index: `src/utils/zIndex.ts`
- Documentation: Ce fichier
