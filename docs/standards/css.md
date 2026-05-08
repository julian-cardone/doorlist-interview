---
title: CSS Standards
doc_type: standard
status: draft
owners: ["@julian-cardone"]
last_reviewed: 2026-05-07
related:
  [
    "docs/standards/frontend-philosophy.md",
    "docs/standards/project-structure.md",
    "docs/standards/documentation.md",
  ]
tags: [standards]
---

# CSS Standards

This document defines the conventions for styling React components. It covers the styling system,
sizing and overflow ownership, variants, file placement, and class naming.

For component design principles, see [Frontend Philosophy](./frontend-philosophy.md). For folder
layout, see [Project Structure](./project-structure.md).

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

Inline `style` attributes must not be used except when the value is genuinely dynamic and cannot be
expressed through a class. Examples of acceptable inline use include positioning values computed
from runtime measurement and animation delays derived from element index.

---

## Parent-Owned Sizing

Components must not set their own external width, height, or maximum width. Sizing is a layout
concern and is owned by the parent.

```css
/* Disallowed: the component declares its own width. */
.button {
  width: 200px;
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

---

## Parent-Owned Scrolling

Reusable components must not declare their own overflow behavior. Scroll boundaries are determined
by the wrapping page or pane.

```css
/* Disallowed: the table declares its own scroll boundary. */
.tableBody {
  overflow-y: auto;
  max-height: 400px;
}

/* Allowed: the table renders structure; the wrapper handles overflow. */
.tableBody {
  /* no overflow rules */
}
```

This rule allows a single table or list component to function inside a fixed-height pane, a
fully-scrolling page, or a modal without modification.

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
