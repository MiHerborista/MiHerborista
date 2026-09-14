/**
 * MiHerborista - Sonia Botanical Consultation Engine
 * Refined, eloquent dermo-cosmetic expertise with zero robotic clichés.
 */

export interface SoniaAdvice {
  reply: string;
  recommendedProductIds: string[];
}

export const SONIA_SYSTEM_PROMPT = `
Tu es Sonia, maîtresse botaniste et formulatrice dermo-cosmétique chez MiHerborista en Tunisie.
Tu t'exprimes avec l'élégance, la chaleur et la précision d'une herboriste d'apothicaire passionnée.

DIRECTIVES FONDAMENTALES (STRICTES) :
1. BANIS TOUT TON ROBOTIQUE :
   - Ne commence JAMAIS par "Je suis Sonia, votre experte..." ou "Bonjour, en tant qu'experte...". Tu es déjà engagée dans la conversation avec bienveillance.
   - Ne répète pas mécaniquement les codes promo à chaque phrase. Mentionne discrètement les avantages (code BIENVENUE10 ou livraison offerte dès 35 DT) seulement si cela s'insère naturellement.
   - Évite les phrases creuses de télévendeur ("Achetez maintenant !", "Profitez vite"). Parle de rituels, de principes actifs, de synergie végétale et de respect du film hydrolipidique.

2. STRUCTURE D'UNE CONSULTATION RAFFINÉE :
   - Le Diagnostic Botanique : 1 à 2 phrases bienveillantes expliquant le mécanisme cutané ou capillaire (sébo-régulation, perte insensible en eau, stress oxydatif, inflammation).
   - Le Rituel en Étapes Claires :
     • Étape 1 (Préparer/Tonifier) : ex. Hydrolat pur pour neutraliser le calcaire.
     • Étape 2 (Traiter en profondeur) : ex. Sérum concentré actif (Niacinamide, Acide Hyaluronique, Vitamine C).
     • Étape 3 (Équilibrer/Protéger) : ex. Huile végétale biomimétique (Jojoba, Ricin) ou soin protecteur.
   - L'Astuce de l'Herboriste : Un conseil précieux d'application (tapoter sur peau humide, application locale au coton-tige, ne pas rincer l'hydrolat).

3. CATALOGUE EXACT :
   Recommande 1 à 3 produits réels parmi les identifiants suivants :
   - 'serum-niacinamide-cuivre-zinc' : Niacinamide 10%, Cuivre & Zinc (acné, pores dilatés, sébum, rougeurs) - 6.95 DT
   - 'huile-essentielle-tea-tree-bio' : Arbre à Thé Bio (action antibactérienne ciblée) - 4.90 DT
   - 'huile-vegetale-jojoba-bio' : Jojoba Bio (régulateur de sébum universel, non comédogène) - 6.50 DT
   - 'serum-acide-hyaluronique-35' : Acide Hyaluronique 3,5% pur (hydratation profonde, ridules) - 5.95 DT
   - 'hydrolat-rose-damas-bio' : Hydrolat Rose de Damas Bio (tonifiant, apaisant, éclat) - 5.20 DT
   - 'serum-vitamine-c-astaxanthine' : Vitamine C 10% & Astaxanthine (taches, éclat, antioxydant) - 7.95 DT
   - 'serum-retinol-like-vegetal' : Bakuchiol végétal 1% (anti-rides, renouvellement doux) - 7.90 DT
   - 'huile-vegetale-ricin-bio' : Ricin Bio (pousse cheveux, cils, ongles) - 5.80 DT
   - 'shampoing-solide-spiruline-bio' : Shampoing fortifiant Spiruline (cuir chevelu sain) - 5.50 DT
   - 'beurre-karite-brut-bio' : Karité sauvage brut (réparation peaux très sèches) - 4.50 DT

Format JSON strict attendu :
{
  "reply": "Texte élégant, aéré et chaleureux rédigé en français soigné.",
  "recommendedProductIds": ["id_1", "id_2"]
}
`;

/**
 * Expert Botanical Knowledge Fallback Engine
 * Used when offline, during API quota limits, or to guarantee refined answers instantly.
 */
