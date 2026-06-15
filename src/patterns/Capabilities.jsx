/**
 * Reusable "capabilities / skills" section layouts.
 *
 * Each component takes `skills` = [{ group: string, items: string[] }] and renders
 * with the site's theme tokens (so light/dark both work). Pick one in a page, or
 * browse them all at the /lab route. Documented in PATTERNS.md.
 */
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Option 1 — Card grid: each category in a bordered card. Balanced, neutral.
export function CapCardGrid({ skills }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((s) => (
        <div key={s.group} className="rounded-md border border-line p-4">
          <h3 className="text-sm font-semibold">{s.group}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{s.items.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}

// Option 2 — Columned lists: airy multi-column, one tech per line.
export function CapColumns({ skills }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((s) => (
        <div key={s.group}>
          <p className="lbl">{s.group}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
            {s.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

// Option 3 — Outlined tags: category + bordered pills (refined chips).
export function CapTags({ skills }) {
  return (
    <div className="space-y-5">
      {skills.map((s) => (
        <div key={s.group} className="grid grid-cols-12 items-start gap-3">
          <p className="lbl col-span-12 md:col-span-3 md:pt-1.5">{s.group}</p>
          <div className="col-span-12 flex flex-wrap gap-2 md:col-span-9">
            {s.items.map((it) => (
              <span key={it} className="rounded-full border border-line px-3 py-1 text-sm text-ink-soft">{it}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Option 4 — Featured core + the rest: lead with the strongest areas.
export function CapFeatured({ skills }) {
  const core = skills.slice(0, 4)
  const rest = skills.slice(4).flatMap((s) => s.items)
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {core.map((s) => (
          <div key={s.group} className="rounded-lg bg-muted p-5">
            <div className="h-1 w-8 rounded bg-accent" />
            <h3 className="mt-3 font-semibold">{s.group}</h3>
            <p className="mt-1 text-sm text-ink-soft">{s.items.join(', ')}</p>
          </div>
        ))}
      </div>
      {rest.length > 0 && (
        <p className="mt-4 text-sm text-ink-faint">
          <span className="lbl">Also</span> &nbsp; {rest.join(' · ')}
        </p>
      )}
    </>
  )
}

// Option 5 — Two-tone table: accent tick + alternating row shading.
export function CapTable({ skills }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      {skills.map((s, i) => (
        <div key={s.group} className={`grid grid-cols-12 gap-3 p-4 ${i % 2 ? 'bg-muted' : ''}`}>
          <div className="col-span-12 flex items-center gap-2 md:col-span-3">
            <span className="h-3 w-1 rounded bg-accent" />
            <span className="text-sm font-semibold">{s.group}</span>
          </div>
          <div className="col-span-12 text-sm text-ink-soft md:col-span-9">{s.items.join(' · ')}</div>
        </div>
      ))}
    </div>
  )
}

// Stacked — category label then techs beneath. Ideal for narrow / side-by-side columns.
export function CapStacked({ skills }) {
  return (
    <div className="divide-y divide-line">
      {skills.map((s) => (
        <div key={s.group} className="py-3">
          <p className="lbl">{s.group}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.items.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}

// Accordion — collapsed categories; expand one to focus on its tools. Keeps the
// section calm so it doesn't compete with Selected Work.
export function CapAccordion({ skills }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-line border-y border-line">
      {skills.map((s, i) => {
        const isOpen = open === i
        return (
          <div key={s.group}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
            >
              <span className="font-medium">{s.group}</span>
              <span className="flex items-center gap-3">
                <span className="lbl hidden sm:inline">{s.items.length} tools</span>
                <ChevronDown size={16} className={`shrink-0 transition ${isOpen ? 'rotate-180 text-accent' : 'text-ink-faint'}`} />
              </span>
            </button>
            {isOpen && <p className="pb-4 text-sm leading-relaxed text-ink-soft">{s.items.join(' · ')}</p>}
          </div>
        )
      })}
    </div>
  )
}

// Registry — used by /lab and by any page that wants to pick a variant by key.
export const CAPABILITY_VARIANTS = [
  { key: 'accordion', label: 'Accordion (expandable)', Comp: CapAccordion },
  { key: 'stacked', label: 'Stacked (narrow-friendly)', Comp: CapStacked },
  { key: 'cards', label: 'Option 1 — Card grid', Comp: CapCardGrid },
  { key: 'columns', label: 'Option 2 — Columned lists', Comp: CapColumns },
  { key: 'tags', label: 'Option 3 — Outlined tags', Comp: CapTags },
  { key: 'featured', label: 'Option 4 — Featured core + rest', Comp: CapFeatured },
  { key: 'table', label: 'Option 5 — Two-tone table', Comp: CapTable },
]
