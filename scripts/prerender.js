/**
 * Post-build prerendering script
 *
 * Runs after `vite build` to generate static HTML for each route.
 * Uses Puppeteer to render pages in a headless browser, capturing
 * the fully rendered DOM including SEO meta tags and content.
 *
 * Usage: node scripts/prerender.js
 */

import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

// All static routes to prerender (excludes dynamic routes like /blog/:slug)
const ROUTES = [
  '/',
  '/offres',
  '/tarifs',
  '/bureaux',
  '/bureaux-prives',
  '/bureaux-comparaison',
  '/domiciliation',
  '/salles',
  '/studios',
  '/blog',
  '/contact',
  '/reserver-visite',
  '/community',
  '/experts',
  '/club',
  '/events',
  '/services-plus',
  '/boutique',
  '/packs',
  '/cgv',
  '/politique-confidentialite',
  '/mentions-legales',
];

// Simple static file server for the dist folder
function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

      // SPA fallback: serve index.html for routes without file extensions
      if (!filePath.includes('.') || !existsSync(filePath)) {
        filePath = join(DIST_DIR, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const mimeTypes = {
          html: 'text/html',
          js: 'application/javascript',
          css: 'text/css',
          svg: 'image/svg+xml',
          png: 'image/png',
          jpg: 'image/jpeg',
          woff2: 'font/woff2',
          json: 'application/json',
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  const PORT = 4173;
  const server = await startServer(PORT);
  console.log(`Static server running on http://localhost:${PORT}`);

  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let successCount = 0;
  let errorCount = 0;

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    const page = await browser.newPage();

    try {
      // Set a desktop viewport
      await page.setViewport({ width: 1280, height: 800 });

      // networkidle2 allows 2 pending connections (Supabase realtime, etc.)
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for React lazy loading and animations to settle
      await new Promise((r) => setTimeout(r, 2000));

      // Get the fully rendered HTML
      const html = await page.content();

      // Determine output path
      const outputDir = route === '/' ? DIST_DIR : join(DIST_DIR, route);
      const outputFile = join(outputDir, 'index.html');

      // Create directory if needed
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      writeFileSync(outputFile, html, 'utf-8');
      successCount++;
      console.log(`  ✓ ${route}`);
    } catch (err) {
      errorCount++;
      console.error(`  ✗ ${route} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerendering complete: ${successCount} succeeded, ${errorCount} failed`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
