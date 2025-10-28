# Le 40 Coworking - Platform Web

Application web pour Le 40, espace de coworking à Marseille proposant des bureaux privés, salles de réunion, studios photo/vidéo et services de domiciliation.

## 🚀 Stack Technique

- **Frontend**: React 18.3.1 + TypeScript 5.5.3
- **Build**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 10.16.16
- **Backend**: Supabase (PostgreSQL)
- **Routing**: React Router DOM 6.20.1
- **Validation**: Zod 4.1.12
- **Icons**: Lucide React 0.344.0

## 📋 Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Compte Supabase (pour la base de données)

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd le40Web
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Remplir `.env` avec vos credentials Supabase:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_ENV=development
VITE_ENABLE_ERROR_LOGGING=true
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📦 Scripts disponibles

```bash
npm run dev        # Serveur de développement Vite
npm run build      # Build de production
npm run preview    # Preview du build de production
npm run lint       # Vérification ESLint
```

## 🏗️ Structure du projet

```
le40Web/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Cart/           # Système de panier
│   │   ├── Domiciliation/  # Composants domiciliation
│   │   ├── Footer/         # Footer
│   │   ├── Nav/            # Navigation
│   │   ├── Preroll/        # Modal de sélection service
│   │   └── UI/             # Composants UI de base
│   ├── contexts/            # React Contexts
│   │   ├── CartContext.tsx
│   │   └── PrerollContext.tsx
│   ├── data/                # Données statiques
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Pages de l'application
│   ├── router/              # Configuration routing
│   ├── sections/            # Sections de pages
│   ├── styles/              # Design tokens et styles globaux
│   ├── utils/               # Utilitaires
│   │   ├── env.ts          # Validation variables d'environnement
│   │   ├── logger.ts       # Système de logging sécurisé
│   │   └── validation.ts   # Schémas de validation Zod
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   └── migrations/          # Migrations SQL
├── .env.example             # Template variables d'environnement
├── SECURITY.md              # Documentation sécurité
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔐 Sécurité

Ce projet implémente plusieurs mesures de sécurité :

- ✅ Validation des variables d'environnement (Zod)
- ✅ Protection XSS sur localStorage
- ✅ Logging sécurisé (données sensibles masquées en production)
- ✅ Validation des inputs utilisateur
- ✅ Row Level Security (RLS) sur Supabase

Pour plus de détails, consultez [SECURITY.md](./SECURITY.md)

## 🎨 Fonctionnalités

### Services proposés
- **Coworking** - Espaces de travail partagés
- **Bureaux privés** - Bureaux dédiés pour équipes
- **Salles de réunion** - Salles équipées à l'heure/journée
- **Studios** - Studios photo/vidéo professionnels
- **Domiciliation** - Domiciliation d'entreprise

### Features techniques
- 🛒 **Système de panier** avec persistence localStorage
- 📊 **Analytics** avec Supabase (sélections services, interactions)
- 🎭 **Modal Preroll** pour guider l'utilisateur
- 📱 **Responsive design** mobile-first
- ✨ **Animations** fluides avec Framer Motion
- 🎨 **Design system** avec Tailwind CSS
- 🔄 **Navigation** multi-pages avec React Router

## 🗄️ Base de données

### Tables Supabase

#### `preroll_selections`
Collecte des analytics sur les sélections de services.

```sql
- id (uuid)
- session_id (text)
- selected_service (text)
- created_at (timestamptz)
- user_agent (text)
- referrer (text)
- screen_width (integer)
- screen_height (integer)
- timestamp (timestamptz)
- interaction_data (jsonb)
```

### Migrations
Les migrations SQL sont dans `supabase/migrations/`:
- `20251027213452_create_preroll_analytics.sql`
- `20251028102244_enhance_preroll_analytics.sql`

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

Le dossier `dist/` contient l'application prête pour le déploiement.

### Plateformes recommandées
- **Vercel** (recommandé)
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages**

### Variables d'environnement en production
N'oubliez pas de configurer les variables d'environnement sur votre plateforme:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_ENV=production`
- `VITE_ENABLE_ERROR_LOGGING=true`

## 🧪 Tests

⚠️ **Tests à venir** - Aucun framework de test n'est actuellement configuré.

Roadmap tests:
- [ ] Installer Vitest
- [ ] Tests unitaires pour Contexts
- [ ] Tests d'intégration
- [ ] Tests E2E avec Playwright

## 📈 Performance

### Optimisations recommandées
- [ ] Lazy loading des routes
- [ ] Optimisation des images (WebP)
- [ ] Code splitting
- [ ] React.memo sur composants lourds
- [ ] Service Worker / PWA

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Propriété de Le 40 Coworking.

## 📞 Contact

Le 40 - Espace de Coworking
Marseille, France

- Site web: [le40.fr](https://le40.fr)
- Email: contact@le40.fr

---

**Version**: 0.0.0
**Dernière mise à jour**: 2025-10-28
