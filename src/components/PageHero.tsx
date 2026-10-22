import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Media } from './Media'
import { SplitText } from './SplitText'
import { Reveal } from './Reveal'
import { Aurora } from './Aurora'

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: ReactNode
  image?: string
  imageAlt?: string
  breadcrumb: { label: string; to?: string }[]
  /** Aligns the block to the bottom of the hero. */
  meta?: ReactNode
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  breadcrumb,
  meta,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-20 md:pt-44">
      {image && (
        <>
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Media src={image} alt={imageAlt} plain priority className="h-full w-full" />
          </motion.div>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(112deg, rgb(var(--c-ink) / 0.97) 0%, rgb(var(--c-ink) / 0.88) 42%, rgb(var(--c-ink) / 0.58) 100%)',
            }}
          />
        </>
      )}
      {!image && (
        <>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(90rem 40rem at 78% -10%, rgb(var(--c-ember) / 0.15), transparent 62%), radial-gradient(60rem 34rem at 8% 8%, rgb(var(--c-moss) / 0.1), transparent 60%)',
            }}
          />
          <Aurora className="-z-10" intensity={0.4} />
        </>
      )}
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={11} strokeWidth={2} aria-hidden="true" className="opacity-60" />}
                {crumb.to ? (
                  <Link to={crumb.to} className="transition-colors hover:text-bone">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-bone-dim">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p className="eyebrow mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
          {eyebrow}
        </p>

        <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.6rem,1.5rem+4.8vw,5.5rem)] text-bone">
          <SplitText
            text={title}
            delay={0.08}
            duration={1}
            accentLast
            accentClassName="text-gradient text-gradient-flow"
          />
        </h1>

        {description && (
          <motion.p
            className="lede mt-7 max-w-[58ch] text-pretty"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>
        )}

        {meta && (
          <Reveal delay={0.45} className="mt-10">
            {meta}
          </Reveal>
        )}
      </div>

      <div className="hairline-ember absolute inset-x-0 bottom-0 h-px" aria-hidden="true" />
    </section>
  )
}
