---
title: Project Management
doc_type: process
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-07
related: ["docs/process/git-workflow.md", "docs/process/pr-format.md"]
tags: [workflow, governance, process]
---

# Project Management

This document defines how work is initiated and completed within the repository.

All work must originate from a GitHub issue.

## Issues Are Required

An issue must exist before:

- Creating a branch.
- Opening a pull request.
- Making non-trivial documentation changes.

Each issue represents a single unit of work.

Each issue must map to a single primary branch.

Issues serve as the canonical record of intent.

## Project Board States

Work progresses through the following states:

1. **Backlog** – Identified but not started.
2. **Ready** – Ready to be worked on.
3. **In progress** – Actively being worked on.
4. **In review** – A pull request has been opened and is awaiting approval and merge.
5. **Done** – Merged into `main`.

State transitions must reflect reality.

An issue must not be moved to **Done** until its corresponding pull request is merged.

## Commands

### `/start`

Run `/start <description>` at the beginning of every unit of work before touching any files.
Automates project setup: creates the issue, creates the branch, and moves the issue to **In
progress** on the project board.

## Workflow

The standard workflow is:

1. Create issue.
2. Add issue to the project workboard.
3. Create branch linked to issue.
4. Open pull request.
5. Review and merge.
6. The issue is automatically closed when the pull request is merged.

Branch naming, pull request requirements, and merge strategy are defined separately.

## Closure Rules

Issues must be closed through pull request merge using GitHub's automatic closing mechanism.

Issues must not be manually closed unless the work is explicitly abandoned.

Manual closure must include justification in a comment.
