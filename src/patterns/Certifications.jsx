/**
 * Certifications layouts. Each takes `certifications` = [{name, issuer, year}].
 * Theme-aware. Browse at /lab.
 */
import { BadgeCheck } from 'lucide-react'

// Table — indexed rows (number, name, issuer, year).
export function CertTable({ certifications }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {certifications.map((c, i) => (
        <div key={c.name} className="grid grid-cols-12 items-baseline gap-3 py-5">
          <span className="col-span-2 font-mono text-xs text-ink-faint md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="col-span-10 font-semibold md:col-span-7">{c.name}</h3>
          <span className="col-span-8 text-sm text-ink-soft md:col-span-3">{c.issuer}</span>
          <span className="lbl col-span-4 text-right md:col-span-1">{c.year}</span>
        </div>
      ))}
    </div>
  )
}

// Cards — grid with the issuer's official logo (falls back to a check badge).
export function CertCards({ certifications }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {certifications.map((c) => (
        <div key={c.name} className="flex items-start gap-4 rounded-lg border border-line p-5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-line bg-white p-1.5">
            {c.logo ? (
              <img src={`/logos/${c.logo}.svg`} alt={`${c.issuer} logo`} className="h-full w-full object-contain" />
            ) : (
              <BadgeCheck size={18} className="text-accent" />
            )}
          </div>
          <div>
            <h3 className="font-semibold leading-snug">{c.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{c.issuer} · {c.year}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Badges — compact pill row.
export function CertBadges({ certifications }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {certifications.map((c) => (
        <span key={c.name} className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-ink-soft">
          <BadgeCheck size={14} className="text-accent" /> {c.name}
        </span>
      ))}
    </div>
  )
}

export const CERT_VARIANTS = [
  { key: 'table', label: 'Indexed table', Comp: CertTable },
  { key: 'cards', label: 'Cards', Comp: CertCards },
  { key: 'badges', label: 'Badge row', Comp: CertBadges },
]
