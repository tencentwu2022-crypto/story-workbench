# Hy Novel Studio v2

这是一个供 Hy 或其他支持自定义 Skill、项目指令、文件读取的 Agent 使用的中文长篇小说生产包。

## 本版新增

- 借鉴 `oh-story-claudecode` 的全流程拆分思路；
- 借鉴长篇小说系统的结构化项目记忆；
- 黄金前三章专项分析；
- 爽点分析；
- 爽点密度与节奏事件标注；
- AI 去套路化；
- 连续性审计；
- 总控路由器和质量闸门。

## 重要边界

本包没有复制外部项目的代码或原文规则，而是将公开可见的工作流思想重新设计为适合 Hy 的独立 Markdown Skill。

外部项目可能持续更新，许可条款也可能变化。若直接复制、修改或分发外部项目文件，应单独检查其当前许可证。

## 安装

### 有 Skill 目录的客户端

把整个文件夹复制到客户端的 Skill 或项目目录，主入口为：

`SKILL.md`

### 只有系统提示词的 Hy 客户端

1. 将 `SKILL.md` 作为总项目指令；
2. 按需要追加 `skills/` 下相应文件；
3. 将 `project_template` 复制为你的小说项目目录；
4. 每次调用提供项目文件和当前章节。

不要把所有子 Skill 永久塞进同一个系统提示词。总控应按任务加载对应子 Skill。

## 推荐目录

```text
my-novel/
├─ context/
│  ├─ project_bible.md
│  ├─ style_bible.md
│  ├─ character_cards.md
│  ├─ timeline.md
│  ├─ foreshadowing.md
│  └─ arc_state.md
├─ manuscript/
├─ reports/
└─ knowledge/
```

## 最常用指令

```text
/full-pipeline
项目路径：……
当前任务：修改第12章
```

或者使用 `prompts/full_pipeline.md`。

## 推荐模型参数

- 规划和审校：低随机性、较高推理；
- 正文初稿：中高随机性、低或中推理；
- 去套路化：中等随机性，最多两轮；
- 连续性：低随机性。

不同 Hy 客户端参数名可能不同。
