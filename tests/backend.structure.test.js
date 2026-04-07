/**
 * Backend NestJS Structure Tests
 *
 * These tests verify that the NestJS backend application is correctly
 * scaffolded with the expected files, configurations, and dependencies.
 */

const fs = require('fs');
const path = require('path');

const BACKEND = path.resolve(__dirname, '..', 'apps', 'backend');

describe('Backend NestJS Application Structure', () => {
  describe('package.json', () => {
    let pkg;

    beforeAll(() => {
      const pkgPath = path.join(BACKEND, 'package.json');
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    });

    it('exists in apps/backend', () => {
      expect(fs.existsSync(path.join(BACKEND, 'package.json'))).toBe(true);
    });

    it('has a name field', () => {
      expect(pkg.name).toBeDefined();
      expect(typeof pkg.name).toBe('string');
    });

    it('has NestJS core dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['@nestjs/core']).toBeDefined();
    });

    it('has NestJS common dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['@nestjs/common']).toBeDefined();
    });

    it('has NestJS platform-express dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['@nestjs/platform-express']).toBeDefined();
    });

    it('has @nestjs/config dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['@nestjs/config']).toBeDefined();
    });

    it('has class-validator dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['class-validator']).toBeDefined();
    });

    it('has class-transformer dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['class-transformer']).toBeDefined();
    });

    it('has a build script', () => {
      expect(pkg.scripts).toBeDefined();
      expect(pkg.scripts.build).toBeDefined();
    });

    it('has a start script', () => {
      expect(pkg.scripts.start).toBeDefined();
    });

    it('has a test script', () => {
      expect(pkg.scripts.test).toBeDefined();
    });
  });

  describe('TypeScript configuration', () => {
    let tsConfig;

    beforeAll(() => {
      const tsConfigPath = path.join(BACKEND, 'tsconfig.json');
      tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
    });

    it('tsconfig.json exists', () => {
      expect(fs.existsSync(path.join(BACKEND, 'tsconfig.json'))).toBe(true);
    });

    it('has strict mode enabled', () => {
      const compilerOptions = tsConfig.compilerOptions || {};
      // strict mode can be set via "strict": true or individually
      const hasStrict =
        compilerOptions.strict === true ||
        (compilerOptions.strictNullChecks === true &&
          compilerOptions.noImplicitAny === true);
      expect(hasStrict).toBe(true);
    });

    it('targets ES2017 or later', () => {
      const compilerOptions = tsConfig.compilerOptions || {};
      const validTargets = [
        'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', 'ES2022', 'ESNext',
        'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'
      ];
      expect(validTargets).toContain(compilerOptions.target);
    });

    it('has experimentalDecorators enabled', () => {
      const compilerOptions = tsConfig.compilerOptions || {};
      expect(compilerOptions.experimentalDecorators).toBe(true);
    });

    it('has emitDecoratorMetadata enabled', () => {
      const compilerOptions = tsConfig.compilerOptions || {};
      expect(compilerOptions.emitDecoratorMetadata).toBe(true);
    });
  });

  describe('Source files', () => {
    it('src/ directory exists', () => {
      expect(fs.existsSync(path.join(BACKEND, 'src'))).toBe(true);
    });

    it('src/main.ts exists', () => {
      expect(fs.existsSync(path.join(BACKEND, 'src', 'main.ts'))).toBe(true);
    });

    it('src/app.module.ts exists', () => {
      expect(fs.existsSync(path.join(BACKEND, 'src', 'app.module.ts'))).toBe(true);
    });

    it('src/app.controller.ts exists', () => {
      expect(fs.existsSync(path.join(BACKEND, 'src', 'app.controller.ts'))).toBe(true);
    });

    it('src/app.service.ts exists', () => {
      expect(fs.existsSync(path.join(BACKEND, 'src', 'app.service.ts'))).toBe(true);
    });
  });

  describe('AppModule configuration', () => {
    let appModuleContent;

    beforeAll(() => {
      const appModulePath = path.join(BACKEND, 'src', 'app.module.ts');
      appModuleContent = fs.readFileSync(appModulePath, 'utf-8');
    });

    it('imports ConfigModule', () => {
      expect(appModuleContent).toMatch(/ConfigModule/);
    });

    it('imports @nestjs/config', () => {
      expect(appModuleContent).toMatch(/@nestjs\/config/);
    });

    it('calls ConfigModule.forRoot', () => {
      expect(appModuleContent).toMatch(/ConfigModule\.forRoot/);
    });

    it('has @Module decorator', () => {
      expect(appModuleContent).toMatch(/@Module/);
    });

    it('exports AppModule class', () => {
      expect(appModuleContent).toMatch(/export class AppModule/);
    });
  });

  describe('main.ts bootstrap', () => {
    let mainContent;

    beforeAll(() => {
      const mainPath = path.join(BACKEND, 'src', 'main.ts');
      mainContent = fs.readFileSync(mainPath, 'utf-8');
    });

    it('creates a NestJS application', () => {
      expect(mainContent).toMatch(/NestFactory\.create/);
    });

    it('imports AppModule', () => {
      expect(mainContent).toMatch(/AppModule/);
    });

    it('calls app.listen', () => {
      expect(mainContent).toMatch(/app\.listen/);
    });
  });

  describe('NestJS test configuration', () => {
    it('jest configuration exists (jest.config or package.json jest field)', () => {
      const hasJestConfig =
        fs.existsSync(path.join(BACKEND, 'jest.config.js')) ||
        fs.existsSync(path.join(BACKEND, 'jest.config.ts')) ||
        (() => {
          try {
            const pkg = JSON.parse(
              fs.readFileSync(path.join(BACKEND, 'package.json'), 'utf-8')
            );
            return pkg.jest !== undefined;
          } catch {
            return false;
          }
        })();
      expect(hasJestConfig).toBe(true);
    });

    it('test directory or spec files exist', () => {
      const hasTestDir = fs.existsSync(path.join(BACKEND, 'test'));
      const hasSpecFiles = fs.existsSync(path.join(BACKEND, 'src', 'app.controller.spec.ts'));
      expect(hasTestDir || hasSpecFiles).toBe(true);
    });
  });
});
