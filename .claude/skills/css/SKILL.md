---
name: css
description:
  Use this skill whenever writing or modifying CSS in this repository. Triggers include any work on
  `.module.css` files, the global stylesheets in `src/styles/`, any styling decision (sizing,
  spacing, color, layout), any flex or grid layout work, any time a layout misbehaves (won't
  scroll, content overflows, columns won't shrink), and any time a component needs a new visual
  variant. Use this skill BEFORE writing any styles, even small tweaks — the rules around
  parent-owned sizing, parent-owned scrolling, `min-height: 0` / `min-width: 0`, `rem` over `px`,
  and CSS Modules are non-obvious and easy to violate by default.
---

# CSS

This skill encodes the styling and layout standards for this repository. Apply these rules to every
`.module.css` file, every layout decision, and every styling change.

The full standards live in `docs/standards/css.md` and `docs/standards/layout.md`. This skill
front-loads the rules that matter most at the moment of code generation. When something is
ambiguous, consult the linked standards.

For component-level concerns (which layer a component belongs to, props, state ownership), see the
`react` skill.

## Hard rules — never violate

### CSS Modules only

- One `.module.css` file per component, co-located in the component folder.
- No inline `style={{...}}` attributes unless the value is genuinely runtime-dynamic (e.g. animation
  delay computed from index, position from a measurement).
- No global CSS except `src/styles/reset.css`, `src/styles/globals.css`, and
  `src/styles/variables.css`.
- No BEM. CSS Module scoping makes namespace prefixes redundant. Class names use camelCase and may
  be short and structural: `card`, `header`, `actions`, `content`.
- Variants and modifiers use camelCase suffixes: `buttonPrimary`, `buttonDisabled` — not
  `button--primary`.

### No `px` — use `rem`

All CSS sizing must use `rem`, not `px`. This keeps values consistent with the user's font-size
preference and avoids brittle pixel math.

```css
/* WRONG */
.avatar {
  width: 24px;
  height: 24px;
}
.card {
  border-radius: 16px;
}

/* RIGHT */
.avatar {
  width: 1.5rem;
  height: 1.5rem;
}
.card {
  border-radius: 1rem;
}
```

Common conversions (16px base): `4px → 0.25rem`, `8px → 0.5rem`, `12px → 0.75rem`, `16px → 1rem`,
`24px → 1.5rem`, `32px → 2rem`. Use a calculator for odd values; never round.

`px` is permitted only for values that are conceptually pixel-bound, such as a `1px` hairline
border.

### Parent owns sizing

Components must not set their own `width`, `height`, or `max-width`.

```css
/* WRONG */
.button {
  width: 12.5rem;
}

/* RIGHT — only intrinsic shape */
.button {
  padding: 0.5rem 1rem;
}
```

The parent decides external size through its own layout (flex, grid, or wrapper width). The same
component must work in a flex container, a grid cell, and a fixed-width wrapper without
modification.

Intrinsic sizing — padding, line-height, gap — is fine. That's the component's internal shape, not
its external footprint.

When a parent needs to adjust a child's external presentation, it does so through the `className`
prop forwarded to the child's root element, not by overriding internal classes through descendant
selectors.

### Parent owns scrolling

Components must not declare their own overflow behavior.

```css
/* WRONG */
.tableBody {
  overflow-y: auto;
  max-height: 25rem;
}

/* RIGHT — wrapper handles overflow */
.tableBody {
  /* no overflow rules */
}
```

The wrapping page or pane decides whether content scrolls and where the scroll boundary is.

### `min-height: 0` and `min-width: 0` — the most-violated flex rules

In a flex column, children default to `min-height: auto`, which means they refuse to shrink below
their content. **This breaks scrolling.** Any flex child that needs to shrink, scroll, or contain a
scrolling descendant must declare `min-height: 0`.

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

Same rule horizontally: in a flex row, `min-width: 0` is required on any child that should shrink.
Without it, long text overflows, table cells refuse to shrink, and side-by-side panes blow each
other out.

```css
.row {
  display: flex;
}

.cell {
  flex: 1;
  min-width: 0;
}
```

When a layout misbehaves — a scroll container that doesn't scroll, content that overflows the
viewport, a row that won't shrink — the cause is almost always a missing `min-height: 0` or
`min-width: 0`. The full set of layout recipes is in `docs/standards/layout.md`.

### One scroll container per area

Page scroll, pane scroll, and component-internal scroll must not stack within the same area. Stacked
scroll containers produce nested scroll bars and unreachable content. Either the page owns the
scroll OR a specific pane owns it — never both.

## Standard layout recipes

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

### Flex column where the table fills available space

```css
.pane {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
```

The table component itself declares no overflow. The `.scroll` wrapper owns the boundary.

## Stretch and content sizing

| Behavior                        | Pattern                          |
| ------------------------------- | -------------------------------- |
| Stretch to fill remaining space | `flex: 1; min-height: 0;`        |
| Size to content, never shrink   | `flex-shrink: 0;`                |
| Side-by-side, equal share       | `flex: 1; min-width: 0;` on each |
| Preferred width, allow flex     | `flex: 1 <basis>; min-width: 0;` |

For column sizing, prefer `flex: 1 <basis>` over hard widths. Examples: `flex: 1 14rem`,
`flex: 1 6rem`. This produces columns that have a sensible default width, grow to fill available
space, and shrink when constrained.

## Variants

When a primitive has a stable set of visual modes, use variants:

```tsx
<Button variant="primary" />
<Button variant="secondary" />
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

Two or three variants per primitive is healthy. Five or more is a sign the component is doing too
much and should be split.

## Reusable vs. feature CSS

Shared UI primitives (`components/ui/`) contain only generic styles: structural layout, base
typography, variant definitions.

Feature components (`features/<feature>/components/`) contain feature-specific styles: column widths
for the feature's data, placement of feature-specific actions, decorative treatment.

Feature-specific rules must not appear in `components/ui/` files. A feature-specific rule in a
shared primitive's CSS indicates a leak of domain knowledge into the primitive.

## Minimalism

CSS rules must be removed when they are not actively required. Each declaration must do work.

- Repeated values must be extracted into design tokens in `variables.css`.
- Magic numbers must not appear in component CSS. All recurring values must reference a token.
- Selectors must be as shallow as the markup permits.
- Override-driven styling must be avoided in favor of composition through variants.

## Quick checklist before submitting CSS

- [ ] Co-located `.module.css` file (no inline styles, no global CSS outside `src/styles/`)
- [ ] All sizing in `rem`, not `px`
- [ ] No `width`, `height`, or `max-width` on the component itself
- [ ] No `overflow` on reusable components
- [ ] Flex children that shrink or scroll have `min-height: 0` (and `min-width: 0` for rows)
- [ ] Each scrollable area has exactly one scroll container
- [ ] Variants for visual modes; no scattered color rules
- [ ] camelCase class names; no BEM
- [ ] Repeated values reference design tokens in `variables.css`

## Reference

- `docs/standards/css.md` — full styling conventions
- `docs/standards/layout.md` — full flex layout recipes and scroll ownership rules
