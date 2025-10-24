#!/usr/bin/env node
import XO from "xo";
import config from "../lib/xo.config.js";

const xo = new XO({
  ...config,
  cwd: process.cwd(),
});

const files = process.argv.slice(2);
xo.lintFiles(files.length ? files : ["."]);
