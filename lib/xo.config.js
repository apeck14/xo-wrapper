import baseRules from './rules/base.js'
import reactRules from './rules/react.js'
import testRules from './rules/test.js'
import typescriptRules from './rules/typescript.js'

export default [
  // Global ignores - must be first
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.next/**', 'out/**', '.cache/**', '*.min.js', '**/*.min.js']
  },

  // Base config for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      prettier: (await import('eslint-plugin-prettier')).default,
      import: (await import('eslint-plugin-import')).default,
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
      'simple-import-sort': (await import('eslint-plugin-simple-import-sort')).default,
      unicorn: (await import('eslint-plugin-unicorn')).default
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
      parser: (await import('@typescript-eslint/parser')).default,
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
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
      react: (await import('eslint-plugin-react')).default,
      import: (await import('eslint-plugin-import')).default,
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
      'simple-import-sort': (await import('eslint-plugin-simple-import-sort')).default,
      unicorn: (await import('eslint-plugin-unicorn')).default,
      prettier: (await import('eslint-plugin-prettier')).default
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
      react: (await import('eslint-plugin-react')).default,
      import: (await import('eslint-plugin-import')).default,
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
      'simple-import-sort': (await import('eslint-plugin-simple-import-sort')).default,
      unicorn: (await import('eslint-plugin-unicorn')).default,
      prettier: (await import('eslint-plugin-prettier')).default
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
      jest: (await import('eslint-plugin-jest')).default,
      vitest: (await import('eslint-plugin-vitest')).default,
      prettier: (await import('eslint-plugin-prettier')).default
    },

    rules: {
      ...baseRules,
      ...testRules
    }
  },

  // Config files (less strict)
  {
    files: ['*.config.{js,ts,mjs,cjs}', '.*.{js,ts,mjs,cjs}', 'vite.config.{js,ts}', 'vitest.config.{js,ts}'],

    rules: {
      ...baseRules,
      'import/no-anonymous-default-export': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/prefer-module': 'off'
    }
  }
]
