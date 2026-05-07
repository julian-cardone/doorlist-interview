---
title: Git Workflow
doc_type: process
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-02
related: ["docs/process/pr-format.md", "docs/agents/constraints.md"]
tags: [git, workflow, process]
---

# Git Workflow

This document defines the branching and merge model for the repository. It is the source of truth
for branch naming and merge strategy.

For prohibitions on direct pushes, force pushes, and self-merging, see
[Agent Constraints](../agents/constraints.md). For pull request structure, see
[Pull Request Format](./pr-format.md).

## Branching Model

The repository follows a trunk-based workflow. `main` is the default branch. All changes are made on
a non-target branch and merged via pull request.

### Branch Naming Convention

Branches must follow this format:

```text
issue-<id>-<slug>
```

Where `<id>` is the GitHub issue number and `<slug>` is a short, hyphenated summary of the work.

Examples:

```text
issue-3-docs-guidelines
issue-12-auth-flow-design
issue-27-update-architecture-diagram
```

### Rules

- A branch must correspond to an existing issue.
- Branch names must be lowercase, hyphen-separated.
- Slugs should be concise.

## Merge Strategy

Pull requests are merged into `main` using **squash merge**. This produces a single clean commit per
issue and a direct mapping between issue and merged change.

## Enforcement

The workflow is enforced through branch protection rules, required pull request reviews, CODEOWNERS
routing, and required status checks. These controls are configured in repository settings.
