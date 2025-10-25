import { describe, expect, it } from 'vitest'

import config from '../lib/xo.config.js'

describe('XO config', () => {
  it('should export an object', () => {
    expect(typeof config).toBe('object')
  })

  it('should have top-level rules defined', () => {
    expect(config.rules).toBeDefined()
    expect(config.rules['simple-import-sort/imports']).toBe('error')
  })

  it('should have TypeScript plugin enabled in TS overrides', () => {
    const tsOverride = config.overrides.find((o) => o.files.includes('**/*.ts') || o.files.includes('**/*.tsx'))
    expect(tsOverride).toBeDefined()
    expect(tsOverride.extends).toContain('xo-typescript')
  })

  it('should have React plugin enabled in TS and JS overrides', () => {
    const tsOverride = config.overrides.find((o) => o.files.includes('**/*.ts') || o.files.includes('**/*.tsx'))
    const jsOverride = config.overrides.find((o) => o.files.includes('**/*.js') || o.files.includes('**/*.jsx'))
    expect(tsOverride.extends).toContain('plugin:react/recommended')
    expect(jsOverride.extends).toContain('plugin:react/recommended')
  })

  it('should have Prettier plugin enabled in JS/TS overrides', () => {
    const relevantOverrides = config.overrides.filter((o) =>
      o.files.some((f) => f.includes('*.ts') || f.includes('*.tsx') || f.includes('*.js') || f.includes('*.jsx'))
    )

    relevantOverrides.forEach((o) => {
      if (o.extends) {
        const hasPrettier = o.extends.some((ext) => ext.toLowerCase().includes('prettier'))
        expect(hasPrettier).toBe(true)
      }
    })
  })

  it('should have Unicorn plugin rules applied', () => {
    const unicornRules = Object.keys(config.rules).filter((rule) => rule.startsWith('unicorn/'))
    expect(unicornRules.length).toBeGreaterThan(0)
  })

  it('should include Jest and Vitest plugins in test overrides', () => {
    const testOverride = config.overrides.find((o) => o.files.some((f) => f.includes('.test') || f.includes('.spec')))
    expect(testOverride).toBeDefined()
    expect(testOverride.plugins).toContain('jest')
    expect(testOverride.plugins).toContain('vitest')
  })

  it('should include Stylistic plugin rules', () => {
    const stylisticRules = Object.keys(config.rules).filter((rule) => rule.startsWith('@stylistic/'))
    expect(stylisticRules.length).toBeGreaterThan(0)
  })

  it('should have Import plugin rules applied', () => {
    const importRules = Object.keys(config.rules).filter((rule) => rule.startsWith('import/'))
    expect(importRules.length).toBeGreaterThan(0)
  })

  it('should have TypeScript rules applied', () => {
    const tsRules = Object.keys(config.rules).filter((rule) => rule.startsWith('@typescript-eslint/'))
    expect(tsRules.length).toBeGreaterThan(0)
  })
})
