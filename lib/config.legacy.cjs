// lib/config.legacy.cjs

// Import rule files as CommonJS
const baseRules = require('./rules/base.cjs')
const typescriptRules = require('./rules/typescript.cjs')
const reactRules = require('./rules/react.cjs')
const testRules = require('./rules/test.cjs')

module.exports = {
  env: {
    es2024: true,
    node: true
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
  ],

  overrides: [
    // TypeScript + React
    {
      extends: ['xo', 'xo-typescript', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'prettier'],
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: [
        '@typescript-eslint',
        'react',
        'import',
        'jsx-a11y',
        'simple-import-sort',
        'unicorn',
        'n',
        'perfectionist'
      ],
      rules: {
        ...typescriptRules,
        ...reactRules
      }
    },

    // JavaScript + React
    {
      extends: ['xo', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'prettier'],
      files: ['**/*.jsx'],
      plugins: ['react', 'import', 'jsx-a11y', 'simple-import-sort', 'unicorn', 'n', 'perfectionist'],
      rules: reactRules
    },

    // Test files
    {
      env: {
        jest: true,
        node: true,
        'vitest-globals/env': true
      },
      extends: ['plugin:jest/recommended', 'plugin:vitest/recommended'],
      files: [
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        'tests/**/*.{js,ts,jsx,tsx}',
        '**/__tests__/**/*.{js,ts,jsx,tsx}'
      ],
      plugins: ['jest', 'vitest', 'import', 'simple-import-sort', 'unicorn', 'n', 'perfectionist'],
      rules: testRules
    }
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },

  plugins: ['import', 'jsx-a11y', 'simple-import-sort', 'unicorn', 'react', 'jest', 'vitest', 'n', 'perfectionist'],

  rules: baseRules,

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: 'detect'
    }
  }
}
