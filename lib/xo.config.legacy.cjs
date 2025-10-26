// Since we can't import ESM in CommonJS, inline the rules
const baseRules = {
  // Prettier/Stylistic - disabled to avoid conflicts
  '@stylistic/indent': 'off',
  '@stylistic/comma-dangle': 'off',
  '@stylistic/object-curly-spacing': 'off',
  '@stylistic/semi': 'off',
  'indent': 'off',
  'eol-last': 'off',

  // Import rules
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': 'error',
  'import/order': 'off',
  'import/extensions': 'off',
  'import/no-unassigned-import': 'off',
  'import/no-anonymous-default-export': 'off',
  'import/no-named-as-default': 'off',

  // Unicorn rules
  'unicorn/filename-case': 'off',
  'unicorn/prevent-abbreviations': 'off',
  'unicorn/no-anonymous-default-export': 'off',
  'unicorn/prefer-global-this': 'off',
  'unicorn/numeric-separators-style': 'off',
  'unicorn/prefer-module': 'off',
  'unicorn/prefer-string-replace-all': 'off',
  'unicorn/catch-error-name': 'off',
  'unicorn/prefer-switch': ['error', { minimumCases: 4, emptyDefaultCase: 'do-nothing-comment' }],
  'unicorn/no-empty-file': 'warn',
  'unicorn/no-array-reduce': 'off',
  'unicorn/no-array-callback-reference': 'off',

  // Node rules
  'n/prefer-global/process': 'off',
  'n/file-extension-in-import': 'off',

  // General rules
  'capitalized-comments': 'off',
  'max-nested-callbacks': ['error', 5],
  'new-cap': 'off',
  'camelcase': 'warn',
  'no-implicit-coercion': 'off'
}

const typescriptRules = {
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/naming-convention': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/prefer-nullish-coalescing': 'off'
}

const reactRules = {
  'react/prop-types': 'off'
}

const testRules = {
  'max-nested-callbacks': ['error', 10],
  '@typescript-eslint/no-empty-function': 'off',
  'no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-expressions': 'off'
}

module.exports = {
  plugins: [
    'import',
    'jsx-a11y',
    'simple-import-sort',
    'unicorn',
    'react',
    'jest',
    'vitest',
  ],
  
  rules: baseRules,
  
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
      plugins: [
        '@typescript-eslint',
        'react',
        'import',
        'jsx-a11y',
        'simple-import-sort',
        'unicorn',
      ],
      extends: [
        'xo',
        'xo-typescript',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime'
      ],
      rules: {
        ...baseRules,
        ...typescriptRules
      }
    },

    // JavaScript + React
    {
      files: ['**/*.jsx'],
      plugins: [
        'react',
        'import',
        'jsx-a11y',
        'simple-import-sort',
        'unicorn',
      ],
      extends: [
        'xo',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime'
      ],
      rules: {
        ...baseRules,
        ...reactRules
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
      env: {
        jest: true,
        'vitest-globals/env': true
      },
      plugins: ['jest', 'vitest'],
      extends: [
        'plugin:jest/recommended',
        'plugin:vitest/recommended'
      ],
      rules: {
        ...baseRules,
        ...testRules
      }
    },

    // Config files
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
        'unicorn/no-anonymous-default-export': 'off',
        'unicorn/prefer-module': 'off'
      }
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
    '*.min.js'
  ]
}