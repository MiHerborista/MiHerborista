// tRPC Router Scaffolding for MiHerborista (Next.js App Router + tRPC)
import { TrpcProcedureInfo } from '../../types';

export const TRPC_PROCEDURES_MANIFEST: TrpcProcedureInfo[] = [
  {
    name: 'plants.getAll',
    type: 'query',
    description: 'Obtiene el catálogo completo de plantas medicinales con filtros opcionales de categoría y síntomas.',
    inputSchema: '{ category?: PlantCategory, search?: string, tag?: string }'
  },
  {
    name: 'plants.getById',
    type: 'query',
    description: 'Devuelve la información botánica, dosis y contraindicaciones de una planta específica.',
    inputSchema: '{ id: string }'
  },
  {
    name: 'remedies.generateAiRemedy',
    type: 'mutation',
    description: 'Ejecuta el pipeline de IA con Gemini para formular una receta herbal personalizada e invoca eventos Inngest para sincronización.',
    inputSchema: '{ ailment: string, userHerbs?: string[], preferences?: string }'
  },
  {
    name: 'remedies.saveFavorite',
    type: 'mutation',
    description: 'Guarda un remedio o infusión en el perfil del usuario autenticado vía Clerk en la base de datos PostgreSQL mediante Prisma.',
    inputSchema: '{ remedyId: string, customNotes?: string }'
  },
  {
    name: 'consultation.sendChatMessage',
    type: 'mutation',
    description: 'Envía una consulta al herborista botánico virtual Gemini con el historial de conversación y contexto de salud del usuario.',
    inputSchema: '{ message: string, conversationHistory: ChatMessage[], healthProfile?: UserProfile }'
  },
  {
    name: 'inngest.triggerRemedyReminder',
    type: 'mutation',
    description: 'Programa una tarea en segundo plano con Inngest para recordar al usuario la toma de su infusión medicina a horas fijas.',
    inputSchema: '{ remedyTitle: string, scheduleTime: string, userId: string }'
  }
];
