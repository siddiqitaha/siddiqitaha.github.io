/**
 * "Selected work" layouts. Each takes `projects` (array). Theme-aware. Browse at /lab.
 */
import { Link } from 'react-router-dom'
import { Search, BookOpen, BrainCircuit, ServerCog, Boxes, Github } from 'lucide-react'

const PROJECT_ICONS = { Search, BookOpen, BrainCircuit, ServerCog, Boxes }

// Indexed — 12-col table rows with number, name, tagline, highlight, arrow (current).
export function WorkIndexed({ projects }) {
  return (
    <div className="divide-y divide-line">
      {projects.map((p, i) => (
        <Link key={p.slug} to={`/projects#${p.slug}`}
          className="group grid grid-cols-12 items-baseline gap-3 py-5 transition hover:bg-muted">
          <span className="col-span-2 font-mono text-xs text-ink-faint md:col-span-1">{String(i + 1).padStart(3, '0')}</span>
          <h3 className="col-span-10 font-semibold md:col-span-3">{p.name}</h3>
          <p className="col-span-10 text-sm text-ink-soft md:col-span-7">{p.tagline}</p>
          <span className="col-span-2 text-right font-mono text-xs text-ink-faint md:col-span-1 group-hover:text-accent">→</span>
        </Link>
      ))}
    </div>
  )
}

// Cards — prominent project cards with metric + tech tags.
export function WorkCards({ projects }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <Link key={p.slug} to={`/projects#${p.slug}`}
          className="group flex flex-col rounded-lg border border-line p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-snug">{p.name}</h3>
            <span className="font-mono text-xs text-ink-faint group-hover:text-accent">→</span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 3).map((t) => (
              <span key={t} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">{t}</span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

// Minimal — clean list, name + tagline + arrow only.
export function WorkMinimal({ projects }) {
  return (
    <div className="divide-y divide-line">
      {projects.map((p) => (
        <Link key={p.slug} to={`/projects#${p.slug}`}
          className="group flex items-baseline justify-between gap-4 py-4 transition hover:text-accent">
          <h3 className="font-semibold group-hover:text-accent">{p.name}</h3>
          <p className="hidden flex-1 text-sm text-ink-soft sm:block">{p.tagline}</p>
          <span className="font-mono text-xs text-ink-faint group-hover:text-accent">→</span>
        </Link>
      ))}
    </div>
  )
}

// Stacked cards — one full-width rich card per row. Great for a wide/feature column.
export function WorkStackedCards({ projects }) {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <Link key={p.slug} to={`/projects#${p.slug}`}
          className="group block rounded-lg border border-line p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold">{p.name}</h3>
            <span className="shrink-0 font-mono text-xs text-ink-faint group-hover:text-accent">→</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((t) => (
              <span key={t} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">{t}</span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

// Two-up grid — compact cards, exactly two per row. For a balanced split layout.
export function WorkGrid2({ projects }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => (
        <Link key={p.slug} to={`/projects#${p.slug}`}
          className="group flex flex-col rounded-lg border border-line p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-snug">{p.name}</h3>
            <span className="font-mono text-xs text-ink-faint group-hover:text-accent">→</span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 3).map((t) => (
              <span key={t} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">{t}</span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

// OG-style cards — live, theme-aware mini "cards" that mirror the social preview
// design. Data-driven (auto-syncs with pinned projects); link straight to the repo.
export function WorkOgCards({ projects }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => {
        const Icon = PROJECT_ICONS[p.icon] || Github
        const host = (p.repo || '').replace(/^https?:\/\//, '')
        return (
          <a key={p.slug} href={p.repo || `#${p.slug}`} target={p.repo ? '_blank' : undefined} rel="noreferrer"
            className="group relative flex min-h-[208px] flex-col overflow-hidden rounded-xl border border-line p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-70"
              style={{ background: 'radial-gradient(circle at center, rgb(var(--accent) / 0.16), transparent 70%)' }} />
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#0ea5e9] text-white">
                <Icon size={18} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Open source</span>
            </div>
            <h3 className="mt-4 font-head text-lg font-semibold leading-snug">{p.name}</h3>
            <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-ink-soft">{p.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 4).map((t) => (
                <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-ink-soft">{t}</span>
              ))}
            </div>
            <div className="mt-auto pt-4 font-mono text-[11px] text-ink-faint group-hover:text-accent">{host}</div>
          </a>
        )
      })}
    </div>
  )
}

export const WORK_VARIANTS = [
  { key: 'indexed', label: 'Indexed table', Comp: WorkIndexed },
  { key: 'cards', label: 'Cards (grid)', Comp: WorkCards },
  { key: 'stacked-cards', label: 'Stacked cards (wide column)', Comp: WorkStackedCards },
  { key: 'grid2', label: 'Two-up grid', Comp: WorkGrid2 },
  { key: 'og-cards', label: 'OG-style cards (theme-aware)', Comp: WorkOgCards },
  { key: 'minimal', label: 'Minimal list', Comp: WorkMinimal },
]
