import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Plus } from 'lucide-react'
import { INITIATIVES, type Initiative } from '@/data/initiatives'
import { ORG } from '@/data/organization'
import { POSTS } from '@/data/posts'
import { PageHero } from '@/components/PageHero'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { cn } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const ACCENT_TEXT: Record<string, string> = {
  ember: 'text-ember',
  moss: 'text-moss',
  clay: 'text-clay',
}

const ACCENT_BORDER: Record<string, string> = {
  ember: 'border-ember/45',
  moss: 'border-moss/45',
  clay: 'border-clay/45',
}

function InitiativeBlock({ initiative, index }: { initiative: Initiative; index: number }) {
  const related = POSTS.filter((p) => initiative.relatedPosts.includes(p.slug))
  const flip = index % 2 === 1

  return (
    <article
      id={initiative.key}
      className="scroll-mt-28 border-t border-line/50 py-20 first:border-t-0 md:py-28"
      aria-labelledby={`${initiative.key}-title`}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal direction={flip ? 'left' : 'right'} className={cn(flip && 'lg:order-2')}>
          <div className="lg:sticky lg:top-28">
            <div
              className={cn(
                'group relative overflow-hidden rounded-[2rem] border border-line/55',
                ACCENT_BORDER[initiative.accent]
              )}
            >
              <Media
                src={initiative.image}
                alt={initiative.imageAlt}
                ratio="4 / 3"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                imgClassName="group-hover:scale-[1.05]"
              />
              <div className="scrim-b absolute inset-0" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className={cn('font-display text-[clamp(2.5rem,2rem+3vw,3.75rem)] leading-none', ACCENT_TEXT[initiative.accent])}>
                  {initiative.metric.value}
                </p>
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-widest text-bone-dim">
                  {initiative.metric.label}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className={cn(flip && 'lg:order-1')}>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className={cn('font-mono text-[0.66rem] uppercase tracking-widest', ACCENT_TEXT[initiative.accent])}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-10 bg-line" aria-hidden="true" />
              <span className="eyebrow">{initiative.project}</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id={`${initiative.key}-title`}
              className="display mt-6 text-[clamp(2.1rem,1.4rem+3vw,3.75rem)] text-bone"
            >
              {initiative.name}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-3 font-display text-[1.15rem] italic text-bone-dim">{initiative.tagline}</p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-7 text-[1.02rem] leading-[1.75] text-bone-dim">{initiative.detail}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-9 space-y-3.5">
              {initiative.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-[0.95rem] text-bone-dim">
                  <span
                    className={cn(
                      'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ember/15',
                      ACCENT_TEXT[initiative.accent]
                    )}
                  >
                    <Check size={11} strokeWidth={2.6} />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>

          {related.length > 0 && (
            <Reveal delay={0.22}>
              <div className="mt-10 rounded-2xl border border-line/50 bg-ink-soft/50 p-6">
                <p className="eyebrow">Read from the journal</p>
                <ul className="mt-4 space-y-3">
                  {related.map((post) => (
                    <li key={post.slug}>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group flex items-center justify-between gap-4 text-[0.92rem] text-bone-dim transition-colors duration-300 hover:text-bone"
                      >
                        <span className="underline-draw">{post.title}</span>
                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.8}
                          className="shrink-0 text-ember transition-transform duration-500 ease-cinematic group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Causes() {
  useDocumentTitle(
    'Our Causes — Six initiatives, one way of working | InAmigos Foundation',
    'Sewa, BachpanShala, Jeev, Udaan, Prakriti and Vikas — the six flagship programmes of InAmigos Foundation, with the numbers each of them has produced.'
  )
  const [active, setActive] = useState(INITIATIVES[0].key)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Our causes"
        title="Six initiatives, one way of working."
        description="We keep the number deliberately small. Every programme has a named lead, a published metric and a community that owns it — so that when something works, we can say exactly why."
        image="/img/g-16.webp"
        imageAlt="InAmigos Foundation community gathering"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Causes' }]}
        meta={
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[0.64rem] uppercase tracking-widest text-bone-faint">
            <span>{ORG.name}</span>
            <span>Section 8 · 80G · 12A · CSR-1</span>
            <span>Chhattisgarh, India</span>
          </div>
        }
      />

      {/* Quick index */}
      <div className="sticky top-[4.5rem] z-30 border-y border-line/50 bg-ink/85 backdrop-blur-xl md:top-20">
        <div className="shell">
          <nav aria-label="Initiative index" className="no-scrollbar flex gap-1 overflow-x-auto py-3">
            {INITIATIVES.map((initiative) => (
              <button
                key={initiative.key}
                type="button"
                onClick={() => {
                  setActive(initiative.key)
                  document
                    .getElementById(initiative.key)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-[0.78rem] font-medium transition-colors duration-300',
                  active === initiative.key
                    ? 'bg-ember/12 text-ember ring-1 ring-ember/35'
                    : 'text-bone-dim hover:text-bone'
                )}
              >
                {initiative.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <section className="shell pt-16 md:pt-24">
        <SectionHeading
          eyebrow="How we work"
          title="Direct help, and the systems that make it last."
          description="Relief is the floor, not the ceiling. Alongside the immediate work — a meal, a classroom, a shelter — we build the capability that stops the need coming back: skills, enterprise, literacy, and a greener neighbourhood."
        />
      </section>

      <div className="shell">
        {INITIATIVES.map((initiative, index) => (
          <InitiativeBlock key={initiative.key} initiative={initiative} index={index} />
        ))}
      </div>

      {/* Other ways in */}
      <section className="border-t border-line/50 py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Keep going"
            title="Three ways to go deeper."
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-3">
            {[
              {
                title: 'Meet the people',
                body: 'Two hundred volunteers across 28 states, organised into teams you can join.',
                to: '/volunteers',
                cta: 'See the directory',
              },
              {
                title: 'Read the thinking',
                body: 'Field notes on what worked, what did not, and what we are changing next.',
                to: '/blog',
                cta: 'Open the journal',
              },
              {
                title: 'Start something',
                body: 'A conversation is usually all it takes. Tell us what you are thinking.',
                to: '/contact',
                cta: 'Get in touch',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <Link
                  to={card.to}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-line/55 bg-ink-soft/40 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/50"
                >
                  <h3 className="display-tight text-2xl text-bone">{card.title}</h3>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-bone-dim">{card.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-widest text-ember">
                    {card.cta}
                    <Plus size={13} strokeWidth={2} className="rotate-45 transition-transform duration-500 group-hover:rotate-90" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
