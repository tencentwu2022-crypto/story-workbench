#!/usr/bin/env node

const path = require('node:path');
const { initProject, inspectProject, listPhases } = require('./workflow');

const [command, value] = process.argv.slice(2);
const json = process.argv.includes('--json');

function print(valueToPrint) {
  console.log(json ? JSON.stringify(valueToPrint, null, 2) : valueToPrint);
}

try {
  if (command === 'list') {
    const phases = listPhases();
    if (json) {
      print(phases);
    } else {
      for (const phase of phases) {
        console.log(`${String(phase.order).padStart(2, '0')}. /${phase.id} — ${phase.purpose} -> ${phase.output}`);
      }
    }
  } else if (command === 'check' && value) {
    const report = inspectProject(path.resolve(value));
    print(report);
    if (!report.passed) process.exitCode = 1;
  } else if (command === 'init' && value) {
    const report = initProject(path.resolve(value));
    print(report);
  } else {
    console.error('Usage: story-workflow list [--json] | check <project-dir> [--json] | init <project-dir> [--json]');
    process.exitCode = 2;
  }
} catch (error) {
  console.error(`story-workflow: ${error.message}`);
  process.exitCode = 1;
}
