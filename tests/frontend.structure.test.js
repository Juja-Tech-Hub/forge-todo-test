/**
 * Frontend App Structure Tests
 *
 * These tests verify that the React frontend app is correctly scaffolded
 * with Vite + TypeScript, required dependencies, and base project structure.
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

    it('has axios as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['axios']).toBeDefined();
    });

    it('has vite as a dev dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['vite']).toBeDefined();
    });

    it('has @vitejs/plugin-react as a dev dependency', () => {
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
        (dep) =>
          dep.includes('stitch') ||
          dep.includes('@stitches') ||
          dep.includes('stitch-ui') ||
          dep.includes('@stitch')
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
      expect(target).toMatch(/ES(Next|2015|2016|2017|2018|2019|2020|2021|2022)/i);
    });

    it('tsconfig has strict mode enabled', () => {
      const tsconfig = JSON.parse(
        fs.readFileSync(path.join(FRONTEND, 'tsconfig.json'), 'utf-8')
      );
      expect(tsconfig.compilerOptions && tsconfig.compilerOptions.strict).toBe(true);
    });
  });

  describe('Vite configuration', () => {
    it('vite.config.ts or vite.config.js exists', () => {
      const hasTs = fs.existsSync(path.join(FRONTEND, 'vite.config.ts'));
      const hasJs = fs.existsSync(path.join(FRONTEND, 'vite.config.js'));
      expect(hasTs || hasJs).toBe(true);
    });

    it('vite config references react plugin', () => {
      const tsPath = path.join(FRONTEND, 'vite.config.ts');
      const jsPath = path.join(FRONTEND, 'vite.config.js');
      const configPath = fs.existsSync(tsPath) ? tsPath : jsPath;
      const content = fs.readFileSync(configPath, 'utf-8');
      expect(content).toMatch(/@vitejs\/plugin-react/);
    });
  });

  describe('Source structure', () => {
    it('src/ directory exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src'))).toBe(true);
    });

    it('src/main.tsx exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src', 'main.tsx'))).toBe(true);
    });

    it('src/App.tsx exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src', 'App.tsx'))).toBe(true);
    });

    it('index.html exists at root of frontend app', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'index.html'))).toBe(true);
    });

    it('index.html references main entry point', () => {
      const content = fs.readFileSync(path.join(FRONTEND, 'index.html'), 'utf-8');
      expect(content).toMatch(/src\/main/);
    });
  });

  describe('TypeScript source files', () => {
    it('src/main.tsx contains ReactDOM render or createRoot', () => {
      const content = fs.readFileSync(
        path.join(FRONTEND, 'src', 'main.tsx'),
        'utf-8'
      );
      expect(content).toMatch(/createRoot|ReactDOM/);
    });

    it('src/App.tsx exports a default component', () => {
      const content = fs.readFileSync(
        path.join(FRONTEND, 'src', 'App.tsx'),
        'utf-8'
      );
      expect(content).toMatch(/export default/);
    });

    it('src/App.tsx imports React or uses JSX', () => {
      const content = fs.readFileSync(
        path.join(FRONTEND, 'src', 'App.tsx'),
        'utf-8'
      );
      const hasReactImport = content.includes("import React") || content.includes('import React');
      const hasJSX = content.includes('<') && content.includes('/>');
      expect(hasReactImport || hasJSX).toBe(true);
    });
  });

  describe('Stitch MCP UI library integration', () => {
    it('stitch package is listed in dependencies', () => {
      const pkgPath = path.join(FRONTEND, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      const hasStitch = Object.keys(allDeps).some(
        (dep) =>
          dep.includes('stitch') ||
          dep.includes('@stitches') ||
          dep.includes('@stitch')
      );
      expect(hasStitch).toBe(true);
    });
  });
});
