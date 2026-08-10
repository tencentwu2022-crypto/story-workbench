# Integrated web-novel workflow

`燃稿引擎` now contains the complete `hy-novel-studio` workflow, not only the release checker. The workflow is model-agnostic: Markdown skills describe the editorial decisions, while the author or an agent supplies the model and performs the human review.

## Twelve stages

| Stage | Responsibility | Main artifact |
|---|---|---|
| market-scan | inspect supplied, verifiable market samples | market notes |
| story-teardown | abstract story mechanisms without copying expression | teardown report |
| project-build | define the story engine and project constraints | project bible and style bible |
| memory-update | maintain characters, timeline, foreshadowing and arc state | project memory |
| golden-three | design and review the first three chapters | opening diagnosis |
| outline | turn arcs into chapter plans and scene cards | outline package |
| chapter-write | draft a chapter from the approved constraints | working draft |
| payoff | test expectation, resistance and emotional payoff | payoff ledger |
| density | inspect event density, waiting time and static spans | rhythm report |
| depattern | reduce template language while protecting author voice | revision list |
| continuity | audit time, knowledge, resources and rules | continuity report |
| final-edit | reconcile reports and produce a directed revision | release candidate |

The named features “黄金前三章分析”, “爽点分析器”, “爽点密度检测” and “AI 去套路化” are the `golden-three`, `payoff`, `density` and `depattern` stages. They are editorial heuristics, not platform algorithms and not an “AI rate” detector.

## Quick start

```bash
npm install
npm run workflow:list
node src/workflow-cli.js init ../my-novel
node src/workflow-cli.js check ../my-novel --json
```

Load `skills/hy-novel-studio/SKILL.md` in a file-aware agent, then use `prompts/full_pipeline.md` for a staged chapter task. Keep the actual manuscript in the initialized project directory, not in this public repository.

After a chapter is revised:

```bash
node src/cli.js ../my-novel/manuscript/chapter.md --json
node src/release-cli.js ../my-novel/manuscript/chapter.md ../my-novel/reports/chapter.release.md
node src/cli.js ../my-novel/reports/chapter.release.md --release
```

The Markdown skills are intentionally inspectable. They do not call a model, scrape a platform, or claim that a chapter will sign or retain readers.
