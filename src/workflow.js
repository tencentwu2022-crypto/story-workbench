const fs = require('node:fs');
const path = require('node:path');

const PHASES = [
  { id: 'market-scan', skill: '01-market-scan.md', purpose: '扫描可核实的题材、读者和市场样本', output: '市场观察与机会假设' },
  { id: 'story-teardown', skill: '02-story-teardown.md', purpose: '拆解样本的故事机制，不复制表达', output: '功能抽象拆文报告' },
  { id: 'project-build', skill: '03-project-architect.md', purpose: '建立故事发动机与项目边界', output: '项目圣经、风格圣经、主线约束' },
  { id: 'memory-update', skill: '04-story-memory.md', purpose: '维护人物、时间线、伏笔和状态', output: '结构化项目记忆' },
  { id: 'golden-three', skill: '05-golden-three.md', purpose: '设计和复核开篇前三章', output: '前三章诊断与改稿规格' },
  { id: 'outline', skill: '06-outline-engine.md', purpose: '把卷纲拆成章纲和场景卡', output: '章纲、场景卡、前后章接口' },
  { id: 'chapter-write', skill: '07-chapter-writer.md', purpose: '按约束生成正文初稿', output: '章节正文初稿' },
  { id: 'payoff', skill: '08-payoff-analyzer.md', purpose: '检查期待、阻力和情绪兑现', output: '爽点与兑现事件表' },
  { id: 'density', skill: '09-density-analyzer.md', purpose: '检查事件密度、等待时长和静态区', output: '节奏事件时间线' },
  { id: 'depattern', skill: '10-depattern-editor.md', purpose: '减少模板化表达并保护作者声音', output: '去套路化问题清单' },
  { id: 'continuity', skill: '11-continuity-auditor.md', purpose: '审计时间、人物所知和设定边界', output: '连续性问题清单' },
  { id: 'final-edit', skill: '12-final-editor.md', purpose: '按优先级综合诊断并终审', output: '定向修订稿与未决问题' },
];

const REQUIRED_CONTEXT = [
  'project_bible.md',
  'style_bible.md',
  'character_cards.md',
  'timeline.md',
  'foreshadowing.md',
  'arc_state.md',
];

function getWorkflowRoot() {
  return path.resolve(__dirname, '..', 'skills', 'hy-novel-studio');
}

function listPhases() {
  return PHASES.map((phase, index) => ({ order: index + 1, ...phase }));
}

function inspectProject(projectPath) {
  const root = path.resolve(projectPath);
  const contextRoot = path.join(root, 'context');
  const requiredFiles = REQUIRED_CONTEXT.map((name) => path.join(contextRoot, name));
  const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));
  const requiredDirs = ['context', 'manuscript', 'reports', 'knowledge'];
  const missingDirs = requiredDirs
    .map((name) => path.join(root, name))
    .filter((dir) => !fs.existsSync(dir));

  return {
    root,
    requiredFiles: REQUIRED_CONTEXT,
    missingFiles: missingFiles.map((file) => path.relative(root, file)),
    requiredDirs,
    missingDirs: missingDirs.map((dir) => path.relative(root, dir)),
    passed: missingFiles.length === 0 && missingDirs.length === 0,
  };
}

function initProject(projectPath) {
  const target = path.resolve(projectPath);
  if (fs.existsSync(target)) {
    const entries = fs.readdirSync(target);
    if (entries.length > 0) {
      throw new Error(`target directory is not empty: ${target}`);
    }
  } else {
    fs.mkdirSync(target, { recursive: true });
  }

  fs.cpSync(path.resolve(__dirname, '..', 'templates', 'novel-project'), target, {
    recursive: true,
    errorOnExist: false,
    force: false,
  });
  return inspectProject(target);
}

module.exports = {
  PHASES,
  REQUIRED_CONTEXT,
  getWorkflowRoot,
  initProject,
  inspectProject,
  listPhases,
};
