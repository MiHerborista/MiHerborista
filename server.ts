import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS } from './src/data/productsData';
import { checkDbConnection } from './src/lib/db';
import { getAuthContext } from './src/lib/auth';
import { sendInngestEvent, isInngestConfigured } from './src/lib/inngest';
import { handleTRPCRequest } from './src/lib/trpc';

// Lightweight Product Catalog Summary for Gemini context to optimize token usage
const PRODUCT_CATALOG_SUMMARY = INITIAL_PRODUCTS.map(p => ({
  id: p.id,
  title: p.title,
  priceDT: `${p.price} DT`,
  category: p.categoryLabel,
  benefits: p.benefits?.slice(0, 2).join('; '),
  description: p.description?.substring(0, 100)
}));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client lazily with required User-Agent header
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  };

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'MiHerborista' });
  });

  // Services Readiness Health Check Endpoint
  app.get('/api/health/services', (req, res) => {
    const auth = getAuthContext(req.headers);
    const db = checkDbConnection();
    const inngestActive = isInngestConfigured();

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          configured: db.isConfigured,
          provider: db.provider,
          message: db.message
        },
        authentication: {
          configured: Boolean(process.env.CLERK_SECRET_KEY),
          provider: auth.provider,
          activeSessionRole: auth.role
        },
        inngestWorkflows: {
          configured: inngestActive,
          status: inngestActive ? 'Active' : 'Simulated (Local)'
        },
        trpcApi: {
          status: 'Ready',
          router: 'AppRouter'
        }
      }
    });
  });

  // Generic tRPC Procedure Handler Endpoint
  app.all('/api/trpc/:procedure', async (req, res, next) => {
    const procedureName = req.params.procedure;
    // Skip if it matches the specific chat endpoint handled below
    if (procedureName === 'consultation.sendChatMessage') {
      return next();
    }

    const trpcRes = await handleTRPCRequest({
      path: procedureName,
      input: req.body,
      headers: req.headers
    });
    res.json(trpcRes);
  });

  // Inngest Event Webhook Endpoint Skeleton
  app.post('/api/inngest', async (req, res) => {
    const { name, data } = req.body;
    const result = await sendInngestEvent({ name: name || 'generic.event', data: data || {} });
    res.json(result);
  });


  // AI Remedy Generator Endpoint
  app.post('/api/ai/remedy', async (req, res) => {
    try {
      const { targetSymptom, selectedPlantNames, customNotes, userProfile } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(503).json({ error: 'GEMINI_API_KEY non configurée. Utilisation du mode hors-ligne.' });
      }

      const prompt = `
Vous êtes un maître herboriste et pharmacien naturopathe. Formulez une recette médicinale détaillée en français pour le symptôme suivant : "${targetSymptom}".
Plantes sélectionnées par l'utilisateur: ${selectedPlantNames?.join(', ') || 'Sélectionnez les meilleures plantes'}.
Notes: ${customNotes || 'Aucune'}.
Profil de santé: Enceinte/Allaitement: ${userProfile?.isPregnantOrNursing ? 'OUI (FILTRER LES PLANTES INCOMPATIBLES)' : 'NON'}, Allergies: ${userProfile?.allergies?.join(', ') || 'Aucune'}.

Renvoyez UNIQUEMENT un objet JSON valide avec cette structure exacte :
{
  "recipe": {
    "title": "Nom traditionnel de la formule",
    "subtitle": "Description de la synergie",
    "prepTimeMinutes": 10,
    "ingredients": [
      { "plantName": "Nom Plante", "amount": "1 cuillère à café", "purpose": "Propriété principale" }
    ],
    "preparationSteps": [
      "Étape 1...",
      "Étape 2..."
    ],
    "dosageAndUsage": "Indications de dosage",
    "bestTime": "Moment idéal",
    "precautions": ["Avertissement"]
  }
}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const rawText = response.text || '';
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      return res.json(parsed);
    } catch (error: any) {
      console.error('Error in /api/ai/remedy:', error);
      return res.status(500).json({ error: 'Erreur lors de la génération de la recette herbal avec Gemini API' });
    }
  });

  // AI Botanical Sales Consultant Endpoint (French Sonia Persona)
  app.post('/api/trpc/consultation.sendChatMessage', async (req, res) => {
    try {
      const { message, userProfile } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          reply: "Bonjour ! Je suis Sonia, experte botaniste chez MiHerborista Tunisie. Pour votre peau, je vous conseille notre Sérum Acide Hyaluronique 3,5% (5,95 DT) combiné à un hydrolat bio. N'oubliez pas le code BIENVENUE10 pour bénéficier de -10% !",
          recommendedProductIds: ['serum-acide-hyaluronique-35', 'hydrolat-rose-damas-bio']
        });
      }

      const systemInstruction = `
Tu es Sonia, conseillère botaniste certifiée et spécialiste dermo-cosmétique naturelle pour la marque MiHerborista en Tunisie.
Ta mission : guider les clients, recommander des produits réels de notre catalogue, et inciter efficacement à l'achat tout en instaurant la confiance et la fidélité.

Directives de réponse :
1. TON ET STYLE : Courtoise, professionnelle, chaleureuse et très CONCISE (2 à 3 phrases maximum). Pas de blabla inutile pour économiser les tokens.
2. CONVERSION ET VENTE :
   - Analyse le besoin ou la question du client (acné, déshydratation, taches, pousse cheveux, etc.).
   - Recommande 1 à 3 produits EXACTS parmi la liste fournie en mentionnant leurs identifiants dans 'recommendedProductIds'.
   - Propose une synergie ou routine (ex: Sérum + Hydrolat ou Huile) pour aider le client à atteindre la livraison gratuite (offerte dès 35 DT).
   - Offre ou rappelle le code promo de bienvenue : "-10% immédiats avec le code BIENVENUE10".
   - Termine par une courte phrase incitant à ajouter les soins au panier.

CATALOGUE PRODUITS MIHERBORISTA TUNISIE :
${JSON.stringify(PRODUCT_CATALOG_SUMMARY, null, 2)}

Structure JSON obligatoire de la réponse :
{
  "reply": "Ta réponse concise en 2 à 3 phrases en français.",
  "recommendedProductIds": ["id_produit_1", "id_produit_2"]
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${systemInstruction}\n\nQuestion client: "${message}"\nProfil client: ${JSON.stringify(userProfile || {})}`,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const rawText = response.text || '';
      let parsed: { reply: string; recommendedProductIds: string[] } = { reply: '', recommendedProductIds: [] };
      try {
        const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleanJson);
      } catch {
        parsed = {
          reply: rawText || "Voici nos soins botaniques recommandés. Profitez de -10% avec le code BIENVENUE10 !",
          recommendedProductIds: ['serum-acide-hyaluronique-35', 'hydrolat-rose-damas-bio']
        };
      }

      return res.json({
        reply: parsed.reply,
        recommendedProductIds: parsed.recommendedProductIds || []
      });
    } catch (error: any) {
      console.error('Error in /api/trpc/consultation.sendChatMessage:', error);
      return res.json({
        reply: "Je suis Sonia, votre experte MiHerborista. Je vous recommande notre Sérum Acide Hyaluronique 3,5% (5,95 DT) et l'Hydrolat de Rose Bio. Profitez de -10% avec le code BIENVENUE10 !",
        recommendedProductIds: ['serum-acide-hyaluronique-35', 'hydrolat-rose-damas-bio']
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MiHerborista Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
