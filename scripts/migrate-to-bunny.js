#!/usr/bin/env node
/**
 * Migration Script: Cloudinary/Pexels/Unsplash -> Bunny.net CDN
 *
 * Ce script:
 * 1. Scanne le codebase pour trouver toutes les URLs media
 * 2. Telecharge les fichiers depuis les sources externes
 * 3. Upload vers Bunny.net Storage
 * 4. Genere un fichier de mapping pour le remplacement d'URLs
 *
 * Usage: node scripts/migrate-to-bunny.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration Bunny.net
const BUNNY_CONFIG = {
  storageZone: 'le40-media',
  apiKey: '13b935a9-3913-4528-94b533f34255-4cc1-45dc',
  storageUrl: 'https://storage.bunnycdn.com',
  pullZoneUrl: 'https://le40-cdn.b-cdn.net'
};

// Structure des dossiers sur Bunny.net
const FOLDER_STRUCTURE = {
  // Videos
  'hero': 'videos/hero',
  'bureaux': 'videos/bureaux',
  'coworking': 'videos/coworking',
  'studios': 'videos/studios',
  'domiciliation': 'videos/domiciliation',
  'events': 'videos/events',
  'community': 'videos/community',

  // Images par categorie
  'meeting-rooms': 'images/meeting-rooms',
  'coworking-spaces': 'images/coworking-spaces',
  'private-offices': 'images/private-offices',
  'studio-photo': 'images/studios',
  'testimonials': 'images/testimonials',
  'team': 'images/team',
  'gallery': 'images/gallery',
  'blog': 'images/blog',
  'events-img': 'images/events',
  'speakers': 'images/speakers',
  'club': 'images/club',
  'domiciliation-img': 'images/domiciliation',
  'misc': 'images/misc'
};

// URLs a migrer (extraites du codebase)
const MEDIA_URLS = [
  // VIDEOS CLOUDINARY
  { url: 'https://res.cloudinary.com/dafo6bvhc/video/upload/v1765989623/Bureau_pub_Direct_1_fn1xli.mp4', category: 'hero', filename: 'hero-main.mp4' },
  { url: 'https://res.cloudinary.com/dwt7u0azs/video/upload/v1761805289/e3c2235d-6478-42d0-85b3-6266f2227367_iazq5a.mp4', category: 'hero', filename: 'hero-background.mp4' },
  { url: 'https://res.cloudinary.com/dafo6bvhc/video/upload/v1766057439/Bureau_le_40_vide%CC%81o_2_V2_1_kgumfa.mp4', category: 'bureaux', filename: 'bureaux-hero.mp4' },
  { url: 'https://res.cloudinary.com/dwt7u0azs/video/upload/v1761803178/f6ec245d-506e-49b7-a107-01e3b561a567_1_mrh0xu.mp4', category: 'coworking', filename: 'coworking-hero.mp4' },
  { url: 'https://res.cloudinary.com/dwt7u0azs/video/upload/v1761803653/d928c6b7-f494-4466-81f2-040f32b9eadc_nqynim.mp4', category: 'studios', filename: 'studios-podcast.mp4' },
  { url: 'https://res.cloudinary.com/dwt7u0azs/video/upload/v1761808607/8fc51ed3-de40-42f7-ac18-7dd2da634556_yxt3cm.mp4', category: 'studios', filename: 'studios-photo.mp4' },
  { url: 'https://res.cloudinary.com/dwt7u0azs/video/upload/v1761792125/f6861355-bc98-4c72-b9bc-fb13a1abdfb7_i7v3kj.mp4', category: 'events', filename: 'events-hero.mp4' },
  { url: 'https://res.cloudinary.com/dwt7u0azs/video/upload/v1761793838/9cc01971-7e57-46bd-8b62-2371cda76e82_h68lfm.mp4', category: 'bureaux', filename: 'bureaux-section.mp4' },

  // IMAGES PEXELS - Meeting Rooms
  { url: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg', category: 'meeting-rooms', filename: 'meeting-room-1.jpg' },
  { url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', category: 'meeting-rooms', filename: 'meeting-room-2.jpg' },
  { url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', category: 'meeting-rooms', filename: 'meeting-room-3.jpg' },

  // IMAGES PEXELS - Coworking
  { url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg', category: 'coworking-spaces', filename: 'coworking-1.jpg' },
  { url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg', category: 'coworking-spaces', filename: 'coworking-2.jpg' },
  { url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg', category: 'coworking-spaces', filename: 'coworking-3.jpg' },
  { url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', category: 'coworking-spaces', filename: 'coworking-4.jpg' },
  { url: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg', category: 'coworking-spaces', filename: 'coworking-5.jpg' },
  { url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg', category: 'coworking-spaces', filename: 'coworking-6.jpg' },

  // IMAGES PEXELS - Bureaux/Offices
  { url: 'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg', category: 'private-offices', filename: 'office-1.jpg' },
  { url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg', category: 'private-offices', filename: 'office-2.jpg' },
  { url: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg', category: 'private-offices', filename: 'office-3.jpg' },
  { url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', category: 'private-offices', filename: 'office-4.jpg' },
  { url: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg', category: 'private-offices', filename: 'office-5.jpg' },
  { url: 'https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg', category: 'private-offices', filename: 'office-6.jpg' },
  { url: 'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg', category: 'private-offices', filename: 'office-7.jpg' },
  { url: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg', category: 'private-offices', filename: 'office-8.jpg' },
  { url: 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg', category: 'private-offices', filename: 'office-9.jpg' },
  { url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg', category: 'private-offices', filename: 'office-10.jpg' },
  { url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg', category: 'private-offices', filename: 'office-11.jpg' },
  { url: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg', category: 'private-offices', filename: 'office-12.jpg' },
  { url: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg', category: 'private-offices', filename: 'office-13.jpg' },
  { url: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg', category: 'private-offices', filename: 'office-14.jpg' },

  // IMAGES PEXELS - Studios
  { url: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg', category: 'studio-photo', filename: 'studio-1.jpg' },
  { url: 'https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg', category: 'studio-photo', filename: 'studio-2.jpg' },
  { url: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg', category: 'studio-photo', filename: 'studio-3.jpg' },
  { url: 'https://images.pexels.com/photos/7534259/pexels-photo-7534259.jpeg', category: 'studio-photo', filename: 'studio-4.jpg' },
  { url: 'https://images.pexels.com/photos/9400245/pexels-photo-9400245.jpeg', category: 'studio-photo', filename: 'studio-5.jpg' },
  { url: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg', category: 'studio-photo', filename: 'studio-6.jpg' },
  { url: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg', category: 'studio-photo', filename: 'studio-7.jpg' },
  { url: 'https://images.pexels.com/photos/7991487/pexels-photo-7991487.jpeg', category: 'studio-photo', filename: 'studio-8.jpg' },
  { url: 'https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg', category: 'studio-photo', filename: 'studio-9.jpg' },
  { url: 'https://images.pexels.com/photos/7991162/pexels-photo-7991162.jpeg', category: 'studio-photo', filename: 'studio-10.jpg' },
  { url: 'https://images.pexels.com/photos/7991206/pexels-photo-7991206.jpeg', category: 'studio-photo', filename: 'studio-11.jpg' },
  { url: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg', category: 'studio-photo', filename: 'studio-12.jpg' },
  { url: 'https://images.pexels.com/photos/3784324/pexels-photo-3784324.jpeg', category: 'studio-photo', filename: 'studio-13.jpg' },
  { url: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg', category: 'studio-photo', filename: 'studio-14.jpg' },
  { url: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg', category: 'studio-photo', filename: 'studio-15.jpg' },
  { url: 'https://images.pexels.com/photos/9786304/pexels-photo-9786304.jpeg', category: 'studio-photo', filename: 'studio-16.jpg' },
  { url: 'https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg', category: 'studio-photo', filename: 'studio-17.jpg' },
  { url: 'https://images.pexels.com/photos/7191985/pexels-photo-7191985.jpeg', category: 'studio-photo', filename: 'studio-18.jpg' },
  { url: 'https://images.pexels.com/photos/7869092/pexels-photo-7869092.jpeg', category: 'studio-photo', filename: 'studio-19.jpg' },
  { url: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg', category: 'studio-photo', filename: 'studio-20.jpg' },
  { url: 'https://images.pexels.com/photos/8297538/pexels-photo-8297538.jpeg', category: 'studio-photo', filename: 'studio-21.jpg' },
  { url: 'https://images.pexels.com/photos/5940831/pexels-photo-5940831.jpeg', category: 'studio-photo', filename: 'studio-22.jpg' },
  { url: 'https://images.pexels.com/photos/8134848/pexels-photo-8134848.jpeg', category: 'studio-photo', filename: 'studio-23.jpg' },
  { url: 'https://images.pexels.com/photos/7991140/pexels-photo-7991140.jpeg', category: 'studio-photo', filename: 'studio-24.jpg' },
  { url: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg', category: 'studio-photo', filename: 'studio-25.jpg' },
  { url: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg', category: 'studio-photo', filename: 'studio-26.jpg' },
  { url: 'https://images.pexels.com/photos/7991486/pexels-photo-7991486.jpeg', category: 'studio-photo', filename: 'studio-27.jpg' },
  { url: 'https://images.pexels.com/photos/7991163/pexels-photo-7991163.jpeg', category: 'studio-photo', filename: 'studio-28.jpg' },
  { url: 'https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg', category: 'studio-photo', filename: 'studio-29.jpg' },

  // IMAGES PEXELS - Studio Gallery
  { url: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg', category: 'gallery', filename: 'gallery-1.jpg' },
  { url: 'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg', category: 'gallery', filename: 'gallery-2.jpg' },
  { url: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg', category: 'gallery', filename: 'gallery-3.jpg' },
  { url: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg', category: 'gallery', filename: 'gallery-4.jpg' },
  { url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', category: 'gallery', filename: 'gallery-5.jpg' },
  { url: 'https://images.pexels.com/photos/7586657/pexels-photo-7586657.jpeg', category: 'gallery', filename: 'gallery-6.jpg' },
  { url: 'https://images.pexels.com/photos/4907238/pexels-photo-4907238.jpeg', category: 'gallery', filename: 'gallery-7.jpg' },
  { url: 'https://images.pexels.com/photos/7586438/pexels-photo-7586438.jpeg', category: 'gallery', filename: 'gallery-8.jpg' },
  { url: 'https://images.pexels.com/photos/4907245/pexels-photo-4907245.jpeg', category: 'gallery', filename: 'gallery-9.jpg' },
  { url: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg', category: 'gallery', filename: 'gallery-10.jpg' },
  { url: 'https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg', category: 'gallery', filename: 'gallery-11.jpg' },
  { url: 'https://images.pexels.com/photos/3992858/pexels-photo-3992858.jpeg', category: 'gallery', filename: 'gallery-12.jpg' },
  { url: 'https://images.pexels.com/photos/3993398/pexels-photo-3993398.jpeg', category: 'gallery', filename: 'gallery-13.jpg' },

  // IMAGES PEXELS - Testimonials/People
  { url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', category: 'testimonials', filename: 'person-1.jpg' },
  { url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', category: 'testimonials', filename: 'person-2.jpg' },
  { url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg', category: 'testimonials', filename: 'person-3.jpg' },
  { url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg', category: 'testimonials', filename: 'person-4.jpg' },
  { url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', category: 'testimonials', filename: 'person-5.jpg' },
  { url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg', category: 'testimonials', filename: 'person-6.jpg' },
  { url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', category: 'testimonials', filename: 'person-7.jpg' },
  { url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', category: 'testimonials', filename: 'person-8.jpg' },
  { url: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg', category: 'testimonials', filename: 'person-9.jpg' },
  { url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', category: 'testimonials', filename: 'person-10.jpg' },
  { url: 'https://images.pexels.com/photos/3765035/pexels-photo-3765035.jpeg', category: 'testimonials', filename: 'person-11.jpg' },
  { url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', category: 'testimonials', filename: 'person-12.jpg' },
  { url: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg', category: 'testimonials', filename: 'person-13.jpg' },
  { url: 'https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg', category: 'testimonials', filename: 'person-14.jpg' },
  { url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg', category: 'testimonials', filename: 'person-15.jpg' },

  // IMAGES PEXELS - Events
  { url: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg', category: 'events-img', filename: 'event-1.jpg' },
  { url: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg', category: 'events-img', filename: 'event-2.jpg' },
  { url: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg', category: 'events-img', filename: 'event-3.jpg' },
  { url: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg', category: 'events-img', filename: 'event-4.jpg' },
  { url: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg', category: 'events-img', filename: 'event-5.jpg' },
  { url: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg', category: 'events-img', filename: 'event-6.jpg' },
  { url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg', category: 'events-img', filename: 'event-7.jpg' },
  { url: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg', category: 'events-img', filename: 'event-8.jpg' },
  { url: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg', category: 'events-img', filename: 'event-9.jpg' },
  { url: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg', category: 'events-img', filename: 'event-10.jpg' },
  { url: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg', category: 'events-img', filename: 'event-11.jpg' },

  // IMAGES PEXELS - Domiciliation
  { url: 'https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg', category: 'domiciliation-img', filename: 'domiciliation-1.jpg' },
  { url: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg', category: 'domiciliation-img', filename: 'domiciliation-2.jpg' },
  { url: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg', category: 'domiciliation-img', filename: 'domiciliation-3.jpg' },
  { url: 'https://images.pexels.com/photos/2451567/pexels-photo-2451567.jpeg', category: 'domiciliation-img', filename: 'domiciliation-4.jpg' },
  { url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg', category: 'domiciliation-img', filename: 'domiciliation-5.jpg' },
  { url: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg', category: 'domiciliation-img', filename: 'domiciliation-6.jpg' },

  // IMAGES PEXELS - Salles/Spaces
  { url: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg', category: 'meeting-rooms', filename: 'salle-1.jpg' },
  { url: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg', category: 'meeting-rooms', filename: 'salle-2.jpg' },
  { url: 'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg', category: 'meeting-rooms', filename: 'salle-3.jpg' },
  { url: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg', category: 'meeting-rooms', filename: 'salle-4.jpg' },
  { url: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg', category: 'meeting-rooms', filename: 'salle-5.jpg' },
  { url: 'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg', category: 'meeting-rooms', filename: 'salle-6.jpg' },
  { url: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg', category: 'meeting-rooms', filename: 'salle-7.jpg' },

  // IMAGES PEXELS - Club
  { url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', category: 'club', filename: 'club-1.jpg' },
  { url: 'https://images.pexels.com/photos/7224705/pexels-photo-7224705.jpeg', category: 'club', filename: 'club-2.jpg' },
  { url: 'https://images.pexels.com/photos/6954174/pexels-photo-6954174.jpeg', category: 'club', filename: 'club-3.jpg' },

  // IMAGES UNSPLASH - Studios
  { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04', category: 'studio-photo', filename: 'unsplash-studio-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6', category: 'studio-photo', filename: 'unsplash-studio-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3', category: 'studio-photo', filename: 'unsplash-studio-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1593697821028-7cc59cfd7399', category: 'studio-photo', filename: 'unsplash-studio-4.jpg' },
  { url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618', category: 'studio-photo', filename: 'unsplash-studio-5.jpg' },
  { url: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc', category: 'studio-photo', filename: 'unsplash-studio-6.jpg' },
  { url: 'https://images.unsplash.com/photo-1598550473359-433795503a0f', category: 'studio-photo', filename: 'unsplash-studio-7.jpg' },
  { url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', category: 'studio-photo', filename: 'unsplash-studio-8.jpg' },
  { url: 'https://images.unsplash.com/photo-1609234656388-0ff363383899', category: 'studio-photo', filename: 'unsplash-studio-9.jpg' },
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', category: 'studio-photo', filename: 'unsplash-studio-10.jpg' },
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978', category: 'studio-photo', filename: 'unsplash-studio-11.jpg' },
  { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0', category: 'studio-photo', filename: 'unsplash-studio-12.jpg' },

  // IMAGES UNSPLASH - Testimonials
  { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', category: 'testimonials', filename: 'unsplash-person-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', category: 'testimonials', filename: 'unsplash-person-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', category: 'testimonials', filename: 'unsplash-person-3.jpg' },
];

// Dossier temporaire pour les telechargements
const TEMP_DIR = path.join(__dirname, '../.bunny-migration-temp');
const MAPPING_FILE = path.join(__dirname, '../bunny-url-mapping.json');

// Creer le dossier temp si necessaire
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

/**
 * Telecharge un fichier depuis une URL
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    // Nettoyer l'URL (enlever les parametres pour Pexels/Unsplash)
    let cleanUrl = url.split('?')[0];

    // Pour Pexels, garder les parametres de qualite
    if (url.includes('pexels.com')) {
      cleanUrl = url.includes('?') ? url.split('?')[0] + '?auto=compress&cs=tinysrgb&w=1600' : url + '?auto=compress&cs=tinysrgb&w=1600';
    }

    // Pour Unsplash, ajouter les parametres de qualite
    if (url.includes('unsplash.com')) {
      cleanUrl = url.split('?')[0] + '?w=1600&q=80';
    }

    const protocol = cleanUrl.startsWith('https') ? https : http;

    const file = fs.createWriteStream(destPath);

    protocol.get(cleanUrl, (response) => {
      // Suivre les redirections
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`HTTP ${response.statusCode} for ${cleanUrl}`));
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      reject(err);
    });
  });
}

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

/**
 * Migrer un fichier media
 */
