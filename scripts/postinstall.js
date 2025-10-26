#!/usr/bin/env node

import chalk from 'chalk'
import { existsSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

import { detectESLintVersion, detectPackageType, getConsumerRoot, loadTemplate, safeWriteFile } from './utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const templatesDir = join(__dirname, 'templates')

// ============================================
// DETECT CONSUMER ENVIRONMENT
// ============================================

const consumerRoot = getConsumerRoot()

console.error(chalk.blue.bold('\n🔧 xo-wrapper setup'))
console.error(chalk.blue(`📁 Consumer root: ${consumerRoot}\n`))

const { isESM } = detectPackageType(consumerRoot)
const eslintVersion = detectESLintVersion(consumerRoot)

console.error('') // Empty line for readability

// ============================================
// CREATE ESLINT CONFIG
// ============================================
let eslintConfigCreated = false

if (eslintVersion >= 9) {
  const configFileName = isESM ? 'eslint.config.js' : 'eslint.config.mjs'
  const configPath = resolve(consumerRoot, configFileName)

  const configContent = `import xoWrapperConfig from 'xo-wrapper'

export default xoWrapperConfig
`

  eslintConfigCreated = safeWriteFile(configPath, configContent, configFileName)
} else {
  const configPath = resolve(consumerRoot, '.eslintrc.cjs')
  const configContent = `module.exports = {
  extends: ['xo-wrapper/legacy']
}
`

  eslintConfigCreated = safeWriteFile(configPath, configContent, '.eslintrc.cjs')
}

// ============================================
// CREATE PRETTIER CONFIG
// ============================================
const prettierConfigPath = resolve(consumerRoot, '.prettierrc')
let prettierConfigCreated = false

if (!existsSync(prettierConfigPath)) {
  const prettierConfigContent = loadTemplate(templatesDir, 'prettierrc.json')
  prettierConfigCreated = safeWriteFile(prettierConfigPath, prettierConfigContent, '.prettierrc')
} else {
  console.error(chalk.blue('ℹ️  .prettierrc already exists, skipping'))
  prettierConfigCreated = true
}

// ============================================
// CREATE PRETTIER IGNORE
// ============================================
const prettierIgnorePath = resolve(consumerRoot, '.prettierignore')
let prettierIgnoreCreated = false

if (!existsSync(prettierIgnorePath)) {
  const prettierIgnoreContent = loadTemplate(templatesDir, 'prettierignore.txt')
  prettierIgnoreCreated = safeWriteFile(prettierIgnorePath, prettierIgnoreContent, '.prettierignore')
} else {
  console.error(chalk.blue('ℹ️  .prettierignore already exists, skipping'))
  prettierIgnoreCreated = true
}

// ============================================
// SUMMARY
// ============================================
console.error('') // Empty line

const allSuccess = eslintConfigCreated && prettierConfigCreated && prettierIgnoreCreated

if (allSuccess) {
  console.error(chalk.green.bold('🎉 Setup complete! Reload your editor for changes to take effect.\n'))
} else {
  console.error(chalk.yellow.bold('⚠️  Setup completed with some warnings. Check the output above.\n'))
  process.exit(0) // Don't fail installation, just warn
}
