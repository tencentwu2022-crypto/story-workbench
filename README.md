# story-workbench

This project is independent of OpenAI and is not an official OpenAI project or sponsorship.

这是一个完整的中文网文写作工作流：从市场样本与拆文、项目记忆、黄金前三章、卷纲章纲，到正文初稿、爽点、爽点密度、去套路化、连续性和终审，最后进入可发布稿质检。

完整流程说明见 [Integrated workflow](docs/integrated-workflow.md)，代理接入见 [Agent adapters](docs/adapters.md)，来源与许可证边界见 [Lineage and licenses](docs/lineage-and-licenses.md)。

面向长篇 Markdown 小说的人机协作质量检查工具。

`story-workbench` 不生成小说，也不判断“AI率”。它把长篇改稿中最容易失控、又适合自动报警的部分做成可复现检查：发布稿是否混入工作元数据、是否提前泄露信息、是否出现项目定义的预告式套话，以及段落和比喻标记的基本统计。

## 为什么做这个项目

长篇改稿真正困难的地方，通常不是生成一句更漂亮的话，而是保持：

- 跨章节硬数据不漂移；
- 人物当前知道的信息不越界；
- 工作稿和发布稿不发生版本漂移；
- 工具只报警，最终判断仍由作者完成。

这个仓库提供一个小而透明的基线，方便作者、编辑和代理工作流在每次改稿后复核结果。

## 快速开始

需要 Node.js 20 或更高版本，项目无运行时依赖，也不需要 API key。

```bash
npm test
npm run check:sample
npm run workflow:list
npm run workflow:check
node src/cli.js path/to/chapter.md --json
node src/cli.js path/to/release.md --release
node src/release-cli.js path/to/working.md path/to/release.md
node src/workflow-cli.js init path/to/my-novel
```

`--release` 模式会把工作元数据泄漏视为失败。普通模式允许工作稿保留概要、爽点、情绪曲线和章末钩子。

`story-release` 只从工作稿的第一个 `---` 分隔线之后、章末钩子之前提取正文，并写出标题加正文的发布稿。

## 设计边界

这是质量门，不是作者替代品：

- 检查结果需要人工回看语境；
- 没有“真人率”“AI率”或签约概率结论；
- 默认规则面向中文长篇，但规则表可以替换；
- 示例文本全部为人工编写的脱敏内容；
- 仓库不包含任何未公开小说正文、聊天记录或密钥。

## 与 Codex 的关系

Codex 可以用于这个仓库的代码实现、测试、规则审查和发布前检查；它不是运行时必需组件。仓库中的 [Codex 工作流说明](docs/codex.md) 规定了如何让代理先读约束、只改授权文件、运行测试并报告证据。

申请材料的占位稿见 [Codex for Open Source application brief](docs/codex-oss-application.md)。它不是官方评分表，提交前请重新核对官方项目页面。

## 项目状态

当前为 0.2.0：提供完整的十二阶段写作工作流、项目模板、`story-workflow` 项目管理 CLI，以及 `story-qc` / `story-release` 发布质量门。

## References

An anonymized practice record is in [case study](docs/case-study.md), and version changes are tracked in [CHANGELOG](CHANGELOG.md).

## License

代码使用 MIT License。示例与文档不包含任何未授权的第三方小说文本。
