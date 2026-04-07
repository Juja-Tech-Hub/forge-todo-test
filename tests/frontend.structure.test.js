/**
 * Frontend App Structure Tests
 *
 * These tests verify that the React frontend app is correctly scaffolded
 * with Vite + TypeScript, required dependencies, and project structure.
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

    it('has a preview script', () => {
      expect(pkg.scripts.preview).toBeDefined();
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
      const validTargets = ['ESNext', 'ES2022', 'ES2021', 'ES2020', 'ES2019', 'ES2018', 'ES6', 'ES2015'];
      expect(validTargets.map(t => t.toLowerCase())).toContain((target || '').toLowerCase());
    });

    it('tsconfig has strict mode or strict-related flags', () => {
      const tsconfig = JSON.parse(
        fs.readFileSync(path.join(FRONTEND, 'tsconfig.json'), 'utf-8')
      );
      const co = tsconfig.compilerOptions || {};
      const hasStrict = co.strict === true || co.noImplicitAny === true || co.strictNullChecks === true;
      expect(hasStrict).toBe(true);
    });
  });

  describe('Vite configuration', () => {
    it('vite.config.ts or vite.config.js exists', () => {
      const tsExists = fs.existsSync(path.join(FRONTEND, 'vite.config.ts'));
      const jsExists = fs.existsSync(path.join(FRONTEND, 'vite.config.js'));
      expect(tsExists || jsExists).toBe(true);
    });

    it('vite config references react plugin', () => {
      const tsPath = path.join(FRONTEND, 'vite.config.ts');
      const jsPath = path.join(FRONTEND, 'vite.config.js');
      const configPath = fs.existsSync(tsPath) ? tsPath : jsPath;
      const content = fs.readFileSync(configPath, 'utf-8');
      expect(content).toMatch(/react/i);
    });
  });

  describe('Source files', () => {
    it('src/ directory exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src'))).toBe(true);
    });

    it('src/main.tsx exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src', 'main.tsx'))).toBe(true);
    });

    it('src/App.tsx exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src', 'App.tsx'))).toBe(true);
    });

    it('index.html exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'index.html'))).toBe(true);
    });

    it('index.html references main entry point', () => {
      const content = fs.readFileSync(path.join(FRONTEND, 'index.html'), 'utf-8');
      expect(content).toMatch(/src\/main/i);
    });
  });

  describe('Stitch MCP UI library', () => {
    it('has @mongodb/stitch or a stitch-related UI package OR a ui-library placeholder', () => {
      const pkgPath = path.join(FRONTEND, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
        ...pkg.peerDependencies
      };
      const hasStitch = Object.keys(allDeps).some(
        key => key.includes('stitch') || key.includes('@leafygreen-ui') || key.includes('leafygreen') || key.includes('@mongodb')
      );
      expect(hasStitch).toBe(true);
    });
  });

  describe('Axios', () => {
    it('axios is listed in dependencies', () => {
      const pkgPath = path.join(FRONTEND, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const deps = pkg.dependencies || {};
      expect(deps['axios']).toBeDefined();
    });
  });
});
