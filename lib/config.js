/**
 * @fileoverview ESLint flat config with XO defaults and curated plugins
 * @description This config provides opinionated linting rules for JavaScript,
 * TypeScript, and React projects. It extends XO's config and adds additional
 * plugins for imports, accessibility, React, and testing.
 */

import xoConfig from 'eslint-config-xo'

import baseRules from './rules/base.js'
import reactRules from './rules/react.js'
import testRules from './rules/test.js'
import typescriptRules from './rules/typescript.js'

// Import plugins
const importPlugin = (await import('eslint-plugin-import')).default
const jsxA11yPlugin = (await import('eslint-plugin-jsx-a11y')).default
const simpleImportSortPlugin = (await import('eslint-plugin-simple-import-sort')).default
const unicornPlugin = (await import('eslint-plugin-unicorn')).default
const typescriptPlugin = (await import('@typescript-eslint/eslint-plugin')).default
const typescriptParser = (await import('@typescript-eslint/parser')).default
const reactPlugin = (await import('eslint-plugin-react')).default
const jestPlugin = (await import('eslint-plugin-jest')).default
const vitestPlugin = (await import('eslint-plugin-vitest')).default

/**
 * @type {import('eslint').FlatConfig[]}
 * ESLint flat configuration array
 */
export default [
  // Global ignores - applies to all files
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.next/**',
      'out/**',
      '.cache/**',
      '*.min.js',
      '**/*.min.js',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml'
    ]
  },

  // XO defaults - opinionated base rules
  ...xoConfig,

  // JavaScript and JSX files
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin
    },
    settings: {
      react: {
        version: 'detect' // Automatically detect React version
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    rules: {
      ...baseRules,
      ...reactRules
    }
  },

  // TypeScript and TSX files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json', // Required for type-aware linting
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin
    },
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
    rules: {
      ...baseRules,
      ...typescriptRules,
      ...reactRules
    }
  },

  // Test files - Jest and Vitest
  {
    files: [
      '**/*.test.{js,ts,jsx,tsx}',
      '**/*.spec.{js,ts,jsx,tsx}',
      'tests/**/*.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}'
    ],
    languageOptions: {
      globals: {
        // Jest globals
        jest: true,
        describe: true,
        test: true,
        expect: true,
        it: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
        // Vitest globals
        vi: true
      }
    },
    plugins: {
      jest: jestPlugin,
      vitest: vitestPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin
    },
    rules: {
      ...baseRules,
      ...testRules
    }
  }
]
