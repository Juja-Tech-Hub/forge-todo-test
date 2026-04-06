/**
 * Monorepo Structure Tests
 *
 * These tests verify that the monorepo is correctly initialized
 * with the expected directory structure, configuration files, and conventions.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

describe('Monorepo Root Structure', () => {
  describe('Root package.json', () => {
    let pkg;

    beforeAll(() => {
      const pkgPath = path.join(ROOT, 'package.json');
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    });

    it('exists at the root level', () => {
      expect(fs.existsSync(path.join(ROOT, 'package.json'))).toBe(true);
    });

    it('has "private" set to true', () => {
      expect(pkg.private).toBe(true);
    });

    it('has workspaces configured', () => {
      expect(pkg.workspaces).toBeDefined();
      expect(Array.isArray(pkg.workspaces)).toBe(true);
      expect(pkg.workspaces.length).toBeGreaterThan(0);
    });

    it('includes apps/* in workspaces', () => {
      expect(pkg.workspaces).toContain('apps/*');
    });

    it('has a name field', () => {
      expect(pkg.name).toBeDefined();
      expect(typeof pkg.name).toBe('string');
      expect(pkg.name.length).toBeGreaterThan(0);
    });

    it('has a scripts section', () => {
      expect(pkg.scripts).toBeDefined();
    });

    it('has a test script', () => {
      expect(pkg.scripts.test).toBeDefined();
    });
  });

  describe('apps/ directory', () => {
    it('exists', () => {
      expect(fs.existsSync(path.join(ROOT, 'apps'))).toBe(true);
    });

    it('is a directory', () => {
      expect(fs.statSync(path.join(ROOT, 'apps')).isDirectory()).toBe(true);
    });
  });

  describe('apps/backend directory', () => {
    it('exists', () => {
      expect(fs.existsSync(path.join(ROOT, 'apps', 'backend'))).toBe(true);
    });

    it('is a directory', () => {
      expect(fs.statSync(path.join(ROOT, 'apps', 'backend')).isDirectory()).toBe(true);
    });
  });

  describe('apps/frontend directory', () => {
    it('exists', () => {
      expect(fs.existsSync(path.join(ROOT, 'apps', 'frontend'))).toBe(true);
    });

    it('is a directory', () => {
      expect(fs.statSync(path.join(ROOT, 'apps', 'frontend')).isDirectory()).toBe(true);
    });
  });

  describe('.gitignore', () => {
    let gitignoreContent;

    beforeAll(() => {
      const gitignorePath = path.join(ROOT, '.gitignore');
      gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    });

    it('exists at the root level', () => {
      expect(fs.existsSync(path.join(ROOT, '.gitignore'))).toBe(true);
    });

    it('ignores node_modules/', () => {
      expect(gitignoreContent).toMatch(/node_modules\//m);
    });

    it('ignores dist/', () => {
      expect(gitignoreContent).toMatch(/dist\//m);
    });

    it('ignores .env files', () => {
      expect(gitignoreContent).toMatch(/\.env/m);
    });

    it('ignores build outputs', () => {
      expect(gitignoreContent).toMatch(/build\//m);
    });

    it('ignores coverage directories', () => {
      expect(gitignoreContent).toMatch(/coverage\//m);
    });
  });

  describe('README.md', () => {
    let readmeContent;

    beforeAll(() => {
      const readmePath = path.join(ROOT, 'README.md');
      readmeContent = fs.readFileSync(readmePath, 'utf-8');
    });

    it('exists at the root level', () => {
      expect(fs.existsSync(path.join(ROOT, 'README.md'))).toBe(true);
    });

    it('is not empty', () => {
      expect(readmeContent.trim().length).toBeGreaterThan(0);
    });

    it('has a title heading', () => {
      expect(readmeContent).toMatch(/^#\s+.+/m);
    });

    it('mentions the project structure or monorepo', () => {
      const lower = readmeContent.toLowerCase();
      const hasMentionOfStructure =
        lower.includes('backend') ||
        lower.includes('frontend') ||
        lower.includes('monorepo') ||
        lower.includes('apps');
      expect(hasMentionOfStructure).toBe(true);
    });
  });
});
