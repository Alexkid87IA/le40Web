export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  bio: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Morgan Aiwekhoe',
    role: 'CEO',
    company: 'South Management',
    image: '/images/testimonials/morgane.jpeg',
    quote: 'Tout est au top, l\'accueil est incroyable. On a constitué une équipe de presque 10 personnes grâce au réseau du 40, ça a été déterminant pour notre croissance.',
    bio: 'Morgan dirige South Management, une agence de talents basée à Marseille. Domicilié au 40 depuis 2022, il y a trouvé bien plus qu\'une adresse : un vrai écosystème pour développer son activité.'
  },
  {
    name: 'Alexandre Quilghini',
    role: 'Président',
    company: 'Origines Média',
    image: '/images/testimonials/alexandre.jpeg',
    quote: 'Le 40 nous a permis de professionnaliser notre image dès le lancement. L\'adresse, le standard téléphonique, les salles de réunion — tout est inclus et ça change tout.',
    bio: 'Alexandre est le président d\'Origines Média, une agence de communication et production audiovisuelle. Il a choisi Le 40 pour ancrer son entreprise dans un lieu qui reflète son ambition.'
  },
  {
    name: 'Djamal Biyou',
    role: 'Fondateur',
    company: 'Biyoo',
    image: '/images/testimonials/djamal.jpeg',
    quote: 'Ce qui m\'a convaincu c\'est la réactivité. Le courrier scanné en 2h, un conseiller qui répond dans l\'heure — quand on est entrepreneur, ce gain de temps est inestimable.',
    bio: 'Djamal a fondé Biyoo, une entreprise spécialisée dans les services aux professionnels. Il a rejoint Le 40 pour bénéficier d\'une domiciliation complète sans les contraintes d\'un bail classique.'
  }
];
