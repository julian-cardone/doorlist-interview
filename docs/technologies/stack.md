---
title: Technology Stack
doc_type: technology
status: accepted
owners: ["@julian-cardone"]
last_reviewed: 2026-05-07
related:
  [
    "docs/technologies/supabase.md",
    "docs/technologies/vercel.md",
    "docs/standards/frontend-philosophy.md",
    "docs/standards/css.md",
    "docs/standards/project-structure.md",
    "docs/process/ci-pipeline.md",
    "docs/agents/capabilities.md",
  ]
tags: [tooling, ai-agent, ci-cd]
---

# Technology Stack

This document defines the approved tooling stack for this repository. It covers the purpose of each
tool and the rationale for its inclusion. It is the authoritative reference for what tools are in
use and why.

For how these tools are configured in CI, see [CI Pipeline](../process/ci-pipeline.md). For how
agents interact with these tools, see [Agent Capabilities](../agents/capabilities.md).

---

## Frontend

### React

React is the UI framework for this project. All views and components are built as React functional
components.

### Vite

Vite is the build tool and development server. It compiles the TypeScript and React source into the
static SPA bundle deployed to Vercel.

### TypeScript

TypeScript is the language for all source code. Type definitions live alongside the code they
describe, with separate `.types.ts` files extracted only when warranted by size.

### CSS Modules

Component styles use CSS Modules. The conventions governing styling are defined in
[CSS Standards](../standards/css.md).

---

## Backend

### Supabase

Supabase provides the Postgres database and the auto-generated REST API used by the frontend. The
public anonymous client is the only access path. No custom backend code exists in this project.

For the data model, environment variables, and integration details, see [Supabase](./supabase.md).

---

## Hosting and Deployment

### Vercel

Vercel hosts the production deployment and produces preview deployments for every branch. It builds
the Vite SPA on every push and serves the resulting static assets.

For build configuration, environment variables, and routing details, see [Vercel](./vercel.md).

---

## AI-Assisted Development

### Claude Code

Claude Code is the primary AI agent for this repository. It is used for agentic development tasks
including multi-file edits, documentation drafting, and codebase reasoning. It operates via the
terminal and as a VS Code extension.

Claude Code reads `CLAUDE.md` at the repository root as its primary instruction file. All agent
behavior is governed by the constraints and capabilities defined in `docs/agents/`. Use
`.claudeignore` to exclude files and directories from Claude's view of the repository.

### GitHub Copilot

GitHub Copilot provides inline code completions and chat assistance within VS Code. The Autofixes
feature applies suggested corrections directly in the editor. Copilot Code Review provides automated
pull request feedback in CI. Copilot reads `.github/copilot-instructions.md` for repository-specific
instructions.

### Codebase Q&A

Copilot `@workspace` is the approved tool for repository queries — asking questions about code,
documentation, or architecture without initiating an agentic task. `@workspace` provides RAG-based
retrieval across the codebase at significantly lower token cost than an agentic Claude Code session.
Use `@workspace` when the goal is understanding, not making changes.

---

## Version Control and Project Management

### GitHub

GitHub is the authoritative platform for version control, pull request review, and project
management. It is the single system of record for all repository changes and project state.

---

## CI and Automation

### GitHub Actions

GitHub Actions is the CI and automation platform for this repository. It orchestrates all automated
validation, linting, and enforcement jobs. CI is the authoritative enforcement gate for all
repository standards — local tooling execution is the contributor's responsibility, but CI is the
final authority.

Workflow definitions live in `.github/workflows/`. For details on what each job does and when it
runs, see [CI Pipeline](../process/ci-pipeline.md).

---

## Formatting

### Prettier

Prettier is installed as a devDependency and used to format Markdown files. No project-level
configuration file is checked in; Prettier defaults apply.

---

## Adding or Replacing Tools

Tool additions or replacements that change the scope of the approved stack require an update to this
document and a corresponding PR. Individual configuration changes do not require an update to this
document.
