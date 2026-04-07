/**
 * Frontend App Structure Tests
 *
 * These tests verify that the React frontend app is correctly scaffolded
 * with the expected files, configurations, and dependencies.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'apps', 'frontend');

describe('Frontend App Structure', () => {
  describe('Directory structure', () => {
    it('apps/frontend exists', () => {
      expect(fs.existsSync(FRONTEND)).toBe(true);
    });

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
  });

  describe('package.json', () => {
    let pkg;

    beforeAll(() => {
      const pkgPath = path.join(FRONTEND, 'package.json');
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    });

    it('exists', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'package.json'))).toBe(true);
    });

    it('has a name field', () => {
      expect(pkg.name).toBeDefined();
    });

    it('has react as a dependency', () => {
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(allDeps['react']).toBeDefined();
    });

    it('has react-dom as a dependency', () => {
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(allDeps['react-dom']).toBeDefined();
    });

    it('has axios as a dependency', () => {
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(allDeps['axios']).toBeDefined();
    });

    it('has a Stitch MCP UI library dependency', () => {
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      const hasStitch = Object.keys(allDeps).some(
        (dep) =>
          dep.includes('stitch') ||
          dep.includes('@stitches') ||
          dep.includes('mcp-ui') ||
          dep.includes('@mcp')
      );
      expect(hasStitch).toBe(true);
    });

    it('has vite as a dev dependency', () => {
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(allDeps['vite']).toBeDefined();
    });

    it('has typescript as a dev dependency', () => {
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(allDeps['typescript']).toBeDefined();
    });

    it('has a dev script', () => {
      expect(pkg.scripts).toBeDefined();
      expect(pkg.scripts.dev).toBeDefined();
    });

    it('has a build script', () => {
      expect(pkg.scripts).toBeDefined();
      expect(pkg.scripts.build).toBeDefined();
    });

    it('dev script uses vite', () => {
      expect(pkg.scripts.dev).toMatch(/vite/);
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
      expect(target).toMatch(/ES(Next|2015|2016|2017|2018|2019|2020|2021|2022|2023)/i);
    });

    it('tsconfig includes react jsx', () => {
      const tsconfig = JSON.parse(
        fs.readFileSync(path.join(FRONTEND, 'tsconfig.json'), 'utf-8')
      );
      const jsx = tsconfig.compilerOptions && tsconfig.compilerOptions.jsx;
      expect(jsx).toMatch(/react/);
    });
  });

  describe('Vite configuration', () => {
    it('vite.config.ts or vite.config.js exists', () => {
      const tsConfig = fs.existsSync(path.join(FRONTEND, 'vite.config.ts'));
      const jsConfig = fs.existsSync(path.join(FRONTEND, 'vite.config.js'));
      expect(tsConfig || jsConfig).toBe(true);
    });

    it('vite config references react plugin', () => {
      let configContent = '';
      const tsPath = path.join(FRONTEND, 'vite.config.ts');
      const jsPath = path.join(FRONTEND, 'vite.config.js');
      if (fs.existsSync(tsPath)) {
        configContent = fs.readFileSync(tsPath, 'utf-8');
      } else if (fs.existsSync(jsPath)) {
        configContent = fs.readFileSync(jsPath, 'utf-8');
      }
      expect(configContent).toMatch(/react/i);
    });
  });

  describe('Source files', () => {
    it('main.tsx has ReactDOM render or createRoot', () => {
      const mainContent = fs.readFileSync(
        path.join(FRONTEND, 'src', 'main.tsx'),
        'utf-8'
      );
      expect(mainContent).toMatch(/ReactDOM|createRoot/);
    });

    it('App.tsx exports a default component', () => {
      const appContent = fs.readFileSync(
        path.join(FRONTEND, 'src', 'App.tsx'),
        'utf-8'
      );
      expect(appContent).toMatch(/export default/);
    });

    it('index.html has a root div', () => {
      const htmlContent = fs.readFileSync(
        path.join(FRONTEND, 'index.html'),
        'utf-8'
      );
      expect(htmlContent).toMatch(/<div[^>]+id=["']root["']/);
    });

    it('index.html references main entry point', () => {
      const htmlContent = fs.readFileSync(
        path.join(FRONTEND, 'index.html'),
        'utf-8'
      );
      expect(htmlContent).toMatch(/src\/main\.(tsx|jsx|ts|js)/);
    });
  });
});
