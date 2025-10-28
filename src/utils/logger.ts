import { isProduction, isErrorLoggingEnabled } from './env';

/**
 * Types de logs
 */
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * Interface pour les erreurs structurées
 */
interface LogContext {
  context?: string;
  userId?: string;
  sessionId?: string;
  [key: string]: unknown;
}

/**
 * Logger sécurisé qui ne logue pas d'informations sensibles en production
 */
class Logger {
  private shouldLog(level: LogLevel): boolean {
    // En développement, on logue tout
    if (!isProduction) {
      return true;
    }

    // En production, on respecte la configuration
    if (!isErrorLoggingEnabled) {
      return false;
    }

    // En production, on logue seulement les erreurs
    return level === 'error';
  }

  /**
   * Sanitize les données avant de les logger (retire les données sensibles)
   */
  private sanitize(data: unknown): unknown {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const sanitized = { ...data } as Record<string, unknown>;
    const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'authorization'];

    for (const key of Object.keys(sanitized)) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  /**
   * Log une information
   */
  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      console.log(`[INFO] ${message}`, this.sanitize(context));
    }
  }

  /**
   * Log un avertissement
   */
  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, this.sanitize(context));
    }
  }

  /**
   * Log une erreur
   */
  error(message: string, error?: unknown, context?: LogContext): void {
    if (this.shouldLog('error')) {
      const errorDetails = error instanceof Error
        ? { name: error.name, message: error.message, stack: isProduction ? undefined : error.stack }
        : error;

      console.error(`[ERROR] ${message}`, {
        error: this.sanitize(errorDetails),
        context: this.sanitize(context),
        timestamp: new Date().toISOString(),
      });

      // TODO: En production, envoyer à un service de monitoring (Sentry, LogRocket, etc.)
      // if (isProduction) {
      //   this.sendToMonitoring(message, error, context);
      // }
    }
  }

  /**
   * Log de debug (uniquement en développement)
   */
  debug(message: string, data?: unknown): void {
    if (this.shouldLog('debug')) {
      console.debug(`[DEBUG] ${message}`, this.sanitize(data));
    }
  }

  /**
   * TODO: Envoyer les erreurs à un service de monitoring
   */
  // private sendToMonitoring(message: string, error: unknown, context?: LogContext): void {
  //   // Intégration future avec Sentry, LogRocket, ou autre service
  // }
}

/**
 * Instance singleton du logger
 */
export const logger = new Logger();
