#!/usr/bin/env node
/**
 * Upload des vidéos locales vers Bunny.net
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

// Configuration Bunny.net
const BUNNY_CONFIG = {
  storageZone: 'le40-media',
  apiKey: '13b935a9-3913-4528-94b533f34255-4cc1-45dc',
  storageUrl: 'https://storage.bunnycdn.com',
  pullZoneUrl: 'https://le40-cdn.b-cdn.net'
};

// Vidéos à uploader
const VIDEOS = [
  {
    localPath: '/Users/alexquilghini1/Downloads/videofondle40/videofondpahehero.mp4',
    remotePath: 'videos/hero/hero-background.mp4',
    description: 'Hero principal'
  },
  {
    localPath: '/Users/alexquilghini1/Downloads/videofondle40/videofondpagebureau.mp4',
    remotePath: 'videos/bureaux/bureaux-background.mp4',
    description: 'Page Bureaux'
  },
  {
    localPath: '/Users/alexquilghini1/Downloads/videofondle40/videofondpageclub.mp4',
    remotePath: 'videos/club/club-background.mp4',
    description: 'Page Club'
  },
  {
    localPath: '/Users/alexquilghini1/Downloads/videofondle40/videofondpagesalle.mp4',
    remotePath: 'videos/salles/salles-background.mp4',
    description: 'Page Salles'
  },
  {
    localPath: '/Users/alexquilghini1/Downloads/videofondle40/videofondpagestudio.mp4',
    remotePath: 'videos/studios/studios-background.mp4',
    description: 'Page Studios'
  }
];

/**
 * Upload un fichier vers Bunny.net Storage
 */
function uploadToBunny(localPath, remotePath) {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(localPath);
    const url = `${BUNNY_CONFIG.storageUrl}/${BUNNY_CONFIG.storageZone}/${remotePath}`;

    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'PUT',
      headers: {
        'AccessKey': BUNNY_CONFIG.apiKey,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileContent.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
          resolve(`${BUNNY_CONFIG.pullZoneUrl}/${remotePath}`);
        } else {
          reject(new Error(`Upload failed: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fileContent);
    req.end();
  });
}

async function main() {
  console.log('='.repeat(60));
  console.log('Upload des vidéos vers Bunny.net CDN');
  console.log('='.repeat(60));
  console.log(`\nStorage Zone: ${BUNNY_CONFIG.storageZone}`);
  console.log(`Pull Zone: ${BUNNY_CONFIG.pullZoneUrl}\n`);

  const results = [];

  for (const video of VIDEOS) {
    console.log(`[${video.description}]`);
    console.log(`  Local: ${path.basename(video.localPath)}`);

    const stats = fs.statSync(video.localPath);
    console.log(`  Taille: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    try {
      console.log(`  Upload en cours...`);
      const cdnUrl = await uploadToBunny(video.localPath, video.remotePath);
      console.log(`  OK -> ${cdnUrl}\n`);
      results.push({ ...video, cdnUrl, success: true });
    } catch (error) {
      console.error(`  ERREUR: ${error.message}\n`);
      results.push({ ...video, success: false, error: error.message });
    }
  }

  // Résumé
  console.log('='.repeat(60));
  console.log('RÉSUMÉ');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success);
  console.log(`\nUploadés: ${successful.length}/${results.length}\n`);

  if (successful.length > 0) {
    console.log('URLs CDN:');
    successful.forEach(r => {
      console.log(`  ${r.description}: ${r.cdnUrl}`);
    });
  }

  // Sauvegarder le mapping
  const mapping = {};
  successful.forEach(r => {
    mapping[r.description] = r.cdnUrl;
  });

  const mappingFile = '/Users/alexquilghini1/Documents/le40Web/bunny-videos-mapping.json';
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
  console.log(`\nMapping sauvegardé: ${mappingFile}`);
}

main().catch(console.error);
