/**
 * Web Vitals monitoring pour Le 40 Coworking
 * Mesure les Core Web Vitals : LCP, FID, CLS, FCP, TTFB
 */

type MetricName = 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';

interface Metric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

type ReportHandler = (metric: Metric) => void;

// Seuils pour les Core Web Vitals
const thresholds: Record<MetricName, [number, number]> = {
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  FID: [100, 300],
  INP: [200, 500],
  LCP: [2500, 4000],
  TTFB: [800, 1800],
};

function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const [good, poor] = thresholds[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

// Stockage local des métriques pour analyse
const metricsLog: Metric[] = [];

function logMetric(metric: Metric) {
  metricsLog.push(metric);

  // En développement, afficher les métriques dans la console
  if (import.meta.env.DEV) {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(
      `${emoji} [Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`
    );
  }

  // En production, envoyer à un service d'analytics si configuré
  if (import.meta.env.PROD && import.meta.env.VITE_ANALYTICS_ENDPOINT) {
    sendToAnalytics(metric);
  }
}

async function sendToAnalytics(metric: Metric) {
  try {
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    if (!endpoint) return;

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        path: window.location.pathname,
        timestamp: Date.now(),
      }),
      keepalive: true,
    });
  } catch {
    // Silently fail - don't break the app for analytics
  }
}

// Observer pour Largest Contentful Paint (LCP)
function observeLCP(onReport: ReportHandler) {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };

      if (lastEntry) {
        const value = lastEntry.startTime;
        onReport({
          name: 'LCP',
          value,
          rating: getRating('LCP', value),
          delta: value,
          id: `lcp-${Date.now()}`,
          navigationType: getNavigationType(),
        });
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // Browser doesn't support this metric
  }
}

// Observer pour First Input Delay (FID) / Interaction to Next Paint (INP)
function observeFID(onReport: ReportHandler) {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as (PerformanceEntry & { processingStart: number; startTime: number })[];

      for (const entry of entries) {
        const value = entry.processingStart - entry.startTime;
        onReport({
          name: 'FID',
          value,
          rating: getRating('FID', value),
          delta: value,
          id: `fid-${Date.now()}`,
          navigationType: getNavigationType(),
        });
      }
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch {
    // Browser doesn't support this metric
  }
}

// Observer pour Cumulative Layout Shift (CLS)
function observeCLS(onReport: ReportHandler) {
  if (!('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let sessionValue = 0;
  let sessionEntries: PerformanceEntry[] = [];

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[];

      for (const entry of entries) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0] as PerformanceEntry & { startTime: number } | undefined;
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1] as PerformanceEntry & { startTime: number } | undefined;

          if (
            sessionValue &&
            firstSessionEntry &&
            lastSessionEntry &&
            entry.startTime - lastSessionEntry.startTime < 1000 &&
            entry.startTime - firstSessionEntry.startTime < 5000
          ) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            onReport({
              name: 'CLS',
              value: clsValue,
              rating: getRating('CLS', clsValue),
              delta: entry.value,
              id: `cls-${Date.now()}`,
              navigationType: getNavigationType(),
            });
          }
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // Browser doesn't support this metric
  }
}

// Observer pour First Contentful Paint (FCP)
function observeFCP(onReport: ReportHandler) {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByName('first-contentful-paint');
      const entry = entries[entries.length - 1] as PerformanceEntry & { startTime: number } | undefined;

      if (entry) {
        const value = entry.startTime;
        onReport({
          name: 'FCP',
          value,
          rating: getRating('FCP', value),
          delta: value,
          id: `fcp-${Date.now()}`,
          navigationType: getNavigationType(),
        });
      }
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch {
    // Browser doesn't support this metric
  }
}

// Time to First Byte (TTFB)
function observeTTFB(onReport: ReportHandler) {
  try {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;

    if (navigationEntry) {
      const value = navigationEntry.responseStart - navigationEntry.requestStart;
      onReport({
        name: 'TTFB',
        value,
        rating: getRating('TTFB', value),
        delta: value,
        id: `ttfb-${Date.now()}`,
        navigationType: getNavigationType(),
      });
    }
  } catch {
    // Browser doesn't support this metric
  }
}

function getNavigationType(): string {
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  return navEntry?.type || 'navigate';
}

/**
 * Initialise le monitoring des Web Vitals
 * Appeler cette fonction au démarrage de l'application
 */
export function initWebVitals() {
  // Attendre que la page soit chargée
  if (document.readyState === 'complete') {
    startObserving();
  } else {
    window.addEventListener('load', startObserving);
  }
}

function startObserving() {
  observeLCP(logMetric);
  observeFID(logMetric);
  observeCLS(logMetric);
  observeFCP(logMetric);
  observeTTFB(logMetric);
}

/**
 * Récupère toutes les métriques collectées
 */
export function getMetrics(): Metric[] {
  return [...metricsLog];
}

/**
 * Récupère un résumé des performances
 */
export function getPerformanceSummary(): Record<MetricName, Metric | undefined> {
  const summary: Partial<Record<MetricName, Metric>> = {};

  for (const metric of metricsLog) {
    if (!summary[metric.name] || metric.value > (summary[metric.name]?.value || 0)) {
      summary[metric.name] = metric;
    }
  }

  return summary as Record<MetricName, Metric | undefined>;
}

export default { initWebVitals, getMetrics, getPerformanceSummary };
