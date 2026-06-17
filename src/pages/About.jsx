import { Section, SectionHead, Reveal } from '../components/ui'
import { education, bio, principles } from '../data/content'

export default function About() {
  return (
    <Section className="py-14">
      <Reveal>
        <p className="lbl">About</p>
        <h1 className="mt-5 max-w-2xl font-head text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          I like owning the whole stack.
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="space-y-4 text-lg leading-relaxed text-ink-soft md:col-span-8">
          {bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}><p>{para}</p></Reveal>
          ))}
        </div>

        <aside className="md:col-span-4 md:border-l md:border-line md:pl-8">
          <img src="/avatar.jpg" alt="Taha Nasir Siddiqi" className="mb-7 h-44 w-44 rounded-xl border border-line object-cover" />
          <p className="lbl">How I work</p>
          <dl className="mt-4 divide-y divide-line">
            {principles.map((p) => (
              <div key={p.t} className="py-4">
                <dt className="font-semibold">{p.t}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{p.d}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="mt-14">
        <Reveal><SectionHead title="Education" /></Reveal>
        <div className="divide-y divide-line">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.05}>
              <div className="grid grid-cols-12 items-baseline gap-3 py-5">
                <h3 className="col-span-12 font-semibold md:col-span-4">{e.school}</h3>
                <p className="col-span-12 text-sm text-ink-soft md:col-span-6">{e.detail}{e.note ? `. ${e.note}` : ''}</p>
                <span className="lbl col-span-12 md:col-span-2 md:text-right">{e.period}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
