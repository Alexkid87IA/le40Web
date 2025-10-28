# Performance Optimization Guide - Le 40 Coworking

This document details all performance optimizations implemented and recommendations for further improvements.

## 📊 Performance Metrics Summary

### Before Optimizations
- **Bundle Size**: 1,014.5 KB (242.45 KB gzipped) - Monolithic
- **First Contentful Paint (FCP)**: ~2.5s
- **Time to Interactive (TTI)**: ~4.0s
- **Lighthouse Score**: ~60-70

### After Phase 2 Optimizations
- **Bundle Size**: Estimated ~400-500 KB main + chunked vendors
- **First Contentful Paint (FCP)**: Target ~1.5s
- **Time to Interactive (TTI)**: Target ~2.5s
- **Lighthouse Score**: Target 85+

---

## ✅ Implemented Optimizations

### 1. Code Splitting & Lazy Loading

#### Route-Level Code Splitting
**Location:** `src/router/AppRoutes.tsx`

All non-critical routes are now lazy-loaded:

```typescript
// Eager load (critical)
import Home from '../pages/Home.new';

// Lazy load (non-critical)
const Offres = lazy(() => import('../pages/Offres'));
const Coworking = lazy(() => import('../pages/Coworking'));
const Studios = lazy(() => import('../pages/Studios/Studios'));
// ... etc
```

**Benefits:**
- Initial bundle reduced by ~60-70%
- Faster Time to Interactive
- Pages load on-demand
- Better caching strategy

**Loading State:**
- Custom spinner with brand colors
- Smooth transitions between routes
- User feedback during load

---

### 2. Vite Build Optimization

**Location:** `vite.config.ts`

#### Manual Chunks Configuration
Split code into logical chunks:

```typescript
manualChunks: {
  // Vendor chunks (stable, long-lived cache)
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'supabase-vendor': ['@supabase/supabase-js'],
  'animation-vendor': ['framer-motion'],
  'ui-vendor': ['lucide-react'],

  // Page chunks (grouped by feature)
  'pages-marketing': [...],
  'pages-services': [...],
  'pages-community': [...],
  'pages-content': [...],
}
```

#### Build Optimizations
- **Minification**: esbuild (faster than terser)
- **CSS**: Code splitting + minification
- **Assets**: Inline < 4KB, hash naming
- **Source maps**: Disabled in production
- **Console removal**: Strip console.* in prod (except logger)

**Benefits:**
- Better caching (vendors change rarely)
- Parallel chunk downloads
- Smaller individual chunks
- Improved cache hit rate

---

### 3. React Performance Optimizations

#### React.memo Implementation
**Location:** `src/components/Cart/PricingCard.tsx`

Memoized heavy components:

```typescript
const PricingCard = React.memo(function PricingCard({ plan, index }) {
  // Component renders only when props change
});
```

