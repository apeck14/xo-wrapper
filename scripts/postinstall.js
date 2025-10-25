#!/usr/bin/env node

import { writeFileSync, existsSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readFileSync } from 'fs'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// More robust way to get consumer root
// If running via npm scripts, use CWD
// If running from node_modules, go up 2 levels
let consumerRoot

if (process.env.INIT_CWD) {
  // npm install sets this to the original working directory
  consumerRoot = process.env.INIT_CWD
} else if (process.cwd().includes('node_modules')) {
  // Running from within node_modules
  consumerRoot = join(__dirname, '..', '..')
} else {
  // Running directly
  consumerRoot = process.cwd()
}

console.log(chalk.blue(`Consumer root: ${consumerRoot}`))

// Detect ESLint version
let eslintVersion = 9
try {
  const eslintPkgPath = join(consumerRoot, 'node_modules', 'eslint', 'package.json')
  const eslintPkg = JSON.parse(readFileSync(eslintPkgPath, 'utf8'))
  eslintVersion = parseInt(eslintPkg.version.split('.')[0], 10)
  console.log(chalk.blue(`ESLint version: ${eslintVersion}`))
} catch (error) {
  console.log(chalk.yellow(`Could not detect ESLint version, defaulting to 9`))
}

if (eslintVersion >= 9) {
  // ESLint 9+ flat config
  const configPath = resolve(consumerRoot, 'eslint.config.js')
  const configContent = `import xoWrapperConfig from 'xo-wrapper'

export default xoWrapperConfig
`
  
  try {
    writeFileSync(configPath, configContent, 'utf8')
    console.log(chalk.green.bold(`✅ Created/updated eslint.config.js at: ${configPath}`))
    
    // Verify it was actually created
    if (existsSync(configPath)) {
      console.log(chalk.green('✓ File verified to exist'))
    } else {
      console.log(chalk.red('✗ File was not created!'))
    }
  } catch (error) {
    console.log(chalk.red.bold(`❌ Failed to create config file: ${error.message}`))
    console.log(chalk.yellow.bold('\nℹ️  Please create eslint.config.js manually:'))
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
    
    // Verify it was actually created
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