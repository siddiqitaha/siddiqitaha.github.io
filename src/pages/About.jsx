import { Section, SectionHead, Reveal } from '../components/ui'
import { profile, education } from '../data/content'

const principles = [
  { t: 'Secure by default', d: 'IAM, least privilege, and intrusion detection designed in from the start — not bolted on after.' },
  { t: "Reproducible or it didn't happen", d: 'Infrastructure-as-code and validated runbooks over hand-built, snowflake servers.' },
  { t: 'Automate, then trust', d: 'Backups, deploys, and recovery are tested procedures — not last-minute heroics.' },
]

export default function About() {
  return (
    <Section className="py-14">
      <Reveal>
        <p className="lbl">01 / About</p>
        <h1 className="mt-5 max-w-2xl font-head text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          I like owning the whole stack.
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="space-y-4 text-lg leading-relaxed text-ink-soft md:col-span-8">
          <Reveal>
            <p>
              I came to cloud architecture through information systems and a lot of hands-on
              operations — which is why I gravitate to owning the entire stack, from the network and
              identity layer up to the model behind an app.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              At Mannai, Qatar's leading Microsoft Platinum Partner, I migrated enterprise
              applications to Azure and built MLOps pipelines for clients. Today, at ZIACO, I
              architect and run a self-hosted private cloud end to end — identity, SSO, intrusion
              detection, and an AI monitoring pipeline.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Most of my side projects exist because I wanted that same level of control over my own
              tools. I'm a Canadian citizen based in {profile.location}, looking for a team where I can
              own cloud and platform architecture — and bring AI into production responsibly.
            </p>
          </Reveal>
        </div>

        <aside className="md:col-span-4 md:border-l md:border-line md:pl-8">
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
        <Reveal><SectionHead number="02" title="Education" /></Reveal>
        <div className="divide-y divide-line">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.05}>
              <div className="grid grid-cols-12 items-baseline gap-3 py-5">
                <h3 className="col-span-12 font-semibold md:col-span-4">{e.school}</h3>
                <p className="col-span-12 text-sm text-ink-soft md:col-span-6">{e.detail}{e.note ? ` — ${e.note}` : ''}</p>
                <span className="lbl col-span-12 md:col-span-2 md:text-right">{e.period}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
