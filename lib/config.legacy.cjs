// Import rule files as CommonJS
const baseRules = require('./rules/base.cjs')
const typescriptRules = require('./rules/typescript.cjs')
const reactRules = require('./rules/react.cjs')
const testRules = require('./rules/test.cjs')

module.exports = {
  plugins: ['import', 'jsx-a11y', 'simple-import-sort', 'unicorn', 'react', 'jest', 'vitest', 'n'],

  rules: baseRules,

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  extends: ['prettier'],

  overrides: [
    // TypeScript + React
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: ['@typescript-eslint', 'react', 'import', 'jsx-a11y', 'simple-import-sort', 'unicorn', 'n'],
      extends: ['xo', 'xo-typescript', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
      rules: {
        ...typescriptRules,
        ...reactRules
      }
    },

    // JavaScript + React
    {
      files: ['**/*.jsx'],
      plugins: ['react', 'import', 'jsx-a11y', 'simple-import-sort', 'unicorn', 'n'],
      extends: ['xo', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
      rules: reactRules
    },

    // Test files
    {
      files: [
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        'tests/**/*.{js,ts,jsx,tsx}',
        '**/__tests__/**/*.{js,ts,jsx,tsx}'
      ],
      env: {
        jest: true,
        'vitest-globals/env': true
      },
      plugins: ['jest', 'vitest'],
      extends: ['plugin:jest/recommended', 'plugin:vitest/recommended'],
      rules: testRules
    }
  ],

  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },

  ignorePatterns: [
    'node_modules/**',
    'dist/**',
    'build/**',
    'coverage/**',
    '.next/**',
    'out/**',
    '.cache/**',
    '*.min.js',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml'
  ]
}
