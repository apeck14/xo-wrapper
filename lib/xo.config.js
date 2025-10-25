const baseRules = {
  'eol-last': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  'unicorn/filename-case': 'off',
  'n/prefer-global/process': 'off',
  '@typescript-eslint/naming-convention': 'off',
  'import/extensions': 'off',
  'n/file-extension-in-import': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/ban-types': 'off',
  'no-implicit-coercion': 'off',
  '@typescript-eslint/prefer-nullish-coalescing': 'off',
  'import/no-unassigned-import': 'off',
  'unicorn/prevent-abbreviations': 'off',
  'import/no-anonymous-default-export': 'off',
  'unicorn/no-anonymous-default-export': 'off',
  'unicorn/prefer-global-this': 'off',
  'capitalized-comments': 'off',
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': 'error',
  'unicorn/numeric-separators-style': 'off',
  'unicorn/prefer-module': 'off',
  'import/no-named-as-default': 'off',
  'unicorn/prefer-string-replace-all': 'off',
  'max-nested-callbacks': ['error', 5],
  'import/order': 'off',
  'new-cap': 'off',
  indent: 'off',
  'unicorn/catch-error-name': 'off',
  camelcase: 'warn',
  'react/prop-types': 'off',
  'unicorn/prefer-switch': ['error', { minimumCases: 4, emptyDefaultCase: 'do-nothing-comment' }],
  'unicorn/no-empty-file': 'warn',
  'unicorn/no-array-reduce': 'off',
  'unicorn/no-array-callback-reference': 'off',
  '@stylistic/indent': 'off',
  '@stylistic/comma-dangle': 'off',
  '@stylistic/object-curly-spacing': 'off',
  '@stylistic/semi': 'off'
}

const plugins = ['import', 'jsx-a11y', 'simple-import-sort', 'unicorn', 'react', 'jest', 'vitest']

export default {
  // Explicitly list plugins
  plugins,

  // Base rules for all files
  rules: {
    ...baseRules
  },

  // Parser options for TypeScript
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

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
      plugins: ['@typescript-eslint', 'react', 'import', 'jsx-a11y', 'simple-import-sort', 'unicorn'],
      extends: ['xo', 'xo-typescript', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
      rules: {
        ...baseRules,
        // TS-specific overrides if needed
        '@typescript-eslint/naming-convention': 'off' // Example
      }
    },

    // JavaScript + React
    {
      files: ['**/*.js', '**/*.jsx'],
      plugins: ['react', 'import', 'jsx-a11y', 'simple-import-sort', 'unicorn'],
      extends: ['xo', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
      rules: {
        ...baseRules
      }
    },

    // Vitest & Jest test files
    {
      files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}', 'tests/**/*.{js,ts,jsx,tsx}', '**/__tests__/**/*.{js,ts,jsx,tsx}'],
      env: {
        jest: true,
        'vitest-globals/env': true
      },
      plugins: ['jest', 'vitest'],
      extends: ['plugin:jest/recommended', 'plugin:vitest/recommended'],
      rules: {
        ...baseRules,
        // Relax some rules for tests
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off'
      }
    },

    // Config files (less strict)
    {
      files: ['*.config.{js,ts,mjs,cjs}', '.*.{js,ts,mjs,cjs}', 'vite.config.{js,ts}', 'vitest.config.{js,ts}'],
      rules: {
        ...baseRules,
        'import/no-anonymous-default-export': 'off'
      }
    }
  ],

  // React version detection
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

  // Ignore common build/output dirs
  ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.next/**', 'out/**', '.cache/**', '*.min.js']
}
