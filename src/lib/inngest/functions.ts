// Inngest Background Workflows for MiHerborista
import { InngestFunctionInfo } from '../../types';

export const INNGEST_FUNCTIONS_MANIFEST: InngestFunctionInfo[] = [
  {
    id: 'remedy-reminder-notification',
    eventName: 'herborista/remedy.reminder.requested',
    description: 'Envía un recordatorio de toma de infusión o remedio natural al usuario a horas clave del día.',
    cron: '0 8,14,21 * * *'
  },
  {
    id: 'ai-herb-indexing-pipeline',
    eventName: 'herborista/plant.created',
    description: 'Genera incrustaciones (embeddings) y valida precauciones médicas de nuevas plantas añadidas al catálogo.',
  },
  {
    id: 'weekly-herbal-digest',
    eventName: 'herborista/user.weekly_digest',
    description: 'Recopila remedios estacionales y consejos botánicos según el perfil de alergias y estación del año.',
    cron: '0 9 * * 1'
  }
];
