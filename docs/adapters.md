# Agent adapters

The workflow is written as portable Markdown so it can be used from different file-aware agents.

## Codex

1. Open the repository root.
2. Read `skills/hy-novel-studio/SKILL.md`.
3. Read only the stage file needed for the current task.
4. Use `prompts/full_pipeline.md` for a staged chapter task.
5. Keep manuscript changes in the private project directory and run `story-qc` before release.

## Claude Code and oh-story-claudecode users

`oh-story-claudecode` is an upstream reference, not a runtime dependency of this repository. Its scan/deconstruct/write/de-AI-ify shape is represented here by the `market-scan`, `story-teardown`, `chapter-write` and `depattern` stages. Do not install both workflows into the same project without choosing one source of truth for project memory and hooks.

## AI-Novel-Writing-Assistant users

The project template is a plain Markdown interchange boundary. Export or copy only the confirmed project memory, outline and chapter artifacts that you intend to review. Do not copy database files, chat history, credentials or unreviewed third-party assets into the public repository.

## Generic agents

The only required interface is:

```text
project root
  context/        confirmed project memory
  manuscript/     private working chapters
  reports/        diagnostics and release candidates
  knowledge/      optional research notes
```

An adapter may map its own commands to the twelve phase IDs, but it should preserve the phase order, artifact boundary and human review gate.
