// lib/xo-options.js
import baseRules from './rules/base.js'
import reactRules from './rules/react.js'
import testRules from './rules/test.js'
import typescriptRules from './rules/typescript.js'

export default {
  rules: {
    ...baseRules,
    ...typescriptRules,
    ...reactRules
  },

  overrides: [
    {
      files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
      rules: testRules
    }
  ],

  ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.next/**', 'out/**', '.cache/**', '*.min.js', '**/*.min.js']
}
