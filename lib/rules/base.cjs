module.exports = {
  // General rules
  'capitalized-comments': 'off',
  'max-nested-callbacks': ['error', 5],
  'new-cap': 'off',
  camelcase: 'warn',
  'no-implicit-coercion': 'off',
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  'no-undef': 'warn',
  'no-negated-condition': 'off',
  complexity: ['warn', { max: 25 }],
  'no-await-in-loop': 'off',

  // Import rules
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': 'error',
  'import/order': 'off',
  'import/extensions': 'off',
  'import/no-unassigned-import': 'off',
  'import/no-anonymous-default-export': 'off',
  'import/no-named-as-default': 'off',
  'import/no-unresolved': [
    'warn',
    {
      ignore: [
        '^@/', // Ignore path aliases
        '^@typescript-eslint/',
        '^eslint-plugin-'
      ]
    }
  ],

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

  // Pefectionist rules
  'perfectionist/sort-imports': 'off',
  'perfectionist/sort-named-imports': 'off',
  'perfectionist/sort-objects': 'error',
  'perfectionist/sort-interfaces': 'error',
  'perfectionist/sort-jsx-props': 'error',
  'perfectionist/sort-union-types': 'error',
  'perfectionist/sort-classes': 'error',
  'perfectionist/sort-enums': 'error',

  // Node rules
  'n/no-missing-import': 'off', // Let import plugin handle this
  'n/no-unpublished-import': 'off',
  'n/no-unsupported-features/es-syntax': 'off',
  'n/prefer-global/process': 'off',
  'n/file-extension-in-import': 'off'
}
