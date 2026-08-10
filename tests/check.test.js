const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { analyzeText, analyzeFile, extractBody } = require('../src/check');
const { extractRelease } = require('../src/release');

const fixture = path.join(__dirname, 'fixtures', 'sample-working.md');
const releaseFixture = path.join(__dirname, 'fixtures', 'sample-release.md');

test('extracts prose between the working metadata and chapter hook', () => {
  const text = fs.readFileSync(fixture, 'utf8');
  const body = extractBody(text);
  assert.match(body, /值班灯亮了两次/);
  assert.doesNotMatch(body, /概要|章末钩子|改稿自检/);
});

test('reports a working draft without treating its metadata as a release error', () => {
  const report = analyzeFile(fixture);
  assert.equal(report.mode, 'draft');
  assert.equal(report.passed, true);
  assert.equal(report.paragraphCount, 4);
  assert.equal(report.metadataHits.length, 5);
});

test('release mode rejects metadata that leaked into a publishing file', () => {
  const report = analyzeText(fs.readFileSync(fixture, 'utf8'), { mode: 'release' });
  assert.equal(report.passed, false);
  assert.ok(report.metadataHits.includes('概要'));
});

test('release mode accepts a title and prose-only file', () => {
  const report = analyzeFile(releaseFixture, { mode: 'release' });
  assert.equal(report.passed, true);
  assert.deepEqual(report.metadataHits, []);
});

test('extracts a publishing file from a working draft', () => {
  const working = fs.readFileSync(fixture, 'utf8');
  const release = extractRelease(working);
  assert.match(release, /^# Sample Chapter/);
  assert.doesNotMatch(release, /概要|爽点|情绪曲线|章末钩子|改稿自检/);
  assert.match(release, /值班灯亮了两次/);
});

test('flags banned phrasing and early timeline information', () => {
  const report = analyzeText('它还不知道发生了什么。1969 年的记录随后出现。');
  assert.deepEqual(report.bannedPhraseHits, ['它还不知道']);
  assert.deepEqual(report.forbiddenInfoHits, ['1969']);
  assert.equal(report.passed, false);
});
