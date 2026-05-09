---
title: Layout
doc_type: standard
status: draft
owners: ["@julian-cardone"]
last_reviewed: 2026-05-08
related:
  [
    "docs/standards/css.md",
    "docs/standards/frontend-philosophy.md",
    "docs/standards/project-structure.md",
  ]
tags: [standards]
---

# Layout

This document defines the flex layout patterns used throughout the application. It covers the rules
that govern shrinking, scrolling, and the division of layout responsibility between pages, panes,
and reusable components.

For general styling conventions, see [CSS Standards](./css.md). For the principles that determine
which component owns which concern, see [Frontend Philosophy](./frontend-philosophy.md).

---

## Layout Ownership

Layout responsibility is divided across three roles. The boundary between them must be preserved.

| Role                  | Owns                                                 |
| --------------------- | ---------------------------------------------------- |
| Page                  | Major layout, surface, content area arrangement      |
| Pane                  | Overflow, height constraints, clipping, empty states |
| Reusable UI component | Internal structure, intrinsic shape, variants        |

Reusable components must not declare height constraints, overflow rules, or viewport assumptions.
Reusable components fill width naturally, structure their content, and expose variants. Pages and
panes constrain them.

---

## The `min-height: 0` Rule

In a flex column, children default to `min-height: auto`, which prevents them from shrinking below
their content height. This breaks scrolling: the child refuses to shrink, the scroll container never
receives a constrained height, and overflow has nothing to clip.

A flex child that needs to shrink, scroll, or contain a scrolling descendant must declare
`min-height: 0`.

```css
.parent {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.child {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
```

This rule must be applied at every level of a flex column chain that needs to shrink. Skipping a
single level breaks scrolling for everything below it.

---

## The `min-width: 0` Rule

In a flex row, children default to `min-width: auto`, which prevents them from shrinking below their
content width. This causes text overflow, blown-out containers, and tables that stretch
indefinitely.

A flex child that should shrink horizontally must declare `min-width: 0`.

```css
.row {
  display: flex;
}

.cell {
  flex: 1;
  min-width: 0;
}
```

This rule must be applied at every level of a flex row chain that should shrink. Skipping a single
level breaks containment for everything below it.

This rule applies heavily to:

- Table cells that contain long text or arbitrary content.
- Flex panes in side-by-side layouts.
- Any flex child whose content width is not bounded by the design.

---

## `align-items` and Width Inheritance

A flex container's `align-items` property determines how children are sized on the cross axis. The
default is `stretch`, which makes children fill the container's full cross-axis allocation. This is
what makes `min-width: 0` effective for children of a flex column: the parent allocates a definite
width and the child is bounded by it.

`align-items: center`, `flex-start`, or `flex-end` breaks this. Children are no longer stretched to
fill the parent — they size themselves to their content. A `min-width: 0` declaration on a child
that sits inside a `center`-aligned parent has no effect: there is no upstream definite width for it
to be bounded by.

```css
/* WRONG: children of this column become intrinsic-width.
   min-width: 0 on descendants has no effect. */
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* RIGHT: children fill the column's width. min-width: 0
   constraints on descendants are honoured. */
.page {
  display: flex;
  flex-direction: column;
  /* align-items: stretch is the default — do not override it */
}
```

Use `align-items: center` only for visual centering of fixed-size decorative elements where
intrinsic-width behavior is intentional. Never use it on a container whose children are expected to
participate in a width-constrained layout chain.

---

## Scroll Ownership

Scroll boundaries are owned by pages or panes. Reusable components must not own scrolling.

```tsx
/* Disallowed: the table owns scrolling. */
<Table />
```

```css
.table {
  overflow-y: auto;
}
```

```tsx
/* Required: the wrapping pane owns scrolling. */
<div className={styles.scroll}>
  <Table />
</div>
```

```css
.scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
```

Each scrollable area must have exactly one scroll container. Page scroll, pane scroll, and
component-internal scroll must not stack within the same area. Stacked scroll containers produce
nested scroll bars, unreachable content, and inconsistent keyboard scrolling.