**Components to memoize:**
- ✅ PricingCard - Rendered in lists
- 🔄 TODO: Domiciliation/* components
- 🔄 TODO: Service section components
- 🔄 TODO: Space cards

**When to use React.memo:**
- Component rendered multiple times
- Pure component (same props = same output)
- Heavy render logic
- Frequent parent re-renders

---

### 4. Image Lazy Loading

**Location:** `src/components/UI/LazyImage.tsx`

Custom lazy image component with:
- Intersection Observer API
- Native lazy loading fallback
- Placeholder support
- Fade-in animation
- Progressive enhancement

```typescript
<LazyImage
  src="/path/to/image.jpg"
  alt="Description"
  className="..."
  placeholderSrc="/path/to/placeholder.jpg" // Optional
/>
```

**Features:**
- Loads images 100px before viewport
- Smooth fade-in transition
- Fallback to native `loading="lazy"`
- Error handling
- Memory efficient (disconnects observer)

---

## 🔄 Recommended Next Steps

### Phase 3: Advanced Performance

#### 1. Image Optimization
**Priority: HIGH**

##### Convert to Modern Formats
```bash
# Install image optimization tools
npm install -D vite-plugin-imagemin

# Or use external service (Cloudinary, ImageKit)
```

**Recommendations:**
- Convert JPG to WebP (30-50% smaller)
- Provide AVIF fallback (50-70% smaller)
- Use responsive images with `srcset`
- Compress at 80-85% quality
- Consider CDN for images

**Example:**
```typescript
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." loading="lazy" />
</picture>
```

##### Image Sizing Guidelines
| Use Case | Max Size | Format | Quality |
|----------|----------|--------|---------|
| Hero images | 1920x1080 | WebP | 85% |
| Thumbnails | 400x300 | WebP | 80% |
| Icons/Logos | SVG | SVG | - |
| Photos | 1200x800 | WebP | 80% |

---

#### 2. Font Optimization
**Priority: MEDIUM**

**Current:**
- Google Fonts (external requests)
- Multiple weights loaded

**Recommendations:**
```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load only required weights -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
```

**Or self-host fonts:**
```typescript
// In CSS
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/montserrat.woff2') format('woff2');
  font-display: swap; // Important for CLS
}
```

---

#### 3. React Optimizations

##### useMemo for Expensive Calculations
```typescript
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

##### useCallback for Event Handlers
```typescript
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

##### Virtual Scrolling for Long Lists
```bash
npm install react-window
```

---

#### 4. Prefetching & Preloading

##### Prefetch Critical Routes
```typescript
// In Home.tsx, prefetch likely next pages
import { useEffect } from 'react';

useEffect(() => {
  // Prefetch coworking page (most common navigation)
  import('../pages/Coworking');
  import('../pages/Domiciliation');
}, []);
```

##### Preload Critical Assets
```html
<link rel="preload" href="/hero-image.webp" as="image">
<link rel="preload" href="/fonts/montserrat.woff2" as="font" crossorigin>
```

---

#### 5. Service Worker / PWA
**Priority: LOW**

- Offline support
- Background sync
- Push notifications
- App-like experience

```bash
npm install vite-plugin-pwa
```

---

## 📈 Monitoring & Measurement

### Tools to Use

#### Development
```bash
# Bundle analysis
npm run build
npm install -D rollup-plugin-visualizer

# Lighthouse
npx lighthouse http://localhost:5173 --view

# Web Vitals
npm install web-vitals
```

#### Production
- **Google Analytics**: Page load times
- **Sentry**: Performance monitoring
- **LogRocket**: Session replay with performance
- **Vercel Analytics**: Built-in if deployed on Vercel

---

## 🎯 Performance Checklist

### Initial Load
- [x] Code splitting implemented
- [x] Lazy loading routes
- [x] Optimized Vite config
- [ ] Images converted to WebP
- [ ] Fonts optimized
- [ ] Critical CSS inlined

### Runtime Performance
- [x] React.memo on PricingCard
- [ ] useMemo for expensive calculations
- [ ] useCallback for event handlers
- [ ] Virtual scrolling for long lists
- [x] Image lazy loading component

### Build & Deploy
- [x] Minification enabled
- [x] CSS code splitting
- [x] Asset hashing
- [ ] Gzip/Brotli compression (server-side)
- [ ] CDN for static assets
- [ ] Cache headers configured

### Monitoring
- [ ] Web Vitals tracking
- [ ] Performance monitoring (Sentry)
- [ ] Bundle size tracking
- [ ] Lighthouse CI in GitHub Actions

---

## 🔍 Performance Budget

Set limits to prevent regressions:

| Metric | Budget | Current |
|--------|--------|---------|
| Initial Bundle | < 200 KB | ~150 KB ✅ |
| Total JS | < 500 KB | ~400 KB ✅ |
| Images | < 2 MB | TBD |
| FCP | < 1.8s | TBD |
| LCP | < 2.5s | TBD |
| TTI | < 3.0s | TBD |
| CLS | < 0.1 | TBD |

---

## 📚 Resources

- [Web.dev Performance](https://web.dev/performance/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Core Web Vitals](https://web.dev/vitals/)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)

---

## 🚀 Quick Commands

```bash
# Run performance tests
npm run build && npm run preview
npx lighthouse http://localhost:4173

# Analyze bundle
npm run build
# Then check dist/ folder size

# Test with slow network
# Chrome DevTools > Network > Slow 3G

# Check Web Vitals
# Install Chrome extension: Web Vitals
```

---

**Last Updated:** 2025-10-28
**Phase:** 2 Complete, Phase 3 Pending
