# JHB Curtain Cleaning — Design System Handoff

> **Version 1.0** — Emerald-based OKLCH design system with WCAG 2.1 AA verification.
> All tokens are live in `src/app/globals.css`. This document is the contract.

## 1. File Inventory

| File | Purpose |
|------|---------|
| `design/systems/tokens.json` | Machine-readable token contract (OKLCH + hex + WCAG ratios) |
| `design/systems/tokens.css` | CSS custom properties reference (light/dark/fallback) |
| `design/systems/HANDOFF.md` | This integration guide |
| `src/app/globals.css` | **Live** Tailwind v4 `@theme inline` wiring + `:root`/`.dark` tokens |

## 2. OKLCH Palette

The brand is **emerald** (hue 163). The full scale lives in `tokens.json` under `color.brand.emerald`:

| Shade | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| 50  | `oklch(0.97 0.02 163)` | `#ecfdf5` | Lightest tint |
| 100 | `oklch(0.93 0.04 163)` | `#d1fae5` | Success backgrounds |
| 200 | `oklch(0.88 0.07 163)` | `#a7f3d0` | Borders on success |
| 300 | `oklch(0.82 0.10 163)` | `#6ee7b7` | Decorative |
| 400 | `oklch(0.78 0.13 163)` | `#34d399` | **Dark-mode primary** |
| 500 | `oklch(0.68 0.14 163)` | `#10b981` | Mid accent |
| 600 | `oklch(0.60 0.15 163)` | `#059669` | Hover states |
| 700 | `oklch(0.50 0.13 163)` | `#047857` | **Light-mode primary** |
| 800 | `oklch(0.42 0.10 163)` | `#065f46` | Deep accent |
| 900 | `oklch(0.35 0.07 163)` | `#064e3b` | Footer dark |
| 950 | `oklch(0.27 0.05 163)` | `#022c22` | Darkest |

Secondary accents: **teal** (hue 200, info) and **amber** (hue 70, warning).

## 3. Semantic Token Map

### Light mode

| Token | OKLCH | Hex | WCAG pair | Ratio | Grade |
|-------|-------|-----|-----------|-------|-------|
| `--background` | `oklch(0.995 0.003 163)` | `#fbfdfc` | — | — | — |
| `--foreground` | `oklch(0.21 0.02 163)` | `#1c2622` | on background | 14.8:1 | AAA |
| `--card` | `oklch(1 0 0)` | `#ffffff` | — | — | — |
| `--primary` | `oklch(0.50 0.13 163)` | `#047857` | — | — | — |
| `--primary-foreground` | `oklch(0.99 0.01 163)` | `#f0fdf4` | on primary | 5.1:1 | AA |
| `--secondary-foreground` | `oklch(0.28 0.03 163)` | `#293331` | on secondary | 11.5:1 | AAA |
| `--muted-foreground` | `oklch(0.50 0.018 163)` | `#52635d` | on background | 6.4:1 | AA |
| `--accent-foreground` | `oklch(0.32 0.05 163)` | `#0f4d3a` | on accent | 9.8:1 | AAA |
| `--destructive` | `oklch(0.55 0.22 27)` | `#c2410c` | — | — | — |
| `--destructive-foreground` | `oklch(0.99 0.01 27)` | `#fff7ed` | on destructive | 4.9:1 | AA |
| `--success` | `oklch(0.50 0.13 163)` | `#047857` | — | — | — |
| `--warning` | `oklch(0.62 0.15 65)` | `#c2790a` | — | — | — |
| `--info` | `oklch(0.50 0.09 200)` | `#0f766e` | — | — | — |

### Dark mode

| Token | OKLCH | Hex | WCAG pair | Ratio | Grade |
|-------|-------|-----|-----------|-------|-------|
| `--background` | `oklch(0.165 0.012 165)` | `#0d1411` | — | — | — |
| `--foreground` | `oklch(0.96 0.008 163)` | `#eef5f1` | on background | 15.5:1 | AAA |
| `--primary` | `oklch(0.78 0.13 163)` | `#34d399` | — | — | — |
| `--primary-foreground` | `oklch(0.18 0.03 165)` | `#0a1814` | on primary | 7.8:1 | AAA |
| `--secondary-foreground` | `oklch(0.96 0.008 163)` | `#eef5f1` | on secondary | 12.8:1 | AAA |
| `--muted-foreground` | `oklch(0.70 0.015 163)` | `#9fb0a9` | on background | 7.1:1 | AAA |
| `--accent-foreground` | `oklch(0.92 0.03 163)` | `#c8e6d5` | on accent | 9.2:1 | AAA |

## 4. WCAG Contrast Certificate

All 10 verified text/background pairs pass WCAG 2.1:

| Pair | Light ratio | Light grade | Dark ratio | Dark grade |
|------|-------------|-------------|------------|------------|
| foreground / background | 14.8:1 | AAA | 15.5:1 | AAA |
| primary-foreground / primary | 5.1:1 | AA | 7.8:1 | AAA |
| secondary-foreground / secondary | 11.5:1 | AAA | 12.8:1 | AAA |
| muted-foreground / background | 6.4:1 | AA | 7.1:1 | AAA |
| accent-foreground / accent | 9.8:1 | AAA | 9.2:1 | AAA |
| destructive-foreground / destructive | 4.9:1 | AA | — | — |

**Key decision:** Light-mode `--primary` uses emerald-700 (`#047857`), NOT emerald-600. White text on emerald-600 only achieves 3.2:1 (fails AA). Emerald-700 achieves 5.1:1 (passes AA). Dark-mode `--primary` brightens to emerald-400 so dark text achieves 7.8:1 (AAA).

## 5. Tailwind Utility Index

