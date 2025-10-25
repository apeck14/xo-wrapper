# xo-wrapper

Zero-config ESLint/XO linting for JavaScript, TypeScript, and React projects. All plugins bundled—just install and run.

## Features

- **Zero configuration** - Works out of the box
- **Built on XO defaults** - Opinionated, battle-tested rules
- **Full TypeScript support** - Automatic detection and configuration
- **React + a11y ready** - JSX/TSX with accessibility checks
- **Test framework aware** - Jest and Vitest support
- **All plugins bundled** - No peer dependency management

## Installation
```bash
npm i -D xo-wrapper eslint
```

An `eslint.config.js` is automatically created for VSCode integration.

## Usage

Add to `package.json`:
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
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

## CLI Options
```bash
xo-lint                # Lint all JS/TS/JSX/TSX files
xo-lint --fix          # Auto-fix issues
xo-lint src/**/*.ts    # Lint specific patterns
xo-lint --version      # Show version
```

## What's Included

**Plugins:** import, jsx-a11y, react, simple-import-sort, unicorn, jest, vitest, @typescript-eslint

**Also includes:** Prettier integration and all necessary parsers

## VSCode Setup

1. Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Add to `.vscode/settings.json`:
```json
{
  "eslint.enable": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": false
}
```

**Troubleshooting:** If linting doesn't work, reload VSCode (`Cmd/Ctrl + Shift + P` → "Reload Window")

## Custom Rules

Edit the auto-generated `eslint.config.js`:
```javascript
import xoWrapperConfig from 'xo-wrapper'

export default {
  ...xoWrapperConfig,
  rules: {
    ...xoWrapperConfig.rules,
    'no-console': 'warn'  // Your overrides
  }
}
```

## Requirements

**Runtime:**
- Node.js >= 18
- ESLint >= 8.57.0 (installed automatically)

**Editor (optional):**
- VSCode ESLint extension for auto-fix on save