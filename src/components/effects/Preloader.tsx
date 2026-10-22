import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { asset } from '@/lib/utils'

const LINES = ['Warming up', 'Loading the work', 'Almost there']

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) {
      setDone(true)
      setHidden(true)
      return
    }

    let raf = 0
    const start = performance.now()
    const total = 1900

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total)
      // easeOutQuart so the number races to the top then settles
      const eased = 1 - Math.pow(1 - t, 4)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        window.setTimeout(() => setDone(true), 260)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    if (!done) return
    const t = window.setTimeout(() => setHidden(true), 950)
    return () => window.clearTimeout(t)
  }, [done])

  if (hidden) return null

  const line = LINES[Math.min(LINES.length - 1, Math.floor((progress / 100) * LINES.length))]

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink px-6 py-8 md:px-10 md:py-12"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex items-start justify-between">
            <span className="eyebrow">InAmigos Foundation</span>
            <span className="eyebrow tabular">Est. 2020</span>
          </div>

          <div className="flex flex-col items-center gap-8">
            <motion.img
              src={asset('/img/mark.png')}
              alt=""
              width={88}
              height={116}
              className="h-24 w-auto md:h-28"
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="h-6 overflow-hidden">
              <motion.p
                key={line}
                className="font-mono text-[0.66rem] uppercase tracking-widest text-bone-dim"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {line}
              </motion.p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="h-px w-full bg-line/70">
              <motion.div
                className="h-px bg-ember"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex items-end justify-between">
              <span className="font-display text-[clamp(3rem,2rem+5vw,6rem)] leading-none text-bone tabular">
                {String(progress).padStart(3, '0')}
              </span>
              <span className="eyebrow hidden sm:block">Loading</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
