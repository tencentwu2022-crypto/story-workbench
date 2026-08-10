const fs = require('node:fs');

const BANNED_PATTERNS = [
  '它还不知道',
  '谁也没想到',
  '真正的危机',
  '才刚刚开始',
  '而代价是',
  '更糟的还在后面',
  '那是后话',
  '心中一暖',
  '眼底闪过',
  '嘴角勾起',
  '空气仿佛凝固',
  '时间仿佛静止',
  '众所周知',
  '不得不说',
  '值得一提的是',
  '几乎同时',
  '就在这时',
  '霎时间',
  '那一刻'
];

const FORBIDDEN_INFO_PATTERNS = [
  '1969',
  '旭日一号',
  '旭日号',
  '纪云川',
  '六十七年',
  '67年',
  '共轭褶皱',
  '卫星桥'
];

function countMatches(text, pattern) {
  return [...text.matchAll(new RegExp(pattern, 'g'))].length;
}

function extractBody(text) {
  const normalized = String(text).replace(/^\uFEFF/, '');
  const separator = normalized.indexOf('---');
  const start = separator >= 0 ? separator + 3 : normalized.indexOf('\n') + 1;
  const hook = normalized.indexOf('> **章末钩子**', start);
  const end = hook >= 0 ? hook : normalized.length;
  return normalized.slice(Math.max(0, start), end).trim();
}

function analyzeText(text, options = {}) {
  const source = String(text).replace(/^\uFEFF/, '');
  const body = extractBody(source);
  const paragraphs = body.split(/\r?\n\s*\r?\n/).map((item) => item.trim()).filter(Boolean);
  const lengths = paragraphs.map((item) => item.replace(/\s/g, '').length);
  const charCount = body.replace(/\s/g, '').length;
  const paragraphCount = paragraphs.length;
  const averageParagraphChars = paragraphCount
    ? Number((lengths.reduce((sum, length) => sum + length, 0) / paragraphCount).toFixed(1))
    : 0;
  const shortParagraphCount = lengths.filter((length) => length <= 15).length;
  const shortParagraphRatio = paragraphCount
    ? Number((shortParagraphCount / paragraphCount).toFixed(3))
    : 0;
  const bannedPhraseHits = BANNED_PATTERNS.filter((phrase) => source.includes(phrase));
  const forbiddenInfoHits = FORBIDDEN_INFO_PATTERNS.filter((phrase) => source.includes(phrase));
  const metadataHits = ['概要', '爽点', '情绪曲线', '改稿自检', '章末钩子']
    .filter((phrase) => source.includes(phrase));
  const simileCount = countMatches(body, '像|仿佛|如同');
  const releaseMode = options.mode === 'release';
  const passed = bannedPhraseHits.length === 0
    && forbiddenInfoHits.length === 0
    && (!releaseMode || metadataHits.length === 0);

  return {
    mode: releaseMode ? 'release' : 'draft',
    charCount,
    paragraphCount,
    averageParagraphChars,
    shortParagraphCount,
    shortParagraphRatio,
    simileCount,
    bannedPhraseHits,
    forbiddenInfoHits,
    metadataHits,
    passed
  };
}

function analyzeFile(filePath, options = {}) {
  return analyzeText(fs.readFileSync(filePath, 'utf8'), options);
}

module.exports = {
  BANNED_PATTERNS,
  FORBIDDEN_INFO_PATTERNS,
  analyzeText,
  analyzeFile,
  extractBody
};
