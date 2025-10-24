# xo-wrapper

A shared XO configuration for JavaScript, TypeScript, React, and testing (Jest + Vitest) projects.

This package allows teams to standardize linting rules across multiple projects, with no additional installs required. It bundles XO and all required ESLint plugins.

## Quick Start

### 1. Install the package

```bash
npm install --save-dev xo-wrapper
```

### 2. Add a lint script in your package.json

```json
{
  "scripts": {
    "lint": "xo-lint"
  }
}
```

### 3. Run linting

```bash
npm run lint
```

It will automatically lint JS, TS, React, and test files.

## Features

- Works for JavaScript, TypeScript, and React projects.
- Includes support for Vitest and Jest test files.
- Integrates Prettier with opinionated formatting.
- Comes with custom overrides for common rules:
  - simple-import-sort
  - unicorn rules
  - @typescript-eslint rules
  - react rules
  - prettier formatting
- Self-contained — consumers do not need to install XO or ESLint plugins separately.
- Fully customizable — override any rules in the consuming project.

## Customization

You can override or extend the rules in your consuming project by creating a `xo.config.js`:

```js
import baseConfig from "xo-wrapper/lib/xo.config.js";

export default [
  ...baseConfig,
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
```

The `xo-lint` command will automatically respect this override.

## Supported Environments

| Environment | Notes                                             |
| ----------- | ------------------------------------------------- |
| JavaScript  | `.js`, `.jsx`                                     |
| TypeScript  | `.ts`, `.tsx`                                     |
| React       | JSX support included                              |
| Jest        | `.test.*` / `.spec.*` files, globals auto-enabled |
| Vitest      | `.test.*` / `.spec.*` files, globals auto-enabled |
| Prettier    | Automatic integration                             |

## Plugins Included

- xo
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-plugin-react
- eslint-plugin-unicorn
- eslint-plugin-simple-import-sort
- eslint-plugin-n
- eslint-plugin-import
- eslint-plugin-prettier
- eslint-plugin-vitest
- eslint-plugin-jest

## Notes

- Your consuming project does not need to install XO or any ESLint plugins manually.
- Test file rules will only apply to files matching `*.test.*`, `*.spec.*`, or files in a `tests` directory.
- All custom rules are overrideable — just extend the config in your project.
- The package auto-detects TypeScript and React projects.