---

## Standard Recipes

### Fixed header with a scrolling content region

```css
.parent {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.header {
  flex-shrink: 0;
}

.content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
```

The header retains its content height. The content region fills the remaining space and owns the
scroll boundary.

### Side-by-side panes with independent shrinking

```css
.row {
  display: flex;
  flex: 1;
  min-height: 0;
}

.left {
  flex: 1;
  min-width: 0;
}

.right {
  flex: 1;
  min-width: 0;
}
```

Each pane shrinks independently. Long content in either pane does not push the other pane out of the
viewport.

### Table cell that shrinks gracefully

```css
.row {
  display: flex;
}

.cell {
  flex: 1 5rem;
  min-width: 0;
}
```

The `flex: 1 5rem` shorthand sets a preferred basis of `5rem` while allowing the cell to grow and
shrink. The `min-width: 0` permits the cell to shrink below its intrinsic content width.

---

## Column Sizing

Hard widths and large minimum widths must be avoided. Columns should declare a preferred basis and
allow flex to handle distribution.

```css
/* Avoid */
.cell {
  width: 12rem;
}

/* Prefer */
.cell {
  flex: 1 14rem;
}
```

This pattern produces columns that have a sensible default width, grow to fill available space, and
shrink when constrained. It avoids the brittleness of hard pixel widths.

---

## Stretch and Content Sizing

| Behavior                        | Pattern                          |
| ------------------------------- | -------------------------------- |
| Stretch to fill remaining space | `flex: 1; min-height: 0;`        |
| Size to content, never shrink   | `flex-shrink: 0;`                |
| Side-by-side, equal share       | `flex: 1; min-width: 0;` on each |
| Preferred width, allow flex     | `flex: 1 <basis>; min-width: 0;` |

These patterns cover the majority of layout needs. Components that require behavior outside this set
must document the reason in a comment.

---

## `overflow: hidden` — Decorative Clipping Only

`overflow: hidden` is permitted only when clipping is decorative: a border-radius cutting an inner
image or iframe, or an absolutely-positioned overlay that bleeds outside a positioned ancestor.

```css
/* Allowed: clips a child image to the card's rounded corners */
.card {
  border-radius: 1rem;
  overflow: hidden;
}
```

It must never be used to compensate for an unconstrained layout. If content escapes its container,
the fix is to locate the missing `min-width: 0` or `min-height: 0` in the chain, or to correct
`align-items` on the container — not to hide the symptom with `overflow: hidden`.

---

## Common Failures

The patterns above prevent the following recurring failures:

- A scroll container whose parent does not declare `min-height: 0`. The container never receives a
  constrained height, and content overflows the viewport instead of scrolling.
- A flex row child whose content forces the row wider than the parent. The fix is `min-width: 0` on
  the child.
- A `min-width: 0` declaration that has no effect because an ancestor uses `align-items: center`,
  making the child intrinsic-width. The fix is to remove the `align-items` override (revert to
  `stretch`) on the ancestor that starts the constrained chain.
- A reusable component that declares its own `overflow` or `max-height`. The component cannot be
  reused inside a fixed pane and a fully-scrolling page.
- `overflow: hidden` used to suppress content escaping its container. The symptom disappears but the
  root cause — a missing constraint in the chain — remains.
- Stacked scroll containers. The fix is to remove the inner scroll and let the outer pane own the
  boundary.

---

## Mental Model

```text
Page
  owns major layout

Pane
  owns overflow region

Reusable UI component
  owns structure and intrinsic shape

Rows and cells
  declare min-width: 0 to allow shrinking

Scrollable flex children
  declare min-height: 0 to allow shrinking
```

This model is the source of truth. When a layout misbehaves, the cause is almost always a missing
`min-height: 0`, a missing `min-width: 0`, or a reusable component that has taken ownership of a
concern that belongs to a pane.
