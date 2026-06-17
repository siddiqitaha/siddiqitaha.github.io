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
              <h1 className="font-head text-3xl font-semibold leading-[1.12] tracking-tight md:text-4xl">
                Cloud &amp; Systems Engineer building<br />
                <span className="text-accent">secure infrastructure and production AI.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
                5+ years across Azure and AWS, working in infrastructure as code, Kubernetes,
                and RAG pipelines. Based in {profile.location}.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {certBadges.map((c) => (
                  <span key={c} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-ink-soft">{c}</span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <Button to="/projects" size="sm">View projects <ArrowRight size={14} /></Button>
                <Button href={profile.github} variant="outline" size="sm" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</Button>
                {profile.linkedin && (
                  <Button href={profile.linkedin} variant="outline" size="sm" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</Button>
                )}
                <Button href={profile.resumeUrl} variant="outline" size="sm">Download résumé <span className="text-ink-faint">↓</span></Button>
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

          {/* right rail — photo on top of Capabilities */}
          <div className="md:col-span-4 md:order-2 md:border-l md:border-line md:pl-10">
            <Reveal>
              <div className="mb-8 flex">
                <img src="/avatar.jpg" alt="Taha Nasir Siddiqi" className="h-40 w-40 rounded-xl border border-line object-cover md:h-44 md:w-44" />
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
            <div className="mt-7"><Button href={`mailto:${profile.email}`}>Get in touch <ArrowRight size={16} /></Button></div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