All tokens are registered via `@theme inline` and usable as Tailwind classes:

| Token | Utility classes |
|-------|-----------------|
| `--primary` | `bg-primary`, `text-primary`, `border-primary`, `ring-primary` |
| `--success` | `bg-success`, `text-success`, `border-success` |
| `--warning` | `bg-warning`, `text-warning`, `border-warning` |
| `--info` | `bg-info`, `text-info`, `border-info` |
| `--destructive` | `bg-destructive`, `text-destructive` |
| `--foreground` | `text-foreground`, `bg-foreground` |
| `--background` | `bg-background`, `text-background` |
| `--muted` | `bg-muted`, `text-muted-foreground` |
| `--accent` | `bg-accent`, `text-accent-foreground` |
| `--border` | `border-border` |
| `--ring` | `ring-ring`, `outline-ring` |

Opacity modifiers work: `bg-primary/10`, `text-success/80`, `border-warning/30`.

## 6. Migration Guide — Find & Replace

Replace hardcoded palette classes with semantic tokens:

| Find | Replace with | Why |
|------|--------------|-----|
| `bg-emerald-600` | `bg-primary` | Token-driven, theme-aware |
| `hover:bg-emerald-700` | `hover:bg-primary/90` | Consistent hover |
| `text-emerald-600` | `text-primary` | — |
| `text-emerald-700` | `text-primary` | — |
| `text-emerald-400` (dark) | `text-primary` | Auto-swaps in dark |
| `bg-emerald-50` | `bg-success/10` | Tinted success bg |
| `border-emerald-200` | `border-success/30` | — |
| `text-emerald-300` (dark) | `text-success` | — |
| `bg-amber-100` | `bg-warning/15` | Warning tint |
| `text-amber-700` | `text-warning` | — |
| `text-amber-400` | `text-warning` | — |
| `bg-blue-50` | `bg-info/10` | Info tint |
| `text-blue-600` | `text-info` | — |
| `bg-purple-50` | `bg-accent` | Neutral accent |
| `text-purple-600` | `text-accent-foreground` | — |
| `fill-amber-400` (stars) | `fill-amber-400` | **Keep** — decorative rating stars |
| `text-gray-900` | `text-foreground` | — |
| `text-gray-500` | `text-muted-foreground` | — |
| `bg-white` | `bg-card` | — |
| `bg-gray-50` | `bg-muted` | — |

**Exception:** Star-rating icons keep `fill-amber-400` — amber is the universal rating color and the stars are decorative, not text.

## 7. Dark Mode Breakdown

What swaps between modes (driven by `.dark` class on `<html>`):

| Element | Light | Dark |
|---------|-------|------|
| Page background | Near-white `#fbfdfc` | Deep emerald-tinted `#0d1411` |
| Cards | Pure white `#ffffff` | `#16201c` |
| Primary buttons | Emerald-700 `#047857` + white text | Emerald-400 `#34d399` + dark text |
| Borders | Solid `#dde4e0` | 12% white overlay |
| Muted text | `#52635d` (6.4:1) | `#9fb0a9` (7.1:1) |
| Grid pattern | Border-colored lines | Border-colored lines (auto via `--border`) |
| Radial glow | 8% emerald | 10% bright emerald |
| Selection highlight | 20% emerald | 30% bright emerald |

All dark-mode text pairs pass AAA (7:1+).

## 8. Typography, Spacing, Shadow, Motion

### Typography
- **Sans:** Geist Sans (`--font-sans`)
- **Mono:** Geist Mono (`--font-mono`)
- **Tracking:** tight `-0.02em` (headings), normal `0`, wide `0.025em` (labels)
- **Leading:** tight `1.2`, snug `1.375`, normal `1.5`, relaxed `1.625`

### Radius
- `--radius`: `0.625rem` (base) → sm/md/lg/xl/2xl derived

### Shadows (emerald-tinted, not pure black)
- `--shadow-xs` through `--shadow-xl` — all use `oklch(0.21 0.02 163 / α)` for warmth

### Motion
- **Durations:** fast `150ms`, base `200ms`, slow `300ms`
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out), `cubic-bezier(0.65, 0, 0.35, 1)` (in-out)

## 9. Extension Guide

To add a new color with contrast validation:

1. Pick an OKLCH value at the brand hue (163 for emerald family).
2. Compute contrast against the target background using [OKLCH contrast checker](https://oklch.com/).
3. Ensure ≥ 4.5:1 for AA text, ≥ 7:1 for AAA.
4. Add to `:root` and `.dark` in `globals.css`.
5. Register in `@theme inline` as `--color-<name>`.
6. Document in `tokens.json`.

## 10. Build Verification

```bash
# Lint (must pass clean)
bun run lint

# Dev server (auto-runs on port 3000)
bun run dev

# Verify tokens loaded — check computed styles in browser:
# document.documentElement.style.getPropertyValue('--primary')
# → 'oklch(0.50 0.13 163)' in light, 'oklch(0.78 0.13 163)' in dark
```

## 11. Quick-Start Checklist

- [ ] `globals.css` has `@theme inline` with all semantic tokens
- [ ] `:root` defines light values; `.dark` overrides
- [ ] `--primary` in light = emerald-700 (passes AA with white text)
- [ ] `--primary` in dark = emerald-400 (passes AAA with dark text)
- [ ] `--success`, `--warning`, `--info` registered and usable as Tailwind classes
- [ ] No hardcoded `bg-emerald-*` / `bg-blue-*` / `bg-amber-*` in components (except star ratings)
- [ ] `bg-grid` and `bg-radial-emerald` work in both modes
- [ ] Focus rings visible (`:focus-visible` outline)
- [ ] Selection color themed
- [ ] `bun run lint` passes
