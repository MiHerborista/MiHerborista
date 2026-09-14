<div align="center">
  
  # 🌿 MiHerborista

  **Plateforme E-Commerce de Cosmétique Botanique, Herboristerie & Assistant Virtuel Phytothérapeute IA en Tunisie**

  Une solution web complète et moderne dédiée à la beauté naturelle, l'herboristerie méditerranéenne et le DIY cosmétique. MiHerborista associe un e-commerce réactif à un assistant IA intelligent (Sonia), un outil de diagnostic de peau sur-mesure et un backend prêt pour la production (Prisma, PostgreSQL, Clerk, tRPC & Inngest).

  [Découvrir la Démo 🚀](https://ais-dev-yuzbvbguwm3rwuzumomc7l-765227425315.europe-west2.run.app) | [Site Officiel](https://www.miherborista.com) | [Contact Service Client](mailto:contact@miherborista.com)
</div>

<br />

<div align="center">

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Google Gemini API](https://img.shields.io/badge/Google_Gemini_3.8-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk_Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)
![Inngest](https://img.shields.io/badge/Inngest-000000?style=for-the-badge&logo=inngest&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

</div>

<br />

<!-- Replace this image link with your actual screenshot of the main page -->
<div align="center">
<img width="2558" height="1382" alt="Screenshot from 2026-09-14 17-03-20" src="https://github.com/user-attachments/assets/864d4d7c-575a-4f83-8343-8ab7eb2ada7b" />
  <p><em>Capture d'écran de l'interface principale MiHerborista — Herboristerie & Cosmétique Botanique</em></p>
</div>

---

## 🌟 Fonctionnalités Clés

**🌿 Catalogue E-Commerce Botanique Complet**  
Boutique en ligne fluide avec filtrage par catégorie (Soins Visage, Cheveux, Aromathérapie, DIY & Ingrédients, Corps & Bain, Compléments & Santé, Maison & Écologie). Affichage des prix en Dinar Tunisien (DT), badges d'actifs et gestion dynamique des stocks.

**🤖 Sonia — Conseillère Virtuelle & Phytothérapeute IA**  
Widget de discussion interactif propulsé par l'API **Google Gemini 3.8 Flash** en backend (proxifié de façon sécurisée via Express). Sonia répond en temps réel aux questions sur les huiles végétales, la posologie des huiles essentielles et recommande des routines personnalisées.

**✨ Diagnostic de Peau Intelligent & Sur-Mesure**  
Questionnaire guidé en 4 étapes analysant le type de peau, le niveau de déshydratation, la sensibilité et les préoccupations (anti-âge, imperfections, éclat). Génère une ordonnance cosmétique personnalisée avec possibilité d'ajouter la routine au panier en 1 clic.

**🧪 Recettes & Tutos Cosmétiques DIY**  
Catalogue de formules cosmétiques à réaliser chez soi avec calculateur de dosage, niveau de difficulté, temps de préparation, coût par lot et bouton *"Tout ajouter au panier"* pour commander l'ensemble des ingrédients nécessaires.

**💖 Coups de Cœur & Panier Dynamique**  
- **Tiroir Favoris (Wishlist Drawer)** : Sauvegarde des articles préférés avec animation de cœur et migration facile vers le panier.
- **Tiroir Panier (Cart Drawer)** : Barre de progression animée pour la livraison gratuite (seuil fixé à 35 DT), ajustement des quantités et simulation de paiement sécurisé (Paiement à la livraison, Carte bancaire tunisienne, D17).

**📌 Mega Menu Sur Clic sans Décalage**  
Barre de navigation interactive déclenchée uniquement **sur clic** (éliminant le survol intempestif) avec alignement parfait et fond sombre ancré sous le header.

**⚖️ Conformité Juridique & Cadre Tunisien**  
Intégration d'un module juridique comprenant les **Mentions Légales** (Matricule Fiscal, RNE), la **Politique de Confidentialité** (Loi n° 2004-63) et les **Conditions Générales de Vente (CGV Tunisie)**.

**🗄️ Ready for Production Backend (Prisma, PostgreSQL, Clerk, tRPC, Inngest)**  
Architecture backend complète intégrant Prisma ORM, les schémas PostgreSQL, l'authentification Clerk, le routage tRPC et les workflows d'arrière-plan Inngest, avec mode de repli automatique en absence de clés d'API.

**🔐 Authentification Clerk & Gestion de Session (`ClerkAuthModal`)**  
Composant d'authentification utilisateur réactif (`src/components/auth/ClerkAuthModal.tsx`) propulsé par `@clerk/clerk-react` et `@clerk/express`. Propose trois onglets d'interaction :
- **Mon Profil** : Statut de la session (Invité vs Authentifié Clerk), badge d'avatar, email, identifiant unique Clerk (`user_clerk_...`) et compteur de coups de cœur.
- **Se Connecter** : Formulaire de connexion sécurisé avec retour d'information instantané.
- **Créer un Compte** : Inscription complète avec saisie du nom, email et numéro de téléphone tunisien.
- **Support Hybride / Fallback** : Fonctionne aussi bien avec la clé de publication Clerk qu'en mode autonome sans clé d'API.

---

## 📐 Exemples de Requêtes & Interactions

<details>
<summary><strong>Conseil Herbal avec Sonia (IA Gemini)</strong></summary>

*Utilisateur :* "J'ai la peau mixte avec des rougeurs et quelques imperfections. Quelle huile végétale tunisienne me conseilles-tu ?"

*Sonia (IA) :* "Pour une peau mixte sujette aux rougeurs, je vous recommande notre **Élixir d'Huile de Nigelle BIO de Tunisie** combiné à l'**Hydrolat de Rose de Damas**. L'huile de nigelle régule le sébum tout en purifiant la peau, tandis que l'eau florale de rose apaise les rougeurs."

</details>

<details>
<summary><strong>Diagnostic de Peau en 4 Étapes</strong></summary>

1. **Étape 1 : Type de Peau** (Sèche, Grasse, Mixte, Normale)
2. **Étape 2 : Sensibilité & Tiraillements** (Peau réactive, Rougeurs occasionnelles)
3. **Étape 3 : Objectif Principal** (Anti-âge, Éclat du teint, Anti-imperfections)
4. **Résultat :** Génération immédiate du rituel recommandé avec boutons d'achat direct.

</details>

<details>
<summary><strong>Verification des Services Backend (`/api/health/services`)</strong></summary>

Accédez à `/api/health/services` pour vérifier en temps réel l'état d'activation de la base PostgreSQL, de l'authentification Clerk, des procédures tRPC et des workflows Inngest.

</details>

---

## 🛠️ Stack Technique

| Catégorie | Technologie | Rôle / Description |
|-----------|------------|-------------------|
| **Framework Frontend** | React 19 | Bibliothèque UI basée sur les composants fonctionnels et hooks |
| **Langage** | TypeScript | Typage statique rigoureux pour une meilleure maintenabilité du code |
| **Bundler / Dev Server** | Vite | Outil de build ultrarapide avec support HMR et compilation optimisée |
| **Styling** | Tailwind CSS v4 | Framework CSS utilitaire pour des mises en page réactives et modernes |
| **Animations** | Motion (`motion/react`) | Fluidité des tiroirs (Cart/Wishlist), modales et transitions de page |
| **Iconographie** | Lucide React | Ensemble d'icônes vectorielles botaniques et d'interface |
| **Backend / Serveur API** | Express.js & `tsx` | Proxy serveur Node.js exécuté sur le port `3000` |
| **Moteur IA** | `@google/genai` | SDK officiel Google Gen AI (modèle `gemini-3.8-flash`) pour l'assistant Sonia |
| **ORM & Base de Données** | Prisma & PostgreSQL | Gestionnaire de base de données relationnelle et schémas typés (`prisma/schema.prisma`) |
| **Authentification** | Clerk (`@clerk/express`) | Infrastucture de gestion des utilisateurs et sessions sécurisées |
| **API Layer** | tRPC (`@trpc/server`) | Routage API type-safe bout en bout sans génération de code intermédiaire |
| **Tâches d'Arrière-Plan** | Inngest (`inngest`) | Traitement des événements asynchrones (commandes, notifications, réapprovisionnement) |

---

## 📦 Ingrédients & Dépendances Principales

Les packages npm essentiels configurés dans `package.json` :

```json
{
  "dependencies": {
    "@clerk/express": "^2.1.67",
    "@google/genai": "^2.4.0",
    "@prisma/client": "^7.10.0",
    "@tailwindcss/vite": "^4.1.14",
    "@trpc/server": "^11.18.0",
    "express": "^4.21.2",
    "inngest": "^4.20.0",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "tailwind-merge": "^3.7.0"
  },
  "devDependencies": {
    "prisma": "^8.0.0-rc.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  }
}
```

---

## 📁 Structure du Projet

```text
miherborista/
├── server.ts                  # Serveur Express proxy avec routes AI, tRPC, Inngest & Health
├── prisma/
│   └── schema.prisma          # Schémas de base de données PostgreSQL (User, Product, Order, etc.)
├── src/
│   ├── App.tsx                # Composant racine orchestrant l'état principal
│   ├── main.tsx               # Point d'entrée React
│   ├── index.css              # Directive globale Tailwind CSS (@import "tailwindcss")
│   ├── types.ts               # Interfaces TypeScript (Product, CartItem, Diagnosis, etc.)
│   ├── lib/                   # Wrappers & Skeletons d'Infrastructures
│   │   ├── db.ts              # Client Prisma / PostgreSQL avec mode de secours
│   │   ├── auth.ts            # Intégration Clerk Auth
│   │   ├── trpc.ts            # Procedures et routeur tRPC
│   │   └── inngest.ts         # Handlers d'événements Inngest
│   ├── data/
│   │   ├── productsData.ts    # Catalogue des produits cosmétiques & ingrédients
│   │   └── recipesData.ts     # Recettes et tutoriels DIY
│   ├── components/
│   │   ├── ai/
│   │   │   └── FloatingSoniaChat.tsx   # Assistant virtuel IA Sonia
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx          # Tiroir Panier avec barre de livraison
│   │   │   └── WishlistDrawer.tsx      # Tiroir Favoris / Coups de cœur
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx          # Bannières principales & offres
│   │   │   ├── PromoBar.tsx            # Avantages (Livraison 35DT, Produit BIO)
│   │   │   └── RayonsPhares.tsx        # Catégories vedettes
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Barre de navigation supérieure (activable sur clic)
│   │   │   ├── MegaMenu.tsx            # Mega Menu ajusté sous le header
│   │   │   ├── Footer.tsx              # Pied de page avec liens juridiques
│   │   │   ├── TopNoticeBar.tsx        # Bandeau de notification supérieur
│   │   │   └── LegalModal.tsx          # Modale Mentions Légales, Privacy & CGV
│   │   ├── products/
│   │   │   ├── ProductCatalog.tsx      # Catalogue produits & filtres
│   │   │   └── SkinDiagnosisModal.tsx  # Questionnaire de diagnostic de peau
│   │   └── recipes/
│   │       └── DIYRecipesSection.tsx   # Section des recettes cosmétiques DIY
├── package.json               # Scripts de build, scripts Prisma & dépendances
├── metadata.json              # Métadonnées de l'application AI Studio
├── .env.example               # Variables d'environnement pour PostgreSQL, Clerk, Inngest & Gemini
└── README.md                  # Documentation complète du projet
```

---

## 💻 Déploiement & Développement Local

### Prérequis
- **Node.js** version 18.0.0 ou supérieure
- Clé d'API **Google Gemini** (`GEMINI_API_KEY`) pour l'assistant Sonia
- (Optionnel) Base de données **PostgreSQL**, clés **Clerk** et **Inngest**

### 1. Clonage du Dépôt

```bash
git clone https://github.com/votre-compte/miherborista.git
cd miherborista
```

### 2. Installation des Dépendances

```bash
npm install
```

### 3. Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine du projet (en vous basant sur `.env.example`) :

```env
# .env
GEMINI_API_KEY="votre_cle_api_gemini"

# (Optionnel) Service Keys
DATABASE_URL="postgresql://user:password@localhost:5432/miherborista?sslmode=disable"
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
INNGEST_EVENT_KEY="ink_..."
INNGEST_SIGNING_KEY="signkey_..."
```

> ⚠️ **Sécurité API** : Les clés secrètes (`GEMINI_API_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL`) sont consommées uniquement côté serveur dans `server.ts` et ne sont jamais exposées au navigateur client.

### 4. Synchronisation de la Base de Données (PostgreSQL / Prisma)

Pour générer le client Prisma et déployer le schéma sur votre base PostgreSQL :

```bash
npm run db:generate
npm run db:push
```

### 5. Lancement du Serveur de Développement

```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`.

### 6. Vérification du Code & Linter

```bash
npm run lint
```

### 7. Build pour la Production

```bash
npm run build
```
Cette commande compile les actifs frontend React avec Vite et génère un serveur CommonJS autonome dans `dist/server.cjs` via `esbuild`.

### 8. Démarrage du Serveur en Production

```bash
npm start
```

---

## 📞 Support & Contact

- **Éditeur :** MiHerborista Tunisie SARL
- **Téléphone :** +216 22 952 999
- **Email :** [contact@miherborista.com](mailto:contact@miherborista.com)
- **Adresse :** Tunis, Tunisie

---

<div align="center">
  <sub>Fait avec passion pour l'Herboristerie Botanique & la Beauté Naturelle en Tunisie 🌿</sub>
</div>
