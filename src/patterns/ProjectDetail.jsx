/**
 * Full Projects-page layouts (case-study depth). Each takes `projects`.
 * Theme-aware. Browse at /lab.
 */
import { useState } from 'react'
import { Github, ChevronDown } from 'lucide-react'

function Tags({ stack }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <span key={s} className="rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-ink-soft">{s}</span>
      ))}
    </div>
  )
}

function Detail({ p }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div>
        <p className="lbl">Problem</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.problem || '—'}</p>
      </div>
      <div>
        <p className="lbl">What I built</p>
        <ul className="mt-2 space-y-1.5">
          {(p.build || []).map((b, j) => (
            <li key={j} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
              <span className="mt-2 h-px w-2.5 shrink-0 bg-ink-faint" />{b}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="lbl">Result</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.result || '—'}</p>
      </div>
    </div>
  )
}

// Detailed — numbered full case studies (problem / what / result).
export function ProjDetailed({ projects }) {
  return (
    <div className="divide-y divide-line">
      {projects.map((p, i) => (
        <article key={p.slug} id={p.slug} className="scroll-mt-24 py-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-ink-faint">{String(i + 1).padStart(3, '0')}</span>
              <div>
                <h2 className="font-head text-xl font-semibold">{p.name}</h2>
                <p className="mt-1 text-sm text-ink-soft">{p.tagline}</p>
              </div>
            </div>
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer"
                className="hidden shrink-0 items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink-soft hover:border-ink hover:text-ink sm:inline-flex">
                <Github size={15} /> Code
              </a>
            )}
          </div>
          <div className="mt-6 md:pl-10"><Detail p={p} /></div>
          <div className="mt-6 md:pl-10"><Tags stack={p.stack} /></div>
        </article>
      ))}
    </div>
  )
}

// Accordion — scannable list; expand a project for its full case study.
export function ProjAccordion({ projects }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-line border-y border-line">
      {projects.map((p, i) => {
        const isOpen = open === i
        return (
          <div key={p.slug}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
              className="grid w-full grid-cols-12 items-baseline gap-2 py-4 text-left">
              <span className="col-span-12 font-semibold md:col-span-4">{p.name}</span>
              <span className="col-span-11 text-sm text-ink-soft md:col-span-7">{p.tagline}</span>
              <ChevronDown size={16} className={`col-span-1 ml-auto shrink-0 transition ${isOpen ? 'rotate-180 text-accent' : 'text-ink-faint'}`} />
            </button>
            {isOpen && (
              <div className="pb-6">
                <Detail p={p} />
                <div className="mt-5 flex items-center justify-between">
                  <Tags stack={p.stack} />
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">View code →</a>}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Cards — the whole card links to the project's GitHub repo (opens in a new tab).
export function ProjCards({ projects }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => (
        <a key={p.slug} href={p.repo} target="_blank" rel="noreferrer"
          className="group flex flex-col rounded-lg border border-line p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-head font-semibold">{p.name}</h3>
            <span className="shrink-0 text-ink-faint group-hover:text-accent"><Github size={16} /></span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.tagline}</p>
          {p.result && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.result}</p>}
          <div className="mt-4 pt-1"><Tags stack={p.stack} /></div>
        </a>
      ))}
    </div>
  )
}

export const PROJECT_VARIANTS = [
  { key: 'detailed', label: 'Detailed case studies', Comp: ProjDetailed },
  { key: 'accordion', label: 'Accordion (expandable)', Comp: ProjAccordion },
  { key: 'cards', label: 'Summary cards', Comp: ProjCards },
]
