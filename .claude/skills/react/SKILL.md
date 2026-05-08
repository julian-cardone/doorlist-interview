---
name: react
description:
  Use this skill whenever creating, modifying, or refactoring React components or the frontend
  folder structure in this repository. Triggers include any request to build a component, page,
  form, panel, modal, table, or other UI element; any work on `.tsx` files under `src/components/`,
  `src/features/`, `src/services/`, `src/hooks/`, or `src/providers/`; any decision about where a
  new file should live; any refactor that splits or merges components. Use this skill BEFORE writing
  any React code, even small changes — the rules around component layering (UI primitives vs.
  feature components), pages-as-shells, props typing, the `className` prop convention, and state
  ownership are non-obvious and easy to violate by default.
---

# React

This skill encodes the React component standards for this repository. Apply these rules to every
component, every props type, and every new file.

The full standards live in `docs/standards/frontend-philosophy.md` and
`docs/standards/project-structure.md`. This skill front-loads the rules that matter most at the
moment of code generation. When something is ambiguous, consult the linked standards.

For styling and layout (`min-height: 0`, parent-owned scrolling, `rem`, CSS Modules), see the `css`
skill.

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

## Hard rules — never violate

### Pages are shells

A page component contains exactly three things:

1. **The surface** — background color, background image, or gradient overlay.
2. **The layout container** — max-width, padding, and the top-level flex/grid arrangement of content
   areas (with their sizing: `flex: 1`, `flex-shrink: 0`, etc.).
3. **Feature component instances** — one per content area.

Everything else — form rows, detail panels, action buttons, interactive state — belongs in a feature
component under `src/features/<feature>/components/`.

```tsx
// WRONG — page owns content
export default function EventViewPage() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.page}>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      {/* ... 60 more lines ... */}
    </div>
  );
}

// RIGHT — page is a shell
export default function EventViewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bgGradient} aria-hidden="true" />
      <div className={styles.layout}>
        <div className={styles.detailsArea}>
          <EventDetails />
        </div>
        <div className={styles.coverArea}>
          <EventCoverActions />
        </div>
      </div>
    </div>
  );
}
```

**When to extract from a page to a feature component:** any block of JSX that has its own state,
manages a workflow, or is a distinct visual section (card, panel, detail list, action group). If you
find yourself writing more than a handful of lines of content directly in a page, stop and extract.

### Every component has a typed props interface

Untyped props or implicit `any` are disallowed. Every component declares a props type.

```tsx
type ButtonProps = {
  variant: "primary" | "secondary";
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export function Button({ variant, onClick, children, className }: ButtonProps) {
  /* ... */
}
```

Small components may declare the props type inline in the same file. Components large enough to
justify a `.types.ts` file place the props type there.

### Reusable components accept and forward `className`

Reusable components accept an optional `className` prop and forward it to their root element. This
is the supported mechanism for parents to adjust external presentation:

```tsx
type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return <div className={`${styles.card} ${className ?? ""}`}>{children}</div>;
}
```

Parents use `className` rather than overriding the child's internal classes through descendant
selectors. The child remains in control of its internal structure; the parent supplies external
adjustments such as margin or sizing within the parent's layout.

The `className` prop must not be used to redefine the component's intrinsic shape (padding,
typography, variants). Those concerns belong to the component itself.

### No data fetching in primitives or tables

- `components/ui/` primitives never fetch data, never reference domain models, never make permission
  decisions.
- Tables render rows and call callbacks. They never fetch.
- All API access goes through `src/services/<service>/`. Components never import API clients
  directly.

### No `snake_case` in components

If `event.host_name` appears in a `.tsx` file, the mapper isn't doing its job. All API ↔ app type
translation happens in `src/services/<service>/<service>.mappers.ts`. Components only ever see
camelCase frontend types.

## State ownership

State lives at the lowest component that reasonably owns it.

- **Form values** — owned by the form component.
- **Selected items / modal open state** — owned by the pane that manages the workflow.
- **Page-level data (fetched results, current selection, route params)** — owned by the page
  component.
