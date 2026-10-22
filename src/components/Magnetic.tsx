import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: ReactNode
  className?: string
  /** Strength of the pull, in pixels. */
  strength?: number
  as?: 'div' | 'span' | 'a'
}

/**
 * A wrapper that gently pulls its child towards the cursor — a small detail
 * that makes interactive elements feel physical.
 */
export function Magnetic({ children, className = '', strength = 14, as = 'div' }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const translateX = useTransform(springX, (v) => v * 0.35)
  const translateY = useTransform(springY, (v) => v * 0.35)

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const Tag = motion[as]

  return (
    <Tag
      ref={ref as never}
      className={cn('inline-block', className)}
      style={{ translateX, translateY }}
      onPointerMove={(e: React.PointerEvent) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        x.set(((e.clientX - rect.left) / rect.width - 0.5) * strength * 2)
        y.set(((e.clientY - rect.top) / rect.height - 0.5) * strength * 2)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </Tag>
  )
}
