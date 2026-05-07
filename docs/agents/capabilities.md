---
title: Agent Capabilities
doc_type: agent
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-02
related: ["docs/agents/constraints.md", "docs/process/ownership.md"]
tags: [ai-agent, governance, tooling]
---

# Agent Capabilities

This document defines what AI agents are permitted to do in this repository. Read alongside
[Agent Constraints](./constraints.md), which defines what agents must not do.

## Permitted Actions

### Reading and Writing

Agents may read or modify any file in the repository. Human review via pull request is the
enforcement gate for all changes.

### Git Operations

Agents may:

- Create branches per [Git Workflow](../process/git-workflow.md).
- Create and remove worktrees for task isolation.
- Stage and commit changes.
- Open pull requests per [Pull Request Format](../process/pr-format.md).

### Running Commands

Agents may run any command that is read-only or otherwise non-destructive. This includes inspecting
git state, running linters and formatters, searching the filesystem, executing non-mutating `gh`
operations (issue and PR reads, comments, drafts, label and run inspection), and invoking project
tooling defined in [Technology Stack](../technologies/stack.md).

Destructive or irreversible commands require explicit instruction. Specific prohibitions — including
merging, approving, closing, force-pushing, and bypassing CI — are defined in
[Agent Constraints](./constraints.md).

When uncertain whether a command is destructive, agents must ask before running it.

### Documentation

Agents may create and update documentation when instructed. Changes must satisfy
[Documentation Standards](../standards/documentation.md) and the merge criteria in
[Definition of Done](../process/done-criteria.md). Restrictions on documentation modifications are
defined in [Agent Constraints](./constraints.md).
