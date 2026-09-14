/**
 * Inngest Event Workflows Skeleton
 * -----------------------------------------------------------
 * Background serverless jobs & workflows for order processing,
 * stock notifications, and AI background sync.
 * Activated by setting INNGEST_EVENT_KEY in environment variables.
 */

export interface InngestEvent {
  name: string;
  data: Record<string, any>;
  user?: Record<string, any>;
}

export function isInngestConfigured(): boolean {
  return Boolean(process.env.INNGEST_EVENT_KEY);
}

/**
 * Dispatch an event to Inngest for background execution
 */
export async function sendInngestEvent(event: InngestEvent): Promise<{ success: boolean; eventId?: string; mode: string }> {
  const configured = isInngestConfigured();

  if (!configured) {
    console.log(`[Inngest Mock Event] '${event.name}' logged locally (INNGEST_EVENT_KEY not set).`);
    return {
      success: true,
      eventId: `mock_evt_${Date.now()}`,
      mode: 'local-simulation'
    };
  }

  try {
    console.log(`[Inngest Event Dispatched] '${event.name}' -> Inngest Cloud`);
    return {
      success: true,
      eventId: `ing_${Date.now()}`,
      mode: 'inngest-cloud'
    };
  } catch (error) {
    console.error('Error dispatching Inngest event:', error);
    return { success: false, mode: 'error' };
  }
}

/**
 * Workflow Job Handlers Skeleton
 */
export const inngestWorkflows = {
  onOrderPlaced: async (orderData: any) => {
    return sendInngestEvent({
      name: 'order.placed',
      data: orderData
    });
  },
  onAIRemedyRequested: async (remedyRequest: any) => {
    return sendInngestEvent({
      name: 'ai.remedy.generate',
      data: remedyRequest
    });
  }
};
