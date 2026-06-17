import { Section, Reveal } from '../components/ui'
import { projects } from '../data/content'
import { ProjCards } from '../patterns/ProjectDetail'

export default function Projects() {
  return (
    <Section className="py-14">
      <Reveal>
        <p className="lbl">Projects</p>
        <h1 className="mt-5 font-head text-4xl font-semibold tracking-tight md:text-5xl">Selected work.</h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Clean, self-contained builds, each solving a real problem from start to finish. Click any card to see the code.
        </p>
      </Reveal>
      <div className="mt-10"><ProjCards projects={projects} /></div>
    </Section>
  )
}
