#!/usr/bin/env node
/**
 * Update Media URLs Script
 *
 * Ce script remplace toutes les URLs Cloudinary/Pexels/Unsplash
 * par les nouvelles URLs Bunny.net CDN dans le codebase.
 *
 * Usage: node scripts/update-media-urls.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAPPING_FILE = path.join(__dirname, '../bunny-url-mapping.json');
const SRC_DIR = path.join(__dirname, '../src');

// Extensions de fichiers a traiter
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];

// Patterns d'URLs a remplacer
const URL_PATTERNS = [
  /https:\/\/res\.cloudinary\.com\/[^"'\s\)]+/g,
  /https:\/\/images\.pexels\.com\/photos\/[^"'\s\)]+/g,
  /https:\/\/images\.unsplash\.com\/[^"'\s\)]+/g,
];

/**
 * Charger le fichier de mapping
 */
function loadMapping() {
  if (!fs.existsSync(MAPPING_FILE)) {
    console.error(`Erreur: Fichier de mapping introuvable: ${MAPPING_FILE}`);
    console.error('Executez d\'abord: node scripts/migrate-to-bunny.js');
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
}

/**
 * Trouver tous les fichiers a traiter
 */
function findFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Ignorer node_modules et .git
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        findFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (FILE_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Trouver la meilleure correspondance dans le mapping
 */
function findBestMatch(url, mapping) {
  // Essayer l'URL exacte
  if (mapping[url]) {
    return mapping[url];
  }

  // Essayer l'URL sans parametres
  const baseUrl = url.split('?')[0];
  if (mapping[baseUrl]) {
    return mapping[baseUrl];
  }

  // Pour Pexels, extraire l'ID de la photo et chercher
  if (url.includes('pexels.com')) {
    const match = url.match(/pexels-photo-(\d+)/);
    if (match) {
      const photoId = match[1];
      for (const [key, value] of Object.entries(mapping)) {
        if (key.includes(`pexels-photo-${photoId}`)) {
          return value;
        }
      }
    }
  }

  // Pour Cloudinary, chercher par nom de fichier
  if (url.includes('cloudinary.com')) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1].split('.')[0];
    for (const [key, value] of Object.entries(mapping)) {
      if (key.includes(filename)) {
        return value;
      }
    }
  }

  // Pour Unsplash, chercher par ID
  if (url.includes('unsplash.com')) {
    const match = url.match(/photo-([a-zA-Z0-9-]+)/);
    if (match) {
      const photoId = match[1];
      for (const [key, value] of Object.entries(mapping)) {
        if (key.includes(photoId)) {
          return value;
        }
      }
    }
  }

  return null;
}

/**
 * Traiter un fichier
 */
function processFile(filePath, mapping) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const replacements = [];

  // Trouver toutes les URLs dans le fichier
  for (const pattern of URL_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      for (const url of matches) {
        const newUrl = findBestMatch(url, mapping);
        if (newUrl && newUrl !== url) {
          content = content.split(url).join(newUrl);
          replacements.push({ old: url, new: newUrl });
          modified = true;
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
  }

  return { modified, replacements };
}

/**
 * Script principal
 */
function main() {
  console.log('='.repeat(60));
  console.log('Mise a jour des URLs media dans le codebase');
  console.log('='.repeat(60));

  // Charger le mapping
  const mapping = loadMapping();
  const mappingCount = Object.keys(mapping).length;
  console.log(`\nMappings charges: ${mappingCount}`);

  // Trouver les fichiers
  const files = findFiles(SRC_DIR);
  console.log(`Fichiers a analyser: ${files.length}`);
  console.log('');

  let totalModified = 0;
  let totalReplacements = 0;
  const modifiedFiles = [];

  // Traiter chaque fichier
  for (const file of files) {
    const result = processFile(file, mapping);
    if (result.modified) {
      totalModified++;
      totalReplacements += result.replacements.length;
      modifiedFiles.push({
        path: path.relative(SRC_DIR, file),
        count: result.replacements.length
      });

      console.log(`[MODIFIE] ${path.relative(SRC_DIR, file)}`);
      result.replacements.forEach(r => {
        console.log(`  - ${r.old.substring(0, 50)}...`);
        console.log(`    -> ${r.new}`);
      });
    }
  }

  // Resume
  console.log('\n' + '='.repeat(60));
  console.log('RESUME');
  console.log('='.repeat(60));
  console.log(`Fichiers analyses: ${files.length}`);
  console.log(`Fichiers modifies: ${totalModified}`);
  console.log(`Remplacements effectues: ${totalReplacements}`);

  if (modifiedFiles.length > 0) {
    console.log('\nFichiers modifies:');
    modifiedFiles.forEach(f => {
      console.log(`  - ${f.path} (${f.count} remplacements)`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log('IMPORTANT');
  console.log('='.repeat(60));
  console.log(`
1. Verifiez les modifications avec: git diff
2. Testez le site localement: npm run dev
3. Si tout fonctionne, commitez: git add -A && git commit -m "Migrate media to Bunny CDN"
`);
}

// Executer
main();
