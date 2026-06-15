/**
 * Contact layouts. Each takes `profile`. Theme-aware. Browse at /lab.
 */
import { Mail, Github, Linkedin, MapPin } from 'lucide-react'

function channels(profile) {
  return [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Github, label: 'GitHub', value: '@siddiqitaha', href: profile.github },
    profile.linkedin ? { icon: Linkedin, label: 'LinkedIn', value: 'Connect', href: profile.linkedin } : null,
    { icon: MapPin, label: 'Location', value: profile.location, href: null },
  ].filter(Boolean)
}

// Split — copy left; contact channels as buttons on the right (one email button only).
export function ContactSplit({ profile }) {
  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <h2 className="font-head text-3xl font-semibold tracking-tight md:text-4xl">Let's talk.</h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
          Whether it's a role, a collaboration, or a question about something I've built — email is the
          quickest way to reach me.
        </p>
        <div className="mt-7">
          <a href={profile.resumeUrl} className="btn-outline">Download résumé ↓</a>
        </div>
      </div>
      <aside className="md:col-span-5 md:border-l md:border-line md:pl-8">
        <div className="space-y-3">
          <a href={`mailto:${profile.email}`} className="btn-outline w-full justify-between">
            <span className="lbl">Email</span><span>{profile.email}</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-outline w-full justify-between">
            <span className="lbl">GitHub</span><span>@siddiqitaha</span>
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-outline w-full justify-between">
              <span className="lbl">LinkedIn</span><span>Connect</span>
            </a>
          )}
        </div>
        <p className="mt-5 text-sm text-ink-soft">
          📍 {profile.location} · <span className="font-medium text-accent">Open to roles</span>
        </p>
      </aside>
    </div>
  )
}

// Centered — big single call to action.
export function ContactCentered({ profile }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <p className="lbl">Get in touch</p>
      <h2 className="mt-4 font-head text-4xl font-semibold tracking-tight md:text-5xl">Let's talk.</h2>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
        Open to roles and collaborations. Email is the quickest way to reach me.
      </p>
      <a href={`mailto:${profile.email}`} className="btn-primary mt-7">{profile.email}</a>
      <div className="mt-6 flex gap-6 text-sm font-medium text-accent">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
      </div>
    </div>
  )
}

// Cards — each channel as a card.
export function ContactCards({ profile }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {channels(profile).map((c) => {
        const Inner = (
          <div className="flex items-center gap-4 rounded-lg border border-line p-5 transition hover:border-accent/50">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent text-accent-contrast">
              <c.icon size={18} />
            </div>
            <div>
              <p className="lbl">{c.label}</p>
              <p className="font-medium">{c.value}</p>
            </div>
          </div>
        )
        return c.href
          ? <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{Inner}</a>
          : <div key={c.label}>{Inner}</div>
      })}
    </div>
  )
}

// Banner — a bordered call-to-action band.
export function ContactBanner({ profile }) {
  return (
    <div className="rounded-lg border border-line bg-muted p-8 text-center md:p-12">
      <h2 className="font-head text-3xl font-semibold tracking-tight md:text-4xl">Let's talk.</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">Open to roles and collaborations — email is the quickest way to reach me.</p>
      <a href={`mailto:${profile.email}`} className="btn-primary mt-6">{profile.email}</a>
      <div className="mt-5 flex justify-center gap-6 text-sm font-medium text-accent">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
      </div>
    </div>
  )
}

// Minimal — one tidy row: heading + actions.
export function ContactMinimal({ profile }) {
  return (
    <div className="flex flex-col items-start gap-4 border-y border-line py-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-head text-2xl font-semibold tracking-tight">Let's talk.</h2>
        <p className="mt-1 text-sm text-ink-soft">Quickest via email.</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
        <a href={`mailto:${profile.email}`} className="btn-primary">Email me</a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="text-accent">GitHub</a>
        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-accent">LinkedIn</a>}
      </div>
    </div>
  )
}

export const CONTACT_VARIANTS = [
  { key: 'split', label: 'Split (copy + spec block)', Comp: ContactSplit },
  { key: 'centered', label: 'Centered CTA', Comp: ContactCentered },
  { key: 'cards', label: 'Channel cards', Comp: ContactCards },
  { key: 'banner', label: 'CTA banner', Comp: ContactBanner },
  { key: 'minimal', label: 'Minimal row', Comp: ContactMinimal },
]
