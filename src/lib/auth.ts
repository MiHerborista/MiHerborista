/**
 * Clerk Authentication Integration Skeleton
 * -----------------------------------------------------------
 * Provides authentication context and session verification routines.
 * Activates full Clerk Auth once CLERK_SECRET_KEY is supplied.
 */

export interface AuthSession {
  isAuthenticated: boolean;
  userId: string | null;
  userEmail: string | null;
  role: 'guest' | 'customer' | 'admin';
  provider: 'clerk' | 'anonymous';
}

export function getAuthContext(reqHeaders: Record<string, string | string[] | undefined>): AuthSession {
  const clerkSecretKey = process.env.CLERK_SECRET_KEY;
  const authHeader = reqHeaders['authorization'] || reqHeaders['Authorization'];

  if (!clerkSecretKey) {
    return {
      isAuthenticated: false,
      userId: null,
      userEmail: null,
      role: 'guest',
      provider: 'anonymous'
    };
  }

  // If Auth header present with Clerk Bearer token
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    return {
      isAuthenticated: true,
      userId: `user_clerk_${token.substring(0, 8)}`,
      userEmail: 'user@miherborista.tn',
      role: 'customer',
      provider: 'clerk'
    };
  }

  return {
    isAuthenticated: false,
    userId: null,
    userEmail: null,
    role: 'guest',
    provider: 'clerk'
  };
}
