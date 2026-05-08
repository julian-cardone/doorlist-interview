---
name: frontend
description:
  Use this skill whenever creating, modifying, or refactoring React components, CSS, or frontend
  folder structure in this repository. Triggers include any request to build a component, page,
  form, panel, modal, table, or other UI element; any work on `.tsx`, `.module.css`, or files under
  `src/components/`, `src/features/`, `src/services/`, `src/hooks/`, or `src/providers/`; any
  styling work; any decision about where a new file should live. Use this skill BEFORE writing any
  frontend code, even for small changes — the rules around parent-owned sizing, component layering,
  and CSS Modules are non-obvious and easy to violate by default.
---

# Frontend

This skill encodes the frontend standards for this repository. Apply these rules to every component,
every CSS file, and every new folder.

The full standards live in `docs/standards/`. This skill front-loads the rules that matter most at
the moment of code generation. When something is ambiguous, consult the linked standards.

## Before writing any component

Decide which layer the component belongs to. The two layers have different responsibilities and the
boundary must not blur.

**Shared UI primitive** (`src/components/ui/`): generic, reusable, domain-agnostic. Examples:
`Button`, `Input`, `Modal`, `SectionPanel`. Generic names are correct. Must NOT fetch data,
reference domain types, or encode feature-specific layout.

**Feature component** (`src/features/<feature>/components/`): domain-specific. Examples:
`EventCoverPicker`, `RsvpButton`, `FloatingEmojis`. Specific names required. May reference feature
models and own workflow state.

If a component is used by only one feature, it lives in that feature. Promote to `components/ui/`
only when a second feature actually needs it.

See `docs/standards/frontend-philosophy.md` for the full rules on component layers.

## Hard rules — never violate

These are the rules that are easiest to get wrong and hardest to spot in review. Internalize them.

### CSS Modules only

- One `.module.css` file per component, co-located in the component folder.
- No inline `style={{...}}` attributes unless the value is genuinely runtime-dynamic (e.g. animation
  delay computed from index).
- No global CSS except `src/styles/globals.css` (resets, base typography) and
  `src/styles/variables.css` (design tokens).
- No BEM. CSS Module scoping makes it redundant. Use camelCase variants: `buttonPrimary`, not
  `button--primary`.

### Parent owns sizing

Components must not set their own `width`, `height`, or `max-width`.

```css
/* WRONG */
.button {
  width: 200px;
}

/* RIGHT — only intrinsic shape */
.button {
  padding: 0.5rem 1rem;
}
```

The parent decides external size through its own layout (flex, grid, or wrapper width). The same
component must work in a flex container, a grid cell, and a fixed-width wrapper without
modification.

Intrinsic sizing (padding, line-height, gap) is fine — that's the component's internal shape, not
its external footprint.

### Parent owns scrolling

Components must not declare their own overflow behavior.

```css
/* WRONG */
.tableBody {
  overflow-y: auto;
  max-height: 400px;
}

/* RIGHT — wrapper handles overflow */
.tableBody {
  /* no overflow rules */
}
```

The wrapping page or pane decides whether content scrolls and where the scroll boundary is.

### No data fetching in primitives or tables

- `components/ui/` primitives never fetch.
- Tables render rows and call callbacks. They never fetch.
- All Supabase access goes through `src/services/events/`. Components never import the Supabase
  client directly.

### No `snake_case` in components

If `event.host_name` appears in a `.tsx` file, the mapper isn't doing its job. All API ↔ app type
translation happens in `src/services/<service>/<service>.mappers.ts`. Components only ever see
camelCase frontend types.

## State ownership

Put state at the lowest component that reasonably owns it:

- **Form values** — owned by the form component.
- **Selected items / modal open state** — owned by the pane that manages the workflow.
- **Page-level data (fetched results, current selection)** — owned by the page component.
- **Cross-cutting state (theme, current user)** — lifted into a context provider in
  `src/providers/`.

Do not duplicate state. If a hook owns data, components consume the hook — they don't shadow it with
another `useState`.

Context is for genuinely cross-cutting concerns. Do not use context just to skip prop passing two
levels.

## Naming

| Layer                | Naming                       | Examples                                      |
| -------------------- | ---------------------------- | --------------------------------------------- |
| Shared UI primitives | Generic                      | `Button`, `Input`, `Modal`, `Table`           |
| Feature components   | Specific, domain-descriptive | `EventCard`, `PhotoPickerPanel`, `RsvpButton` |

Avoid these names for feature components: `DataTable`, `Manager`, `Handler`, `Wrapper`. They signal
the component is doing too much or hasn't been thought through.

## Component scope

A component does one specific job. If you find yourself adding boolean flags like `isSpecialMode` or
`useAlternateLayout` to an existing component, split the component instead.

## File layout

```text
ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  ComponentName.types.ts   # only when types warrant a separate file
  index.ts                 # only when re-exports add real value
```

Small components can be a single `.tsx` file with co-located types. Only split out `.types.ts` and
`index.ts` when the component grows enough to justify it.

## Where new files go

```text
src/
  components/ui/<PrimitiveName>/      # generic primitives
  features/<feature>/
    components/<ComponentName>/       # feature components
    hooks/                            # feature-scoped hooks
    lib/                              # feature-scoped pure logic
    pages/                            # routed pages
  services/<service>/                 # API integration + mappers
  hooks/                              # cross-cutting hooks
  providers/                          # context providers
  styles/                             # globals.css, variables.css
```

Rules:

- Do not create folders before they contain files.
- A new `features/<name>/` folder requires both: distinct routes/pages/flow AND its own domain
  logic.
- No `features/shared/`. Cross-feature primitives belong in `components/ui/`.
- No catch-all `utils/`. Group utilities by category into named files.

See `docs/standards/project-structure.md` for the full rules.

## Abstraction

Before extracting a shared component or utility, all three must be true:

1. The repeated structure is stable and unlikely to diverge.
2. The abstraction is simpler than the duplication it replaces.
3. The abstraction makes the next feature easier.

Two similar components are fine. Three is when to look for the pattern.

Do not preemptively build a generic `DataTable`, universal `Pane`, or unified form engine. These
almost always grow into worse problems than the duplication they were meant to solve.

## Variants

When a primitive has a stable set of visual modes, use variants:

```tsx
<Button variant="primary" />
<Button variant="secondary" />
```

```css
.button {
  /* base */
}
.buttonPrimary {
  /* primary variant */
}
.buttonSecondary {
  /* secondary variant */
}
```

Two or three variants per primitive is healthy. Five or more is a sign the component is doing too
much and should be split.

## Quick checklist before submitting a component

- [ ] Lives in the right folder (`components/ui/` vs `features/<feature>/components/`)
- [ ] Has a co-located `.module.css` file (no inline styles, no global CSS)
- [ ] Doesn't set its own width, height, or max-width
- [ ] Doesn't declare its own overflow
- [ ] Doesn't fetch data (unless it's a page or a workflow-owning pane)
- [ ] No `snake_case` field references
- [ ] Name describes its responsibility (generic for primitives, specific for features)
- [ ] State lives at the lowest reasonable owner
- [ ] Doesn't have boolean flags that change its behavior fundamentally

## Reference

- `docs/standards/frontend-philosophy.md` — component layers, state, abstraction, naming
- `docs/standards/css.md` — CSS Modules, sizing, scrolling, variants
- `docs/standards/project-structure.md` — folders, services, when to add new features