async function migrateMedia(item, index, total) {
  const { url, category, filename } = item;
  const folderPath = FOLDER_STRUCTURE[category] || 'images/misc';
  const remotePath = `${folderPath}/${filename}`;
  const localPath = path.join(TEMP_DIR, filename);

  console.log(`[${index + 1}/${total}] Migration: ${filename}`);
  console.log(`  Source: ${url.substring(0, 60)}...`);

  try {
    // Telecharger
    console.log(`  Telechargement...`);
    await downloadFile(url, localPath);

    // Verifier la taille du fichier
    const stats = fs.statSync(localPath);
    console.log(`  Taille: ${(stats.size / 1024).toFixed(1)} KB`);

    // Upload vers Bunny
    console.log(`  Upload vers Bunny.net...`);
    const cdnUrl = await uploadToBunny(localPath, remotePath);

    // Nettoyer le fichier local
    fs.unlinkSync(localPath);

    console.log(`  OK -> ${cdnUrl}`);

    return {
      original: url,
      cdn: cdnUrl,
      success: true
    };
  } catch (error) {
    console.error(`  ERREUR: ${error.message}`);

    // Nettoyer en cas d'erreur
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    return {
      original: url,
      cdn: null,
      success: false,
      error: error.message
    };
  }
}

/**
 * Generer le fichier de mapping
 */
