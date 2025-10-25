export default {
  rules: {
    // Stylistic rules we want off
    '@stylistic/indent': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/object-curly-spacing': 'off',
    '@stylistic/semi': 'off',

    // TypeScript / ESLint rules
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',

    // Unicorn rules we want off
    'unicorn/filename-case': 'off',
    'unicorn/no-anonymous-default-export': 'off',
    'unicorn/prefer-global-this': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-string-replace-all': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-empty-file': 'warn',
    'unicorn/prefer-switch': ['error', { minimumCases: 4, emptyDefaultCase: 'do-nothing-comment' }],
    'unicorn/catch-error-name': 'off',

    // Import / Node rules
    'import/extensions': 'off',
    'import/no-unassigned-import': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/no-named-as-default': 'off',
    'n/prefer-global/process': 'off',
    'n/file-extension-in-import': 'off',

    // Misc
    'eol-last': 'off',
    'no-implicit-coercion': 'off',
    'capitalized-comments': 'off',
    'max-nested-callbacks': ['error', 5],
    'import/order': 'off',
    'new-cap': 'off',
    indent: 'off',
    camelcase: 'warn',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  },

  overrides: [
    // TypeScript + React
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['xo', 'xo-typescript', 'plugin:react/recommended']
    },

    // JavaScript + React
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: ['xo', 'plugin:react/recommended']
    },

    // Vitest & Jest
    {
      files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.js', '**/*.spec.ts', '**/*.spec.tsx', 'tests/**/*.{js,ts,tsx}'],
      env: { jest: true, vitest: true },
      plugins: ['jest', 'vitest'],
      extends: ['plugin:jest/recommended', 'plugin:vitest/recommended'],
      rules: {
        'max-nested-callbacks': 'off',
        'unicorn/no-empty-file': 'off',
        'no-unused-expressions': 'off'
      }
    }
  ],

  // React version detection
  settings: { react: { version: 'detect' } },

  // Ignore common build/output dirs
  ignore: ['node_modules/**', 'dist/**', 'build/**']
}
