import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Share2,
} from 'lucide-react'
import { EVENTS, getEvent } from '@/data/events'
import { ORG } from '@/data/organization'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SplitText } from '@/components/SplitText'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

function parseStart(isoDate: string, startTime: string): Date {
  const [hoursRaw, minutesRaw] = startTime.replace(/\s*(am|pm)$/i, '').split(':')
  let hours = Number(hoursRaw)
  const minutes = Number(minutesRaw)
  const meridiem = /pm$/i.test(startTime.trim()) ? 'pm' : 'am'
  if (meridiem === 'pm' && hours < 12) hours += 12
  if (meridiem === 'am' && hours === 12) hours = 0
  return new Date(`${isoDate}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`)
}

interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function remainingFor(target: Date): Remaining {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  }
}

function useCountdown(target: Date): Remaining {
  const [remaining, setRemaining] = useState<Remaining>(() => remainingFor(target))

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(remainingFor(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return remaining
}

function Countdown({ target }: { target: Date }) {
  const remaining = useCountdown(target)

  if (remaining.done) {
    return (
      <div className="rounded-[1.4rem] border border-line/55 bg-ink/55 p-6">
        <p className="eyebrow">Event status</p>
        <p className="mt-3 font-display text-[1.3rem] leading-snug text-bone">
          This session has concluded.
        </p>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-bone-dim">
          Recordings and notes from past programmes are shared with registered participants. Get in
          touch for the archive.
        </p>
        <a
          href={`mailto:${ORG.hrEmail}?subject=${encodeURIComponent('Event recording: ')}`}
          className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-ember transition-colors hover:text-ember-soft"
        >
          Ask for the recording
          <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    )
  }

  const units: [string, number][] = [
    ['Days', remaining.days],
    ['Hours', remaining.hours],
    ['Minutes', remaining.minutes],
    ['Seconds', remaining.seconds],
  ]

  return (
    <div className="rounded-[1.4rem] border border-line/55 bg-ink/55 p-6">
      <p className="eyebrow">Starts in</p>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {units.map(([label, value]) => (
          <div key={label} className="text-center">
            <p className="font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] leading-none text-bone tabular">
              {String(value).padStart(2, '0')}
            </p>
            <p className="mt-2 font-mono text-[0.54rem] uppercase tracking-widest text-bone-faint">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const event = slug ? getEvent(slug) : undefined

  const related = useMemo(() => EVENTS.filter((e) => e.slug !== slug), [slug])
  const start = useMemo(
    () => parseStart(event?.isoDate ?? '2020-01-01', event?.startTime ?? '12:00 am'),
    [event]
  )

  useDocumentTitle(
    event ? `${event.title} — InAmigos Foundation` : 'Event not found — InAmigos Foundation',
    event?.summary
  )

  if (!event) {
    return (
      <section className="shell flex min-h-[70vh] flex-col items-center justify-center gap-6 py-32 text-center">
        <p className="eyebrow">404 · Event not found</p>
        <h1 className="display text-[clamp(2.2rem,1.4rem+3vw,4rem)] text-bone">
          That event is not on the calendar.
        </h1>
        <p className="lede max-w-[46ch]">
          It may have been renamed, or it may have been an event we have already closed.
        </p>
        <Link to="/events" className="btn btn-primary">
          Back to events
          <ArrowUpRight size={15} strokeWidth={2} />
        </Link>
      </section>
    )
  }

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden pb-14 pt-32 md:pt-44">
          <Media
            src={event.image}
            alt={event.imageAlt}
            plain
            priority
            className="absolute inset-0 -z-10 h-full w-full"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(115deg, rgb(var(--c-ink) / 0.96) 0%, rgb(var(--c-ink) / 0.86) 48%, rgb(var(--c-ink) / 0.62) 100%)',
            }}
          />
          <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

          <div className="shell">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint transition-colors hover:text-ember"
            >
              <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
              Events
            </Link>

            <p className="eyebrow mt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
              {event.category} event
            </p>

            <h1 className="display mt-6 max-w-[20ch] text-[clamp(2.2rem,1.4rem+3.6vw,4.5rem)] text-bone">
              <SplitText text={event.title} delay={0.06} duration={0.95} />
            </h1>

            <Reveal delay={0.28}>
              <p className="lede mt-7 max-w-[56ch]">{event.summary}</p>
            </Reveal>

            <Reveal delay={0.36}>
              <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                {[
                  { icon: CalendarDays, term: 'Date', detail: event.date },
                  { icon: Clock, term: 'Time', detail: `${event.startTime} — ${event.endTime}` },
                  { icon: MapPin, term: 'Where', detail: event.location },
                  { icon: Share2, term: 'Category', detail: event.category },
                ].map(({ icon: Icon, term, detail }) => (
                  <div key={term}>
                    <dt className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-widest text-bone-faint">
                      <Icon size={11} strokeWidth={1.8} aria-hidden="true" />
                      {term}
                    </dt>
                    <dd className="mt-1.5 font-display text-[1.05rem] leading-snug text-bone">{detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        {/* --- Body --------------------------------------------------------- */}
        <section className="shell grid gap-12 py-20 lg:grid-cols-[minmax(0,42rem)_18rem] lg:justify-center lg:gap-16">
          <div>
            <div className="prose-in">
              {event.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-12 rounded-[1.5rem] border border-line/55 bg-ink-soft/35 p-8">
                <h2 className="font-display text-[1.5rem] text-bone">What the session covered</h2>
                <ul className="mt-6 space-y-3">
                  {event.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-bone-dim">
                      <Check size={15} strokeWidth={2} className="mt-1 shrink-0 text-ember" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
            <Countdown target={start} />

            <div className="rounded-[1.4rem] border border-line/55 bg-ink-soft/40 p-6">
              <p className="eyebrow">Organiser</p>
              <p className="mt-3 font-display text-[1.15rem] text-bone">InAmigos Foundation</p>
              <ul className="mt-5 space-y-3 font-mono text-[0.62rem] uppercase tracking-widest text-bone-dim">
                <li>
                  <a
                    href={`mailto:${event.organiser.email}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-ember"
                  >
                    <Mail size={12} strokeWidth={1.8} aria-hidden="true" />
                    {event.organiser.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${event.organiser.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-ember"
                  >
                    <Phone size={12} strokeWidth={1.8} aria-hidden="true" />
                    {event.organiser.phone}
                  </a>
                </li>
              </ul>
            </div>

            <a
              href={ORG.volunteerFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              Register interest
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          </aside>
        </section>
      </article>

      {/* --- Other events ---------------------------------------------------- */}
      <section className="border-t border-line/50 bg-ink-soft/30 py-20 md:py-24" aria-label="Other events">
        <div className="shell">
          <SectionHeading
            eyebrow="Also on the calendar"
            title="Other sessions."
            action={
              <Link to="/events" className="btn btn-ghost">
                All events
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            }
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08} className="h-full">
                <li className="h-full list-none">
                  <Link
                    to={`/events/${item.slug}`}
                    className="group grid h-full gap-5 overflow-hidden rounded-[1.5rem] border border-line/55 bg-ink/50 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/45 sm:grid-cols-[10rem_1fr]"
                  >
                    <span className="overflow-hidden rounded-[1.1rem]">
                      <Media src={item.image} alt={item.imageAlt} ratio="4 / 3" imgClassName="group-hover:scale-[1.06]" />
                    </span>
                    <span className="flex flex-col justify-center">
                      <span className="font-mono text-[0.58rem] uppercase tracking-widest text-ember">
                        {item.category}
                      </span>
                      <span className="mt-2 font-display text-[1.2rem] leading-snug text-bone">
                        {item.title}
                      </span>
                      <span className="mt-3 font-mono text-[0.6rem] uppercase tracking-widest text-bone-faint">
                        {item.date} · {item.location}
                      </span>
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
