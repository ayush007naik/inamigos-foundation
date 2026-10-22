import { cn } from '@/lib/utils'

interface AuroraProps {
  className?: string
  /** Opacity of the colour field, 0–1. */
  intensity?: number
}

/**
 * A slow-drifting field of coloured light. Purely decorative — it gives the
 * dark theme its warmth and stops large surfaces reading as flat black.
 */
export function Aurora({ className = '', intensity = 1 }: AuroraProps) {
  return (
    <div
      className={cn('aurora', className)}
      aria-hidden="true"
      style={{ opacity: intensity }}
    >
      <span
        className="aurora-a"
        style={{
          top: '-22%',
          left: '-12%',
          width: '58%',
          height: '62%',
          background:
            'radial-gradient(circle at 40% 40%, rgb(var(--c-ember) / 0.5), transparent 68%)',
        }}
      />
      <span
        className="aurora-b"
        style={{
          top: '18%',
          right: '-18%',
          width: '52%',
          height: '58%',
          background:
            'radial-gradient(circle at 55% 45%, rgb(var(--c-clay) / 0.42), transparent 66%)',
        }}
      />
      <span
        className="aurora-c"
        style={{
          bottom: '-28%',
          left: '24%',
          width: '48%',
          height: '52%',
          background:
            'radial-gradient(circle at 50% 50%, rgb(var(--c-moss) / 0.32), transparent 68%)',
        }}
      />
    </div>
  )
}
