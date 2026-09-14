// Types for MiHerborista (French E-Commerce & AI Botanical Platform)

export type ProductCategory =
  | 'tous'
  | 'soins_visage'
  | 'cheveux'
  | 'aromatherapie'
  | 'diy_ingredients'
  | 'corps_bain'
  | 'complements_sante'
  | 'maison_ecologie'
  | 'recettes_tutos'
  | 'diagnostic_peau'
  | 'huiles_vegetales'
  | 'hydrolats'
  | 'diy_bases'
  | 'complements';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number; // In Tunisia Dinars (DT)
  originalPrice?: number;
  category: ProductCategory;
  categoryLabel: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  volumeOrSize: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  isBestSeller?: boolean;
  isOrganic?: boolean;
  isTunisianOrigin?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RayonPhare {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  categoryKey: ProductCategory;
}

export interface SkinDiagnosticAnswers {
  skinType: 'seche' | 'grasse' | 'mixte' | 'sensible' | 'dehydratee' | 'mature';
  primaryConcern: 'imperfections' | 'rides' | 'taches' | 'rougeurs' | 'eclat' | 'deshydratation';
  routinePreference: 'simple' | 'complete' | 'diy';
  budgetPreference?: string;
}

export interface SkinDiagnosticResult {
  skinProfileTitle: string;
  description: string;
  recommendedProducts: Product[];
  diyRecipeSuggestion?: {
    title: string;
    steps: string[];
    ingredients: string[];
  };
  aiAdvice: string[];
  discountCode: string;
}

export interface RecipeTutorial {
  id: string;
  title: string;
  category: string;
  prepTimeMinutes: number;
  difficulty: 'Très Facile' | 'Facile' | 'Moyen' | 'Avancé';
  summary: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  benefits?: string[];
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProductIds?: string[];
  recommendedProducts?: Product[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: 'client' | 'pro_herboriste' | 'admin';
  savedProductIds: string[];
  cart: CartItem[];
  skinType?: string;
  isPregnantOrNursing?: boolean;
  allergies?: string[];
}

// Herbal & Botanical Encyclopedia Types
export type PlantCategory = string;

export interface Plant {
  id: string;
  name?: string;
  scientificName?: string;
  latinName?: string;
  frenchName?: string;
  arabicName?: string;
  category?: PlantCategory;
  imageUrl?: string;
  description?: string;
  properties?: string[];
  indications?: string[];
  precautions?: string[];
  origin?: string;
  tags?: string[];
  benefits?: string[];
  preparationMethods?: string[];
  dosage?: string;
  contraindications?: string[];
  activePrinciples?: string[];
  flavorProfile?: string;
  recommendedFor?: string[];
}

export interface RemedyRecipe {
  id: string;
  title: string;
  subtitle: string;
  targetAilment?: string;
  ailmentTarget?: string;
  category?: string;
  prepTimeMinutes: number;
  difficulty?: string;
  ingredients: { plantName: string; amount: string; purpose: string }[];
  preparationSteps: string[];
  dosageAndUsage: string;
  bestTime: string;
  precautions: string[];
  isAiGenerated?: boolean;
  createdAt?: string;
  favorite?: boolean;
}

export interface Ailment {
  id: string;
  title?: string;
  name?: string;
  bodySystem?: string;
  category?: string;
  summary?: string;
  description?: string;
  symptoms?: string[];
  recommendedPlantIds?: string[];
  recommendedHerbs?: string[];
  recipeIds?: string[];
  lifestyleAdvice?: string[];
  warnings?: string[] | string;
}

// Stack Scaffolding Types (tRPC, Prisma, Inngest, Clerk)
export interface TrpcProcedureInfo {
  name: string;
  type: 'query' | 'mutation';
  description: string;
  inputSchema: string;
}

export interface PrismaModelInfo {
  name: string;
  fields: { name: string; type: string; isId?: boolean; isRelation?: boolean }[];
}

export interface InngestFunctionInfo {
  id: string;
  eventName: string;
  description: string;
  cron?: string;
}
