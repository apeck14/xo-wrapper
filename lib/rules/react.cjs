const reactPlugin = require('eslint-plugin-react')
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y')

module.exports = {
  ...reactPlugin.configs.recommended.rules,
  ...jsxA11yPlugin.flatConfigs.recommended,
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off'
}
