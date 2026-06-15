/**
 * Experience layouts. Each takes `experience` = [{role, company, location, period, points[]}].
 * Theme-aware. Browse at /lab.
 */
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Two-column — role/company on the left, bullets on the right.
export function ExpTwoCol({ experience }) {
  return (
    <div className="divide-y divide-line">
      {experience.map((j) => (
        <div key={j.company} className="grid grid-cols-12 gap-4 py-8">
          <div className="col-span-12 md:col-span-4">
            <h3 className="font-head text-lg font-semibold">{j.role}</h3>
            <p className="mt-1 text-sm font-medium">{j.company}</p>
            <p className="lbl mt-2">{j.period}</p>
            <p className="lbl mt-1">{j.location}</p>
          </div>
          <ul className="col-span-12 space-y-2 md:col-span-8">
            {j.points.map((p, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 h-px w-3 shrink-0 bg-ink-faint" />{p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// Timeline — vertical line with accent nodes.
export function ExpTimeline({ experience }) {
  return (
    <div className="border-l border-line pl-6 md:pl-8">
      {experience.map((j) => (
        <div key={j.company} className="relative pb-10 last:pb-0">
          <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-paper md:-left-[33px]" />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-head text-lg font-semibold">{j.role}</h3>
            <span className="lbl">{j.period}</span>
          </div>
          <p className="mt-0.5 text-sm font-medium text-accent">
            {j.company} <span className="font-normal text-ink-faint">· {j.location}</span>
          </p>
          <ul className="mt-3 space-y-2">
            {j.points.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />{p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// Accordion — compact rows; expand a role for its bullets.
export function ExpAccordion({ experience }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-line border-y border-line">
      {experience.map((j, i) => {
        const isOpen = open === i
        return (
          <div key={j.company}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
              className="grid w-full grid-cols-12 items-baseline gap-2 py-4 text-left">
              <span className="col-span-12 font-semibold md:col-span-5">{j.role}</span>
              <span className="col-span-9 text-sm font-medium text-accent md:col-span-5">{j.company}</span>
              <span className="lbl col-span-2 md:col-span-1 md:text-right">{j.period.split('–').pop().trim()}</span>
              <ChevronDown size={16} className={`col-span-1 ml-auto shrink-0 transition ${isOpen ? 'rotate-180 text-accent' : 'text-ink-faint'}`} />
            </button>
            {isOpen && (
              <ul className="space-y-2 pb-4">
                {j.points.map((p, k) => (
                  <li key={k} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />{p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

export const EXPERIENCE_VARIANTS = [
  { key: 'twocol', label: 'Two-column', Comp: ExpTwoCol },
  { key: 'timeline', label: 'Timeline', Comp: ExpTimeline },
  { key: 'accordion', label: 'Accordion (expandable)', Comp: ExpAccordion },
]
