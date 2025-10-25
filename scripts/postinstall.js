#!/usr/bin/env node

import { writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readFileSync } from 'fs'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the consumer repo root (2 levels up from node_modules/xo-wrapper)
const consumerRoot = join(__dirname, '..', '..')

// Detect ESLint version
let eslintVersion = 9
try {
  const eslintPkgPath = join(consumerRoot, 'node_modules', 'eslint', 'package.json')
  const eslintPkg = JSON.parse(readFileSync(eslintPkgPath, 'utf8'))
  eslintVersion = parseInt(eslintPkg.version.split('.')[0], 10)
} catch {
  // Default to 9 if can't detect
}

if (eslintVersion >= 9) {
  // ESLint 9+ flat config
  const configPath = join(consumerRoot, 'eslint.config.js')
  const configContent = `import xoWrapperConfig from 'xo-wrapper'

export default xoWrapperConfig
`
  
  try {
    writeFileSync(configPath, configContent)
    console.log(chalk.green.bold('✅ Created/updated eslint.config.js (ESLint 9+ flat config)'))
  } catch (error) {
    console.log(chalk.yellow.bold('ℹ️  Please create eslint.config.js manually:'))
    console.log(chalk.gray(configContent))
  }
} else {
  // ESLint 8 legacy config
  const configPath = join(consumerRoot, '.eslintrc.cjs')
  const configContent = `module.exports = {
  extends: ['xo-wrapper/legacy']
}
`
  
  try {
    writeFileSync(configPath, configContent)
    console.log(chalk.green.bold('✅ Created/updated .eslintrc.cjs (ESLint 8 legacy config)'))
  } catch (error) {
    console.log(chalk.yellow.bold('ℹ️  Please create .eslintrc.cjs manually:'))
    console.log(chalk.gray(configContent))
  }
}