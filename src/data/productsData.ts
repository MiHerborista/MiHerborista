import { Product, RecipeTutorial } from '../types';

export interface RayonPhareItem {
  id: string;
  title: string;
  subtitle: string;
  categoryKey: any;
  imageUrl: string;
}

export const RAYONS_PHARES: RayonPhareItem[] = [
  {
    id: 'serums-visage',
    title: 'Sérums Visage',
    subtitle: 'Best-sellers',
    categoryKey: 'soins_visage',
    imageUrl: '/products/serum-acide-hyaluronique.jpg'
  },
  {
    id: 'huiles-essentielles',
    title: 'Huiles Essentielles',
    subtitle: '100% BIO',
    categoryKey: 'aromatherapie',
    imageUrl: '/products/huile-essentielle-tea-tree-bio.jpg'
  },
  {
    id: 'huiles-vegetales',
    title: 'Huiles Végétales',
    subtitle: 'Pression à froid',
    categoryKey: 'huiles_vegetales',
    imageUrl: '/products/huile-vegetale-jojoba-bio.jpg'
  },
  {
    id: 'bases-diy',
    title: 'Bases & DIY',
    subtitle: 'Personnalisables',
    categoryKey: 'diy_bases',
    imageUrl: '/products/creme-neutre-desalterante-bio.jpg'
  },
  {
    id: 'soins-cheveux',
    title: 'Soins Cheveux',
    subtitle: 'Sans sulfate',
    categoryKey: 'cheveux',
    imageUrl: '/products/shampoing-solide-spiruline-bio.jpg'
  },
  {
    id: 'hydrolats-bio',
    title: 'Hydrolats BIO',
    subtitle: 'Eaux florales',
    categoryKey: 'hydrolats',
    imageUrl: '/products/hydrolat-rose-damas-bio.jpg'
  },
  {
    id: 'collagene-sante',
    title: 'Collagène & Santé',
    subtitle: 'Nouveau',
    categoryKey: 'complements',
    imageUrl: '/products/collagene-marin-vitamine-c.jpg'
  },
  {
    id: 'beurres-corps',
    title: 'Beurres & Corps',
    subtitle: 'Karité pur',
    categoryKey: 'corps_bain',
    imageUrl: '/products/beurre-karite-brut-bio.jpg'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'serum-acide-hyaluronique-35',
    title: 'Sérum concentré Acide Hyaluronique 3,5%',
    subtitle: '100% d\'origine naturelle • Multi-poids moléculaire',
    category: 'soins_visage',
    categoryLabel: 'Soins Visage & Sérums',
    price: 5.95,
    originalPrice: 7.50,
    rating: 4.8,
    reviewCount: 32853,
    badge: 'N°1 VENTES TUNISIE',
    isBestSeller: true,
    isOrganic: true,
    isTunisianOrigin: true,
    imageUrl: '/products/serum-acide-hyaluronique.jpg',
    description: 'Le sérum culte MiHerborista ! Formulé à base de 3,5% d\'acide hyaluronique pur d’origine végétale, ce sérum offre une hydratation sans égale. Sa texture gel fraîche pénètre instantanément sans pelucher ni coller. Convient à tous les types de peaux, y compris sensibles.',
    ingredients: [
      'Acide Hyaluronique Pur Végétal 3,5%',
      'Extrait d’Écorce de Saule Noir',
      'Glycérine Végétale Bio'
    ],
    volumeOrSize: 'Flacon verre ambré 30 ml',
    benefits: [
      'Pénètre en profondeur pour repulper la matrice cutanée',
      'Atténue les ridules de déshydratation dès les premières applications',
      'Peut être utilisé pur ou personnalisé avec des actifs et huiles essentielles',
      'Idéal également en soin lissant et hydratant sur les pointes de cheveux'
    ],
    howToUse: 'Appliquer 2 à 3 gouttes matin et/ou soir sur le visage et le cou préalablement nettoyés, avant votre crème ou huile végétale.'
  },
  {
    id: 'serum-niacinamide-cuivre-zinc',
    title: 'Sérum Niacinamide 10%, Cuivre & Zinc',
    subtitle: 'Régulateur de sébum, anti-imperfections et resserre les pores',
    category: 'soins_visage',
    categoryLabel: 'Soins Visage & Sérums',
    price: 6.95,
    rating: 4.7,
    reviewCount: 8037,
    badge: 'ANTI-IMPERFECTIONS',
    isBestSeller: true,
    isOrganic: true,
    isTunisianOrigin: true,
    imageUrl: '/products/serum-niacinamide-cuivre-zinc.jpg',
    description: 'Une synergie surpuissante de Niacinamide (Vitamine B3) à 10%, de Zinc PCA et de Cuivre pour purifier et apaiser les peaux mixtes à grasses ou sujettes aux imperfections. Il régule les brillances et estompe les taches pigmentaires.',
    ingredients: [
      'Niacinamide 10% (Vitamine B3)',
      'Zinc PCA & Cuivre PCA',
      'Acide Hyaluronique Pur'
    ],
    volumeOrSize: 'Flacon verre ambré 30 ml',
    benefits: [
      'Resserre visiblement les pores dilatés',
      'Prévient l’apparition des comédons et imperfections',
      'Atténue les marques post-acnéiques et rougeurs diffuses',
      'Enrichi en acide hyaluronique pour préserver l’hydratation'
    ],
    howToUse: 'Appliquez quelques gouttes matin et soir sur l’ensemble du visage ou localement sur la zone T avant votre crème de jour.'
  },
  {
    id: 'serum-vitamine-c-astaxanthine',
    title: 'Sérum Vitamine C 10% & Astaxanthine',
    subtitle: 'Booster d’éclat, bouclier antioxydant et unifiant anti-taches',
    category: 'soins_visage',
    categoryLabel: 'Soins Visage & Sérums',
    price: 7.95,
    rating: 4.8,
    reviewCount: 5410,
    badge: 'BOOSTER D\'ÉCLAT',
    isBestSeller: true,
    isOrganic: true,
    isTunisianOrigin: true,
    imageUrl: '/products/serum-vitamine-c-astaxanthine.jpg',
    description: 'Grâce à 10% de Vitamine C stabilisée et à l’Astaxanthine (le plus puissant antioxydant marin naturel), ce sérum offre un teint radieux et unifié dès 14 jours.',
    ingredients: [
      'Vitamine C 10% stabilisée',
      'Astaxanthine marine antioxydante',
      'Acide Hyaluronique Végétal'
    ],
    volumeOrSize: 'Flacon verre ambré 30 ml',
    benefits: [
      'Booste l’éclat naturel et dissipe la grisaille du teint',
      'Réduit l’intensité des taches brunes et prévient leur réapparition',
      'Protège les cellules cutanées contre les radicaux libres et la pollution'
    ],
    howToUse: 'Idéal le matin sur peau propre pour une protection antioxydante tout au long de la journée.'
  },
  {
    id: 'serum-retinol-like-vegetal',
    title: 'Sérum Rétinol-like végétal 1% (Bakuchiol)',
    subtitle: 'Alternative naturelle douce au Rétinol • Bakuchiol pur',
    category: 'soins_visage',
    categoryLabel: 'Soins Visage & Sérums',
    price: 7.90,
    rating: 4.7,
    reviewCount: 3912,
    badge: 'ANTI-ÂGE CULTE',
    isBestSeller: true,
    isOrganic: true,
    isTunisianOrigin: true,
    imageUrl: '/products/serum-retinol-like-vegetal.jpg',
    description: 'Une efficacité comparable au rétinol conventionnel mais sans ses effets secondaires (irritations, desquamation, photosensibilisation). Convient même aux peaux les plus réactives.',
    ingredients: [
      'Bakuchiol Pur 1%',
      'Extrait de Vigna Aconitifolia',
      'Huile de Squalane Végétale'
    ],
    volumeOrSize: 'Flacon verre ambré 30 ml',
    benefits: [
      'Stimule le renouvellement cellulaire et la synthèse de collagène',
      'Estompe les ridules d’expression et raffermit l’ovale du visage',
      'Tolérance optimale sans rougeurs ni desquamation'
    ],
    howToUse: 'Appliquer 3 à 4 gouttes le soir sur le visage et le cou parfaitement nettoyés.'
  },
  {
    id: 'huile-vegetale-jojoba-bio',
    title: 'Huile Végétale de Jojoba BIO',
    subtitle: 'Pression à froid • Équilibrante & Régulatrice de sébum',
    category: 'huiles_vegetales',
    categoryLabel: 'Huiles Végétales Pures',
    price: 6.50,
    rating: 4.9,
    reviewCount: 18240,
    badge: '100% PURE & BIO',
    isBestSeller: true,
    isOrganic: true,
    isTunisianOrigin: true,
    imageUrl: '/products/huile-vegetale-jojoba-bio.jpg',
    description: 'Connue sous le nom d’Or du Désert, cette huile végétale d’une composition très proche du sébum humain pénètre sans laisser de film gras. Elle rééquilibre les peaux mixtes et fortifie le cuir chevelu.',
    ingredients: [
      'Simmondsia chinensis seed oil 100% pure et biologique'
    ],
    volumeOrSize: 'Flacon verre ambré 100 ml',
    benefits: [
      'Régule l’excès de sébum des peaux grasses et mixtes',
      'Nourrit et protège la peau de la déshydratation',
      'Soin rééquilibrant idéal pour le cuir chevelu'
    ],
    howToUse: 'Appliquer pure en massage visage le soir ou mélangée à votre soin hydratant quotidien.'
  },
  {
    id: 'huile-vegetale-ricin-bio',
    title: 'Huile Végétale de Ricin BIO',
    subtitle: 'Fortifiante cils, sourcils, ongles et pousse de cheveux',
    category: 'huiles_vegetales',
    categoryLabel: 'Huiles Végétales Pures',
    price: 5.80,
    rating: 4.9,
    reviewCount: 22100,
    badge: 'FORTIFIANT CILS & CHEVEUX',
    isBestSeller: true,
    isOrganic: true,
    isTunisianOrigin: true,
    imageUrl: '/products/huile-vegetale-ricin-bio.jpg',
    description: 'Une huile très visqueuse et nourrissante riche en acide ricinoléique, reconnue depuis l’Antiquité pour stimuler la pousse des cheveux, renforcer les ongles cassants et densifier cils et sourcils.',
    ingredients: [
      'Ricinus communis seed oil 100% biologique'
    ],
    volumeOrSize: 'Flacon ambré 100 ml',
    benefits: [
      'Gaine et fortifie la fibre capillaire',
      'Densifie les cils et sourcils fins',
      'Fortifie les ongles dédoublés'
    ],
    howToUse: 'En bain d’huile capillaire avant le shampoing ou appliquée au goupillon sur cils et sourcils le soir.'
  },
  {
    id: 'huile-essentielle-tea-tree-bio',
    title: 'Huile Essentielle de Arbre à Thé (Tea Tree) BIO',
    subtitle: 'Purifiante, assainissante et anti-imperfections',
    category: 'aromatherapie',
    categoryLabel: 'Huiles Essentielles BIO',
    price: 4.90,
    rating: 4.9,
    reviewCount: 28910,
    badge: 'PURIFIANT ULTIME',
    isBestSeller: true,
    isOrganic: true,
    isTunisianOrigin: false,
    imageUrl: '/products/huile-essentielle-tea-tree-bio.jpg',
    description: 'L’incontournable de la trousse aromatique ! Distillée à partir des feuilles d’Melaleuca alternifolia, cette huile essentielle est réputée pour ses vertus purifiantes et assainissantes intenses.',
    ingredients: [
      'Melaleuca alternifolia leaf oil* (100% pure et chémotypée)'
    ],
    volumeOrSize: 'Flacon compte-gouttes 10 ml',
    benefits: [
      'Assainit cibler les petites imperfections et boutons',
      'Purifie le cuir chevelu sujet aux pellicules',
      'Incontournable en hygiène naturelle'
    ],
    howToUse: '1 goutte localement sur le bouton à l’aide d’un coton-tige ou diluée dans votre dose de gel nettoyant.'
  },
  {
    id: 'huile-essentielle-ravintsara-bio',
    title: 'Huile Essentielle de Ravintsara BIO',
    subtitle: 'Immunité, tonique hivernal & assainissant d’air',
    category: 'aromatherapie',
    categoryLabel: 'Huiles Essentielles BIO',
    price: 5.90,
    rating: 4.8,
    reviewCount: 15420,
    badge: 'BOUCLIER HIVERNAL',
    isBestSeller: false,
    isOrganic: true,
    isTunisianOrigin: false,
    imageUrl: '/products/huile-essentielle-ravintsara-bio.jpg',
    description: 'Distillée à Madagascar, l’huile essentielle de Ravintsara est reconnue pour ses propriétés stimulantes d’immunité et son parfum frais et camphré très réconfortant.',
    ingredients: [
      'Cinnamomum camphora leaf oil* (100% biologique)'
    ],
    volumeOrSize: 'Flacon 10 ml',
    benefits: [
      'Soutient les défenses naturelles pendant l’hiver',
      'Purifie l’air ambiant en diffusion',
      'Procure une sensation de fraîcheur respiratoire'
    ],
    howToUse: 'En diffusion atmosphérique ou 2 gouttes diluées dans une huile végétale en massage sur le thorax.'
  },
  {
    id: 'hydrolat-rose-damas-bio',
    title: 'Hydrolat de Rose de Damas BIO',
    subtitle: 'Distillation vapeur • Tonifiant anti-âge & apaisant',
    category: 'hydrolats',
    categoryLabel: 'Hydrolats & Eaux Florales',
    price: 5.20,
    rating: 4.9,
    reviewCount: 9780,
    badge: 'PARFUM DIVIN',
    isBestSeller: true,
    isOrganic: true,
    isTunisianOrigin: false,
    imageUrl: '/products/hydrolat-rose-damas-bio.jpg',
    description: 'Véritable trésor de beauté, cette eau florale de rose tonifie, resserre le grain de peau et prévient le vieillissement cutané tout en enveloppant vos sens de son parfum envoûtant.',
    ingredients: [
      'Rosa damascena flower water 100% pure et biologique'
    ],
    volumeOrSize: 'Flacon spray 200 ml',
    benefits: [
      'Neutralise le calcaire de l’eau après le nettoyage',
      'Apaise les rougeurs des peaux délicates',
      'Procure un coup d’éclat instantané le matin'
    ],
    howToUse: 'Vaporiser sur le visage propre avant d’appliquer votre sérum sur peau encore légèrement humide.'
  },
  {
    id: 'beurre-karite-brut-bio',
    title: 'Beurre de Karité brut sauvage BIO',
    subtitle: 'Non raffiné, artisanal et équitable • Qualité supérieure',
    category: 'corps_bain',
    categoryLabel: 'Corps, Bain & Beurres',
    price: 4.50,
    rating: 4.8,
    reviewCount: 14890,
    badge: 'COMMERCE ÉQUITABLE',
    isBestSeller: false,
    isOrganic: true,
    isTunisianOrigin: false,
    imageUrl: '/products/beurre-karite-brut-bio.jpg',
    description: 'Issu d’une récolte sauvage et d’une pression mécanique traditionnelle, ce beurre de karité préserve l’intégralité de ses vitamines A, D, E et insaponifiables protecteurs.',
    ingredients: [
      'Butyrospermum parkii butter* (100% brut non raffiné)'
    ],
    volumeOrSize: 'Pot 100 ml',
    benefits: [
      'Répare les gerçures et peaux très sèches',
      'Protège les lèvres et le nez des agressions climatiques',
      'Base incontournable pour réaliser des chantillys de karité DIY'
    ],
    howToUse: 'Faire fondre une noisette dans le creux des mains avant d’appliquer par massages généreux.'
  },
  {
    id: 'shampoing-solide-spiruline-bio',
    title: 'Shampoing solide fortifiant à la Spiruline BIO',
    subtitle: 'Sans sulfates • Équivaut à 2 flacons de 200 ml',
    category: 'cheveux',
    categoryLabel: 'Soins Cheveux & Solides',
    price: 5.50,
    rating: 4.7,
    reviewCount: 7420,
    badge: 'ZÉRO PLASTIQUE',
    isBestSeller: false,
    isOrganic: true,
    isTunisianOrigin: true,
    imageUrl: '/products/shampoing-solide-spiruline-bio.jpg',
    description: 'Formulé sans tensioactifs sulfatés agressifs, ce galet enrichi en spiruline revitalisante et huile de ricin fortifie la fibre capillaire tout en moussant généreusement.',
    ingredients: [
      'Spirulina platensis powder*',
      'Ricinus communis seed oil*',
      'Sodium cocoyl isethionate'
    ],
    volumeOrSize: 'Galet solide 85 g',
    benefits: [
      'Mousse dense et soyeuse très facile à rincer',
      'Idéal en voyage et zéro déchet',
      'Espace les lavages en régulant le sébum'
    ],
    howToUse: 'Frotter directement le galet sur cheveux bien mouillés pour faire mousser, masser le cuir chevelu puis rincer.'
  },
  {
    id: 'poudre-shikakai-bio',
    title: 'Poudre de Shikakaï BIO cheveux',
    subtitle: 'Shampoing végétal traditionnel ayurvédique • 100% pure',
    category: 'cheveux',
    categoryLabel: 'Poudres Ayurvédiques Cheveux',
    price: 3.95,
    rating: 4.8,
    reviewCount: 11840,
    badge: 'RITUEL AYURVÉDA',
    isBestSeller: false,
    isOrganic: true,
    isTunisianOrigin: false,
    imageUrl: '/products/poudre-shikakai-bio.jpg',
    description: 'Riche en saponines végétales, le Shikakaï nettoie le cuir chevelu en douceur sans décaper le film hydrolipidique naturel. Il facilite le démêlage et rend les cheveux brillants.',
    ingredients: [
      'Acacia concinna fruit powder* 100% pure'
    ],
    volumeOrSize: 'Sachet 250 g',
    benefits: [
      'Remplace le shampoing liquide conventionnel',
      'Lutte contre les démangeaisons du cuir chevelu',
      'Apporte brillance miroir et volume soyeux'
    ],
    howToUse: 'Mélanger la poudre avec de l’eau chaude jusqu’à obtenir une pâte onctueuse. Appliquer sur cuir chevelu mouillé, masser et rincer.'
  },
  {
    id: 'creme-neutre-desalterante-bio',
    title: 'Crème neutre désaltérante BIO',
    subtitle: 'Visage & Corps • Base personnalisable universelle',
    category: 'diy_bases',
    categoryLabel: 'Bases & Accessoires DIY',
    price: 6.90,
    rating: 4.8,
    reviewCount: 10520,
    badge: 'BASE DIY UNIVERSELLE',
    isBestSeller: false,
    isOrganic: true,
    isTunisianOrigin: true,
    imageUrl: '/products/creme-neutre-desalterante-bio.jpg',
    description: 'Cette émulsion universelle hydratante et matifiante s’adapte à toutes les envies. Utilisez-la pure comme soin visage quotidien ou personnalisez-la en y incorporant vos huiles essentielles et actifs préférés.',
    ingredients: [
      'Aloe barbadensis leaf juice*',
      'Simmondsia chinensis seed oil*',
      'Glycérine Végétale'
    ],
    volumeOrSize: 'Pot 100 ml',
    benefits: [
      'Hydrate durablement sans sensation collante ni fini brillant',
      'Accueille jusqu’à 5% d’actifs sans déphasage',
      'Convient à toute la famille et aux femmes enceintes'
    ],
    howToUse: 'Appliquer matin et soir sur le visage et le cou. Pour personnaliser : ajouter directement les gouttes d’actifs dans le pot.'
  },
  {
    id: 'collagene-marin-vitamine-c',
    title: 'Collagène marin hydrolysé & Vitamine C',
    subtitle: 'Peptides de collagène bio-actifs hautement assimilables (Naticol®)',
    category: 'complements',
    categoryLabel: 'Compléments & Santé',
    price: 13.90,
    rating: 4.8,
    reviewCount: 6720,
    badge: 'EFFICACITÉ CLINIQUE',
    isBestSeller: false,
    isOrganic: false,
    isTunisianOrigin: true,
    imageUrl: '/products/collagene-marin-vitamine-c.jpg',
    description: 'Une poudre de peptides de collagène marin purifiée issue de la pêche durable. Complétée par de la Vitamine C pour booster la synthèse endogène de collagène.',
    ingredients: [
      'Hydrolysat de collagène de poisson (Naticol®)',
      'Vitamine C (Acide ascorbique)'
    ],
    volumeOrSize: 'Poudre 200 g',
    benefits: [
      'Améliore la fermeté et l’élasticité de la peau en 8 semaines',
      'Hydrate la peau de l’intérieur et atténue les rides',
      'Se dissout instantanément dans un café, thé ou verre d’eau'
    ],
    howToUse: '1 cuillère doseuse (5 g à 10 g) par jour à diluer dans la boisson chaude ou froide de votre choix.'
  }
];

