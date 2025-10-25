#!/usr/bin/env node

import XO from 'xo'
import process from 'process'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'
import config from '../lib/xo.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = join(__dirname, '..')

// Detect ESLint version
let eslintVersion = 9
try {
  const eslintPkgPath = join(process.cwd(), 'node_modules', 'eslint', 'package.json')
  const eslintPkg = JSON.parse(readFileSync(eslintPkgPath, 'utf8'))
  eslintVersion = parseInt(eslintPkg.version.split('.')[0], 10)
} catch {
  // Default to 9
}

if (eslintVersion < 9) {
  console.log(chalk.yellow('⚠️  ESLint 8 detected. For best experience, upgrade to ESLint 9+'))
}

const args = process.argv.slice(2)

// Handle --version flag
if (args.includes('--version') || args.includes('-v')) {
  const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'))
  console.log(pkg.version)
  process.exit(0)
}

const fix = args.includes('--fix')
const patterns = args.filter((arg) => !arg.startsWith('--'))
const filesToLint = patterns.length > 0 ? patterns : ['**/*.{js,ts,jsx,tsx}']

const xo = new XO({
  ...config,
  cwd: process.cwd(),
  fix,
  extensions: ['.js', '.ts', '.jsx', '.tsx'],
  ignore: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.next/**'],
  resolvePluginsRelativeTo: packageRoot,
  cache: true,
  cacheLocation: join(process.cwd(), 'node_modules', '.cache', 'xo-wrapper')
})

;(async () => {
  try {
    const { results, errorCount, warningCount } = await xo.lintFiles(filesToLint)

    const formatter = await xo.getFormatter('stylish')
    const formatted = formatter.format(results)

    if (formatted) console.log(formatted)

    if (errorCount === 0 && warningCount === 0) {
      console.log(chalk.green.bold('✅ No lint errors or warnings found!'))
    } else {
      if (errorCount > 0) console.log(chalk.red.bold(`❌ Total Errors: ${errorCount}`))
      if (warningCount > 0) console.log(chalk.yellow.bold(`⚠️ Total Warnings: ${warningCount}`))
    }

    process.exit(errorCount > 0 ? 1 : 0)
  } catch (err) {
    console.error(chalk.red.bold('❌ XO Linting failed:'))
    
    if (err.message.includes('Cannot find module') || err.message.includes('Failed to load plugin')) {
      console.error(chalk.yellow('\nHint: This might be a plugin resolution issue.'))
      console.error(chalk.yellow('Try removing node_modules and package-lock.json, then reinstalling.'))
    }
    
    console.error('\n' + err.message)
    
    process.exit(1)
  }
})()