- **Cross-cutting state (theme, current user)** — lifted into a context provider in
  `src/providers/`.

Do not duplicate state. If a hook owns data, components consume the hook — they don't shadow it with
another `useState`. Independent caching or transformation is the only justification for parallel
state.

Context is for genuinely cross-cutting concerns. Do not use context just to skip prop passing two
levels.

## Forms

Form components own field values, validation state, and the shape of submission data.

Parent components own the consequences of submission — API calls, navigation, success state. A clear
or reset action must reset form state and invoke an `onClear` callback so the parent can clear
derived state.

## Tables

Table components render rows and columns and invoke callbacks. They must not fetch data or own
workflow state.

Tables accept:

- The rows or items to render.
- Selected identifiers, when selection is supported.
- Callbacks for row-level actions (`onSelect`, `onPreview`, `onAction`).

The component wrapping a table owns the workflow state — loading, errors, modals, selected
identifiers.

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

Component files are co-located in a folder named after the component:

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
    models/                           # feature domain types
    pages/                            # routed pages
  services/<service>/                 # API integration + mappers
  hooks/                              # cross-cutting hooks
  providers/                          # context providers
  styles/                             # reset.css, globals.css, variables.css

  App.tsx                             # root layout, renders <Outlet />
  router.tsx                          # route definitions
  index.tsx                           # DOM entry, mounts router, imports global styles
```

`App.tsx`, `router.tsx`, and `index.tsx` are the only `.tsx` files permitted directly under `src/`.
Each owns one concern: `index.tsx` mounts the router, the router renders `App`, `App` renders the
current route.

Rules:

- Do not create folders before they contain files.
- A new `features/<name>/` folder requires both: distinct routes/pages/flow AND its own domain
  logic.
- No `features/shared/`. Cross-feature primitives belong in `components/ui/`.
- No catch-all `utils/`. Group utilities by category into named files.

## Imports

Imports use a feature or service's public surface (`features/events`, `services/events`) rather than
reaching into internal files. An `index.ts` at each boundary defines the public surface.

Within a feature, relative imports between sibling files are permitted.

## Hooks and providers

Cross-cutting hooks live in `src/hooks/` (e.g. `useDebounce`, `useMediaQuery`). Feature-scoped hooks
live in `features/<feature>/hooks/` (e.g. `useEvent`, `useRsvp`).

A hook used by only one feature lives in that feature. Promotion to `src/hooks/` requires use by a
second feature.

Context providers live in `src/providers/`. The hooks that read from each provider live alongside
the provider.

## Abstraction

Before extracting a shared component or utility, all three must be true:

1. The repeated structure is stable and unlikely to diverge.
2. The abstraction is simpler than the duplication it replaces.
3. The abstraction makes the next feature easier to implement.

Two similar components are fine. Three is when to look for the pattern.

Do not preemptively build a generic `DataTable`, universal `Pane`, or unified form engine. These
almost always grow into worse problems than the duplication they were meant to solve.

## Comments

Comments must explain why code exists or what invariant it preserves. Comments must not narrate the
code's literal behavior.

```ts
/**
 * Returns the canonical identity for a row, used to deduplicate across paginated requests.
 */
```

## Quick checklist before submitting a component

- [ ] Lives in the right folder (`components/ui/` vs `features/<feature>/components/`)
- [ ] Has a typed props interface
- [ ] Reusable components accept and forward an optional `className` prop
- [ ] Doesn't fetch data (unless it's a page or a workflow-owning pane)
- [ ] No `snake_case` field references
- [ ] Name describes its responsibility (generic for primitives, specific for features)
- [ ] State lives at the lowest reasonable owner
- [ ] No boolean flags that fundamentally change behavior — split instead
- [ ] Page components are layout shells: surface, container, feature component instances only
- [ ] Co-located in a folder named after the component

## Reference

- `docs/standards/frontend-philosophy.md` — component layers, state, abstraction, naming, pages as
  shells, props typing, the `className` convention
- `docs/standards/project-structure.md` — folders, services, when to add new features, app entry
