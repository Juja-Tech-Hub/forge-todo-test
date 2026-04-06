/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/__tests__/**/*.test.js'
  ],
  collectCoverageFrom: [
    'apps/**/*.{js,ts}',
    '!apps/**/node_modules/**',
    '!apps/**/dist/**'
  ]
};
