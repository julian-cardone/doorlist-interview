---
title: Definition of Done
doc_type: process
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-02
related: ["docs/process/pr-format.md", "docs/process/doc-governance.md"]
tags: [workflow, governance, process]
---

# Definition of Done

This document defines the criteria that must be satisfied before a pull request can be merged. It is
a checklist for reviewers. For pull request structure and content rules, see
[Pull Request Format](./pr-format.md).

A pull request may be merged only after all applicable criteria below are satisfied.

## All Pull Requests

- The pull request follows [Pull Request Format](./pr-format.md).
- The change fulfills the intent of the referenced issue.
- All required CI status checks pass.
- Required human review has been completed.
- Documentation has been updated when required by [Doc Governance](./doc-governance.md).

## Documentation Changes

- The document is placed in the correct directory for its `doc_type`.
- A valid metadata header is present.
- No information is duplicated from another document.
- Related resources are updated.

## Architecture and Design Changes

- Architecture documentation reflects the current system structure.
- An ADR has been drafted for any significant architectural decision.
- Related resources are updated.
