#!/usr/bin/env node

import chalk from 'chalk'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get consumer root
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

// ============================================
// CREATE ESLINT CONFIG
// ============================================
if (eslintVersion >= 9) {
  const configFileName = isESM ? 'eslint.config.js' : 'eslint.config.mjs'
  const configPath = resolve(consumerRoot, configFileName)

  const configContent = `import xoWrapperConfig from 'xo-wrapper'

export default xoWrapperConfig
`

  try {
    writeFileSync(configPath, configContent, 'utf8')
    console.log(chalk.green.bold(`✅ Created/updated ${configFileName}`))

    if (existsSync(configPath)) {
      console.log(chalk.green('  ✓ File verified'))
    }
  } catch (error) {
    console.log(chalk.red.bold(`❌ Failed to create ${configFileName}: ${error.message}`))
  }
} else {
  const configPath = resolve(consumerRoot, '.eslintrc.cjs')
  const configContent = `module.exports = {
  extends: ['xo-wrapper/legacy']
}
`

  try {
    writeFileSync(configPath, configContent, 'utf8')
    console.log(chalk.green.bold(`✅ Created/updated .eslintrc.cjs`))

    if (existsSync(configPath)) {
      console.log(chalk.green('  ✓ File verified'))
    }
  } catch (error) {
    console.log(chalk.red.bold(`❌ Failed to create .eslintrc.cjs: ${error.message}`))
  }
}

// ============================================
// CREATE PRETTIER CONFIG
// ============================================
const prettierConfigPath = resolve(consumerRoot, '.prettierrc')
const prettierConfig = {
  jsxSingleQuote: true,
  printWidth: 150,
  quoteProps: 'as-needed',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  semi: false
}

// Only create if it doesn't exist
if (!existsSync(prettierConfigPath)) {
  try {
    writeFileSync(prettierConfigPath, JSON.stringify(prettierConfig, null, 2), 'utf8')
    console.log(chalk.green.bold('✅ Created .prettierrc'))
    console.log(chalk.green('  ✓ File verified'))
  } catch (error) {
    console.log(chalk.red.bold(`❌ Failed to create .prettierrc: ${error.message}`))
  }
} else {
  console.log(chalk.blue('ℹ️  .prettierrc already exists, skipping'))
}

// ============================================
// CREATE PRETTIER IGNORE
// ============================================
const prettierIgnorePath = resolve(consumerRoot, '.prettierignore')
const prettierIgnoreContent = `# Dependencies
node_modules

# Build outputs
dist
build
out
.next

# Coverage
coverage
.nyc_output

# Cache
.cache
.parcel-cache
.turbo

# Minified files
*.min.js
*.min.css

# Lock files
package-lock.json
yarn.lock
pnpm-lock.yaml

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db
`

// Only create if it doesn't exist
if (!existsSync(prettierIgnorePath)) {
  try {
    writeFileSync(prettierIgnorePath, prettierIgnoreContent, 'utf8')
    console.log(chalk.green.bold('✅ Created .prettierignore'))
    console.log(chalk.green('  ✓ File verified'))
  } catch (error) {
    console.log(chalk.red.bold(`❌ Failed to create .prettierignore: ${error.message}`))
  }
} else {
  console.log(chalk.blue('ℹ️  .prettierignore already exists, skipping'))
}

console.log(chalk.blue('\n🎉 Setup complete! Reload your editor for changes to take effect.'))
