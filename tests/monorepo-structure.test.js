/**
 * Monorepo Structure Tests
 * These tests validate the monorepo setup and conventions.
 * Run with: node --test tests/monorepo-structure.test.js
 * Or with Jest if installed globally.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function readJSON(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function fileExists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function readFile(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf-8');
}

// ─── Test Suite ────────────────────────────────────────────────────────────────

describe('Monorepo root structure', () => {
  // ── Directory layout ────────────────────────────────────────────────────────

  test('apps/ directory exists', () => {
    expect(fileExists('apps')).toBe(true);
    expect(fs.statSync(path.join(ROOT, 'apps')).isDirectory()).toBe(true);
  });

  test('apps/backend directory exists', () => {
    expect(fileExists('apps/backend')).toBe(true);
    expect(fs.statSync(path.join(ROOT, 'apps/backend')).isDirectory()).toBe(true);
  });

  test('apps/frontend directory exists', () => {
    expect(fileExists('apps/frontend')).toBe(true);
    expect(fs.statSync(path.join(ROOT, 'apps/frontend')).isDirectory()).toBe(true);
  });

  // ── Root package.json ───────────────────────────────────────────────────────

  test('root package.json exists', () => {
    expect(fileExists('package.json')).toBe(true);
  });

  test('root package.json is valid JSON', () => {
    expect(() => readJSON(path.join(ROOT, 'package.json'))).not.toThrow();
  });

  test('root package.json has "private": true', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    expect(pkg.private).toBe(true);
  });

  test('root package.json has workspaces field', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    expect(pkg.workspaces).toBeDefined();
  });

  test('workspaces includes apps/backend', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    const workspaces = Array.isArray(pkg.workspaces)
      ? pkg.workspaces
      : pkg.workspaces.packages;
    const hasBackend = workspaces.some(
      (w) => w === 'apps/backend' || w === 'apps/*'
    );
    expect(hasBackend).toBe(true);
  });

  test('workspaces includes apps/frontend', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    const workspaces = Array.isArray(pkg.workspaces)
      ? pkg.workspaces
      : pkg.workspaces.packages;
    const hasFrontend = workspaces.some(
      (w) => w === 'apps/frontend' || w === 'apps/*'
    );
    expect(hasFrontend).toBe(true);
  });

  test('root package.json has a name field', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    expect(typeof pkg.name).toBe('string');
    expect(pkg.name.length).toBeGreaterThan(0);
  });

  test('root package.json has scripts field', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    expect(pkg.scripts).toBeDefined();
    expect(typeof pkg.scripts).toBe('object');
  });

  test('root scripts include a dev command', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    expect(pkg.scripts.dev).toBeDefined();
  });

  test('root scripts include a build command', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    expect(pkg.scripts.build).toBeDefined();
  });

  test('root scripts include a test command', () => {
    const pkg = readJSON(path.join(ROOT, 'package.json'));
    expect(pkg.scripts.test).toBeDefined();
  });

  // ── .gitignore ──────────────────────────────────────────────────────────────

  test('.gitignore exists', () => {
    expect(fileExists('.gitignore')).toBe(true);
  });

  test('.gitignore ignores node_modules', () => {
    const content = readFile('.gitignore');
    expect(content).toMatch(/^node_modules/m);
  });

  test('.gitignore ignores dist directories', () => {
    const content = readFile('.gitignore');
    expect(content).toMatch(/dist/m);
  });

  test('.gitignore ignores .env files', () => {
    const content = readFile('.gitignore');
    expect(content).toMatch(/\.env/m);
  });

  test('.gitignore ignores build output', () => {
    const content = readFile('.gitignore');
    expect(content).toMatch(/build/m);
  });

  // ── README ──────────────────────────────────────────────────────────────────

  test('README.md exists', () => {
    expect(fileExists('README.md')).toBe(true);
  });

  test('README.md is not empty', () => {
    const content = readFile('README.md');
    expect(content.trim().length).toBeGreaterThan(0);
  });

  test('README.md contains a top-level heading', () => {
    const content = readFile('README.md');
    expect(content).toMatch(/^#\s+.+/m);
  });

  test('README.md mentions backend', () => {
    const content = readFile('README.md').toLowerCase();
    expect(content).toMatch(/backend/);
  });

  test('README.md mentions frontend', () => {
    const content = readFile('README.md').toLowerCase();
    expect(content).toMatch(/frontend/);
  });

  // ── Workspace placeholder package.json files ────────────────────────────────

  test('apps/backend/package.json exists', () => {
    expect(fileExists('apps/backend/package.json')).toBe(true);
  });

  test('apps/backend/package.json has correct name', () => {
    const pkg = readJSON(path.join(ROOT, 'apps/backend/package.json'));
    expect(pkg.name).toBe('@repo/backend');
  });

  test('apps/frontend/package.json exists', () => {
    expect(fileExists('apps/frontend/package.json')).toBe(true);
  });

  test('apps/frontend/package.json has correct name', () => {
    const pkg = readJSON(path.join(ROOT, 'apps/frontend/package.json'));
    expect(pkg.name).toBe('@repo/frontend');
  });
});
