# xo-wrapper

Zero-config ESLint + Prettier setup with curated plugins for JavaScript, TypeScript, and React projects.

## Features

- ✨ **Zero configuration** - Install and start linting immediately
- 🎯 **XO defaults** - Opinionated, battle-tested rules
- 🔷 **TypeScript support** - Full TS/TSX linting out of the box
- ⚛️ **React ready** - JSX/TSX with accessibility checks (auto-detected)
- 🧪 **Test framework aware** - Jest and Vitest support
- 📦 **All plugins bundled** - No peer dependency management
- 🎨 **Prettier integrated** - Consistent formatting across your codebase
- ⚡ **Performance optimized** - Caching enabled by default

## Installation

```bash
npm install --save-dev xo-wrapper
```

**That's it!** The following files will be automatically created/updated:

- `eslint.config.js` or `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier formatting rules (overwritten on install)
- `.prettierignore` - Files to exclude from formatting (overwritten on install)

> **Note:** Prettier config files are always overwritten on install to ensure consistency. Adjust the files as needed.

### Clean Up Old Configs

If migrating from another linting setup, remove the following to avoid conflicts:

**ESLint configs to remove:**

```bash
# Remove old config files
rm .eslintrc.js .eslintrc.json .eslintrc.cjs .eslintrc.yml .eslintrc.yaml
rm eslint.config.js eslint.config.mjs  # Will be auto-generated

# Remove from package.json
"eslintConfig": { ... }  # Delete this entire section
```

**Prettier configs to remove:**

```bash
# These will be overwritten anyway, but you can remove them
rm .prettierrc .prettierrc.json .prettierrc.js .prettierrc.cjs
rm prettier.config.js prettier.config.cjs

# Remove from package.json
"prettier": { ... }  # Delete this if you want xo-wrapper's defaults
```

### Uninstall all linting / styling packages

All required packages come bundled within `xo-wrapper`. You are safe to uninstall all configs, plugins, and even `prettier` / `eslint`.

> **Note:** You can keep `eslint` and `prettier` installed as devDependencies if you want specific versions, otherwise let `xo-wrapper` provide them.

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
npm run lint              # Check for issues
npm run lint:fix          # Auto-fix issues
xo-lint src/**/*.ts       # Lint specific files
xo-lint --debug           # Verbose output
```

## What's Included

### Plugins

- **eslint-plugin-import** - Import/export validation
- **eslint-plugin-jsx-a11y** - Accessibility checks for JSX
- **eslint-plugin-react** - React best practices
- **eslint-plugin-simple-import-sort** - Automatic import sorting
- **eslint-plugin-unicorn** - Additional code quality rules
- **eslint-plugin-n** - Node.js best practices
- **eslint-plugin-perfectionist** - Sorting and organization (objects, types, enums)
- **eslint-plugin-promise** - Promise/async-await best practices
- **eslint-plugin-jest** - Jest testing conventions
- **eslint-plugin-vitest** - Vitest testing conventions
- **@typescript-eslint** - Full TypeScript support

### Automatic Detection

- **React** - Automatically enables React rules when React is detected
- **TypeScript** - Automatically lints `.ts` and `.tsx` files
- **Test files** - Applies test-specific rules to `*.test.*`, `*.spec.*`, and `tests/**`

## Editor Setup (VSCode)

1. Install extensions:
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

2. Add to `.vscode/settings.json`:

```json
{
  "eslint.enable": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

3. Reload VSCode (`Cmd/Ctrl + Shift + P` → "Reload Window")

## Customization

The auto-generated `eslint.config.js` imports the base config. You can extend it:

```javascript
import xoWrapperConfig from 'xo-wrapper'

export default [
  ...xoWrapperConfig,
  {
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error'
    }
  }
]
```

## Requirements

- **Node.js** >= 20.12.0
- **ESLint** >= 8 (9 installed automatically)
- **Prettier** >= 3.3.3 (installed automatically)

**Editor (optional):**

- VSCode ESLint extension for linting on save
- VSCode Prettier extension for formatting on save

## CLI Options

```bash
xo-lint [options] [file/glob patterns...]

Options:
  --fix              Automatically fix problems
  --debug            Show detailed error information
  -h, --help         Show help message

Examples:
  xo-lint                       Lint all JS/TS files
  xo-lint --fix                 Lint and auto-fix
  xo-lint src/**/*.ts           Lint specific files
  xo-lint --fix --debug         Fix with verbose output
```

## Contributing

Issues and pull requests welcome!
