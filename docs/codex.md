# Using Codex with 燃稿引擎

Codex is used as a development and review assistant, not as a hidden content pipeline.

Recommended loop:

1. Read the repository rules and the current issue.
2. Inspect only the files needed for the change.
3. Make the smallest patch that preserves the public interface.
4. Run `npm test` and the relevant CLI command.
5. Review the diff for secrets, private manuscript text and unsupported claims.
6. Report the actual checks and any remaining risk.

Do not commit API keys, private prompts, unpublished manuscripts, or conversation exports. If an OpenAI API adapter is added later, it must be optional, documented, and covered by a separate privacy review.
