/**
 * Database configuration factory.
 * Parses and validates environment variables for database connectivity.
 */

export interface DatabaseConfigOptions {
  databaseUrl: string | undefined;
  port: number;
  nodeEnv: string;
}

/**
 * Builds a database configuration object from the provided environment variables.
 * Falls back to sensible defaults where applicable.
 *
 * @param env - An object containing environment variable key-value pairs.
 * @returns A typed database configuration object.
 */
export function getDatabaseConfig(
  env: Record<string, string | undefined>,
): DatabaseConfigOptions {
  return {
    databaseUrl: env['DATABASE_URL'],
    port: env['PORT'] ? parseInt(env['PORT'], 10) : 3000,
    nodeEnv: env['NODE_ENV'] ?? 'development',
  };
}

export default getDatabaseConfig;
