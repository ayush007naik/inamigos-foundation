import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightProps {
  children: ReactNode
  className?: string
  /** Radius of the glow in rem. */
  radius?: number
  /** Colour of the glow as an rgb triplet string. */
  tint?: string
  alpha?: number
}

/**
 * Tracks the pointer across a surface and lights it up from the cursor.
 * The position is written straight to CSS variables so pointer movement never
 * triggers a React re-render.
 */
export function Spotlight({
  children,
  className = '',
  radius = 22,
  tint = 'var(--c-ember)',
  alpha = 0.16,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onPointerMove={handleMove} className={cn('spotlight relative', className)}>
      <span
        aria-hidden="true"
        className="spotlight-glow"
        style={{
          background: `radial-gradient(${radius}rem circle at var(--mx, 50%) var(--my, 50%), rgb(${tint} / ${alpha}), transparent 62%)`,
        }}
      />
      {children}
    </div>
  )
}
