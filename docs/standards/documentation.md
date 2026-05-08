---
title: Documentation Standards
doc_type: standard
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-07
related: ["docs/process/doc-governance.md", "docs/agents/constraints.md"]
tags: [documentation, standards]
---

# Documentation Standards

This document defines the standards for writing and structuring documentation in this repository. It
covers metadata requirements, writing tone, and formatting rules.

For how and when to create, update, or delete documents, see
[Documentation Governance](../process/doc-governance.md). For agent-specific restrictions on
documentation, see [Agent Constraints](../agents/constraints.md).

---

## Metadata Headers

Every document must begin with a YAML frontmatter block. Metadata enables machine-assisted workflows
including search, indexing, lifecycle tracking, and AI reasoning.

### Template

```yaml
---
title: <Human-readable document title>
doc_type: <architecture | agent | process | standard | technology | onboarding>
status: <draft | accepted | deprecated | superseded>
owners: ["@github-handle"]
last_reviewed: YYYY-MM-DD
related: []
tags: []
---
```

### Field Reference

#### `title` (required)

A short, descriptive, human-readable name.

- Use Title Case.
- Must match the H1 heading of the document.
- Used as the primary index key for search and AI tooling.

#### `doc_type` (required)

The semantic category of the document. Must correspond to the folder the document lives in.

| Value          | Folder               |
| -------------- | -------------------- |
| `architecture` | `docs/architecture/` |
| `agent`        | `docs/agents/`       |
| `process`      | `docs/process/`      |
| `standard`     | `docs/standards/`    |
| `technology`   | `docs/technologies/` |
| `onboarding`   | `docs/onboarding/`   |

#### `status` (required)

The lifecycle state of the document.

| Value        | Meaning                                                             |
| ------------ | ------------------------------------------------------------------- |
| `draft`      | Still evolving. Not yet authoritative.                              |
| `accepted`   | Authoritative and current.                                          |
| `deprecated` | No longer valid. Retained for history.                              |
| `superseded` | Replaced by another document. Link to the replacement in `related`. |

For lifecycle rules governing when to change status, see
[Documentation Governance](../process/doc-governance.md).

#### `owners` (required)

GitHub handles of people responsible for the accuracy of this document. Ownership reflects
responsibility, not authorship.

- Use GitHub handles only (e.g., `@handle`).
- At least one owner is required.

#### `last_reviewed` (required)

The date the document was last reviewed for accuracy, in `YYYY-MM-DD` format. Must be updated on
every substantive review, even when no content changes.

#### `related` (required)

File paths to related documents. Enables agents to navigate the document graph explicitly rather
than by inference. May be an empty array (`[]`) but must be present.

```yaml
related: ["docs/process/doc-governance.md", "docs/process/git-workflow.md"]
```

#### `tags` (required)

Lowercase keywords for cross-cutting concerns. Improves discoverability and helps AI cluster related
documents. May be an empty array (`[]`) but must be present.

Rules:

- Lowercase only.
- No spaces — use hyphens if needed.
- Maximum 6 tags per document.
- Use only values from the approved tag vocabulary below.

Approved tags:

`documentation` | `standards` | `workflow` | `git` | `ci-cd` | `ai-agent` | `architecture` |
`onboarding` | `process` | `tooling` | `governance`

To add a new tag, open a PR updating this list. Agents must not introduce tags outside this
vocabulary.

### Metadata Rules

- All required fields must be present. Documents missing required fields will fail CI.
- `related` and `tags` may be empty arrays (`[]`) but must always be present.
- Metadata must be updated when a document's lifecycle state, ownership, or relationships change.

---

## Writing Standards

Documentation must be factual, neutral, and durable.

- Use clear, declarative language describing current intent or constraints.
- Avoid first-person or collective pronouns (`I`, `we`, `our`).
- Avoid speculative phrasing (`likely`, `probably`, `eventually`).
- Avoid opinionated or promotional language.
- Avoid assumptions about future scale, usage, or requirements.

---

## Formatting Rules

### Headings

- Every document must have exactly one H1, matching the `title` metadata field.
- Headings must follow a logical hierarchy — do not skip levels.
- Headings must not be used for decorative purposes.

### Prose

- Wrap prose at the configured line length defined in the repository formatting configuration.

### Lists

- Use lists for discrete, enumerable items only.
- Do not use lists as a substitute for prose when continuous explanation is more appropriate.

### Code Blocks

- Always specify a language identifier for fenced code blocks.
- Use code blocks for file paths, commands, configuration examples, and inline values.
