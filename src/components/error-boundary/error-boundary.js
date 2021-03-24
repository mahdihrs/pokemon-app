import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './error-fallback';

function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;