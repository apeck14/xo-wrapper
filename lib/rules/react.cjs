const reactPlugin = require('eslint-plugin-react')
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y')
const reactHooksPlugin = require('eslint-plugin-react-hooks')

module.exports = {
  ...reactPlugin.configs.recommended.rules,
  ...jsxA11yPlugin.flatConfigs.recommended.rules,
  ...reactHooksPlugin.configs.recommended.rules,
  'jsx-a11y/no-autofocus': 'warn',
  'react-hooks/set-state-in-effect': 'warn',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off'
}
