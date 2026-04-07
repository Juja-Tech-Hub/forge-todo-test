/**
 * Frontend Structure Tests
 *
 * These tests verify that the React frontend application is correctly
 * scaffolded with Vite, TypeScript, required dependencies, and base structure.
 */

const fs = require('fs');
const path = require('path');

const FRONTEND = path.resolve(__dirname, '..', 'apps', 'frontend');

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
      expect(pkg.name.length).toBeGreaterThan(0);
    });

    it('has a dev script', () => {
      expect(pkg.scripts).toBeDefined();
      expect(pkg.scripts.dev).toBeDefined();
    });

    it('has a build script', () => {
      expect(pkg.scripts.build).toBeDefined();
    });

    it('has a test script', () => {
      expect(pkg.scripts.test).toBeDefined();
    });

    it('has react as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['react']).toBeDefined();
    });

    it('has react-dom as a dependency', () => {
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['react-dom']).toBeDefined();
    });

    it('has vite as a dev dependency', () => {
      expect(pkg.devDependencies).toBeDefined();
      expect(pkg.devDependencies['vite']).toBeDefined();
    });

    it('has @vitejs/plugin-react as a dev dependency', () => {
      expect(pkg.devDependencies['@vitejs/plugin-react']).toBeDefined();
    });

    it('has typescript as a dev dependency', () => {
      expect(pkg.devDependencies['typescript']).toBeDefined();
    });

    it('has axios as a dependency', () => {
      expect(pkg.dependencies['axios']).toBeDefined();
    });

    it('has @stitch-mcp/ui or similar Stitch MCP UI library as a dependency', () => {
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies
      };
      const hasStitch = Object.keys(allDeps).some(
        key => key.includes('stitch') || key.includes('@stitch')
      );
      expect(hasStitch).toBe(true);
    });
  });

  describe('Vite configuration', () => {
    it('has a vite.config.ts or vite.config.js file', () => {
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

  describe('TypeScript configuration', () => {
    it('has a tsconfig.json file', () => {
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
      if (target) {
        expect(['ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', 'ES2022', 'ESNext'].includes(target.toUpperCase() === target ? target : target.toUpperCase())).toBe(true);
      } else {
        // target may be inherited or not required if using extends
        const hasExtends = tsconfig.extends !== undefined || tsconfig.compilerOptions !== undefined;
        expect(hasExtends).toBe(true);
      }
    });
  });

  describe('Source files', () => {
    it('has a src/ directory', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src'))).toBe(true);
      expect(fs.statSync(path.join(FRONTEND, 'src')).isDirectory()).toBe(true);
    });

    it('has src/main.tsx entry point', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src', 'main.tsx'))).toBe(true);
    });

    it('has src/App.tsx component', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'src', 'App.tsx'))).toBe(true);
    });

    it('main.tsx references ReactDOM or createRoot', () => {
      const content = fs.readFileSync(
        path.join(FRONTEND, 'src', 'main.tsx'),
        'utf-8'
      );
      expect(content).toMatch(/ReactDOM|createRoot/i);
    });

    it('App.tsx exports a default component', () => {
      const content = fs.readFileSync(
        path.join(FRONTEND, 'src', 'App.tsx'),
        'utf-8'
      );
      expect(content).toMatch(/export default/i);
    });

    it('App.tsx imports or uses React', () => {
      const content = fs.readFileSync(
        path.join(FRONTEND, 'src', 'App.tsx'),
        'utf-8'
      );
      expect(content).toMatch(/react/i);
    });
  });

  describe('HTML entry point', () => {
    it('has an index.html file', () => {
      expect(fs.existsSync(path.join(FRONTEND, 'index.html'))).toBe(true);
    });

    it('index.html references the main entry script', () => {
      const content = fs.readFileSync(
        path.join(FRONTEND, 'index.html'),
        'utf-8'
      );
      expect(content).toMatch(/src\/main\.tsx|src\/main\.jsx|src\/main\.ts/i);
    });

    it('index.html has a root div or mount point', () => {
      const content = fs.readFileSync(
        path.join(FRONTEND, 'index.html'),
        'utf-8'
      );
      expect(content).toMatch(/id=["']root["']/i);
    });
  });

  describe('Type declarations', () => {
    it('has src/vite-env.d.ts or similar type reference file', () => {
      const hasViteEnv = fs.existsSync(path.join(FRONTEND, 'src', 'vite-env.d.ts'));
      const hasViteEnvDts = fs.existsSync(path.join(FRONTEND, 'src', 'vite-env.d.ts'));
      expect(hasViteEnv || hasViteEnvDts).toBe(true);
    });
  });
});
