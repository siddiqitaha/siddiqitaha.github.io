# UI Pattern Library

Reusable, theme-aware section layouts for this site. **Don't recreate these from scratch** — import
from `src/patterns/` and pass data. View them all live in the real theme at **`/#/lab`** (hidden route).

## Capabilities / skills section — `src/patterns/Capabilities.jsx`

All take `skills = [{ group, items[] }]` and render with theme tokens (light + dark).
Registry: `CAPABILITY_VARIANTS` (key, label, Comp) — used by `/lab` and by any page picking by key.

| Variant | Component | When to use |
| --- | --- | --- |
| **Card grid** | `CapCardGrid` | Balanced, neutral default. Good when all categories matter equally. |
| **Columned lists** | `CapColumns` | Airy, doc-style, very scannable. Costs vertical space. |
| **Outlined tags** | `CapTags` | When you want individual techs to pop as discrete pills (refined chips). |
| **Featured core + rest** | `CapFeatured` | Best for recruiters skimming — leads with the 4 strongest areas, rest on one line. |
| **Two-tone table** | `CapTable` | Compact, organized, easy to scan top-to-bottom. |

**Use in a page:**
```jsx
import { CapFeatured } from '../patterns/Capabilities'
<CapFeatured skills={skills} />
```
Home currently uses `CapCardGrid` (aliased as `Capabilities` in `Home.jsx`) — change that one import to swap.

## Other section libraries

Same pattern (data prop in, theme tokens, a `*_VARIANTS` registry, shown at `/lab`):

| Section | File | Prop | Variants |
| --- | --- | --- | --- |
| **Hero** | `src/patterns/Hero.jsx` | `profile`, `certBadges` | `HeroSplit` · `HeroCentered` · `HeroMinimal` |
| **Selected Work** | `src/patterns/Work.jsx` | `projects` | `WorkIndexed` · `WorkCards` · `WorkMinimal` |
| **Certifications** | `src/patterns/Certifications.jsx` | `certifications` | `CertTable` · `CertCards` · `CertBadges` |
| **Contact** | `src/patterns/Contact.jsx` | `profile` | `ContactSplit` · `ContactCentered` · `ContactCards` |

`/lab` (`src/pages/Lab.jsx`) holds a `SECTIONS` array wiring each registry to its data — add a new
registry there and it shows up automatically. To use a variant on a real page, import it and pass the
prop (e.g. `import { WorkCards } from '../patterns/Work'`).

## Conventions for new patterns
- Drive from data props; render with theme tokens (`text-ink`, `text-ink-soft`, `border-line`,
  `bg-muted`, `text-accent`, `.lbl`) so light/dark both work automatically.
- Add to a registry so `/lab` can showcase it.
- These layouts are general — the card-grid / columns / table / featured shapes also fit
  certifications, services, an experience summary, etc. Reuse before rebuilding.

Reasoning + screenshots are also stored in the brain (recall "capabilities layout patterns").
