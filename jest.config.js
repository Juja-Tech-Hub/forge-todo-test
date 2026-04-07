/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/__tests__/**/*.test.js'
  ],
  transform: {
    '^.+\.tsx?$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript'
      ]
    }]
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  collectCoverageFrom: [
    'apps/**/*.{js,ts}',
    '!apps/**/node_modules/**',
    '!apps/**/dist/**'
  ]
};
