---
title: Documentation Governance
doc_type: process
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-01
related:
  [
    "docs/standards/documentation.md",
    "docs/agents/constraints.md",
    "docs/process/git-workflow.md",
    "docs/adrs/0001-documentation-structure.md",
  ]
tags: [documentation, governance, process]
---

# Documentation Governance

This document defines when to create, update, or delete documentation, and the rules governing
document lifecycle transitions. It applies to all contributors, including AI agents.

For writing and formatting rules, see [Documentation Standards](../standards/documentation.md). For
agent-specific restrictions, see [Agent Constraints](../agents/constraints.md). For PR and branching
rules, see [Git Workflow](../process/git-workflow.md).

---

## Creating vs. Updating Documents

Create a new document when a change introduces a concept, decision, or responsibility that has no
existing home in the repository.

Update an existing document when a change refines, corrects, or extends a concept that document
already owns.

Do not duplicate information across documents. If a concept is already defined elsewhere, link to
it. The existing document remains the source of truth.

When in doubt, prefer updating and linking over creating a near-duplicate.

---

## Documentation and Code Changes

When a pull request alters architecture, system behavior, workflows, or operational processes, the
relevant documentation must be updated in the same pull request.

Pull request reviewers are responsible for verifying that required documentation updates have been
made before approving.

---

## Lifecycle and Status Transitions

Every document has a `status` field in its metadata header. Status must be updated when the
document's authority or validity changes. The following rules govern when each transition is
appropriate.

### `draft` → `accepted`

A document moves from `draft` to `accepted` when it has been reviewed and is considered
authoritative. This transition requires human approval via PR review.

### `accepted` → `deprecated`

A document is marked `deprecated` when it is no longer valid but must be retained for historical
reference. The document must not be deleted. A note must be added at the top of the document
explaining why it was deprecated and when.

### `accepted` → `superseded`

A document is marked `superseded` when it has been replaced by another document. The `related` field
must link to the replacement. A note must be added at the top of the document identifying the
replacement.

### ADR-specific: `proposed` → `accepted`

ADRs begin as `proposed` while under review. They move to `accepted` once a decision is confirmed
via PR approval. This is the only document type that uses `proposed` status.

---

## Deletion Rules

Documentation must not be deleted unless it meets the criteria below.

ADRs must never be deleted. If an ADR is no longer valid, its status must be updated to `deprecated`
or `superseded`.

A document may be deleted when all of the following are true:

- The concept, process, or decision it describes no longer exists.
- No other document references it as a source of truth.
- Any inbound links to the document have been removed or updated.

When in doubt, prefer updating a document's status over deleting it. Outdated documentation with an
accurate status is less harmful than a broken link or a silent gap.

---

## Diagram Maintenance

When architecture documentation is introduced or changed, any associated diagrams must be updated in
the same pull request. Diagrams must not contradict written documentation.

---

## Command and Skill Maintenance

When a document that is referenced by or inlined into a command or skill changes, the affected
command or skill must be updated in the same pull request. Pull request reviewers are responsible
for verifying this before approving.

The commands in `.claude/commands/` and skills in `.claude/skills/` are the primary artifacts
subject to this rule.
