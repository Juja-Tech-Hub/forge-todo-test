/**
 * Database configuration module
 * Provides typed access to database-related environment variables
 */

export interface DatabaseConfigOptions {
  databaseUrl: string | undefined;
  port: number;
  nodeEnv: string;
}

export type EnvRecord = Record<string, string | undefined>;

export function getDatabaseConfig(
  env: EnvRecord = process.env as EnvRecord,
): DatabaseConfigOptions {
  return {
    databaseUrl: env['DATABASE_URL'],
    port: parseInt(env['PORT'] ?? '3000', 10),
    nodeEnv: env['NODE_ENV'] ?? 'development',
  };
}

export const databaseConfig = getDatabaseConfig;
