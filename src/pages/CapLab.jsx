import { skills } from '../data/content'
import { CAPABILITY_VARIANTS } from '../patterns/Capabilities'

// Internal preview: every Capabilities variant rendered at the real left-rail
// width (~340px) so we can compare them in context. Route: /#/caplab
export default function CapLab() {
  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <p className="lbl">Internal / Capabilities options</p>
      <h1 className="mt-3 font-head text-2xl font-semibold tracking-tight">Capabilities — at rail width (~340px)</h1>
      <p className="mt-2 text-sm text-ink-soft">Pick by the code, e.g. <code>capabilities:rail</code>. Toggle light/dark in the nav.</p>
      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
        {CAPABILITY_VARIANTS.filter((v) => ['minimal', 'chips', 'rail', 'numbered', 'dot-lead', 'primary', 'accordion'].includes(v.key)).map((v) => (
          <div key={v.key} className="max-w-[340px]">
            <div className="mb-4 flex items-baseline justify-between border-b border-line pb-2">
              <p className="text-sm font-semibold">{v.label}</p>
              <span className="lbl">capabilities:{v.key}</span>
            </div>
            <v.Comp skills={skills} />
          </div>
        ))}
      </div>
    </div>
  )
}
