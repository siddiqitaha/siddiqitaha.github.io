import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { Section, SectionHead, Reveal, Button } from '../components/ui'
import { profile, projects, skills, certBadges } from '../data/content'
// Swap these imports for any variant in ../patterns/ (see PATTERNS.md / the /lab gallery).
import { CapListDropdown as Capabilities } from '../patterns/Capabilities'
import { WorkOgCards as Work } from '../patterns/Work'

const featured = projects.slice(0, 4)

export default function Home() {
  return (
    <>
      {/* Hero + Selected Work (left) · TS + Capabilities (right rail) */}
      <Section className="pt-12 pb-12 md:pt-16">
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-12">
          {/* hero + work — left side on desktop, first on mobile */}
          <div className="space-y-16 md:col-span-8 md:order-1">
            {/* Profile */}
            <div>
              {profile.openToWork && (
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" /> Open to new roles
                </span>
              )}
              <h1 className="mt-5 font-head text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                I build secure, <span className="whitespace-nowrap">self-hosted</span><br />
                <span className="text-accent">cloud &amp; AI systems.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
                Cloud &amp; Systems Engineer with 5+ years across Azure and AWS, working in
                infrastructure as code, Kubernetes, and production RAG pipelines. Based in {profile.location}.
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

            {/* Selected Work */}
            <div>
              <Reveal>
                <SectionHead title="Selected Work"
                  action={<Link to="/projects" className="lbl hover:text-ink">View all →</Link>} />
              </Reveal>
              <div className="pt-5"><Work projects={featured} /></div>
            </div>
          </div>

          {/* right rail — TS monogram on top of Capabilities */}
          <div className="md:col-span-4 md:order-2">
            <Reveal>
              <div className="mb-8 flex justify-center">
                <div className="grid h-36 w-36 place-items-center rounded-2xl bg-accent text-accent-contrast md:h-40 md:w-40">
                  <span className="font-head text-5xl font-semibold tracking-tight">TS</span>
                </div>
              </div>
              <SectionHead title="Capabilities" />
              <div className="pt-5"><Capabilities skills={skills} /></div>
            </Reveal>
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
