/**
 * Logger utilitaire pour le développement
 * En production, les logs sont désactivés sauf pour les erreurs critiques
 */

const isDev = import.meta.env.DEV;

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  prefix?: string;
  forceInProd?: boolean;
}

function formatMessage(level: LogLevel, prefix: string, message: string): string {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  return `[${timestamp}] [${level.toUpperCase()}]${prefix ? ` [${prefix}]` : ''} ${message}`;
}

export const logger = {
  debug(message: string, data?: unknown, options?: LoggerOptions) {
    if (isDev || options?.forceInProd) {
      console.log(formatMessage('debug', options?.prefix || '', message), data ?? '');
    }
  },

  info(message: string, data?: unknown, options?: LoggerOptions) {
    if (isDev || options?.forceInProd) {
      console.info(formatMessage('info', options?.prefix || '', message), data ?? '');
    }
  },

  warn(message: string, data?: unknown, options?: LoggerOptions) {
    if (isDev || options?.forceInProd) {
      console.warn(formatMessage('warn', options?.prefix || '', message), data ?? '');
    }
  },

  error(message: string, error?: unknown, options?: LoggerOptions) {
    // Les erreurs sont toujours loggées (pour le monitoring)
    console.error(formatMessage('error', options?.prefix || '', message), error ?? '');
  },

  // Pour les tables de données
  table(data: unknown, options?: LoggerOptions) {
    if (isDev || options?.forceInProd) {
      console.table(data);
    }
  },

  // Pour le groupement de logs
  group(label: string, fn: () => void, options?: LoggerOptions) {
    if (isDev || options?.forceInProd) {
      console.group(label);
      fn();
      console.groupEnd();
    }
  }
};

// Export pour usage simplifié
export const log = logger.debug;
export const logInfo = logger.info;
export const logWarn = logger.warn;
export const logError = logger.error;

export default logger;
