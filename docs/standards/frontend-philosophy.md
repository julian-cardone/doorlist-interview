---
title: Frontend Philosophy
doc_type: standard
status: draft
owners: ["@julian-cardone"]
last_reviewed: 2026-05-08
related:
  [
    "docs/standards/css.md",
    "docs/standards/project-structure.md",
    "docs/standards/layout.md",
    "docs/standards/documentation.md",
  ]
tags: [standards]
---

# Frontend Philosophy

This document defines the principles governing component design, state ownership, abstraction, and
naming in frontend code. It applies to all React components and supporting modules.

For CSS conventions, see [CSS Standards](./css.md). For folder layout and module organization, see
[Project Structure](./project-structure.md). For flex layout and scroll ownership patterns, see
[Layout](./layout.md).

---

## Guiding Principles

Frontend code must be scalable and simple. Components must have a single, well-scoped
responsibility. Explicit structure must be preferred over generic abstractions. Abstraction is
introduced only when the repeated structure is stable and the abstraction is simpler than the
duplication it replaces.

---

## Component Layers

Components fall into one of two categories. The boundary between them must be preserved.

### Shared UI Primitives

Shared UI primitives live in `components/ui/` and provide reusable building blocks used across the
application. Examples include `Button`, `Input`, `Select`, `Checkbox`, `Modal`, `SectionPanel`, and
`Table`.

Shared UI primitives must:

- Render layout, structure, and visual states.
- Expose variants for stable visual modes.
- Handle accessibility basics including focus management and keyboard interaction.

Shared UI primitives must not:

- Fetch data.
- Make permission or authorization decisions.
- Reference backend models or domain types.
- Encode feature-specific layout, columns, or workflows.

Generic names are appropriate for shared UI primitives.

### Feature Components

Feature components live in `features/<feature>/components/` and compose shared primitives into
domain-specific workflows. Examples include `EventCoverPicker`, `RsvpButton`, and `EventCard`.

Feature components may reference feature models, workflow logic, and business decisions. They own
loading, error, and empty states for their section, action handlers tied to their workflow, and
modal state for modals they open. They pass data and callbacks to shared primitives without
extending those primitives with feature-specific logic.

Feature components must use names that describe their domain responsibility.

---

## Pages Are Shells

A page component is a layout shell. Workflow logic, content rendering, and state management belong
in feature components.

A page component contains exactly three things:

1. The surface — background color, background image, or gradient overlay.
2. The layout container — `max-width`, padding, and the top-level flex or grid arrangement of
   content areas, including their sizing rules (`flex: 1`, `flex-shrink: 0`).
3. Feature component instances, one per content area.

