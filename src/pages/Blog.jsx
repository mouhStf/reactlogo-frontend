import { NavLink } from "react-router";
import { PageChanger } from "./Shop";
import { API_BASE_URL } from "../utils/api";

const blogData = [
  {
    image: '0.jpg',
    category: 'Tenues Traditionnelles',
    date: '15 janv. 2022',
    title: 'Le Boubou Iconique : Vêtement Intemporel du Sénégal',
    description: 'Découvrez la signification culturelle et les adaptations modernes du boubou, une robe fluide symbolisant respect et communauté dans la mode sénégalaise.',
  },
  {
    image: '1.jpg',
    category: 'Focus Créateur',
    date: '10 févr. 2022',
    title: 'Selly Raby Kane : Révolution de la Couture Sénégalaise',
    description: 'Découvrez comment Selly Raby Kane mêle motifs wolofs traditionnels et silhouettes contemporaines pour une renommée mondiale.',
  },
  {
    image: '2.jpg',
    category: 'Streetwear',
    date: '05 mars, 2022',
    title: 'Style Urbain de Dakar : Fusion d’Héritage et Modernité',
    description: 'Des marchés animés aux avenues branchées, les jeunes sénégalais mêlent streetwear et motifs culturels pour un look unique.',
  },
  {
    image: '3.jpg',
    category: 'Tissus',
    date: '20 mars, 2022',
    title: 'Magie du Bazin : Le Tissu Luxueux du Sénégal',
    description: 'Plongez dans le bazin, damassé teint à l’indigo, symbole de richesse et d’art dans les tenues sénégalaises.',
  },
  {
    image: '4.jpg',
    category: 'Tenues Traditionnelles',
    date: '12 avr. 2022',
    title: 'Kaftans Élégants : Grâce Fluide dans la Mode Sénégalaise',
    description: 'Les kaftans, ornés de broderies et motifs vibrants, restent incontournables pour hommes et femmes lors des célébrations.',
  },
  {
    image: '5.jpg',
    category: 'Tendances',
    date: '08 mai, 2022',
    title: 'Tradi-Moderne : Mélange d’Ancien et de Nouveau à Dakar',
    description: 'Inspiré par des leaders comme Bassirou Diomaye Faye, ce style combine coupes occidentales et imprimés sénégalais pour une élégance quotidienne.',
  },
  {
    image: '6.jpg',
    category: 'Accessoires',
    date: '25 mai, 2022',
    title: 'Or et Gloire : Bijoux dans le Sañse Sénégalais',
    description: 'Le sañse, art de s’habiller avec soin, brille avec des bijoux en or élaborés et des foulards qui rehaussent toute tenue.',
  },
  {
    image: '7.jpg',
    category: 'Durabilité',
    date: '18 juin, 2022',
    title: 'Éco-Chic : Pratiques Durables dans le Design Sénégalais',
    description: 'Les artisans sénégalais adoptent des tissus éthiques et matériaux recyclés pour une mode respectueuse de l’environnement.',
  },
  {
    image: '8.jpg',
    category: 'Styles Régionaux',
    date: '02 juil. 2022',
    title: 'Tissages Wolofs : Motifs du Cœur du Sénégal',
    description: 'Les textiles wolofs traditionnels présentent des teintures complexes et motifs racontant des histoires d’héritage et de spiritualité.',
  },
  {
    image: '9.jpg',
    category: 'Contemporain',
    date: '20 juil. 2022',
    title: 'Afro-Futurisme : Nouvelle Frontière de la Mode Sénégalaise',
    description: 'Les créateurs de Dakar pionniers du style afro-futuriste mêlent broderies spirituelles et silhouettes de science-fiction.',
  },
  {
    image: '10.jpg',
    category: 'Tissus',
    date: '14 août, 2022',
    title: 'Imprimés Wax : Histoires Vibrantes sur les Tissus Sénégalais',
    description: 'Les tissus wax hollandais, réinterprétés localement, éclatent de couleurs symbolisant prospérité et fierté nationale.',
  },
  {
    image: '11.jpg',
    category: 'Focus Créateur',
    date: '03 sept. 2022',
    title: 'Adama Paris : Couture à la Profondeur Culturelle',
    description: 'Adama Paris confectionne des robes luxueuses honorant l’identité sénégalaise tout en captivant les podiums internationaux.',
  },
  {
    image: '12.jpg',
    category: 'Streetwear',
    date: '22 sept. 2022',
    title: 'Révolution Jeunesse : Streetwear des Rues Sénégalaises',
    description: 'Les jeunes créateurs intègrent influences hip-hop et accents de bazin, créant un export mondial depuis la scène jeune de Dakar.',
  },
  {
    image: '13.jpg',
    category: 'Tenues Traditionnelles',
    date: '10 oct. 2022',
    title: 'Maîtrise du Moussor : Écharpes Polyvalentes Sénégalaises',
    description: 'Le moussor, simple mais élégant, s’adapte du quotidien aux cérémonies fastueuses.',
  },
  {
    image: '14.jpg',
    category: 'Tendances',
    date: '28 oct. 2022',
    title: 'Symbolisme des Couleurs : Rouge, Vert et Or au Sénégal',
    description: 'Les couleurs de la mode sénégalaise expriment vitalité et paix, reflétant le drapeau dans chaque tenue audacieuse.',
  },
  {
    image: '15.jpg',
    category: 'Influence Mondiale',
    date: '15 nov. 2022',
    title: 'Sophie Zinga : Le Style Sénégalais à l’International',
    description: 'De Paris à New York, les créations de Sophie Zinga mettent en avant la fusion sénégalaise de tradition et modernité.',
  },
];

export function Blog() {
  return (
    <div className="p-[50px] mt-[50px]">
      <div className="w-full grid grid-cols-3">
        {blogData.map((item) => (
          <div className="px-[12px] mb-16">
            <NavLink to="article">
              <img src={`${API_BASE_URL}/public/Fashion/${item.image}`} className="aspect-45/28 object-cover"/>
            </NavLink>
            <div className="text-xl text-gray-400 mt-3">{item.category} / {item.date}</div>
            <NavLink to="article" className="text-3xl text-black mt-2">{item.title}</NavLink>
            <div className="text-gray-400 mt-2">{item.description}</div>
          </div>
        ))}
      </div>
      <PageChanger />
    </div>
  );
}