export const HERO_FEATURED_PRODUCT = INITIAL_PRODUCTS[0];

export const INITIAL_RECIPES: RecipeTutorial[] = [
  {
    id: 'serum-anti-imperfections-maison',
    title: 'Sérum Purifiant Niacinamide & Arbre à Thé',
    category: 'Soin Visage DIY',
    summary: 'Une formule ultra-fraîche pour lisser le grain de peau, resserrer les pores et neutraliser les petites imperfections.',
    prepTimeMinutes: 5,
    difficulty: 'Facile',
    imageUrl: '/products/serum-niacinamide-cuivre-zinc.jpg',
    ingredients: [
      { name: 'Sérum Acide Hyaluronique 3,5%', amount: '25 ml' },
      { name: 'Huile Essentielle Arbre à Thé (Tea Tree) Bio', amount: '4 gouttes' },
      { name: 'Hydrolat de Rose de Damas Bio', amount: '5 ml' }
    ],
    steps: [
      'Dans un flacon en verre ambré désinfecté, versez le Sérum Acide Hyaluronique.',
      'Ajoutez les gouttes d’Huile Essentielle de Tea Tree et l’Hydrolat de Rose.',
      'Refermez la pipette et agitez énergiquement pendant 30 secondes.',
      'Appliquez 3 gouttes le soir sur peau propre.'
    ],
    benefits: ['Resserre les pores', 'Matifie le teint', 'Effet fraîcheur immédiat']
  },
  {
    id: 'bain-huile-pousse-cheveux',
    title: 'Bain d’Huile Fortifiant Ricin & Jojoba',
    category: 'Soin Capillaire',
    summary: 'Le rituel magique pour densifier la chevelure, fortifier le cuir chevelu et stimuler la pousse rapide.',
    prepTimeMinutes: 5,
    difficulty: 'Très Facile',
    imageUrl: '/products/huile-vegetale-ricin-bio.jpg',
    ingredients: [
      { name: 'Huile Végétale de Ricin Bio', amount: '2 cuillères à soupe' },
      { name: 'Huile Végétale de Jojoba Bio', amount: '2 cuillères à soupe' }
    ],
    steps: [
      'Mélangez à parts égales l’huile de Ricin et l’huile de Jojoba dans un bol.',
      'Chauffez légèrement le mélange entre les paumes de vos mains.',
      'Massez le cuir chevelu par mouvements circulaires pendant 5 minutes.',
      'Laissez poser 30 minutes avant votre shampoing solide à la spiruline.'
    ]
  }
];
