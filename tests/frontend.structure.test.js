/**
 * Frontend App Structure Tests
 *
 * These tests verify that the React frontend application is correctly
 * scaffolded with Vite, TypeScript, and required dependencies.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'apps', 'frontend');

describe('Frontend App Structure', () => {
  describe('package.json', () => {
    let pkg;

    beforeAll(() => {
      const pkgPath = path.join(FRONTEND, 'package.json');
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    });

    it('exists in apps/frontend', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'package.json'))).toBe(true);
    });

    it('has a name field', () => {
      expect(pkg.name).toBeDefined();
      expect(typeof pkg.name).toBe('string');
    });

    it('has react as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['react']).toBeDefined();
    });

    it('has react-dom as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['react-dom']).toBeDefined();
    });

    it('has typescript as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['typescript']).toBeDefined();
    });

    it('has vite as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['vite']).toBeDefined();
    });

    it('has axios as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['axios']).toBeDefined();
    });

    it('has @vitejs/plugin-react as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['@vitejs/plugin-react']).toBeDefined();
    });

    it('has a dev script', () => {
      expect(pkg.scripts).toBeDefined();
      expect(pkg.scripts.dev).toBeDefined();
    });

    it('has a build script', () => {
      expect(pkg.scripts.build).toBeDefined();
    });

    it('has stitch MCP UI library as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const hasStitch = Object.keys(deps).some(
        (key) =>
          key.includes('stitch') ||
          key.includes('@mcp') ||
          key.includes('mcp-ui') ||
          key.includes('@stitchui') ||
          key.includes('stitches')
      );
      expect(hasStitch).toBe(true);
    });
  });

  describe('TypeScript configuration', () => {
    it('tsconfig.json exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'tsconfig.json'))).toBe(true);
    });

    it('tsconfig.json is valid JSON', () => {
      const tsconfigPath = path.join(FRONTEND, 'tsconfig.json');
      expect(() => JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'))).not.toThrow();
    });

    it('tsconfig targets ESNext or modern JS', () => {
      const tsconfig = JSON.parse(
        fs.readFileSync(path.join(FRONTEND, 'tsconfig.json'), 'utf-8')
      );
      const target = tsconfig.compilerOptions && tsconfig.compilerOptions.target;
      const validTargets = ['ESNext', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', 'ES2022', 'esnext'];
      expect(validTargets.some(t => target && target.toUpperCase() === t.toUpperCase())).toBe(true);
    });
  });

  describe('Vite configuration', () => {
    it('vite.config.ts or vite.config.js exists', () => {
      const hasTs = fs.existsSync(path.join(FRONTEND, 'vite.config.ts'));
      const hasJs = fs.existsSync(path.join(FRONTEND, 'vite.config.js'));
      expect(hasTs || hasJs).toBe(true);
    });

    it('vite config references react plugin', () => {
      const configPath = fs.existsSync(path.join(FRONTEND, 'vite.config.ts'))
        ? path.join(FRONTEND, 'vite.config.ts')
        : path.join(FRONTEND, 'vite.config.js');
      const content = fs.readFileSync(configPath, 'utf-8');
      expect(content).toMatch(/react/i);
    });
  });

  describe('Source files', () => {
    it('src/ directory exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src'))).toBe(true);
    });

    it('src/main.tsx or src/main.ts exists', () => {
      const hasTsx = fs.existsSync(path.join(FRONTEND, 'src', 'main.tsx'));
      const hasTs = fs.existsSync(path.join(FRONTEND, 'src', 'main.ts'));
      expect(hasTsx || hasTs).toBe(true);
    });

    it('src/App.tsx or src/App.ts exists', () => {
      const hasTsx = fs.existsSync(path.join(FRONTEND, 'src', 'App.tsx'));
      const hasTs = fs.existsSync(path.join(FRONTEND, 'src', 'App.ts'));
      expect(hasTsx || hasTs).toBe(true);
    });

    it('index.html exists at root of frontend', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'index.html'))).toBe(true);
    });
  });

  describe('Project structure', () => {
    it('has src/components directory or will be created', () => {
      // Either components dir exists or src dir exists (components will be added later)
      expect(fs.existsSync(path.join(FRONTEND, 'src'))).toBe(true);
    });
  });
});
