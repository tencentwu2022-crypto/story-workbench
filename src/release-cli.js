#!/usr/bin/env node

const path = require('node:path');
const { extractReleaseFile } = require('./release');

const [, , input, output] = process.argv;

if (!input || !output) {
  console.error('Usage: story-release <working-draft.md> <release.md>');
  process.exitCode = 2;
} else {
  try {
    extractReleaseFile(path.resolve(input), path.resolve(output));
    console.log(`wrote ${path.resolve(output)}`);
  } catch (error) {
    console.error(`story-release: ${error.message}`);
    process.exitCode = 1;
  }
}
