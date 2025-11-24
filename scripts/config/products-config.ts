export const SHOPIFY_CONFIG = {
  store: 'renaissance-9581.myshopify.com',
  apiVersion: '2024-10',
  calendarConfig: {
    monthsAhead: 3,
    workingDays: [1, 2, 3, 4, 5],
    weekendDays: [6],
    closedDays: [0],
    workingHours: { start: 8, end: 20 },
    weekendHours: { start: 9, end: 18 },
    slotDuration: 1,
  },
};

export const MEETING_ROOMS = [
  {
    id: 'salle-focus',
    title: 'Salle Focus - 2-4 personnes',
    body_html: `<h2>Espace intime idéal pour entretiens, visioconférences et sessions de coaching</h2>
<p>La Salle Focus est conçue pour les petites réunions productives. Équipée d'un écran 4K 55", d'un tableau blanc digital et d'une isolation phonique renforcée, elle offre un environnement parfait pour vos rendez-vous professionnels.</p>
<h3>Équipements inclus :</h3>
<ul>
  <li>Écran 4K 55"</li>
  <li>Tableau blanc digital</li>
  <li>Wi-Fi 1 Gb/s dédié</li>
  <li>Isolation phonique renforcée</li>
  <li>Climatisation individuelle</li>
  <li>Éclairage modulable LED</li>
  <li>Mobilier ergonomique Herman Miller</li>
  <li>Prises USB-C intégrées</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Salle de Réunion',
    tags: ['salle', 'reunion', 'petit-groupe', '2-4-personnes'],
    images: [
      { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '40.00', sku: 'SALLE-FOCUS-1H', duration_hours: 1 },
      { title: 'Demi-journée (4h)', price: '150.00', sku: 'SALLE-FOCUS-4H', duration_hours: 4 },
      { title: 'Journée complète (8h)', price: '280.00', sku: 'SALLE-FOCUS-8H', duration_hours: 8 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Salle Focus',
      resource_type: 'meeting_room',
      capacity: '2-4',
      gradient: 'from-cyan-600 to-teal-600',
    },
  },
  {
    id: 'salle-creative',
    title: 'Salle Créative - 6-8 personnes',
    body_html: `<h2>Espace dynamique pour ateliers créatifs et sessions de brainstorming</h2>
<p>La Salle Créative est parfaite pour les équipes qui veulent innover. Avec sa TV HD 75" tactile, son paper-board digital et son mobilier modulable, elle s'adapte à tous vos besoins créatifs.</p>
<h3>Équipements inclus :</h3>
<ul>
  <li>TV HD 75" tactile</li>
  <li>Paper-board digital interactif</li>
  <li>Connectique HDMI/USB-C/DisplayPort</li>
  <li>Post-its & matériel créatif illimité</li>
  <li>Mobilier modulable sur roulettes</li>
  <li>Machine à café Nespresso Pro</li>
  <li>Mur d'écriture magnétique</li>
  <li>Système audio Bose</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Salle de Réunion',
    tags: ['salle', 'reunion', 'brainstorming', 'creativite', '6-8-personnes', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '60.00', sku: 'SALLE-CREATIVE-1H', duration_hours: 1 },
      { title: 'Demi-journée (4h)', price: '220.00', sku: 'SALLE-CREATIVE-4H', duration_hours: 4 },
      { title: 'Journée complète (8h)', price: '420.00', sku: 'SALLE-CREATIVE-8H', duration_hours: 8 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Salle Créative',
      resource_type: 'meeting_room',
      capacity: '6-8',
      gradient: 'from-emerald-600 to-teal-600',
    },
  },
  {
    id: 'salle-conference',
    title: 'Salle de Conférence - Jusqu\'à 80 personnes',
    body_html: `<h2>Espace événementiel premium pour conférences, séminaires et formations</h2>
<p>Notre grande salle de conférence offre un équipement professionnel complet pour vos événements d'envergure. Avec ses vidéoprojecteurs laser 4K, son système audio Sennheiser et sa scène éclairée, impressionnez votre audience.</p>
<h3>Équipements inclus :</h3>
<ul>
  <li>Duo vidéoprojecteurs laser 4K</li>
  <li>Écrans latéraux synchronisés</li>
  <li>Système micro-cravate & HF Sennheiser</li>
  <li>Pupitre professionnel ajustable</li>
  <li>Estrade modulaire 40m²</li>
  <li>Scène éclairée DMX</li>
  <li>Régie son + lumière complète</li>
  <li>Streaming HD & enregistrement</li>
  <li>Cabine de traduction simultanée</li>
  <li>Vestiaire 100 places</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Salle de Conférence',
    tags: ['salle', 'conference', 'seminaire', 'evenement', 'grande-capacite'],
    images: [
      { src: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '80.00', sku: 'SALLE-CONF-1H', duration_hours: 1 },
      { title: 'Demi-journée (4h)', price: '300.00', sku: 'SALLE-CONF-4H', duration_hours: 4 },
      { title: 'Journée complète (8h)', price: '580.00', sku: 'SALLE-CONF-8H', duration_hours: 8 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Salle de Conférence',
      resource_type: 'conference_room',
      capacity: '80',
      gradient: 'from-blue-600 to-cyan-600',
    },
  },
  {
    id: 'terrasse-panoramique',
    title: 'Terrasse Panoramique - 300 m²',
    body_html: `<h2>Rooftop exceptionnel avec vue 360° pour réceptions, keynotes et afterworks mémorables</h2>
<p>Notre terrasse panoramique offre un cadre unique pour vos événements d'exception. Avec sa vue à 360°, son lounge chauffé et son équipement complet, créez des moments inoubliables.</p>
<h3>Équipements inclus :</h3>
<ul>
  <li>Vue panoramique 360°</li>
  <li>Lounge extérieur chauffé</li>
  <li>Estrade modulable 20m²</li>
  <li>Mobilier cocktail design</li>
  <li>Wi-Fi mesh outdoor</li>
  <li>Bar mobile équipé complet</li>
  <li>Éclairage soirée LED RGB</li>
  <li>Sonorisation Line Array</li>
  <li>Brumisateurs intégrés</li>
  <li>Pergola bioclimatique 100m²</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Espace Événementiel',
    tags: ['terrasse', 'rooftop', 'evenement', 'reception', 'afterwork'],
    images: [
      { src: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '2 heures', price: '400.00', sku: 'TERRASSE-2H', duration_hours: 2 },
      { title: '4 heures', price: '750.00', sku: 'TERRASSE-4H', duration_hours: 4 },
      { title: 'Soirée complète (6h)', price: '1200.00', sku: 'TERRASSE-6H', duration_hours: 6 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Terrasse Panoramique',
      resource_type: 'event_space',
      capacity: '300m²',
      gradient: 'from-amber-600 to-orange-600',
    },
  },
  {
    id: 'lounge-cafe',
    title: 'Lounge & Café - 60 m²',
    body_html: `<h2>Espace convivial pour networking, pauses gourmandes et mini-events</h2>
<p>Le Lounge & Café est l'endroit idéal pour vos événements informels. Avec ses canapés Chesterfield, sa machine espresso barista et son ambiance cosy, créez des moments de convivialité.</p>
<h3>Équipements inclus :</h3>
<ul>
  <li>Canapés Chesterfield</li>
  <li>Machine espresso barista professionnelle</li>
  <li>Sono d'ambiance Sonos</li>
  <li>Éclairage tamisé variable</li>
  <li>Bar équipé avec cave à vin</li>
  <li>Mobilier lounge modulable</li>
  <li>Écran TV 65" 4K</li>
  <li>Espace privatisable</li>
  <li>Bibliothèque design</li>
  <li>Coin jeux (baby-foot, arcade)</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Espace Événementiel',
    tags: ['lounge', 'cafe', 'networking', 'afterwork', 'convivial'],
    images: [
      { src: 'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '50.00', sku: 'LOUNGE-1H', duration_hours: 1 },
      { title: 'Demi-journée (4h)', price: '180.00', sku: 'LOUNGE-4H', duration_hours: 4 },
      { title: 'Soirée (6h)', price: '300.00', sku: 'LOUNGE-6H', duration_hours: 6 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Lounge & Café',
      resource_type: 'event_space',
      capacity: '60m²',
      gradient: 'from-rose-600 to-pink-600',
    },
  },
];

export const STUDIOS = [
  {
    id: 'face-cam',
    title: 'Studio Face-Cam Solo - YouTube/Formation/Vlog',
    body_html: `<h2>Configuration solo optimisée pour créateurs de contenu</h2>
<p><strong>🎯 Le studio le plus réservé ! Offre de lancement : -40% (59€ au lieu de 99€/h)</strong></p>
<p>Le Studio Face-Cam est parfait pour les créateurs YouTube, formateurs en ligne et vloggers. Équipé d'une Sony FX3 4K 120fps, d'un micro Shure SM7B et d'un éclairage professionnel.</p>
<h3>Équipement inclus :</h3>
<ul>
  <li>Sony FX3 4K 120fps</li>
  <li>Micro Shure SM7B sur perche</li>
  <li>Éclairage 3 points professionnel</li>
  <li>Fond vert/blanc modulable</li>
  <li>Moniteur de contrôle</li>
  <li>Technicien sur place</li>
  <li>Transfert rushs immédiat</li>
  <li>Wi-Fi fibre 1Gb/s</li>
</ul>
<p><strong>Durée recommandée :</strong> 3 heures</p>`,
    vendor: 'Le 40',
    product_type: 'Studio Créatif',
    tags: ['studio', 'youtube', 'formation', 'vlog', 'solo', 'populaire', 'offre-lancement'],
    images: [
      { src: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/6954174/pexels-photo-6954174.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '59.00', compare_at_price: '99.00', sku: 'STUDIO-FACECAM-1H', duration_hours: 1 },
      { title: '3 heures (Recommandé)', price: '177.00', compare_at_price: '297.00', sku: 'STUDIO-FACECAM-3H', duration_hours: 3 },
      { title: 'Demi-journée (4h)', price: '236.00', compare_at_price: '396.00', sku: 'STUDIO-FACECAM-4H', duration_hours: 4 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Studio Face-Cam Solo',
      resource_type: 'studio',
      capacity: '1',
      gradient: 'from-rose-500 via-fuchsia-500 to-violet-500',
      recommended_duration: '3h',
      launch_offer: true,
      savings: 40,
    },
  },
  {
    id: 'podcast-audio',
    title: 'Studio Podcast Audio - 2-4 voix',
    body_html: `<h2>Studio dédié podcast avec acoustique traitée</h2>
<p><strong>Offre de lancement : -39% (54€ au lieu de 89€/h)</strong></p>
<p>Notre Studio Podcast offre une acoustique professionnelle avec 4 micros Shure SM7B, un RØDECaster Pro II et une isolation phonique premium. Parfait pour podcasts, interviews et voice-over.</p>
<h3>Équipement inclus :</h3>
<ul>
  <li>4 micros Shure SM7B</li>
  <li>RØDECaster Pro II</li>
  <li>Isolation acoustique premium</li>
  <li>Table ronde professionnelle</li>
  <li>Caméras vidéo optionnelles</li>
  <li>Casques monitoring</li>
  <li>Enregistrement multi-pistes</li>
  <li>Post-production disponible</li>
</ul>
<p><strong>Durée recommandée :</strong> 2 heures</p>`,
    vendor: 'Le 40',
    product_type: 'Studio Créatif',
    tags: ['studio', 'podcast', 'interview', 'audio', 'voiceover', 'offre-lancement'],
    images: [
      { src: 'https://images.pexels.com/photos/3784324/pexels-photo-3784324.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/7191985/pexels-photo-7191985.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '54.00', compare_at_price: '89.00', sku: 'STUDIO-PODCAST-1H', duration_hours: 1 },
      { title: '2 heures (Recommandé)', price: '108.00', compare_at_price: '178.00', sku: 'STUDIO-PODCAST-2H', duration_hours: 2 },
      { title: '4 heures', price: '216.00', compare_at_price: '356.00', sku: 'STUDIO-PODCAST-4H', duration_hours: 4 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Studio Podcast Audio',
      resource_type: 'studio',
      capacity: '2-4',
      gradient: 'from-pink-500 via-purple-500 to-violet-600',
      recommended_duration: '2h',
      launch_offer: true,
      savings: 35,
    },
  },
  {
    id: 'stream',
    title: 'Studio Live Twitch/YouTube - Multi-plateformes',
    body_html: `<h2>Configuration streaming avec régie live intégrée</h2>
<p><strong>Offre de lancement : -39% (79€ au lieu de 129€/h)</strong></p>
<p>Studio streaming professionnel avec 3 caméras, ATEM Mini Pro et régie live. Diffusez simultanément sur Twitch, YouTube et LinkedIn avec une qualité broadcast.</p>
<h3>Équipement inclus :</h3>
<ul>
  <li>3 caméras multi-angles (2 Sony FX3 + 1 PTZ)</li>
  <li>ATEM Mini Pro</li>
  <li>Régie live intégrée</li>
  <li>Streaming multi-plateformes</li>
  <li>Chat overlay temps réel</li>
  <li>Green screen professionnel</li>
  <li>OBS Studio pré-configuré</li>
  <li>Bande passante dédiée</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Studio Créatif',
    tags: ['studio', 'stream', 'twitch', 'youtube', 'live', 'gaming', 'offre-lancement'],
    images: [
      { src: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/8297538/pexels-photo-8297538.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '79.00', compare_at_price: '129.00', sku: 'STUDIO-STREAM-1H', duration_hours: 1 },
      { title: '2 heures', price: '158.00', compare_at_price: '258.00', sku: 'STUDIO-STREAM-2H', duration_hours: 2 },
      { title: '4 heures', price: '316.00', compare_at_price: '516.00', sku: 'STUDIO-STREAM-4H', duration_hours: 4 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Studio Live Stream',
      resource_type: 'studio',
      capacity: '1-3',
      gradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
      launch_offer: true,
      savings: 50,
    },
  },
  {
    id: 'full-show',
    title: 'Studio Émission/Talk-Show - Grand plateau 50m²',
    body_html: `<h2>Grand plateau avec décors premium pour émissions professionnelles</h2>
<p><strong>Offre de lancement : -40% (119€ au lieu de 199€/h)</strong></p>
<p>Notre plus grand studio avec 6 caméras, 8 micros broadcast, décors NV Gallery et régie complète. Parfait pour émissions TV, talk-shows et tables rondes.</p>
<h3>Équipement inclus :</h3>
<ul>
  <li>6 caméras professionnelles Sony FX3</li>
  <li>8 micros broadcast Shure SM7B</li>
  <li>Plateau 50m²</li>
  <li>Décors NV Gallery sur mesure</li>
  <li>Éclairage cinéma professionnel</li>
  <li>Régie complète son + vidéo</li>
  <li>Table modulable premium</li>
  <li>Service maquillage disponible</li>
</ul>
<p><strong>Durée recommandée :</strong> 3 heures</p>`,
    vendor: 'Le 40',
    product_type: 'Studio Créatif',
    tags: ['studio', 'emission', 'talkshow', 'television', 'show', 'premium', 'offre-lancement'],
    images: [
      { src: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/8134848/pexels-photo-8134848.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '119.00', compare_at_price: '199.00', sku: 'STUDIO-SHOW-1H', duration_hours: 1 },
      { title: '3 heures (Recommandé)', price: '357.00', compare_at_price: '597.00', sku: 'STUDIO-SHOW-3H', duration_hours: 3 },
      { title: 'Demi-journée (4h)', price: '476.00', compare_at_price: '796.00', sku: 'STUDIO-SHOW-4H', duration_hours: 4 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Studio Émission',
      resource_type: 'studio',
      capacity: '4-8',
      gradient: 'from-rose-600 via-fuchsia-600 to-purple-600',
      recommended_duration: '3h',
      launch_offer: true,
      savings: 80,
    },
  },
  {
    id: 'intimiste',
    title: 'Studio Interview Intimiste - Setup cosy',
    body_html: `<h2>Setup cosy avec canapé et éclairage cinéma pour interviews intimes</h2>
<p><strong>Offre de lancement : -40% (84€ au lieu de 139€/h)</strong></p>
<p>Ambiance chaleureuse avec canapé design, éclairage doux et 2 caméras cinéma. Parfait pour interviews, podcasts vidéo et conversations intimistes.</p>
<h3>Équipement inclus :</h3>
<ul>
  <li>2 caméras Sony FX3</li>
  <li>Éclairage doux cinéma</li>
  <li>Canapé design premium</li>
  <li>Décor intimiste soigné</li>
  <li>3 micros cravate discrets</li>
  <li>Ambiance chaleureuse</li>
  <li>Table basse modulable</li>
  <li>Accessoires déco</li>
</ul>
<p><strong>Durée recommandée :</strong> 2 heures</p>`,
    vendor: 'Le 40',
    product_type: 'Studio Créatif',
    tags: ['studio', 'interview', 'podcast-video', 'intimiste', 'conversation', 'offre-lancement'],
    images: [
      { src: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '84.00', compare_at_price: '139.00', sku: 'STUDIO-INTIMISTE-1H', duration_hours: 1 },
      { title: '2 heures (Recommandé)', price: '168.00', compare_at_price: '278.00', sku: 'STUDIO-INTIMISTE-2H', duration_hours: 2 },
      { title: '4 heures', price: '336.00', compare_at_price: '556.00', sku: 'STUDIO-INTIMISTE-4H', duration_hours: 4 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Studio Interview Intimiste',
      resource_type: 'studio',
      capacity: '2-3',
      gradient: 'from-purple-500 via-violet-500 to-fuchsia-500',
      recommended_duration: '2h',
      launch_offer: true,
      savings: 55,
    },
  },
  {
    id: 'vertical-social',
    title: 'Studio Vertical Social - TikTok/Reels/Shorts',
    body_html: `<h2>Studio optimisé pour formats courts verticaux</h2>
<p><strong>Offre de lancement : -38% (49€ au lieu de 79€/h)</strong></p>
<p>Setup express pour créateurs TikTok, Reels et Shorts. Sony FX3 en mode vertical, ring light 18", LED RGB et fonds modulables. Tournez 10-20 contenus en 1 heure !</p>
<h3>Équipement inclus :</h3>
<ul>
  <li>Sony FX3 montée verticale</li>
  <li>Ring light 18" Neewer</li>
  <li>LED RGB personnalisables</li>
  <li>Fonds colorés modulables</li>
  <li>Micro cravate sans fil</li>
  <li>Setup ultra-rapide</li>
  <li>Export optimisé mobile</li>
  <li>Tournage multi-contenus</li>
</ul>
<p><strong>Durée recommandée :</strong> 1 heure</p>`,
    vendor: 'Le 40',
    product_type: 'Studio Créatif',
    tags: ['studio', 'tiktok', 'reels', 'shorts', 'vertical', 'social-media', 'express', 'offre-lancement'],
    images: [
      { src: 'https://images.pexels.com/photos/9786304/pexels-photo-9786304.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/8297538/pexels-photo-8297538.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure (Recommandé)', price: '49.00', compare_at_price: '79.00', sku: 'STUDIO-VERTICAL-1H', duration_hours: 1 },
      { title: '2 heures', price: '98.00', compare_at_price: '158.00', sku: 'STUDIO-VERTICAL-2H', duration_hours: 2 },
      { title: '3 heures', price: '147.00', compare_at_price: '237.00', sku: 'STUDIO-VERTICAL-3H', duration_hours: 3 },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_name: 'Studio Vertical Social',
      resource_type: 'studio',
      capacity: '1-2',
      gradient: 'from-fuchsia-500 via-rose-500 to-pink-500',
      recommended_duration: '1h',
      launch_offer: true,
      savings: 30,
    },
  },
];

export const ADDITIONAL_SERVICES = [
  {
    id: 'montage-standard',
    title: 'Montage Vidéo Standard - YouTube/Podcast',
    body_html: `<h2>Montage professionnel pour contenu régulier</h2>
<p>Montage avec transitions, titres, sous-titres, correction audio basique et color grading léger. Parfait pour YouTube et podcasts.</p>
<h3>Inclus :</h3>
<ul>
  <li>Cuts et transitions</li>
  <li>Titres et sous-titres</li>
  <li>Correction audio basique</li>
  <li>Color grading léger</li>
  <li>2 révisions incluses</li>
  <li>Livraison 5 jours</li>
  <li>Formats optimisés réseaux</li>
  <li>Miniature YouTube incluse</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Post-Production',
    tags: ['service', 'montage', 'video', 'youtube', 'podcast', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure de rush', price: '79.00', sku: 'MONTAGE-STD-1H' },
      { title: '2 heures de rush', price: '158.00', sku: 'MONTAGE-STD-2H' },
      { title: '4 heures de rush', price: '316.00', sku: 'MONTAGE-STD-4H' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'service',
    },
  },
  {
    id: 'montage-premium',
    title: 'Montage Vidéo Premium - Qualité cinématique',
    body_html: `<h2>Montage avancé avec effets visuels et motion design</h2>
<p>Montage professionnel avec effets visuels, motion design, color grading pro et mixage audio complet. Pour un résultat exceptionnel.</p>
<h3>Inclus :</h3>
<ul>
  <li>Montage avancé multi-caméras</li>
  <li>Motion design et animations</li>
  <li>Color grading professionnel</li>
  <li>Mixage audio complet</li>
  <li>Effets visuels sur mesure</li>
  <li>3 révisions incluses</li>
  <li>Livraison 3-5 jours</li>
  <li>Formats multiples + miniatures</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Post-Production',
    tags: ['service', 'montage', 'premium', 'cinema', 'vfx', 'motion-design', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure de rush', price: '120.00', sku: 'MONTAGE-PRO-1H' },
      { title: '2 heures de rush', price: '240.00', sku: 'MONTAGE-PRO-2H' },
      { title: '4 heures de rush', price: '480.00', sku: 'MONTAGE-PRO-4H' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'service',
    },
  },
  {
    id: 'clipping-shorts',
    title: 'Pack Clipping Shorts - 5-10 clips TikTok/Reels',
    body_html: `<h2>Extraction et optimisation de clips courts</h2>
<p>Création de 5-10 clips courts (30-60s) optimisés pour TikTok, Reels et Shorts depuis votre contenu long.</p>
<h3>Inclus :</h3>
<ul>
  <li>5-10 clips courts (30-60s)</li>
  <li>Sélection des meilleurs moments</li>
  <li>Format vertical 9:16</li>
  <li>Sous-titres auto inclus</li>
  <li>Hooks optimisés</li>
  <li>Transitions dynamiques</li>
  <li>Miniatures pour chaque clip</li>
  <li>Livraison 3-5 jours</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Post-Production',
    tags: ['service', 'clipping', 'shorts', 'tiktok', 'reels', 'vertical', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Pack de 5-10 clips', price: '149.00', sku: 'CLIPPING-PACK' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'service',
    },
  },
  {
    id: 'teleprompter',
    title: 'Téléprompter - Écran 15" avec iPad',
    body_html: `<h2>Essentiel pour formations et présentations fluides</h2>
<p>Téléprompter professionnel 15" avec iPad, app dédiée et télécommande. Installation et support technique inclus.</p>
<h3>Inclus :</h3>
<ul>
  <li>Écran 15 pouces</li>
  <li>iPad avec app dédiée</li>
  <li>Vitesse ajustable</li>
  <li>Télécommande incluse</li>
  <li>Installation comprise</li>
  <li>Placement optimal</li>
  <li>Support technique</li>
  <li>Script pré-chargé</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Location Équipement',
    tags: ['equipement', 'teleprompter', 'formation', 'presentation'],
    images: [
      { src: 'https://images.pexels.com/photos/7991140/pexels-photo-7991140.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '15.00', sku: 'TELEPROMPTER-1H' },
      { title: '4 heures', price: '50.00', sku: 'TELEPROMPTER-4H' },
      { title: 'Journée', price: '90.00', sku: 'TELEPROMPTER-DAY' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'equipment',
    },
  },
  {
    id: 'camera-extra',
    title: 'Caméra Extra - Sony FX3 + Opérateur',
    body_html: `<h2>Angle supplémentaire pour multi-caméras</h2>
<p>Sony FX3 4K supplémentaire avec opérateur inclus. Synchronisation automatique et post-production facilitée.</p>
<h3>Inclus :</h3>
<ul>
  <li>Sony FX3 4K</li>
  <li>Angle supplémentaire</li>
  <li>Synchronisation automatique</li>
  <li>Opérateur inclus</li>
  <li>Stabilisation intégrée</li>
  <li>Objectif adapté</li>
  <li>Enregistrement simultané</li>
  <li>Post-production facilitée</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Location Équipement',
    tags: ['equipement', 'camera', 'multi-angle', 'sony'],
    images: [
      { src: 'https://images.pexels.com/photos/2606389/pexels-photo-2606389.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '25.00', sku: 'CAMERA-EXTRA-1H' },
      { title: '4 heures', price: '90.00', sku: 'CAMERA-EXTRA-4H' },
      { title: 'Journée', price: '150.00', sku: 'CAMERA-EXTRA-DAY' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'equipment',
    },
  },
  {
    id: 'live-switch',
    title: 'Live-Switch ATEM - Multi-streaming',
    body_html: `<h2>Diffusion simultanée multi-plateformes</h2>
<p>ATEM Mini Pro avec technicien dédié pour streaming sur Twitch, YouTube et LinkedIn simultanément.</p>
<h3>Inclus :</h3>
<ul>
  <li>ATEM Mini Pro</li>
  <li>Multi-streaming</li>
  <li>Twitch + YouTube + LinkedIn</li>
  <li>Régie temps réel</li>
  <li>Incrustations graphiques</li>
  <li>Chat overlay</li>
  <li>Technicien dédié</li>
  <li>Bande passante garantie</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Location Équipement',
    tags: ['equipement', 'streaming', 'atem', 'live', 'multi-plateforme', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 heure', price: '35.00', sku: 'ATEM-1H' },
      { title: '4 heures', price: '120.00', sku: 'ATEM-4H' },
      { title: 'Journée', price: '200.00', sku: 'ATEM-DAY' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'equipment',
    },
  },
];

export const EXPERT_SERVICES = [
  {
    id: 'script-writing',
    title: 'Rédaction Script Vidéo Professionnel',
    body_html: `<h2>Script structuré avec hooks et CTAs optimisés</h2>
<p>Script professionnel pour vos vidéos YouTube, formations ou présentations avec structure narrative complète.</p>
<h3>Inclus :</h3>
<ul>
  <li>Structure narrative complète (intro, corps, outro)</li>
  <li>Hooks accrocheurs pour captiver</li>
  <li>CTAs optimisés pour conversion</li>
  <li>Format téléprompter inclus</li>
  <li>2 révisions incluses</li>
  <li>Conseils de présentation</li>
  <li>Templates réutilisables</li>
  <li>Livraison 48h</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Expert',
    tags: ['service', 'expert', 'script', 'copywriting', 'youtube', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 script', price: '149.00', sku: 'EXPERT-SCRIPT-1' },
      { title: 'Pack 3 scripts', price: '399.00', sku: 'EXPERT-SCRIPT-3' },
      { title: 'Pack 5 scripts', price: '599.00', sku: 'EXPERT-SCRIPT-5' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'expert-service',
    },
  },
  {
    id: 'content-strategy',
    title: 'Consultation Stratégie Contenu - Session 2h',
    body_html: `<h2>Audit complet et plan stratégique personnalisé</h2>
<p>Session intensive avec un expert contenu pour définir votre stratégie et plan d'action.</p>
<h3>Inclus :</h3>
<ul>
  <li>Audit de votre chaîne/contenu</li>
  <li>Analyse de la concurrence</li>
  <li>Plan éditorial 30 jours</li>
  <li>Recommandations personnalisées</li>
  <li>Calendrier de publication</li>
  <li>Objectifs SMART définis</li>
  <li>Session Zoom/présentiel 2h</li>
  <li>Support 7 jours post-session</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Expert',
    tags: ['service', 'expert', 'strategie', 'consulting', 'coaching', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Session 2h', price: '299.00', sku: 'EXPERT-STRATEGY-2H' },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_type: 'expert-service',
    },
  },
  {
    id: 'seo-youtube',
    title: 'Optimisation SEO YouTube Complète',
    body_html: `<h2>Référencement complet pour maximiser la visibilité</h2>
<p>Optimisation complète de votre vidéo pour maximiser sa visibilité sur YouTube.</p>
<h3>Inclus :</h3>
<ul>
  <li>Recherche mots-clés avancée</li>
  <li>Titre optimisé SEO</li>
  <li>Description complète</li>
  <li>Tags stratégiques (30+)</li>
  <li>Miniature A/B testée</li>
  <li>Cards & End screens</li>
  <li>Chapitres optimisés</li>
  <li>Playlist recommendations</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Expert',
    tags: ['service', 'expert', 'seo', 'youtube', 'optimisation', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 vidéo', price: '179.00', sku: 'EXPERT-SEO-YT-1' },
      { title: 'Pack 5 vidéos', price: '799.00', sku: 'EXPERT-SEO-YT-5' },
      { title: 'Pack 10 vidéos', price: '1490.00', sku: 'EXPERT-SEO-YT-10' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'expert-service',
    },
  },
  {
    id: 'ads-management',
    title: 'Gestion Campagnes Ads Mensuelle - Expert Dédié',
    body_html: `<h2>Gestion complète de vos campagnes publicitaires</h2>
<p>Expert dédié pour gérer et optimiser vos campagnes YouTube, TikTok, Meta Ads avec ROI transparent.</p>
<h3>Inclus :</h3>
<ul>
  <li>Gestion complète multi-plateformes</li>
  <li>Tests A/B continus</li>
  <li>Optimisation quotidienne</li>
  <li>Rapport hebdomadaire détaillé</li>
  <li>Scaling stratégique</li>
  <li>ROI tracking transparent</li>
  <li>Réunion mensuelle stratégique</li>
  <li>Expert dédié 7j/7</li>
</ul>
<p><strong>Note :</strong> Budget publicitaire en supplément (recommandé min 1000€/mois)</p>`,
    vendor: 'Le 40',
    product_type: 'Service Expert',
    tags: ['service', 'expert', 'ads', 'publicite', 'marketing', 'gestion', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/3183170/pexels-photo-3183170.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Mensuel', price: '499.00', sku: 'EXPERT-ADS-MGMT' },
      { title: 'Trimestriel (-10%)', price: '1347.00', sku: 'EXPERT-ADS-MGMT-3M' },
      { title: 'Annuel (-20%)', price: '4788.00', sku: 'EXPERT-ADS-MGMT-12M' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'expert-service',
      recurring: true,
    },
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Package Complet',
    body_html: `<h2>Identité visuelle complète pour votre marque</h2>
<p>Package complet d'identité de marque : logo, charte graphique, templates et animations.</p>
<h3>Inclus :</h3>
<ul>
  <li>Logo professionnel (3 variations)</li>
  <li>Charte graphique complète</li>
  <li>Templates réseaux sociaux (20+)</li>
  <li>Intro/Outro vidéo animée</li>
  <li>Lower thirds brandés</li>
  <li>Style guide complet PDF</li>
  <li>Fichiers sources (AI, PSD)</li>
  <li>3 révisions majeures</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Expert',
    tags: ['service', 'expert', 'branding', 'design', 'identite', 'logo', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Package complet', price: '799.00', sku: 'EXPERT-BRAND-FULL' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'expert-service',
    },
  },
  {
    id: 'multi-platform-distribution',
    title: 'Distribution Multi-Plateforme Automatisée',
    body_html: `<h2>Présence maximale sur 5+ plateformes</h2>
<p>Adaptation et distribution automatisée de votre contenu sur toutes les plateformes sociales.</p>
<h3>Inclus :</h3>
<ul>
  <li>Adaptation TikTok, Reels, Shorts, LinkedIn</li>
  <li>Textes personnalisés par plateforme</li>
  <li>Hashtags optimisés</li>
  <li>Programmation automatique</li>
  <li>Formats adaptés (9:16, 1:1, 16:9)</li>
  <li>5+ plateformes</li>
  <li>Analytics centralisés</li>
  <li>Best times to post</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Expert',
    tags: ['service', 'expert', 'distribution', 'reseaux-sociaux', 'automation', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: '1 contenu', price: '149.00', sku: 'EXPERT-DISTRIB-1' },
      { title: 'Pack 5 contenus', price: '649.00', sku: 'EXPERT-DISTRIB-5' },
      { title: 'Pack 10 contenus', price: '1199.00', sku: 'EXPERT-DISTRIB-10' },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'expert-service',
    },
  },
];

export const PREMIUM_SERVICES = [
  {
    id: 'makeup-team',
    title: 'Team Maquillage Professionnel',
    body_html: `<h2>Maquilleuse dédiée pour votre équipe</h2>
<p>Service maquillage complet avec maquilleuse présente pendant toute la session.</p>
<h3>Inclus :</h3>
<ul>
  <li>Jusqu'à 4 personnes</li>
  <li>Maquilleuse dédiée sur place</li>
  <li>Présence pendant toute la session</li>
  <li>Retouches continues illimitées</li>
  <li>Kit complet professionnel</li>
  <li>Adaptable aux besoins</li>
  <li>Changements de looks possibles</li>
  <li>Photos de chaque look</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Beauty',
    tags: ['service', 'beauty', 'makeup', 'team', 'professional', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Session complète', price: '399.00', sku: 'BEAUTY-TEAM-SESS' },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_type: 'beauty-service',
    },
  },
  {
    id: 'decoration-package',
    title: 'Pack Décoration Studio',
    body_html: `<h2>Setup thématique pour votre tournage</h2>
<p>Décoration personnalisée de votre espace avec plusieurs options thématiques.</p>
<h3>Options :</h3>
<ul>
  <li>Setup E-commerce produits - 199€</li>
  <li>Setup Interview/Bureau - 149€</li>
  <li>Setup Gaming/Tech RGB - 249€</li>
  <li>Décoration personnalisée - 299€</li>
  <li>Scénographie sur-mesure - 799€</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Décoration',
    tags: ['service', 'decoration', 'setup', 'custom', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Setup E-commerce', price: '199.00', sku: 'DECO-ECOM' },
      { title: 'Setup Bureau', price: '149.00', sku: 'DECO-BUREAU' },
      { title: 'Setup Gaming', price: '249.00', sku: 'DECO-GAMING' },
      { title: 'Décoration custom', price: '299.00', sku: 'DECO-CUSTOM' },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_type: 'decoration-service',
    },
  },
  {
    id: 'catering-full-day',
    title: 'Catering Journée Complète',
    body_html: `<h2>Restauration complète pour votre tournage</h2>
<p>Package catering avec coffee break, déjeuner et snacks toute la journée.</p>
<h3>Inclus :</h3>
<ul>
  <li>Coffee break (café, thé, viennoiseries)</li>
  <li>Déjeuner traiteur au choix</li>
  <li>Bar à snacks toute la journée</li>
  <li>Eau minérale illimitée</li>
  <li>Options végétariennes/vegan</li>
  <li>Service et débarrassage</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Catering',
    tags: ['service', 'catering', 'food', 'lunch', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Par personne', price: '45.00', sku: 'CATER-DAY-PERS' },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_type: 'catering-service',
    },
  },
  {
    id: 'technical-support',
    title: 'Support Technique Premium',
    body_html: `<h2>Techniciens dédiés pour votre tournage</h2>
<p>Services techniques professionnels avec experts dédiés.</p>
<h3>Services :</h3>
<ul>
  <li>Régie Vidéo Live - 149€</li>
  <li>Ingénieur Son - 99€/h</li>
  <li>Photographe Plateau - 299€</li>
  <li>Drone Intérieur/Extérieur - 399€</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Technique',
    tags: ['service', 'technical', 'support', 'engineer', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Régie Vidéo', price: '149.00', sku: 'TECH-REGIE' },
      { title: 'Ingénieur Son', price: '99.00', sku: 'TECH-SOUND' },
      { title: 'Photographe', price: '299.00', sku: 'TECH-PHOTO' },
      { title: 'Drone', price: '399.00', sku: 'TECH-DRONE' },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_type: 'technical-service',
    },
  },
  {
    id: 'equipment-rental',
    title: 'Location Équipement Premium',
    body_html: `<h2>Matériel professionnel haute gamme</h2>
<p>Location de matériel premium avec formation et assurance incluses.</p>
<h3>Équipement :</h3>
<ul>
  <li>Gimbal DJI Ronin RS3 Pro</li>
  <li>Kit LED RGB (4 projecteurs)</li>
  <li>Slider Motorisé 1.5m</li>
  <li>Kit Micro Sans-Fil</li>
  <li>Green Screen Portable</li>
  <li>Kit Cinéma RED/ARRI</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Location',
    tags: ['rental', 'equipment', 'camera', 'lighting', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Gimbal Pro', price: '99.00', sku: 'RENT-GIMBAL' },
      { title: 'LED RGB Kit', price: '149.00', sku: 'RENT-LED' },
      { title: 'Slider', price: '79.00', sku: 'RENT-SLIDER' },
      { title: 'Kit Cinéma', price: '499.00', sku: 'RENT-CINEMA' },
    ],
    metafields: {
      calendar_sync_required: true,
      resource_type: 'rental',
    },
  },
];

export const DOMICILIATION_PACKS = [
  {
    id: 'domiciliation-starter',
    title: 'Domiciliation STARTER - Freelances & Auto-Entrepreneurs',
    body_html: `<h2>Pack Domiciliation pour Indépendants</h2>
<p>Solution idéale pour freelances et auto-entrepreneurs qui ont besoin d'une adresse professionnelle prestigieuse à Marseille.</p>

<h3>✅ Services inclus :</h3>
<ul>
  <li>📍 Adresse prestigieuse au 40 Avenue de Saint Antoine, Marseille 13015</li>
  <li>📧 Scan de votre courrier en 2h</li>
  <li>📦 Réexpédition hebdomadaire incluse</li>
  <li>📄 Attestations administratives fournies</li>
  <li>✅ Conformité juridique 100% garantie</li>
  <li>🔓 Résiliable en 1 clic, sans engagement</li>
  <li>💯 Satisfait ou remboursé 30 jours</li>
  <li>📞 Support client prioritaire</li>
</ul>

<h3>💰 Ce que vous économisez :</h3>
<ul>
  <li>⏱️ 5h/mois de gestion courrier (150€)</li>
  <li>🏢 Location de bureau physique (400€/mois)</li>
  <li>📋 100% conformité administrative garantie</li>
  <li>💼 Image professionnelle établie</li>
</ul>

<h3>📌 Idéal pour :</h3>
<ul>
  <li>Freelances démarrant leur activité</li>
  <li>Auto-entrepreneurs</li>
  <li>Consultants indépendants</li>
  <li>Activités digitales sans besoin de bureau</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Domiciliation',
    tags: ['domiciliation', 'starter', 'freelance', 'auto-entrepreneur', 'marseille', 'adresse-professionnelle', 'sans-engagement'],
    images: [
      { src: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Abonnement Mensuel',
        price: '49.00',
        sku: 'DOMI-STARTER-MONTH',
        compare_at_price: null,
      },
      {
        title: 'Abonnement Annuel (Économisez 20%)',
        price: '470.40',
        sku: 'DOMI-STARTER-YEAR',
        compare_at_price: '588.00',
      },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'domiciliation',
      is_subscription: true,
      billing_type: 'recurring',
      cancellable: true,
      gradient: 'from-zinc-600 to-gray-600',
    },
  },
  {
    id: 'domiciliation-business',
    title: 'Domiciliation BUSINESS - SARL, SAS, PME',
    body_html: `<h2>Pack Domiciliation Complet pour Entreprises</h2>
<p>Solution tout-en-un pour SARL, SAS et PME incluant services de secrétariat et espaces de réunion.</p>

<h3>✅ Services inclus :</h3>
<ul>
  <li>📍 Adresse prestigieuse au 40 Avenue de Saint Antoine, Marseille 13015</li>
  <li>📞 Standard téléphonique professionnel inclus</li>
  <li>👔 Accueil clients personnalisé sur place</li>
  <li>📧 Scan courrier en 1h + réexpédition quotidienne</li>
  <li>🏢 2h de salle de réunion/mois incluses</li>
  <li>🌐 Configuration Google Business Profile</li>
  <li>📄 Attestations et documents administratifs</li>
  <li>🔓 Résiliable en 1 clic, sans engagement</li>
  <li>💯 Satisfait ou remboursé 30 jours</li>
  <li>📞 Support client prioritaire 7j/7</li>
</ul>

<h3>💰 Ce que vous économisez :</h3>
<ul>
  <li>💼 300€/mois de secrétariat externe</li>
  <li>🏢 150€/mois de location salle réunion</li>
  <li>📞 120€/mois de standard téléphonique</li>
  <li>👥 Image d'entreprise établie et professionnelle</li>
  <li>⏱️ 10h/mois de gestion administrative</li>
</ul>

<h3>📌 Idéal pour :</h3>
<ul>
  <li>SARL et SAS en croissance</li>
  <li>PME avec équipes réparties</li>
  <li>Sociétés de conseil</li>
  <li>Entreprises cherchant image premium</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Domiciliation',
    tags: ['domiciliation', 'business', 'sarl', 'sas', 'pme', 'marseille', 'populaire', 'standard-telephonique', 'secretariat'],
    images: [
      { src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Abonnement Mensuel',
        price: '99.00',
        sku: 'DOMI-BUSINESS-MONTH',
        compare_at_price: null,
      },
      {
        title: 'Abonnement Annuel (Économisez 20%)',
        price: '950.40',
        sku: 'DOMI-BUSINESS-YEAR',
        compare_at_price: '1188.00',
      },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'domiciliation',
      is_subscription: true,
      billing_type: 'recurring',
      cancellable: true,
      gradient: 'from-amber-600 to-orange-600',
      popular: true,
    },
  },
  {
    id: 'domiciliation-scaleup',
    title: 'Domiciliation SCALE-UP - Siège Social Complet',
    body_html: `<h2>Pack Premium Siège Social Tout Inclus</h2>
<p>Solution haut de gamme pour entreprises en forte croissance nécessitant infrastructure complète.</p>

<h3>✅ Services inclus :</h3>
<ul>
  <li>📍 Adresse prestigieuse au 40 Avenue de Saint Antoine, Marseille 13015</li>
  <li>👔 Secrétariat dédié avec assistante attitrée</li>
  <li>🏢 8h de salle de réunion/mois incluses</li>
  <li>💼 4h de bureau privatif/mois incluses</li>
  <li>📞 Standard téléphonique premium dédié</li>
  <li>👥 Accueil VIP clients et partenaires</li>
  <li>📧 Gestion administrative complète</li>
  <li>📦 Réception et gestion colis illimitée</li>
  <li>🎯 Conseiller dédié prioritaire 24/7</li>
  <li>🌐 Présence digitale optimisée (Google Business)</li>
  <li>📄 Support juridique et administratif</li>
  <li>🔓 Résiliable en 1 clic, sans engagement</li>
  <li>💯 Satisfait ou remboursé 30 jours</li>
</ul>

<h3>💰 Ce que vous économisez :</h3>
<ul>
  <li>🏢 800€/mois de location bureau</li>
  <li>💼 1000€/mois d'assistante plein temps</li>
  <li>🏢 300€/mois de salles réunion</li>
  <li>📞 200€/mois de services téléphoniques</li>
  <li>⏱️ 20h/mois de gestion administrative</li>
  <li>💎 Infrastructure complète clé en main</li>
</ul>

<h3>📌 Idéal pour :</h3>
<ul>
  <li>Scale-ups en forte croissance</li>
  <li>Entreprises levée de fonds</li>
  <li>Sociétés internationales (siège FR)</li>
  <li>Groupes nécessitant infrastructure premium</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Domiciliation',
    tags: ['domiciliation', 'premium', 'scale-up', 'siege-social', 'marseille', 'secretariat-dedie', 'vip', 'entreprise'],
    images: [
      { src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Abonnement Mensuel',
        price: '199.00',
        sku: 'DOMI-SCALEUP-MONTH',
        compare_at_price: null,
      },
      {
        title: 'Abonnement Annuel (Économisez 20%)',
        price: '1910.40',
        sku: 'DOMI-SCALEUP-YEAR',
        compare_at_price: '2388.00',
      },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'domiciliation',
      is_subscription: true,
      billing_type: 'recurring',
      cancellable: true,
      gradient: 'from-orange-600 to-red-600',
    },
  },
];

export const EVENTS = [
  {
    id: 'event-afterwork-networking',
    title: 'Afterwork Networking Premium - 15 Nov 2025',
    body_html: `<h2>Soirée Networking Exclusive</h2>
<p>Rejoignez-nous pour une soirée networking exclusive dans une ambiance conviviale. Rencontrez des entrepreneurs passionnés, échangez sur vos projets et développez votre réseau professionnel autour de cocktails et petits fours.</p>

<h3>🎯 Au programme :</h3>
<ul>
  <li>🤝 Speed-networking organisés pour maximiser les rencontres</li>
  <li>🍸 Cocktails et petits fours inclus</li>
  <li>💼 Échanges entre entrepreneurs passionnés</li>
  <li>🎤 Présentation rapide de votre projet (optionnel)</li>
  <li>📱 Échanges de contacts et opportunités business</li>
</ul>

<h3>📅 Informations pratiques :</h3>
<ul>
  <li>📍 Le 40 - 40 Avenue de Saint Antoine, Marseille 13015</li>
  <li>🕐 15 Novembre 2025 - 18h30</li>
  <li>⏱️ Durée : 2h30</li>
  <li>👥 Places limitées : 50 participants</li>
  <li>🎓 Niveau : Tous niveaux</li>
</ul>

<h3>💰 Tarifs :</h3>
<ul>
  <li>Membres Le 40 Club : GRATUIT</li>
  <li>Non-membres : 15€</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Événement',
    tags: ['event', 'networking', 'afterwork', 'cocktail', 'marseille', 'featured'],
    images: [
      { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Ticket Membre', price: '0.00', sku: 'EVENT-AFTERWORK-MEMBER', inventory_quantity: 25 },
      { title: 'Ticket Non-Membre', price: '15.00', sku: 'EVENT-AFTERWORK-NONMEMBER', inventory_quantity: 25 },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'event',
      event_date: '2025-11-15T18:30:00',
      event_duration: 150,
      max_attendees: 50,
      category: 'Networking',
      difficulty_level: 'Tous niveaux',
    },
  },
  {
    id: 'event-masterclass-lever-fonds',
    title: 'Masterclass: Lever des Fonds en 2025 - 22 Nov 2025',
    body_html: `<h2>Masterclass Intensive - Levée de Fonds</h2>
<p>Masterclass intensive sur les stratégies et techniques pour réussir sa levée de fonds. Session animée par Caroline Chen, investment partner avec 15 ans d'expérience.</p>

<h3>🎯 Ce que vous allez apprendre :</h3>
<ul>
  <li>📊 Préparer un pitch deck qui convertit</li>
  <li>🎯 Identifier les bons investisseurs pour votre projet</li>
  <li>💼 Négocier les termes et la valorisation</li>
  <li>⚠️ Éviter les pièges courants des levées de fonds</li>
  <li>📈 Stratégies de croissance post-investissement</li>
  <li>🤝 Networking avec d'autres entrepreneurs en levée</li>
</ul>

<h3>👩‍🏫 Intervenant :</h3>
<p><strong>Caroline Chen</strong> - Investment Partner avec 15 ans d'expérience, 50+ deals réalisés, 200M€ levés.</p>

<h3>📅 Informations pratiques :</h3>
<ul>
  <li>📍 Le 40 - Marseille</li>
  <li>🕐 22 Novembre 2025 - 14h00</li>
  <li>⏱️ Durée : 3h</li>
  <li>👥 Places limitées : 20 participants</li>
  <li>🎓 Niveau : Intermédiaire</li>
  <li>✅ Prérequis : Avoir un projet de startup en phase de développement</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Événement',
    tags: ['event', 'masterclass', 'finance', 'investissement', 'pitch', 'marseille', 'featured'],
    images: [
      { src: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Ticket Membre', price: '49.00', sku: 'EVENT-MASTERCLASS-FUNDS-MEMBER', inventory_quantity: 10 },
      { title: 'Ticket Non-Membre', price: '89.00', sku: 'EVENT-MASTERCLASS-FUNDS-NONMEMBER', inventory_quantity: 10 },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'event',
      event_date: '2025-11-22T14:00:00',
      event_duration: 180,
      max_attendees: 20,
      category: 'Masterclass',
      difficulty_level: 'Intermédiaire',
    },
  },
  {
    id: 'event-conference-ia-pme',
    title: 'Conférence: L\'IA au Service des PME - 5 Déc 2025',
    body_html: `<h2>Intelligence Artificielle pour PME</h2>
<p>Découvrez comment intégrer l'intelligence artificielle dans votre stratégie d'entreprise. Applications concrètes, outils accessibles, et retours d'expérience de PME qui ont transformé leur activité.</p>

<h3>🤖 Au programme :</h3>
<ul>
  <li>🎯 Applications concrètes de l'IA pour PME</li>
  <li>🛠️ Outils IA accessibles sans être développeur</li>
  <li>💡 Cas d'usage : marketing, ventes, service client</li>
  <li>📊 ROI et gains de productivité mesurables</li>
  <li>🧪 Démonstrations en live d'outils IA</li>
  <li>❓ Session Q&A interactive</li>
</ul>

<h3>📅 Informations pratiques :</h3>
<ul>
  <li>📍 Le 40 - Marseille</li>
  <li>🕐 5 Décembre 2025 - 19h00</li>
  <li>⏱️ Durée : 2h</li>
  <li>👥 Places limitées : 80 participants</li>
  <li>🎓 Niveau : Tous niveaux</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Événement',
    tags: ['event', 'conference', 'ia', 'innovation', 'technologie', 'marseille', 'featured'],
    images: [
      { src: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Ticket Membre', price: '20.00', sku: 'EVENT-CONF-IA-MEMBER', inventory_quantity: 40 },
      { title: 'Ticket Non-Membre', price: '35.00', sku: 'EVENT-CONF-IA-NONMEMBER', inventory_quantity: 40 },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'event',
      event_date: '2025-12-05T19:00:00',
      event_duration: 120,
      max_attendees: 80,
      category: 'Conférence',
      difficulty_level: 'Tous niveaux',
    },
  },
  {
    id: 'event-atelier-marketing-digital',
    title: 'Atelier Marketing Digital Intensif - 12 Déc 2025',
    body_html: `<h2>Formation Marketing Digital - Journée Intensive</h2>
<p>Formation intensive d'une journée sur les stratégies marketing digital qui convertissent. Tous les canaux essentiels pour générer des leads qualifiés.</p>

<h3>📚 Programme complet :</h3>
<ul>
  <li>🔍 SEO : Référencement naturel et stratégie de contenu</li>
  <li>💰 Publicité en ligne : Google Ads, Facebook Ads, LinkedIn</li>
  <li>📧 Email marketing : Automation et séquences de conversion</li>
  <li>📱 Réseaux sociaux : Stratégie et création de contenu</li>
  <li>📊 Analytics : Mesurer et optimiser vos campagnes</li>
  <li>🎯 Funnel de conversion : De la visibilité à la vente</li>
  <li>💪 Exercices pratiques et mise en situation</li>
</ul>

<h3>📅 Informations pratiques :</h3>
<ul>
  <li>📍 Le 40 - Marseille</li>
  <li>🕐 12 Décembre 2025 - 10h00</li>
  <li>⏱️ Durée : 6h (pause déjeuner incluse)</li>
  <li>👥 Places limitées : 15 participants</li>
  <li>🎓 Niveau : Intermédiaire</li>
  <li>💻 Apportez votre ordinateur</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Événement',
    tags: ['event', 'atelier', 'marketing', 'digital', 'formation', 'marseille'],
    images: [
      { src: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Ticket Membre', price: '89.00', sku: 'EVENT-ATELIER-MARKETING-MEMBER', inventory_quantity: 8 },
      { title: 'Ticket Non-Membre', price: '149.00', sku: 'EVENT-ATELIER-MARKETING-NONMEMBER', inventory_quantity: 7 },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'event',
      event_date: '2025-12-12T10:00:00',
      event_duration: 360,
      max_attendees: 15,
      category: 'Atelier',
      difficulty_level: 'Intermédiaire',
    },
  },
  {
    id: 'event-pitch-session-startups',
    title: 'Pitch Session Startups - 20 Déc 2025',
    body_html: `<h2>Session Pitch Devant Investisseurs</h2>
<p>Présentez votre startup devant un panel d'investisseurs et d'entrepreneurs expérimentés. Excellente opportunité pour affiner votre discours et recevoir des feedbacks précieux.</p>

<h3>🎤 Format :</h3>
<ul>
  <li>⏱️ 5 minutes de pitch par startup</li>
  <li>💬 10 minutes de Q&A constructif</li>
  <li>📝 Feedbacks détaillés du panel</li>
  <li>🤝 Networking après la session</li>
  <li>📹 Enregistrement vidéo de votre pitch (optionnel)</li>
</ul>

<h3>👥 Panel :</h3>
<ul>
  <li>Investisseurs early-stage</li>
  <li>Business angels</li>
  <li>Entrepreneurs à succès</li>
</ul>

<h3>📅 Informations pratiques :</h3>
<ul>
  <li>📍 Le 40 - Marseille</li>
  <li>🕐 20 Décembre 2025 - 18h00</li>
  <li>⏱️ Durée : 2h30</li>
  <li>👥 Places limitées : 40 participants</li>
  <li>🎓 Niveau : Tous niveaux</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Événement',
    tags: ['event', 'pitch', 'startup', 'networking', 'investisseurs', 'marseille'],
    images: [
      { src: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      { title: 'Ticket Membre', price: '0.00', sku: 'EVENT-PITCH-SESSION-MEMBER', inventory_quantity: 20 },
      { title: 'Ticket Non-Membre', price: '25.00', sku: 'EVENT-PITCH-SESSION-NONMEMBER', inventory_quantity: 20 },
    ],
    metafields: {
      calendar_sync_required: false,
      resource_type: 'event',
      event_date: '2025-12-20T18:00:00',
      event_duration: 150,
      max_attendees: 40,
      category: 'Networking',
      difficulty_level: 'Tous niveaux',
    },
  },
];

export const ALL_PRODUCTS = [...MEETING_ROOMS, ...STUDIOS, ...ADDITIONAL_SERVICES, ...EXPERT_SERVICES, ...PREMIUM_SERVICES, ...DOMICILIATION_PACKS, ...EVENTS];
