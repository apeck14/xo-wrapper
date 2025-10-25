# xo-wrapper

Zero-config ESLint/XO linting for JavaScript, TypeScript, and React projects. All plugins bundled—just install and run.

## Features

- **Zero configuration required** - Works out of the box
- **Built on XO defaults** - Opinionated, battle-tested rules
- **Full TypeScript support** - Automatic detection and configuration
- **React-ready** - JSX/TSX support with a11y checks
- **Test framework aware** - Jest and Vitest support
- **All dependencies bundled** - No peer dependency management needed

## Installation

```bash
npm i -D xo-wrapper
```

## Usage

Add to your `package.json`:

```json
{
  "scripts": {
    "lint": "xo-lint",
    "lint:fix": "xo-lint --fix"
  }
}
```

Run linting:

```bash
npm run lint
npm run lint:fix
```

## CLI Options

```bash
xo-lint                    # Lint all JS/TS/JSX/TSX files
xo-lint --fix              # Auto-fix issues
xo-lint src/**/*.ts        # Lint specific files/patterns
xo-lint --version          # Show version
```

## What's Included

**Plugins:**

- `eslint-plugin-import` - Import/export validation
- `eslint-plugin-jsx-a11y` - Accessibility checks for JSX
- `eslint-plugin-react` - React best practices
- `eslint-plugin-simple-import-sort` - Automatic import sorting
- `eslint-plugin-unicorn` - Additional quality rules
- `eslint-plugin-jest` - Jest testing conventions
- `eslint-plugin-vitest` - Vitest testing conventions
- `@typescript-eslint` - Full TypeScript support

**Also includes:** ESLint, Prettier integration, and all necessary parsers.

## Project Detection

xo-wrapper automatically configures itself based on your project:

- **TypeScript** - Detected via `tsconfig.json`
- **React** - JSX/TSX files automatically use React rules
- **Tests** - `*.test.*`, `*.spec.*`, and `tests/**` files use test-specific rules

## Extending Configuration

Need custom rules? Create `xo.config.js` in your project root:

```javascript
import baseConfig from 'xo-wrapper'

export default {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // Your overrides
    'no-console': 'warn'
  }
}
```

Then use XO directly:

```json
{
  "scripts": {
    "lint": "xo"
  }
}
```

## Requirements

- Node.js >= 18
- Works with both ESM and CommonJS projects
