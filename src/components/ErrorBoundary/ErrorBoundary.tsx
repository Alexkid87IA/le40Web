import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { logger } from '../../utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component to catch React errors
 * Prevents the entire app from crashing due to component errors
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to our logging service
    logger.error('React Error Boundary caught an error', error, {
      componentStack: errorInfo.componentStack,
      context: 'ErrorBoundary',
    });

    this.setState({
      error,
      errorInfo,
    });

    // TODO: Send to error monitoring service (Sentry, LogRocket, etc.)
    // if (isProduction) {
    //   Sentry.captureException(error, {
    //     contexts: {
    //       react: {
    //         componentStack: errorInfo.componentStack,
    //       },
    //     },
    //   });
    // }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 rounded-full">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 text-center mb-4">
                Oups, une erreur est survenue
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Ne vous inquiétez pas, nos équipes ont été notifiées et travaillent à résoudre le problème.
              </p>

              {/* Error Details (Development only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <summary className="cursor-pointer font-medium text-gray-900 mb-2">
                    Détails de l'erreur (dev only)
                  </summary>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Message:</p>
                      <pre className="text-xs text-red-600 overflow-x-auto p-2 bg-white rounded">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Component Stack:</p>
                        <pre className="text-xs text-gray-600 overflow-x-auto p-2 bg-white rounded max-h-40 overflow-y-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="w-5 h-5" />
                  Réessayer
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-200 transition-all"
                >
                  <Home className="w-5 h-5" />
                  Retour à l'accueil
                </button>
              </div>

              {/* Help Text */}
              <p className="text-center text-sm text-gray-500 mt-8">
                Si le problème persiste, contactez-nous à{' '}
                <a href="mailto:contact@le40.fr" className="text-orange-600 hover:underline">
                  contact@le40.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
