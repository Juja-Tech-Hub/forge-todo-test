/**
 * Database configuration module
 * Provides typed access to database-related environment variables
 */

export interface DatabaseConfigOptions {
  databaseUrl: string | undefined;
  port: number;
  nodeEnv: string;
}

export function getDatabaseConfig(): DatabaseConfigOptions {
  return {
    databaseUrl: process.env.DATABASE_URL,
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  };
}

export const databaseConfig = getDatabaseConfig;
