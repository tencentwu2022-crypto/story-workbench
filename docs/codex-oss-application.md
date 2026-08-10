# Codex for Open Source application brief

这是申请材料草稿，不代表 OpenAI 的评分标准或录取承诺。提交前应根据官方当时的项目页面重新核对资格与条款。

## Project

- Name: `燃稿引擎 (Ran Gao Engine)`
- URL: `https://github.com/tencentwu2022-crypto/ran-gao-engine`
- License: MIT
- Current release: `0.2.1`

## One-sentence description

`燃稿引擎` is a dependency-free, human-reviewed Chinese web-novel workflow covering planning, project memory, golden-three analysis, chapter drafting, payoff and density analysis, de-patterning, continuity, final editing, and release quality gates.

## Why this belongs in open source

The repository turns a private editing practice into a transparent, reusable quality gate. It does not publish any private manuscript and does not claim to detect an “AI rate”. Rules are inspectable, fixtures are synthetic, and every new rule requires a test.

## How Codex is used

- implementation and review of the CLI;
- test generation and regression checks;
- documentation and release preparation;
- maintainer workflow review with no private manuscript committed.
- staged orchestration of the twelve Markdown skills and project template;

## Evidence to add before applying

- public repository URL and first release;
- CI runs and test history;
- examples from users or contributors;
- issue and pull-request activity;
- a short note describing what support would unlock next.

## Current public scope

The public repository now includes the complete workflow specification and synthetic template, while unpublished manuscripts remain private. It is intentionally model-agnostic and does not bundle a ranking scraper, model API key, or third-party source code.

## 可直接粘贴到申请表

### GitHub 用户名

`tencentwu2022-crypto`

> 如果表单中的 `TennysonWu` 是显示名而不是登录名，请改填实际 GitHub 登录名。当前公开仓库所有者是 `tencentwu2022-crypto`。

### GitHub 代码仓库 URL

`https://github.com/tencentwu2022-crypto/ran-gao-engine`

### 角色

核心维护者

### 为什么这个代码仓库符合要求（500 字以内）

燃稿引擎是一个刚完成首个公开版本的中文网文全流程开源工作流。它把项目记忆、黄金前三章、章纲、正文写作、爽点、爽点密度、去套路化、连续性和发布质检拆成可检查的 Markdown Skill，并提供无依赖 CLI、项目模板和 CI。当前项目尚无可代表性的 stars 或下载量，我申请支持并非为了夸大规模，而是希望把一次真实的长篇创作实践整理成可复用、可审阅、可持续维护的公共基础设施。项目使用 Codex 参与代码实现、测试、文档、版本发布和维护审查，额度将直接用于下一阶段的公开评测与社区可复现示例。

### 你将如何针对自己的项目使用 API 额度（500 字以内）

我计划将 API 作为可选、明确提示的模型适配层，用于：1）在合成夹具和获授权的公开样本上评测 12 个阶段的提示词与结构化输出；2）比较章节规划、前三章诊断、爽点/密度/连续性审计的稳定性；3）生成可复核的 JSON 报告、回归样例和文档；4）支持 Codex 参与 PR 审查、发布前检查与维护自动化。默认不上传未公开小说、聊天记录或凭据，用户内容仅在明确同意时处理，并提供脱敏、关闭 API 和本地模式。结果会以测试、示例和版本记录公开，避免宣称“AI率”或签约保证。

### 还有其他需要说明的事项吗？

项目目前是早期公开版本，GitHub stars 和下载量尚未形成规模；仓库已经公开、采用 MIT License、CI 通过，且不包含未公开小说正文。希望通过本次支持，把它从个人创作工作流推进为面向中文网文作者和代理开发者的可复现基础设施。项目与 OpenAI 无官方隶属关系，申请内容不代表 OpenAI 的评分或录取承诺。

## Privacy boundary

The public repository contains only code, synthetic fixtures, and process documentation. Unpublished novels, user content, chat exports, credentials, and local workspace paths remain outside the repository.
