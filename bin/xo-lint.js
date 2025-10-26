#!/usr/bin/env node

import chalk from 'chalk'
import { ESLint } from 'eslint'
import { dirname, join } from 'path'
import process from 'process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = join(__dirname, '..')

const args = process.argv.slice(2)

// Handle --help flag
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${chalk.bold('xo-wrapper')} - ESLint with XO defaults and curated plugins

${chalk.bold('Usage:')}
  xo-lint [options] [file/glob patterns...]

${chalk.bold('Options:')}
  --fix              Automatically fix problems
  --debug            Show detailed error information
  -h, --help         Show this help message

${chalk.bold('Examples:')}
  xo-lint                       Lint all JS/TS files
  xo-lint --fix                 Lint and auto-fix
  xo-lint src/**/*.ts           Lint specific files
  xo-lint --fix --debug         Fix with verbose output
`)
  process.exit(0)
}

const fix = args.includes('--fix')
const debug = args.includes('--debug')
const patterns = args.filter((arg) => !arg.startsWith('--'))
const filesToLint = patterns.length > 0 ? patterns : ['**/*.{js,ts,jsx,tsx}']

if (debug) {
  console.log(chalk.blue('🔍 Debug mode enabled\n'))
  console.log(chalk.blue('Configuration:'))
  console.log(chalk.blue(`  CWD: ${process.cwd()}`))
  console.log(chalk.blue(`  Fix mode: ${fix}`))
  console.log(chalk.blue(`  Patterns: ${filesToLint.join(', ')}`))
  console.log(chalk.blue(`  Config file: ${join(packageRoot, 'lib', 'config.js')}\n`))
}

const eslint = new ESLint({
  cache: true,
  cacheLocation: join(process.cwd(), 'node_modules', '.cache', 'xo-wrapper'),
  cwd: process.cwd(),
  fix,
  overrideConfig: {
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    }
  },
  overrideConfigFile: join(packageRoot, 'lib', 'config.js')
})
;(async () => {
  try {
    if (debug) {
      console.log(chalk.blue('Starting linting process...\n'))
    }

    const startTime = Date.now()
    const results = await eslint.lintFiles(filesToLint)
    const duration = Date.now() - startTime

    if (fix) {
      await ESLint.outputFixes(results)
      if (debug) {
        console.log(chalk.blue('\nFixes written to disk'))
      }
    }

    const formatter = await eslint.loadFormatter('stylish')
    const resultText = await formatter.format(results)

    if (resultText) {
      console.log(resultText)
    }

    const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0)
    const warningCount = results.reduce((sum, r) => sum + r.warningCount, 0)
    const filesLinted = results.length

    if (debug) {
      console.log(chalk.blue('\n📊 Statistics:'))
      console.log(chalk.blue(`  Files linted: ${filesLinted}`))
      console.log(chalk.blue(`  Duration: ${duration}ms`))
      console.log(chalk.blue(`  Errors: ${errorCount}`))
      console.log(chalk.blue(`  Warnings: ${warningCount}\n`))
    }

    if (errorCount === 0 && warningCount === 0) {
      console.log(chalk.green.bold('✅ No lint errors or warnings found!'))
    } else {
      if (errorCount > 0) {
        console.log(chalk.red.bold(`❌ Total Errors: ${errorCount}`))
      }

      if (warningCount > 0) {
        console.log(chalk.yellow.bold(`⚠️  Total Warnings: ${warningCount}`))
      }
    }

    process.exit(errorCount > 0 ? 1 : 0)
  } catch (err) {
    console.error(chalk.red.bold('❌ Linting failed:'))
    console.error(chalk.red(`\n${err.message}`))

    if (debug || process.env.DEBUG) {
      console.error(chalk.red('\n📋 Stack trace:'))
      console.error(chalk.gray(err.stack))

      if (err.cause) {
        console.error(chalk.red('\n🔍 Cause:'))
        console.error(chalk.gray(err.cause))
      }
    } else {
      console.error(chalk.yellow('\n💡 Tip: Run with --debug flag for more details'))
    }

    process.exit(1)
  }
})()
