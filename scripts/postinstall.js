#!/usr/bin/env node

import chalk from 'chalk'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Safely writes a file with error handling
 */
function safeWriteFile(path, content, description) {
  try {
    // Ensure directory exists
    const dir = dirname(path)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    writeFileSync(path, content, 'utf8')
    console.error(chalk.green.bold(`✅ Created/updated ${description}`))

    if (existsSync(path)) {
      console.error(chalk.green(`  ✓ File verified at: ${path}`))
      return true
    }

    console.error(chalk.red('  ✗ File verification failed'))
    return false
  } catch (error) {
    console.error(chalk.red.bold(`❌ Failed to create ${description}:`))
    console.error(chalk.red(`  ${error.message}`))
    return false
  }
}

/**
 * Safely reads and parses JSON file
 */
function safeReadJSON(path, fallback = null) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return fallback
  }
}

// ============================================
// DETECT CONSUMER ENVIRONMENT
// ============================================

// Get consumer root
let consumerRoot

if (process.env.INIT_CWD) {
  consumerRoot = process.env.INIT_CWD
} else if (process.cwd().includes('node_modules')) {
  consumerRoot = join(__dirname, '..', '..')
} else {
  consumerRoot = process.cwd()
}

console.error(chalk.blue.bold('\n🔧 xo-wrapper setup'))
console.error(chalk.blue(`📁 Consumer root: ${consumerRoot}\n`))

// Detect if repo is ESM or CommonJS
let isESM = false
const pkgPath = join(consumerRoot, 'package.json')
const pkg = safeReadJSON(pkgPath)

if (pkg) {
  isESM = pkg.type === 'module'
  console.error(chalk.blue(`📦 Package type: ${isESM ? 'ESM' : 'CommonJS'}`))
} else {
  console.error(chalk.yellow('⚠️  Could not detect package type, assuming CommonJS'))
}

// Detect ESLint version
let eslintVersion = 9
const eslintPkgPath = join(consumerRoot, 'node_modules', 'eslint', 'package.json')
const eslintPkg = safeReadJSON(eslintPkgPath)

if (eslintPkg) {
  eslintVersion = parseInt(eslintPkg.version.split('.')[0], 10)
  console.error(chalk.blue(`🔍 ESLint version: ${eslintVersion}`))
} else {
  console.error(chalk.yellow('⚠️  Could not detect ESLint version, defaulting to 9'))
}

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
const prettierConfig = {
  jsxSingleQuote: true,
  printWidth: 120,
  quoteProps: 'as-needed',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  semi: false
}

let prettierConfigCreated = false

if (!existsSync(prettierConfigPath)) {
  prettierConfigCreated = safeWriteFile(prettierConfigPath, JSON.stringify(prettierConfig, null, 2), '.prettierrc')
} else {
  console.error(chalk.blue('ℹ️  .prettierrc already exists, skipping'))
  prettierConfigCreated = true // Consider it "created" since it exists
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

let prettierIgnoreCreated = false

if (!existsSync(prettierIgnorePath)) {
  prettierIgnoreCreated = safeWriteFile(prettierIgnorePath, prettierIgnoreContent, '.prettierignore')
} else {
  console.error(chalk.blue('ℹ️  .prettierignore already exists, skipping'))
  prettierIgnoreCreated = true // Consider it "created" since it exists
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
