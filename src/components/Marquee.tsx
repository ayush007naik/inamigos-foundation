import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode
  /** Seconds for one full cycle. */
  speed?: number
  className?: string
  /** Duplicate the content and scroll the other way. */
  reverse?: boolean
  pauseOnHover?: boolean
}

export function Marquee({ children, speed = 38, className = '', reverse = false, pauseOnHover = true }: MarqueeProps) {
  const reduced = usePrefersReducedMotion()
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reduced || !trackRef.current) return
    const el = trackRef.current
    el.style.animationDuration = `${speed}s`
    el.style.animationDirection = reverse ? 'reverse' : 'normal'
  }, [speed, reverse, reduced])

  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      <div
        ref={trackRef}
        className="marquee-track animate-marquee"
        style={reduced ? { animation: 'none' } : undefined}
        onAnimationIteration={pauseOnHover ? undefined : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
