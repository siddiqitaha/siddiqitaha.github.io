import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/content'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/writing', label: 'Writing' },
]

const iconBtn = 'grid h-9 w-9 place-items-center rounded-md border border-line text-ink-soft transition hover:border-accent/50 hover:text-ink'

function ContactIcons() {
  return (
    <>
      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}><Github size={16} /></a>
      {profile.linkedin && (
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}><Linkedin size={16} /></a>
      )}
      <a href={`mailto:${profile.email}`} aria-label="Email" className={iconBtn}><Mail size={16} /></a>
    </>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link to="/" className="leading-tight">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold tracking-tight">Taha Nasir Siddiqi</span>
            {profile.openToWork && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Open to roles
              </span>
            )}
          </div>
          <div className="lbl mt-0.5">Cloud &amp; Systems Engineer</div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-7">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? 'border-b-2 border-ink pb-0.5 text-ink' : 'text-ink-soft hover:text-ink'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <span className="h-5 w-px bg-line" />
          <div className="flex items-center gap-2">
            <ContactIcons />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button className="-m-2 p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line lg:hidden">
          <div className="mx-auto flex max-w-content flex-col px-6 py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-sm font-medium text-ink-soft last:border-0 hover:text-ink"
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-2 py-3">
              <ContactIcons />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