```tsx
/* Disallowed: the page renders content directly. */
export default function EventViewPage() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.page}>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      {/* ... 60 more lines of content ... */}
    </div>
  );
}

/* Required: the page wires feature components into a layout. */
export default function EventViewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.surface} aria-hidden="true" />
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

A block of JSX inside a page component must be extracted to a feature component when any of the
following are true:

- It owns its own state.
- It manages a workflow.
- It is a distinct visual section, such as a card, panel, detail list, or action group.

If a page accumulates more than a handful of lines of content directly, the content must be
extracted.

Page-level state — fetched data, current selection, route parameters — remains owned by the page and
is passed to feature components as props. The page does not render the data itself.

---

## State Ownership

State must live at the lowest component that reasonably owns it.

The following ownership patterns apply:

- Form input values are owned by the form component.
- Selected items are owned by the component that manages selection within a section.
- Modal open and closed state is owned by the component that opens the modal.
- Page-level data, including current selection and fetched results, is owned by the page component.

State must not be duplicated. If a hook owns data, components must consume that hook rather than
shadowing its state with additional `useState` calls. Independent caching or transformation is the
only justification for parallel state.

State that is not owned by a single component must be lifted into a context provider. Context is
intended for cross-cutting concerns such as theme, authentication, and current user. Context must
not be used as a substitute for short-distance prop passing.

---

## Props and Typing

Every component must declare a typed props interface. Untyped or implicit `any` props are
disallowed.

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

Small components may declare their props type inline within the component file. Components large
enough to justify a `.types.ts` file must place the props type there.

### The `className` Prop

Reusable components must accept an optional `className` prop and forward it to their root element.
This is the supported mechanism by which a parent adjusts the external presentation of a child.

```tsx
type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return <div className={`${styles.card} ${className ?? ""}`}>{children}</div>;
}
```

Parents must use `className` rather than overriding the child's internal classes through descendant
selectors. The child remains in control of its internal structure; the parent supplies external
adjustments such as margin, sizing within the parent's layout, or feature-specific decoration.

The `className` prop must not be used to redefine the component's intrinsic shape (padding,
typography, variants). Those concerns belong to the component itself.

---

## Abstraction

Before introducing an abstraction, the following must be true:

1. The repeated structure is stable and unlikely to diverge.
2. The abstraction is simpler than the duplication it replaces.
3. The abstraction makes the next feature easier to implement.

If any condition is not met, the duplication must be retained until it is.

Appropriate abstractions include:

- Table primitives that render structure without owning data.
- Section panel primitives that provide consistent page section layout.
- Variants on shared UI primitives.
- Mappers that translate between API and application models.

Abstractions must not be introduced for:

- A single generic `DataTable` covering all table use cases.
- A single universal `Pane` covering all section types.
- A unified form engine.
- Selection logic shared across unrelated features.

Two similar components are acceptable. Three is the threshold at which a shared pattern should be
considered.

---

## Naming

Names must describe domain responsibility.

Generic names are reserved for shared UI primitives in `components/ui/`. Examples: `Button`,
`Input`, `Modal`.

Feature components must use specific, descriptive names. Examples: `EventCoverPicker`, `RsvpButton`,
`FloatingEmojis`.

The following names must not be used for feature components: `DataTable`, `Manager`, `Handler`,
`Wrapper`. These names indicate either insufficient scoping or excessive responsibility.

---

## Forms

Form components own field values, validation state, and the shape of submission data.

Parent components own the consequences of submission, including API calls, navigation, and success
state. A clear or reset action must reset form state and invoke an `onClear` callback so the parent
can clear derived state.

---

## Tables

Table components render rows and columns and invoke callbacks. They must not fetch data or own
workflow state.

Table components must accept:

- The rows or items to render.
- Selected identifiers, when selection is supported.
- Callbacks for row-level actions such as `onSelect`, `onPreview`, or `onAction`.

The component wrapping a table owns the workflow state, including loading, errors, modals, and
selected identifiers.

---

## Type and Model Separation

When backend response shapes differ from frontend type shapes, the two must be kept separate.

- Backend types must use backend conventions, including `snake_case`.
- Frontend types must use frontend conventions, including `camelCase`.
- Mappers must translate between the two at the service boundary.

`snake_case` field names must not appear in component files. A `snake_case` reference inside a
component indicates a missing or misplaced mapper.

---

## Comments

Comments must explain why code exists or what invariant it preserves. Comments must not narrate the
code's literal behavior.

```ts
/**
 * Returns the canonical identity for a row, used to deduplicate across paginated requests.
 */
```

---

## File Co-location

Component files must be co-located in a folder named after the component:

```text
ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  ComponentName.types.ts   # only when types warrant a separate file
  index.ts                 # only when re-exports are useful
```

Small components may be a single `.tsx` file with co-located types. The `.types.ts` and `index.ts`
files must be created only when the component has grown enough to justify the split.

---

## Component Scope

Components must be narrow in scope. A component must do one specific job well rather than accept
configuration flags that change its behavior.

A component that has accumulated boolean flags such as `isSpecialMode` or `useAlternateLayout`
indicates a missed split. Such components must be divided rather than extended with additional
flags.
