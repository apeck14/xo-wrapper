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

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.next/**',
      'out/**',
      '.cache/**',
      '*.min.js'
    ]
  },

  // Base config for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    
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

    rules: {
      ...baseRules
    }
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
      'react': (await import('eslint-plugin-react')).default,
      'import': (await import('eslint-plugin-import')).default,
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
      'simple-import-sort': (await import('eslint-plugin-simple-import-sort')).default,
      'unicorn': (await import('eslint-plugin-unicorn')).default
    },

    rules: {
      ...baseRules
    }
  },

  // JavaScript + React files
  {
    files: ['**/*.jsx', '**/*.js'],
    
    plugins: {
      'react': (await import('eslint-plugin-react')).default,
      'import': (await import('eslint-plugin-import')).default,
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
      'simple-import-sort': (await import('eslint-plugin-simple-import-sort')).default,
      'unicorn': (await import('eslint-plugin-unicorn')).default
    },

    rules: {
      ...baseRules
    }
  },

  // Test files
  {
    files: [
      '**/*.test.{js,ts,jsx,tsx}',
      '**/*.spec.{js,ts,jsx,tsx}',
      'tests/**/*.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}'
    ],

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
        afterAll: true
      }
    },

    plugins: {
      'jest': (await import('eslint-plugin-jest')).default,
      'vitest': (await import('eslint-plugin-vitest')).default
    },

    rules: {
      ...baseRules,
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },

  // Config files (less strict)
  {
    files: [
      '*.config.{js,ts,mjs,cjs}',
      '.*.{js,ts,mjs,cjs}',
      'vite.config.{js,ts}',
      'vitest.config.{js,ts}'
    ],

    rules: {
      ...baseRules,
      'import/no-anonymous-default-export': 'off',
      'unicorn/prefer-module': 'off'
    }
  }
]