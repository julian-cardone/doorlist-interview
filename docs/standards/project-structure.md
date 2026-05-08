---
title: Project Structure
doc_type: standard
status: draft
owners: ["@julian-cardone"]
last_reviewed: 2026-05-07
related:
  [
    "docs/standards/frontend-philosophy.md",
    "docs/standards/css.md",
    "docs/standards/documentation.md",
  ]
tags: [standards]
---

# Project Structure

This document defines the folder layout for frontend code. It covers the boundary between shared and
feature code, service organization, hooks and providers, and the rules for introducing new folders.

For component design principles, see [Frontend Philosophy](./frontend-philosophy.md). For styling
conventions, see [CSS Standards](./css.md).

---

## Reference Layout

```text
src/
  components/
    ui/                     # Shared UI primitives
      Button/
      Input/
      Modal/

  features/
    <feature-name>/
      components/           # Feature components
      hooks/                # Feature-scoped hooks
      lib/                  # Feature-scoped pure logic
      models/               # Feature domain types
      pages/                # Routed page components

  hooks/                    # Cross-cutting hooks
  providers/                # Context providers
  services/                 # API clients and integration code
  lib/                      # Cross-cutting pure utilities
  styles/
    globals.css
    variables.css
```

A feature folder must include only the subfolders that contain files. A folder must not be created
in advance of its contents.

---

## Components vs. Features

The boundary between `components/ui/` and `features/<feature>/components/` must be preserved.

`components/ui/` contains primitives that are domain-agnostic and may be used by any feature. These
primitives must not import from `features/`.

`features/<feature>/components/` contains components that reference domain models, workflows, and
business decisions. These components may import from `components/ui/` and from their own feature.

A component that is used by only one feature must live in that feature. Promotion to
`components/ui/` requires that the component is genuinely domain-agnostic and is needed by a second
feature.

---

## Services

Services encapsulate backend integration. Components must not call backend APIs directly.

A service folder includes:

```text
services/
  events/
    events.api.ts        # API request functions
    events.mappers.ts    # API-to-application type mapping
    events.types.ts      # API and application types
    index.ts             # Public surface
```

Components import from a service's public surface (`index.ts`). Components must not import internal
service files directly.

`snake_case` field names and raw API response shapes must not appear outside of service files. Any
such reference in a component indicates a missing or misplaced mapper.

---

## Hooks and Providers

Hooks are organized by scope.

- Cross-cutting hooks live in `src/hooks/`. Examples include `useDebounce`, `useLocalStorage`, and
  `useMediaQuery`.
- Feature-scoped hooks live in `features/<feature>/hooks/`. Examples include `useEvent` and
  `useRsvp`.

A hook used by only one feature must live in that feature. Promotion to `src/hooks/` requires use by
a second feature.

Context providers live in `src/providers/`. The hooks that read from each provider live alongside
the provider.

---

## Feature Folders

A new `features/<name>/` folder must be created when both of the following are true:

1. The work has its own routes, pages, or distinct user-facing flow.
2. The work has its own domain models or workflow logic that does not belong in another feature.

A feature folder must not be created for components that lack distinct domain logic. A confirmation
dialog or a generic notification banner is not a feature.

---

## Pages

Page components live in `features/<feature>/pages/`. Smaller projects may place pages in a top-level
`src/pages/` folder when no feature folder is justified.

Pages own:

- Wiring of feature components into a screen.
- Page-level state, including current selection, fetched data, and route parameters.
- Routing concerns specific to the page.

Pages must remain thin. Workflow logic must live in feature components or hooks.

---

## Imports

Imports must use a feature or service's public surface (`features/events`, `services/events`) rather
than reaching into internal files. An `index.ts` at each boundary defines the public surface.

Within a feature, relative imports between sibling files are permitted.

---

## Folder Discipline

The following constraints apply to folder creation:

- A folder must not be created before it contains a file.
- Nested `components/` folders within a feature must not exceed two levels.
- A `shared/` folder under `features/` must not be created. Cross-feature primitives belong in
  `components/ui/`.
- A `utils/` folder must not be used as a general-purpose collection. Utilities must be grouped by
  category (`date`, `string`, `dom`) into named files or sub-areas.

Folder depth must follow project complexity. Additional structure is introduced when files exist to
populate it.
