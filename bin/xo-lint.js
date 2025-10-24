#!/usr/bin/env node

import XO from "xo";
import process from "process";
import config from "../lib/xo.config.js";
import chalk from "chalk";

// Get command-line args, e.g., "--fix" or file globs
const args = process.argv.slice(2);
const fix = args.includes("--fix");

// Remove '--fix' from file patterns
const patterns = args.filter((arg) => arg !== "--fix");

// Default to all JS/TS/React files if no patterns provided
const defaultPatterns = ["**/*.{js,ts,jsx,tsx}"];

// Combine user-provided patterns or defaults
const filesToLint = patterns.length > 0 ? patterns : defaultPatterns;

// Create XO instance
const xo = new XO({
  ...config,
  cwd: process.cwd(),
  fix,
  formatter: "stylish", // nicer default output
  extensions: [".js", ".ts", ".jsx", ".tsx"],
  ignore: ["node_modules/**", "dist/**", "build/**"], // standard ignores
});

// Run linting
(async () => {
  try {
    const results = await xo.lintFiles(filesToLint);

    // Print formatted results to console
    const formatted = xo.getFormatter().format(results);
    if (formatted) console.log(formatted);

    // Exit with error code if there were lint errors
    const hasErrors = results.some((r) => r.errorCount > 0);
    process.exit(hasErrors ? 1 : 0);
  } catch (err) {
    console.error(chalk.red.bold("❌ XO Linting failed:\n"), err);
    process.exit(1);
  }
})();
