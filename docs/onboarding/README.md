---
title: Onboarding
doc_type: onboarding
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-07
related:
  [
    "docs/standards/documentation.md",
    "docs/process/git-workflow.md",
    "docs/process/project-management.md",
    "docs/technologies/stack.md",
  ]
tags: [onboarding, process]
---

# Onboarding

This document orients new contributors to the repository. Read it before making any changes.

---

## Start Here

1. Read the root `README.md` for a project overview.
2. Read this document in full.
3. Read the required documents listed in `CLAUDE.md`.

---

## Repository Structure

| Directory            | Purpose                                |
| -------------------- | -------------------------------------- |
| `docs/architecture/` | Current system structure — what exists |
| `docs/standards/`    | Rules all contributors must follow     |
| `docs/process/`      | Workflows and operational procedures   |
| `docs/agents/`       | AI agent capabilities and constraints  |
| `docs/technologies/` | Tools in use and why                   |
| `docs/onboarding/`   | This directory                         |

---

## Required Reading

Before contributing, read the following documents in order:

1. `docs/agents/capabilities.md` — what AI agents can do
2. `docs/agents/constraints.md` — what AI agents must not do
3. `docs/standards/documentation.md` — how all documents must be written
4. `docs/process/doc-governance.md` — when to create, update, or delete docs
5. `docs/process/project-management.md` — how work is initiated and tracked
6. `docs/process/git-workflow.md` — branching and merge conventions
7. `docs/process/pr-format.md` — pull request structure
8. `docs/process/done-criteria.md` — merge criteria
9. `docs/technologies/stack.md` — what tools are in use

---

## Local Tooling Setup

Check [package.json](../../package.json) under "engines" for the minimum required Node.js version.

```bash
npm install
```

---

## Workflow

The end-to-end workflow is defined in [Project Management](../process/project-management.md). Branch
naming is defined in [Git Workflow](../process/git-workflow.md). Pull request structure is defined
in [Pull Request Format](../process/pr-format.md).
