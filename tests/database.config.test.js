/**
 * Database Configuration Tests
 *
 * These tests verify that the environment configuration files
 * exist and contain the required variables for PostgreSQL database connectivity.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BACKEND = path.join(ROOT, 'apps', 'backend');

describe('Database Environment Configuration', () => {
  describe('.env.example file', () => {
    let envExampleContent;

    beforeAll(() => {
      const envExamplePath = path.join(BACKEND, '.env.example');
      envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');
    });

    it('exists in apps/backend', () => {
      expect(fs.existsSync(path.join(BACKEND, '.env.example'))).toBe(true);
    });

    it('is not empty', () => {
      expect(envExampleContent.trim().length).toBeGreaterThan(0);
    });

    it('documents DATABASE_URL variable', () => {
      expect(envExampleContent).toMatch(/DATABASE_URL/m);
    });

    it('documents PORT variable', () => {
      expect(envExampleContent).toMatch(/PORT/m);
    });

    it('documents NODE_ENV variable', () => {
      expect(envExampleContent).toMatch(/NODE_ENV/m);
    });

    it('DATABASE_URL has a postgresql example value', () => {
      expect(envExampleContent).toMatch(/postgresql:\/\//m);
    });

    it('has a valid PORT example value', () => {
      expect(envExampleContent).toMatch(/PORT=\d+/m);
    });
  });

  describe('.env file', () => {
    let envContent;

    beforeAll(() => {
      const envPath = path.join(BACKEND, '.env');
      envContent = fs.readFileSync(envPath, 'utf-8');
    });

    it('exists in apps/backend', () => {
      expect(fs.existsSync(path.join(BACKEND, '.env'))).toBe(true);
    });

    it('is not empty', () => {
      expect(envContent.trim().length).toBeGreaterThan(0);
    });

    it('contains DATABASE_URL', () => {
      expect(envContent).toMatch(/DATABASE_URL/m);
    });

    it('contains PORT', () => {
      expect(envContent).toMatch(/PORT/m);
    });

    it('contains NODE_ENV', () => {
      expect(envContent).toMatch(/NODE_ENV/m);
    });

    it('DATABASE_URL uses postgresql protocol', () => {
      expect(envContent).toMatch(/DATABASE_URL=postgresql:\/\//m);
    });

    it('has a valid PORT value', () => {
      expect(envContent).toMatch(/PORT=\d+/m);
    });
  });

  describe('.gitignore protects .env file', () => {
    let gitignoreContent;

    beforeAll(() => {
      const gitignorePath = path.join(ROOT, '.gitignore');
      gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    });

    it('.gitignore exists', () => {
      expect(fs.existsSync(path.join(ROOT, '.gitignore'))).toBe(true);
    });

    it('ignores .env files', () => {
      expect(gitignoreContent).toMatch(/\.env/m);
    });

    it('does not ignore .env.example', () => {
      // .env.example should NOT be ignored (it's documentation)
      const lines = gitignoreContent.split('\n').map(l => l.trim());
      const blocksExample = lines.some(line =>
        line === '.env.example' || line === '*.env.example'
      );
      expect(blocksExample).toBe(false);
    });
  });

  describe('DatabaseConfig service', () => {
    const DatabaseConfig = require('../apps/backend/src/database/database.config');

    it('exports a getDatabaseConfig function or object', () => {
      expect(DatabaseConfig).toBeDefined();
      const exported = DatabaseConfig.default || DatabaseConfig.getDatabaseConfig || DatabaseConfig;
      expect(exported).toBeDefined();
    });

    it('getDatabaseConfig returns database configuration object', () => {
      const getDatabaseConfig = DatabaseConfig.getDatabaseConfig || DatabaseConfig.default;
      expect(typeof getDatabaseConfig).toBe('function');
      const config = getDatabaseConfig({
        DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
        PORT: '3000',
        NODE_ENV: 'test',
      });
      expect(config).toBeDefined();
      expect(typeof config).toBe('object');
    });

    it('getDatabaseConfig returns databaseUrl', () => {
      const getDatabaseConfig = DatabaseConfig.getDatabaseConfig || DatabaseConfig.default;
      const config = getDatabaseConfig({
        DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
        PORT: '3000',
        NODE_ENV: 'test',
      });
      expect(config.databaseUrl).toBe('postgresql://user:pass@localhost:5432/testdb');
    });

    it('getDatabaseConfig returns port as number', () => {
      const getDatabaseConfig = DatabaseConfig.getDatabaseConfig || DatabaseConfig.default;
      const config = getDatabaseConfig({
        DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
        PORT: '3000',
        NODE_ENV: 'test',
      });
      expect(config.port).toBe(3000);
    });

    it('getDatabaseConfig returns nodeEnv', () => {
      const getDatabaseConfig = DatabaseConfig.getDatabaseConfig || DatabaseConfig.default;
      const config = getDatabaseConfig({
        DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
        PORT: '3000',
        NODE_ENV: 'test',
      });
      expect(config.nodeEnv).toBe('test');
    });

    it('getDatabaseConfig uses default PORT of 3000 when not provided', () => {
      const getDatabaseConfig = DatabaseConfig.getDatabaseConfig || DatabaseConfig.default;
      const config = getDatabaseConfig({
        DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
      });
      expect(config.port).toBe(3000);
    });

    it('throws or returns undefined databaseUrl when DATABASE_URL is missing', () => {
      const getDatabaseConfig = DatabaseConfig.getDatabaseConfig || DatabaseConfig.default;
      const config = getDatabaseConfig({});
      // Either throws or returns undefined/null for databaseUrl
      expect(config.databaseUrl == null || config.databaseUrl === '').toBe(true);
    });
  });

  describe('Backend DatabaseConfig NestJS module', () => {
    it('database config file exists', () => {
      const configPath = path.join(BACKEND, 'src', 'database', 'database.config.js');
      const configTsPath = path.join(BACKEND, 'src', 'database', 'database.config.ts');
      // Either compiled JS or TS source should exist
      expect(fs.existsSync(configPath) || fs.existsSync(configTsPath)).toBe(true);
    });
  });
});
