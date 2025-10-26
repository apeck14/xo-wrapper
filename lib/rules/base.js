export default {
  // Prettier/Stylistic - disabled to avoid conflicts
  '@stylistic/indent': 'off',
  '@stylistic/comma-dangle': 'off',
  '@stylistic/object-curly-spacing': 'off',
  '@stylistic/semi': 'off',
  indent: 'off',
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
  camelcase: 'warn',
  'no-implicit-coercion': 'off',
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
}