export function getRefinedBotanicalAdvice(query: string): SoniaAdvice {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 1. Acné, Pores dilatés, Sébum, Imperfections, Boutons, Zone T
  if (
    q.includes('acne') ||
    q.includes('pore') ||
    q.includes('bouton') ||
    q.includes('sebum') ||
    q.includes('imperfection') ||
    q.includes('brillance') ||
    q.includes('point noir') ||
    q.includes('grasse')
  ) {
    return {
      reply: `Pour traiter l'acné et resserrer les pores sans décaper votre barrière cutanée, l'approche botanique privilégie la régulation sébacée plutôt que l'assèchement agressif.

Voici votre rituel purifiant & équilibrant :

• **Étape 1 • Rééquilibrer & Resserre les Pores** : Appliquez 3 à 4 gouttes du **Sérum Niacinamide 10%, Cuivre & Zinc**. Le zinc matifie et régule le flux sébacé, tandis que la niacinamide affine le grain de peau et estompe les rougeurs post-inflammatoires.
• **Étape 2 • Cibler les Boutons** : Déposez 1 goutte pure d'**Huile Essentielle de Tea Tree Bio** localement sur les imperfections à l'aide d'un coton-tige le soir. Ses molécules assainissantes neutralisent les bactéries responsables des comédons.
• **Étape 3 • Protéger sans boucher les pores** : Scellez avec 2 gouttes d'**Huile Végétale de Jojoba Bio**. Sa structure biomimétique signale aux glandes sébacées de freiner leur surproduction naturelle.

🌿 *L'astuce de l'herboriste* : Évitez les gommages mécaniques à grains qui enflamment les pores ; privilégiez ce rituel régulier matin et soir pour un grain de peau net dès 10 à 14 jours.`,
      recommendedProductIds: [
        'serum-niacinamide-cuivre-zinc',
        'huile-essentielle-tea-tree-bio',
        'huile-vegetale-jojoba-bio'
      ]
    };
  }

  // 2. Peau sèche, Déshydratation, Ridules, Tiraillements
  if (
    q.includes('seche') ||
    q.includes('deshydrate') ||
    q.includes('ridule') ||
    q.includes('tiraille') ||
    q.includes('soif') ||
    q.includes('peluche')
  ) {
    return {
      reply: `Une peau qui tiraille et marque des ridules manque souvent d'eau (déshydratation) avant même de manquer de corps gras. Pour lui redonner son rebondi naturel, nous activons une hydratation cellulaire à double niveau.

Voici votre rituel repulpant & désaltérant :

• **Étape 1 • Préparer l'épiderme** : Vaporisez généreusement l'**Hydrolat de Rose de Damas Bio**. Cette brume florale neutralise le calcaire de l'eau du robinet et prépare les cellules à recevoir les actifs.
• **Étape 2 • Repulper en profondeur** : Sur peau encore humide, appliquez 3 gouttes de notre **Sérum concentré Acide Hyaluronique 3,5%**. Ses différents poids moléculaires captent jusqu'à 1000 fois leur poids en eau pour combler instantanément les ridules de déshydratation.
• **Étape 3 • Sceller l'eau** : Terminez avec une goutte d'**Huile Végétale de Jojoba Bio** ou une touche de **Beurre de Karité brut** sur les zones les plus dénutries pour former un bouclier lipidique anti-évaporation.

🌿 *L'astuce de l'herboriste* : Ne laissez jamais sécher un hydrolat à l'air libre ; appliquez votre sérum à l'acide hyaluronique immédiatement dessus pour décupler son efficacité gorgeante.`,
      recommendedProductIds: [
        'serum-acide-hyaluronique-35',
        'hydrolat-rose-damas-bio',
        'huile-vegetale-jojoba-bio'
      ]
    };
  }

  // 3. Teint terne, Taches pigmentaires, Éclat, Mélasma, Taches brunes
  if (
    q.includes('tache') ||
    q.includes('eclat') ||
    q.includes('terne') ||
    q.includes('melasma') ||
    q.includes('gris') ||
    q.includes('unifi') ||
    q.includes('soleil')
  ) {
    return {
      reply: `Pour réveiller un teint fatigué et éclaircir les taches pigmentaires sans irriter la peau, l'association de puissants antioxydants végétaux et du renouvellement cellulaire est souveraine.

Voici votre rituel éclat & clarté :

• **Le Matin • Bouclier Antioxydant** : Appliquez 3 à 4 gouttes du **Sérum Vitamine C 10% & Astaxanthine**. La vitamine C freine la mélanogénèse et illumine le teint, tandis que l'astaxanthine protège vos cellules des agressions UV et de la pollution.
• **Le Soir • Renouvellement Cellulaire** : Après avoir tonifié avec l'**Hydrolat de Rose de Damas Bio**, massez 3 gouttes de **Sérum Rétinol-like végétal (Bakuchiol 1%)**. Cette alternative naturelle au rétinol stimule le renouvellement de la peau et estompe progressivement les taches anciennes.

🌿 *L'astuce de l'herboriste* : Soyez assidue pendant un cycle cellulaire complet (28 jours) et veillez à protéger votre peau du soleil pour consolider la luminosité retrouvée.`,
      recommendedProductIds: [
        'serum-vitamine-c-astaxanthine',
        'serum-retinol-like-vegetal',
        'hydrolat-rose-damas-bio'
      ]
    };
  }

  // 4. Cheveux, Chute, Pousse, Cuir chevelu, Densité
  if (
    q.includes('cheveu') ||
    q.includes('chute') ||
    q.includes('pousse') ||
    q.includes('cuir chevelu') ||
    q.includes('densite') ||
    q.includes('pellicule')
  ) {
    return {
      reply: `Pour stimuler la pousse et freiner la chute, la clé réside dans la microcirculation du bulbe capillaire et la pureté des soins (sans silicones ni sulfates étouffants).

Voici votre rituel capillaire fortifiant :

• **En Bain d'Huile Hebdomadaire** : Massez votre cuir chevelu avec l'**Huile Végétale de Ricin Bio** (riche en acide ricinoléique revitalisant). Laissez poser 30 à 45 minutes sous une serviette tiède pour décupler la vascularisation des racines.
• **Au Lavage** : Utilisez notre **Shampoing Solide Fortifiant à la Spiruline Bio**. Sa formule douce respecte l'équilibre sébacé, nourrit la fibre en minéraux essentiels et prévient la casse.
• **Assainissement ciblé** : Si vous avez des pellicules ou un excès de sébum, ajoutez 2 gouttes d'**Huile Essentielle de Tea Tree Bio** dans votre dose de shampoing.

🌿 *L'astuce de l'herboriste* : Massez toujours le cuir chevelu du bout des doigts par mouvements circulaires lents, de la nuque vers le sommet du crâne, pour encourager un flux sanguin vivifiant.`,
      recommendedProductIds: [
        'huile-vegetale-ricin-bio',
        'shampoing-solide-spiruline-bio',
        'huile-essentielle-tea-tree-bio'
      ]
    };
  }

  // 5. Anti-âge global, Rides, Fermeté, Rajeunissement
  if (
    q.includes('ride') ||
    q.includes('fermete') ||
    q.includes('anti-age') ||
    q.includes('relachement') ||
    q.includes('collagene') ||
    q.includes('matur')
  ) {
    return {
      reply: `Avec le temps, la synthèse de collagène et d'acide hyaluronique ralentit naturellement. Pour raffermir l'ovale et lisser les traits sans créer d'irritation, nous conjuguons hydratation macromoléculaire et phytorétenseurs.

Voici votre protocole de fermeté botanique :

• **Le Matin • Repulper & Lisser** : Brumisez l'**Hydrolat de Rose de Damas Bio**, puis faites pénétrer 3 gouttes de **Sérum Acide Hyaluronique 3,5%** pour gorger les tissus et combler les sillons dès le réveil.
• **Le Soir • Régénérer en Profondeur** : Appliquez 4 gouttes de **Sérum Rétinol-like végétal (Bakuchiol 1%)**. Il relance la production de collagène et raffermit l'architecture cutanée sans les rougeurs du rétinol synthétique.

🌿 *L'astuce de l'herboriste* : Effectuez toujours vos mouvements de lissage du centre du visage vers l'extérieur et de bas en haut (le long des pommettes et du cou) pour stimuler le drainage lymphatique.`,
      recommendedProductIds: [
        'serum-retinol-like-vegetal',
        'serum-acide-hyaluronique-35',
        'hydrolat-rose-damas-bio'
      ]
    };
  }

  // 6. Peaux sensibles, Rougeurs, Couperose, Irritations
  if (
    q.includes('sensible') ||
    q.includes('rougeur') ||
    q.includes('couperose') ||
    q.includes('irrit') ||
    q.includes('brulure') ||
    q.includes('eczema')
  ) {
    return {
      reply: `Les peaux réactives nécessitent un apaisement immédiat et une reconstruction douce de leur ciment lipidique défaillant. Moins vous superposez de produits agressifs, plus votre peau retrouvera son confort.

Voici votre cocon protecteur :

• **Le Geste Douceur** : Apaisez instantanément les échauffements avec une brumisation d'**Hydrolat de Rose de Damas Bio** biologique.
• **La Protection Réparatrice** : Réchauffez une perle de **Beurre de Karité brut sauvage Bio** au creux des mains et appliquez par effleurements délicats sur les zones irritées. Ses insaponifiables calment l'inflammation et isolent la peau du vent et de la sécheresse.

🌿 *L'astuce de l'herboriste* : Évitez l'eau trop chaude lors de votre toilette, qui accentue la dilatation des vaisseaux sanguins et les rougeurs diffuses.`,
      recommendedProductIds: [
        'hydrolat-rose-damas-bio',
        'beurre-karite-brut-bio',
        'huile-vegetale-jojoba-bio'
      ]
    };
  }

  // Fallback universel raffiné
  return {
    reply: `Chaque peau possède son propre équilibre botanique et réagit aux saisons, au stress et au climat méditerranéen.

Pour poser les fondations d'un épiderme éclatant et serein, voici les piliers indispensables de notre apothicaire :

• **Hydratation Essentielle** : Le **Sérum concentré Acide Hyaluronique 3,5%**, capable de désaltérer toutes les peaux sans jamais boucher les pores.
• **Tonification Pure** : L'**Hydrolat de Rose de Damas Bio**, distillé à la vapeur pour purifier et rafraîchir en douceur.
• **Équilibre & Éclat** : L'**Huile Végétale de Jojoba Bio** pour nourrir et réguler le film protecteur naturel.

🌿 *Parlez-moi de votre ressenti actuel (tiraillements, brillances, taches ou besoin capillaire) : je vous guiderai vers le rituel sur-mesure idéal.*`,
    recommendedProductIds: [
      'serum-acide-hyaluronique-35',
      'hydrolat-rose-damas-bio',
      'huile-vegetale-jojoba-bio'
    ]
  };
}
