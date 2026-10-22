import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

interface TiltProps {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. */
  max?: number
  /** Slight zoom applied while the pointer is over the surface. */
  zoom?: number
}

/**
 * A surface that leans towards the pointer. Adds a sense of physical depth to
 * imagery and cards without the weight of a 3D library.
 */
export function Tilt({ children, className = '', max = 7, zoom = 1.012 }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 160,
    damping: 20,
    mass: 0.5,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 160,
    damping: 20,
    mass: 0.5,
  })
  const scale = useSpring(useTransform(px, [0, 1], [1, zoom]), {
    stiffness: 180,
    damping: 22,
  })

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={cn('perspective', className)}>
      <motion.div
        ref={ref}
        className="preserve-3d h-full w-full"
        style={{ rotateX, rotateY, scale }}
        onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => {
          if (event.pointerType !== 'mouse') return
          const el = ref.current
          if (!el) return
          const rect = el.getBoundingClientRect()
          px.set((event.clientX - rect.left) / rect.width)
          py.set((event.clientY - rect.top) / rect.height)
        }}
        onPointerLeave={() => {
          px.set(0.5)
          py.set(0.5)
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
