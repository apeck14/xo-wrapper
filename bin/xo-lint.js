#!/usr/bin/env node

import XO from 'xo'
import process from 'process'
import config from '../lib/xo.config.js'
import chalk from 'chalk'

const args = process.argv.slice(2)
const fix = args.includes('--fix')
const patterns = args.filter((arg) => arg !== '--fix')
const filesToLint = patterns.length > 0 ? patterns : ['**/*.{js,ts,jsx,tsx}']

const xo = new XO({
  ...config,
  cwd: process.cwd(),
  fix,
  extensions: ['.js', '.ts', '.jsx', '.tsx'],
  ignore: ['node_modules/**', 'dist/**', 'build/**']
})

;(async () => {
  try {
    const results = await xo.lintFiles(filesToLint)

    const formatter = await xo.getFormatter('stylish')
    const formatted = formatter.format(results.results)

    if (formatted) console.log(formatted)

    const errorCount = results.reduce((acc, r) => acc + r.errorCount, 0)
    const warningCount = results.reduce((acc, r) => acc + r.warningCount, 0)

    if (errorCount === 0 && warningCount === 0) {
      console.log(chalk.green.bold('✅ No lint errors or warnings found!'))
    } else {
      if (errorCount > 0) console.log(chalk.red.bold(`❌ Total Errors: ${errorCount}`))
      if (warningCount > 0) console.log(chalk.yellow.bold(`⚠️ Total Warnings: ${warningCount}`))
    }

    process.exit(errorCount > 0 ? 1 : 0)
  } catch (err) {
    console.error(chalk.red.bold('❌ XO Linting failed:\n'), err)
    process.exit(1)
  }
})()
