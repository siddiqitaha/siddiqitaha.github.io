import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ---- Layout ----
export function Section({ children, className = '', muted = false }) {
  return (
    <section className={`${muted ? 'bg-muted' : ''} ${className}`}>
      <div className="mx-auto max-w-content px-6">{children}</div>
    </section>
  )
}

// Spec-sheet section header: "NN / TITLE" with a strong underline.
export function SectionHead({ number, title, action }) {
  return (
    <div className="flex items-baseline justify-between border-b border-ink pb-3">
      <h2 className="lbl !text-ink">
        {number ? <span className="text-ink-faint">{number} / </span> : null}
        {title}
      </h2>
      {action}
    </div>
  )
}

// ---- Reveal (animates on mount; content always ends visible) ----
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ---- Buttons ----
export function Button({ children, to, href, variant = 'primary', size, ...rest }) {
  let cls = variant === 'primary' ? 'btn-primary' : variant === 'outline' ? 'btn-outline' : 'btn-ghost'
  if (size === 'sm') cls += ' btn-sm'
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}

// ---- Mono label ----
export function Label({ children, className = '' }) {
  return <span className={`lbl ${className}`}>{children}</span>
}

// ---- Tech chip ----
export function Badge({ children }) {
  return (
    <span className="rounded-sm bg-muted px-2 py-0.5 font-mono text-[11px] text-ink-soft">
      {children}
    </span>
  )
}

// ---- Spec block row (key / value, value optionally a link) ----
export function SpecRow({ label, value, accent = false, href }) {
  const valueClass = `text-right text-sm font-medium ${accent ? 'text-accent' : 'text-ink'}`
  const rendered = href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
       rel="noreferrer" className="hover:text-accent">{value}</a>
  ) : value
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="lbl">{label}</dt>
      <dd className={valueClass}>{rendered}</dd>
    </div>
  )
}
