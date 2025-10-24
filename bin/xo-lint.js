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
  extensions: [".js", ".ts", ".jsx", ".tsx"],
  ignore: ["node_modules/**", "dist/**", "build/**"],
  formatter: "stylish",
});

// Async IIFE to run linting
(async () => {
  try {
    const results = await xo.lintFiles(filesToLint);

    // XO v0.59+ formatter returns a function
    const formatted = xo.getFormatter()(results);
    if (formatted) console.log(formatted);

    const errorCount = results.reduce((acc, r) => acc + r.errorCount, 0);
    const warningCount = results.reduce((acc, r) => acc + r.warningCount, 0);

    if (errorCount === 0 && warningCount === 0) {
      console.log(chalk.green.bold("✅ No lint errors or warnings found!"));
    } else {
      if (errorCount > 0) {
        console.log(chalk.red.bold(`❌ Total Errors: ${errorCount}`));
      }
      if (warningCount > 0) {
        console.log(chalk.yellow.bold(`⚠️  Total Warnings: ${warningCount}`));
      }
    }

    // Exit with error code if any lint errors (CI-friendly)
    process.exit(errorCount > 0 ? 1 : 0);
  } catch (err) {
    console.error(chalk.red.bold("❌ XO Linting failed:\n"), err);
    process.exit(1);
  }
})();
