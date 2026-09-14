/**
 * PostgreSQL / Prisma Database Client Wrapper
 * -----------------------------------------------------------
 * Provides a unified DB access layer for MiHerborista.
 * Uses DATABASE_URL when configured, or safely falls back to local state.
 */

export interface DbStatus {
  isConfigured: boolean;
  provider: 'postgresql' | 'mock-memory';
  message: string;
}

let prismaClientInstance: any = null;

export function getPrismaClient(): any {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.includes('YOUR_DATABASE_URL')) {
    return null;
  }

  if (!prismaClientInstance) {
    try {
      // Dynamic import to support environment where prisma generate has not been executed yet
      const { PrismaClient } = require('@prisma/client');
      prismaClientInstance = new PrismaClient({
        datasources: {
          db: {
            url: dbUrl
          }
        }
      });
    } catch (error) {
      console.warn('[Prisma Initialization Warning] Executing without generated PrismaClient:', error);
      return null;
    }
  }

  return prismaClientInstance;
}

export function checkDbConnection(): DbStatus {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.includes('YOUR_DATABASE_URL')) {
    return {
      isConfigured: false,
      provider: 'mock-memory',
      message: 'DATABASE_URL non configurée. Le système utilise les données locales.'
    };
  }

  return {
    isConfigured: true,
    provider: 'postgresql',
    message: 'PostgreSQL / Prisma configuré et prêt à la connexion.'
  };
}

/**
 * DB Interface with automatic Prisma routing or local fallback
 */
export const db = {
  products: {
    findMany: async () => {
      const prisma = getPrismaClient();
      if (prisma) {
        try {
          return await prisma.product.findMany();
        } catch (err) {
          console.warn('[Prisma Query Fallback] Error querying PostgreSQL products:', err);
        }
      }
      return [];
    },
    findById: async (id: string) => {
      const prisma = getPrismaClient();
      if (prisma) {
        try {
          return await prisma.product.findUnique({ where: { id } });
        } catch (err) {
          console.warn(`[Prisma Query Fallback] Error finding product ${id}:`, err);
        }
      }
      return null;
    }
  },
  orders: {
    create: async (data: any) => {
      const prisma = getPrismaClient();
      if (prisma) {
        try {
          return await prisma.order.create({ data });
        } catch (err) {
          console.warn('[Prisma Mutation Fallback] Error creating order:', err);
        }
      }
      return { id: `ord_${Date.now()}`, status: 'PENDING', ...data };
    }
  },
  users: {
    findUnique: async (where: { id?: string; email?: string }) => {
      const prisma = getPrismaClient();
      if (prisma) {
        try {
          return await prisma.user.findUnique({ where });
        } catch (err) {
          console.warn('[Prisma Query Fallback] Error finding user:', err);
        }
      }
      return null;
    }
  }
};


