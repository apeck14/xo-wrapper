/**
 * @fileoverview ESLint flat config with curated plugins
 * @description This config provides opinionated linting rules for JavaScript,
 * TypeScript, and React projects. It includes plugins for imports, accessibility,
 * React, testing, and Promise best practices.
 */

import babelParser from '@babel/eslint-parser'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import nPlugin from 'eslint-plugin-n'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import promisePlugin from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import unicornPlugin from 'eslint-plugin-unicorn'
import vitestPlugin from 'eslint-plugin-vitest'
import globals from 'globals'

import baseRules from './rules/base.cjs'
import reactRules from './rules/react.cjs'
import testRules from './rules/test.cjs'
import typescriptRules from './rules/typescript.cjs'

// Conditionally import TypeScript - only if available
let typescriptParser = null
let typescriptPlugin = null

try {
  const tsParserModule = await import('@typescript-eslint/parser')
  const tsPluginModule = await import('@typescript-eslint/eslint-plugin')
  typescriptParser = tsParserModule.default
  typescriptPlugin = tsPluginModule.default
} catch {
  // TypeScript not available - skip TS config
}

// Common settings for React projects
const reactSettings = {
  'import/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs']
    }
  },
  react: {
    version: 'detect'
  }
}

/**
 * @type {import('eslint').FlatConfig[]}
 * ESLint flat configuration array
 */
const config = [
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

  // Global overrides - applies to all files
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
      promise: promisePlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin
    },
    rules: baseRules
  },

  // JavaScript and JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          presets: ['@babel/preset-react']
        },
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        requireConfigFile: false,
        sourceType: 'module'
      }
    },
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin
    },
    rules: reactRules,
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
  },

  // Prettier config - disables ALL conflicting rules
  prettierConfig
]

// Only add TypeScript config if TypeScript is in consumer repo
if (typescriptParser && typescriptPlugin) {
  config.push({
    files: ['**/*.{ts,tsx}'],
    ignores: ['*.config.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
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
      ...reactRules,
      ...typescriptRules
    },
    settings: reactSettings
  })
}

export default config
