// lib/xo.config.js
import baseRules from './rules/base.js'
import reactRules from './rules/react.js'
import testRules from './rules/test.js'
import typescriptRules from './rules/typescript.js'

// Import all plugins at the top level
const prettierPlugin = (await import('eslint-plugin-prettier')).default
const importPlugin = (await import('eslint-plugin-import')).default
const jsxA11yPlugin = (await import('eslint-plugin-jsx-a11y')).default
const simpleImportSortPlugin = (await import('eslint-plugin-simple-import-sort')).default
const unicornPlugin = (await import('eslint-plugin-unicorn')).default
const typescriptPlugin = (await import('@typescript-eslint/eslint-plugin')).default
const typescriptParser = (await import('@typescript-eslint/parser')).default
const reactPlugin = (await import('eslint-plugin-react')).default
const jestPlugin = (await import('eslint-plugin-jest')).default
const vitestPlugin = (await import('eslint-plugin-vitest')).default

export default [
  // Global ignores
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.next/**', 'out/**', '.cache/**', '*.min.js', '**/*.min.js']
  },

  // Base config for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
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

    rules: baseRules
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin,
      prettier: prettierPlugin
    },

    rules: {
      ...baseRules,
      ...typescriptRules
    }
  },

  // React files (JavaScript)
  {
    files: ['**/*.jsx'],

    plugins: {
      react: reactPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin,
      prettier: prettierPlugin
    },

    rules: {
      ...baseRules,
      ...reactRules
    }
  },

  // Test files
  {
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}', 'tests/**/*.{js,ts,jsx,tsx}', '**/__tests__/**/*.{js,ts,jsx,tsx}'],

    languageOptions: {
      globals: {
        jest: true,
        describe: true,
        test: true,
        expect: true,
        it: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
        vi: true
      }
    },

    plugins: {
      jest: jestPlugin,
      vitest: vitestPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin
    },

    rules: {
      ...baseRules,
      ...testRules
    }
  },

  // Config files (less strict)
  {
    files: ['*.config.{js,ts,mjs,cjs}', '.*.{js,ts,mjs,cjs}', 'vite.config.{js,ts}', 'vitest.config.{js,ts}'],

    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin
    },

    rules: {
      ...baseRules,
      'import/no-anonymous-default-export': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/prefer-module': 'off'
    }
  }
]
