/**
 * @fileoverview ESLint flat config with XO defaults and curated plugins
 * @description This config provides opinionated linting rules for JavaScript,
 * TypeScript, and React projects. It extends XO's config and adds additional
 * plugins for imports, accessibility, React, and testing.
 */

import { FlatCompat } from '@eslint/eslintrc'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import nPlugin from 'eslint-plugin-n'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import reactPlugin from 'eslint-plugin-react'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import unicornPlugin from 'eslint-plugin-unicorn'
import vitestPlugin from 'eslint-plugin-vitest'
import globals from 'globals'

import baseRules from './rules/base.cjs'
import reactRules from './rules/react.cjs'
import testRules from './rules/test.cjs'
import typescriptRules from './rules/typescript.cjs'

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
