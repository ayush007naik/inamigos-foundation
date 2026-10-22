import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { INITIATIVES } from '@/data/initiatives'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Spotlight } from '@/components/Spotlight'
import { cn } from '@/lib/utils'

const ACCENT_RING: Record<string, string> = {
  ember: 'group-hover:border-ember/60',
  moss: 'group-hover:border-moss/60',
  clay: 'group-hover:border-clay/60',
}

const ACCENT_TEXT: Record<string, string> = {
  ember: 'text-ember',
  moss: 'text-moss',
  clay: 'text-clay',
}

export function InitiativesRail() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [canScroll, setCanScroll] = useState({ left: false, right: true })

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setCanScroll({ left: el.scrollLeft > 8, right: el.scrollLeft < max - 8 })
  }, [])

  useEffect(() => {
    update()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.82, 720), behavior: 'smooth' })
  }

  return (
    <section className="relative py-24 md:py-32" aria-labelledby="initiatives-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="Our six initiatives"
          title="Six programmes. One shared promise."
          description="Every initiative answers to the same question — does it measurably change a life? Each project has its own lead, its own volunteers and its own numbers we are happy to publish."
          action={
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={!canScroll.left}
                aria-label="Previous initiative"
                className="grid h-11 w-11 place-items-center rounded-full border border-line/70 text-bone-dim transition-all duration-300 hover:border-ember/60 hover:text-ember disabled:opacity-30 disabled:hover:border-line/70 disabled:hover:text-bone-dim"
              >
                <ArrowLeft size={17} strokeWidth={1.7} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={!canScroll.right}
                aria-label="Next initiative"
                className="grid h-11 w-11 place-items-center rounded-full border border-line/70 text-bone-dim transition-all duration-300 hover:border-ember/60 hover:text-ember disabled:opacity-30 disabled:hover:border-line/70 disabled:hover:text-bone-dim"
              >
                <ArrowRight size={17} strokeWidth={1.7} />
              </button>
            </div>
          }
        />
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-14 flex snap-x-mandatory gap-5 overflow-x-auto scroll-pl-5 pr-5 md:scroll-pl-10 md:pr-10"
        role="region"
        aria-label="Our initiatives"
        tabIndex={0}
      >
        {INITIATIVES.map((initiative, index) => (
          <Reveal
            key={initiative.key}
            delay={index * 0.06}
            direction="right"
            className="w-[84vw] shrink-0 snap-start-always sm:w-[62vw] lg:w-[30rem]"
          >
            <Spotlight
              radius={18}
              className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line/55 bg-ink-soft transition-all duration-700 ease-cinematic hover:-translate-y-1.5',
                ACCENT_RING[initiative.accent]
              )}
            >
              <div className="relative overflow-hidden">
                <Media
                  src={initiative.image}
                  alt={initiative.imageAlt}
                  ratio="4 / 3"
                  sizes="(max-width: 768px) 78vw, 360px"
                  imgClassName="group-hover:scale-[1.08]"
                />
                <div className="scrim-b absolute inset-0" aria-hidden="true" />
                <span
                  className={cn(
                    'absolute left-6 top-6 font-mono text-[0.62rem] uppercase tracking-widest',
                    ACCENT_TEXT[initiative.accent]
                  )}
                >
                  {String(index + 1).padStart(2, '0')} / {String(INITIATIVES.length).padStart(2, '0')}
                </span>
                <span
                  className="pointer-events-none absolute -bottom-6 right-4 font-display text-[7rem] leading-none text-transparent opacity-[0.12] [-webkit-text-stroke:1px_rgb(var(--c-bone))]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="relative flex flex-1 flex-col p-7">
                <p className="eyebrow">{initiative.project}</p>
                <h3 className="display-tight mt-3 text-[1.75rem] text-bone">{initiative.name}</h3>
                <p className="mt-2 font-display text-[1.05rem] italic text-bone-dim">{initiative.tagline}</p>
                <p className="mt-4 flex-1 text-[0.93rem] leading-relaxed text-bone-dim">{initiative.summary}</p>

                <div className="mt-7 flex items-end justify-between gap-4 border-t border-line/50 pt-5">
                  <div>
                    <p
                      className={cn(
                        'font-display text-2xl leading-none',
                        ACCENT_TEXT[initiative.accent]
                      )}
                    >
                      {initiative.metric.value}
                    </p>
                    <p className="mt-1.5 text-[0.76rem] text-bone-faint">{initiative.metric.label}</p>
                  </div>
                  <Link
                    to={`/causes#${initiative.key}`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line/70 text-bone-dim transition-all duration-300 group-hover:border-ember/60 group-hover:text-ember"
                    aria-label={`Read about ${initiative.project}`}
                  >
                    <ArrowUpRight size={16} strokeWidth={1.8} />
                  </Link>
                </div>
              </div>
            </Spotlight>
          </Reveal>
        ))}
        <div className="w-1 shrink-0 md:w-10" aria-hidden="true" />
      </div>

      <div className="shell mt-9">
        <div className="h-px w-full bg-line/50">
          <div
            className="h-px bg-gradient-to-r from-ember to-clay transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  )
}
