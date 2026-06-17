import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { Section, SectionHead, Reveal, Button } from '../components/ui'
import { profile, projects, skills, certBadges } from '../data/content'
// Swap these imports for any variant in ../patterns/ (see PATTERNS.md / the /lab gallery).
import { CapAccordion as Capabilities } from '../patterns/Capabilities'
import { WorkStackedCards as Work } from '../patterns/Work'

const featured = projects.slice(0, 4)

export default function Home() {
  return (
    <>
      {/* 01 / Profile — identity packet */}
      <Section className="pt-12 pb-14 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            {profile.openToWork && (
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <span className="h-2 w-2 rounded-full bg-accent" /> Open to new roles
              </span>
            )}
            <h1 className="mt-5 font-head text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
              I build secure, self-hosted<br />
              <span className="text-accent">cloud &amp; AI systems.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
              Cloud Engineer with 5+ years across Azure &amp; AWS — infrastructure-as-code,
              Kubernetes, and production RAG pipelines. Based in {profile.location}.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {certBadges.map((c) => (
                <span key={c} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft">{c}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button to="/projects">View projects <ArrowRight size={16} /></Button>
              <Button href={profile.github} variant="outline" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</Button>
              {profile.linkedin && (
                <Button href={profile.linkedin} variant="outline" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</Button>
              )}
              <Button href={profile.resumeUrl} variant="ghost">Download résumé ↓</Button>
            </div>
          </div>

          <div className="flex justify-center md:col-span-4">
            <div className="grid h-40 w-40 place-items-center rounded-2xl bg-accent text-accent-contrast md:h-44 md:w-44">
              <span className="font-head text-5xl font-semibold tracking-tight">TS</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Selected Work (left, wide & dominant) + Capabilities (right, narrow) */}
      <Section className="py-12">
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <SectionHead number="02" title="Selected Work"
                action={<Link to="/projects" className="lbl hover:text-ink">View all →</Link>} />
            </Reveal>
            <div className="pt-5"><Work projects={featured} /></div>
          </div>
          <div className="md:col-span-5">
            <Reveal>
              <SectionHead number="03" title="Capabilities" />
              <p className="mt-3 text-sm text-ink-soft">Expand a category to see the tools.</p>
            </Reveal>
            <div className="pt-5"><Capabilities skills={skills} /></div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-14">
        <div className="border-t border-ink pt-10">
          <Reveal>
            <h2 className="font-head text-3xl font-semibold tracking-tight">Let's build something solid.</h2>
            <p className="mt-3 max-w-md text-ink-soft">Have something you're building? I'd like to hear about it.</p>
            <div className="mt-7"><Button to="/contact">Get in touch <ArrowRight size={16} /></Button></div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
