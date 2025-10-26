module.exports = {
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/naming-convention': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      varsIgnorePattern: '^_'
    }
  ],
  '@typescript-eslint/prefer-nullish-coalescing': 'off',

  // Disable base rule for TS files
  'no-unused-vars': 'off'
}
