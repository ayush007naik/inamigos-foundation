import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, MapPin, Clock } from 'lucide-react'
import { EVENTS } from '@/data/events'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Spotlight } from '@/components/Spotlight'

export function EventsPreview() {
  const [featured, ...rest] = EVENTS

  return (
    <section className="relative border-y border-line/50 bg-ink-soft/40 py-24 md:py-32" aria-labelledby="events-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="Our events"
          title="Rooms where the work becomes visible."
          description="Awareness sessions, community days and workshops — most of them open, most of them online, all of them free."
          action={
            <Link to="/events" className="btn btn-ghost">
              All events
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Featured event */}
          <Reveal>
            <Spotlight className="h-full rounded-[1.75rem]">
              <Link
                to={`/events/${featured.slug}`}
                className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-line/55"
              >
              <Media
                src={featured.image}
                alt={featured.imageAlt}
                ratio="16 / 11"
                imgClassName="group-hover:scale-[1.06]"
                className="absolute inset-0 h-full w-full"
              />
              <div className="scrim-full absolute inset-0" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-end p-7 md:p-10">
                <span className="eyebrow inline-flex w-fit rounded-full border border-ember/40 bg-ink/50 px-3 py-1.5 backdrop-blur-sm">
                  {featured.category}
                </span>
                <h3 className="display-tight mt-4 max-w-[18ch] text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] text-bone">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-bone-dim">
                  {featured.summary}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.64rem] uppercase tracking-widest text-bone-dim">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={13} strokeWidth={1.7} className="text-ember" aria-hidden="true" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={13} strokeWidth={1.7} className="text-ember" aria-hidden="true" />
                    {featured.startTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={13} strokeWidth={1.7} className="text-ember" aria-hidden="true" />
                    {featured.location}
                  </span>
                </div>
              </div>
              </Link>
            </Spotlight>
          </Reveal>

          {/* Remaining events */}
          <div className="flex flex-col gap-6">
            {rest.map((event, i) => (
              <Reveal key={event.slug} delay={0.08 * (i + 1)} className="h-full">
                <Spotlight className="h-full rounded-[1.5rem]">
                  <Link
                    to={`/events/${event.slug}`}
                    className="group flex h-full items-center gap-5 rounded-[1.5rem] border border-line/55 bg-ink/50 p-4 transition-all duration-500 hover:border-ember/45 hover:bg-ink-soft/80 sm:p-5"
                  >
                    <div className="w-24 shrink-0 overflow-hidden rounded-xl sm:w-32">
                      <Media src={event.image} alt={event.imageAlt} ratio="4 / 3" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ember">
                        {event.category} · {event.date}
                      </p>
                      <h3 className="mt-2 font-display text-[1.15rem] leading-snug text-bone transition-colors duration-300 group-hover:text-ember sm:text-[1.3rem]">
                        {event.title}
                      </h3>
                      <p className="mt-2 hidden text-[0.85rem] leading-relaxed text-bone-dim sm:block">
                        {event.summary}
                      </p>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/70 text-bone-dim transition-all duration-300 group-hover:border-ember/60 group-hover:text-ember">
                      <ArrowUpRight size={15} strokeWidth={1.8} />
                    </span>
                  </Link>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
