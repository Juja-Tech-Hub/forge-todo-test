/**
 * Prisma ORM Configuration Tests
 *
 * These tests verify that Prisma is correctly installed and configured
 * with a PostgreSQL datasource reading from the DATABASE_URL env variable.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BACKEND = path.join(ROOT, 'apps', 'backend');

describe('Prisma ORM Configuration', () => {
  describe('prisma/schema.prisma file', () => {
    let schemaContent;

    beforeAll(() => {
      const schemaPath = path.join(BACKEND, 'prisma', 'schema.prisma');
      schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    });

    it('exists at apps/backend/prisma/schema.prisma', () => {
      expect(
        fs.existsSync(path.join(BACKEND, 'prisma', 'schema.prisma'))
      ).toBe(true);
    });

    it('has a datasource block', () => {
      expect(schemaContent).toMatch(/datasource\s+\w+\s*\{/);
    });

    it('configures PostgreSQL as the provider', () => {
      expect(schemaContent).toMatch(/provider\s*=\s*["']postgresql["']/);
    });

    it('reads DATABASE_URL from environment', () => {
      expect(schemaContent).toMatch(/url\s*=\s*env\(["']DATABASE_URL["']\)/);
    });

    it('has a generator block', () => {
      expect(schemaContent).toMatch(/generator\s+\w+\s*\{/);
    });

    it('uses prisma-client-js as the generator provider', () => {
      expect(schemaContent).toMatch(/provider\s*=\s*["']prisma-client-js["']/);
    });
  });

  describe('backend package.json includes @prisma/client', () => {
    let pkg;

    beforeAll(() => {
      const pkgPath = path.join(BACKEND, 'package.json');
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    });

    it('has @prisma/client in dependencies', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['@prisma/client']).toBeDefined();
    });

    it('has prisma CLI in devDependencies', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['prisma']).toBeDefined();
    });
  });

  describe('PrismaService exists', () => {
    it('src/prisma/prisma.service.ts exists', () => {
      expect(
        fs.existsSync(
          path.join(BACKEND, 'src', 'prisma', 'prisma.service.ts')
        )
      ).toBe(true);
    });

    it('src/prisma/prisma.module.ts exists', () => {
      expect(
        fs.existsSync(
          path.join(BACKEND, 'src', 'prisma', 'prisma.module.ts')
        )
      ).toBe(true);
    });

    it('PrismaService extends PrismaClient', () => {
      const serviceContent = fs.readFileSync(
        path.join(BACKEND, 'src', 'prisma', 'prisma.service.ts'),
        'utf-8'
      );
      expect(serviceContent).toMatch(/extends\s+PrismaClient/);
    });

    it('PrismaService implements OnModuleInit', () => {
      const serviceContent = fs.readFileSync(
        path.join(BACKEND, 'src', 'prisma', 'prisma.service.ts'),
        'utf-8'
      );
      expect(serviceContent).toMatch(/OnModuleInit/);
    });

    it('PrismaService implements OnModuleDestroy', () => {
      const serviceContent = fs.readFileSync(
        path.join(BACKEND, 'src', 'prisma', 'prisma.service.ts'),
        'utf-8'
      );
      expect(serviceContent).toMatch(/OnModuleDestroy/);
    });

    it('PrismaService calls $connect in onModuleInit', () => {
      const serviceContent = fs.readFileSync(
        path.join(BACKEND, 'src', 'prisma', 'prisma.service.ts'),
        'utf-8'
      );
      expect(serviceContent).toMatch(/\$connect/);
    });

    it('PrismaService calls $disconnect in onModuleDestroy', () => {
      const serviceContent = fs.readFileSync(
        path.join(BACKEND, 'src', 'prisma', 'prisma.service.ts'),
        'utf-8'
      );
      expect(serviceContent).toMatch(/\$disconnect/);
    });
  });

  describe('PrismaModule is global', () => {
    it('PrismaModule has @Global decorator', () => {
      const moduleContent = fs.readFileSync(
        path.join(BACKEND, 'src', 'prisma', 'prisma.module.ts'),
        'utf-8'
      );
      expect(moduleContent).toMatch(/@Global/);
    });

    it('PrismaModule exports PrismaService', () => {
      const moduleContent = fs.readFileSync(
        path.join(BACKEND, 'src', 'prisma', 'prisma.module.ts'),
        'utf-8'
      );
      expect(moduleContent).toMatch(/exports.*PrismaService|PrismaService.*exports/s);
    });
  });

  describe('AppModule imports PrismaModule', () => {
    it('app.module.ts imports PrismaModule', () => {
      const appModuleContent = fs.readFileSync(
        path.join(BACKEND, 'src', 'app.module.ts'),
        'utf-8'
      );
      expect(appModuleContent).toMatch(/PrismaModule/);
    });
  });

  describe('DATABASE_URL environment variable', () => {
    it('.env file has DATABASE_URL pointing to PostgreSQL', () => {
      const envContent = fs.readFileSync(
        path.join(BACKEND, '.env'),
        'utf-8'
      );
      expect(envContent).toMatch(
        /DATABASE_URL\s*=\s*(postgresql|postgres):\/\//
      );
    });

    it('.env.example documents DATABASE_URL', () => {
      const envExampleContent = fs.readFileSync(
        path.join(BACKEND, '.env.example'),
        'utf-8'
      );
      expect(envExampleContent).toMatch(/DATABASE_URL/);
    });
  });
});
