import { StrictMode, Suspense, startTransition, useMemo } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

// Create a simple memoization function
const cache = <T extends (...args: any[]) => any>(fn: T): T => {
  let cachedResult: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (cachedResult === undefined) {
      cachedResult = fn(...args);
    }
    return cachedResult;
  }) as T;
};
import App from './app/app';

// Error fallback for root-level errors
function RootErrorFallback({ error }: { error: Error }) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#FEF2F2',
      color: '#B91C1C',
      borderRadius: '8px',
      margin: '20px'
    }}>
      <h2 style={{ marginBottom: '8px' }}>Application Error</h2>
      <p>{error.message}</p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          marginTop: '12px',
          padding: '8px 16px',
          backgroundColor: '#7C3AED',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reload Application
      </button>
    </div>
  );
}

// Loading fallback for root-level suspense
function RootLoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderLeftColor: '#7C3AED',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Cache for state initialization
const getInitializedApp = cache(() => {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={({ error }: { error: Error }) => <RootErrorFallback error={error} />}>
        <RecoilRoot>
          <Suspense fallback={<RootLoadingFallback />}>
            <App />
          </Suspense>
        </RecoilRoot>
      </ErrorBoundary>
    </StrictMode>
  );
});

// Initialization function with error handling
function initializeApp() {
  try {
    // Get the container element
    const container = document.getElementById('root');
    
    if (!container) {
      throw new Error("Root element not found. Make sure there is a div with id 'root' in your HTML.");
    }

    // Check if we should hydrate (this would be set by SSR)
    const shouldHydrate = document.getElementById('__REACT_SSR_DATA__') !== null;
    
    if (shouldHydrate) {
      // Hydrate the app if it was server-rendered
      hydrateRoot(
        container,
        getInitializedApp(),
        {
          onRecoverableError: (error) => {
            console.warn('Recovered from error during hydration:', error);
          }
        }
      );
    } else {
      // Create a new root and render for client-only rendering
      const root = createRoot(container);
      
      // Use startTransition to avoid blocking the UI during initialization
      startTransition(() => {
        root.render(getInitializedApp());
      });
    }
  } catch (error) {
    console.error('Error initializing application:', error);
    
    // Fallback rendering in case of critical error
    const container = document.getElementById('root');
    if (container) {
      container.innerHTML = `
        <div style="padding: 20px; background-color: #FEF2F2; color: #B91C1C; border-radius: 8px; margin: 20px;">
          <h2 style="margin-bottom: 8px;">Critical Application Error</h2>
          <p>${error instanceof Error ? error.message : 'Unknown error occurred'}</p>
          <button 
            onclick="window.location.reload()" 
            style="margin-top: 12px; padding: 8px 16px; background-color: #7C3AED; color: white; border: none; border-radius: 4px; cursor: pointer"
          >
            Reload Application
          </button>
        </div>
      `;
    }
  }
}

// Initialize the application
initializeApp();
