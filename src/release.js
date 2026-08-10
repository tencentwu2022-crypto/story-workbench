const fs = require('node:fs');

function extractRelease(text) {
  const source = String(text).replace(/^\uFEFF/, '');
  const lines = source.split(/\r?\n/);
  const title = lines[0] || '';
  const separator = source.indexOf('---');
  if (separator < 0) throw new Error('working draft is missing the first --- separator');

  const start = separator + 3;
  const hook = source.indexOf('> **章末钩子**', start);
  if (hook < 0) throw new Error('working draft is missing the chapter hook marker');

  const body = source.slice(start, hook).trim();
  if (!body) throw new Error('working draft has an empty prose body');
  return `${title}\n\n${body}\n`;
}

function extractReleaseFile(inputPath, outputPath) {
  const release = extractRelease(fs.readFileSync(inputPath, 'utf8'));
  fs.writeFileSync(outputPath, release, 'utf8');
  return release;
}

module.exports = { extractRelease, extractReleaseFile };
