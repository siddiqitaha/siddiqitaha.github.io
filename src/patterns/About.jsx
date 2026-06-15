/**
 * About-page layouts. Each takes `{ profile, bio, principles, education }`.
 * Theme-aware. Browse at /lab.
 */

function Education({ education }) {
  if (!education?.length) return null
  return (
    <div className="mt-12">
      <h2 className="lbl !text-ink border-b border-ink pb-2">Education</h2>
      <div className="divide-y divide-line">
        {education.map((e) => (
          <div key={e.school} className="grid grid-cols-12 items-baseline gap-3 py-4">
            <h3 className="col-span-12 font-semibold md:col-span-4">{e.school}</h3>
            <p className="col-span-12 text-sm text-ink-soft md:col-span-6">{e.detail}{e.note ? ` — ${e.note}` : ''}</p>
            <span className="lbl col-span-12 md:col-span-2 md:text-right">{e.period}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Split — narrative left, "How I work" principles in a sidebar.
export function AboutSplit({ bio, principles, education }) {
  return (
    <div>
      <div className="grid gap-10 md:grid-cols-12">
        <div className="space-y-4 text-lg leading-relaxed text-ink-soft md:col-span-8">
          {bio.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <aside className="md:col-span-4 md:border-l md:border-line md:pl-8">
          <p className="lbl">How I work</p>
          <dl className="mt-4 divide-y divide-line">
            {principles.map((pr) => (
              <div key={pr.t} className="py-4">
                <dt className="font-semibold">{pr.t}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{pr.d}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
      <Education education={education} />
    </div>
  )
}

// Prose — single readable column, principles as a 3-up row beneath.
export function AboutProse({ bio, principles, education }) {
  return (
    <div>
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
        {bio.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {principles.map((pr) => (
          <div key={pr.t}>
            <div className="h-1 w-8 rounded bg-accent" />
            <p className="mt-3 font-semibold">{pr.t}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{pr.d}</p>
          </div>
        ))}
      </div>
      <Education education={education} />
    </div>
  )
}

// Statement — bold lead line, then supporting prose + principles.
export function AboutStatement({ bio, principles, education }) {
  return (
    <div>
      <p className="max-w-3xl font-head text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
        {bio[0]}
      </p>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-ink-soft">
          {bio.slice(1).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <ul className="space-y-4">
          {principles.map((pr) => (
            <li key={pr.t} className="border-l-2 border-accent pl-4">
              <p className="font-semibold">{pr.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{pr.d}</p>
            </li>
          ))}
        </ul>
      </div>
      <Education education={education} />
    </div>
  )
}

export const ABOUT_VARIANTS = [
  { key: 'split', label: 'Split (narrative + sidebar)', Comp: AboutSplit },
  { key: 'prose', label: 'Prose + principles row', Comp: AboutProse },
  { key: 'statement', label: 'Bold statement', Comp: AboutStatement },
]
