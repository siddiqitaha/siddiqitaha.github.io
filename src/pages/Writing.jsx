import { Link } from 'react-router-dom'
import { Section, Reveal } from '../components/ui'
import { posts } from '../data/writing'

const fmt = (d) => {
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return d
  }
}

export default function Writing() {
  return (
    <Section className="py-14">
      <Reveal>
        <p className="lbl">Writing</p>
        <h1 className="mt-5 font-head text-4xl font-semibold tracking-tight md:text-5xl">Guides & articles.</h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Step-by-step guides and short articles on cloud, systems, and AI infrastructure.
        </p>
      </Reveal>

      <div className="mt-10 divide-y divide-line border-t border-line">
        {posts.length === 0 && <p className="py-12 text-ink-soft">No posts yet — check back soon.</p>}
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <Link to={`/writing/${p.slug}`} className="group block py-6 transition hover:bg-muted/40">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-head text-xl font-semibold transition group-hover:text-accent">{p.title}</h2>
                <span className="lbl shrink-0">{fmt(p.date)}</span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{p.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
                <span>{p.readingTime} min read</span>
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-ink-soft">{t}</span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
