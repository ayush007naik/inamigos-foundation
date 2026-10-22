import { Quote } from 'lucide-react'
import { Marquee } from '@/components/Marquee'
import { Reveal } from '@/components/Reveal'
import { Spotlight } from '@/components/Spotlight'

/**
 * Short lines lifted from the foundation's own published writing — the
 * official site and the InAmigos journal.
 */
const VOICES = [
  { text: 'We believe in the power of collective action.', by: 'InAmigos Foundation' },
  { text: 'When a woman is empowered, her family, community, and future thrive.', by: 'Project Udaan' },
  { text: 'In this life, save a life.', by: 'Project Jeev' },
  { text: 'Save Earth, Save Life!', by: 'Mission Life' },
  { text: 'Let’s join hands to make Bachpan beautiful for every child.', by: 'Project BachpanShala' },
  { text: 'Every drop counts.', by: 'Save Water, Save Life' },
  { text: 'Opportunities await – are you ready to grow with us?', by: 'Project Vikas' },
  { text: 'Your health is your greatest wealth — invest in it wisely.', by: 'Adopt a Healthy Lifestyle' },
]

export function Voices() {
  const half = Math.ceil(VOICES.length / 2)
  const rowA = VOICES.slice(0, half)
  const rowB = VOICES.slice(half)

  return (
    <section
      className="relative overflow-hidden border-y border-line/50 bg-ink-soft/30 py-20 md:py-24"
      aria-labelledby="voices-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Quote size={20} strokeWidth={1.5} className="text-ember" aria-hidden="true" />
          <h2 id="voices-heading" className="eyebrow">
            In their words
          </h2>
        </Reveal>
      </div>

      <div className="mask-fade-x mt-12 space-y-4">
        <Marquee speed={58}>
          {rowA.map((v, i) => (
            <figure key={`${v.by}-${i}`} className="mx-2 w-[22rem] shrink-0 sm:w-[26rem]">
              <Spotlight className="h-full rounded-2xl border border-line/50 bg-ink/60 p-7">
                <p className="font-display text-[1.35rem] leading-snug text-bone">“{v.text}”</p>
                <figcaption className="mt-4 font-mono text-[0.62rem] uppercase tracking-widest text-ember">
                  {v.by}
                </figcaption>
              </Spotlight>
            </figure>
          ))}
        </Marquee>

        <Marquee speed={66} reverse>
          {rowB.map((v, i) => (
            <figure key={`${v.by}-${i}`} className="mx-2 w-[22rem] shrink-0 sm:w-[26rem]">
              <Spotlight
                radius={16}
                tint="var(--c-moss)"
                className="h-full rounded-2xl border border-line/50 bg-ink/40 p-7"
              >
                <p className="font-display text-[1.35rem] leading-snug text-bone-dim">“{v.text}”</p>
                <figcaption className="mt-4 font-mono text-[0.62rem] uppercase tracking-widest text-moss">
                  {v.by}
                </figcaption>
              </Spotlight>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
