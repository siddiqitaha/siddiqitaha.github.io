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

// ── Rail-optimized, cleaner options (designed for the narrow side column) ──────

// A — Minimal: airy label + comma list, no borders. Calmest possible.
export function CapMinimal({ skills }) {
  return (
    <div className="space-y-5">
      {skills.map((s) => (
        <div key={s.group}>
          <p className="text-[13px] font-semibold">{s.group}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{s.items.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}

// B — Chips: faint label + soft filled pills. Scannable, modern.
export function CapChips({ skills }) {
  return (
    <div className="space-y-4">
      {skills.map((s) => (
        <div key={s.group}>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-faint">{s.group}</p>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((it) => (
              <span key={it} className="rounded-md bg-muted px-2 py-0.5 text-[12px] text-ink-soft">{it}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// C — Accent rail: a left border per category. Clean grouping, subtle hover.
export function CapRail({ skills }) {
  return (
    <div className="space-y-4">
      {skills.map((s) => (
        <div key={s.group} className="border-l-2 border-line pl-3 transition hover:border-accent">
          <p className="text-[13px] font-semibold">{s.group}</p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{s.items.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}

// D — Numbered: editorial 01/02 index + category. Structured, distinctive.
export function CapNumbered({ skills }) {
  return (
    <div className="space-y-3.5">
      {skills.map((s, i) => (
        <div key={s.group} className="flex gap-3">
          <span className="pt-0.5 font-mono text-[11px] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <p className="text-[13px] font-semibold">{s.group}</p>
            <p className="text-[13px] leading-relaxed text-ink-soft">{s.items.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// E — Dot lead: small accent dot per category. Light, friendly.
export function CapDotLead({ skills }) {
  return (
    <div className="space-y-3.5">
      {skills.map((s) => (
        <div key={s.group} className="flex gap-3">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <div>
            <p className="text-[13px] font-semibold">{s.group}</p>
            <p className="text-[13px] leading-relaxed text-ink-soft">{s.items.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// F — Primary + more: lead with the top areas, collapse the rest to one quiet line.
export function CapPrimary({ skills }) {
  const core = skills.slice(0, 5)
  const rest = skills.slice(5)
  return (
    <div>
      <div className="space-y-3.5">
        {core.map((s) => (
          <div key={s.group}>
            <p className="text-[13px] font-semibold">{s.group}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{s.items.join(', ')}</p>
          </div>
        ))}
      </div>
      {rest.length > 0 && (
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-[11px] uppercase tracking-wider text-ink-faint">Also</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{rest.flatMap((s) => s.items).join(' · ')}</p>
        </div>
      )}
    </div>
  )
}

// G — List dropdown: slim collapsible rows; each opens to a vertical list of
// items on an accent rail. Lighter than the old accordion (no tool counters).
export function CapListDropdown({ skills }) {
  const [open, setOpen] = useState(() => new Set())
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  return (
    <div className="divide-y divide-line border-y border-line">
      {skills.map((s, i) => {
        const isOpen = open.has(i)
        return (
          <div key={s.group}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 py-2.5 text-left text-[13px] font-medium transition hover:text-accent"
            >
              <span className={isOpen ? 'text-accent' : ''}>{s.group}</span>
              <ChevronDown size={14} className={`shrink-0 transition ${isOpen ? 'rotate-180 text-accent' : 'text-ink-faint'}`} />
            </button>
            {isOpen && (
              <ul className="mb-3 ml-0.5 space-y-1 border-l border-line pl-4 text-[13px] leading-relaxed text-ink-soft">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Registry — used by /lab and by any page that wants to pick a variant by key.
export const CAPABILITY_VARIANTS = [
  { key: 'list-dropdown', label: 'G — List dropdown (slim)', Comp: CapListDropdown },
  { key: 'minimal', label: 'A — Minimal (airy)', Comp: CapMinimal },
  { key: 'chips', label: 'B — Soft chips', Comp: CapChips },
  { key: 'rail', label: 'C — Accent rail', Comp: CapRail },
  { key: 'numbered', label: 'D — Numbered index', Comp: CapNumbered },
  { key: 'dot-lead', label: 'E — Dot lead', Comp: CapDotLead },
  { key: 'primary', label: 'F — Primary + more', Comp: CapPrimary },
  { key: 'accordion', label: 'Accordion (expandable)', Comp: CapAccordion },
  { key: 'stacked', label: 'Stacked (narrow-friendly)', Comp: CapStacked },
  { key: 'cards', label: 'Option 1 — Card grid', Comp: CapCardGrid },
  { key: 'columns', label: 'Option 2 — Columned lists', Comp: CapColumns },
  { key: 'tags', label: 'Option 3 — Outlined tags', Comp: CapTags },
  { key: 'featured', label: 'Option 4 — Featured core + rest', Comp: CapFeatured },
  { key: 'table', label: 'Option 5 — Two-tone table', Comp: CapTable },
]
