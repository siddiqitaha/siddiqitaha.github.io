import { Section, Reveal } from '../components/ui'
import { experience } from '../data/content'
import { ExpTwoCol } from '../patterns/Experience'

export default function Experience() {
  return (
    <Section className="py-14">
      <Reveal>
        <p className="lbl">Experience</p>
        <h1 className="mt-5 font-head text-4xl font-semibold tracking-tight md:text-5xl">Where I've worked.</h1>
      </Reveal>
      <div className="mt-10"><ExpTwoCol experience={experience} /></div>
    </Section>
  )
}
