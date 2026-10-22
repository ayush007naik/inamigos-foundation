import { Link } from 'react-router-dom'
import { ArrowUpRight, HandHeart, Building2, Users } from 'lucide-react'
import { ORG } from '@/data/organization'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SplitText } from '@/components/SplitText'
import { Spotlight } from '@/components/Spotlight'
import { Aurora } from '@/components/Aurora'

const PATHS = [
  {
    icon: HandHeart,
    title: 'Give',
    body: 'Every rupee is tracked against a programme, and every programme reports its numbers back to you.',
    cta: 'Donate securely',
    href: ORG.donateUrl,
    external: true,
  },
  {
    icon: Users,
    title: 'Give time',
    body: 'Two hundred volunteers already run this with us. Add your hours and your particular skill.',
    cta: 'Become a volunteer',
    href: ORG.volunteerFormUrl,
    external: true,
  },
  {
    icon: Building2,
    title: 'Partner with us',
    body: 'CSR-1 registered and ready to co-design programmes with corporate partners across India.',
    cta: 'Talk to the CSR lead',
    href: `mailto:${ORG.email}`,
    external: false,
  },
]

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="cta-heading">
      <Media
        src="/img/g-14.webp"
        alt="InAmigos Foundation community gathering"
        plain
        className="absolute inset-0 -z-20 h-full w-full"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(115deg, rgb(var(--c-ink) / 0.97) 0%, rgb(var(--c-ink) / 0.9) 46%, rgb(var(--c-ink) / 0.7) 100%)',
        }}
      />
      <Aurora className="-z-10" intensity={0.45} />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell py-24 md:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
              Join us in making a difference
            </p>
          </Reveal>
          <SplitText
            id="cta-heading"
            text="Three ways to stand with us."
            className="display mt-6 block text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)] text-bone"
            as="h2"
            delay={0.05}
          />
          <Reveal delay={0.14}>
            <p className="lede mt-6 max-w-[52ch]">
              Whether through volunteering, partnerships or donations, every contribution strengthens
              our cause and enables us to expand our reach and impact.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PATHS.map((path, i) => {
            const Icon = path.icon
            const inner = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-ember/30 bg-ember/10 text-ember transition-all duration-500 group-hover:bg-ember group-hover:text-ink">
                  <Icon size={19} strokeWidth={1.6} />
                </span>
                <h3 className="display-tight mt-6 text-2xl text-bone">{path.title}</h3>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-bone-dim">{path.body}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-ember">
                  {path.cta}
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </>
            )

            const shell =
              'group flex h-full flex-col rounded-[1.5rem] border border-line/55 bg-ink/55 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/50 hover:bg-ink-soft/80'

            return (
              <Reveal key={path.title} delay={i * 0.08} className="h-full">
                <Spotlight className="h-full rounded-[1.5rem]">
                  {path.external ? (
                    <a
                      href={path.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={shell}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link to={path.href} className={shell}>
                      {inner}
                    </Link>
                  )}
                </Spotlight>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line/50 pt-8 font-mono text-[0.66rem] uppercase tracking-widest text-bone-faint">
            <span>Donate · {ORG.donateUrl.replace('https://', '')}</span>
            <span>Volunteer · {ORG.volunteerFormUrl.replace('https://', '')}</span>
            <span>Enquiries · {ORG.email}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
