"use client"

import { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import TodoLayout from '../components/layout/TodoLayout';

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
      <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{error.message}</p>
        <button 
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state when the error boundary is reset
        window.location.reload();
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
        <Suspense fallback={<LoadingFallback />}>
          <TodoLayout />
        </Suspense>
      </div>
    </ErrorBoundary>
  );  
}

export default App;
