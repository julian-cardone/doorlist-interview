---
title: CSS Standards
doc_type: standard
status: draft
owners: ["@julian-cardone"]
last_reviewed: 2026-05-08
related:
  [
    "docs/standards/frontend-philosophy.md",
    "docs/standards/project-structure.md",
    "docs/standards/layout.md",
    "docs/standards/documentation.md",
  ]
tags: [standards]
---

# CSS Standards

This document defines the conventions for styling React components. It covers the styling system,
sizing and overflow ownership, variants, file placement, and class naming.

For component design principles, see [Frontend Philosophy](./frontend-philosophy.md). For folder
layout, see [Project Structure](./project-structure.md). For flex layout patterns and scroll
ownership recipes, see [Layout](./layout.md).

---

## Styling System

All component styles must use CSS Modules. Each component imports its own `.module.css` file.

```tsx
import styles from "./EventCard.module.css";

<div className={styles.card}>
  <h2 className={styles.title}>...</h2>
</div>;
```

Class names within a CSS Module are scoped at build time. Scoped names may be short and structural,
including names such as `card`, `title`, `actions`, and `header`.

Global CSS is restricted to:

- A single `globals.css` file containing CSS resets, base typography, and root-level defaults.
- A `variables.css` file (or equivalent) defining design tokens, including colors, spacing, radii,
  shadows, and font definitions.

Global styles must only be introduced when the rule is genuinely global. A rule that applies to a
single component or feature must not be placed in a global file.

Inline `style` attributes must not be used except when the value is genuinely dynamic and cannot be
expressed through a class. Examples of acceptable inline use include positioning values computed
from runtime measurement and animation delays derived from element index.

---

## Units

All CSS sizing must use `rem`, not `px`. This keeps values consistent with the user's font-size
preference and avoids brittle pixel math.

```css
/* Disallowed */
.avatar {
  width: 24px;
  height: 24px;
}

/* Allowed */
.avatar {
  width: 1.5rem;
  height: 1.5rem;
}
```

Common conversions, assuming a 16px base: `4px → 0.25rem`, `8px → 0.5rem`, `12px → 0.75rem`,
`16px → 1rem`, `24px → 1.5rem`, `32px → 2rem`. Odd values must be calculated, not rounded.

`px` is permitted only for values that are conceptually pixel-bound, such as a `1px` hairline
border, and for properties where `rem` is meaningless, such as `box-shadow` blur radii on extremely
small values.

---

## Parent-Owned Sizing

Components must not set their own external width, height, or maximum width. Sizing is a layout
concern and is owned by the parent.

```css
/* Disallowed: the component declares its own width. */
.button {
  width: 12.5rem;
}

/* Allowed: the component declares only its intrinsic shape. */
.button {
  padding: 0.5rem 1rem;
}
```

A component may declare intrinsic sizing through padding, line-height, and gap between internal
elements. These rules describe the component's internal shape. They do not declare the component's
external footprint.

The parent decides external sizing by means of its own layout — flex, grid, or an explicit container
width. The same component must function unchanged inside a flex container, a grid cell, or a
fixed-width wrapper.

Parents adjust a child's external presentation by passing a `className` prop, not by overriding the
child's internal styles. See [Frontend Philosophy](./frontend-philosophy.md) for the `className`
prop convention.

---

## Parent-Owned Scrolling

Reusable components must not declare their own overflow behavior. Scroll boundaries are determined
by the wrapping page or pane.

```css
/* Disallowed: the table declares its own scroll boundary. */
.tableBody {
  overflow-y: auto;
  max-height: 25rem;
}

/* Allowed: the table renders structure; the wrapper handles overflow. */
.tableBody {
  /* no overflow rules */
}
```

This rule allows a single table or list component to function inside a fixed-height pane, a
fully-scrolling page, or a modal without modification.

Each scrollable area must have exactly one scroll container. Page scroll, panel scroll, and
component-internal scroll must not stack within the same area. The recipes for assigning scroll
ownership are in [Layout](./layout.md).

---

## Layout Ownership Summary

The division of responsibility for layout concerns is:

| Concern                              | Owner                 |
| ------------------------------------ | --------------------- |
| External width, height, max-width    | Parent (page or pane) |
| Overflow and scroll boundaries       | Parent (page or pane) |
| Clipping                             | Parent (page or pane) |
| Intrinsic shape (padding, gap, etc.) | Component itself      |
| Variant styling                      | Component itself      |

Reusable components must fill width naturally, structure their content, expose variants, and avoid
viewport assumptions. The full set of layout patterns — including the `min-height: 0` and
`min-width: 0` rules that govern flex shrinking — is documented in [Layout](./layout.md).

---

## Variants

When a shared UI primitive supports a stable set of visual modes, those modes must be expressed as
variants.

```tsx
<Button variant="primary" />
<Button variant="secondary" />
<Input variant="ghost" />
```

```css
.button {
  /* base styles shared by all variants */
}

.buttonPrimary {
  /* primary variant */
}

.buttonSecondary {
  /* secondary variant */
}
```

Color and visual treatment must live in variants rather than in scattered component CSS.

A primitive should expose a small number of variants, typically two or three. A primitive that
requires five or more variants indicates excessive responsibility and should be split.

---

## File Placement

CSS files must be co-located with the component they style.

```text
EventCard/
  EventCard.tsx
  EventCard.module.css
```

A CSS file must contain only styles for its associated component. Styles for sibling or child
components belong in those components' own files.

---

## Reusable vs. Feature CSS

Shared UI primitives must contain only generic styles. Feature-specific styling lives in feature
components.

Generic styles owned by a shared primitive include:

- Structural layout for the primitive.
- Base typography.
- Variant definitions.

Feature-specific styles owned by a feature component include:

- Column widths and alignment for the data the feature renders.
- Placement and spacing of feature-specific actions.
- Feature-specific decorative treatment.

Feature-specific rules must not appear in `components/ui/` files. A feature-specific rule in a
shared primitive's CSS indicates a leak of domain knowledge into the primitive.

---

## Class Naming

Within a CSS Module, class names use camelCase and may be short and structural.

```css
.panel {
  /* ... */
}
.header {
  /* ... */
}
.content {
  /* ... */
}
.actions {
  /* ... */
}
```

Variants and modifiers are expressed through camelCase suffixes:

```css
.button {
  /* ... */
}
.buttonPrimary {
  /* ... */
}
.buttonDisabled {
  /* ... */
}
```

BEM block-element-modifier naming must not be used. Module scoping makes the namespacing prefix
redundant.

---

## Minimalism

CSS rules must be removed when they are not actively required. Each declaration must do work.

The following practices apply:

- Repeated values must be extracted into design tokens in `variables.css`.
- Magic numbers must not appear in component CSS. All recurring values must reference a token.
- Selectors must be as shallow as the markup permits.
- Override-driven styling must be avoided in favor of composition through variants.
