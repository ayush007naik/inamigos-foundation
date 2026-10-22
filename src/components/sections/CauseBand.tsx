import { Link } from 'react-router-dom'
import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import { INITIATIVES } from '@/data/initiatives'
import { CREDENTIALS } from '@/data/organization'
import { Marquee } from '@/components/Marquee'
import { Reveal } from '@/components/Reveal'
import { Aurora } from '@/components/Aurora'

/**
 * A full-bleed typographic band that names the six programmes, followed by the
 * registrations the foundation actually holds.
 */
export function CauseBand() {
  return (
    <section className="relative isolate overflow-hidden border-y border-line/50" aria-label="Our initiatives and registrations">
      <Aurora className="-z-10" intensity={0.3} />

      <div className="mask-fade-x py-16 md:py-20">
        <Marquee speed={46}>
          {INITIATIVES.map((initiative) => (
            <span key={initiative.key} className="flex items-center">
              <span className="display whitespace-nowrap px-6 text-[clamp(2.6rem,1.6rem+4.6vw,5.5rem)] text-bone/90">
                {initiative.name}
              </span>
              <span className="h-2 w-2 shrink-0 rotate-45 bg-ember" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mask-fade-x -mt-6 md:-mt-10">
        <Marquee speed={58} reverse>
          {INITIATIVES.map((initiative) => (
            <span key={initiative.key} className="flex items-center">
              <span className="display whitespace-nowrap px-6 text-[clamp(2.6rem,1.6rem+4.6vw,5.5rem)] text-transparent [-webkit-text-stroke:1px_rgb(var(--c-bone)/0.28)]">
                {initiative.tagline}
              </span>
              <span className="h-2 w-2 shrink-0 rotate-45 bg-clay/70" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="shell mt-16">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-3 text-center">
            <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
            Registered, audited and accountable
            <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
          </p>
        </Reveal>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {CREDENTIALS.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.05}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line/60 bg-ink/50 px-4 py-2.5 backdrop-blur-sm transition-colors duration-500 hover:border-ember/50">
                <BadgeCheck size={15} strokeWidth={1.7} className="text-ember" aria-hidden="true" />
                <span className="font-mono text-[0.64rem] uppercase tracking-widest text-bone-dim">
                  {c.title}
                </span>
              </span>
            </Reveal>
          ))}
          <Reveal as="li" delay={CREDENTIALS.length * 0.05}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 rounded-full border border-ember/40 bg-ember/10 px-4 py-2.5 transition-colors duration-500 hover:bg-ember hover:text-ink"
            >
              <span className="font-mono text-[0.64rem] uppercase tracking-widest">
                See all registrations
              </span>
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}
