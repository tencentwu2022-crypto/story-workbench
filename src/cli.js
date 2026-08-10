#!/usr/bin/env node

const path = require('node:path');
const { analyzeFile } = require('./check');

const args = process.argv.slice(2);
const file = args.find((arg) => !arg.startsWith('--'));
const json = args.includes('--json');
const mode = args.includes('--release') ? 'release' : 'draft';

if (!file) {
  console.error('Usage: story-qc <markdown-file> [--release] [--json]');
  process.exitCode = 2;
} else {
  try {
    const report = analyzeFile(path.resolve(file), { mode });
    if (json) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      console.log(`status: ${report.passed ? 'PASS' : 'REVIEW'}`);
      console.log(`mode: ${report.mode}`);
      console.log(`characters: ${report.charCount}`);
      console.log(`paragraphs: ${report.paragraphCount}`);
      console.log(`average paragraph: ${report.averageParagraphChars}`);
      console.log(`short paragraph ratio: ${(report.shortParagraphRatio * 100).toFixed(1)}%`);
      console.log(`simile markers: ${report.simileCount}`);
      if (report.bannedPhraseHits.length) console.log(`banned phrases: ${report.bannedPhraseHits.join(', ')}`);
      if (report.forbiddenInfoHits.length) console.log(`forbidden info: ${report.forbiddenInfoHits.join(', ')}`);
      if (report.metadataHits.length) console.log(`metadata: ${report.metadataHits.join(', ')}`);
    }
    if (!report.passed) process.exitCode = 1;
  } catch (error) {
    console.error(`story-qc: ${error.message}`);
    process.exitCode = 1;
  }
}
