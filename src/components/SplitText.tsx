import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { splitWords } from '@/lib/utils'

interface SplitTextProps {
  text: string
  className?: string
  /** Forwarded to the rendered element — used for aria-labelledby targets. */
  id?: string
  /** Delay before the first word animates, in seconds. */
  delay?: number
  stagger?: number
  duration?: number
  /** Highlight the last word in the accent colour. */
  accentLast?: boolean
  /** Class applied to the highlighted word — override for gradients. */
  accentClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

/**
 * Renders text one word at a time, each word rising into place. This is the
 * signature typographic motion used across headlines.
 */
export function SplitText({
  text,
  className = '',
  id,
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  accentLast = false,
  accentClassName = 'text-ember',
  as = 'span',
}: SplitTextProps) {
  const reduced = usePrefersReducedMotion()
  const parts = splitWords(text)
  const words = parts.filter((p) => p.trim().length > 0)
  const lastIndex = words.length - 1

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} id={id}>
        {text}
      </Tag>
    )
  }

  const Tag = motion[as]

  return (
    <Tag className={className} id={id} initial="hidden" animate="visible">
      {parts.map((part, i) => {
        if (!part.trim()) return <span key={`sp-${i}`}> </span>
        const wordIndex = words.indexOf(part)
        const isLast = wordIndex === lastIndex
        return (
          <span key={`${part}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${accentLast && isLast ? accentClassName : ''}`}
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: {
                  y: '0%',
                  opacity: 1,
                  transition: { duration, delay: delay + wordIndex * stagger, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {part}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
