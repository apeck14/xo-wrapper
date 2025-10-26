/* eslint-disable perfectionist/sort-objects */
module.exports = {
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/naming-convention': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/prefer-nullish-coalescing': 'off',
  'no-unused-vars': 'off', // disable base rule
  '@typescript-eslint/no-unused-vars': ['warn', { args: 'after-used' }],
  '@typescript-eslint/adjacent-overload-signatures': 'error'
}
