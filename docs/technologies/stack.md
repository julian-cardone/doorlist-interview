---
title: Technology Stack
doc_type: technology
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-04-27
related:
  [
    "docs/adrs/0003-ai-assisted-development.md",
    "docs/adrs/0004-repository-tooling-stack.md",
    "docs/process/ci-pipeline.md",
    "docs/agents/capabilities.md",
  ]
tags: [tooling, ai-agent, ci-cd]
---

# Technology Stack

This document defines the approved tooling stack for this repository. It covers the purpose of each
tool and the rationale for its inclusion. It is the authoritative reference for what tools are in
use and why.

For the architectural decisions that led to this stack, see
[ADR-0004: Repository Tooling Stack](../adrs/0004-repository-tooling-stack.md). For how these tools
are configured in CI, see [CI Pipeline](../process/ci-pipeline.md). For how agents interact with
these tools, see [Agent Capabilities](../agents/capabilities.md).

---

## AI-Assisted Development

### Claude Code

Claude Code is the primary AI agent for this repository. It is used for agentic development tasks
including multi-file edits, documentation drafting, and codebase reasoning. It operates via the
terminal and as a VS Code extension.

Claude Code reads `CLAUDE.md` at the repository root as its primary instruction file. All agent
behavior is governed by the constraints and capabilities defined in `docs/agents/`. Use
`.claudeignore` to exclude files and directories from Claude's view of the repository.

### GitHub Copilot

GitHub Copilot provides inline code completions and chat assistance within VS Code. The Autofixes
feature applies suggested corrections directly in the editor. Copilot Code Review provides automated
pull request feedback in CI. Copilot reads `.github/copilot-instructions.md` for repository-specific
instructions.

### Codebase Q&A

Copilot `@workspace` is the approved tool for repository queries — asking questions about code,
documentation, or architecture without initiating an agentic task. `@workspace` provides RAG-based
retrieval across the codebase at significantly lower token cost than an agentic Claude Code session.
Use `@workspace` when the goal is understanding, not making changes.

---

## Version Control and Project Management

### GitHub

GitHub is the authoritative platform for version control, pull request review, and project
management. It is the single system of record for all repository changes and project state.

The decision to use GitHub for project management is documented in
[ADR-0002: GitHub for Project Management](../adrs/0002-github-for-project-management.md).

### Dependabot

Dependabot provides automated dependency management. It opens pull requests to update dependencies
when new versions are available. No manual configuration is required beyond the repository-level
Dependabot settings.

---

## CI and Automation

### GitHub Actions

GitHub Actions is the CI and automation platform for this repository. It orchestrates all automated
validation, linting, and enforcement jobs. CI is the authoritative enforcement gate for all
repository standards — local tooling execution is the contributor's responsibility, but CI is the
final authority.

Workflow definitions live in `.github/workflows/`. For details on what each job does and when it
runs, see [CI Pipeline](../process/ci-pipeline.md).

---

## Formatting

### Prettier

Prettier is the general-purpose formatter for this repository. It handles automatic formatting of
the following file types:

- Markdown.

Prettier is configured to run on save in VS Code via `.vscode/settings.json`. Configuration lives in
`.prettierrc.json`. Files excluded from formatting are listed in `.prettierignore`.

---

## Documentation Validation

### markdownlint-cli2

`markdownlint-cli2` validates Markdown structure across all `.md` files. It enforces heading
hierarchy, block spacing, and other structural rules. Configuration lives in
`.markdownlint-cli2.yaml`.

### Vale

Vale is configured as a prose quality enforcement tool. The base configuration in `.vale.ini` skips
YAML frontmatter blocks. Vale requires style packages before it will enforce prose rules — style
setup is project-specific. No styles are currently active. Vale enforcement is inactive.

### markdown-link-check

`markdown-link-check` validates that all hyperlinks in Markdown files resolve correctly. It runs in
CI on changes to `docs/` and `README.md`, and will fail a pull request if any link is broken. This
is the primary guard against documentation link rot.

---

## Adding or Replacing Tools

Tool additions or replacements that change the scope of the approved stack require an update to this
document and a corresponding PR. If the change represents a significant architectural shift, a new
ADR should be considered. Individual configuration changes do not require an update to this
document.
