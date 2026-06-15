import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-3 px-6 py-8 sm:flex-row sm:items-center">
        <span className="lbl">© 2026 {profile.name}</span>
        <div className="flex gap-6 text-sm font-medium">
          <a className="text-ink-soft hover:text-ink" href={`mailto:${profile.email}`}>Email</a>
          <a className="text-ink-soft hover:text-ink" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          {profile.linkedin && (
            <a className="text-ink-soft hover:text-ink" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          )}
        </div>
      </div>
    </footer>
  )
}
