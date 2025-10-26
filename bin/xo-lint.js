#!/usr/bin/env node

import chalk from 'chalk'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import process from 'process'
import { fileURLToPath } from 'url'
import XO from 'xo'

import xoConfig from '../lib/xo.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = join(__dirname, '..')

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

const xo = new XO(
  {
    cwd: process.cwd(),
    fix,
    cache: true,
    cacheLocation: join(process.cwd(), 'node_modules', '.cache', 'xo-wrapper')
  },
  xoConfig
)

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
