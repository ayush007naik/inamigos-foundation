import type { ElementType, ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: Direction
  /** Distance travelled in pixels. */
  distance?: number
  as?: ElementType
  once?: boolean
}

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered reveal. Elements animate in the first time they enter the
 * viewport and stay put afterwards.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.85,
  direction = 'up',
  distance = 26,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const offset = OFFSETS[direction]
  const MotionTag = motion(as as ElementType)

  if (reduced) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x * distance, y: offset.y * distance },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: '0px 0px -6% 0px' }}
    >
      {children}
    </MotionTag>
  )
}
