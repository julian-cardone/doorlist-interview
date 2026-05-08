---
title: Pull Request Format
doc_type: process
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-07
related: ["docs/process/git-workflow.md", "docs/process/done-criteria.md"]
tags: [workflow, git, process]
---

# Pull Request Format

This document defines how to structure a pull request. For the criteria that must be satisfied
before merging, see [Definition of Done](./done-criteria.md). For the branching and merge model, see
[Git Workflow](./git-workflow.md).

The pull request title becomes the squash commit message on `main`. Individual development commits
are unconstrained and do not appear in permanent history.

---

## Title

Titles are plain descriptive sentences that summarize the change. Use sentence case. No prefixes, no
type or scope tags.

Examples:

```text
Add capabilities and constraints documents
Fix required file paths in doc-checks workflow
Correct broken cross-reference in onboarding doc
```

The title is the permanent commit record. It must accurately summarize the change.

---

## Body Template

```markdown
## Summary

<!-- What changed and why -->

## Changes

<!-- List of specific changes made -->

## Related

<!-- Closes #<id> -->
```

The pull request description is the permanent record of context, reasoning, and issue references for
a change. Git history contains only the title — all additional context belongs in the description,
which remains accessible on GitHub after merge.

---

## Issue Linking

Issue references belong in the description, not in the title. Use GitHub's closing keywords:

```text
Closes #42
```

This closes the issue automatically on merge and keeps the title clean for the commit record. Issue
linking is required for all pull requests.
