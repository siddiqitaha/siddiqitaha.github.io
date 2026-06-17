import { Section, Reveal } from '../components/ui'
import { profile } from '../data/content'
import { ContactSplit } from '../patterns/Contact'

export default function Contact() {
  return (
    <Section className="py-14">
      <Reveal><p className="lbl">Contact</p></Reveal>
      <div className="mt-6"><ContactSplit profile={profile} /></div>
    </Section>
  )
}
