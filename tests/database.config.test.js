/**
 * Database Configuration Tests
 *
 * These tests verify that the database configuration is correctly set up
 * with the required environment variables and configuration files.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BACKEND = path.join(ROOT, 'apps', 'backend');

describe('Database Configuration', () => {
  describe('.env.example file', () => {
    let envExampleContent;

    beforeAll(() => {
      const envExamplePath = path.join(BACKEND, '.env.example');
      envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');
    });

    it('exists in apps/backend', () => {
      expect(fs.existsSync(path.join(BACKEND, '.env.example'))).toBe(true);
    });

    it('documents DATABASE_URL variable', () => {
      expect(envExampleContent).toMatch(/DATABASE_URL/);
    });

    it('documents PORT variable', () => {
      expect(envExampleContent).toMatch(/PORT/);
    });

    it('documents NODE_ENV variable', () => {
      expect(envExampleContent).toMatch(/NODE_ENV/);
    });

    it('has a valid PostgreSQL DATABASE_URL example', () => {
      expect(envExampleContent).toMatch(/postgresql:\/\/|postgres:\/\//);
    });
  });

  describe('.env file', () => {
    it('exists in apps/backend', () => {
      expect(fs.existsSync(path.join(BACKEND, '.env'))).toBe(true);
    });

    it('contains DATABASE_URL', () => {
      const envContent = fs.readFileSync(path.join(BACKEND, '.env'), 'utf-8');
      expect(envContent).toMatch(/DATABASE_URL/);
    });

    it('contains PORT', () => {
      const envContent = fs.readFileSync(path.join(BACKEND, '.env'), 'utf-8');
      expect(envContent).toMatch(/PORT/);
    });

    it('has a valid PostgreSQL connection string', () => {
      const envContent = fs.readFileSync(path.join(BACKEND, '.env'), 'utf-8');
      expect(envContent).toMatch(/DATABASE_URL\s*=\s*(postgresql|postgres):\/\//);
    });
  });

  describe('.gitignore includes .env', () => {
    it('root .gitignore ignores .env files', () => {
      const gitignorePath = path.join(ROOT, '.gitignore');
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
      expect(gitignoreContent).toMatch(/\.env/);
    });
  });

  describe('DatabaseConfig service', () => {
    const DatabaseConfig = require('../apps/backend/src/database/database.config');

    it('exports a getDatabaseConfig function or object', () => {
      expect(DatabaseConfig).toBeDefined();
    });

    it('exports getDatabaseConfig as a function', () => {
      expect(typeof DatabaseConfig.getDatabaseConfig).toBe('function');
    });

    it('getDatabaseConfig returns an object with databaseUrl', () => {
      const config = DatabaseConfig.getDatabaseConfig();
      expect(config).toHaveProperty('databaseUrl');
    });

    it('getDatabaseConfig returns an object with port', () => {
      const config = DatabaseConfig.getDatabaseConfig();
      expect(config).toHaveProperty('port');
    });

    it('getDatabaseConfig returns an object with nodeEnv', () => {
      const config = DatabaseConfig.getDatabaseConfig();
      expect(config).toHaveProperty('nodeEnv');
    });

    it('port is a number', () => {
      const config = DatabaseConfig.getDatabaseConfig();
      expect(typeof config.port).toBe('number');
    });

    it('nodeEnv defaults to development when NODE_ENV is not set', () => {
      const originalEnv = process.env.NODE_ENV;
      delete process.env.NODE_ENV;
      const config = DatabaseConfig.getDatabaseConfig();
      expect(config.nodeEnv).toBe('development');
      process.env.NODE_ENV = originalEnv;
    });

    it('port defaults to 3000 when PORT is not set', () => {
      const originalPort = process.env.PORT;
      delete process.env.PORT;
      const config = DatabaseConfig.getDatabaseConfig();
      expect(config.port).toBe(3000);
      if (originalPort !== undefined) {
        process.env.PORT = originalPort;
      }
    });

    it('reads DATABASE_URL from environment', () => {
      const testUrl = 'postgresql://test:test@localhost:5432/testdb';
      process.env.DATABASE_URL = testUrl;
      const config = DatabaseConfig.getDatabaseConfig();
      expect(config.databaseUrl).toBe(testUrl);
      delete process.env.DATABASE_URL;
    });
  });
});
