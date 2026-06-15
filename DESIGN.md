# Design System — Taha Siddiqi Portfolio

Theme: **The Architect's Spec Sheet.** The site is laid out like a beautifully typeset technical
document — ruthless information design, because that's how an architect thinks.

## Principles
1. **Restraint over decoration.** Near-monochrome, hairline rules, generous whitespace. The content
   and the grid do the work — no gradients, glass, or emoji.
2. **One accent, used sparingly.** A single IBM-blue accent (`#0f62fe`) appears only on interactive
   elements (links, hover arrows) and the "Status" value. Nowhere else.
3. **Spec-sheet signatures.** Mono uppercase labels, numbered sections (`01 / Profile`), key/value
   spec blocks, and work shown as a precise indexed table.
4. **Scannable structure.** Everything aligns to a 12-column grid; a recruiter can skim it in seconds.
5. **Motion is a whisper.** Fade/translate on mount only; respects `prefers-reduced-motion`.
6. **Production-ready.** Responsive at 3 breakpoints, Lighthouse ≥ 95, axe-clean, SEO/OG meta.

## Color tokens
| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#ffffff` | background |
| `ink` | `#0a0a0a` | headings, primary text, primary button |
| `ink.soft` | `#525252` | body text |
| `ink.faint` | `#a3a3a3` | mono labels, meta, row numbers |
| `line` | `#e5e5e5` | hairline dividers & borders |
| `accent` | `#0f62fe` | links, hover arrows, "Status" only |
| `accent.soft` | `#eff4ff` | rare accent background |

Swap the whole accent in one place: `theme.colors.accent` in `tailwind.config.js`.

## Typography
- **Everything:** IBM Plex Sans (400–700). Headings 600, tight tracking.
- **Labels & data:** IBM Plex Mono (`.lbl` = 11px, uppercase, tracking 0.12em, `ink.faint`).
- **Scale:** hero 48–60px · h1 36–48px · h2/section 16–20px · body 16–18px · label 11px.

## Components (`src/components/ui.jsx`)
- **`Section`** — max-w 64rem, px-6; `muted` adds a subtle grey wash.
- **`SectionHead`** — `NN / TITLE` over a strong `border-ink` underline.
- **`Button`** — `primary` = sharp ink block; `ghost` = underlined text link.
- **`SpecRow`** — key (mono label) / value row for spec blocks; `accent` highlights the value.
- **`Badge`** — mono tech chip on `neutral-100`.
- **`Reveal`** — mount fade/translate (content always ends visible).
- **Indexed list** — `grid-cols-12` rows with a mono `001` number, divided by hairlines.

## Layout patterns
- **Hero:** 8/4 split — headline + intro on the left, a mono spec block (Location/Focus/Status…)
  bordered on the left on the right.
- **Work:** indexed table (number · name · tagline · stack · `→`).
- **Sections:** numbered, hairline-separated; sharp corners throughout (no rounded cards).

## Accessibility
- Body contrast ≥ 4.5:1 (accent never sits under paragraph text).
- Visible focus ring (`ring-2 ring-accent`). Keyboard-navigable; alt text on images.
- Honor `prefers-reduced-motion`.

## Review loop
Build → `design-review` agent renders at 1280 / 768 / 390 px, screenshots, and critiques against
this doc → fix → repeat.
