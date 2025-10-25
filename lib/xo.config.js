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

export default {
  rules: baseRules,
  overrides: [
    // TypeScript + React
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['xo', 'xo-typescript', 'plugin:react/recommended'],
      rules: baseRules
    },

    // JavaScript + React
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: ['xo', 'plugin:react/recommended'],
      rules: baseRules
    },

    // Vitest & Jest
    {
      files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.js', '**/*.spec.ts', '**/*.spec.tsx', 'tests/**/*.{js,ts,tsx}'],
      env: { jest: true, vitest: true },
      plugins: ['jest', 'vitest'],
      extends: ['plugin:jest/recommended', 'plugin:vitest/recommended'],
      rules: baseRules
    }
  ],

  // React version detection
  settings: { react: { version: 'detect' } },

  // Ignore common build/output dirs
  ignore: ['node_modules/**', 'dist/**', 'build/**']
}
