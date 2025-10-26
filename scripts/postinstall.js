#!/usr/bin/env node
/* eslint-disable no-console */

process.stdout.write('\n')

import chalk from 'chalk'
import { existsSync } from 'fs'
import { join, resolve } from 'path'

import {
  detectESLintVersion,
  detectPackageType,
  getConsumerRoot,
  isPackageRepo,
  loadTemplate,
  safeWriteFile
} from './utils.js'

// ============================================
// DETECT CONSUMER ENVIRONMENT
// ============================================

const consumerRoot = getConsumerRoot()

// Exit early if we're in the package repo itself
if (isPackageRepo()) {
  console.error(chalk.blue('ℹ️  Skipping postinstall - running in package repo'))
  process.exit(0)
}

console.error(chalk.blue.bold('\n🔧 xo-wrapper setup'))
console.error(chalk.blue(`📁 Consumer root: ${consumerRoot}\n`))

const { isESM } = detectPackageType(consumerRoot)
const eslintVersion = detectESLintVersion(consumerRoot)

console.error('')

// ============================================
// CREATE ESLINT CONFIG
// ============================================
const hasExplicitEslint8 = eslintVersion === 8 || eslintVersion < 9
let eslintConfigCreated = false

if (hasExplicitEslint8 && existsSync(join(consumerRoot, 'node_modules', 'eslint', 'package.json'))) {
  // ESLint 8 is explicitly installed by consumer repo
  const configPath = resolve(consumerRoot, '.eslintrc.cjs')
  const configContent = loadTemplate('eslint.config.legacy.cjs.txt')
  eslintConfigCreated = safeWriteFile(configPath, configContent, '.eslintrc.cjs')
} else {
  // Default to flat config (ESLint 9+)
  const configFileName = isESM ? 'eslint.config.js' : 'eslint.config.mjs'
  const configPath = resolve(consumerRoot, configFileName)
  const configContent = loadTemplate('eslint.config.flat.js.txt')
  eslintConfigCreated = safeWriteFile(configPath, configContent, configFileName)
}

// ============================================
// CREATE PRETTIER CONFIG (ALWAYS OVERWRITE)
// ============================================
const prettierConfigPath = resolve(consumerRoot, '.prettierrc')
const prettierConfigContent = loadTemplate('prettierrc.json')
const prettierConfigCreated = safeWriteFile(prettierConfigPath, prettierConfigContent, '.prettierrc')

// ============================================
// CREATE PRETTIER IGNORE (ALWAYS OVERWRITE)
// ============================================
const prettierIgnorePath = resolve(consumerRoot, '.prettierignore')
const prettierIgnoreContent = loadTemplate('prettierignore.txt')
const prettierIgnoreCreated = safeWriteFile(prettierIgnorePath, prettierIgnoreContent, '.prettierignore')

// ============================================
// SUMMARY
// ============================================
console.error('')

const allSuccess = eslintConfigCreated && prettierConfigCreated && prettierIgnoreCreated

if (allSuccess) {
  console.error(chalk.green.bold('🎉 Setup complete! Reload your editor for changes to take effect.\n'))
} else {
  console.error(chalk.yellow.bold('⚠️  Setup completed with some warnings. Check the output above.\n'))
  process.exit(0) // Don't fail installation, just warn
}
