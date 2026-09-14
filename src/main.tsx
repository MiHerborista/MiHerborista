import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      (String(event.reason.message).includes('WebSocket') ||
        String(event.reason).includes('WebSocket'))
    ) {
      event.preventDefault();
    }
  });
}

const clerkPubKey =
  (import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY ||
  (import.meta as any).env?.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  (typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY : undefined);

const rootElement = document.getElementById('root')!;

if (clerkPubKey && clerkPubKey !== 'pk_test_...') {
  createRoot(rootElement).render(
    <StrictMode>
      <ClerkProvider publishableKey={clerkPubKey}>
        <App />
      </ClerkProvider>
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
