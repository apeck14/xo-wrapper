/**
 * @fileoverview ESLint flat config with XO defaults and curated plugins
 * @description This config provides opinionated linting rules for JavaScript,
 * TypeScript, and React projects. It extends XO's config and adds additional
 * plugins for imports, accessibility, React, and testing.
 */

import { FlatCompat } from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

import baseRules from './rules/base.cjs'
import reactRules from './rules/react.cjs'
import testRules from './rules/test.cjs'
import typescriptRules from './rules/typescript.cjs'

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
const nPlugin = (await import('eslint-plugin-n')).default
const perfectionistPlugin = (await import('eslint-plugin-perfectionist')).default

// Common settings for React projects
const reactSettings = {
  'import/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs']
    }
  },
  react: {
    version: 'detect' // Automatically detect React version
  }
}

const compat = new FlatCompat({
  baseDirectory: __dirname
})

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

  // Convert XO config to flat config format
  ...compat.extends('xo'),

  // Prettier config - disables ALL conflicting rules
  prettierConfig, // ✅ ADD THIS

  // Global overrides - applies to all files after XO config
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      perfectionist: perfectionistPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin
    },
    rules: baseRules
  },

  // JavaScript and JSX files
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin
    },
    rules: reactRules,
    settings: reactSettings
  },

  // TypeScript and TSX files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin
    },
    rules: {
      ...typescriptRules,
      ...reactRules
    },
    settings: reactSettings
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
        ...globals.jest, // All Jest globals
        vi: 'readonly', // Vitest's vi object (not in globals package)
        vitest: 'readonly'
      }
    },
    plugins: {
      jest: jestPlugin,
      vitest: vitestPlugin
    },
    rules: testRules
  }
]
