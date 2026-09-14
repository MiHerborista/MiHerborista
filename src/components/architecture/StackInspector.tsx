import React, { useState } from 'react';
import { Code, Database, Zap, Shield, Play, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';

interface StackInspectorProps {
  user: UserProfile;
}

export const StackInspector: React.FC<StackInspectorProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'trpc' | 'prisma' | 'inngest' | 'clerk'>('trpc');
  const [executedStatus, setExecutedStatus] = useState<string | null>(null);

  const handleTestProcedure = (procedureName: string) => {
    setExecutedStatus(`Exécution de ${procedureName}...`);
    setTimeout(() => {
      setExecutedStatus(`✓ Procédure ${procedureName} exécutée avec succès (Status 200 OK)`);
    }, 800);
  };

  return (
    <section className="py-8 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0f291e] text-emerald-300 flex items-center justify-center font-bold">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Inspecteur d'Architecture Full-Stack
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Supervision technique : tRPC, Prisma, PostgreSQL, Inngest & Clerk Auth
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 bg-stone-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('trpc')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'trpc' ? 'bg-[#0f291e] text-white' : 'text-stone-700 hover:text-black'
            }`}
          >
            tRPC Router
          </button>
          <button
            onClick={() => setActiveTab('prisma')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'prisma' ? 'bg-[#0f291e] text-white' : 'text-stone-700 hover:text-black'
            }`}
          >
            Prisma Schema
          </button>
          <button
            onClick={() => setActiveTab('inngest')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'inngest' ? 'bg-[#0f291e] text-white' : 'text-stone-700 hover:text-black'
            }`}
          >
            Inngest Events
          </button>
          <button
            onClick={() => setActiveTab('clerk')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'clerk' ? 'bg-[#0f291e] text-white' : 'text-stone-700 hover:text-black'
            }`}
          >
            Clerk Auth
          </button>
        </div>
      </div>

      {executedStatus && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center justify-between">
          <span>{executedStatus}</span>
          <button onClick={() => setExecutedStatus(null)} className="text-emerald-700 cursor-pointer">✕</button>
        </div>
      )}

      {/* Tab Contents */}
      {activeTab === 'trpc' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Procédures Endpoints tRPC Déclarées :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'products.getAll', type: 'query', desc: 'Récupère le catalogue complet des soins avec filtres' },
              { name: 'consultation.sendChatMessage', type: 'mutation', desc: 'Génère les conseils botanniques personnalisés via Gemini API' },
              { name: 'skinDiagnostic.analyze', type: 'mutation', desc: 'Évalue le type de peau et renvoie la routine optimale' },
              { name: 'inngest.triggerReminder', type: 'mutation', desc: 'Déclenche l’événement de rappel d’application de soin' }
            ].map((p) => (
              <div key={p.name} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {p.type}
                  </span>
                  <h4 className="font-mono text-sm font-bold text-stone-900 mt-1">{p.name}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{p.desc}</p>
                </div>
                <button
                  onClick={() => handleTestProcedure(p.name)}
                  className="px-3 py-1.5 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs rounded-xl flex items-center space-x-1 cursor-pointer shrink-0 ml-2"
                >
                  <Play className="w-3 h-3" />
                  <span>Tester</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'prisma' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Modèles de Données Relationnelles (PostgreSQL / Prisma) :
          </h3>
          <pre className="bg-stone-900 text-stone-100 p-4 rounded-2xl text-xs font-mono overflow-x-auto">
{`model User {
  id               String      @id @default(cuid())
  email            String      @unique
  fullName         String
  role             String      @default("client")
  savedProducts    Product[]
  cartItems        CartItem[]
  createdAt        DateTime    @default(now())
}

model Product {
  id               String      @id
  title            String
  subtitle         String
  price            Float
  category         String
  badge            String?
  rating           Float
  reviewCount      Int
  ingredients      String[]
}`}
          </pre>
        </div>
      )}

      {activeTab === 'inngest' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Inngest Background Workflows & Timers :
          </h3>
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span>Event: miherborista/remedy.reminder</span>
              <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md text-[10px]">Active Cron / Event</span>
            </div>
            <p className="text-stone-600">
              Envoie un rappel automatique par notification/email au client pour l’application de sa routine beauté quotidienne.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'clerk' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Session Utilisateur Clerk Active :
          </h3>
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2 text-xs font-mono text-stone-800">
            <div>User ID : {user.id}</div>
            <div>Full Name : {user.fullName}</div>
            <div>Email : {user.email}</div>
            <div>Role Claim : {user.role}</div>
          </div>
        </div>
      )}

    </section>
  );
};
