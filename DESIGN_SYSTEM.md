# Design System - Le 40 Coworking

**Guide complet du système de design pour les développeurs**

Version: 2.0
Dernière mise à jour: 28 Octobre 2025

---

## Table des Matières

1. [Introduction](#introduction)
2. [Couleurs](#couleurs)
3. [Typographie](#typographie)
4. [Espacements](#espacements)
5. [Composants](#composants)
6. [Animations](#animations)
7. [Responsive Design](#responsive-design)
8. [Accessibilité](#accessibilité)
9. [Exemples de Code](#exemples-de-code)

---

## Introduction

Le système de design de Le 40 Coworking est construit sur **Tailwind CSS** avec des design tokens personnalisés définis dans `src/styles/designTokens.ts`. Ce guide vous aidera à créer des interfaces cohérentes et accessibles.

### Principes de Base

✅ **Toujours utiliser les design tokens** au lieu de valeurs hardcodées
✅ **Mobile-first** pour toutes les interfaces
✅ **Dark theme** par défaut avec fonds noirs
✅ **Animations fluides** avec Framer Motion
✅ **Accessibilité WCAG AA** minimum

---

## Couleurs

### Palette de Marque

```typescript
// Fichier: src/styles/designTokens.ts

colors: {
  brand: {
    primary: '#F59E0B',      // Orange - Domiciliation & Salles
    secondary: '#06B6D4',    // Cyan - Coworking & Community
    accent: '#10B981'        // Emerald - Studios
  }
}
```

### Couleurs par Service

Chaque service a sa propre couleur pour une meilleure identité visuelle :

| Service | Couleur Principale | Gradient |
|---------|-------------------|----------|
| **Coworking** | Cyan (#06B6D4) | `from-cyan-500 via-blue-500 to-teal-500` |
| **Domiciliation** | Orange (#F59E0B) | `from-orange-500 via-amber-500 to-yellow-500` |
| **Salles** | Orange (#F59E0B) | `from-orange-500 via-amber-500 to-yellow-500` |
| **Studios** | Emerald (#10B981) | `from-emerald-500 via-teal-500 to-cyan-500` |
| **Community** | Cyan (#06B6D4) | `from-cyan-500 via-blue-500 to-teal-500` |

### Utilisation

```tsx
// ✅ CORRECT - Utiliser les tokens
import { designTokens } from '@/styles/designTokens';

<div className={`text-transparent bg-clip-text bg-gradient-to-r ${designTokens.colors.services.coworking.gradient}`}>
  Coworking
</div>

// ❌ INCORRECT - Hardcoder les couleurs
<div className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
  Coworking
</div>
```

### Couleurs de Fond (Dark Theme)

```typescript
background: {
  primary: '#0A0A0A',      // Noir profond - Fond principal
  secondary: '#0F0F0F',    // Noir nuancé - Sections alternées
  tertiary: '#1A1A1A'      // Noir plus clair - Cards, modales
}
```

**Utilisation :**

```tsx
// Fond principal de page
<div className="min-h-screen bg-[#0A0A0A]">

// Section alternée
<section className="py-32 bg-[#0F0F0F]">

// Card ou modale
<div className="bg-[#1A1A1A] rounded-2xl p-6">
```

### Effets de Glow

```typescript
shadow: {
  'glow-orange': '0 0 30px rgba(245, 158, 11, 0.4)',
  'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.4)',
  'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.4)'
}
```

---

## Typographie

### Familles de Polices

```css
/* Importées via Google Fonts */
font-family: 'Montserrat', sans-serif;  /* Titres */
font-family: 'Inter', sans-serif;       /* Corps de texte */
font-family: 'Playfair Display', serif; /* Accents (rare) */
```

### Échelle Typographique

```typescript
typography: {
  h1: {
    size: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
    weight: 'font-black',           // 900
    leading: 'leading-[0.9]',
    tracking: 'tracking-[-0.04em]',
    family: 'font-montserrat'
  },
  h2: {
    size: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    weight: 'font-black',           // 900
    leading: 'leading-tight',
    tracking: 'tracking-[-0.02em]',
    family: 'font-montserrat'
  },
  h3: {
    size: 'text-3xl sm:text-4xl md:text-5xl',
    weight: 'font-bold',            // 700
    leading: 'leading-tight',
    tracking: 'tracking-tight',
    family: 'font-montserrat'
  },
  h4: {
    size: 'text-2xl sm:text-3xl',
    weight: 'font-bold',
    leading: 'leading-snug',
    family: 'font-montserrat'
  },
  body: {
    size: 'text-base sm:text-lg',
    weight: 'font-normal',          // 400
    leading: 'leading-relaxed',
    family: 'font-inter'
  },
  bodySmall: {
    size: 'text-sm sm:text-base',
    weight: 'font-normal',
    leading: 'leading-relaxed',
    family: 'font-inter'
  }
}
```

### Exemples d'Utilisation

```tsx
// ✅ H1 - Titre principal de page
<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-montserrat font-black leading-[0.9] tracking-[-0.04em] text-white">
  Coworking à Marseille
</h1>

// ✅ H2 - Titre de section
<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-black leading-tight tracking-[-0.02em] text-white">
  Nos Services
</h2>

// ✅ H3 - Sous-titre
<h3 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold leading-tight text-white">
  Formules Flexibles
</h3>

// ✅ Corps de texte
<p className="text-base sm:text-lg font-inter font-normal leading-relaxed text-gray-300">
  Rejoignez notre communauté de créatifs et entrepreneurs.
</p>
```

### Classes Utilitaires CSS (Responsive avec clamp)

```css
/* Fichier: src/index.css */

.text-hero {
  font-size: clamp(2.5rem, 6vw, 5rem);   /* 40px → 80px */
  line-height: 1.1;
  font-weight: 900;
}

.text-section-title {
  font-size: clamp(2rem, 4vw, 4.5rem);    /* 32px → 72px */
  line-height: 1.2;
  font-weight: 700;
}

.text-body-large {
  font-size: clamp(1rem, 2.5vw, 1.25rem); /* 16px → 20px */
  line-height: 1.6;
}
```

---

## Espacements

### System d'Espacement

```typescript
spacing: {
  section: 'py-32',              // 128px - Sections principales
  sectionSmall: 'py-24',         // 96px - Sections secondaires

  container: 'px-6 sm:px-8 lg:px-12',       // Padding conteneur standard
  containerLarge: 'px-6 sm:px-8 lg:px-16',  // Padding conteneur large (défaut)

  gap: {
    xs: 'gap-2',    // 8px
    sm: 'gap-4',    // 16px
    md: 'gap-6',    // 24px
    lg: 'gap-8',    // 32px
    xl: 'gap-12',   // 48px
    xxl: 'gap-16'   // 64px
  }
}
```

### Utilisation des Espacements

```tsx
// ✅ Section principale avec padding vertical
<section className="py-32 px-6 sm:px-8 lg:px-16">
  <div className="max-w-7xl mx-auto">
    {/* Contenu */}
  </div>
</section>

// ✅ Section secondaire
<section className="py-24 px-6 sm:px-8 lg:px-16">

// ✅ Grid avec gaps
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// ✅ Flex avec gaps
<div className="flex flex-col sm:flex-row gap-4">
```

### Conteneurs

```tsx
// ✅ Conteneur standard (max-width: 1280px)
<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

// ✅ Conteneur large (max-width: 1536px)
<div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">

// ✅ Conteneur étroit (max-width: 768px)
<div className="max-w-3xl mx-auto px-6 sm:px-8">
```

---

## Composants

### Button Component

**Fichier :** `src/components/UI/Button.tsx`

#### Variants

```tsx
import { Button } from '@/components/UI/Button';

// Primary - Gradient orange avec glow
<Button variant="primary" size="md">
  Réserver maintenant
</Button>

// Secondary - Glass effect
<Button variant="secondary" size="md">
  En savoir plus
</Button>

// Outline - Bordure orange
<Button variant="outline" size="md">
  Voir les tarifs
</Button>

// Ghost - Transparent
<Button variant="ghost" size="sm">
  Annuler
</Button>
```

#### Tailles

```tsx
<Button size="sm">Small</Button>   // px-6 py-3 text-sm
<Button size="md">Medium</Button>  // px-8 py-4 text-base (défaut)
<Button size="lg">Large</Button>   // px-10 py-5 text-lg
```

#### Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

### Card Pattern (Glass Morphism)

```tsx
// ✅ Card avec glass effect
<div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
  <h3 className="text-2xl font-bold text-white mb-4">
    Titre de la card
  </h3>
  <p className="text-gray-300 leading-relaxed">
    Description du contenu...
  </p>
</div>

// Ou utiliser la classe utilitaire
<div className="glass-effect rounded-2xl p-6">
```

### LazyImage Component

**Fichier :** `src/components/UI/LazyImage.tsx`

```tsx
import { LazyImage } from '@/components/UI/LazyImage';

<LazyImage
  src="/images/coworking-space.jpg"
  alt="Espace de coworking moderne"
  className="w-full h-64 object-cover rounded-2xl"
/>
```

**Features :**
- IntersectionObserver avec rootMargin 100px
- Fade-in animation
- React.memo() optimisé
- Fallback native loading="lazy"

---

## Animations

### Framer Motion Patterns

#### Pattern 1 : Scroll-Triggered Reveal

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  {/* Contenu */}
</motion.div>
```

#### Pattern 2 : Staggered Children

```tsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      delay: index * 0.15,  // Délai progressif
      duration: 0.8
    }}
  >
    {item}
  </motion.div>
))}
```

#### Pattern 3 : Hover Effects

```tsx
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.3 }}
>
  Hover me
</motion.button>
```

#### Pattern 4 : AnimatePresence (Exit Animations)

```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {/* Contenu */}
    </motion.div>
  )}
</AnimatePresence>
```

### CSS Animations

#### Ken Burns Effect (Zoom sur images)

```tsx
<img
  src="/image.jpg"
  className="ken-burns w-full h-full object-cover"
  alt="Description"
/>
```

#### Gradient Text Animé

```tsx
<span className="gradient-text">
  Texte avec gradient animé
</span>
```

#### Film Grain Effect

```tsx
<section className="relative film-grain">
  {/* L'effet grain s'applique via ::before */}
</section>
```

### Animations Design Tokens

```typescript
animations: {
  hover: {
    scale: {
      small: 'hover:scale-[1.02]',
      medium: 'hover:scale-105',
      large: 'hover:scale-110'
    },
    y: {
      small: 'hover:-translate-y-1',
      medium: 'hover:-translate-y-2',
      large: 'hover:-translate-y-4'
    }
  },
  transition: {
    fast: 'transition-all duration-300',
    normal: 'transition-all duration-500',
    slow: 'transition-all duration-700'
  }
}
```

---

## Responsive Design

### Breakpoints Tailwind

```javascript
// Configuration par défaut utilisée
sm: '640px',   // Mobile landscape / Petite tablette
md: '768px',   // Tablette
lg: '1024px',  // Desktop / Laptop
xl: '1280px',  // Large desktop
2xl: '1536px'  // Ultra-wide
```

### Approche Mobile-First

✅ **TOUJOURS** écrire les styles pour mobile d'abord, puis ajouter les breakpoints :

```tsx
// ✅ CORRECT - Mobile-first
<div className="flex flex-col sm:flex-row gap-4">
  // Mobile: colonne, Desktop: ligne
</div>

<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
  // Mobile: 5xl, progressivement plus grand
</h1>

// ❌ INCORRECT - Desktop-first
<div className="flex flex-row sm:flex-col">
  // Anti-pattern
</div>
```

### Patterns Responsive Communs

#### Pattern A : Grilles Progressives

```tsx
// 1 colonne mobile → 2 colonnes tablette → 3 colonnes desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 2 colonnes mobile → 4 colonnes desktop
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
```

#### Pattern B : Flex Direction

```tsx
// Colonne mobile → Ligne desktop
<div className="flex flex-col sm:flex-row gap-4">

// Avec items-center pour alignement vertical
<div className="flex flex-col sm:flex-row items-center gap-4">
```

#### Pattern C : Visibilité Conditionnelle

```tsx
// Masquer sur mobile, afficher sur desktop
<div className="hidden lg:block">
  Desktop only content
</div>

// Afficher sur mobile, masquer sur desktop
<div className="lg:hidden">
  Mobile only content
</div>
```

#### Pattern D : Width Responsive

```tsx
// Pleine largeur mobile → width auto desktop
<button className="w-full sm:w-auto">
  Responsive button
</button>
```

### Navigation Responsive

```tsx
// Sidebar visible uniquement desktop (lg+)
<nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[320px]">
  {/* Desktop sidebar */}
</nav>

// Mobile burger menu (< lg)
<div className="lg:hidden">
  <MobileBurger />
</div>

// Main content avec offset pour sidebar desktop
<main className="lg:ml-60">
  {/* Content */}
</main>
```

---

## Accessibilité

### Principes WCAG AA

✅ Contraste minimum 4.5:1 pour texte normal
✅ Contraste minimum 3:1 pour texte large (18px+)
✅ Navigation clavier complète
✅ Attributs ARIA appropriés
✅ Focus states visibles
✅ Animations réduites optionnelles

### Focus States

```css
/* Fichier: src/index.css */
.focus-visible:focus {
  outline: 2px solid #F59E0B;
  outline-offset: 2px;
}
```

Tous les éléments interactifs doivent avoir un focus visible :

```tsx
<button className="focus-visible:focus">
  Bouton accessible
</button>
```

### Reduced Motion

Le système respecte automatiquement `prefers-reduced-motion` :

```css
/* Fichier: src/index.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Attributs ARIA

```tsx
// Bouton avec label explicite
<button aria-label="Fermer le menu">
  <X className="w-6 h-6" />
</button>

// Navigation avec role
<nav role="navigation" aria-label="Navigation principale">

// Section avec heading
<section aria-labelledby="pricing-title">
  <h2 id="pricing-title">Nos Tarifs</h2>
</section>
```

### Images Accessibles

```tsx
// ✅ Alt descriptif
<img
  src="/coworking.jpg"
  alt="Espace de coworking moderne avec bureaux partagés et lumière naturelle"
/>

// ✅ Image décorative
<img
  src="/pattern.svg"
  alt=""
  role="presentation"
/>
```

### Navigation Clavier

Assurez-vous que tous les éléments interactifs sont accessibles au clavier :

```tsx
// ✅ Button natif (focusable par défaut)
<button onClick={handleClick}>
  Click me
</button>

// ⚠️ Div cliquable (ajouter tabIndex et role)
<div
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  tabIndex={0}
  role="button"
>
  Click me
</div>
```

---

## Exemples de Code

### Page Complète - Structure Type

```tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { designTokens } from '@/styles/designTokens';

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-6"
          >
            Titre Principal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg font-inter text-gray-300 mb-8 max-w-2xl"
          >
            Description du service ou de la page.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="primary" size="lg">
              Call to Action
            </Button>
            <Button variant="secondary" size="lg">
              En savoir plus
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-16 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-black text-white mb-12 text-center">
            Section Titre
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500"
              >
                <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
                  Card {item}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Contenu de la card avec description.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

### Gradient Text avec Couleur de Service

```tsx
import { designTokens } from '@/styles/designTokens';

// Coworking (Cyan)
<span className={`text-transparent bg-clip-text bg-gradient-to-r ${designTokens.colors.services.coworking.gradient}`}>
  Coworking
</span>

// Domiciliation (Orange)
<span className={`text-transparent bg-clip-text bg-gradient-to-r ${designTokens.colors.services.domiciliation.gradient}`}>
  Domiciliation
</span>

// Studios (Emerald)
<span className={`text-transparent bg-clip-text bg-gradient-to-r ${designTokens.colors.services.studios.gradient}`}>
  Studios
</span>
```

### Card Interactive avec Hover Effect

```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  transition={{ duration: 0.3 }}
  className="group relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer"
>
  {/* Glow effect on hover */}
  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

  {/* Content */}
  <div className="relative">
    <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
      Titre de la Card
    </h3>
    <p className="text-gray-300 leading-relaxed">
      Description avec hover effect
    </p>
  </div>
</motion.div>
```

---

## Checklist pour Nouveaux Composants

Avant de créer ou modifier un composant, vérifiez :

- [ ] Utilise les design tokens (couleurs, typographie, espacements)
- [ ] Mobile-first avec breakpoints appropriés
- [ ] Focus states visibles et accessibles
- [ ] Attributs ARIA si nécessaire
- [ ] Alt text descriptif pour les images
- [ ] Animations respectent prefers-reduced-motion
- [ ] Contraste WCAG AA minimum (4.5:1)
- [ ] Navigation clavier fonctionnelle
- [ ] Composants réutilisables (Button, LazyImage) utilisés
- [ ] Code TypeScript avec types appropriés

---

## Ressources

### Fichiers Importants

- `src/styles/designTokens.ts` - Tous les design tokens
- `src/index.css` - Styles globaux et animations
- `tailwind.config.js` - Configuration Tailwind
- `src/components/UI/` - Composants réutilisables

### Outils Recommandés

- **WebAIM Contrast Checker** - Vérifier les contrastes
- **Lighthouse** - Audit accessibilité et performance
- **React DevTools** - Debug composants
- **Tailwind CSS IntelliSense** - Autocomplétion VSCode

### Documentation Externe

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Dernière mise à jour :** 28 Octobre 2025
**Mainteneur :** Équipe Le 40 Coworking

Pour toute question ou suggestion d'amélioration, consultez `DESIGN_AUDIT_GLOBAL.md` ou contactez l'équipe.
