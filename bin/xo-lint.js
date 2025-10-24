#!/usr/bin/env node
import { execa } from "execa";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(__dirname, "../lib/xo.config.js");

await execa("xo", ["--config", configPath, ...process.argv.slice(2)], {
  stdio: "inherit",
});
