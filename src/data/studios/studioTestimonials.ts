export interface StudioTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  studioUsed: string;
  gradient: string;
}

export const studioTestimonials: StudioTestimonial[] = [
  {
    id: '1',
    name: 'Marie Laurent',
    role: 'YouTubeuse',
    company: '125K abonnés',
    content: 'Le studio Face-Cam est parfait pour mes vidéos. L\'équipement est pro, le technicien est au top, et le rapport qualité-prix est imbattable. Je réserve maintenant chaque semaine!',
    rating: 5,
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    studioUsed: 'Face-Cam Solo',
    gradient: 'from-rose-500 to-fuchsia-500'
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    role: 'Podcasteur',
    company: 'Le Podcast Tech',
    content: 'L\'isolation acoustique du studio podcast est exceptionnelle. On entend la différence à l\'écoute. Les micros Shure SM7B sont un rêve, et la RØDECaster facilite tout.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    studioUsed: 'Podcast Audio',
    gradient: 'from-fuchsia-500 to-purple-500'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    role: 'Streameuse Twitch',
    company: '50K followers',
    content: 'Le setup streaming avec ATEM est incroyable! Multi-cam, régie live, le tout pour un prix très accessible. Mes viewers adorent la qualité de mes lives maintenant.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3765035/pexels-photo-3765035.jpeg?auto=compress&cs=tinysrgb&w=400',
    studioUsed: 'Live Stream',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    id: '4',
    name: 'Alexandre Martin',
    role: 'Directeur Marketing',
    company: 'TechCorp',
    content: 'Nous avons tourné notre émission mensuelle sur le plateau Full Show. Le rendu est digne d\'une production TV! L\'équipe est professionnelle et les décors magnifiques.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    studioUsed: 'Full Show',
    gradient: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: '5',
    name: 'Julie Moreau',
    role: 'Coach Business',
    company: 'Coaching Expert',
    content: 'Le studio intimiste est parfait pour mes interviews clients. L\'ambiance est chaleureuse, l\'éclairage cinéma sublime, et ça met en confiance mes invités.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=400',
    studioUsed: 'Interview Intimiste',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: '6',
    name: 'Lucas Bernard',
    role: 'Créateur de contenu',
    company: 'TikTok 200K',
    content: 'Le studio vertical est génial pour mes Reels et TikToks! Je peux tourner 10-15 contenus en 1h. Le format vertical natif et les fonds modulables sont un game changer.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg?auto=compress&cs=tinysrgb&w=400',
    studioUsed: 'Vertical Social',
    gradient: 'from-fuchsia-500 to-rose-500'
  }
];
