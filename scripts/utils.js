import chalk from 'chalk'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Auto-detect templates directory relative to this utils file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const TEMPLATES_DIR = join(__dirname, 'templates')

/**
 * Safely writes a file with error handling
 * @param {string} path - File path to write to
 * @param {string} content - Content to write
 * @param {string} description - Description for logging
 * @returns {boolean} - Success status
 */
export function safeWriteFile(path, content, description) {
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
 * @param {string} path - File path to read from
 * @param {*} fallback - Fallback value if read fails
 * @returns {*} - Parsed JSON or fallback
 */
export function safeReadJSON(path, fallback = null) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return fallback
  }
}

/**
 * Loads a template file from the templates directory
 * @param {string} filename - Template filename
 * @returns {string} - Template content
 * @throws {Error} - If template cannot be loaded
 */
export function loadTemplate(filename) {
  try {
    return readFileSync(join(TEMPLATES_DIR, filename), 'utf8')
  } catch (error) {
    console.error(chalk.red(`Failed to load template: ${filename}`))
    throw error
  }
}

/**
 * Detects the consumer's package type (ESM or CommonJS)
 * @param {string} consumerRoot - Consumer project root
 * @returns {{ isESM: boolean, pkg: object|null }} - Package info
 */
export function detectPackageType(consumerRoot) {
  const pkgPath = join(consumerRoot, 'package.json')
  const pkg = safeReadJSON(pkgPath)

  if (pkg) {
    const isESM = pkg.type === 'module'
    console.error(chalk.blue(`📦 Package type: ${isESM ? 'ESM' : 'CommonJS'}`))
    return { isESM, pkg }
  }

  console.error(chalk.yellow('⚠️  Could not detect package type, assuming CommonJS'))
  return { isESM: false, pkg: null }
}

/**
 * Detects the installed ESLint version
 * @param {string} consumerRoot - Consumer project root
 * @returns {number} - ESLint major version
 */
export function detectESLintVersion(consumerRoot) {
  const eslintPkgPath = join(consumerRoot, 'node_modules', 'eslint', 'package.json')
  const eslintPkg = safeReadJSON(eslintPkgPath)

  if (eslintPkg) {
    const version = parseInt(eslintPkg.version.split('.')[0], 10)
    console.error(chalk.blue(`🔍 ESLint version: ${version}`))
    return version
  }

  console.error(chalk.yellow('⚠️  Could not detect ESLint version, defaulting to 9'))
  return 9
}

/**
 * Determines the consumer root directory
 * @returns {string} - Consumer root path
 */
export function getConsumerRoot() {
  if (process.env.INIT_CWD) {
    return process.env.INIT_CWD
  }

  if (process.cwd().includes('node_modules')) {
    return join(process.cwd(), '..', '..')
  }

  return process.cwd()
}

/**
 * Checks if we're installing within the xo-wrapper package itself
 * @returns {boolean} - True if in package repo
 */
export function isPackageRepo() {
  const consumerRoot = getConsumerRoot()

  try {
    const pkgPath = join(consumerRoot, 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))

    // Check if this is the xo-wrapper package itself
    return pkg.name === 'xo-wrapper'
  } catch {
    return false
  }
}
