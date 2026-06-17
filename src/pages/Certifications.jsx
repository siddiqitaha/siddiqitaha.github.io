import { Section, Reveal } from '../components/ui'
import { certifications } from '../data/content'
import { CertCards } from '../patterns/Certifications'

export default function Certifications() {
  return (
    <Section className="py-14">
      <Reveal>
        <p className="lbl">Certifications</p>
        <h1 className="mt-5 font-head text-4xl font-semibold tracking-tight md:text-5xl">
          Verified credentials.
        </h1>
      </Reveal>
      <div className="mt-10">
        <CertCards certifications={certifications} />
      </div>
    </Section>
  )
}
