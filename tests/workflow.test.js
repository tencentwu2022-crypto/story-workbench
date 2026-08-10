const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { initProject, inspectProject, listPhases } = require('../src/workflow');

const tempRoot = path.join(__dirname, '.tmp');
fs.mkdirSync(tempRoot, { recursive: true });

test('lists the complete twelve-stage workflow', () => {
  const phases = listPhases();
  assert.equal(phases.length, 12);
  assert.equal(phases[4].id, 'golden-three');
  assert.equal(phases[7].id, 'payoff');
  assert.equal(phases[8].id, 'density');
  assert.equal(phases[9].id, 'depattern');
  assert.equal(phases[11].id, 'final-edit');
});

test('initializes and validates a novel project template', () => {
  const root = fs.mkdtempSync(path.join(tempRoot, 'ran-gao-engine-'));
  try {
    const report = initProject(root);
    assert.equal(report.passed, true);
    assert.deepEqual(report.missingFiles, []);
    assert.deepEqual(report.missingDirs, []);
    assert.equal(fs.existsSync(path.join(root, 'context', 'project_bible.md')), true);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('reports missing project memory files', () => {
  const root = fs.mkdtempSync(path.join(tempRoot, 'ran-gao-engine-empty-'));
  try {
    const report = inspectProject(root);
    assert.equal(report.passed, false);
    assert.equal(report.missingFiles.includes(path.join('context', 'project_bible.md')), true);
    assert.equal(report.missingDirs.includes('manuscript'), true);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
