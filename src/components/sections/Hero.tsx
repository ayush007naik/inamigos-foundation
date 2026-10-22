import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight, ArrowDown } from 'lucide-react'
import { ORG } from '@/data/organization'
import { SplitText } from '@/components/SplitText'
import { Media } from '@/components/Media'
import { Marquee } from '@/components/Marquee'
import { Magnetic } from '@/components/Magnetic'
import { Aurora } from '@/components/Aurora'
import { usePrefersReducedMotion, useIsDesktop } from '@/hooks/useMediaQuery'

const TICKER = [
  '50,000+ beneficiaries',
  '28 states',
  '6 flagship initiatives',
  'Section 8 registered',
  '80G & 12A certified',
  '200+ volunteers',
]

const GLANCE = [
  ['Founded', '23 September 2020'],
  ['Founder & CEO', ORG.founder],
  ['Home base', 'Bilaspur, Chhattisgarh'],
  ['Recognitions', '80G · 12A · CSR-1 · NITI Aayog · ISO 9001'],
]

export function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const panelY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  /* --- Pointer parallax for the image stack ------------------------------- */
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.6 })
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.6 })
  const stackX = useTransform(smoothX, [-1, 1], [22, -22])
  const stackY = useTransform(smoothY, [-1, 1], [16, -16])

  useEffect(() => {
    // Touch pointers fire pointermove while the page scrolls, which would drag
    // the panel around mid-scroll — the parallax only makes sense with a mouse.
    if (reduced || !isDesktop) return
    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointerX, pointerY, reduced, isDesktop])

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      {/* --- Background plate -------------------------------------------- */}
      <div className="absolute inset-0 -z-30 bg-ink" aria-hidden="true" />

      <motion.div
        className="absolute inset-0 -z-20"
        style={reduced ? undefined : { y: bgY, scale: bgScale }}
      >
        <Media
          src="/img/g-01.webp"
          alt="InAmigos Foundation volunteers at work in the field"
          priority
          plain
          sizes="100vw"
          className="h-full w-full [&>img]:ken-burns"
        />
      </motion.div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(102deg, rgb(var(--c-ink) / 0.97) 0%, rgb(var(--c-ink) / 0.86) 32%, rgb(var(--c-ink) / 0.46) 62%, rgb(var(--c-ink) / 0.78) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 34%, transparent 26%, rgb(var(--c-ink) / 0.82) 100%)',
        }}
        aria-hidden="true"
      />
      <Aurora className="-z-10" intensity={0.5} />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      {/* --- Edge micro-label ------------------------------------------------ */}
      <span
        className="eyebrow absolute left-6 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] xl:block"
        aria-hidden="true"
      >
        Est. 2020 · Bilaspur · India
      </span>

      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:pb-14 md:pt-36">
        <div className="grid flex-1 items-end gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          {/* --- Headline column ------------------------------------------ */}
          <motion.div style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}>
            <motion.p
              className="eyebrow flex items-center gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-ember" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              Section 8 non-profit · Chhattisgarh, India · Since 2020
            </motion.p>

            <h1 className="display mt-7 text-[clamp(3rem,1.4rem+7.2vw,7.5rem)] text-bone">
              <SplitText text="Where friendship" delay={0.25} duration={1.05} />
              <span className="block">
                <SplitText
                  text=" becomes action."
                  delay={0.42}
                  duration={1.05}
                  accentLast
                  accentClassName="text-gradient text-gradient-flow"
                />
              </span>
            </h1>

            <motion.p
              className="lede mt-8 max-w-[52ch] text-pretty"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              InAmigos Foundation turns friendship into measurable change — feeding families, opening
              classrooms, rescuing animals, lifting women, greening villages and building careers
              across 28 states.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3.5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Magnetic>
                <Link to="/causes" className="btn btn-primary btn-shine">
                  Explore our six causes
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={ORG.volunteerFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Become a volunteer
                  <ArrowUpRight size={15} strokeWidth={2} />
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.05 }}
            >
              <span>6 initiatives</span>
              <span className="h-px w-6 bg-line" aria-hidden="true" />
              <span>200+ volunteers</span>
              <span className="h-px w-6 bg-line" aria-hidden="true" />
              <span>28 states</span>
            </motion.div>
          </motion.div>

          {/* --- Floating panel ------------------------------------------ */}
          <motion.aside
            className="mx-auto block w-full max-w-md lg:max-w-none xl:-mr-2"
            style={reduced ? undefined : { y: panelY }}
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative"
              style={reduced ? undefined : { x: stackX, y: stackY }}
            >
              {/* Behind plate */}
              <div
                className="absolute -right-3 -top-5 h-full w-full rounded-[2rem] border border-ember/25 sm:-right-5 sm:-top-6 lg:-right-6"
                aria-hidden="true"
              />
              <div
                className="absolute -right-3 -top-5 h-full w-full rounded-[2rem] bg-ember/10 blur-2xl sm:-right-5 sm:-top-6 lg:-right-6"
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-line/60 shadow-[var(--shadow-deep)]">
                <Media
                  src="/img/g-07.webp"
                  alt="InAmigos Foundation community gathering"
                  className="aspect-[16/9] lg:aspect-[4/3] [&>img]:ken-burns"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
                <div className="scrim-b absolute inset-0" aria-hidden="true" />
                <div className="space-y-3.5 bg-ink/70 p-4 backdrop-blur-md sm:p-5 lg:space-y-4 lg:p-6">
                  <p className="eyebrow">At a glance</p>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.78rem] lg:block lg:space-y-3.5 lg:text-sm">
                    {GLANCE.map(([term, detail]) => (
                      <div
                        key={term}
                        className="flex flex-col gap-0.5 lg:border-b lg:border-line/40 lg:pb-3 lg:last:border-0 lg:last:pb-0"
                      >
                        <dt className="font-mono text-[0.58rem] uppercase tracking-widest text-bone-faint">
                          {term}
                        </dt>
                        <dd className="text-bone-dim">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </div>

        {/* --- Scroll cue -------------------------------------------------- */}
        <motion.div
          className="mt-12 flex items-end justify-between gap-6 border-t border-line/50 pt-6 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <a
            href="#impact"
            className="group flex items-center gap-3 text-bone-dim transition-colors hover:text-bone"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line/70 transition-colors duration-300 group-hover-fine:border-ember/70">
              <ArrowDown
                size={14}
                strokeWidth={1.8}
                className="animate-bounce text-ember"
                aria-hidden="true"
              />
            </span>
            <span className="eyebrow">Scroll to see the work</span>
          </a>
          <span className="eyebrow hidden md:block">Founded by {ORG.founder}</span>
        </motion.div>
      </div>

      {/* --- Ticker ------------------------------------------------------- */}
      <div className="relative border-y border-line/50 bg-ink/60 py-3.5 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" aria-hidden="true" />
        <Marquee speed={42}>
          {TICKER.map((item, i) => (
            <span key={item} className="flex items-center">
              <span className="whitespace-nowrap px-6 font-mono text-[0.66rem] uppercase tracking-widest text-bone-dim">
                {item}
              </span>
              <span className="h-1 w-1 shrink-0 rotate-45 bg-ember" aria-hidden="true" />
              {i === TICKER.length - 1 && <span className="sr-only">end of list</span>}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
