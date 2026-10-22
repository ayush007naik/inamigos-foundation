import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Quote } from 'lucide-react'
import { ORG, CREDENTIALS } from '@/data/organization'
import { ImageReveal } from '@/components/ImageReveal'
import { Reveal } from '@/components/Reveal'
import { SplitText } from '@/components/SplitText'
import { Magnetic } from '@/components/Magnetic'
import { Tilt } from '@/components/Tilt'

export function Story() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="story-heading">
      <div className="shell grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        {/* --- Image collage ---------------------------------------------- */}
        <Reveal direction="right" className="relative">
          <Tilt max={5} zoom={1.015}>
            <div className="relative">
              <div
                className="absolute -left-5 -top-5 h-full w-full rounded-[2rem] border border-ember/20"
                aria-hidden="true"
              />
              <ImageReveal
                src="/img/g-06.webp"
                alt="An InAmigos Foundation volunteer in the field"
                ratio="4 / 5"
                parallax={9}
                sizes="(max-width: 768px) 100vw, 38vw"
                className="rounded-[2rem] border border-line/55"
              />
              <ImageReveal
                src="/img/g-13.webp"
                alt="InAmigos Foundation community gathering"
                ratio="4 / 5"
                parallax={-7}
                sizes="(max-width: 768px) 50vw, 224px"
                delay={0.15}
                className="absolute -bottom-10 -right-4 w-40 overflow-hidden rounded-2xl border border-line/60 shadow-[var(--shadow-deep)] sm:-right-8 sm:w-56"
              />
            </div>
          </Tilt>

          <div className="absolute -left-3 top-8 hidden sm:block">
            <div className="glass flex flex-col items-center gap-3 rounded-full px-4 py-6 shadow-[var(--shadow-lift)]">
              <span className="font-mono text-[0.58rem] uppercase tracking-widest text-bone-faint [writing-mode:vertical-rl]">
                Founded
              </span>
              <span className="text-gradient font-display text-xl leading-none">2020</span>
            </div>
          </div>
        </Reveal>

        {/* --- Narrative -------------------------------------------------- */}
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
              Get to know us better
            </p>
          </Reveal>

          <SplitText
            id="story-heading"
            text="A foundation built on the simple idea that friendship is a form of infrastructure."
            className="display mt-6 block text-balance text-[clamp(2rem,1.3rem+3vw,3.5rem)] text-bone"
            as="h2"
            delay={0.05}
          />

          <Reveal delay={0.12}>
            <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.75] text-bone-dim">
              <p>
                InAmigos Foundation was founded on {ORG.foundedOn} by {ORG.founder}. It is a{' '}
                {ORG.registration}, and it holds 80G & 12A certifications, ensuring transparency,
                accountability and tax-exempt benefits for donors. Our foundation is also CSR-1
                registered, allowing us to collaborate with corporate partners for impactful
                Corporate Social Responsibility initiatives.
              </p>
              <p>
                Additionally, we are NITI Aayog registered, aligning our work with national development
                goals, and hold the prestigious IAF ISO 9001:2015 certification, signifying our
                commitment to maintaining high-quality standards in operations and service delivery.
              </p>
              <p>
                With a strong network of dedicated professionals, volunteers and corporate partners, we
                work tirelessly to bring positive change to society — directing every contribution
                towards food distribution, education, women empowerment, animal welfare, environmental
                sustainability and social inclusion programmes across India.
              </p>
            </div>
          </Reveal>

          {/* Credentials */}
          <Reveal delay={0.18}>
            <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {CREDENTIALS.map((c) => (
                <li key={c.id} className="flex items-start gap-3 text-[0.9rem] text-bone-dim">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ember/15 text-ember">
                    <Check size={11} strokeWidth={2.6} />
                  </span>
                  <span>
                    <span className="text-bone">{c.title}</span>
                    <span className="block text-[0.78rem] text-bone-faint">{c.authority}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Pull quote */}
          <Reveal delay={0.22}>
            <figure className="mt-12 border-l-2 border-ember/60 pl-6">
              <Quote size={18} strokeWidth={1.5} className="text-ember" aria-hidden="true" />
              <blockquote className="mt-3 font-display text-[1.45rem] leading-snug text-bone">
                “In this life, save a life.”
              </blockquote>
              <figcaption className="mt-3 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint">
                Project Jeev — the foundation's own motto
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.28}>
            <Magnetic>
              <Link to="/about" className="btn btn-ghost mt-11">
                Read our full story
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
