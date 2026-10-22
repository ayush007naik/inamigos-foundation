import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './useMediaQuery'

interface Options {
  duration?: number
  decimals?: number
  /** Start counting only once the element is visible. */
  startOnView?: boolean
}

/**
 * Animates a number from 0 to `target` with an ease-out curve.
 */
export function useCountUp(target: number, { duration = 1900, decimals = 0, startOnView = true }: Options = {}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(!startOnView)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!startOnView || started) return
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [startOnView, started])

  useEffect(() => {
    if (!started) return
    if (reduced) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(Number((target * eased).toFixed(decimals)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target, duration, decimals, reduced])

  return { ref, value }
}
