# Copilot Instructions

This repository is a React + TypeScript SPA using Vite, CSS Modules, React Router, and Supabase.
Full standards are in `docs/standards/`. The rules below govern all code suggestions.

---

## Components

There are two kinds of components. Keep them separate.

**Shared UI primitives** live in `src/components/ui/`. They are generic, dumb, and reusable. They
must not fetch data, reference domain types, or encode feature logic. Generic names are correct
here: `Button`, `Input`, `Modal`.

**Feature components** live in `src/features/<feature>/components/`. They compose primitives into
domain workflows. They have specific names: `EventCoverPicker`, `RsvpButton`, `FloatingEmojis`.

A component that has accumulated boolean flags (`isSpecialMode`, `useAlternateLayout`) must be
split, not extended.

## State

- State lives at the lowest component that reasonably owns it.
- Form values are owned by the form. Page-level data is owned by the page.
- Do not duplicate state that a hook already owns.
- Cross-cutting state lives in a context provider in `src/providers/`. Context is not a substitute
  for prop passing.

## CSS

- CSS Modules only. One `.module.css` file per component, co-located.
- No inline `style` attributes unless the value is runtime-dynamic and cannot be expressed with a
  class.
- No global styles except `globals.css` and `variables.css`.
- Components must not set their own `width`, `height`, or `max-width`. Sizing is owned by the parent
  layout.
- Components must not set `overflow`. Scroll boundaries are owned by the wrapping page or pane.
- Variants (`buttonPrimary`, `buttonSecondary`) are camelCase. No BEM.

## Services and Data

- All Supabase access goes through `src/services/events/`. Components must not import the Supabase
  client directly.
- `snake_case` field names must not appear in component files. Mapping happens in
  `events.mappers.ts`.
- Tables render rows and call callbacks. They do not fetch.

## Structure

- New feature folders in `src/features/<name>/` are created when the work has its own routes and
  domain logic.
- Do not create folders before they contain files.
- Do not create a `features/shared/` folder. Cross-feature primitives belong in `components/ui/`.

## Naming

- Shared UI: generic (`Button`, `Input`).
- Feature components: specific and domain-descriptive (`EventCard`, `PhotoPickerPanel`).
- Avoid `DataTable`, `Manager`, `Handler`, `Wrapper` for feature components.

## Files

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  ComponentName.types.ts   # only when types warrant extraction
  index.ts                 # only when re-exports are needed
```

---

Full standards: `docs/standards/frontend-philosophy.md`, `docs/standards/css.md`,
`docs/standards/project-structure.md`.
