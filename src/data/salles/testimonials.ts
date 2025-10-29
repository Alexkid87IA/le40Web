export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marie Durand",
    role: "CEO",
    company: "TechStartup",
    image: "MD",
    rating: 5,
    text: "Les salles sont parfaitement équipées et le service est impeccable. Nous organisons tous nos séminaires au 40 maintenant. L'équipe est toujours disponible et réactive."
  },
  {
    name: "Thomas Bernard",
    role: "Directeur Marketing",
    company: "Innov Agency",
    image: "TB",
    rating: 5,
    text: "La terrasse panoramique a transformé notre événement de lancement en un moment inoubliable. Vue exceptionnelle, équipement top, et service aux petits oignons !"
  },
  {
    name: "Sophie Laurent",
    role: "Coach d'entreprise",
    company: "LeadSuccess",
    image: "SL",
    rating: 5,
    text: "J'anime mes sessions de coaching dans la Salle Focus depuis 6 mois. L'isolation acoustique est parfaite et mes clients adorent l'ambiance professionnelle et intimiste."
  }
];
