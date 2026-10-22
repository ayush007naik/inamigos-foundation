import { Hero } from '@/components/sections/Hero'
import { InitiativesRail } from '@/components/sections/InitiativesRail'
import { CauseBand } from '@/components/sections/CauseBand'
import { ImpactStats } from '@/components/sections/ImpactStats'
import { Story } from '@/components/sections/Story'
import { Voices } from '@/components/sections/Voices'
import { EventsPreview } from '@/components/sections/EventsPreview'
import { GalleryStrip } from '@/components/sections/GalleryStrip'
import { JournalPreview } from '@/components/sections/JournalPreview'
import { CtaBand } from '@/components/sections/CtaBand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle(
    'InAmigos Foundation — Friends who turn compassion into action',
    'InAmigos Foundation is a Section 8 registered non-profit founded on 23 September 2020 by Mr. Govind Shukla. Six initiatives across education, animal welfare, women empowerment, environment, employability and the underprivileged.'
  )
  return (
    <>
      <Hero />
      <InitiativesRail />
      <CauseBand />
      <ImpactStats />
      <Story />
      <Voices />
      <EventsPreview />
      <GalleryStrip />
      <JournalPreview />
      <CtaBand />
    </>
  )
}
