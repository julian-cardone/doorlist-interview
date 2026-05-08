---
title: CI Pipeline
doc_type: process
status: draft
owners: ["@julian-cardone"]
last_reviewed: 2026-05-07
related:
  ["docs/technologies/stack.md", "docs/process/pr-format.md", "docs/process/done-criteria.md"]
tags: [ci-cd, workflow, tooling, governance]
---

# CI Pipeline

This document describes the automated CI pipeline for this repository. It defines what each workflow
checks and when it runs.

CI is the authoritative enforcement gate for repository standards. Local tooling execution is the
contributor's responsibility, but CI is the final authority.

---

## Workflows

### `ci.yml`

The single entry point for pull request checks. Triggers on `pull_request` events of type `opened`,
`synchronize`, `reopened`, and `edited` against `main`. In-progress runs for the same branch are
cancelled when a new commit is pushed.

The workflow currently defines triggers, permissions, and concurrency only. No jobs are defined yet.
Jobs will be added as enforcement requirements are introduced.

---

## What Must Pass Before Merge

All required status checks must pass before a pull request can be merged. Required checks are
configured through branch protection rules on `main`.

For the full list of merge requirements, see [Definition of Done](./done-criteria.md).
