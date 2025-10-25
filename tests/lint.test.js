import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import XO from 'xo'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('XO Lint', () => {
  const testDir = path.resolve(__dirname, 'dummy')

  beforeAll(() => {
    // Create a dummy directory with some test files
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir)

    // Add a JS file with lint errors
    fs.writeFileSync(path.join(testDir, 'bad.js'), 'var a = 1\nconsole.log(a);\n')
  })

  afterAll(() => {
    // Clean up
    fs.rmSync(testDir, { recursive: true, force: true })
  })

  it('should lint dummy files without crashing', async () => {
    const xo = new XO({
      cwd: testDir,
      fix: false,
      extensions: ['.js'],
      resolvePluginsRelativeTo: __dirname // important
    })

    const results = await xo.lintFiles(['**/*.js'])

    // Assert that XO ran and returned results
    expect(Array.isArray(results.results)).toBe(true)

    const errorCount = results.results.reduce((acc, r) => acc + r.errorCount, 0)
    expect(errorCount).toBeGreaterThan(0)
  })
})
