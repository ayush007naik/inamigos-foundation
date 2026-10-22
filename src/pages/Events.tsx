import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { EVENTS, EVENT_CATEGORIES } from '@/data/events'
import { ORG } from '@/data/organization'
import { PageHero } from '@/components/PageHero'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { cn } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Events() {
  useDocumentTitle(
    'Events — InAmigos Foundation',
    'Public programmes, awareness sessions and community days hosted by InAmigos Foundation, online and on the ground.'
  )
  const [category, setCategory] = useState<string>('All')

  const events = useMemo(
    () => (category === 'All' ? EVENTS : EVENTS.filter((e) => e.category === category)),
    [category]
  )

  const [lead, ...rest] = events
  const showLead = lead !== undefined && category === 'All'

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Rooms we open, and rooms we show up to."
        description="Public programmes, awareness sessions and community days — some hosted online for anyone to join, some on the ground in a city. Here is what we have run."
        image="/img/event-happiness.webp"
        imageAlt="InAmigos Foundation event"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events' }]}
        meta={
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.64rem] uppercase tracking-widest text-bone-faint">
            <span>{EVENTS.length} events</span>
            <span>{EVENT_CATEGORIES.join(' · ')}</span>
            <span>Free and open to all</span>
          </div>
        }
      />

      {/* --- Filter --------------------------------------------------------- */}
      <div className="border-b border-line/50">
        <div className="shell flex flex-wrap items-center gap-1 py-5">
          {['All', ...EVENT_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-full px-4 py-2 font-mono text-[0.68rem] uppercase tracking-widest transition-colors duration-300',
                category === cat
                  ? 'bg-ember/12 text-ember ring-1 ring-ember/35'
                  : 'text-bone-dim hover:text-bone'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- Lead event ------------------------------------------------------ */}
      {showLead && lead && (
        <section className="shell py-14 md:py-20" aria-label="Featured event">
          <Reveal>
            <Link
              to={`/events/${lead.slug}`}
              className="group grid gap-8 overflow-hidden rounded-[2rem] border border-line/55 bg-ink-soft/40 p-6 transition-all duration-500 hover:border-ember/45 md:grid-cols-[1.1fr_0.9fr] md:p-8"
            >
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <Media src={lead.image} alt={lead.imageAlt} ratio="16 / 10" sizes="(max-width: 1024px) 100vw, 52vw" imgClassName="group-hover:scale-[1.05]" priority />
              </div>
              <div className="flex flex-col justify-center">
                <p className="eyebrow flex items-center gap-3">
                  <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
                  {lead.category}
                </p>
                <h2 className="display mt-5 text-[clamp(1.9rem,1.3rem+2.4vw,3.1rem)] text-bone">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-[50ch] text-[0.95rem] leading-relaxed text-bone-dim">
                  {lead.summary}
                </p>

                <dl className="mt-7 grid gap-4 sm:grid-cols-3">
                  {[
                    { icon: CalendarDays, term: 'Date', detail: lead.date },
                    { icon: Clock, term: 'Time', detail: `${lead.startTime} — ${lead.endTime}` },
                    { icon: MapPin, term: 'Where', detail: lead.location },
                  ].map(({ icon: Icon, term, detail }) => (
                    <div key={term}>
                      <dt className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-widest text-bone-faint">
                        <Icon size={11} strokeWidth={1.8} aria-hidden="true" />
                        {term}
                      </dt>
                      <dd className="mt-1.5 font-display text-[1rem] leading-snug text-bone">{detail}</dd>
                    </div>
                  ))}
                </dl>

                <span className="mt-8 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-ember">
                  Event details
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* --- Event list ------------------------------------------------------ */}
      <section className="shell pb-20 md:pb-28" aria-label="All events">
        <SectionHeading
          eyebrow="Programme"
          title={showLead ? 'Everything else we have run.' : 'Events in this category.'}
          description="Every session is free to attend and open to anyone who registers. Most are hosted online and recorded for those who could not make it."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(showLead ? rest : events).map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.07} className="h-full">
              <li className="h-full list-none">
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line/55 bg-ink-soft/35 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/45">
                  <Link to={`/events/${event.slug}`} className="relative block overflow-hidden">
                    <Media src={event.image} alt={event.imageAlt} ratio="16 / 10" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" imgClassName="group-hover:scale-[1.05]" />
                    <span className="scrim-b absolute inset-0" aria-hidden="true" />
                    <span className="absolute left-4 top-4 rounded-full border border-bone/20 bg-ink/70 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-widest text-bone-dim backdrop-blur-sm">
                      {event.category}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="font-display text-[1.35rem] leading-snug text-bone">
                      <Link to={`/events/${event.slug}`} className="transition-colors hover:text-ember">
                        {event.title}
                      </Link>
                    </h2>
                    <p className="mt-3 line-clamp-3 flex-1 text-[0.9rem] leading-relaxed text-bone-dim">
                      {event.summary}
                    </p>

                    <dl className="mt-6 space-y-2 border-t border-line/50 pt-5 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={12} strokeWidth={1.8} aria-hidden="true" />
                        <dt className="sr-only">Date</dt>
                        <dd>
                          {event.date} · {event.startTime}
                        </dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} strokeWidth={1.8} aria-hidden="true" />
                        <dt className="sr-only">Location</dt>
                        <dd>{event.location}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* --- Host / attend ---------------------------------------------------- */}
      <section className="border-t border-line/50 bg-ink-soft/30 py-20 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Take part"
            title="Bring your city into the calendar."
            description="We host online sessions and on-ground drives, and we are always looking for people who can run one in their own area. If you have a venue, a topic or a team, we will back you."
          />
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-line/55 bg-ink/55 p-6">
                <Users size={20} strokeWidth={1.6} className="text-ember" aria-hidden="true" />
                <h3 className="mt-5 font-display text-[1.2rem] text-bone">Host with us</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-bone-dim">
                  Write to us with your theme and city, and our team will get back with a plan.
                </p>
                <a
                  href={`mailto:${ORG.hrEmail}?subject=Hosting%20an%20event%20with%20InAmigos`}
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-ember transition-colors hover:text-ember-soft"
                >
                  {ORG.hrEmail}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
              <div className="rounded-[1.4rem] border border-line/55 bg-ink/55 p-6">
                <CalendarDays size={20} strokeWidth={1.6} className="text-ember" aria-hidden="true" />
                <h3 className="mt-5 font-display text-[1.2rem] text-bone">Attend the next one</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-bone-dim">
                  Registration is free. Bring a question, a story, or an hour of your time.
                </p>
                <a
                  href={ORG.volunteerFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-ember transition-colors hover:text-ember-soft"
                >
                  Register interest
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