function generateMappingFile(results) {
  const mapping = {};

  results.forEach(result => {
    if (result.success) {
      // Creer des mappings pour toutes les variantes d'URL possibles
      const baseUrl = result.original.split('?')[0];
      mapping[baseUrl] = result.cdn;
      mapping[result.original] = result.cdn;

      // Pour Pexels, mapper aussi les variantes de taille
      if (baseUrl.includes('pexels.com')) {
        ['300', '400', '600', '800', '1200', '1600', '1920'].forEach(size => {
          mapping[`${baseUrl}?auto=compress&cs=tinysrgb&w=${size}`] = result.cdn;
        });
      }
    }
  });

  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  console.log(`\nFichier de mapping genere: ${MAPPING_FILE}`);

  return mapping;
}

/**
 * Script principal
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Migration des medias vers Bunny.net CDN');
  console.log('='.repeat(60));
  console.log(`\nStorage Zone: ${BUNNY_CONFIG.storageZone}`);
  console.log(`Pull Zone: ${BUNNY_CONFIG.pullZoneUrl}`);
  console.log(`Fichiers a migrer: ${MEDIA_URLS.length}`);
  console.log('');

  const results = [];

  // Migrer les fichiers un par un (pour eviter de surcharger)
  for (let i = 0; i < MEDIA_URLS.length; i++) {
    const result = await migrateMedia(MEDIA_URLS[i], i, MEDIA_URLS.length);
    results.push(result);

    // Petite pause entre les uploads
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Statistiques
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log('\n' + '='.repeat(60));
  console.log('RESUME');
  console.log('='.repeat(60));
  console.log(`Total: ${results.length}`);
  console.log(`Reussis: ${successful}`);
  console.log(`Echecs: ${failed}`);

  if (failed > 0) {
    console.log('\nFichiers en echec:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.original}`);
      console.log(`    Erreur: ${r.error}`);
    });
  }

  // Generer le mapping
  const mapping = generateMappingFile(results);

  console.log('\n' + '='.repeat(60));
  console.log('PROCHAINE ETAPE');
  console.log('='.repeat(60));
  console.log(`
Pour mettre a jour les URLs dans le code, executez:

  node scripts/update-media-urls.js

Ce script utilisera le fichier de mapping pour remplacer
toutes les anciennes URLs par les nouvelles URLs Bunny CDN.
`);

  // Nettoyer le dossier temp
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }
}

// Executer
main().catch(console.error);
