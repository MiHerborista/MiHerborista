import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Sparkles, Star, ShieldCheck, Heart } from 'lucide-react';
import { ProductCategory } from '../../types';

interface MegaMenuProps {
  isOpen: boolean;
  activeHoverCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory, subFilter?: string) => void;
  onClose: () => void;
}

export interface MegaCategoryDetails {
  key: ProductCategory;
  title: string;
  subtitle: string;
  seeAllText: string;
  columns: {
    header: string;
    items: { label: string; badge?: string; query?: string }[];
  }[];
  promoCard: {
    badge: string;
    title: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    categoryKey: ProductCategory;
    queryFilter?: string;
  };
}

export const MegaMenuData: Record<string, MegaCategoryDetails> = {
  soins_visage: {
    key: 'soins_visage',
    title: 'Soins visage',
    subtitle: 'Soins naturels experts, sérums ultra-concentrés et actifs purs pour révéler l’éclat de votre peau.',
    seeAllText: 'Voir tout Soins visage',
    columns: [
      {
        header: 'PAR TYPE DE PRODUIT',
        items: [
          { label: 'Sérums concentrés', badge: 'Culte', query: 'Sérum' },
          { label: 'Crèmes de jour & Fluides neutres', query: 'Crème' },
          { label: 'Huiles végétales & Élixirs précieux', query: 'Huile' },
          { label: 'Nettoyants doux & Démaquillants', query: 'Nettoyant' },
          { label: 'Hydrolats & Eaux florales BIO', query: 'Hydrolat' },
          { label: 'Contour des yeux & Soins lèvres', query: 'Yeux' },
          { label: 'Masques & Gommages éclat', query: 'Masque' }
        ]
      },
      {
        header: 'PAR PRÉOCCUPATION DE PEAU',
        items: [
          { label: 'Anti-âge, rides & fermeté', query: 'anti-âge' },
          { label: 'Imperfections, boutons & pores dilatés', query: 'imperfections' },
          { label: 'Hydratation intense & peau sèche', query: 'hydratation' },
          { label: 'Éclat du teint & anti-taches brunes', query: 'éclat' },
          { label: 'Rougeurs, tiraillements & peaux sensibles', query: 'apaisant' }
        ]
      },
      {
        header: 'ACTIFS STARS DU LABORATOIRE',
        items: [
          { label: 'Acide Hyaluronique 3.5%', query: 'Acide Hyaluronique' },
          { label: 'Niacinamide 10% & Cuivre', query: 'Niacinamide' },
          { label: 'Vitamine C 10% stabilisée', query: 'Vitamine C' },
          { label: 'Rétinol-like 100% végétal', query: 'Rétinol' },
          { label: 'Acide Glycolique AHA 10%', query: 'AHA' }
        ]
      }
    ],
    promoCard: {
      badge: 'SÉLECTION DU MOMENT',
      title: 'Les Essentiels Soins visage',
      description: 'Formules épurées, testées sous contrôle dermatologique et au juste prix.',
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      buttonText: 'Découvrir la gamme',
      categoryKey: 'soins_visage'
    }
  },
  cheveux: {
    key: 'cheveux',
    title: 'Soins des cheveux',
    subtitle: 'Bains d’huiles fortifiants, shampoings solides et poudres ayurvédiques pour des cheveux éclatants.',
    seeAllText: 'Voir tout Cheveux',
    columns: [
      {
        header: 'PAR TYPE DE PRODUIT',
        items: [
          { label: 'Bains d’huiles & Élixirs pousse', badge: 'Populaire', query: 'Bain d\'huile' },
          { label: 'Shampoings solides & Doux', query: 'Shampoing' },
          { label: 'Poudres lavantes & Ayurvédiques', query: 'Poudre' },
          { label: 'Eaux de rinçage & Hydrolats', query: 'Hydrolat' },
          { label: 'Masques & Baumes capillaires', query: 'Masque' }
        ]
      },
      {
        header: 'PAR BESOIN CAPILLAIRE',
        items: [
          { label: 'Chute de cheveux & Pousse stimulée', query: 'Pousse' },
          { label: 'Cuir chevelu sensible & Pellicules', query: 'Cuir chevelu' },
          { label: 'Cheveux secs, ternes & Cassants', query: 'Secs' },
          { label: 'Cheveux bouclés, texturés & Frisés', query: 'Bouclés' }
        ]
      },
      {
        header: 'INGRÉDIENTS STARS',
        items: [
          { label: 'Huile de Ricin BIO', query: 'Ricin' },
          { label: 'Poudre de Bhringraj & Amla', query: 'Amla' },
          { label: 'Phyto-kératine Végétale', query: 'Kératine' },
          { label: 'Huile d’Argan de Tunisie', query: 'Argan' },
          { label: 'Protéines de Soie', query: 'Protéines' }
        ]
      }
    ],
    promoCard: {
      badge: 'RITUEL FORTIFIANT',
      title: 'Elixir Pousse Botanique',
      description: 'Synergie d’huile de ricin et de nigelle tunisienne pour stimuler le cuir chevelu.',
      imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
      buttonText: 'Voir le soin capillaire',
      categoryKey: 'cheveux',
      queryFilter: 'Pousse'
    }
  },
  aromatherapie: {
    key: 'aromatherapie',
    title: 'Aromathérapie & Huiles Essentielles',
    subtitle: 'Huiles essentielles pures et chémotypées, diffusions et synergies botaniques relaxantes.',
    seeAllText: 'Voir tout Aromathérapie',
    columns: [
      {
        header: 'PAR TYPE DE PRODUIT',
        items: [
          { label: 'Huiles Essentielles Pures', badge: '100% BIO', query: 'Huile Essentielle' },
          { label: 'Synergies pour Diffuseur', query: 'Diffusion' },
          { label: 'Roll-on Nomades aux Huiles', query: 'Roll-on' },
          { label: 'Hydrolats & Eaux AROMATIQUES', query: 'Hydrolat' }
        ]
      },
      {
        header: 'OBJECTIF BIEN-ÊTRE',
        items: [
          { label: 'Sommeil réparateur & Anti-stress', query: 'Sommeil' },
          { label: 'Voies respiratoires & Vitalité hiver', query: 'Respiratoire' },
          { label: 'Focus & Concentration', query: 'Focus' },
          { label: 'Digestion légère & Apaisement', query: 'Digestion' }
        ]
      },
      {
        header: 'HUILES INCONTOURNABLES',
        items: [
          { label: 'Lavande Vraie BIO', query: 'Lavande' },
          { label: 'Arbre à Thé (Tea Tree)', query: 'Tea Tree' },
          { label: 'Ravintsara BIO', query: 'Ravintsara' },
          { label: 'Menthe Poivrée', query: 'Menthe' },
          { label: 'Eucalyptus Radiata', query: 'Eucalyptus' }
        ]
      }
    ],
    promoCard: {
      badge: 'BIEN-ÊTRE AU NATUREL',
      title: 'Kit Synergie Sérénité',
      description: 'L’alliance apaisante de la lavande vraie et de la camomille romaine.',
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
      buttonText: 'Découvrir les Huiles',
      categoryKey: 'aromatherapie'
    }
  },
  diy_ingredients: {
    key: 'diy_ingredients',
    title: 'DIY & Ingrédients Cosmétiques',
    subtitle: 'Bases neutres, huiles végétales pures et actifs concentrés pour fabriquer vos soins sur-mesure.',
    seeAllText: 'Voir tout DIY & Ingrédients',
    columns: [
      {
        header: 'CATÉGORIES D’INGRÉDIENTS',
        items: [
          { label: 'Huiles végétales vierges', query: 'Huile' },
          { label: 'Beurres végétaux bruts', query: 'Beurre' },
          { label: 'Actifs & Vitamines pure', badge: 'Sur-mesure', query: 'Acide' },
          { label: 'Émulsifiants & Épaississants', query: 'Cire' },
          { label: 'Flaconnages & Accessoires DIY', query: 'DIY' }
        ]
      },
      {
        header: 'PAR PROJET COSMÉTIQUE',
        items: [
          { label: 'Sérum visage sur-mesure', query: 'Sérum' },
          { label: 'Baume à lèvres & Corps', query: 'Baume' },
          { label: 'Shampoing maison solide', query: 'Shampoing' },
          { label: 'Masque à l’argile personnalisée', query: 'Masque' }
        ]
      },
      {
        header: 'BASES NEUTRES STAR',
        items: [
          { label: 'Beurre de Karité Brut BIO', query: 'Karité' },
          { label: 'Gel d’Aloe Vera Pur 99%', query: 'Aloe Vera' },
          { label: 'Acide Hyaluronique en poudre', query: 'Acide Hyaluronique' },
          { label: 'Conservateur Cosgard', query: 'DIY' }
        ]
      }
    ],
    promoCard: {
      badge: 'ATELIER DIY',
      title: 'Créez votre Sérum Pores & Éclat',
      description: 'Combinez notre base neutre avec la Niacinamide 10% et l’hydrolat de rose.',
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      buttonText: 'Voir tous les ingrédients',
      categoryKey: 'diy_ingredients'
    }
  },
  corps_bain: {
    key: 'corps_bain',
    title: 'Corps & Bain',
    subtitle: 'Savons saponifiés à froid, huiles de massage et baumes nourrissants inspirés du rituel méditerranéen.',
    seeAllText: 'Voir tout Corps & Bain',
    columns: [
      {
        header: 'TYPE DE SOIN',
        items: [
          { label: 'Savons artisanaux à froid', badge: 'Artisanal', query: 'Savon' },
          { label: 'Gommages au sel & Sucre', query: 'Gommage' },
          { label: 'Huiles de massage tonifiantes', query: 'Massage' },
          { label: 'Baumes & Beurres corporels', query: 'Baume' }
        ]
      },
      {
        header: 'RITUELS PARFUMÉS',
        items: [
          { label: 'Rituel Hammam & Fleur d’Oranger', query: 'Fleur d\'Oranger' },
          { label: 'Soin Peau de Soie à l’Argan', query: 'Argan' },
          { label: 'Soin Apaisant à l’Amande Douce', query: 'Amande' }
        ]
      },
      {
        header: 'ACTIFS PROTECTEURS',
        items: [
          { label: 'Huile d’Olive de Tunisie', query: 'Olive' },
          { label: 'Savon Noir au Eucalyptus', query: 'Savon' },
          { label: 'Beurre de Cacao Pur', query: 'Cacao' }
        ]
      }
    ],
    promoCard: {
      badge: 'RITUEL MEDITERRANÉEN',
      title: 'Coffret Hammam Authentique',
      description: 'Savon noir traditionnel, gant kessa et huile parfumée à la fleur d’oranger.',
      imageUrl: 'https://images.unsplash.com/photo-1600428877878-1a0fd85beda8?auto=format&fit=crop&w=600&q=80',
      buttonText: 'Découvrir le coffret',
      categoryKey: 'corps_bain'
    }
  },
  complements_sante: {
    key: 'complements_sante',
    title: 'Compléments & Santé',
    subtitle: 'Gélules botaniques, tisanes médicinales et poudres de superaliments pour nourrir votre santé.',
    seeAllText: 'Voir tout Compléments & Santé',
    columns: [
      {
        header: 'GAMME SANTE',
        items: [
          { label: 'Gélules & Extraits de plantes', query: 'Complément' },
          { label: 'Tisanes & Infusions BIO', badge: 'BIO', query: 'Infusion' },
          { label: 'Superaliments & Poudres', query: 'Poudre' },
          { label: 'Miels médicinaux & Gelée Royale', query: 'Miel' }
        ]
      },
      {
        header: 'OBJECTIFS ORGANISME',
        items: [
          { label: 'Vitalité, Énergie & Immunité', query: 'Immunité' },
          { label: 'Détox & Confort digestif', query: 'Détox' },
          { label: 'Stress & Équilibre nerveux', query: 'Sommeil' },
          { label: 'Beauté Peau & Cheveux', query: 'Peau' }
        ]
      },
      {
        header: 'SUPER-INGRÉDIENTS',
        items: [
          { label: 'Spiruline Purifiée', query: 'Spiruline' },
          { label: 'Zinc & Cuivre Chélaté', query: 'Zinc' },
          { label: 'Ashwagandha BIO', query: 'Ashwagandha' },
          { label: 'Chardon-Marie Détox', query: 'Chardon' }
        ]
      }
    ],
    promoCard: {
      badge: 'CURE BIEN-ÊTRE',
      title: 'Cure Éclat Peau & Cheveux',
      description: 'Complexes botaniques concentrés pour renforcer les cheveux et illuminer le teint.',
      imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80',
      buttonText: 'Voir les cures',
      categoryKey: 'complements_sante'
    }
  },
  maison_ecologie: {
    key: 'maison_ecologie',
    title: 'Maison & Écologie',
    subtitle: 'Sprays d’ambiance aux huiles essentielles, bougies naturelles et entretien zéro déchet.',
    seeAllText: 'Voir tout Maison & Écologie',
    columns: [
      {
        header: 'UNIVERS MAISON',
        items: [
          { label: 'Sprays d’ambiance botaniques', query: 'Spray' },
          { label: 'Bougies artisanales en cire végétale', badge: 'Fait main', query: 'Bougie' },
          { label: 'Solides ménagers zéro déchet', query: 'Maison' },
          { label: 'Diffuseurs à bâtonnets', query: 'Diffuseur' }
        ]
      },
      {
        header: 'ATMOSPHÈRES',
        items: [
          { label: 'Purification de l’air intérieur', query: 'Purifiant' },
          { label: 'Ambiance cocooning & Relaxante', query: 'Relax' },
          { label: 'Fraîcheur d’Agrumes & Verveine', query: 'Citron' }
        ]
      },
      {
        header: 'COMPOSANTS BIO',
        items: [
          { label: 'Cire de Soja 100% Végétale', query: 'Cire' },
          { label: 'Huile Essentielle de Citron', query: 'Citron' },
          { label: 'Bicarbonate Ultrafin', query: 'Bicarbonate' }
        ]
      }
    ],
    promoCard: {
      badge: 'ZÉRO DÉCHET',
      title: 'Maison Saine & Naturelle',
      description: 'Purifiez votre intérieur avec nos sprays bio aux huiles essentielles d’eucalyptus et lavande.',
      imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
      buttonText: 'Découvrir la gamme Maison',
      categoryKey: 'maison_ecologie'
    }
  }
};

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  activeHoverCategory,
  onSelectCategory,
  onClose
}) => {
  // Default to 'soins_visage' if 'tous' is hovered or if active key not found
  const categoryKey = (activeHoverCategory === 'tous' || !MegaMenuData[activeHoverCategory]) 
    ? 'soins_visage' 
    : activeHoverCategory;

  const currentData = MegaMenuData[categoryKey] || MegaMenuData.soins_visage;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed Backdrop anchored right below navigation bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 h-[150vh] bg-stone-900/25 backdrop-blur-[2px] z-30 cursor-pointer"
            onClick={onClose}
          />

          {/* Mega Menu Dropdown Container */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 w-full bg-white border-b border-stone-200 shadow-xl z-40 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              
              {/* Category Header Row */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0f291e] tracking-tight">
                    {currentData.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-3xl leading-relaxed">
                    {currentData.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onSelectCategory(currentData.key);
                    onClose();
                  }}
                  className="group inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-800 hover:text-[#0f291e] transition-colors cursor-pointer shrink-0 ml-4"
                >
                  <span className="border-b border-stone-300 group-hover:border-[#0f291e] pb-0.5">
                    {currentData.seeAllText}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Grid: 3 Subcategory Columns + 1 Promo Card */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                
                {/* Columns 1 to 3 */}
                {currentData.columns.map((col, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                      {col.header}
                    </h4>
                    <ul className="space-y-2">
                      {col.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <button
                            onClick={() => {
                              onSelectCategory(currentData.key, item.query || item.label);
                              onClose();
                            }}
                            className="group flex items-center text-xs text-stone-700 hover:text-[#0f291e] hover:font-semibold transition-all text-left w-full py-0.5 cursor-pointer"
                          >
                            <span className="group-hover:translate-x-1 transition-transform inline-block">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="ml-2 px-2 py-0.5 text-[9px] font-bold bg-stone-200/80 text-stone-700 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Column 4: Selection du Moment Featured Card */}
                <div className="bg-[#f8f6f0] p-5 rounded-2xl border border-stone-200/80 flex flex-col justify-between h-full">
                  <div>
                    <span className="inline-block uppercase tracking-widest text-[9px] font-extrabold text-[#0f291e] bg-stone-200/60 px-2.5 py-1 rounded-full mb-3">
                      {currentData.promoCard.badge}
                    </span>
                    <h4 className="font-bold text-[#0f291e] text-base mb-1">
                      {currentData.promoCard.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {currentData.promoCard.description}
                    </p>
                    <div className="relative rounded-xl overflow-hidden mb-4 aspect-4/3 bg-stone-200">
                      <img
                        src={currentData.promoCard.imageUrl}
                        alt={currentData.promoCard.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCategory(currentData.promoCard.categoryKey, currentData.promoCard.queryFilter);
                      onClose();
                    }}
                    className="w-full py-2.5 bg-[#0f291e] hover:bg-emerald-900 text-stone-50 text-xs font-bold rounded-xl transition-all shadow-xs text-center cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <span>{currentData.promoCard.buttonText}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
