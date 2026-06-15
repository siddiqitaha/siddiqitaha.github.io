/**
 * Hero / profile-header layouts. Each takes `profile` and `certBadges`.
 * Theme-aware. Browse at /lab. See PATTERNS.md.
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function Pill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
      <span className="h-2 w-2 rounded-full bg-accent" /> Open to new roles
    </span>
  )
}
function Badges({ certBadges }) {
  return (
    <div className="flex flex-wrap gap-2">
      {certBadges.map((c) => (
        <span key={c} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft">{c}</span>
      ))}
    </div>
  )
}
function Monogram({ size = 'h-40 w-40 md:h-44 md:w-44' }) {
  return (
    <div className={`grid ${size} place-items-center rounded-2xl bg-accent text-accent-contrast`}>
      <span className="font-head text-5xl font-semibold tracking-tight">TS</span>
    </div>
  )
}

// Split — text left, monogram right (current).
export function HeroSplit({ profile, certBadges }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-12">
      <div className="md:col-span-8">
        {profile.openToWork && <Pill />}
        <h1 className="mt-5 font-head text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
          I build secure, self-hosted<br /><span className="text-accent">cloud &amp; AI systems.</span>
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
          Technical Solutions Architect with 5+ years across Azure &amp; AWS — IaC, Kubernetes, and
          production RAG pipelines. Based in {profile.location}.
        </p>
        <div className="mt-6"><Badges certBadges={certBadges} /></div>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Link to="/projects" className="btn-primary">View projects <ArrowRight size={16} /></Link>
          <a href={profile.resumeUrl} className="btn-ghost">Download résumé ↓</a>
        </div>
      </div>
      <div className="flex justify-center md:col-span-4"><Monogram /></div>
    </div>
  )
}

// Centered — monogram on top, everything centered.
export function HeroCentered({ profile, certBadges }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Monogram size="h-24 w-24" />
      <div className="mt-6">{profile.openToWork && <Pill />}</div>
      <h1 className="mt-5 max-w-2xl font-head text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
        I build secure, self-hosted <span className="text-accent">cloud &amp; AI systems.</span>
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
        Technical Solutions Architect — Azure &amp; AWS, IaC, Kubernetes, and production RAG. Based in {profile.location}.
      </p>
      <div className="mt-6 flex justify-center"><Badges certBadges={certBadges} /></div>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
        <Link to="/projects" className="btn-primary">View projects <ArrowRight size={16} /></Link>
        <a href={profile.resumeUrl} className="btn-ghost">Download résumé ↓</a>
      </div>
    </div>
  )
}

// Minimal — left-aligned, no monogram, oversized headline.
export function HeroMinimal({ profile, certBadges }) {
  return (
    <div className="max-w-3xl">
      <p className="lbl">{profile.title} · {profile.location}</p>
      <h1 className="mt-5 font-head text-5xl font-semibold leading-[1.04] tracking-tight md:text-6xl">
        Secure, self-hosted <span className="text-accent">cloud &amp; AI systems.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
        5+ years across Azure &amp; AWS — infrastructure-as-code, Kubernetes, and production RAG pipelines.
      </p>
      <div className="mt-6"><Badges certBadges={certBadges} /></div>
      <div className="mt-7 flex flex-wrap items-center gap-5">
        <Link to="/projects" className="btn-primary">View projects <ArrowRight size={16} /></Link>
        <a href={profile.resumeUrl} className="btn-ghost">Download résumé ↓</a>
      </div>
    </div>
  )
}

export const HERO_VARIANTS = [
  { key: 'split', label: 'Split (text + monogram)', Comp: HeroSplit },
  { key: 'centered', label: 'Centered', Comp: HeroCentered },
  { key: 'minimal', label: 'Minimal (no monogram)', Comp: HeroMinimal },
]
