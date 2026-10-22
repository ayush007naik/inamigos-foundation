import { STATS } from '@/data/organization'
import { Counter } from '@/components/Counter'
import { Reveal } from '@/components/Reveal'
import { Media } from '@/components/Media'
import { Spotlight } from '@/components/Spotlight'
import { Aurora } from '@/components/Aurora'

export function ImpactStats() {
  return (
    <section id="impact" className="relative isolate overflow-hidden" aria-labelledby="impact-heading">
      <Media
        src="/img/g-04.webp"
        alt="InAmigos Foundation community gathering"
        plain
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgb(var(--c-ink) / 0.94) 0%, rgb(var(--c-ink) / 0.86) 40%, rgb(var(--c-ink) / 0.97) 100%)',
        }}
      />
      <Aurora className="-z-10" intensity={0.35} />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
            The measure of the work
          </p>
          <h2
            id="impact-heading"
            className="display mt-6 text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)] text-bone"
          >
            Numbers we publish, so you can hold us to them.
          </h2>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 0.08} className="h-full">
              <Spotlight className="group relative h-full overflow-hidden rounded-3xl border border-line/50 bg-ink/80 p-8 backdrop-blur-sm transition-all duration-700 ease-cinematic hover:-translate-y-1.5 hover:border-ember/45 md:p-10">
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-ember to-transparent transition-transform duration-700 ease-cinematic group-hover-fine:scale-x-100" />
                <span
                  className="pointer-events-none absolute right-6 top-5 font-display text-5xl leading-none text-transparent opacity-15 [-webkit-text-stroke:1px_rgb(var(--c-bone))]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-gradient text-gradient-flow font-display text-[clamp(2.75rem,2rem+3vw,4rem)] leading-none">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-widest text-ember">
                  {stat.label}
                </p>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-bone-dim">{stat.detail}</p>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
