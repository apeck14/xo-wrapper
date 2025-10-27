const baseRules = require('./rules/base.cjs')
const typescriptRules = require('./rules/typescript.cjs')
const reactRules = require('./rules/react.cjs')
const testRules = require('./rules/test.cjs')

// Check if TypeScript is in consumer repo
let hasTypeScript = false
try {
  require.resolve('typescript')
  hasTypeScript = true
} catch {
  // TypeScript not available - skip TS config
}

const config = {
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
    // JavaScript + React
    {
      extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'prettier'],
      files: ['**/*.jsx'],
      parser: '@babel/eslint-parser',
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
      },
      rules: reactRules
    },

    // Test files
    {
      env: {
        jest: true,
        'vitest-globals/env': true
      },
      extends: ['plugin:jest/recommended', 'plugin:vitest/recommended'],
      files: [
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        'tests/**/*.{js,ts,jsx,tsx}',
        '**/__tests__/**/*.{js,ts,jsx,tsx}'
      ],
      plugins: ['jest', 'vitest', 'import', 'simple-import-sort', 'unicorn', 'n', 'perfectionist', 'promise'],
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

  plugins: [
    'import',
    'jsx-a11y',
    'simple-import-sort',
    'unicorn',
    'react',
    'jest',
    'vitest',
    'n',
    'perfectionist',
    'promise'
  ],

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

// Only add TypeScript override if TypeScript is available
if (hasTypeScript) {
  config.overrides.unshift({
    excludedFiles: ['*.config.ts'],
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
      'perfectionist',
      'promise'
    ],
    rules: {
      ...reactRules,
      ...typescriptRules
    }
  })
}

module.exports = config
