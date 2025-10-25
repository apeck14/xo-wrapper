#!/usr/bin/env node

import chalk from 'chalk'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// More robust way to get consumer root
let consumerRoot

if (process.env.INIT_CWD) {
  consumerRoot = process.env.INIT_CWD
} else if (process.cwd().includes('node_modules')) {
  consumerRoot = join(__dirname, '..', '..')
} else {
  consumerRoot = process.cwd()
}

console.log(chalk.blue(`Consumer root: ${consumerRoot}`))

// Detect if repo is ESM or CommonJS
let isESM = false
try {
  const pkgPath = join(consumerRoot, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  isESM = pkg.type === 'module'
  console.log(chalk.blue(`Package type: ${isESM ? 'ESM' : 'CommonJS'}`))
} catch (error) {
  console.log(chalk.yellow('Could not detect package type, assuming CommonJS'))
}

// Detect ESLint version
let eslintVersion = 9
try {
  const eslintPkgPath = join(consumerRoot, 'node_modules', 'eslint', 'package.json')
  const eslintPkg = JSON.parse(readFileSync(eslintPkgPath, 'utf8'))
  eslintVersion = parseInt(eslintPkg.version.split('.')[0], 10)
  console.log(chalk.blue(`ESLint version: ${eslintVersion}`))
} catch (error) {
  console.log(chalk.yellow('Could not detect ESLint version, defaulting to 9'))
}

if (eslintVersion >= 9) {
  // ESLint 9+ flat config
  // Use .mjs for CommonJS repos, .js for ESM repos
  const configFileName = isESM ? 'eslint.config.js' : 'eslint.config.mjs'
  const configPath = resolve(consumerRoot, configFileName)

  const configContent = `import xoWrapperConfig from 'xo-wrapper'

export default xoWrapperConfig
`

  try {
    writeFileSync(configPath, configContent, 'utf8')
    console.log(chalk.green.bold(`✅ Created/updated ${configFileName} at: ${configPath}`))

    if (existsSync(configPath)) {
      console.log(chalk.green('✓ File verified to exist'))
    } else {
      console.log(chalk.red('✗ File was not created!'))
    }
  } catch (error) {
    console.log(chalk.red.bold(`❌ Failed to create config file: ${error.message}`))
    console.log(chalk.yellow.bold(`\nℹ️  Please create ${configFileName} manually:`))
    console.log(chalk.gray(configContent))
  }
} else {
  // ESLint 8 legacy config
  const configPath = resolve(consumerRoot, '.eslintrc.cjs')
  const configContent = `module.exports = {
  extends: ['xo-wrapper/legacy']
}
`

  try {
    writeFileSync(configPath, configContent, 'utf8')
    console.log(chalk.green.bold(`✅ Created/updated .eslintrc.cjs at: ${configPath}`))

    if (existsSync(configPath)) {
      console.log(chalk.green('✓ File verified to exist'))
    } else {
      console.log(chalk.red('✗ File was not created!'))
    }
  } catch (error) {
    console.log(chalk.red.bold(`❌ Failed to create config file: ${error.message}`))
    console.log(chalk.yellow.bold('\nℹ️  Please create .eslintrc.cjs manually:'))
    console.log(chalk.gray(configContent))
  }
}
