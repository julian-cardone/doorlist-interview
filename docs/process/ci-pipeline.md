---
title: CI Pipeline
doc_type: process
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-02
related:
  [
    "docs/technologies/stack.md",
    "docs/standards/documentation.md",
    "docs/process/pr-format.md",
    "docs/process/done-criteria.md",
  ]
tags: [ci-cd, workflow, tooling, governance]
---

# CI Pipeline

This document describes the automated CI pipeline for this repository. It defines what each workflow
checks, when it runs, and what must pass before a pull request can be merged.

CI is the authoritative enforcement gate for repository standards. Local tooling execution is the
contributor's responsibility, but CI is the final authority.

---

## Workflows

### `ci.yml`

The single entry point for all pull request checks. Triggers on `pull_request` events of type
`opened`, `synchronize`, `reopened`, and `edited` against `main`. A `guard` job skips all downstream
jobs for Dependabot pull requests. Remaining jobs are invoked as reusable workflows:
`markdown-checks.yml`, `validate-docs.yml`, and `pr-title.yml`. In-progress runs for the same branch
are cancelled when a new commit is pushed.

### `markdown-checks.yml`

A reusable workflow invoked by `ci.yml`. Scoped to Markdown files across the repository. Contains
two jobs.

#### markdownlint

Runs `markdownlint-cli2` via `npm run lint:md` against all Markdown files. Enforces structural rules
defined in `.markdownlint-cli2.yaml`, including heading hierarchy, block spacing, and line length.

#### link-check

Validates that all hyperlinks in Markdown files across the repository resolve correctly using
`gaurav-nelson/github-action-markdown-link-check`.

### `pr-title.yml`

A reusable workflow invoked by `ci.yml`. Validates that the pull request title conforms to the
conventional commit format using `amannn/action-semantic-pull-request`.

The PR title is used as the squash commit message on merge. Format requirements are defined in
[Pull Request Format](./pr-format.md).

### `validate-docs.yml`

A reusable workflow invoked by `ci.yml`. Scoped to documentation under `docs/`. Contains two jobs.

#### validate-doc-frontmatter

Validates frontmatter schema and content for all documents using
`scripts/validate-docs-frontmatter.mjs`. The script enforces the metadata rules defined in
[Documentation Standards](../standards/documentation.md).

#### vale

Runs Vale via `errata-ai/vale-action` against `docs/` to enforce tone, word choice, and style rules
defined in `.vale.ini`.

---

## Running Checks Locally

These commands can be run locally for early feedback. CI is the enforcement gate — local execution
is optional.

```bash
npm run format:md  # Prettier — formats all Markdown files
npm run lint:md    # markdownlint-cli2 — same config as CI
vale docs/         # Vale prose linter — same config as CI
```

---

## What Must Pass Before Merge

All required status checks must pass before a pull request can be merged. Checks are enforced
through branch protection rules on `main`.

For the full list of merge requirements, see [Definition of Done](./done-criteria.md).
