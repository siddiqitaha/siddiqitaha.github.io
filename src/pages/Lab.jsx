import { Section, Reveal } from '../components/ui'
import { profile, projects, skills, certifications, certBadges, experience, bio, principles, education } from '../data/content'
import { HERO_VARIANTS } from '../patterns/Hero'
import { ABOUT_VARIANTS } from '../patterns/About'
import { EXPERIENCE_VARIANTS } from '../patterns/Experience'
import { PROJECT_VARIANTS } from '../patterns/ProjectDetail'
import { CAPABILITY_VARIANTS } from '../patterns/Capabilities'
import { WORK_VARIANTS } from '../patterns/Work'
import { CERT_VARIANTS } from '../patterns/Certifications'
import { CONTACT_VARIANTS } from '../patterns/Contact'

// Each section: id, name, variants, and how to render a variant with data.
const SECTIONS = [
  { id: 'hero', name: 'Hero', variants: HERO_VARIANTS, render: (C) => <C profile={profile} certBadges={certBadges} /> },
  { id: 'about', name: 'About', variants: ABOUT_VARIANTS, render: (C) => <C profile={profile} bio={bio} principles={principles} education={education} /> },
  { id: 'experience', name: 'Experience', variants: EXPERIENCE_VARIANTS, render: (C) => <C experience={experience} /> },
  { id: 'projects', name: 'Projects (page)', variants: PROJECT_VARIANTS, render: (C) => <C projects={projects} /> },
  { id: 'work', name: 'Selected Work (home)', variants: WORK_VARIANTS, render: (C) => <C projects={projects.slice(0, 4)} /> },
  { id: 'capabilities', name: 'Capabilities', variants: CAPABILITY_VARIANTS, render: (C) => <C skills={skills} /> },
  { id: 'certs', name: 'Certifications', variants: CERT_VARIANTS, render: (C) => <C certifications={certifications} /> },
  { id: 'contact', name: 'Contact', variants: CONTACT_VARIANTS, render: (C) => <C profile={profile} /> },
]

export default function Lab() {
  return (
    <Section className="py-14">
      <Reveal>
        <p className="lbl">Internal / Pattern Lab</p>
        <h1 className="mt-5 font-head text-3xl font-semibold tracking-tight">Layout playground</h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Every section's layout variants, in the real theme. Toggle light/dark with the nav switch.
          Tell me the section + option you want and I'll wire it in.
        </p>
      </Reveal>

      <nav className="sticky top-[57px] z-30 -mx-6 mt-8 flex flex-wrap gap-x-5 gap-y-2 border-y border-line bg-paper/90 px-6 py-3 backdrop-blur">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="lbl hover:text-accent">{s.name}</a>
        ))}
      </nav>

      <div className="mt-12 space-y-20">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <h2 className="font-head text-2xl font-semibold tracking-tight">{s.name}</h2>
            <div className="mt-6 space-y-12">
              {s.variants.map((v) => (
                <div key={v.key}>
                  <div className="flex items-baseline justify-between border-b border-line pb-2">
                    <p className="lbl !text-ink">{v.label}</p>
                    <span className="lbl">{s.id}:{v.key}</span>
                  </div>
                  <div className="pt-6">{s.render(v.Comp)}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  )
}
