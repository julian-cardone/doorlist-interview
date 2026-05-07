---
title: Ownership and Responsibility
doc_type: process
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-02
related: ["docs/agents/capabilities.md", "docs/agents/constraints.md"]
tags: [governance, process, ai-agent]
---

# Ownership and Responsibility

This document defines ownership rules for the repository. The owner of a document, workflow, or area
is responsible for its accuracy, maintenance, and review quality. AI tools may help produce content,
but responsibility always remains with a human owner.

## Document Ownership

Every document must list one or more owners in its metadata header. Document owners are responsible
for:

- Keeping the document accurate.
- Reviewing proposed changes for correctness.
- Updating the document when related decisions or workflows change.
- Rejecting changes that introduce drift, ambiguity, or contradictions.

## Code and Automation Ownership

When application code, scripts, or workflows are added, each area must have a clearly understood
owner. Owners are responsible for review, correctness, and keeping related documentation current.

## AI-Assisted Work

AI-generated content does not own itself. When AI is used to produce or modify a change, the human
submitting it is responsible for:

- Reviewing the full output.
- Validating correctness.
- Checking for unintended changes.
- Ensuring the result follows repository standards.
- Updating documentation when needed.

## Review Responsibility

Reviewers validate that a change is appropriate for the repository, not just that it looks
reasonable. Review includes confirming the change matches documented workflow, related documentation
was updated, and standards are met. Reviewers must request revision when standards are not met.

## Ownership Changes

Ownership must be updated when responsibility changes — when a new maintainer takes over, when a
document changes scope, or when a new subsystem is introduced. Ownership changes must be reflected
in document metadata and, where applicable, in CODEOWNERS.
