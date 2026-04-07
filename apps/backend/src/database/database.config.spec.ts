import { getDatabaseConfig } from './database.config';

describe('getDatabaseConfig', () => {
  it('should be defined', () => {
    expect(getDatabaseConfig).toBeDefined();
  });

  it('should return databaseUrl from env', () => {
    const config = getDatabaseConfig({
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
      PORT: '3000',
      NODE_ENV: 'test',
    });
    expect(config.databaseUrl).toBe('postgresql://user:pass@localhost:5432/testdb');
  });

  it('should parse PORT as a number', () => {
    const config = getDatabaseConfig({
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
      PORT: '4000',
      NODE_ENV: 'development',
    });
    expect(config.port).toBe(4000);
  });

  it('should default PORT to 3000 when not provided', () => {
    const config = getDatabaseConfig({
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
    });
    expect(config.port).toBe(3000);
  });

  it('should return nodeEnv from env', () => {
    const config = getDatabaseConfig({
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
      PORT: '3000',
      NODE_ENV: 'production',
    });
    expect(config.nodeEnv).toBe('production');
  });

  it('should default nodeEnv to "development" when not provided', () => {
    const config = getDatabaseConfig({
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
    });
    expect(config.nodeEnv).toBe('development');
  });

  it('should return undefined databaseUrl when DATABASE_URL is missing', () => {
    const config = getDatabaseConfig({});
    expect(config.databaseUrl).toBeUndefined();
  });
});
