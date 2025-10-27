const reactPlugin = require('eslint-plugin-react')

module.exports = {
  ...reactPlugin.configs.recommended.rules,
  'react/prop-types': 'off'
}
